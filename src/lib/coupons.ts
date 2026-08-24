import { prisma } from "./db";

export async function evaluateCoupon(code: string | null | undefined, params: {
  subtotalCents: number;
  productIds: string[];
  categoryIds: string[];
}) {
  if (!code) return { discountCents: 0, coupon: null as null | Awaited<ReturnType<typeof prisma.coupon.findUnique>> };
  const coupon = await prisma.coupon.findUnique({ where: { code: code.trim().toUpperCase() } });
  if (!coupon || !coupon.isActive) throw new Error("COUPON_INVALID");
  if (coupon.expiresAt && coupon.expiresAt < new Date()) throw new Error("COUPON_EXPIRED");
  if (coupon.usageLimit != null && coupon.usedCount >= coupon.usageLimit) throw new Error("COUPON_EXHAUSTED");
  if (params.subtotalCents < coupon.minOrderCents) throw new Error("COUPON_MIN_ORDER");
  if (coupon.productId && !params.productIds.includes(coupon.productId)) throw new Error("COUPON_PRODUCT");
  if (coupon.categoryId && !params.categoryIds.includes(coupon.categoryId)) throw new Error("COUPON_CATEGORY");

  const discountCents =
    coupon.type === "PERCENTAGE"
      ? Math.floor((params.subtotalCents * coupon.value) / 100)
      : Math.min(coupon.value, params.subtotalCents);

  return { discountCents, coupon };
}
