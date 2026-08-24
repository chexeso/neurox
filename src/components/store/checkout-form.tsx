"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/components/locale-provider";

export function CheckoutForm({ defaultEmail, defaultName }: { defaultEmail: string; defaultName: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const t = useT();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/checkout", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        name: form.get("name"),
        country: form.get("country"),
        couponCode: form.get("couponCode"),
      }),
    });
    const data = await res.json();
    setPending(false);
    if (!res.ok) {
      setError(data.error || "Не удалось создать заказ");
      return;
    }
    router.push(`/checkout/pay/${data.orderId}`);
  }

  return (
    <form onSubmit={onSubmit} className="card mt-6 space-y-4 p-6">
      <label className="block text-sm">
        {t.email}
        <input required name="email" type="email" defaultValue={defaultEmail} className="field mt-1" />
      </label>
      <label className="block text-sm">
        {t.name}
        <input required name="name" defaultValue={defaultName} className="field mt-1" />
      </label>
      <label className="block text-sm">
        {t.country}
        <input name="country" className="field mt-1" placeholder="RU / KZ / US" />
      </label>
      <label className="block text-sm">
        {t.coupon}
        <input name="couponCode" className="field mt-1" placeholder="NEURO10" />
      </label>
      {error && <p className="text-sm text-[color:var(--danger)]">{error}</p>}
      <button className="btn btn-primary w-full" disabled={pending}>
        {pending ? t.creating_order : t.continue_pay}
      </button>
    </form>
  );
}
