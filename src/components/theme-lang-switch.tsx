"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { locales } from "@/lib/i18n";
import { useLocale, useT } from "@/components/locale-provider";

const themes = [
  {
    id: "light",
    labelKey: "theme_light" as const,
    desc: { ru: "Чистый белый", en: "Clean white", zh: "纯白" },
    preview: "linear-gradient(145deg, #ffffff 0%, #e8e8ec 100%)",
    ring: "#111114",
    dot: "#ffffff",
    border: "#d4d4d8",
  },
  {
    id: "medium",
    labelKey: "theme_medium" as const,
    desc: { ru: "Графит", en: "Graphite", zh: "石墨灰" },
    preview: "linear-gradient(145deg, #4a4b52 0%, #2a2b30 100%)",
    ring: "#a1a1aa",
    dot: "#3f4047",
    border: "#52525b",
  },
  {
    id: "dark",
    labelKey: "theme_dark" as const,
    desc: { ru: "Космос", en: "Cosmos", zh: "深空" },
    preview: "linear-gradient(145deg, #1a1b22 0%, #050507 55%, #0a0c14 100%)",
    ring: "#ffffff",
    dot: "#0c0c10",
    border: "#3f3f46",
  },
  {
    id: "black",
    labelKey: "theme_black" as const,
    desc: { ru: "Глубокий чёрный", en: "Deep black", zh: "纯黑" },
    preview: "linear-gradient(145deg, #111 0%, #000 100%)",
    ring: "#fafafa",
    dot: "#000000",
    border: "#27272a",
  },
];

export function ThemeLangSwitch() {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale } = useLocale();
  const t = useT();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9 rounded-full border border-[color:var(--line)]" />;
  }

  const active = themes.find((x) => x.id === theme) || themes[2];
  const desc = active.desc[locale] || active.desc.ru;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex h-9 items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--bg-elev)]/80 px-2.5 backdrop-blur-md transition hover:border-[color:var(--fg)]/30 hover:shadow-[0_0_24px_var(--glow)]"
        aria-label={t.theme}
        aria-expanded={open}
      >
        <span
          className="h-5 w-5 rounded-full border shadow-inner transition group-hover:scale-105"
          style={{
            background: active.preview,
            borderColor: active.border,
            boxShadow: `inset 0 0 0 1px ${active.border}`,
          }}
        />
        <span className="hidden text-[11px] font-medium tracking-wide sm:inline">{locale.toUpperCase()}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" className={`opacity-50 transition ${open ? "rotate-180" : ""}`}>
          <path d="M3 4.5 L6 7.5 L9 4.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-[80] w-[min(320px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-elev)] shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="border-b border-[color:var(--line)] px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--fg-mute)]">{t.theme}</p>
            <p className="mt-0.5 text-sm text-[color:var(--fg-mute)]">{desc}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 p-3">
            {themes.map((th) => {
              const selected = (theme || "dark") === th.id;
              const label = t[th.labelKey];
              const d = th.desc[locale] || th.desc.ru;
              return (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => {
                    setTheme(th.id);
                  }}
                  className={`group relative overflow-hidden rounded-xl border p-2.5 text-left transition ${
                    selected
                      ? "border-[color:var(--fg)]/50 shadow-[0_0_0_1px_var(--fg),0_8px_28px_var(--glow)]"
                      : "border-[color:var(--line)] hover:border-[color:var(--fg)]/25 hover:bg-[color:var(--bg-mute)]/50"
                  }`}
                >
                  <div
                    className="relative h-14 w-full overflow-hidden rounded-lg border"
                    style={{ background: th.preview, borderColor: th.border }}
                  >
                    <div className="absolute left-2 top-2 h-2 w-8 rounded-full opacity-40" style={{ background: th.ring }} />
                    <div className="absolute bottom-2 left-2 right-2 flex gap-1">
                      <div className="h-1.5 flex-1 rounded-full opacity-30" style={{ background: th.ring }} />
                      <div className="h-1.5 w-4 rounded-full opacity-20" style={{ background: th.ring }} />
                    </div>
                    {selected && (
                      <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-black shadow">
                        <svg width="12" height="12" viewBox="0 0 12 12">
                          <path d="M2.5 6.2 L4.8 8.5 L9.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-xs font-semibold tracking-tight">{label}</p>
                  <p className="text-[10px] text-[color:var(--fg-mute)]">{d}</p>
                </button>
              );
            })}
          </div>

          <div className="border-t border-[color:var(--line)] px-4 py-3">
            <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[color:var(--fg-mute)]">{t.lang}</p>
            <div className="flex gap-2">
              {locales.map((l) => {
                const selected = locale === l.code;
                return (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLocale(l.code)}
                    className={`flex-1 rounded-xl border px-2 py-2 text-sm font-medium transition ${
                      selected
                        ? "border-[color:var(--fg)] bg-[color:var(--fg)] text-[color:var(--bg)]"
                        : "border-[color:var(--line)] text-[color:var(--fg-mute)] hover:border-[color:var(--fg)]/30 hover:text-[color:var(--fg)]"
                    }`}
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
