"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error || "Не удалось войти");
    router.push(data.role === "ADMIN" || data.role === "SUPERADMIN" ? "/admin" : "/account");
  }
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <h1 className="text-3xl font-semibold">С возвращением</h1>
      <p className="mt-2 text-sm text-[color:var(--fg-mute)]">Войдите, чтобы увидеть заказы и ключи.</p>
      <form onSubmit={onSubmit} className="card mt-8 space-y-4 p-6">
        <input className="field" name="email" type="email" required placeholder="Email" />
        <input className="field" name="password" type="password" required placeholder="Пароль" />
        {error && <p className="text-sm text-[color:var(--danger)]">{error}</p>}
        <button className="btn btn-primary w-full">Войти</button>
      </form>
      <div className="mt-4 flex justify-between text-sm">
        <Link href="/register">Создать аккаунт</Link>
        <Link href="/forgot-password">Забыли пароль?</Link>
      </div>
    </div>
  );
}
