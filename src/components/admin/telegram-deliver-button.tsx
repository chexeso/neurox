"use client";

import { useRouter } from "next/navigation";

export function TelegramDeliverButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  return (
    <button
      className="btn btn-primary mt-6"
      onClick={async () => {
        await fetch("/api/admin/telegram-deliver", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });
        router.refresh();
      }}
    >
      Отметить: выдано в Telegram
    </button>
  );
}
