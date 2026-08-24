import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import { audit } from "@/lib/audit";

export async function POST(req: Request) {
  try {
    const admin = await requireAdmin();
    const { orderId } = await req.json();
    const order = await prisma.order.findUnique({ where: { id: String(orderId) } });
    if (!order) return NextResponse.json({ error: "Заказ не найден" }, { status: 404 });
    await prisma.order.update({
      where: { id: order.id },
      data: { notes: `telegram_delivered:${new Date().toISOString()}` },
    });
    await prisma.delivery.updateMany({
      where: { orderId: order.id },
      data: { status: "DELIVERED", deliveredAt: new Date() },
    });
    await audit({ userId: admin.id, action: "order.telegram_delivered", entity: "Order", entityId: order.id });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
  }
}
