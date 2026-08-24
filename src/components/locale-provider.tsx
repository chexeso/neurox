"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Dict, Locale, getDict } from "@/lib/i18n";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
};

const LocaleCtx = createContext<Ctx | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ru");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem("nx_lang") as Locale) || "ru";
    if (saved === "ru" || saved === "en" || saved === "zh") setLocaleState(saved);
    setReady(true);
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    localStorage.setItem("nx_lang", l);
    document.documentElement.lang = l === "zh" ? "zh-CN" : l;
    document.cookie = `nx_lang=${l};path=/;max-age=31536000`;
  }

  const value = useMemo(() => ({ locale, setLocale, t: getDict(locale) }), [locale]);

  if (!ready) {
    return <LocaleCtx.Provider value={{ locale: "ru", setLocale, t: getDict("ru") }}>{children}</LocaleCtx.Provider>;
  }

  return <LocaleCtx.Provider value={value}>{children}</LocaleCtx.Provider>;
}

export function useT() {
  const ctx = useContext(LocaleCtx);
  if (!ctx) return getDict("ru");
  return ctx.t;
}

export function useLocale() {
  const ctx = useContext(LocaleCtx);
  return ctx || { locale: "ru" as Locale, setLocale: () => {}, t: getDict("ru") };
}
