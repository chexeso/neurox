import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q")?.trim() || "";
  if (!q) return NextResponse.json({ products: [] });
  const products = await prisma.product.findMany({
    where: {
      status: "PUBLISHED",
      OR: [{ name: { contains: q } }, { tags: { contains: q } }, { shortDescription: { contains: q } }],
    },
    select: { slug: true, name: true, shortDescription: true },
    take: 8,
  });
  return NextResponse.json({ products });
}
