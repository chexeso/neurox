export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function formatMoney(cents: IntLike, currency = "RUB") {
  const value = Number(cents) / 100;
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function discountPercent(price: IntLike, compare?: IntLike | null) {
  if (!compare || Number(compare) <= Number(price)) return 0;
  return Math.round(((Number(compare) - Number(price)) / Number(compare)) * 100);
}

export function orderNumber() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `NX-${n}`;
}

export function safeJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

type IntLike = number | bigint;
