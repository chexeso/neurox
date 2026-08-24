import Link from "next/link";
import { discountPercent, formatMoney } from "@/lib/utils";
import { AddToCartButton } from "./add-to-cart-button";
import { ProductTilt } from "./product-tilt";

export type CardProduct = {
  name: string;
  slug: string;
  shortDescription: string;
  previewImage: string | null;
  badge: string | null;
  category: { name: string };
  rating?: number;
  sales?: number;
  variants: { id: string; name: string; durationLabel: string; priceCents: number; compareCents: number | null }[];
};

export function ProductCard({ product }: { product: CardProduct }) {
  const v = [...product.variants]
    .filter((x) => x.priceCents > 0)
    .sort((a, b) => a.priceCents - b.priceCents)[0];
  if (!v) return null;
  const off = discountPercent(v.priceCents, v.compareCents);
  return (
    <ProductTilt>
    <article className="product-glass group overflow-hidden">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-white/10">
          <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition duration-300 group-hover:opacity-100">
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-white/10" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.previewImage || "/brand/og.jpg"}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.08] group-hover:brightness-110"
          />
          <div className="absolute left-3 top-3 z-20 flex gap-2">
            {product.badge && <span className="badge">{product.badge}</span>}
            {off > 0 && <span className="badge">−{off}%</span>}
          </div>
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <p className="muted text-[11px] uppercase tracking-[0.16em]">{product.category.name}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-lg font-semibold tracking-tight transition group-hover:text-white">{product.name}</h3>
          <p className="muted mt-1 line-clamp-2 text-sm">{product.shortDescription}</p>
        </Link>
        <div className="muted flex items-center justify-between text-xs">
          <span>★ {product.rating ? product.rating.toFixed(1) : "—"}</span>
          <span>{v.durationLabel}</span>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-lg font-semibold">{formatMoney(v.priceCents)}</div>
            {v.compareCents ? <div className="muted text-xs line-through">{formatMoney(v.compareCents)}</div> : null}
          </div>
          <AddToCartButton variantId={v.id} />
        </div>
      </div>
    </article>
    </ProductTilt>
  );
}
