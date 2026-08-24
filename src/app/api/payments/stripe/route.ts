import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { site } from "@/lib/site";

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: "Stripe не настроен. Укажите STRIPE_SECRET_KEY." }, { status: 400 });
  const { paymentId } = await req.json();
  const payment = await prisma.payment.findUnique({ where: { id: String(paymentId) }, include: { order: true } });
  if (!payment) return NextResponse.json({ error: "Платёж не найден" }, { status: 404 });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      mode: "payment",
      success_url: `${site.url}/checkout/success?order=${payment.orderId}`,
      cancel_url: `${site.url}/checkout/pay/${payment.orderId}`,
      customer_email: payment.order.email,
      "line_items[0][quantity]": "1",
      "line_items[0][price_data][currency]": payment.currency.toLowerCase(),
      "line_items[0][price_data][unit_amount]": String(payment.amountCents),
      "line_items[0][price_data][product_data][name]": `NeuroX ${payment.order.number}`,
      "metadata[paymentId]": payment.id,
      "metadata[orderId]": payment.orderId,
    }),
  });
  const data = await res.json();
  if (!res.ok) return NextResponse.json({ error: data.error?.message || "Stripe error" }, { status: 400 });
  await prisma.payment.update({
    where: { id: payment.id },
    data: { providerSessionId: data.id, providerPaymentId: data.payment_intent || undefined },
  });
  return NextResponse.json({ url: data.url });
}
