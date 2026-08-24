import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/store/product-card";
import Link from "next/link";

export const metadata = { title: "Каталог" };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; featured?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const category = sp.category;
  const featured = sp.featured === "1";
  const products = await prisma.product.findMany({
    where: {
      status: "PUBLISHED",
      featured: featured ? true : undefined,
      category: category ? { slug: category } : undefined,
      OR: sp.q
        ? [
            { name: { contains: sp.q } },
            { tags: { contains: sp.q } },
            { shortDescription: { contains: sp.q } },
          ]
        : undefined,
    },
    include: { category: true, variants: { orderBy: { priceCents: "asc" } } },
    orderBy: { featured: "desc" },
  });
  const categories = await prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } });

  return (
    <div className="container-nx py-12">
      <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--fg-mute)]">Магазин</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">{featured ? "Популярное" : "Каталог"}</h1>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link href="/products" className="badge">
          Все
        </Link>
        {categories.map((c) => (
          <Link key={c.id} href={`/products?category=${c.slug}`} className="badge">
            {c.name}
          </Link>
        ))}
      </div>
      {products.length === 0 ? (
        <div className="card mt-10 p-10 text-center">
          <h2 className="text-2xl font-semibold">Каталог здесь тихий</h2>
          <p className="mt-2 text-[color:var(--fg-mute)]">По этому фильтру пока нет опубликованных продуктов.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
