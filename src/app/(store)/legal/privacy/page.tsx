export const metadata = { title: "Конфиденциальность" };
export default function Page() {
  return (
    <article className="container-nx max-w-3xl py-16">
      <h1 className="text-4xl font-semibold">Политика конфиденциальности</h1>
      <p className="mt-6 text-[color:var(--fg-mute)]">
        Мы храним email, данные заказа и служебные сессии, чтобы выдать товар и обеспечить безопасность аккаунта. Пароли
        хранятся только в виде хеша. Платёжные реквизиты обрабатывает провайдер оплаты. Шаблон не заменяет юридическую политику.
      </p>
    </article>
  );
}
