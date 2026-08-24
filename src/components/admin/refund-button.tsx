"use client";

import { useRouter } from "next/navigation";

export function RefundButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  return (
    <button
      className="btn btn-ghost mt-6"
      onClick={async () => {
        if (!confirm("Оформить возврат и отозвать ключи?")) return;
        await fetch("/api/admin/refund", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });
        router.refresh();
      }}
    >
      Оформить возврат
    </button>
  );
}
