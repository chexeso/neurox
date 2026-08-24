import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "auth" }, { status: 401 });
  const { current, next } = await req.json();
  const ok = await verifyPassword(String(current || ""), user.passwordHash);
  if (!ok || String(next || "").length < 8) return NextResponse.json({ error: "invalid" }, { status: 400 });
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash: await hashPassword(String(next)) } });
  return NextResponse.json({ ok: true });
}
