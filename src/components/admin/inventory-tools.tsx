"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function InventoryTools({ variants }: { variants: { id: string; label: string }[] }) {
  const [msg, setMsg] = useState("");
  const router = useRouter();
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        variantId: form.get("variantId"),
        keys: String(form.get("keys") || ""),
      }),
    });
    const data = await res.json();
    setMsg(res.ok ? `Добавлено: ${data.added}` : data.error || "Ошибка");
    router.refresh();
  }
  return (
    <form onSubmit={onSubmit} className="card mt-6 space-y-3 p-5">
      <select name="variantId" className="field">
        {variants.map((v) => (
          <option key={v.id} value={v.id}>
            {v.label}
          </option>
        ))}
      </select>
      <textarea name="keys" className="field min-h-28" placeholder="Один ключ на строку или CSV" />
      <button className="btn btn-primary">Импортировать ключи</button>
      {msg && <p className="text-sm">{msg}</p>}
    </form>
  );
}
