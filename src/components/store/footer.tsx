"use client";

import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { site } from "@/lib/site";
import { useT } from "@/components/locale-provider";

export function Footer() {
  const t = useT();
  return (
    <footer className="mt-24 border-t border-[color:var(--line)]">
      <div className="container-nx grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-[color:var(--fg-mute)]">{t.footer_tagline}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--fg-mute)]">{t.shop}</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/products">{t.nav_catalog}</Link>
            <Link href="/products?featured=1">{t.nav_popular}</Link>
            <Link href="/#faq">{t.nav_faq}</Link>
            <Link href="/#reviews">{t.reviews}</Link>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--fg-mute)]">{t.support}</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/support">{t.support}</Link>
            <a href="https://t.me/tgn3t" target="_blank" rel="noreferrer">
              @tgn3t
            </a>
            <a href="https://t.me/chexeso" target="_blank" rel="noreferrer">
              @chexeso
            </a>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--fg-mute)]">{t.legal}</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/legal/terms">{t.terms}</Link>
            <Link href="/legal/privacy">{t.privacy}</Link>
            <Link href="/legal/refund">{t.refund}</Link>
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.16em] text-[color:var(--fg-mute)]">{t.social}</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a href={site.social.telegramChannel} target="_blank" rel="noreferrer">
              Telegram
            </a>
            <a href={site.social.playerokReviews} target="_blank" rel="noreferrer">
              {t.reviews_playerok}
            </a>
          </div>
        </div>
      </div>
      <div className="container-nx flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--line)] py-6 text-xs text-[color:var(--fg-mute)]">
        <span>© {new Date().getFullYear()} NeuroX</span>
        <span>{t.footer_tagline}</span>
      </div>
    </footer>
  );
}