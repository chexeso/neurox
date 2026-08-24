import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/utils";
import { redirect } from "next/navigation";

export const metadata = { title: "Кабинет" };

export default async function AccountHome() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const orders = await prisma.order.findMany({ where: { userId: user.id }, include: { items: true }, orderBy: { createdAt: "desc" } });
  const spent = orders.filter((o) => o.status === "PAID" || o.status === "FULFILLED").reduce((s, o) => s + o.totalCents, 0);
  const licenses = await prisma.digitalItem.count({
    where: { assignedOrderItem: { order: { userId: user.id } }, status: "ASSIGNED" },
  });
  return (
    <div>
      <h1 className="text-3xl font-semibold">Обзор</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <p className="text-sm text-[color:var(--fg-mute)]">Всего потрачено</p>
          <p className="mt-2 text-2xl font-semibold">{formatMoney(spent)}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-[color:var(--fg-mute)]">Заказы</p>
          <p className="mt-2 text-2xl font-semibold">{orders.length}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-[color:var(--fg-mute)]">Активные продукты</p>
          <p className="mt-2 text-2xl font-semibold">{licenses}</p>
        </div>
      </div>
      <h2 className="mt-10 text-xl font-medium">Недавние покупки</h2>
      <div className="mt-4 space-y-2">
        {orders.slice(0, 5).map((o) => (
          <div key={o.id} className="card flex justify-between p-4 text-sm">
            <span>{o.number}</span>
            <span>{o.status}</span>
            <span>{formatMoney(o.totalCents)}</span>
          </div>
        ))}
        {orders.length === 0 && <p className="text-sm text-[color:var(--fg-mute)]">Покупок пока нет.</p>}
      </div>
    </div>
  );
}
