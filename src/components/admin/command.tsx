"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const items = [
  ["Товары", "/admin/products"],
  ["Заказы", "/admin/orders"],
  ["Клиенты", "/admin/customers"],
  ["Инвентарь", "/admin/inventory"],
  ["Промокоды", "/admin/coupons"],
  ["CMS", "/admin/cms"],
  ["Магазин", "/"],
];

export function AdminCommand() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  if (!open) return <p className="mb-6 text-xs text-[color:var(--fg-mute)]">⌘K / Ctrl+K — команда</p>;
  const filtered = items.filter((i) => i[0].toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="fixed inset-0 z-50 grid place-items-start bg-black/40 p-8" onClick={() => setOpen(false)}>
      <div className="card mx-auto w-full max-w-lg p-3" onClick={(e) => e.stopPropagation()}>
        <input className="field" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Перейти…" />
        <div className="mt-2">
          {filtered.map(([l, h]) => (
            <button
              key={h}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-[color:var(--bg-mute)]"
              onClick={() => {
                router.push(h);
                setOpen(false);
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
