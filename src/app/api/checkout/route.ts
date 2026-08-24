import { NextResponse } from "next/server";
import { createOrderFromCart } from "@/lib/checkout";
import { ensureGuestCookie } from "@/lib/session";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  country: z.string().optional(),
  couponCode: z.string().optional(),
});

export async function POST(req: Request) {
  await ensureGuestCookie();
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Проверьте данные покупателя" }, { status: 400 });
  try {
    const { order } = await createOrderFromCart({
      email: parsed.data.email,
      name: parsed.data.name,
      country: parsed.data.country,
      couponCode: parsed.data.couponCode || undefined,
    });
    return NextResponse.json({ orderId: order.id, number: order.number });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "ERROR";
    console.error("checkout error:", msg, e);
    const map: Record<string, string> = {
      CART_EMPTY: "Корзина пуста. Добавьте товар и попробуйте снова.",
      OUT_OF_STOCK: "Недостаточно свободных ключей",
      PRODUCT_UNAVAILABLE: "Товар больше не продаётся",
      COUPON_INVALID: "Промокод не найден",
      COUPON_EXPIRED: "Промокод истёк",
      COUPON_EXHAUSTED: "Лимит промокода исчерпан",
      COUPON_MIN_ORDER: "Сумма заказа ниже минимума промокода",
      COUPON_PRODUCT: "Промокод не действует на эти товары",
      COUPON_CATEGORY: "Промокод не действует на эту категорию",
    };
    return NextResponse.json({ error: map[msg] || "Не удалось оформить заказ" }, { status: 400 });
  }
}
