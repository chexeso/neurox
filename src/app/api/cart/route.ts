import { NextResponse } from "next/server";
import { addToCart, updateCartItem, getOrCreateCart } from "@/lib/cart";
import { ensureGuestCookie } from "@/lib/session";
import { track } from "@/lib/audit";

export async function GET() {
  await ensureGuestCookie();
  const cart = await getOrCreateCart();
  return NextResponse.json({
    id: cart.id,
    items: cart.items.map((i) => ({
      id: i.id,
      quantity: i.quantity,
      variantId: i.variantId,
      productName: i.variant.product.name,
      variantName: i.variant.name,
      priceCents: i.variant.priceCents,
    })),
    count: cart.items.reduce((s, i) => s + i.quantity, 0),
  });
}

export async function POST(req: Request) {
  try {
    await ensureGuestCookie();
    const body = await req.json();
    const variantId = String(body.variantId || "");
    const quantity = Number(body.quantity || 1);
    if (!variantId) return NextResponse.json({ error: "Не выбран товар" }, { status: 400 });
    const cart = await addToCart(variantId, quantity);
    await track("add_to_cart", { meta: { variantId } });
    return NextResponse.json({
      ok: true,
      count: cart.items.reduce((s, i) => s + i.quantity, 0),
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "ERROR";
    const map: Record<string, string> = {
      PRODUCT_UNAVAILABLE: "Продукт недоступен",
      OUT_OF_STOCK: "Свободных ключей нет",
    };
    return NextResponse.json({ error: map[msg] || "Не удалось добавить" }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    await ensureGuestCookie();
    const { itemId, quantity } = await req.json();
    await updateCartItem(String(itemId), Number(quantity));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Не удалось обновить" }, { status: 400 });
  }
}
