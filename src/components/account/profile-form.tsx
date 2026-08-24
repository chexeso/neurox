"use client";

import { useState } from "react";

export function ProfileForm({ name, email }: { name: string; email: string }) {
  const [msg, setMsg] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/account/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.get("name") }),
    });
    setMsg(res.ok ? "Сохранено" : "Не удалось сохранить");
  }
  return (
    <form onSubmit={onSubmit} className="card mt-6 max-w-lg space-y-4 p-6">
      <label className="block text-sm">
        Имя
        <input name="name" defaultValue={name} className="field mt-1" />
      </label>
      <label className="block text-sm">
        Email
        <input value={email} disabled className="field mt-1 opacity-70" />
      </label>
      <button className="btn btn-primary">Сохранить</button>
      {msg && <p className="text-sm text-[color:var(--fg-mute)]">{msg}</p>}
    </form>
  );
}
