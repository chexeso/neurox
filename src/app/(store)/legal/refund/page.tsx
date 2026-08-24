import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = { title: "Политика возврата" };

export default function RefundPage() {
  return (
    <article className="container-nx max-w-3xl py-16">
      <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--accent)]">NeuroX · Legal</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Политика возврата</h1>
      <p className="mt-3 text-sm text-[color:var(--fg-mute)]">Редакция от 24 августа 2026 г. · NeuroX</p>

      <section className="mt-10 space-y-4 text-[15px] leading-7 text-[color:var(--fg-mute)]">
        <h2 className="text-xl font-semibold text-[color:var(--fg)]">1. Общий принцип</h2>
        <p>
          NeuroX продаёт <strong>цифровые</strong> товары (ключи, доступы, подписки). После передачи доступа покупателю
          товар считается оказанным. Возврат возможен в ограниченных случаях ниже.
        </p>

        <h2 className="text-xl font-semibold text-[color:var(--fg)]">2. Когда возврат возможен</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Оплата прошла, но товар не был выдан по вине Сервиса в согласованный срок.</li>
          <li>Выданный код/доступ официально нерабочий, и поддержка не смогла предоставить замену.</li>
          <li>Двойное списание или техническая ошибка платежа при отсутствии выдачи.</li>
        </ul>

        <h2 className="text-xl font-semibold text-[color:var(--fg)]">3. Когда возврат не производится</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Доступ уже активирован и используется.</li>
          <li>Покупатель передумал после выдачи рабочего доступа.</li>
          <li>Блокировка или ограничение на стороне стороннего AI/сервиса по их правилам после успешной выдачи.</li>
          <li>Неверные контактные данные или игнорирование инструкций активации со стороны покупателя.</li>
        </ul>

        <h2 className="text-xl font-semibold text-[color:var(--fg)]">4. Как обратиться</h2>
        <p>
          Напишите в поддержку и укажите: ключ заказа (NX-…), дату оплаты и суть проблемы. Срок рассмотрения — обычно до
          3 рабочих дней.
        </p>
        <p>
          Telegram:{" "}
          <a className="underline" href={site.support.telegramPrimary} target="_blank" rel="noreferrer">
            {site.support.telegramPrimaryHandle}
          </a>
          ,{" "}
          <a className="underline" href={site.support.telegramSecondary} target="_blank" rel="noreferrer">
            {site.support.telegramSecondaryHandle}
          </a>
          <br />
          <Link className="underline" href="/support">
            Страница поддержки
          </Link>
        </p>

        <h2 className="text-xl font-semibold text-[color:var(--fg)]">5. Способ возврата</h2>
        <p>
          При одобрении возврат выполняется тем же способом, которым была оплата, либо иным согласованным с плательщиком
          способом через платёжного провайдера. Срок зачисления зависит от банка.
        </p>
      </section>
    </article>
  );
}
