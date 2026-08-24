import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/password";

export async function POST(req: Request) {
  const { token, password } = await req.json();
  if (!token || !password || String(password).length < 8) {
    return NextResponse.json({ error: "Неверные данные" }, { status: 400 });
  }
  const reset = await prisma.passwordReset.findUnique({ where: { token } });
  if (!reset || reset.usedAt || reset.expiresAt < new Date()) {
    return NextResponse.json({ error: "Ссылка недействительна" }, { status: 400 });
  }
  await prisma.user.update({ where: { id: reset.userId }, data: { passwordHash: await hashPassword(password) } });
  await prisma.passwordReset.update({ where: { id: reset.id }, data: { usedAt: new Date() } });
  await prisma.session.deleteMany({ where: { userId: reset.userId } });
  return NextResponse.json({ ok: true });
}
