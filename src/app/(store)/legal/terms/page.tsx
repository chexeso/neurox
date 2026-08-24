import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = { title: "Пользовательское соглашение" };

export default function TermsPage() {
  return (
    <article className="container-nx max-w-3xl py-16">
      <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--accent)]">NeuroX · Legal</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Пользовательское соглашение</h1>
      <p className="mt-3 text-sm text-[color:var(--fg-mute)]">
        Публичная оферта · редакция от 24 августа 2026 г. · <strong>NeuroX</strong>
      </p>

      <section className="mt-10 space-y-4 text-[15px] leading-7 text-[color:var(--fg-mute)]">
        <h2 className="text-xl font-semibold text-[color:var(--fg)]">1. Предмет соглашения</h2>
        <p>
          NeuroX (сайт {site.url}) предлагает пользователю приобрести цифровые товары: доступ к подпискам и сервисам
          AI/ПО (далее — «Товар»). Оформление заказа означает акцепт настоящей оферты.
        </p>

        <h2 className="text-xl font-semibold text-[color:var(--fg)]">2. Товар и цены</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Товар — цифровой: ключ, инструкция или доступ, без физической доставки.</li>
          <li>Актуальные цены и сроки (например, 1 месяц / 12 месяцев) указаны на страницах товаров в каталоге в рублях (₽).</li>
          <li>Цена фиксируется в момент подтверждения оплаты.</li>
          <li>Описание на карточке товара определяет, что именно входит в покупку.</li>
        </ul>

        <h2 className="text-xl font-semibold text-[color:var(--fg)]">3. Заказ и оплата</h2>
        <p>
          Заказ создаётся через корзину на сайте. Оплата производится через подключённого платёжного провайдера
          (банковская карта, СБП и другие доступные методы). После успешной оплаты формируется ключ заказа; выдача
          доступа осуществляется согласно описанию товара (в том числе через поддержку в Telegram по ключу заказа).
        </p>

        <h2 className="text-xl font-semibold text-[color:var(--fg)]">4. Выдача и использование</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Цифровой товар предназначен для личного использования покупателем.</li>
          <li>Запрещены мошенничество, chargeback без основания, перепродажа в нарушение правил правообладателей.</li>
          <li>Покупатель обязан предоставить корректные данные для связи и следовать инструкции активации.</li>
        </ul>

        <h2 className="text-xl font-semibold text-[color:var(--fg)]">5. Возврат</h2>
        <p>
          Условия возврата описаны в{" "}
          <Link className="underline" href="/legal/refund">
            Политике возврата
          </Link>
          . После передачи и активации цифрового доступа возврат, как правило, не производится, за исключением случаев,
          предусмотренных политикой и законом.
        </p>

        <h2 className="text-xl font-semibold text-[color:var(--fg)]">6. Ответственность</h2>
        <p>
          Сервис прилагает разумные усилия для своевременной выдачи. NeuroX не несёт ответственность за действия
          сторонних платформ (AI-сервисов), изменение их тарифов или блокировки по правилам правообладателя, если товар
          был выдан в соответствии с описанием на момент покупки.
        </p>

        <h2 className="text-xl font-semibold text-[color:var(--fg)]">7. Интеллектуальная собственность</h2>
        <p>
          Названия и товарные знаки сторонних сервисов принадлежат их владельцам. NeuroX не является аффилированным лицом
          xAI, Cursor и других упомянутых брендов, если иное прямо не указано.
        </p>

        <h2 className="text-xl font-semibold text-[color:var(--fg)]">8. Поддержка</h2>
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
          Страница: <Link href="/support">/support</Link>
        </p>

        <h2 className="text-xl font-semibold text-[color:var(--fg)]">9. Заключительные положения</h2>
        <p>
          К отношениям сторон применяется применимое право. Споры по возможности решаются путём переговоров через
          поддержку. Актуальная версия соглашения публикуется на этой странице.
        </p>
      </section>
    </article>
  );
}
