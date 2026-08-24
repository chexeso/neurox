"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function Inner() {
  const params = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: params.get("token"), password: form.get("password") }),
    });
    if (!res.ok) return setError("Ссылка недействительна");
    router.push("/login");
  }
  return (
    <form onSubmit={onSubmit} className="card mt-8 space-y-4 p-6">
      <input className="field" type="password" name="password" minLength={8} required placeholder="Новый пароль" />
      {error && <p className="text-sm text-[color:var(--danger)]">{error}</p>}
      <button className="btn btn-primary w-full">Сохранить</button>
    </form>
  );
}

export default function ResetPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <h1 className="text-3xl font-semibold">Новый пароль</h1>
      <Suspense>
        <Inner />
      </Suspense>
    </div>
  );
}
