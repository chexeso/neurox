export const metadata = { title: "Файлы cookie" };
export default function Page() {
  return (
    <article className="container-nx max-w-3xl py-16">
      <h1 className="text-4xl font-semibold">Политика cookie</h1>
      <p className="mt-6 text-[color:var(--fg-mute)]">
        NeuroX использует необходимые cookie для сессии, гостевой корзины и темы оформления. Аналитические события на первом
        этапе хранятся на сервере без сторонних пикселей.
      </p>
    </article>
  );
}
