import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  orderId: z.string(),
  productId: z.string(),
  rating: z.number().int().min(1).max(5),
  body: z.string().min(3).max(2000),
  title: z.string().max(120).optional(),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Проверьте оценку и текст" }, { status: 400 });
  const user = await getCurrentUser();
  const order = await prisma.order.findUnique({
    where: { id: parsed.data.orderId },
    include: { items: { include: { variant: true } } },
  });
  if (!order || (order.status !== "PAID" && order.status !== "FULFILLED")) {
    return NextResponse.json({ error: "Заказ не найден" }, { status: 404 });
  }
  if (user && order.userId && order.userId !== user.id) {
    return NextResponse.json({ error: "Это не ваш заказ" }, { status: 403 });
  }
  const owned = order.items.some((i) => i.variant.productId === parsed.data.productId);
  if (!owned) return NextResponse.json({ error: "Товар не в этом заказе" }, { status: 400 });

  const review = await prisma.review.create({
    data: {
      productId: parsed.data.productId,
      userId: user?.id,
      rating: parsed.data.rating,
      title: parsed.data.title,
      body: parsed.data.body,
      verifiedPurchase: true,
      status: "APPROVED",
      source: "internal",
    },
  });
  return NextResponse.json({ ok: true, id: review.id });
}
