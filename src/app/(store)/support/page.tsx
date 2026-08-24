import { site } from "@/lib/site";

export const metadata = { title: "Поддержка" };

export default function SupportPage() {
  return (
    <div className="container-nx py-16">
      <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--accent)]">NeuroX Support</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Служба поддержки</h1>
      <p className="mt-3 max-w-2xl text-[color:var(--fg-mute)]">
        Вопросы по заказу, оплате, активации или возврату — напишите в Telegram. Укажите ключ заказа (NX-…), если он
        уже есть. Отвечаем в рабочее время, обычно в течение нескольких часов.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="card p-7">
          <p className="text-sm text-[color:var(--fg-mute)]">Основной Telegram</p>
          <h2 className="mt-1 text-2xl font-semibold">{site.support.telegramPrimaryHandle}</h2>
          <p className="mt-2 text-sm text-[color:var(--fg-mute)]">Заказы, выдача, оплата</p>
          <a href={site.support.telegramPrimary} target="_blank" rel="noreferrer" className="btn btn-primary mt-6">
            Написать
          </a>
        </div>
        <div className="card p-7">
          <p className="text-sm text-[color:var(--fg-mute)]">Дополнительный Telegram</p>
          <h2 className="mt-1 text-2xl font-semibold">{site.support.telegramSecondaryHandle}</h2>
          <p className="mt-2 text-sm text-[color:var(--fg-mute)]">Если основной не отвечает</p>
          <a href={site.support.telegramSecondary} target="_blank" rel="noreferrer" className="btn btn-ghost mt-6">
            Написать
          </a>
        </div>
      </div>

      <div className="card mt-10 p-7">
        <h2 className="text-lg font-semibold">Как ускорить ответ</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[color:var(--fg-mute)]">
          <li>Ключ заказа с сайта (формат NX-…)</li>
          <li>Логин / email аккаунта на сайте</li>
          <li>Название товара и срок (1 месяц / 12 месяцев)</li>
          <li>Скрин или описание проблемы</li>
        </ul>
        <p className="mt-4 text-sm text-[color:var(--fg-mute)]">
          Юридические документы:{" "}
          <a className="underline" href="/legal/terms">
            Пользовательское соглашение
          </a>
          ,{" "}
          <a className="underline" href="/legal/privacy">
            Политика конфиденциальности
          </a>
          ,{" "}
          <a className="underline" href="/legal/refund">
            Возврат
          </a>
          .
        </p>
      </div>
    </div>
  );
}
