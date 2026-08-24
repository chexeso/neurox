"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Hit = { slug: string; name: string; shortDescription: string };

export function SearchBox({ placeholder = "Поиск…" }: { placeholder?: string }) {
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!q.trim()) {
      setHits([]);
      return;
    }
    const t = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setHits(data.products ?? []);
      setOpen(true);
      setActive(0);
    }, 160);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="relative w-64" ref={box}>
      <input
        className="field h-10"
        placeholder={placeholder}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => hits.length && setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") setActive((a) => Math.min(a + 1, hits.length - 1));
          if (e.key === "ArrowUp") setActive((a) => Math.max(a - 1, 0));
          if (e.key === "Enter" && hits[active]) {
            window.location.href = `/product/${hits[active].slug}`;
          }
          if (e.key === "Escape") setOpen(false);
        }}
        aria-label="Поиск"
      />
      {open && (
        <div className="absolute z-40 mt-2 w-full overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-elev)] shadow-[var(--shadow)]">
          {hits.length === 0 ? (
            <p className="px-3 py-3 text-sm text-[color:var(--fg-mute)]">Ничего не нашли. Попробуйте «Grok» или «Cursor».</p>
          ) : (
            hits.map((h, i) => (
              <Link
                key={h.slug}
                href={`/product/${h.slug}`}
                className={`block px-3 py-2 text-sm ${i === active ? "bg-[color:var(--bg-mute)]" : ""}`}
                onClick={() => setOpen(false)}
              >
                <div className="font-medium">{h.name}</div>
                <div className="text-xs text-[color:var(--fg-mute)]">{h.shortDescription}</div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
