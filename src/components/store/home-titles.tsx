"use client";

import Link from "next/link";
import { useT } from "@/components/locale-provider";

export function HomeOrbitTitle() {
  const t = useT();
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--fg-mute)]">{t.catalog}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{t.in_orbit}</h2>
      </div>
      <Link href="/products" className="btn btn-ghost">
        {t.open_catalog}
      </Link>
    </div>
  );
}

export function HomeCategoriesTitle() {
  const t = useT();
  return (
    <>
      <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--fg-mute)]">{t.shop}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">{t.categories}</h2>
    </>
  );
}

export function HomeFaqTitle() {
  const t = useT();
  return (
    <>
      <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--fg-mute)]">FAQ</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">{t.faq}</h2>
    </>
  );
}
