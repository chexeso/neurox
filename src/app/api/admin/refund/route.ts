import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { refundOrder } from "@/lib/fulfillment";

export async function POST(req: Request) {
  try {
    const admin = await requireAdmin();
    const { orderId } = await req.json();
    await refundOrder(String(orderId), admin.id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Не удалось вернуть" }, { status: 400 });
  }
}
