import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { emails } from "@/lib/email";
import { randomBytes } from "crypto";
import { site } from "@/lib/site";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ ok: true });
  const user = await prisma.user.findUnique({ where: { email: String(email).toLowerCase() } });
  if (user) {
    const token = randomBytes(24).toString("hex");
    await prisma.passwordReset.create({
      data: { userId: user.id, token, expiresAt: new Date(Date.now() + 1000 * 60 * 30) },
    });
    await emails.reset(user.email, `${site.url}/reset-password?token=${token}`);
  }
  return NextResponse.json({ ok: true });
}
