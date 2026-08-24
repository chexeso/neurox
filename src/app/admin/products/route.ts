import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import { audit } from "@/lib/audit";
import { slugify } from "@/lib/utils";

type VariantInput = {
  id?: string;
  durationLabel: string;
  durationDays: number;
  priceRubles: number;
  compareRubles?: number | null;
  sku?: string;
};

async function upsertVariants(productId: string, variants: VariantInput[]) {
  for (const v of variants) {
    const priceCents = Math.round(Number(v.priceRubles || 0) * 100);
    if (priceCents <= 0 && !v.id) continue;

    const data = {
      name: v.durationLabel,
      slug: slugify(v.durationLabel),
      durationDays: v.durationDays,
      durationLabel: v.durationLabel,
      priceCents: priceCents > 0 ? priceCents : 0,
      compareCents: v.compareRubles ? Math.round(Number(v.compareRubles) * 100) : null,
      sku: v.sku || `NX-${v.durationDays}-${Date.now()}`,
      isDefault: v.durationDays === 30,
    };

    if (v.id) {
      await prisma.productVariant.update({
        where: { id: v.id },
        data,
      });
    } else if (priceCents > 0) {
      const existing = await prisma.productVariant.findFirst({
        where: { productId, durationDays: v.durationDays },
      });
      if (existing) {
        await prisma.productVariant.update({ where: { id: existing.id }, data });
      } else {
        await prisma.productVariant.create({
          data: { ...data, productId },
        });
      }
    }
  }
}

export async function POST(req: Request) {
  try {
    const admin = await requireAdmin();
    const body = await req.json();
    const slug = slugify(String(body.slug || body.name));
    const variants = (body.variants as VariantInput[]) || [];

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
      },
    });

    await upsertVariants(product.id, variants);
    await audit({ userId: admin.id, action: "product.create", entity: "Product", entityId: product.id });
    return NextResponse.json(product);
  } catch (e) {
    console.error("product POST", e);
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

    const variants = (body.variants as VariantInput[]) || [];
    if (variants.length) {
      await upsertVariants(product.id, variants);
    } else if (body.priceRubles != null) {
      // legacy single-price form
      const first = await prisma.productVariant.findFirst({ where: { productId: product.id } });
      if (first) {
        await prisma.productVariant.update({
          where: { id: first.id },
          data: {
            priceCents: Math.round(Number(body.priceRubles) * 100),
            compareCents: body.compareRubles ? Math.round(Number(body.compareRubles) * 100) : null,
            durationLabel: String(body.durationLabel || first.durationLabel),
            sku: String(body.sku || first.sku),
          },
        });
      }
    }

    await audit({ userId: admin.id, action: "product.update", entity: "Product", entityId: product.id });
    return NextResponse.json(product);
  } catch (e) {
    console.error("product PUT", e);
    return NextResponse.json({ error: "Не удалось обновить" }, { status: 400 });
  }
}
