import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { AdminCommand } from "@/components/admin/command";

const links = [
  ["Обзор", "/admin"],
  ["Товары", "/admin/products"],
  ["Инвентарь", "/admin/inventory"],
  ["Заказы", "/admin/orders"],
  ["Клиенты", "/admin/customers"],
  ["Промокоды", "/admin/coupons"],
  ["Отзывы", "/admin/reviews"],
  ["FAQ", "/admin/faq"],
  ["CMS", "/admin/cms"],
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role.name !== "ADMIN" && user.role.name !== "SUPERADMIN") redirect("/");
  return (
    <div className="min-h-screen bg-[color:var(--bg)]">
      <div className="grid min-h-screen md:grid-cols-[230px_1fr]">
        <aside className="border-r border-[color:var(--line)] p-5">
          <p className="text-sm font-semibold">NeuroX Admin</p>
          <nav className="mt-6 flex flex-col gap-1 text-sm">
            {links.map(([l, h]) => (
              <Link key={h} href={h} className="rounded-lg px-2 py-2 hover:bg-[color:var(--bg-mute)]">
                {l}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="p-6 md:p-8">
          <AdminCommand />
          {children}
        </div>
      </div>
    </div>
  );
}
