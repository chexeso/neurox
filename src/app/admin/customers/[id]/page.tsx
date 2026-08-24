import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { formatMoney } from "@/lib/utils";

export default async function CustomerDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id }, include: { orders: true, role: true } });
  if (!user) notFound();
  return (
    <div>
      <h1 className="text-3xl font-semibold">{user.email}</h1>
      <p className="mt-2 text-sm text-[color:var(--fg-mute)]">
        {user.name} · {user.role.name} · {user.isActive ? "active" : "disabled"}
      </p>
      <div className="mt-6 space-y-2">
        {user.orders.map((o) => (
          <a key={o.id} href={`/admin/orders/${o.id}`} className="card flex justify-between p-4 text-sm">
            <span>{o.number}</span>
            <span>{o.status}</span>
            <span>{formatMoney(o.totalCents)}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
