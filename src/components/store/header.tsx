"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { SearchBox } from "@/components/store/search-box";
import { MiniCart } from "@/components/store/mini-cart";
import { ThemeLangSwitch } from "@/components/theme-lang-switch";
import { useT } from "@/components/locale-provider";

export function Header({ cartCount = 0, userName }: { cartCount?: number; userName?: string | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useT();

  const nav = [
    { href: "/products", label: t.nav_catalog, ext: false },
    { href: "/products?featured=1", label: t.nav_popular, ext: false },
    { href: "/#how", label: t.nav_how, ext: false },
    { href: "/#faq", label: t.nav_faq, ext: false },
    { href: "/support", label: t.nav_support, ext: false },
    { href: "https://t.me/neuroxstore", label: "Telegram канал", ext: true },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 ${scrolled ? "glass" : "bg-transparent"}`}>
      <div className="container-nx flex h-16 items-center gap-3">
        <Link href="/" aria-label="NeuroX home" className="shrink-0">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-4 text-sm text-[color:var(--fg-mute)] lg:flex">
          {nav.map((item) =>
            item.ext ? (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="tg-channel-link">
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href} className="hover:text-[color:var(--fg)]">
                {item.label}
              </Link>
            )
          )}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:block">
            <SearchBox placeholder={t.search_placeholder} />
          </div>
          <ThemeLangSwitch />
          <Link href={userName ? "/account" : "/login"} className="btn btn-ghost hidden sm:inline-flex !px-3 !py-2 text-sm">
            {userName ? userName.split(" ")[0] : t.account}
          </Link>
          <MiniCart count={cartCount} label={t.cart} />
          <button className="btn btn-ghost lg:hidden !px-3" onClick={() => setOpen((v) => !v)} aria-label={t.menu}>
            {t.menu}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-[color:var(--line)] bg-[color:var(--bg-elev)] lg:hidden">
          <div className="container-nx flex flex-col gap-3 py-4">
            <SearchBox placeholder={t.search_placeholder} />
            <ThemeLangSwitch />
            {nav.map((item) =>
              item.ext ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="tg-channel-link inline-flex w-fit"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              )
            )}
            <Link href="/account" onClick={() => setOpen(false)}>
              {t.account}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}