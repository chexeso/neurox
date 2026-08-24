import Link from "next/link";

export function WowCompare() {
  return (
    <section className="container-nx py-14">
      <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--accent)]">Тарифы</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">1 месяц или 12 — наглядно</h2>
      <p className="mt-2 max-w-xl text-sm text-[color:var(--fg-mute)]">
        Цена всегда указана на карточке товара. Год обычно выгоднее, если пользуетесь постоянно.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="card p-7">
          <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--fg-mute)]">Гибко</p>
          <h3 className="mt-2 text-2xl font-semibold">1 месяц</h3>
          <ul className="mt-4 space-y-2 text-sm text-[color:var(--fg-mute)]">
            <li>— попробовать сервис</li>
            <li>— меньше риск, если не зайдёт</li>
            <li>— выдача так же быстро</li>
          </ul>
        </div>
        <div className="card wow-year p-7">
          <p className="text-xs uppercase tracking-[0.16em] text-sky-300">Выгоднее</p>
          <h3 className="mt-2 text-2xl font-semibold">12 месяцев</h3>
          <ul className="mt-4 space-y-2 text-sm text-[color:var(--fg-mute)]">
            <li>— один платёж на год</li>
            <li>— обычно ниже цена за месяц</li>
            <li>— не нужно продлевать каждый месяц</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function WowSteps() {
  const steps = [
    { n: "01", t: "Выберите тариф", d: "1 месяц или 12 — цена на карточке." },
    { n: "02", t: "Оплатите", d: "После входа в аккаунт оформите заказ." },
    { n: "03", t: "Получите доступ", d: "Ключ NX-… → напишите в Telegram." },
  ];
  return (
    <section id="how" className="container-nx py-12">
      <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--accent)]">Как получить</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">Три шага до доступа</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="card p-6">
            <p className="font-mono text-sm text-sky-300">{s.n}</p>
            <h3 className="mt-2 text-lg font-semibold">{s.t}</h3>
            <p className="mt-2 text-sm text-[color:var(--fg-mute)]">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function WowChannel() {
  return (
    <section className="container-nx py-12">
      <div className="wow-channel card overflow-hidden p-8 md:flex md:items-center md:justify-between md:gap-8">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-sky-300">Telegram</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Канал NeuroX</h2>
          <p className="mt-2 max-w-lg text-sm text-[color:var(--fg-mute)]">
            Новые товары, наличие и обновления магазина — без спама.
          </p>
        </div>
        <a href="https://t.me/neuroxstore" target="_blank" rel="noreferrer" className="btn btn-primary mt-6 md:mt-0">
          @neuroxstore
        </a>
      </div>
    </section>
  );
}

export function PayBadges() {
  return (
    <p className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.12em] text-[color:var(--fg-mute)]">
      <span className="rounded-full border border-[color:var(--line)] px-2.5 py-1">СБП</span>
      <span className="rounded-full border border-[color:var(--line)] px-2.5 py-1">Карта</span>
      <span className="rounded-full border border-[color:var(--line)] px-2.5 py-1">Ключ сразу после оплаты</span>
    </p>
  );
}

export function OrderLookup() {
  return (
    <form action="/order" className="mt-6 flex max-w-md gap-2">
      <input name="key" className="field flex-1" placeholder="NX-XXXXXX" required />
      <button className="btn btn-ghost" type="submit">
        Найти
      </button>
    </form>
  );
}
