import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div>
      <h1 className="text-3xl font-semibold">Заказы</h1>
      <div className="mt-6 space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="card p-5">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{o.number}</span>
              <span>{o.status}</span>
              <span>{formatMoney(o.totalCents)}</span>
            </div>
            <ul className="mt-2 text-sm text-[color:var(--fg-mute)]">
              {o.items.map((i) => (
                <li key={i.id}>
                  {i.productName} · {i.variantName}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
