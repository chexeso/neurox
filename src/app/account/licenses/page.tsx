import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { CopyButton } from "@/components/store/copy-button";

export default async function LicensesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const items = await prisma.digitalItem.findMany({
    where: { status: "ASSIGNED", assignedOrderItem: { order: { userId: user.id } } },
    include: { assignedOrderItem: true, variant: { include: { product: true } } },
  });
  return (
    <div>
      <h1 className="text-3xl font-semibold">Лицензии</h1>
      <div className="mt-6 space-y-3">
        {items.map((d) => (
          <div key={d.id} className="card p-5">
            <p className="font-medium">
              {d.variant.product.name} · {d.variant.name}
            </p>
            <p className="mt-2 font-mono text-sm">{d.payload}</p>
            {d.instructions && <p className="mt-2 text-sm text-[color:var(--fg-mute)]">{d.instructions}</p>}
            {d.expiresAt && <p className="mt-1 text-xs text-[color:var(--fg-mute)]">До {d.expiresAt.toISOString().slice(0, 10)}</p>}
            <CopyButton value={d.payload} />
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-[color:var(--fg-mute)]">Ключи появятся после подтверждённой оплаты.</p>}
      </div>
    </div>
  );
}
