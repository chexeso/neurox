"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ReviewModeration({
  reviews,
}: {
  reviews: { id: string; rating: number; body: string; title: string | null; status: string; product: { name: string } }[];
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<string | null>(null);

  async function act(id: string, action: string, extra?: Record<string, unknown>) {
    await fetch("/api/admin/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action, ...extra }),
    });
    setEditing(null);
    router.refresh();
  }

  return (
    <div className="mt-6 space-y-3">
      {reviews.length === 0 && <p className="text-sm text-[color:var(--fg-mute)]">Пока нет внутренних отзывов.</p>}
      {reviews.map((r) => (
        <div key={r.id} className="card p-4">
          <p className="text-sm">
            {r.product.name} · ★{r.rating} · {r.status === "APPROVED" ? "опубликован" : r.status === "HIDDEN" ? "скрыт" : "на модерации"}
          </p>
          {editing === r.id ? (
            <form
              className="mt-3 space-y-2"
              onSubmit={(e) => {
                e.preventDefault();
                const form = new FormData(e.currentTarget);
                void act(r.id, "edit", {
                  rating: Number(form.get("rating")),
                  body: form.get("body"),
                  title: form.get("title"),
                });
              }}
            >
              <input name="title" className="field" defaultValue={r.title || ""} placeholder="Заголовок" />
              <select name="rating" className="field" defaultValue={r.rating}>
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <textarea name="body" className="field min-h-24" defaultValue={r.body} />
              <div className="flex gap-2">
                <button className="btn btn-primary" type="submit">
                  Сохранить
                </button>
                <button className="btn btn-ghost" type="button" onClick={() => setEditing(null)}>
                  Отмена
                </button>
              </div>
            </form>
          ) : (
            <p className="mt-2 text-sm text-[color:var(--fg-mute)]">{r.body}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="btn btn-ghost" onClick={() => setEditing(r.id)}>
              Изменить
            </button>
            <button className="btn btn-ghost" onClick={() => act(r.id, "approve")}>
              Показать
            </button>
            <button className="btn btn-ghost" onClick={() => act(r.id, "hide")}>
              Скрыть
            </button>
            <button className="btn btn-ghost" onClick={() => act(r.id, "delete")}>
              Удалить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
