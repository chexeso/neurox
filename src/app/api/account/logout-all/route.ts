import { NextResponse } from "next/server";
import { getCurrentUser, destroyAllSessions } from "@/lib/session";

export async function POST() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "auth" }, { status: 401 });
  await destroyAllSessions(user.id);
  return NextResponse.json({ ok: true });
}
