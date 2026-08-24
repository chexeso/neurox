export const metadata = { title: "Оферта" };
export default function Page() {
  return (
    <article className="container-nx max-w-3xl py-16">
      <h1 className="text-4xl font-semibold">Публичная оферта</h1>
      <p className="mt-6 text-[color:var(--fg-mute)]">
        NeuroX продаёт цифровые товары и доступ. Оформляя заказ, вы подтверждаете email, соглашаетесь получить цифровую выдачу
        после подтверждения оплаты и понимаете, что ключ является одноразовым назначением. Этот текст — нейтральный шаблон и
        должен быть проверен юристом перед продакшеном.
      </p>
    </article>
  );
}
