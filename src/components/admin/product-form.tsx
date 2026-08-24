"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type Variant = {
  id?: string;
  name: string;
  slug: string;
  durationDays: number;
  durationLabel: string;
  priceCents: number;
  compareCents: number | null;
  sku: string;
};
type Product = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  status: string;
  featured: boolean;
  badge: string | null;
  previewImage: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  variants: Variant[];
} | null;

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("read failed"));
    reader.readAsDataURL(file);
  });
}

function pickVariant(variants: Variant[] | undefined, days: number, labelPart: string) {
  if (!variants?.length) return null;
  const byDays = variants.find((v) => v.durationDays === days);
  if (byDays) return byDays;
  const byLabel = variants.find((v) => v.durationLabel.toLowerCase().includes(labelPart));
  return byLabel || null;
}

export function ProductForm({
  product,
  categories,
}: {
  product: Product;
  categories: { id: string; name: string }[];
}) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [image, setImage] = useState(product?.previewImage || "");
  const [uploading, setUploading] = useState(false);
  const [categoryId, setCategoryId] = useState(product?.categoryId || categories[0]?.id || "");
  const [status, setStatus] = useState(product?.status || "DRAFT");

  const v1 = pickVariant(product?.variants, 30, "1 мес") || product?.variants?.[0];
  const v12 =
    pickVariant(product?.variants, 365, "12") ||
    pickVariant(product?.variants, 360, "12") ||
    product?.variants?.find((v) => v.id !== v1?.id) ||
    null;

  async function upload(file: File) {
    setError("");
    setUploading(true);
    try {
      const local = await fileToDataUrl(file);
      setImage(local);
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
        credentials: "same-origin",
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.url) setImage(json.url);
    } catch {
      setError("Не удалось прочитать файл");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/products", {
      method: product ? "PUT" : "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: product?.id,
        name: form.get("name"),
        slug: form.get("slug"),
        shortDescription: form.get("shortDescription"),
        description: form.get("description"),
        categoryId,
        status,
        featured: form.get("featured") === "on",
        badge: form.get("badge"),
        previewImage: image,
        seoTitle: form.get("seoTitle"),
        seoDescription: form.get("seoDescription"),
        variants: [
          {
            id: v1?.id,
            durationLabel: "1 месяц",
            durationDays: 30,
            priceRubles: Number(form.get("price1") || 0),
            compareRubles: Number(form.get("compare1") || 0) || null,
            sku: String(form.get("sku1") || ""),
          },
          {
            id: v12?.id,
            durationLabel: "12 месяцев",
            durationDays: 365,
            priceRubles: Number(form.get("price12") || 0),
            compareRubles: Number(form.get("compare12") || 0) || null,
            sku: String(form.get("sku12") || ""),
          },
        ],
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return setError(data.error || "Ошибка сохранения");
    router.push("/admin/products");
    router.refresh();
  }

  const price1 = v1 ? Math.round(v1.priceCents / 100) : 3490;
  const compare1 = v1?.compareCents ? Math.round(v1.compareCents / 100) : 0;
  const price12 = v12 ? Math.round(v12.priceCents / 100) : 24990;
  const compare12 = v12?.compareCents ? Math.round(v12.compareCents / 100) : 0;

  return (
    <form onSubmit={onSubmit} className="card mt-6 grid max-w-2xl gap-4 p-6">
      <label className="text-sm">
        Название
        <input name="name" className="field mt-1" defaultValue={product?.name} required />
      </label>
      <label className="text-sm">
        Короткое описание
        <input name="shortDescription" className="field mt-1" defaultValue={product?.shortDescription} required />
      </label>
      <label className="text-sm">
        Полное описание
        <textarea name="description" className="field mt-1 min-h-32" defaultValue={product?.description} required />
      </label>
      <label className="text-sm">
        Адрес страницы (латиницей)
        <input name="slug" className="field mt-1" defaultValue={product?.slug} placeholder="grok-heavy" required />
      </label>

      <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-mute)]/40 p-4">
        <p className="text-sm font-medium">Фото товара</p>
        <div
          className="mt-3 flex min-h-36 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-[color:var(--line)] bg-[color:var(--bg)] transition hover:border-[color:var(--fg)]/40"
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files?.[0];
            if (f) void upload(f);
          }}
        >
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="" className="h-40 w-full object-cover" />
          ) : (
            <div className="px-4 py-8 text-center text-sm text-[color:var(--fg-mute)]">
              Нажмите или перетащите фото сюда
            </div>
          )}
        </div>
        <input
          ref={fileRef}
          className="sr-only"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void upload(file);
          }}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" className="btn btn-ghost !py-2 text-sm" onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? "Загружаем…" : image ? "Сменить фото" : "Выбрать файл"}
          </button>
          {image && (
            <button type="button" className="btn btn-ghost !py-2 text-sm" onClick={() => setImage("")}>
              Убрать
            </button>
          )}
        </div>
      </div>

      {/* Prices: 1 month + 12 months */}
      <div className="rounded-2xl border border-[color:var(--line)] p-4">
        <p className="text-sm font-semibold">Тариф: 1 месяц</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <label className="text-sm">
            Цена, ₽
            <input name="price1" className="field mt-1" type="number" min={1} defaultValue={price1} required />
          </label>
          <label className="text-sm">
            Старая цена, ₽
            <input name="compare1" className="field mt-1" type="number" min={0} defaultValue={compare1} />
          </label>
          <label className="text-sm">
            Артикул
            <input name="sku1" className="field mt-1" defaultValue={v1?.sku || ""} placeholder="NX-1M" />
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-[color:var(--line)] p-4">
        <p className="text-sm font-semibold">Тариф: 12 месяцев</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <label className="text-sm">
            Цена, ₽
            <input name="price12" className="field mt-1" type="number" min={0} defaultValue={price12} />
          </label>
          <label className="text-sm">
            Старая цена, ₽
            <input name="compare12" className="field mt-1" type="number" min={0} defaultValue={compare12} />
          </label>
          <label className="text-sm">
            Артикул
            <input name="sku12" className="field mt-1" defaultValue={v12?.sku || ""} placeholder="NX-12M" />
          </label>
        </div>
        <p className="mt-2 text-xs text-[color:var(--fg-mute)]">Если цену 12 мес поставить 0 — тариф на сайте можно скрыть логикой витрины позже.</p>
      </div>

      <label className="text-sm">
        Категория
        <div className="admin-select mt-1">
          <select className="admin-select-el" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </label>

      <label className="text-sm">
        Статус
        <div className="admin-select mt-1">
          <select className="admin-select-el" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="DRAFT">Черновик</option>
            <option value="PUBLISHED">Опубликован</option>
            <option value="HIDDEN">Скрыт</option>
            <option value="ARCHIVED">Архив</option>
          </select>
        </div>
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="featured" defaultChecked={product?.featured} className="h-4 w-4" />
        Показывать в популярном
      </label>

      <label className="text-sm">
        Метка
        <input name="badge" className="field mt-1" defaultValue={product?.badge || ""} placeholder="Хит, Новинка" />
      </label>
      <label className="text-sm">
        SEO заголовок
        <input name="seoTitle" className="field mt-1" defaultValue={product?.seoTitle || ""} />
      </label>
      <label className="text-sm">
        SEO описание
        <input name="seoDescription" className="field mt-1" defaultValue={product?.seoDescription || ""} />
      </label>

      {error && <p className="text-sm text-[color:var(--danger)]">{error}</p>}
      <button className="btn btn-primary" disabled={uploading}>
        {uploading ? "Подождите…" : "Сохранить товар"}
      </button>
    </form>
  );
}
