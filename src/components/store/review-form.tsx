"use client";

import { useState } from "react";

export function ReviewForm({
  orderId,
  productId,
  productName,
}: {
  orderId: string;
  productId: string;
  productName: string;
}) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        productId,
        rating: Number(form.get("rating")),
        body: form.get("body"),
      }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Не удалось отправить отзыв");
      return;
    }
    setDone(true);
  }

  if (done) {
    return <p className="text-sm text-[color:var(--accent)]">Спасибо. Отзыв опубликован на сайте.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="mt-3 space-y-3">
      <p className="text-sm font-medium">{productName}</p>
      <select name="rating" className="field" defaultValue="5">
        <option value="5">5 — отлично</option>
        <option value="4">4 — хорошо</option>
        <option value="3">3 — нормально</option>
        <option value="2">2 — слабо</option>
        <option value="1">1 — плохо</option>
      </select>
      <textarea name="body" className="field min-h-24" required minLength={3} placeholder="Как прошла покупка?" />
      {error && <p className="text-sm text-[color:var(--danger)]">{error}</p>}
      <button className="btn btn-ghost">Опубликовать отзыв</button>
    </form>
  );
}
