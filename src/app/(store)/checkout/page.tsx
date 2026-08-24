import { getOrCreateCart } from "@/lib/cart";
import { getCurrentUser } from "@/lib/session";
import { formatMoney } from "@/lib/utils";
import { CheckoutForm } from "@/components/store/checkout-form";
import Link from "next/link";

export const metadata = { title: "Оформление заказа" };

export default async function CheckoutPage() {
  const cart = await getOrCreateCart();
  const user = await getCurrentUser();
  const subtotal = cart.items.reduce((s, i) => s + i.variant.priceCents * i.quantity, 0);

  if (cart.items.length === 0) {
    return (
      <div className="container-nx py-16 text-center">
        <h1 className="text-3xl font-semibold">Сначала соберите корзину</h1>
        <Link href="/products" className="btn btn-primary mt-6">
          Каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="container-nx grid gap-8 py-12 lg:grid-cols-[1.1fr_.9fr]">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--fg-mute)]">1. Корзина → 2. Данные → 3. Оплата → 4. Доступ</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Оформление</h1>
        <CheckoutForm defaultEmail={user?.email || ""} defaultName={user?.name || ""} />
      </div>
      <aside className="card h-fit p-6">
        <h2 className="font-medium">Состав заказа</h2>
        <div className="mt-4 space-y-3 text-sm">
          {cart.items.map((i) => (
            <div key={i.id} className="flex justify-between gap-3">
              <span>
                {i.variant.product.name} · {i.variant.name} × {i.quantity}
              </span>
              <span>{formatMoney(i.variant.priceCents * i.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between border-t border-[color:var(--line)] pt-4">
          <span>Пока без скидки</span>
          <span className="font-semibold">{formatMoney(subtotal)}</span>
        </div>
        <p className="mt-3 text-xs text-[color:var(--fg-mute)]">Промокод, скидка и итог фиксируются на сервере в момент создания заказа.</p>
        <ul className="mt-5 space-y-1 text-xs text-[color:var(--fg-mute)]">
          <li>Защищённая оплата</li>
          <li>
            <Link href="/legal/refund">Политика возврата</Link>
          </li>
          <li>
            <Link href="/legal/terms">Оферта</Link> · <Link href="/legal/privacy">Конфиденциальность</Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}
