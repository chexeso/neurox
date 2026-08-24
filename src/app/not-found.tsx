import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">404</p>
      <h1 className="mt-3 text-4xl font-semibold">Эта страница исчезла в облаке.</h1>
      <p className="mt-3 max-w-md text-[color:var(--fg-mute)]">Адрес не найден. Вернитесь в каталог NeuroX и продолжите с рабочего пространства продуктов.</p>
      <Link href="/products" className="btn btn-primary mt-8">
        В магазин
      </Link>
    </div>
  );
}
