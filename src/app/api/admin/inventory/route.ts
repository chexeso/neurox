import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import { audit } from "@/lib/audit";

export async function POST(req: Request) {
  try {
    const admin = await requireAdmin();
    const { variantId, keys } = await req.json();
    const list = String(keys || "")
      .split(/[\n,;]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (!variantId || list.length === 0) return NextResponse.json({ error: "Пустой импорт" }, { status: 400 });
    await prisma.digitalItem.createMany({
      data: list.map((payload) => ({
        variantId: String(variantId),
        payload,
        status: "AVAILABLE",
        instructions: "Сохраните ключ и следуйте инструкции варианта.",
      })),
    });
    await audit({ userId: admin.id, action: "inventory.import", entity: "DigitalItem", meta: { count: list.length, variantId } });
    return NextResponse.json({ added: list.length });
  } catch {
    return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
  }
}
