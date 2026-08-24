"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/components/locale-provider";

export function AddToCartButton({
  variantId,
  quantity = 1,
  label,
  buyNow = false,
}: {
  variantId: string;
  quantity?: number;
  label?: string;
  buyNow?: boolean;
}) {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const t = useT();
  const resolvedLabel = label || t.add_to_cart;

  async function run() {
    setPending(true);
    try {
      const me = await fetch("/api/auth/me", { credentials: "same-origin" }).catch(() => null);
      const session = me ? await me.json().catch(() => ({})) : {};
      if (me && me.ok === false && me.status === 401) {
        window.location.href = "/login?next=/cart";
        return;
      }
      if (me?.ok && session && session.user === null) {
        window.location.href = "/login?next=/cart";
        return;
      }
      const res = await fetch("/api/cart", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId, quantity }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Не удалось добавить");
        return;
      }
      if (buyNow) router.push("/checkout");
      else router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <button type="button" className={buyNow ? "btn btn-primary" : "btn btn-ghost"} onClick={run} disabled={pending}>
      {pending ? "…" : resolvedLabel}
    </button>
  );
}
