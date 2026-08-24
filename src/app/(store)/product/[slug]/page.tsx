import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { discountPercent, formatMoney, safeJson } from "@/lib/utils";
import { AddToCartButton } from "@/components/store/add-to-cart-button";
import { ProductCard } from "@/components/store/product-card";
import { VariantPicker } from "@/components/store/variant-picker";
import type { Metadata } from "next";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return { title: "Продукт" };
  return {
    title: product.seoTitle || product.name,
    description: product.seoDescription || product.shortDescription,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.previewImage ? [product.previewImage] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string }>;
}) {
  const { slug } = await params;
  const { variant: variantSlug } = await searchParams;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      variants: { orderBy: { durationDays: "asc" } },
      images: { orderBy: { sortOrder: "asc" } },
      faqs: { orderBy: { sortOrder: "asc" } },
      reviews: { where: { status: "APPROVED" }, include: { user: true } },
    },
  });
  if (!product || product.status !== "PUBLISHED") notFound();

  const variant =
    product.variants.find((v) => v.slug === variantSlug) ||
    product.variants.find((v) => v.isDefault) ||
    product.variants[0];
  const off = discountPercent(variant.priceCents, variant.compareCents);
  const features = safeJson<string[]>(product.features, []);
  const includes = safeJson<string[]>(product.includes, []);
  const sales = await prisma.orderItem.count({
    where: { variant: { productId: product.id }, order: { status: { in: ["PAID", "FULFILLED"] } } },
  });
  const related = await prisma.product.findMany({
    where: { status: "PUBLISHED", categoryId: product.categoryId, id: { not: product.id } },
    include: { category: true, variants: true },
    take: 3,
  });
  const avg = product.reviews.length ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length : 0;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.previewImage,
    brand: { "@type": "Brand", name: "NeuroX" },
    offers: {
      "@type": "Offer",
      priceCurrency: variant.currency,
      price: (variant.priceCents / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      url: `${site.url}/product/${product.slug}`,
    },
  };

  return (
    <div className="container-nx py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="text-sm text-[color:var(--fg-mute)]">
        <a href="/products">Каталог</a> / {product.category.name} / {product.name}
      </p>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div className="card overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.previewImage || "/brand/og.jpg"} alt={product.name} className="aspect-[16/10] w-full object-cover" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--accent)]">{product.category.name}</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{product.name}</h1>
          <p className="mt-3 text-[color:var(--fg-mute)]">{product.shortDescription}</p>
          <div className="mt-4 flex gap-4 text-sm text-[color:var(--fg-mute)]">
            <span>★ {avg ? avg.toFixed(1) : "новый"}</span>
            <span>{sales} выдач</span>
            {product.badge && <span className="badge">{product.badge}</span>}
          </div>
          <div className="mt-6">
            <VariantPicker productSlug={product.slug} variants={product.variants} current={variant.slug} />
          </div>
          <div className="mt-6 flex items-end gap-3">
            <div className="text-3xl font-semibold">{formatMoney(variant.priceCents, variant.currency)}</div>
            {variant.compareCents ? <div className="text-[color:var(--fg-mute)] line-through">{formatMoney(variant.compareCents)}</div> : null}
            {off > 0 && <span className="badge">−{off}%</span>}
          </div>
          <p className="mt-2 text-sm text-[color:var(--fg-mute)]">Срок: {variant.durationLabel}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <AddToCartButton variantId={variant.id} label="В корзину" />
            <AddToCartButton variantId={variant.id} label="Купить сейчас" buyNow />
          </div>
          <p className="mt-4 text-xs text-[color:var(--fg-mute)]">
            Цифровая доставка. Ключ появится в кабинете только после серверного подтверждения оплаты.
          </p>
        </div>
      </div>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-xl font-semibold">Описание</h2>
          <p className="mt-3 leading-7 text-[color:var(--fg-mute)]">{product.description}</p>
          <h3 className="mt-6 font-medium">Преимущества</h3>
          <ul className="mt-2 space-y-1 text-sm text-[color:var(--fg-mute)]">
            {features.map((f) => (
              <li key={f}>— {f}</li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h2 className="text-xl font-semibold">Что входит</h2>
          <ul className="mt-3 space-y-1 text-sm text-[color:var(--fg-mute)]">
            {includes.map((f) => (
              <li key={f}>— {f}</li>
            ))}
          </ul>
          <h3 className="mt-6 font-medium">FAQ продукта</h3>
          {product.faqs.map((f) => (
            <details key={f.id} className="mt-2">
              <summary className="cursor-pointer text-sm">{f.question}</summary>
              <p className="mt-1 text-sm text-[color:var(--fg-mute)]">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Отзывы</h2>
        {product.reviews.length === 0 ? (
          <p className="mt-3 text-sm text-[color:var(--fg-mute)]">
            Внутренние отзывы появятся после модерации покупок. Внешние отзывы о NeuroX — на{" "}
            <a className="underline" href={site.social.playerokReviews} target="_blank" rel="noreferrer">
              Playerok
            </a>
            .
          </p>
        ) : (
          <div className="mt-4 grid gap-3">
            {product.reviews.map((r) => (
              <div key={r.id} className="card p-4">
                <p className="text-sm">
                  ★ {r.rating} · {r.user?.name || "Покупатель"}
                </p>
                <p className="mt-2 text-sm text-[color:var(--fg-mute)]">{r.body}</p>
              </div>
            ))}
          </div>
        )}
      </section>
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Рядом в каталоге</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
