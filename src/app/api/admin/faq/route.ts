import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  await requireAdmin();
  const { question, answer } = await req.json();
  await prisma.faq.create({ data: { question: String(question), answer: String(answer) } });
  return NextResponse.json({ ok: true });
}
