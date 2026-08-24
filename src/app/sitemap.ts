import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: new Date() },
    { url: `${site.url}/products`, lastModified: new Date() },
    { url: `${site.url}/support`, lastModified: new Date() },
  ];
  try {
    const { prisma } = await import("@/lib/db");
    const products = await prisma.product.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    });
    return [
      ...base,
      ...products.map((p) => ({
        url: `${site.url}/product/${p.slug}`,
        lastModified: p.updatedAt,
      })),
    ];
  } catch {
    return base;
  }
}
