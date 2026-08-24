import { prisma } from "./db";
import { getCurrentUser, getGuestId } from "./session";
import { evaluateCoupon } from "./coupons";
import { reserveForOrder, releaseReservations, fulfillPaidOrder } from "./fulfillment";
import { orderNumber } from "./utils";
import { emails } from "./email";
import { audit, track } from "./audit";
import { randomBytes } from "crypto";
import { clearCart, getOrCreateCart } from "./cart";

export async function createOrderFromCart(input: {
  email: string;
  name: string;
  country?: string;
  couponCode?: string;
}) {
  const user = await getCurrentUser();
  // Always resolve the same cart the storefront uses (user OR guest)
  const cart = await getOrCreateCart();

  if (!cart || cart.items.length === 0) throw new Error("CART_EMPTY");

  const lines = [];
  for (const item of cart.items) {
    if (item.variant.product.status !== "PUBLISHED") throw new Error("PRODUCT_UNAVAILABLE");
    const available = await prisma.digitalItem.count({
      where: { variantId: item.variantId, status: "AVAILABLE" },
    });
    if (available < item.quantity) throw new Error("OUT_OF_STOCK");
    lines.push({
      variantId: item.variantId,
      productName: item.variant.product.name,
      variantName: item.variant.name,
      quantity: item.quantity,
      unitCents: item.variant.priceCents,
      totalCents: item.variant.priceCents * item.quantity,
      productId: item.variant.productId,
      categoryId: item.variant.product.categoryId,
    });
  }

  const subtotalCents = lines.reduce((s, l) => s + l.totalCents, 0);
  const { discountCents, coupon } = await evaluateCoupon(input.couponCode ?? cart.couponCode, {
    subtotalCents,
    productIds: lines.map((l) => l.productId),
    categoryIds: lines.map((l) => l.categoryId),
  });
  const totalCents = Math.max(0, subtotalCents - discountCents);

  const order = await prisma.order.create({
    data: {
      number: orderNumber(),
      userId: user?.id,
      email: input.email.toLowerCase().trim(),
      customerName: input.name.trim(),
      country: input.country || null,
      status: "AWAITING_PAYMENT",
      currency: "RUB",
      subtotalCents,
      discountCents,
      totalCents,
      couponId: coupon?.id,
      couponCode: coupon?.code,
      items: {
        create: lines.map((l) => ({
          variantId: l.variantId,
          productName: l.productName,
          variantName: l.variantName,
          quantity: l.quantity,
          unitCents: l.unitCents,
          totalCents: l.totalCents,
        })),
      },
    },
  });

  try {
    await reserveForOrder(order.id);
  } catch (e) {
    await prisma.order.update({ where: { id: order.id }, data: { status: "FAILED" } });
    throw e;
  }

  const payment = await prisma.payment.create({
    data: {
      orderId: order.id,
      provider: process.env.STRIPE_SECRET_KEY ? "stripe" : "demo",
      status: "PENDING",
      amountCents: totalCents,
      currency: "RUB",
      idempotencyKey: randomBytes(16).toString("hex"),
    },
  });

  await track("checkout_started", { meta: { orderId: order.id } });
  return { order, payment, cartId: cart.id };
}

export async function markPaymentSucceeded(params: {
  paymentId?: string;
  providerPaymentId?: string;
  eventId: string;
}) {
  const payment = params.paymentId
    ? await prisma.payment.findUnique({ where: { id: params.paymentId }, include: { order: true } })
    : await prisma.payment.findFirst({
        where: { providerPaymentId: params.providerPaymentId },
        include: { order: true },
      });
  if (!payment) throw new Error("PAYMENT_NOT_FOUND");

  if (payment.rawEventId === params.eventId || payment.status === "SUCCEEDED") {
    return payment;
  }

  await prisma.payment.update({
    where: { id: payment.id },
    data: { status: "SUCCEEDED", rawEventId: params.eventId },
  });
  await prisma.order.update({
    where: { id: payment.orderId },
    data: { status: "PAID", paidAt: new Date() },
  });
  if (payment.order.couponId) {
    await prisma.coupon.update({
      where: { id: payment.order.couponId },
      data: { usedCount: { increment: 1 } },
    });
    await prisma.couponUsage.create({
      data: {
        couponId: payment.order.couponId,
        userId: payment.order.userId,
        orderId: payment.orderId,
      },
    });
  }

  // Clear both user carts and current guest cart
  if (payment.order.userId) {
    const carts = await prisma.cart.findMany({ where: { userId: payment.order.userId } });
    for (const c of carts) await clearCart(c.id);
  }
  try {
    const guestId = await getGuestId();
    const guestCart = await prisma.cart.findUnique({ where: { guestId } });
    if (guestCart) await clearCart(guestCart.id);
  } catch {
    /* guest cookie may be missing in webhook contexts */
  }

  await emails.orderPaid(payment.order.email, payment.order.number);
  await fulfillPaidOrder(payment.orderId, params.eventId);
  await track("payment_successful", { meta: { orderId: payment.orderId } });
  await track("purchase", { meta: { orderId: payment.orderId, total: payment.amountCents } });
  await audit({
    action: "payment.succeeded",
    entity: "Payment",
    entityId: payment.id,
    meta: { eventId: params.eventId },
  });
  return payment;
}

export async function markPaymentFailed(paymentId: string, eventId: string) {
  const payment = await prisma.payment.findUnique({ where: { id: paymentId }, include: { order: true } });
  if (!payment) return;
  if (payment.rawEventId === eventId) return;
  await prisma.payment.update({ where: { id: paymentId }, data: { status: "FAILED", rawEventId: eventId } });
  await prisma.order.update({ where: { id: payment.orderId }, data: { status: "FAILED" } });
  await releaseReservations(payment.orderId);
  await emails.failed(payment.order.email, payment.order.number);
}
