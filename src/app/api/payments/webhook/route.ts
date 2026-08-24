import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { markPaymentSucceeded, markPaymentFailed } from "@/lib/checkout";
import { createHmac, timingSafeEqual } from "crypto";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature") || "";

  if (secret) {
    const ok = verifyStripe(payload, sig, secret);
    if (!ok) return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  } else if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "webhook secret required" }, { status: 400 });
  }

  const event = JSON.parse(payload) as { id: string; type: string; data: { object: Record<string, unknown> } };
  const obj = event.data.object;
  const meta = (obj.metadata || {}) as Record<string, string>;
  const paymentId = meta.paymentId;
  const paymentIntent = String(obj.payment_intent || obj.id || "");

  if (event.type === "checkout.session.completed" || event.type === "payment_intent.succeeded") {
    if (paymentId) {
      await prisma.payment.updateMany({ where: { id: paymentId }, data: { providerPaymentId: paymentIntent } });
      await markPaymentSucceeded({ paymentId, eventId: event.id });
    } else {
      await markPaymentSucceeded({ providerPaymentId: paymentIntent, eventId: event.id });
    }
  }
  if (event.type === "payment_intent.payment_failed" && paymentId) {
    await markPaymentFailed(paymentId, event.id);
  }
  return NextResponse.json({ received: true });
}

function verifyStripe(payload: string, header: string, secret: string) {
  const parts = Object.fromEntries(header.split(",").map((p) => p.split("=")));
  const signed = `v1:${parts.t}.${payload}`;
  const hmac = createHmac("sha256", secret).update(signed.replace("v1:", "")).digest("hex");
  // Stripe signs `${t}.${payload}`
  const expected = createHmac("sha256", secret).update(`${parts.t}.${payload}`).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(parts.v1 || hmac), Buffer.from(expected));
  } catch {
    return false;
  }
}
