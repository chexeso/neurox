import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = { title: "Политика конфиденциальности" };

export default function PrivacyPage() {
  return (
    <article className="container-nx max-w-3xl py-16">
      <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--accent)]">NeuroX · Legal</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Политика конфиденциальности</h1>
      <p className="mt-3 text-sm text-[color:var(--fg-mute)]">
        Редакция от 24 августа 2026 г. · Сервис: <strong>NeuroX</strong> ({site.url})
      </p>

      <section className="mt-10 space-y-4 text-[15px] leading-7 text-[color:var(--fg-mute)]">
        <h2 className="text-xl font-semibold text-[color:var(--fg)]">1. Общие положения</h2>
        <p>
          Настоящая Политика описывает, какие данные собирает и обрабатывает сервис NeuroX (далее — «Сервис», «мы») при
          использовании сайта и покупке цифровых товаров (подписки и доступы к AI-инструментам и программному обеспечению).
        </p>
        <p>
          Используя сайт, вы соглашаетесь с условиями этой Политики. Если вы не согласны — пожалуйста, не пользуйтесь
          Сервисом.
        </p>

        <h2 className="text-xl font-semibold text-[color:var(--fg)]">2. Какие данные мы обрабатываем</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Адрес электронной почты и имя (при регистрации и оформлении заказа).</li>
          <li>Данные заказа: состав корзины, сумма, статус оплаты, ключ заказа.</li>
          <li>Технические данные: cookie сессии, IP-адрес, user-agent (для безопасности и работы входа).</li>
          <li>Сообщения в поддержку (Telegram), если вы к нам обращаетесь.</li>
        </ul>
        <p>
          Пароли хранятся только в виде криптографического хеша. Полные реквизиты банковских карт мы не получаем и не
          храним — их обрабатывает платёжный провайдер.
        </p>

        <h2 className="text-xl font-semibold text-[color:var(--fg)]">3. Цели обработки</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Исполнение договора купли-продажи цифрового товара и выдача доступа.</li>
          <li>Идентификация пользователя, защита аккаунта и предотвращение мошенничества.</li>
          <li>Связь по вопросам оплаты, активации и поддержки.</li>
          <li>Улучшение работы сайта и учёт обращений.</li>
        </ul>

        <h2 className="text-xl font-semibold text-[color:var(--fg)]">4. Передача третьим лицам</h2>
        <p>Мы можем передавать данные:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>платёжному провайдеру — в объёме, необходимом для приёма оплаты;</li>
          <li>хостинг-провайдеру — для размещения сайта и базы данных;</li>
          <li>по законному требованию государственных органов.</li>
        </ul>
        <p>Мы не продаём персональные данные третьим лицам для маркетинга.</p>

        <h2 className="text-xl font-semibold text-[color:var(--fg)]">5. Хранение и защита</h2>
        <p>
          Данные хранятся на защищённых серверах в течение срока, необходимого для исполнения обязательств и требований
          закона. Доступ ограничен уполномоченными лицами. Используются HTTPS, хеширование паролей и сессионные cookie.
        </p>

        <h2 className="text-xl font-semibold text-[color:var(--fg)]">6. Cookie</h2>
        <p>
          Сайт использует необходимые cookie для входа, корзины и настроек интерфейса. Отключение cookie может ограничить
          работу личного кабинета и оформления заказа.
        </p>

        <h2 className="text-xl font-semibold text-[color:var(--fg)]">7. Ваши права</h2>
        <p>
          Вы можете запросить уточнение, обновление или удаление данных аккаунта через поддержку. Мы ответим в разумный
          срок, если это не противоречит закону или необходимости хранить данные по сделкам.
        </p>

        <h2 className="text-xl font-semibold text-[color:var(--fg)]">8. Контакты</h2>
        <p>
          По вопросам персональных данных — Telegram:{" "}
          <a className="underline" href={site.support.telegramPrimary} target="_blank" rel="noreferrer">
            {site.support.telegramPrimaryHandle}
          </a>
          ,{" "}
          <a className="underline" href={site.support.telegramSecondary} target="_blank" rel="noreferrer">
            {site.support.telegramSecondaryHandle}
          </a>
          <br />
          Страница поддержки: <Link href="/support">/support</Link>
        </p>

        <h2 className="text-xl font-semibold text-[color:var(--fg)]">9. Изменения</h2>
        <p>
          Мы можем обновлять Политику. Актуальная версия всегда доступна на этой странице с указанием даты редакции.
        </p>
      </section>
    </article>
  );
}
