import { prisma } from "@/lib/db";
import { CouponForm } from "@/components/admin/coupon-form";

export default async function CouponsPage() {
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1 className="text-3xl font-semibold">Промокоды</h1>
      <CouponForm />
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[color:var(--fg-mute)]">
              <th className="p-3">Код</th>
              <th>Тип</th>
              <th>Значение</th>
              <th>Использовано</th>
              <th>Активен</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.id} className="border-t border-[color:var(--line)]">
                <td className="p-3">{c.code}</td>
                <td>{c.type}</td>
                <td>{c.value}</td>
                <td>
                  {c.usedCount}
                  {c.usageLimit ? `/${c.usageLimit}` : ""}
                </td>
                <td>{c.isActive ? "yes" : "no"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
