"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function PayActions({ orderId, paymentId, demo }: { orderId: string; paymentId: string; demo: boolean }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function payDemo() {
    setPending(true);
    setError("");
    const res = await fetch("/api/payments/demo", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId, orderId }),
    });
    const data = await res.json();
    setPending(false);
    if (!res.ok) {
      setError(data.error || "Платёж не подтверждён");
      return;
    }
    router.push(`/checkout/success?order=${orderId}`);
  }

  async function startStripe() {
    setPending(true);
    const res = await fetch("/api/payments/stripe", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId }),
    });
    const data = await res.json();
    setPending(false);
    if (data.url) window.location.href = data.url;
    else setError(data.error || "Stripe не настроен");
  }

  return (
    <div className="mt-6 space-y-3">
      {demo ? (
        <button className="btn btn-primary w-full" onClick={payDemo} disabled={pending}>
          {pending ? "Подтверждаем на сервере…" : "Оплатить"}
        </button>
      ) : (
        <button className="btn btn-primary w-full" onClick={startStripe} disabled={pending}>
          {pending ? "Открываем оплату…" : "Оплатить картой"}
        </button>
      )}
      {error && <p className="text-sm text-[color:var(--danger)]">{error}</p>}
    </div>
  );
}
