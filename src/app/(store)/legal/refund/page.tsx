export const metadata = { title: "Возврат" };
export default function Page() {
  return (
    <article className="container-nx max-w-3xl py-16">
      <h1 className="text-4xl font-semibold">Политика возврата</h1>
      <p className="mt-6 text-[color:var(--fg-mute)]">
        После выдачи цифрового ключа возврат рассматривается индивидуально: если товар не активирован и обращение пришло
        оперативно, поддержка может инициировать refund и отозвать ключ. Неработающий код — сначала диагностика, не автоматический
        возврат. Итоговые правила должен подтвердить оператор магазина.
      </p>
    </article>
  );
}
