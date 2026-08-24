"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Variant = { id?: string; name: string; slug: string; durationDays: number; durationLabel: string; priceCents: number; compareCents: number | null; sku: string };
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

export function ProductForm({
  product,
  categories,
}: {
  product: Product;
  categories: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [image, setImage] = useState(product?.previewImage || "");
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: data });
    const json = await res.json();
    setUploading(false);
    if (!res.ok) {
      setError(json.error || "Не удалось загрузить фото");
      return;
    }
    setImage(json.url);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/products", {
      method: product ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: product?.id,
        name: form.get("name"),
        slug: form.get("slug"),
        shortDescription: form.get("shortDescription"),
        description: form.get("description"),
        categoryId: form.get("categoryId"),
        status: form.get("status"),
        featured: form.get("featured") === "on",
        badge: form.get("badge"),
        previewImage: image,
        seoTitle: form.get("seoTitle"),
        seoDescription: form.get("seoDescription"),
        priceRubles: Number(form.get("priceRubles")),
        compareRubles: Number(form.get("compareRubles") || 0) || null,
        durationLabel: form.get("durationLabel"),
        sku: form.get("sku"),
      }),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error || "Ошибка");
    router.push("/admin/products");
    router.refresh();
  }

  const priceRub = product?.variants[0] ? Math.round(product.variants[0].priceCents / 100) : 3490;
  const compareRub = product?.variants[0]?.compareCents ? Math.round(product.variants[0].compareCents / 100) : 0;

  return (
    <form onSubmit={onSubmit} className="card mt-6 grid max-w-2xl gap-3 p-6">
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
      <div className="rounded-2xl border border-[color:var(--line)] p-4">
        <p className="text-sm font-medium">Фото товара</p>
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="mt-3 h-36 w-full rounded-xl object-cover" />
        )}
        <input
          className="mt-3 block text-sm"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void upload(file);
          }}
        />
        <p className="mt-2 text-xs text-[color:var(--fg-mute)]">{uploading ? "Загружаем…" : "JPG, PNG или WebP до 6 МБ"}</p>
      </div>
      <select name="categoryId" className="field" defaultValue={product?.categoryId}>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <select name="status" className="field" defaultValue={product?.status || "DRAFT"}>
        <option value="DRAFT">Черновик</option>
        <option value="PUBLISHED">Опубликован</option>
        <option value="HIDDEN">Скрыт</option>
        <option value="ARCHIVED">Архив</option>
      </select>
      <label className="text-sm">
        <input type="checkbox" name="featured" defaultChecked={product?.featured} /> Показывать в популярном
      </label>
      <input name="badge" className="field" defaultValue={product?.badge || ""} placeholder="Метка: Хит, Новинка" />
      <label className="text-sm">
        Цена, ₽
        <input name="priceRubles" className="field mt-1" type="number" min={1} defaultValue={priceRub} required />
      </label>
      <label className="text-sm">
        Старая цена, ₽
        <input name="compareRubles" className="field mt-1" type="number" min={0} defaultValue={compareRub} />
      </label>
      <input name="durationLabel" className="field" defaultValue={product?.variants[0]?.durationLabel || "1 месяц"} placeholder="Срок" />
      <input name="sku" className="field" defaultValue={product?.variants[0]?.sku || ""} placeholder="Артикул" />
      <input name="seoTitle" className="field" defaultValue={product?.seoTitle || ""} placeholder="SEO заголовок" />
      <input name="seoDescription" className="field" defaultValue={product?.seoDescription || ""} placeholder="SEO описание" />
      {error && <p className="text-sm text-[color:var(--danger)]">{error}</p>}
      <button className="btn btn-primary" disabled={uploading}>
        Сохранить товар
      </button>
    </form>
  );
}
