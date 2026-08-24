import { site } from "./site";

type Mail = { to: string; subject: string; html: string };

function wrap(title: string, body: string) {
  return `<!doctype html>
<html><body style="margin:0;background:#07080A;color:#F4F6F8;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#07080A;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#101216;border:1px solid #22262E;border-radius:16px;padding:32px;">
        <tr><td style="font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#5EEAD4;">NeuroX</td></tr>
        <tr><td style="padding-top:12px;font-size:22px;font-weight:600;">${title}</td></tr>
        <tr><td style="padding-top:16px;color:#B6BDC6;font-size:15px;line-height:1.6;">${body}</td></tr>
        <tr><td style="padding-top:28px;color:#6B7280;font-size:12px;">${site.tagline}</td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export async function sendMail(mail: Mail) {
  if (process.env.RESEND_API_KEY) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || "NeuroX <hello@neurox.dev>",
        to: mail.to,
        subject: mail.subject,
        html: mail.html,
      }),
    });
    return;
  }
  console.info("[email:dev]", mail.subject, "->", mail.to);
}

export const emails = {
  welcome: (to: string, name: string) =>
    sendMail({
      to,
      subject: "Добро пожаловать в NeuroX",
      html: wrap("Аккаунт создан", `Привет${name ? `, ${name}` : ""}. Ваш аккаунт NeuroX готов. Цифровые продукты появятся в кабинете сразу после оплаты.`),
    }),
  verify: (to: string, url: string) =>
    sendMail({
      to,
      subject: "Подтвердите email — NeuroX",
      html: wrap("Подтверждение почты", `Чтобы активировать аккаунт, перейдите по ссылке: <a href="${url}" style="color:#5EEAD4">${url}</a>`),
    }),
  reset: (to: string, url: string) =>
    sendMail({
      to,
      subject: "Сброс пароля — NeuroX",
      html: wrap("Сброс пароля", `Запросили новый пароль? Ссылка действует ограниченное время: <a href="${url}" style="color:#5EEAD4">${url}</a>`),
    }),
  orderPaid: (to: string, number: string) =>
    sendMail({
      to,
      subject: `Оплата получена · ${number}`,
      html: wrap("Оплата подтверждена", `Заказ ${number} оплачен. Цифровой товар уже собирается и появится в кабинете.`),
    }),
  delivery: (to: string, number: string, details: string) =>
    sendMail({
      to,
      subject: `Ваш продукт готов · ${number}`,
      html: wrap("Цифровой товар готов.", `Заказ ${number} выдан.<br/><br/>${details}<br/><br/>Откройте кабинет NeuroX, чтобы скопировать ключ и инструкции.`),
    }),
  failed: (to: string, number: string) =>
    sendMail({
      to,
      subject: `Платёж не прошёл · ${number}`,
      html: wrap("Платёж не подтверждён", `По заказу ${number} оплата не прошла. Резерв цифрового товара снят. Можно повторить checkout.`),
    }),
  refund: (to: string, number: string) =>
    sendMail({
      to,
      subject: `Возврат по заказу ${number}`,
      html: wrap("Возврат оформлен", `По заказу ${number} оформлен возврат. Доступ к цифровому товару отозван.`),
    }),
};
