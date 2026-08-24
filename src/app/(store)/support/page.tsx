import { site } from "@/lib/site";

export const metadata = { title: "Поддержка" };

export default function SupportPage() {
  return (
    <div className="container-nx py-16">
      <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--accent)]">Поддержка NeuroX</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Нужна помощь?</h1>
      <p className="mt-3 max-w-2xl text-[color:var(--fg-mute)]">
        Возникли вопросы по заказу, оплате или активации? Свяжитесь с нашей поддержкой в Telegram.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="card p-7">
          <p className="text-sm text-[color:var(--fg-mute)]">Поддержка в Telegram</p>
          <h2 className="mt-1 text-2xl font-semibold">{site.support.telegramPrimaryHandle}</h2>
          <a href={site.support.telegramPrimary} target="_blank" rel="noreferrer" className="btn btn-primary mt-6">
            Написать в Telegram
          </a>
        </div>
        <div className="card p-7">
          <p className="text-sm text-[color:var(--fg-mute)]">Дополнительная поддержка</p>
          <h2 className="mt-1 text-2xl font-semibold">{site.support.telegramSecondaryHandle}</h2>
          <a href={site.support.telegramSecondary} target="_blank" rel="noreferrer" className="btn btn-ghost mt-6">
            Написать в Telegram
          </a>
        </div>
      </div>
    </div>
  );
}
