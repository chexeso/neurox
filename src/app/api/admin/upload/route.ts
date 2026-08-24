import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";

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

    const buf = Buffer.from(await file.arrayBuffer());

    // Try disk first (local dev). On Railway disk is ephemeral — fall back to data URL.
    try {
      const ext =
        file.type === "image/png"
          ? "png"
          : file.type === "image/webp"
            ? "webp"
            : file.type === "image/gif"
              ? "gif"
              : "jpg";
      const name = `${Date.now()}-${randomBytes(6).toString("hex")}.${ext}`;
      const dir = path.join(process.cwd(), "public", "uploads");
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, name), buf);
      return NextResponse.json({ url: `/uploads/${name}` });
    } catch {
      const b64 = buf.toString("base64");
      const url = `data:${file.type};base64,${b64}`;
      return NextResponse.json({ url });
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : "upload failed";
    console.error("upload error:", msg);
    return NextResponse.json({ error: "Не удалось загрузить фото" }, { status: 500 });
  }
}
