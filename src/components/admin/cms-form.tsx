"use client";

import { useRouter } from "next/navigation";

export function CmsForm({ settings }: { settings: { key: string; value: string }[] }) {
  const router = useRouter();
  return (
    <form
      className="card mt-6 space-y-3 p-5"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        await fetch("/api/admin/cms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Object.fromEntries(form.entries())),
        });
        router.refresh();
      }}
    >
      {settings.map((s) => (
        <label key={s.key} className="block text-sm">
          {s.key}
          <input name={s.key} defaultValue={s.value} className="field mt-1" />
        </label>
      ))}
      <button className="btn btn-primary">Сохранить</button>
    </form>
  );
}
