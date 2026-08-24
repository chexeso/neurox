import { getOrCreateCart } from "@/lib/cart";
import { formatMoney } from "@/lib/utils";
import { CartControls } from "@/components/store/cart-controls";
import Link from "next/link";

export const metadata = { title: "Корзина" };

export default async function CartPage() {
  const cart = await getOrCreateCart();
  const subtotal = cart.items.reduce((s, i) => s + i.variant.priceCents * i.quantity, 0);

  return (
    <div className="container-nx py-12">
      <h1 className="text-4xl font-semibold tracking-tight">Корзина</h1>
      {cart.items.length === 0 ? (
        <div className="card mt-8 p-10 text-center">
          <h2 className="text-2xl">Пока пусто</h2>
          <p className="mt-2 text-[color:var(--fg-mute)]">Добавьте продукт — checkout займёт минуту.</p>
          <Link href="/products" className="btn btn-primary mt-6">
            В каталог
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_.7fr]">
          <div className="space-y-3">
            {cart.items.map((item) => (
              <div key={item.id} className="card flex items-center gap-4 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.variant.product.previewImage || "/brand/og.jpg"} alt="" className="h-16 w-24 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-medium">{item.variant.product.name}</p>
                  <p className="text-sm text-[color:var(--fg-mute)]">{item.variant.name}</p>
                </div>
                <p className="font-medium">{formatMoney(item.variant.priceCents * item.quantity)}</p>
                <CartControls itemId={item.id} quantity={item.quantity} />
              </div>
            ))}
          </div>
          <aside className="card h-fit p-6">
            <p className="text-sm text-[color:var(--fg-mute)]">Промежуточный итог</p>
            <p className="mt-1 text-3xl font-semibold">{formatMoney(subtotal)}</p>
            <p className="mt-2 text-xs text-[color:var(--fg-mute)]">Скидка по промокоду применится на checkout. Цену сервер пересчитает заново.</p>
            <Link href="/checkout" className="btn btn-primary mt-6 w-full">
              Перейти к оплате
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
