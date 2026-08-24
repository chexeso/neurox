import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { formatMoney } from "@/lib/utils";
import { RefundButton } from "@/components/admin/refund-button";
import { TelegramDeliverButton } from "@/components/admin/telegram-deliver-button";

export default async function OrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { digitalItems: true } }, payments: true, deliveries: true },
  });
  if (!order) notFound();
  return (
    <div>
      <h1 className="text-3xl font-semibold">Ключ {order.number}</h1>
      <p className="mt-2 text-sm text-[color:var(--fg-mute)]">
        {order.customerName} · {order.email} · {formatMoney(order.totalCents)}
      </p>
      <p className="mt-2 text-sm">
        Выдача в Telegram: {order.notes?.startsWith("telegram_delivered") ? "уже выдано" : "ожидает — покупатель должен написать в поддержку и назвать этот ключ"}
      </p>
      <div className="card mt-6 p-5 text-sm">
        {order.items.map((i) => (
          <div key={i.id} className="py-2">
            {i.productName} · {i.variantName} × {i.quantity}
            {i.digitalItems.map((d) => (
              <p key={d.id} className="font-mono text-xs text-[color:var(--fg-mute)]">
                {d.status}: {d.payload}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {!order.notes?.startsWith("telegram_delivered") && <TelegramDeliverButton orderId={order.id} />}
        {(order.status === "PAID" || order.status === "FULFILLED") && <RefundButton orderId={order.id} />}
      </div>
    </div>
  );
}
