import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Нет доступа. Войдите как админ." }, { status: 403 });
  }

  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Файл не выбран" }, { status: 400 });
    }
    if (file.size > 6 * 1024 * 1024) {
      return NextResponse.json({ error: "Файл больше 6 МБ" }, { status: 400 });
    }
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: "Нужен JPG, PNG, WebP или GIF" }, { status: 400 });
    }

    // Always embed as data URL — works on Railway (no disk)
    const buf = Buffer.from(await file.arrayBuffer());
    const url = `data:${file.type};base64,${buf.toString("base64")}`;
    return NextResponse.json({ url });
  } catch (e) {
    console.error("upload error:", e);
    return NextResponse.json({ error: "Не удалось загрузить фото" }, { status: 500 });
  }
}
