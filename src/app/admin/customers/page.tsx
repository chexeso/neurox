import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/utils";
import Link from "next/link";

export default async function CustomersPage() {
  const users = await prisma.user.findMany({
    include: { role: true, orders: true },
    orderBy: { createdAt: "desc" },
    take: 200,
  });
  return (
    <div>
      <h1 className="text-3xl font-semibold">Клиенты</h1>
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[color:var(--fg-mute)]">
              <th className="p-3">Email</th>
              <th>Роль</th>
              <th>Заказы</th>
              <th>Сумма</th>
              <th>Регистрация</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-[color:var(--line)]">
                <td className="p-3">
                  <Link href={`/admin/customers/${u.id}`}>{u.email}</Link>
                </td>
                <td>{u.role.name}</td>
                <td>{u.orders.length}</td>
                <td>{formatMoney(u.orders.filter((o) => o.status === "FULFILLED" || o.status === "PAID").reduce((s, o) => s + o.totalCents, 0))}</td>
                <td>{u.createdAt.toISOString().slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
