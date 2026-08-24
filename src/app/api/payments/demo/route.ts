import { NextResponse } from "next/server";
import { markPaymentSucceeded } from "@/lib/checkout";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  // In local/dev always allow demo if explicitly enabled OR no Stripe key
  const allowed =
    process.env.ALLOW_DEMO_PAYMENTS === "true" ||
    process.env.NODE_ENV !== "production" ||
    !process.env.STRIPE_SECRET_KEY;

  if (!allowed) {
    return NextResponse.json({ error: "Demo-оплата отключена" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const paymentId = String(body.paymentId || "");
  if (!paymentId) return NextResponse.json({ error: "Нет paymentId" }, { status: 400 });

  const payment = await prisma.payment.findUnique({ where: { id: paymentId }, include: { order: true } });
  if (!payment) return NextResponse.json({ error: "Платёж не найден" }, { status: 404 });
  if (payment.provider !== "demo") return NextResponse.json({ error: "Не demo-платёж" }, { status: 400 });
  if (payment.status === "SUCCEEDED") return NextResponse.json({ ok: true, already: true });

  try {
    const eventId = `demo_${payment.id}_${Date.now()}`;
    await markPaymentSucceeded({ paymentId: payment.id, eventId });
    return NextResponse.json({ ok: true, orderId: payment.orderId });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "ERROR";
    console.error("demo payment error:", msg, e);
    return NextResponse.json({ error: msg === "OUT_OF_STOCK" ? "Нет свободных ключей" : "Не удалось подтвердить оплату" }, { status: 400 });
  }
}
