import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { createSession } from "@/lib/session";
import { emails } from "@/lib/email";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(80),
  password: z.string().min(8).max(100),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Проверьте поля" }, { status: 400 });
  const email = parsed.data.email.toLowerCase();
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return NextResponse.json({ error: "Этот email уже зарегистрирован" }, { status: 409 });
  const role = await prisma.role.findUnique({ where: { name: "CUSTOMER" } });
  if (!role) return NextResponse.json({ error: "Роли не инициализированы" }, { status: 500 });
  const user = await prisma.user.create({
    data: {
      email,
      name: parsed.data.name,
      passwordHash: await hashPassword(parsed.data.password),
      roleId: role.id,
    },
  });
  await createSession(user.id);
  await emails.welcome(email, parsed.data.name);
  return NextResponse.json({ ok: true });
}
