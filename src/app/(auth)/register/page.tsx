"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        name: form.get("name"),
        password: form.get("password"),
      }),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error || "Не удалось создать аккаунт");
    router.push("/account");
  }
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <h1 className="text-3xl font-semibold">Создать аккаунт NeuroX</h1>
      <form onSubmit={onSubmit} className="card mt-8 space-y-4 p-6">
        <input className="field" name="name" required placeholder="Имя" />
        <input className="field" name="email" type="email" required placeholder="Email" />
        <input className="field" name="password" type="password" minLength={8} required placeholder="Пароль от 8 символов" />
        {error && <p className="text-sm text-[color:var(--danger)]">{error}</p>}
        <button className="btn btn-primary w-full">Зарегистрироваться</button>
      </form>
      <Link href="/login" className="mt-4 text-sm">
        Уже есть аккаунт
      </Link>
    </div>
  );
}
