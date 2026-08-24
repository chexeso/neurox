import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "auth" }, { status: 401 });
  const { name } = await req.json();
  await prisma.user.update({ where: { id: user.id }, data: { name: String(name || "").slice(0, 80) } });
  return NextResponse.json({ ok: true });
}
