"use client";

import { useRouter } from "next/navigation";
import { formatMoney } from "@/lib/utils";

export function VariantPicker({
  productSlug,
  variants,
  current,
}: {
  productSlug: string;
  variants: { slug: string; name: string; priceCents: number; currency: string }[];
  current: string;
}) {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((v) => (
        <button
          key={v.slug}
          className={`btn ${v.slug === current ? "btn-primary" : "btn-ghost"}`}
          onClick={() => router.push(`/product/${productSlug}?variant=${v.slug}`)}
        >
          {v.name} · {formatMoney(v.priceCents, v.currency)}
        </button>
      ))}
    </div>
  );
}
