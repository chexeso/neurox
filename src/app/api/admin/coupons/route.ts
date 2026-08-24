import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import { audit } from "@/lib/audit";

export async function POST(req: Request) {
  try {
    const admin = await requireAdmin();
    const body = await req.json();
    const coupon = await prisma.coupon.create({
      data: {
        code: String(body.code).trim().toUpperCase(),
        type: body.type === "FIXED" ? "FIXED" : "PERCENTAGE",
        value: Number(body.value),
        usageLimit: body.usageLimit,
        isActive: true,
      },
    });
    await audit({ userId: admin.id, action: "coupon.create", entity: "Coupon", entityId: coupon.id });
    return NextResponse.json(coupon);
  } catch {
    return NextResponse.json({ error: "Не создан" }, { status: 400 });
  }
}
