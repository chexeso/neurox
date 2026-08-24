import { prisma } from "@/lib/db";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = { title: "Статус заказа" };
export const dynamic = "force-dynamic";

export default async function OrderLookupPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const number = (key || "").trim().toUpperCase();
  const order = number
    ? await prisma.order.findFirst({
        where: { number },
        include: { items: true },
      }).catch(() => null)
    : null;

  return (
    <div className="container-nx max-w-xl py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Статус заказа</h1>
      <p className="mt-2 text-sm text-[color:var(--fg-mute)]">Введите ключ NX-…</p>
      <form className="mt-6 flex gap-2">
        <input name="key" className="field flex-1" defaultValue={number} placeholder="NX-XXXXXX" />
        <button className="btn btn-primary" type="submit">
          Найти
        </button>
      </form>

      {number && !order && <p className="mt-8 text-sm text-[color:var(--fg-mute)]">Заказ не найден.</p>}

      {order && (
        <div className="card mt-8 p-6">
          <p className="font-mono text-2xl">{order.number}</p>
          <p className="mt-2 text-sm text-[color:var(--fg-mute)]">
            Статус: {order.status === "PAID" || order.status === "FULFILLED" ? "оплачен / в выдаче" : order.status}
          </p>
          <ul className="mt-4 text-sm text-[color:var(--fg-mute)]">
            {order.items.map((i) => (
              <li key={i.id}>{i.productName}</li>
            ))}
          </ul>
          <a className="btn btn-primary mt-6" href={site.support.telegramPrimary} target="_blank" rel="noreferrer">
            Написать в Telegram
          </a>
        </div>
      )}

      <Link href="/support" className="mt-8 inline-block text-sm text-[color:var(--fg-mute)]">
        Поддержка
      </Link>
    </div>
  );
}
