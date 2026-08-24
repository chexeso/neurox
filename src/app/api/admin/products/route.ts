import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import { audit } from "@/lib/audit";
import { slugify } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const admin = await requireAdmin();
    const body = await req.json();
    const slug = slugify(String(body.slug || body.name));
    const product = await prisma.product.create({
      data: {
        name: String(body.name),
        slug,
        shortDescription: String(body.shortDescription || ""),
        description: String(body.description || ""),
        categoryId: String(body.categoryId),
        status: body.status || "DRAFT",
        featured: Boolean(body.featured),
        badge: body.badge || null,
        previewImage: body.previewImage || null,
        seoTitle: body.seoTitle || null,
        seoDescription: body.seoDescription || null,
        variants: {
          create: {
            name: String(body.durationLabel || "Standard"),
            slug: slugify(String(body.durationLabel || "standard")),
            durationDays: 30,
            durationLabel: String(body.durationLabel || "1 месяц"),
            priceCents: Math.round(Number(body.priceRubles || 0) * 100),
            compareCents: body.compareRubles ? Math.round(Number(body.compareRubles) * 100) : null,
            sku: String(body.sku || `NX-${Date.now()}`),
            isDefault: true,
          },
        },
      },
    });
    await audit({ userId: admin.id, action: "product.create", entity: "Product", entityId: product.id });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Нет доступа или ошибка сохранения" }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const admin = await requireAdmin();
    const body = await req.json();
    const product = await prisma.product.update({
      where: { id: String(body.id) },
      data: {
        name: String(body.name),
        slug: slugify(String(body.slug || body.name)),
        shortDescription: String(body.shortDescription || ""),
        description: String(body.description || ""),
        categoryId: String(body.categoryId),
        status: body.status || "DRAFT",
        featured: Boolean(body.featured),
        badge: body.badge || null,
        previewImage: body.previewImage || null,
        seoTitle: body.seoTitle || null,
        seoDescription: body.seoDescription || null,
      },
    });
    const first = await prisma.productVariant.findFirst({ where: { productId: product.id } });
    if (first) {
      await prisma.productVariant.update({
        where: { id: first.id },
        data: {
          priceCents: body.priceRubles != null ? Math.round(Number(body.priceRubles) * 100) : first.priceCents,
          compareCents: body.compareRubles ? Math.round(Number(body.compareRubles) * 100) : null,
          durationLabel: String(body.durationLabel || first.durationLabel),
          sku: String(body.sku || first.sku),
        },
      });
    }
    await audit({ userId: admin.id, action: "product.update", entity: "Product", entityId: product.id });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Не удалось обновить" }, { status: 400 });
  }
}
