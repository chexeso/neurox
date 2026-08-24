"use client";

import Link from "next/link";

export function MiniCart({ count, label = "Корзина" }: { count: number; label?: string }) {
  return (
    <Link href="/cart" className="btn btn-ghost relative !px-3">
      {label}
      <span className="ml-1 rounded-full bg-[color:var(--fg)] px-1.5 text-[11px] text-[color:var(--bg)]">{count}</span>
    </Link>
  );
}
