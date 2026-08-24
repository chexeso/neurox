"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CartControls({ itemId, quantity }: { itemId: string; quantity: number }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function setQty(next: number) {
    setPending(true);
    await fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, quantity: next }),
    });
    setPending(false);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <button className="btn btn-ghost !px-3" disabled={pending} onClick={() => setQty(quantity - 1)}>
        −
      </button>
      <span className="w-6 text-center text-sm">{quantity}</span>
      <button className="btn btn-ghost !px-3" disabled={pending} onClick={() => setQty(quantity + 1)}>
        +
      </button>
    </div>
  );
}
