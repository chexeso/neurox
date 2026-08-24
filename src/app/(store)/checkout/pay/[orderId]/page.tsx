import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { formatMoney } from "@/lib/utils";
import { PayActions } from "@/components/store/pay-actions";
import { getCurrentUser } from "@/lib/session";

export const metadata = { title: "Оплата" };

export default async function PayPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const user = await getCurrentUser();
  const order = await prisma.order.findUnique({ where: { id: orderId }, include: { items: true, payments: true } });
  if (!order) notFound();
  if (user && order.userId && order.userId !== user.id) notFound();
  const payment = order.payments[0];

  return (
    <div className="container-nx max-w-xl py-16">
      <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--fg-mute)]">Шаг 3 · Оплата</p>
      <h1 className="mt-2 text-4xl font-semibold">Оплата заказа {order.number}</h1>
      <div className="card mt-6 p-6">
        {order.items.map((i) => (
          <div key={i.id} className="flex justify-between py-1 text-sm">
            <span>
              {i.productName} · {i.variantName}
            </span>
            <span>{formatMoney(i.totalCents)}</span>
          </div>
        ))}
        <div className="mt-4 flex justify-between border-t border-[color:var(--line)] pt-4">
          <span>Скидка</span>
          <span>−{formatMoney(order.discountCents)}</span>
        </div>
        <div className="mt-2 flex justify-between text-lg font-semibold">
          <span>Итого</span>
          <span>{formatMoney(order.totalCents)}</span>
        </div>
      </div>
      <PayActions orderId={order.id} paymentId={payment?.id || ""} demo={payment?.provider === "demo"} />
      <p className="mt-4 text-xs text-[color:var(--fg-mute)]">
        Товар выдаётся только после подтверждённого серверного события оплаты. Кнопка в браузере сама по себе ключ не открывает.
      </p>
    </div>
  );
}
