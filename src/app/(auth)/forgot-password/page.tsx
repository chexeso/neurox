"use client";

import { useState } from "react";

export default function ForgotPage() {
  const [done, setDone] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await fetch("/api/auth/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email") }),
    });
    setDone(true);
  }
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <h1 className="text-3xl font-semibold">Сброс пароля</h1>
      {done ? (
        <p className="mt-4 text-[color:var(--fg-mute)]">Если аккаунт существует, ссылка отправлена на почту.</p>
      ) : (
        <form onSubmit={onSubmit} className="card mt-8 space-y-4 p-6">
          <input className="field" type="email" name="email" required placeholder="Email" />
          <button className="btn btn-primary w-full">Отправить ссылку</button>
        </form>
      )}
    </div>
  );
}
