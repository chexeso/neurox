import { prisma } from "@/lib/db";
import { InventoryTools } from "@/components/admin/inventory-tools";

export default async function InventoryPage() {
  const variants = await prisma.productVariant.findMany({
    include: { product: true, digitalItems: true },
    orderBy: { sku: "asc" },
  });
  return (
    <div>
      <h1 className="text-3xl font-semibold">Digital inventory</h1>
      <p className="mt-2 text-sm text-[color:var(--fg-mute)]">Неиспользованные ключи клиенту не показываются.</p>
      <InventoryTools variants={variants.map((v) => ({ id: v.id, label: `${v.product.name} · ${v.name}` }))} />
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[color:var(--fg-mute)]">
              <th className="p-3">Вариант</th>
              <th>Available</th>
              <th>Reserved</th>
              <th>Assigned</th>
              <th>Revoked</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((v) => {
              const c = (s: string) => v.digitalItems.filter((d) => d.status === s).length;
              return (
                <tr key={v.id} className="border-t border-[color:var(--line)]">
                  <td className="p-3">
                    {v.product.name} · {v.name}
                  </td>
                  <td>{c("AVAILABLE")}</td>
                  <td>{c("RESERVED")}</td>
                  <td>{c("ASSIGNED")}</td>
                  <td>{c("REVOKED")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
