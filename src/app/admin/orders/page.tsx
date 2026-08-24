import { prisma } from "@/lib/db";
import Link from "next/link";
import { formatMoney } from "@/lib/utils";

export default async function AdminOrders({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { status, q } = await searchParams;
  const orders = await prisma.order.findMany({
    where: {
      ...(status ? { status: status as never } : {}),
      ...(q
        ? {
            OR: [
              { number: { contains: q.trim().toUpperCase() } },
              { email: { contains: q.trim() } },
              { customerName: { contains: q.trim() } },
            ],
          }
        : {}),
    },
    include: { items: true, payments: true },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return (
    <div>
      <h1 className="text-3xl font-semibold">Заказы</h1>
      <p className="mt-2 text-sm text-[color:var(--fg-mute)]">Ищите по ключу заказа, который прислал покупатель в Telegram.</p>
      <form className="mt-4 flex gap-2" action="/admin/orders">
        <input name="q" defaultValue={q || ""} className="field max-w-sm" placeholder="Ключ заказа, например NX-123456" />
        <button className="btn btn-primary" type="submit">
          Найти
        </button>
      </form>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        {["", "PAID", "FULFILLED", "AWAITING_PAYMENT", "FAILED", "REFUNDED"].map((s) => (
          <Link key={s} href={s ? `/admin/orders?status=${s}` : "/admin/orders"} className="badge">
            {s || "все"}
          </Link>
        ))}
      </div>
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[color:var(--fg-mute)]">
              <th className="p-3">Ключ заказа</th>
              <th>Клиент</th>
              <th>Товар</th>
              <th>Сумма</th>
              <th>Выдача в TG</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-[color:var(--line)]">
                <td className="p-3">
                  <Link href={`/admin/orders/${o.id}`}>{o.number}</Link>
                </td>
                <td>
                  {o.customerName}
                  <br />
                  <span className="text-[color:var(--fg-mute)]">{o.email}</span>
                </td>
                <td>{o.items.map((i) => i.productName).join(", ")}</td>
                <td>{formatMoney(o.totalCents)}</td>
                <td>{o.notes?.startsWith("telegram_delivered") ? "Выдан" : "Ждёт выдачи"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
