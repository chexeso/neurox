import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } });
  return [
    { url: site.url, lastModified: new Date() },
    { url: `${site.url}/products`, lastModified: new Date() },
    { url: `${site.url}/support`, lastModified: new Date() },
    { url: `${site.url}/faq`, lastModified: new Date() },
    ...products.map((p) => ({ url: `${site.url}/product/${p.slug}`, lastModified: p.updatedAt })),
  ];
}
