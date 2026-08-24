import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Header } from "@/components/store/header";
import { Footer } from "@/components/store/footer";

const links = [
  ["Обзор", "/account"],
  ["Заказы", "/account/orders"],
  ["Продукты", "/account/products"],
  ["Лицензии", "/account/licenses"],
  ["Загрузки", "/account/downloads"],
  ["Профиль", "/account/profile"],
  ["Безопасность", "/account/security"],
];

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return (
    <div className="flex min-h-screen flex-col">
      <Header userName={user.name || user.email} />
      <div className="container-nx grid flex-1 gap-8 py-10 md:grid-cols-[220px_1fr]">
      <aside className="card h-fit p-4">
        <p className="px-2 text-xs uppercase tracking-[0.16em] text-[color:var(--fg-mute)]">Кабинет</p>
        <nav className="mt-3 flex flex-col gap-1 text-sm">
          {links.map(([l, h]) => (
            <Link key={h} href={h} className="rounded-lg px-2 py-2 hover:bg-[color:var(--bg-mute)]">
              {l}
            </Link>
          ))}
        </nav>
      </aside>
      <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
}
