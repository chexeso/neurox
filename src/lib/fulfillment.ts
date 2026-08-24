import { prisma } from "./db";
import { emails } from "./email";
import { audit } from "./audit";

const RESERVE_MINUTES = 20;

export async function releaseReservations(orderId: string) {
  await prisma.digitalItem.updateMany({
    where: { reservedByOrderId: orderId, status: "RESERVED" },
    data: { status: "AVAILABLE", reservedByOrderId: null, reservedUntil: null },
  });
}

export async function reserveForOrder(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });
  if (!order) throw new Error("ORDER_NOT_FOUND");

  await prisma.$transaction(async (tx) => {
    for (const item of order.items) {
      const needed = item.quantity;
      const available = await tx.digitalItem.findMany({
        where: { variantId: item.variantId, status: "AVAILABLE" },
        take: needed,
      });
      if (available.length < needed) {
        throw new Error("OUT_OF_STOCK");
      }
      await tx.digitalItem.updateMany({
        where: { id: { in: available.map((d) => d.id) } },
        data: {
          status: "RESERVED",
          reservedByOrderId: orderId,
          reservedUntil: new Date(Date.now() + RESERVE_MINUTES * 60 * 1000),
        },
      });
    }
  });
}

export async function fulfillPaidOrder(orderId: string, eventId?: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { variant: { include: { product: true } } } }, payments: true, user: true },
  });
  if (!order) throw new Error("ORDER_NOT_FOUND");
  if (order.status === "FULFILLED") return order;

  const reserved = await prisma.digitalItem.findMany({
    where: { reservedByOrderId: orderId, status: "RESERVED" },
  });

  const assignments: { itemId: string; digitalId: string; payload: string; instructions: string | null; product: string; variant: string }[] = [];

  await prisma.$transaction(async (tx) => {
    for (const line of order.items) {
      let pool = reserved.filter((d) => d.variantId === line.variantId && !assignments.find((a) => a.digitalId === d.id));
      if (pool.length < line.quantity) {
        const extra = await tx.digitalItem.findMany({
          where: { variantId: line.variantId, status: { in: ["AVAILABLE", "RESERVED"] } },
          take: line.quantity - pool.length,
        });
        pool = [...pool, ...extra];
      }
      if (pool.length < line.quantity) throw new Error("OUT_OF_STOCK");
      const pick = pool.slice(0, line.quantity);
      for (const d of pick) {
        await tx.digitalItem.update({
          where: { id: d.id },
          data: {
            status: "ASSIGNED",
            assignedOrderItemId: line.id,
            reservedByOrderId: orderId,
            reservedUntil: null,
          },
        });
        assignments.push({
          itemId: line.id,
          digitalId: d.id,
          payload: d.payload,
          instructions: d.instructions,
          product: line.productName,
          variant: line.variantName,
        });
      }
    }

    await tx.order.update({
      where: { id: orderId },
      data: { status: "FULFILLED", paidAt: order.paidAt ?? new Date() },
    });
    await tx.delivery.create({
      data: {
        orderId,
        userId: order.userId,
        status: "DELIVERED",
        deliveredAt: new Date(),
        payload: JSON.stringify(assignments.map((a) => ({ product: a.product, variant: a.variant, id: a.digitalId }))),
      },
    });
  });

  const details = assignments
    .map((a) => `<strong>${a.product} · ${a.variant}</strong><br/>Ключ: ${a.payload}${a.instructions ? `<br/>${a.instructions}` : ""}`)
    .join("<br/><br/>");

  await emails.delivery(order.email, order.number, details);
  await audit({ action: "order.fulfilled", entity: "Order", entityId: orderId, meta: { eventId, count: assignments.length } });
  return order;
}

export async function refundOrder(orderId: string, adminId?: string) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("ORDER_NOT_FOUND");

  await prisma.$transaction(async (tx) => {
    await tx.digitalItem.updateMany({
      where: { reservedByOrderId: orderId },
      data: { status: "REVOKED", assignedOrderItemId: null },
    });
    await tx.order.update({
      where: { id: orderId },
      data: { status: "REFUNDED", refundedAt: new Date() },
    });
    await tx.payment.updateMany({
      where: { orderId, status: "SUCCEEDED" },
      data: { status: "REFUNDED" },
    });
    await tx.delivery.updateMany({
      where: { orderId },
      data: { status: "REVOKED" },
    });
  });
  await emails.refund(order.email, order.number);
  await audit({ userId: adminId, action: "order.refunded", entity: "Order", entityId: orderId });
}
