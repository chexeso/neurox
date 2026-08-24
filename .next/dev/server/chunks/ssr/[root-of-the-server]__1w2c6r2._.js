module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[project]/src/components/locale-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LocaleProvider",
    ()=>LocaleProvider,
    "useLocale",
    ()=>useLocale,
    "useT",
    ()=>useT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const LocaleCtx = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function LocaleProvider({ children }) {
    const [locale, setLocaleState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("ru");
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem("nx_lang") || "ru";
        if (saved === "ru" || saved === "en" || saved === "zh") setLocaleState(saved);
        setReady(true);
    }, []);
    function setLocale(l) {
        setLocaleState(l);
        localStorage.setItem("nx_lang", l);
        document.documentElement.lang = l === "zh" ? "zh-CN" : l;
        document.cookie = `nx_lang=${l};path=/;max-age=31536000`;
    }
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            locale,
            setLocale,
            t: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDict"])(locale)
        }), [
        locale
    ]);
    if (!ready) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LocaleCtx.Provider, {
            value: {
                locale: "ru",
                setLocale,
                t: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDict"])("ru")
            },
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/locale-provider.tsx",
            lineNumber: 34,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LocaleCtx.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/locale-provider.tsx",
        lineNumber: 37,
        columnNumber: 10
    }, this);
}
function useT() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LocaleCtx);
    if (!ctx) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDict"])("ru");
    return ctx.t;
}
function useLocale() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LocaleCtx);
    return ctx || {
        locale: "ru",
        setLocale: ()=>{},
        t: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDict"])("ru")
    };
}
}),
"[project]/src/components/theme-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
function ThemeProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        attribute: "class",
        defaultTheme: "dark",
        enableSystem: false,
        themes: [
            "light",
            "medium",
            "dark",
            "black"
        ],
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/theme-provider.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/lib/i18n.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dictionaries",
    ()=>dictionaries,
    "getDict",
    ()=>getDict,
    "locales",
    ()=>locales
]);
const locales = [
    {
        code: "ru",
        label: "RU"
    },
    {
        code: "en",
        label: "EN"
    },
    {
        code: "zh",
        label: "中文"
    }
];
const ru = {
    nav_catalog: "Каталог",
    nav_popular: "Популярное",
    nav_how: "Как это работает",
    nav_faq: "FAQ",
    nav_support: "Поддержка",
    account: "Аккаунт",
    menu: "Меню",
    cart: "Корзина",
    search_placeholder: "Поиск…",
    theme: "Тема",
    theme_light: "Светлая",
    theme_medium: "Средняя",
    theme_dark: "Тёмная",
    theme_black: "Чёрная",
    lang: "Язык",
    add_to_cart: "В корзину",
    buy_now: "Купить",
    catalog: "Каталог",
    popular: "Популярное",
    support: "Поддержка",
    shop: "Магазин",
    legal: "Документы",
    social: "Соцсети",
    terms: "Оферта",
    privacy: "Конфиденциальность",
    refund: "Возврат",
    reviews_playerok: "Отзывы на Playerok",
    footer_tagline: "Цифровые продукты. AI-инструменты. Мгновенный доступ.",
    hero_kicker: "NeuroX · digital orbit",
    hero_title: "AI-инструменты",
    hero_title_2: "из чёрного космоса",
    hero_text: "Премиальный маркетплейс цифровых подписок. Выбираете продукт, оплачиваете, получаете ключ заказа — товар выдаётся после подтверждения платежа.",
    open_catalog: "Открыть каталог",
    step_pay: "Оплата",
    step_key: "Ключ заказа",
    step_delivery: "Выдача",
    feature_fast: "Мгновенная выдача",
    feature_fast_d: "После подтверждения оплаты",
    feature_secure: "Защищённая оплата",
    feature_secure_d: "Цена считается на сервере",
    feature_cabinet: "Личный кабинет",
    feature_cabinet_d: "Заказы и ключи в одном месте",
    feature_support: "Поддержка",
    feature_support_d: "Telegram без очередей",
    in_orbit: "Сейчас в орбите",
    categories: "Категории",
    why: "Почему NeuroX",
    why_fast: "Быстрая выдача",
    why_fast_d: "Цифровой товар после подтверждения оплаты.",
    why_pay: "Безопасная оплата",
    why_pay_d: "Платёж через защищённую систему.",
    why_support: "Поддержка",
    why_support_d: "Всегда на связи в Telegram.",
    why_reviews: "Отзывы",
    why_reviews_d: "Реальные отзывы после покупок и на площадках.",
    how: "Как это работает",
    how_1: "01 · Выбор",
    how_1_d: "Выберите цифровой продукт и срок.",
    how_2: "02 · Оплата",
    how_2_d: "Оплатите заказ. Итог фиксируется на сервере.",
    how_3: "03 · Ключ",
    how_3_d: "Получите ключ заказа и напишите в поддержку для выдачи.",
    reviews: "Отзывы",
    reviews_title: "Что говорят о NeuroX",
    reviews_text: "Внутренние отзывы появляются после покупки. Также можно открыть внешние площадки.",
    faq: "Частые вопросы",
    cta_title: "Выйти на орбиту",
    cta_text: "Каталог AI-инструментов. Выберите тему и язык под себя.",
    checkout: "Оформление заказа",
    email: "Email",
    name: "Имя",
    country: "Страна",
    coupon: "Промокод",
    continue_pay: "Продолжить к оплате",
    creating_order: "Создаём заказ…",
    pay: "Оплатить",
    all: "Все"
};
const en = {
    nav_catalog: "Catalog",
    nav_popular: "Popular",
    nav_how: "How it works",
    nav_faq: "FAQ",
    nav_support: "Support",
    account: "Account",
    menu: "Menu",
    cart: "Cart",
    search_placeholder: "Search…",
    theme: "Theme",
    theme_light: "Light",
    theme_medium: "Medium",
    theme_dark: "Dark",
    theme_black: "Black",
    lang: "Language",
    add_to_cart: "Add to cart",
    buy_now: "Buy now",
    catalog: "Catalog",
    popular: "Popular",
    support: "Support",
    shop: "Shop",
    legal: "Legal",
    social: "Social",
    terms: "Terms",
    privacy: "Privacy",
    refund: "Refund",
    reviews_playerok: "Playerok reviews",
    footer_tagline: "Digital products. AI tools. Instant access.",
    hero_kicker: "NeuroX · digital orbit",
    hero_title: "AI tools",
    hero_title_2: "from deep space",
    hero_text: "Premium marketplace for digital subscriptions. Choose a product, pay, get an order key — delivery after payment confirmation.",
    open_catalog: "Open catalog",
    step_pay: "Payment",
    step_key: "Order key",
    step_delivery: "Delivery",
    feature_fast: "Instant delivery",
    feature_fast_d: "After payment is confirmed",
    feature_secure: "Secure checkout",
    feature_secure_d: "Price is calculated on the server",
    feature_cabinet: "Account",
    feature_cabinet_d: "Orders and keys in one place",
    feature_support: "Support",
    feature_support_d: "Telegram, no ticket queues",
    in_orbit: "In orbit now",
    categories: "Categories",
    why: "Why NeuroX",
    why_fast: "Fast delivery",
    why_fast_d: "Digital goods after payment confirmation.",
    why_pay: "Secure payment",
    why_pay_d: "Processed by a protected payment system.",
    why_support: "Support",
    why_support_d: "Always available on Telegram.",
    why_reviews: "Reviews",
    why_reviews_d: "Real reviews after purchases and on external platforms.",
    how: "How it works",
    how_1: "01 · Choose",
    how_1_d: "Pick a digital product and period.",
    how_2: "02 · Pay",
    how_2_d: "Pay securely. Totals are fixed on the server.",
    how_3: "03 · Key",
    how_3_d: "Get your order key and message support for delivery.",
    reviews: "Reviews",
    reviews_title: "What people say about NeuroX",
    reviews_text: "Internal reviews appear after purchase. You can also open external platforms.",
    faq: "FAQ",
    cta_title: "Enter orbit",
    cta_text: "AI tools catalog. Pick a theme and language that fit you.",
    checkout: "Checkout",
    email: "Email",
    name: "Name",
    country: "Country",
    coupon: "Coupon",
    continue_pay: "Continue to payment",
    creating_order: "Creating order…",
    pay: "Pay",
    all: "All"
};
const zh = {
    nav_catalog: "目录",
    nav_popular: "热门",
    nav_how: "如何使用",
    nav_faq: "常见问题",
    nav_support: "支持",
    account: "账户",
    menu: "菜单",
    cart: "购物车",
    search_placeholder: "搜索…",
    theme: "主题",
    theme_light: "浅色",
    theme_medium: "中等",
    theme_dark: "深色",
    theme_black: "纯黑",
    lang: "语言",
    add_to_cart: "加入购物车",
    buy_now: "立即购买",
    catalog: "目录",
    popular: "热门",
    support: "支持",
    shop: "商店",
    legal: "条款",
    social: "社交",
    terms: "服务条款",
    privacy: "隐私",
    refund: "退款",
    reviews_playerok: "Playerok 评价",
    footer_tagline: "数字产品。AI 工具。即时访问。",
    hero_kicker: "NeuroX · digital orbit",
    hero_title: "AI 工具",
    hero_title_2: "来自深空",
    hero_text: "高端数字订阅商城。选择产品、付款、获取订单密钥——付款确认后发货。",
    open_catalog: "打开目录",
    step_pay: "付款",
    step_key: "订单密钥",
    step_delivery: "交付",
    feature_fast: "即时交付",
    feature_fast_d: "付款确认后",
    feature_secure: "安全结账",
    feature_secure_d: "价格由服务器计算",
    feature_cabinet: "账户",
    feature_cabinet_d: "订单与密钥集中管理",
    feature_support: "支持",
    feature_support_d: "Telegram 即时支持",
    in_orbit: "当前热门",
    categories: "分类",
    why: "为什么选择 NeuroX",
    why_fast: "快速交付",
    why_fast_d: "付款确认后交付数字商品。",
    why_pay: "安全支付",
    why_pay_d: "通过受保护的支付系统处理。",
    why_support: "支持",
    why_support_d: "随时通过 Telegram 联系。",
    why_reviews: "评价",
    why_reviews_d: "购买后真实评价及外部平台反馈。",
    how: "使用流程",
    how_1: "01 · 选择",
    how_1_d: "选择数字产品和时长。",
    how_2: "02 · 付款",
    how_2_d: "安全付款。总额由服务器确认。",
    how_3: "03 · 密钥",
    how_3_d: "获取订单密钥并联系支持交付。",
    reviews: "评价",
    reviews_title: "用户怎么说 NeuroX",
    reviews_text: "内部评价在购买后出现，也可查看外部平台。",
    faq: "常见问题",
    cta_title: "进入轨道",
    cta_text: "AI 工具目录。选择适合你的主题和语言。",
    checkout: "结账",
    email: "邮箱",
    name: "姓名",
    country: "国家",
    coupon: "优惠码",
    continue_pay: "继续付款",
    creating_order: "正在创建订单…",
    pay: "支付",
    all: "全部"
};
const dictionaries = {
    ru,
    en,
    zh
};
function getDict(locale) {
    return dictionaries[locale] || dictionaries.ru;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1w2c6r2._.js.map