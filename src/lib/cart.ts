import { prisma } from "./db";
import { getCurrentUser, getGuestId } from "./session";
import { cookies } from "next/headers";

const cartInclude = {
  items: { include: { variant: { include: { product: true } } } },
} as const;

async function mergeGuestIntoUser(userId: string) {
  try {
    const jar = await cookies();
    const guestId = jar.get("nx_guest")?.value;
    if (!guestId) return;
    const guestCart = await prisma.cart.findUnique({
      where: { guestId },
      include: { items: true },
    });
    if (!guestCart || guestCart.items.length === 0) return;

    let userCart = await prisma.cart.findFirst({ where: { userId } });
    if (!userCart) {
      userCart = await prisma.cart.create({ data: { userId } });
    }

    for (const item of guestCart.items) {
      const existing = await prisma.cartItem.findFirst({
        where: { cartId: userCart.id, variantId: item.variantId },
      });
      if (existing) {
        await prisma.cartItem.update({
          where: { id: existing.id },
          data: { quantity: existing.quantity + item.quantity },
        });
      } else {
        await prisma.cartItem.create({
          data: { cartId: userCart.id, variantId: item.variantId, quantity: item.quantity },
        });
      }
    }
    await prisma.cartItem.deleteMany({ where: { cartId: guestCart.id } });
  } catch {
    /* ignore merge errors */
  }
}

export async function getOrCreateCart() {
  const user = await getCurrentUser();
  if (user) {
    await mergeGuestIntoUser(user.id);
    const existing = await prisma.cart.findFirst({
      where: { userId: user.id },
      include: cartInclude,
    });
    if (existing) return existing;
    return prisma.cart.create({
      data: { userId: user.id },
      include: cartInclude,
    });
  }

  const guestId = await getGuestId();
  const existing = await prisma.cart.findUnique({
    where: { guestId },
    include: cartInclude,
  });
  if (existing) return existing;
  return prisma.cart.create({
    data: { guestId },
    include: cartInclude,
  });
}

export async function addToCart(variantId: string, quantity = 1) {
  const cart = await getOrCreateCart();
  const variant = await prisma.productVariant.findUnique({
    where: { id: variantId },
    include: { product: true },
  });
  if (!variant || variant.product.status !== "PUBLISHED") {
    throw new Error("PRODUCT_UNAVAILABLE");
  }
  const available = await prisma.digitalItem.count({
    where: { variantId, status: "AVAILABLE" },
  });
  if (available < quantity) throw new Error("OUT_OF_STOCK");

  const item = cart.items.find((i) => i.variantId === variantId);
  const nextQty = (item?.quantity ?? 0) + quantity;
  if (available < nextQty) throw new Error("OUT_OF_STOCK");

  if (item) {
    await prisma.cartItem.update({ where: { id: item.id }, data: { quantity: nextQty } });
  } else {
    await prisma.cartItem.create({ data: { cartId: cart.id, variantId, quantity } });
  }
  return getOrCreateCart();
}

export async function updateCartItem(itemId: string, quantity: number) {
  const cart = await getOrCreateCart();
  const item = cart.items.find((i) => i.id === itemId);
  if (!item) throw new Error("NOT_FOUND");
  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: itemId } });
  } else {
    const available = await prisma.digitalItem.count({
      where: { variantId: item.variantId, status: "AVAILABLE" },
    });
    if (available < quantity) throw new Error("OUT_OF_STOCK");
    await prisma.cartItem.update({ where: { id: itemId }, data: { quantity } });
  }
  return getOrCreateCart();
}

export async function clearCart(cartId: string) {
  await prisma.cartItem.deleteMany({ where: { cartId } });
}
