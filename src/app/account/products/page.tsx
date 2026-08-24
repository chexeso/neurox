import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function ProductsOwned() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const items = await prisma.orderItem.findMany({
    where: { order: { userId: user.id, status: { in: ["PAID", "FULFILLED"] } } },
    include: { variant: { include: { product: true } } },
  });
  return (
    <div>
      <h1 className="text-3xl font-semibold">Продукты</h1>
      <div className="mt-6 grid gap-3">
        {items.map((i) => (
          <div key={i.id} className="card p-4">
            {i.variant.product.name} · {i.variantName}
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-[color:var(--fg-mute)]">После оплаты продукты появятся здесь.</p>}
      </div>
    </div>
  );
}
