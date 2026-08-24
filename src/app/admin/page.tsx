import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/utils";

export const metadata = { title: "Админка" };

export default async function AdminHome() {
  const [orders, users, products, payments] = await Promise.all([
    prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: "desc" }, take: 8 }),
    prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.product.findMany({ where: { status: "PUBLISHED" }, include: { variants: true } }),
    prisma.payment.findMany({ where: { status: "SUCCEEDED" } }),
  ]);
  const revenue = payments.reduce((s, p) => s + p.amountCents, 0);
  const aov = payments.length ? Math.round(revenue / payments.length) : 0;
  const paidOrders = await prisma.order.count({ where: { status: { in: ["PAID", "FULFILLED"] } } });
  const started = await prisma.analyticsEvent.count({ where: { name: "checkout_started" } });
  const conversion = started ? Math.round((paidOrders / started) * 100) : 0;
  const refunds = await prisma.order.count({ where: { status: "REFUNDED" } });

  const byDay = new Map<string, number>();
  for (const p of payments) {
    const day = p.createdAt.toISOString().slice(0, 10);
    byDay.set(day, (byDay.get(day) || 0) + p.amountCents);
  }
  const chart = Array.from(byDay.entries()).slice(-10);

  return (
    <div>
      <h1 className="text-3xl font-semibold">Панель</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Выручка", formatMoney(revenue)],
          ["Заказы", String(paidOrders)],
          ["Средний чек", formatMoney(aov)],
          ["Конверсия", `${conversion}%`],
          ["Клиенты", String(await prisma.user.count())],
          ["Товары", String(products.length)],
          ["Возвраты", String(refunds)],
          ["Активные ключи", String(await prisma.digitalItem.count({ where: { status: "ASSIGNED" } }))],
        ].map(([l, v]) => (
          <div key={l} className="card p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--fg-mute)]">{l}</p>
            <p className="mt-2 text-2xl font-semibold">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="font-medium">Выручка</h2>
          <div className="mt-4 flex h-40 items-end gap-2">
            {chart.length === 0 && <p className="text-sm text-[color:var(--fg-mute)]">Появятся после оплат</p>}
            {chart.map(([d, v]) => (
              <div key={d} className="flex-1">
                <div className="rounded-t bg-[color:var(--accent)]" style={{ height: `${Math.max(8, (v / Math.max(...chart.map((c) => c[1]), 1)) * 140)}px` }} />
                <p className="mt-1 truncate text-[10px] text-[color:var(--fg-mute)]">{d.slice(5)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-5">
          <h2 className="font-medium">Последние заказы</h2>
          <div className="mt-3 space-y-2 text-sm">
            {orders.map((o) => (
              <a key={o.id} href={`/admin/orders/${o.id}`} className="flex justify-between">
                <span>{o.number}</span>
                <span>{o.status}</span>
                <span>{formatMoney(o.totalCents)}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="card mt-6 p-5">
        <h2 className="font-medium">Новые клиенты</h2>
        <div className="mt-3 space-y-2 text-sm">
          {users.map((u) => (
            <div key={u.id} className="flex justify-between">
              <span>{u.email}</span>
              <span className="text-[color:var(--fg-mute)]">{u.createdAt.toISOString().slice(0, 10)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
