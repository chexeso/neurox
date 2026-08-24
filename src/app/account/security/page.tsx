"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SecurityPage() {
  const [msg, setMsg] = useState("");
  const router = useRouter();
  async function changePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/account/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current: form.get("current"), next: form.get("next") }),
    });
    setMsg(res.ok ? "Пароль обновлён" : "Не удалось сменить пароль");
  }
  async function logoutAll() {
    await fetch("/api/account/logout-all", { method: "POST" });
    router.push("/login");
  }
  return (
    <div>
      <h1 className="text-3xl font-semibold">Безопасность</h1>
      <form onSubmit={changePassword} className="card mt-6 max-w-lg space-y-3 p-6">
        <input className="field" type="password" name="current" placeholder="Текущий пароль" required />
        <input className="field" type="password" name="next" minLength={8} placeholder="Новый пароль" required />
        <button className="btn btn-primary">Сменить пароль</button>
        {msg && <p className="text-sm">{msg}</p>}
      </form>
      <button className="btn btn-ghost mt-6" onClick={logoutAll}>
        Выйти на всех устройствах
      </button>
    </div>
  );
}
