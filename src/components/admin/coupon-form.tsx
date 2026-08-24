"use client";

import { useRouter } from "next/navigation";

export function CouponForm() {
  const router = useRouter();
  return (
    <form
      className="card mt-6 grid gap-3 p-5 md:grid-cols-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        await fetch("/api/admin/coupons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: form.get("code"),
            type: form.get("type"),
            value: Number(form.get("value")),
            usageLimit: Number(form.get("usageLimit") || 0) || null,
          }),
        });
        router.refresh();
      }}
    >
      <input name="code" className="field" placeholder="CODE" required />
      <select name="type" className="field">
        <option value="PERCENTAGE">%</option>
        <option value="FIXED">fixed cents</option>
      </select>
      <input name="value" className="field" type="number" placeholder="10" required />
      <input name="usageLimit" className="field" type="number" placeholder="лимит" />
      <button className="btn btn-primary md:col-span-4">Создать</button>
    </form>
  );
}
