"use client";

import Link from "next/link";
import { useT } from "@/components/locale-provider";
import { site } from "@/lib/site";

export function HomeHero() {
  const t = useT();
  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      <div className="stars opacity-40" />
      <div className="cosmic-orb left-[-12%] top-[5%] h-[480px] w-[480px] bg-[color:var(--fg)]/10" />
      <div className="cosmic-orb bottom-[0%] right-[-10%] h-[420px] w-[420px] bg-[color:var(--fg)]/5" />
      <div className="container-nx relative flex min-h-[88vh] flex-col justify-center py-24">
        <div className="rise max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--fg-mute)]">{t.hero_kicker}</p>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-[color:var(--fg)] md:text-7xl">
            {t.hero_title}
            <span className="block text-[color:var(--fg-mute)]">{t.hero_title_2}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[color:var(--fg-mute)] md:text-lg">{t.hero_text}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/products" className="btn btn-primary">
              {t.open_catalog}
            </Link>
            <Link href="/products?featured=1" className="btn btn-ghost">
              {t.popular}
            </Link>
          </div>
        </div>
        <div className="mt-16 grid max-w-3xl gap-3 sm:grid-cols-3">
          {[
            ["01", t.step_pay],
            ["02", t.step_key],
            ["03", t.step_delivery],
          ].map(([n, label]) => (
            <div key={n} className="card px-5 py-4">
              <p className="text-[11px] tracking-[0.2em] text-[color:var(--fg-mute)]">{n}</p>
              <p className="mt-1 text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeFeatures() {
  const t = useT();
  const items = [
    [t.feature_fast, t.feature_fast_d],
    [t.feature_secure, t.feature_secure_d],
    [t.feature_cabinet, t.feature_cabinet_d],
    [t.feature_support, t.feature_support_d],
  ];
  return (
    <section className="container-nx grid gap-4 py-6 md:grid-cols-4">
      {items.map(([title, desc]) => (
        <div key={title} className="card p-5">
          <p className="font-medium">{title}</p>
          <p className="mt-1 text-sm text-[color:var(--fg-mute)]">{desc}</p>
        </div>
      ))}
    </section>
  );
}

export function HomeSectionTitle({ kicker, title, href, linkLabel }: { kicker?: string; title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        {kicker && <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--fg-mute)]">{kicker}</p>}
        <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      </div>
      {href && linkLabel && (
        <Link href={href} className="btn btn-ghost">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}

export function HomeWhy() {
  const t = useT();
  const items = [
    [t.why_fast, t.why_fast_d],
    [t.why_pay, t.why_pay_d],
    [t.why_support, t.why_support_d],
    [t.why_reviews, t.why_reviews_d],
  ];
  return (
    <section className="container-nx py-10">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--fg-mute)]">NeuroX</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">{t.why}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {items.map(([title, desc]) => (
          <div key={title} className="card p-5">
            <p className="font-medium">{title}</p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--fg-mute)]">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomeHow() {
  const t = useT();
  const items = [
    [t.how_1, t.how_1_d],
    [t.how_2, t.how_2_d],
    [t.how_3, t.how_3_d],
  ];
  return (
    <section id="how" className="container-nx py-10">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--fg-mute)]">Process</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">{t.how}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map(([title, desc]) => (
          <div key={title} className="card p-6">
            <p className="text-sm tracking-wide text-[color:var(--fg-mute)]">{title}</p>
            <p className="mt-3 text-lg">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomeReviewsHead({ children }: { children?: React.ReactNode }) {
  const t = useT();
  return (
    <section id="reviews" className="container-nx py-10">
      <div className="card overflow-hidden p-8 md:p-10">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--fg-mute)]">{t.reviews}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">{t.reviews_title}</h2>
        <p className="mt-3 max-w-2xl text-[color:var(--fg-mute)]">{t.reviews_text}</p>
        {children}
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={site.social.playerokReviews} target="_blank" rel="noreferrer" className="btn btn-primary">
            {t.reviews_playerok}
          </a>
          <a href={site.social.telegramChannel} target="_blank" rel="noreferrer" className="btn btn-ghost">
            Telegram
          </a>
        </div>
      </div>
    </section>
  );
}

export function HomeCta() {
  const t = useT();
  return (
    <section className="container-nx pb-20 pt-6">
      <div className="relative overflow-hidden rounded-[28px] border border-[color:var(--line)] bg-gradient-to-b from-[color:var(--bg-mute)] to-transparent px-8 py-14 text-center">
        <h2 className="relative text-3xl font-semibold tracking-tight md:text-4xl">{t.cta_title}</h2>
        <p className="relative mx-auto mt-3 max-w-md text-[color:var(--fg-mute)]">{t.cta_text}</p>
        <Link href="/products" className="btn btn-primary relative mt-8">
          {t.open_catalog}
        </Link>
      </div>
    </section>
  );
}

export function CatalogTitle({ featured }: { featured?: boolean }) {
  const t = useT();
  return (
    <>
      <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--fg-mute)]">{t.shop}</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">{featured ? t.popular : t.catalog}</h1>
    </>
  );
}
