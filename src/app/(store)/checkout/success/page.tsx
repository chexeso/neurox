import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { ReviewForm } from "@/components/store/review-form";
import { CopyButton } from "@/components/store/copy-button";
import { SuccessWow } from "@/components/store/success-wow";

export const metadata = { title: "Оплата прошла" };

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order: orderId } = await searchParams;
  if (!orderId) notFound();
  const user = await getCurrentUser();
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { variant: { include: { product: true } } } } },
  });
  if (!order) notFound();
  if (user && order.userId && order.userId !== user.id) notFound();
  if (order.status !== "PAID" && order.status !== "FULFILLED") {
    return (
      <div className="container-nx max-w-xl py-20 text-center">
        <h1 className="text-3xl font-semibold">Платёж ещё подтверждается</h1>
        <p className="mt-3 text-[color:var(--fg-mute)]">Как только сервер получит событие оплаты, ключ заказа появится здесь.</p>
      </div>
    );
  }

  const products = order.items.map((item) => ({
    productId: item.variant.productId,
    name: item.productName,
  }));
  const tgText = encodeURIComponent(`Здравствуйте! Оплатил заказ ${order.number}. Прошу выдать товар.`);

  return (
    <div className="container-nx max-w-2xl py-16">
      <SuccessWow number={order.number} />
      <p className="mt-6 text-[color:var(--fg-mute)]">
        Сообщите этот ключ в поддержку Telegram — по нему найдём заказ и выдадим товар.
      </p>
      <div className="card mt-4 p-6">
        <h2 className="text-xl font-semibold">Как получить товар</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[color:var(--fg-mute)]">
          <li>Скопируйте ключ заказа {order.number}.</li>
          <li>Напишите в поддержку Telegram.</li>
          <li>Отправьте ключ — товар выдадут в этом же чате.</li>
        </ol>
        <div className="mt-5 flex flex-wrap gap-3">
          <a className="btn btn-primary" href={`${site.support.telegramPrimary}?text=${tgText}`} target="_blank" rel="noreferrer">
            Написать в поддержку
          </a>
          <a className="btn btn-ghost" href={`${site.support.telegramSecondary}?text=${tgText}`} target="_blank" rel="noreferrer">
            Дополнительная поддержка
          </a>
        </div>
      </div>
      <div className="card mt-4 p-6">
        <h2 className="text-xl font-semibold">Оставьте отзыв</h2>
        <p className="mt-2 text-sm text-[color:var(--fg-mute)]">Он появится во внутренних отзывах NeuroX.</p>
        <div className="mt-4 space-y-6">
          {products.map((p) => (
            <ReviewForm key={p.productId} orderId={order.id} productId={p.productId} productName={p.name} />
          ))}
        </div>
      </div>
      <div className="mt-8 flex gap-3">
        <Link href="/account/orders" className="btn btn-ghost">
          Мои заказы
        </Link>
        <Link href="/products" className="btn btn-ghost">
          В каталог
        </Link>
      </div>
    </div>
  );
}
