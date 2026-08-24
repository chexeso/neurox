import Link from "next/link";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/store/product-card";
import {
  HomeHero,
  HomeFeatures,
  HomeWhy,
  HomeHow,
  HomeReviewsHead,
  HomeCta,
} from "@/components/store/home-i18n";
import { HomeOrbitTitle, HomeCategoriesTitle, HomeFaqTitle } from "@/components/store/home-titles";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let products: Awaited<ReturnType<typeof loadProducts>> = [];
  let categories: Awaited<ReturnType<typeof loadCategories>> = [];
  let faqs: Awaited<ReturnType<typeof loadFaqs>> = [];
  let internalReviews: Awaited<ReturnType<typeof loadReviews>> = [];

  try {
    [products, categories, faqs, internalReviews] = await Promise.all([
      loadProducts(),
      loadCategories(),
      loadFaqs(),
      loadReviews(),
    ]);
  } catch (e) {
    console.error("HomePage DB error:", e);
  }

  return (
    <div>
      <HomeHero />
      <HomeFeatures />

      <section className="container-nx py-14">
        <HomeOrbitTitle />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={{
                ...p,
                rating: p.reviews.length
                  ? p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length
                  : undefined,
              }}
            />
          ))}
        </div>
        {products.length === 0 && (
          <p className="mt-6 text-center text-sm text-[color:var(--fg-mute)]">
            Каталог загружается… Если пусто долго — проверьте базу на Railway.
          </p>
        )}
      </section>

      <section className="container-nx py-10">
        <HomeCategoriesTitle />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/products?category=${c.slug}`}
              className="card p-5 transition hover:border-[color:var(--fg)]/30"
            >
              <p className="font-medium">{c.name}</p>
              <p className="mt-1 text-sm text-[color:var(--fg-mute)]">{c.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <HomeWhy />
      <HomeHow />

      <HomeReviewsHead>
        {internalReviews.length > 0 ? (
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {internalReviews.map((r) => (
              <div key={r.id} className="product-glass p-4">
                <p className="text-sm">
                  ★ {r.rating} · {r.product.name}
                </p>
                <p className="muted mt-2 text-sm">{r.body}</p>
              </div>
            ))}
          </div>
        ) : null}
      </HomeReviewsHead>

      <section id="faq" className="container-nx py-10">
        <HomeFaqTitle />
        <div className="mt-6 space-y-3">
          {faqs.map((f) => (
            <details key={f.id} className="card p-5">
              <summary className="cursor-pointer font-medium">{f.question}</summary>
              <p className="mt-3 text-sm leading-6 text-[color:var(--fg-mute)]">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <HomeCta />
    </div>
  );
}

function loadProducts() {
  return prisma.product.findMany({
    where: { status: "PUBLISHED", featured: true },
    include: {
      category: true,
      variants: { orderBy: { priceCents: "asc" } },
      reviews: { where: { status: "APPROVED" } },
    },
    take: 8,
  });
}

function loadCategories() {
  return prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } });
}

function loadFaqs() {
  return prisma.faq.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } });
}

function loadReviews() {
  return prisma.review.findMany({
    where: { status: "APPROVED" },
    include: { product: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}
