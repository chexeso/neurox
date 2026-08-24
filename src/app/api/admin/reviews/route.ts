import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import { audit } from "@/lib/audit";

export async function POST(req: Request) {
  const admin = await requireAdmin();
  const { id, action, body, rating, title } = await req.json();
  if (action === "delete") await prisma.review.delete({ where: { id } });
  if (action === "approve") await prisma.review.update({ where: { id }, data: { status: "APPROVED" } });
  if (action === "hide") await prisma.review.update({ where: { id }, data: { status: "HIDDEN" } });
  if (action === "edit") {
    await prisma.review.update({
      where: { id },
      data: {
        body: String(body || ""),
        title: title ? String(title) : undefined,
        rating: rating ? Number(rating) : undefined,
      },
    });
  }
  await audit({ userId: admin.id, action: `review.${action}`, entity: "Review", entityId: id });
  return NextResponse.json({ ok: true });
}
