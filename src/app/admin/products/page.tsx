import { prisma } from "@/lib/db";
import Link from "next/link";
import { formatMoney } from "@/lib/utils";

export default async function AdminProducts() {
  const products = await prisma.product.findMany({ include: { variants: true, category: true }, orderBy: { updatedAt: "desc" } });
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Товары</h1>
        <Link href="/admin/products/new" className="btn btn-primary">
          Новый товар
        </Link>
      </div>
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-[color:var(--fg-mute)]">
            <tr>
              <th className="p-3">Название</th>
              <th>Категория</th>
              <th>Статус</th>
              <th>Варианты</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-[color:var(--line)]">
                <td className="p-3">
                  <Link href={`/admin/products/${p.id}`}>{p.name}</Link>
                </td>
                <td>{p.category.name}</td>
                <td>{p.status}</td>
                <td>
                  {p.variants.map((v) => (
                    <span key={v.id} className="mr-2">
                      {v.name} {formatMoney(v.priceCents)}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
