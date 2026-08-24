export const metadata = { title: "Поддержка" };

export default function SupportPage() {
  const contacts = [
    { handle: "@tgn3t", href: "https://t.me/tgn3t" },
    { handle: "@chexeso", href: "https://t.me/chexeso" },
  ];

  return (
    <div className="container-nx py-16">
      <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--accent)]">NeuroX Support</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Поддержка</h1>
      <p className="mt-3 flex items-center gap-2 text-sm text-[color:var(--fg-mute)]">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" />
        Обычно отвечаем в течение нескольких часов
      </p>
      <p className="mt-3 max-w-2xl text-[color:var(--fg-mute)]">
        Вопросы по заказу, оплате или активации — напишите в Telegram. Укажите ключ заказа (NX-…), если он уже есть.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {contacts.map((c) => (
          <div key={c.handle} className="card p-7">
            <p className="text-sm text-[color:var(--fg-mute)]">Telegram</p>
            <h2 className="mt-1 text-2xl font-semibold">{c.handle}</h2>
            <a href={c.href} target="_blank" rel="noreferrer" className="btn btn-primary mt-6">
              Написать
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
