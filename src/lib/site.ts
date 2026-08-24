export const site = {
     name: "NeuroX",
     tagline: "Цифровые продукты. AI-инструменты. Мгновенный доступ.",
     description:
       "Премиальный маркетплейс цифровых AI-инструментов и подписок с мгновенной выдачей после оплаты.",
     url: process.env.APP_URL || "http://localhost:3000",
     support: {
       telegramPrimary: "https://t.me/tgn3t",
       telegramPrimaryHandle: "@tgn3t",
       telegramSecondary: "https://t.me/chexeso",
       telegramSecondaryHandle: "@chexeso",
     },
     social: {
       telegramChannel: "https://t.me/neuroxstore",
       playerokReviews: "https://playerok.com/profile/YoungSellering/reviews",
     },
   };
   export const nav = [
     { href: "/products", label: "Каталог" },
     { href: "/products?featured=1", label: "Популярное" },
     { href: "/#how", label: "Как это работает" },
     { href: "/#faq", label: "FAQ" },
     { href: "/support", label: "Поддержка" },
   ];