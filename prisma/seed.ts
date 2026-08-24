import { PrismaClient, DeliveryType, ProductStatus, ProductType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function keys(prefix: string, n: number) {
  return Array.from({ length: n }, (_, i) => {
    const a = Math.random().toString(36).slice(2, 6).toUpperCase();
    const b = Math.random().toString(36).slice(2, 6).toUpperCase();
    const c = String(i + 1).padStart(4, "0");
    return `${prefix}-${a}-${b}-${c}`;
  });
}

async function main() {
  await prisma.analyticsEvent.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.couponUsage.deleteMany();
  await prisma.delivery.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.digitalItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.review.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.productFaq.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.category.deleteMany();
  await prisma.faq.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.cmsSetting.deleteMany();
  await prisma.session.deleteMany();
  await prisma.passwordReset.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  const customerRole = await prisma.role.create({ data: { name: "CUSTOMER" } });
  const adminRole = await prisma.role.create({ data: { name: "ADMIN" } });
  await prisma.role.create({ data: { name: "SUPERADMIN" } });

  const adminEmail = process.env.ADMIN_EMAIL || "admin@neurox.dev";
  const adminPassword = process.env.ADMIN_PASSWORD || "NeuroX-Admin-2026!";

  await prisma.user.create({
    data: {
      email: adminEmail,
      name: "NeuroX Admin",
      passwordHash: await bcrypt.hash(adminPassword, 12),
      roleId: adminRole.id,
      emailVerifiedAt: new Date(),
    },
  });

  await prisma.user.create({
    data: {
      email: "demo@neurox.dev",
      name: "Demo Customer",
      passwordHash: await bcrypt.hash("Demo-Customer-2026!", 12),
      roleId: customerRole.id,
      emailVerifiedAt: new Date(),
    },
  });

  const cats = await Promise.all(
    [
      ["ИИ", "ai", "Модели и ассистенты"],
      ["Продуктивность", "productivity", "Рабочие пространства"],
      ["Дизайн", "design", "Инструменты для визуала"],
      ["Разработка", "development", "Среды и IDE"],
      ["Софт", "software", "Приложения и лицензии"],
      ["Подписки", "subscriptions", "Подписки"],
      ["Избранное", "featured", "Отбор редакции"],
    ].map(([name, slug, description], i) =>
      prisma.category.create({ data: { name, slug, description, sortOrder: i } }),
    ),
  );
  const bySlug = Object.fromEntries(cats.map((c) => [c.slug, c]));

  type P = {
    name: string;
    slug: string;
    short: string;
    description: string;
    category: string;
    type: ProductType;
    delivery: DeliveryType;
    badge?: string;
    featured?: boolean;
    image: string;
    features: string[];
    includes: string[];
    variants: { name: string; slug: string; days: number; label: string; price: number; compare: number; sku: string; prefix: string }[];
    tags: string;
  };

  const products: P[] = [
    {
      name: "Grok Heavy",
      slug: "grok-heavy",
      short: "Флагманский доступ к тяжёлой AI-модели для сложных задач.",
      description:
        "Grok Heavy — премиальный вариант доступа к высокопроизводительной языковой модели. Подходит для аналитики, длинного контекста, исследования и повседневной работы, когда нужна скорость мышления, а не шаблонный ответ. NeuroX выдаёт цифровой доступ автоматически после подтверждения оплаты.",
      category: "ai",
      type: "SUBSCRIPTION",
      delivery: "LICENSE_KEY",
      badge: "Хит",
      featured: true,
      image: "/products/grok-heavy-1m.jpg",
      features: ["Приоритетный доступ", "Расширенный контекст", "Мгновенная выдача ключа", "Инструкции по активации"],
      includes: ["Лицензионный ключ", "Гайд по активации", "Поддержка NeuroX в Telegram"],
      tags: "ai,llm,grok,chat",
      variants: [
        { name: "1 месяц", slug: "1-month", days: 30, label: "1 месяц", price: 349000, compare: 490000, sku: "NX-GROK-1M", prefix: "NXGH1" },
        { name: "12 месяцев", slug: "12-months", days: 365, label: "12 месяцев", price: 2490000, compare: 3990000, sku: "NX-GROK-12M", prefix: "NXGH12" },
      ],
    },
    {
      name: "Cursor Ultra",
      slug: "cursor-ultra",
      short: "Расширенный доступ к AI-среде разработки для ежедневного кодинга.",
      description:
        "Cursor Ultra предназначен для разработчиков, которым нужен стабильный AI-ассистент внутри редактора. Композиция NeuroX не копирует официальные материалы бренда: это цифровой доступ с собственной выдачей ключа, сроком действия и инструкциями.",
      category: "development",
      type: "SUBSCRIPTION",
      delivery: "LICENSE_KEY",
      badge: "Популярное",
      featured: true,
      image: "/products/cursor-ultra-1m.jpg",
      features: ["Редакторный AI-поток", "Работа с репозиторием", "Приоритетная очередь", "Ключ сразу после оплаты"],
      includes: ["Ключ доступа", "Срок подписки", "Памятка по активации"],
      tags: "dev,ide,cursor,coding",
      variants: [
        { name: "1 месяц", slug: "1-month", days: 30, label: "1 месяц", price: 299000, compare: 399000, sku: "NX-CUR-1M", prefix: "NXCU1" },
        { name: "12 месяцев", slug: "12-months", days: 365, label: "12 месяцев", price: 2190000, compare: 3590000, sku: "NX-CUR-12M", prefix: "NXCU12" },
      ],
    },
    {
      name: "Atlas Chat Pro",
      slug: "atlas-chat-pro",
      short: "Универсальный AI-чат для исследований, письма и анализа.",
      description:
        "Atlas Chat Pro — аккуратный премиум-доступ к современному чат-ассистенту. Используйте для мозговых штурмов, сверки фактов и длинных черновиков. Выдача мгновенная, без ожидания менеджера.",
      category: "ai",
      type: "SUBSCRIPTION",
      delivery: "LICENSE_KEY",
      badge: "Новинка",
      featured: true,
      image: "/products/atlas-chat.jpg",
      features: ["Быстрые ответы", "Работа с документами", "Экспорт диалогов"],
      includes: ["Ключ", "Инструкция"],
      tags: "ai,chat,assistant",
      variants: [{ name: "1 месяц", slug: "1-month", days: 30, label: "1 месяц", price: 199000, compare: 299000, sku: "NX-ATL-1M", prefix: "NXAT1" }],
    },
    {
      name: "Lumen Studio",
      slug: "lumen-studio",
      short: "Студия генерации изображений для кампаний и концептов.",
      description:
        "Lumen Studio даёт доступ к генерации визуалов в премиальном качестве. Подходит дизайнерам, маркетологам и продакт-командам, которым нужны референсы и кампанийные кадры без долгого продакшена.",
      category: "design",
      type: "SUBSCRIPTION",
      delivery: "LICENSE_KEY",
      featured: true,
      image: "/products/lumen-studio.jpg",
      features: ["Высокое разрешение", "Стилистические пресеты", "Коммерческое использование в рамках правил сервиса"],
      includes: ["Ключ студии", "Гайд"],
      tags: "design,image,gen",
      variants: [{ name: "1 месяц", slug: "1-month", days: 30, label: "1 месяц", price: 249000, compare: 349000, sku: "NX-LUM-1M", prefix: "NXLU1" }],
    },
    {
      name: "Pulse Writer",
      slug: "pulse-writer",
      short: "AI-редактор длинных текстов с спокойным, точным тоном.",
      description:
        "Pulse Writer помогает собирать статьи, письма и продуктовые тексты. Модель настроена на ясность, а не на воду. Доступ выдаётся как лицензионный ключ.",
      category: "productivity",
      type: "SUBSCRIPTION",
      delivery: "LICENSE_KEY",
      image: "/products/pulse-writer.jpg",
      features: ["Длинный контекст", "Редактура", "Шаблоны структуры"],
      includes: ["Ключ", "Инструкция"],
      tags: "writing,docs,ai",
      variants: [{ name: "1 месяц", slug: "1-month", days: 30, label: "1 месяц", price: 159000, compare: 229000, sku: "NX-PUL-1M", prefix: "NXPU1" }],
    },
    {
      name: "Orbit Workspace",
      slug: "orbit-workspace",
      short: "Рабочее пространство с AI-слоем для команд и соло.",
      description:
        "Orbit Workspace объединяет заметки, задачи и лёгкий AI-поиск. Цифровой доступ активируется ключом и живёт в вашем кабинете NeuroX.",
      category: "productivity",
      type: "SUBSCRIPTION",
      delivery: "LICENSE_KEY",
      image: "/products/orbit-workspace.jpg",
      features: ["Базы знаний", "AI-поиск", "Шаблоны"],
      includes: ["Ключ", "Онбординг"],
      tags: "notes,workspace,ai",
      variants: [{ name: "12 месяцев", slug: "12-months", days: 365, label: "12 месяцев", price: 1290000, compare: 1890000, sku: "NX-ORB-12M", prefix: "NXOR12" }],
    },
    {
      name: "Vector Lab",
      slug: "vector-lab",
      short: "Профессиональный доступ к дизайн-холсту и командным библиотекам.",
      description:
        "Vector Lab — digital access к современной среде интерфейс-дизайна. Подходит тем, кто собирает UI-системы и хочет быстрый старт без ожидания инвайта.",
      category: "design",
      type: "SUBSCRIPTION",
      delivery: "LICENSE_KEY",
      image: "/products/vector-lab.jpg",
      features: ["Компоненты", "Командный холст", "Экспорт"],
      includes: ["Ключ", "Инструкция"],
      tags: "figma,design,ui",
      variants: [{ name: "1 месяц", slug: "1-month", days: 30, label: "1 месяц", price: 189000, compare: 259000, sku: "NX-VEC-1M", prefix: "NXVE1" }],
    },
  ];

  for (const p of products) {
    const created = await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        shortDescription: p.short,
        description: p.description,
        categoryId: bySlug[p.category].id,
        productType: p.type,
        deliveryType: p.delivery,
        status: ProductStatus.PUBLISHED,
        featured: Boolean(p.featured),
        badge: p.badge,
        tags: p.tags,
        features: JSON.stringify(p.features),
        includes: JSON.stringify(p.includes),
        previewImage: p.image,
        seoTitle: `${p.name} — NeuroX`,
        seoDescription: p.short,
        images: {
          create: [
            { url: p.image, alt: `${p.name} preview`, sortOrder: 0 },
            ...(p.slug === "grok-heavy"
              ? [{ url: "/products/grok-heavy-12m.jpg", alt: "Grok Heavy annual", sortOrder: 1 }]
              : p.slug === "cursor-ultra"
                ? [{ url: "/products/cursor-ultra-12m.jpg", alt: "Cursor Ultra annual", sortOrder: 1 }]
                : []),
          ],
        },
        faqs: {
          create: [
            { question: "Когда я получу доступ?", answer: "Сразу после подтверждения оплаты сервером NeuroX — не по клику «успешно» в браузере.", sortOrder: 0 },
            { question: "Как активировать?", answer: "Откройте кабинет → Лицензии, скопируйте ключ и следуйте инструкции к варианту.", sortOrder: 1 },
          ],
        },
        variants: {
          create: p.variants.map((v, i) => ({
            name: v.name,
            slug: v.slug,
            durationDays: v.days,
            durationLabel: v.label,
            priceCents: v.price,
            compareCents: v.compare,
            currency: "RUB",
            sku: v.sku,
            stock: 40,
            isDefault: i === 0,
            activationNotes: "Активируйте ключ в личном кабинете сервиса. Не публикуйте ключ и не передавайте третьим лицам.",
          })),
        },
      },
      include: { variants: true },
    });

    for (const v of created.variants) {
      const src = products.find((x) => x.slug === p.slug)!.variants.find((x) => x.slug === v.slug)!;
      await prisma.digitalItem.createMany({
        data: keys(src.prefix, 24).map((payload) => ({
          variantId: v.id,
          type: DeliveryType.LICENSE_KEY,
          payload,
          instructions: v.activationNotes || "Сохраните ключ. Срок действия совпадает с выбранным вариантом.",
          status: "AVAILABLE",
        })),
      });
    }
  }

  await prisma.faq.createMany({
    data: [
      { question: "Как происходит доставка?", answer: "После подтверждённого платежа система резервирует свободный цифровой item и назначает его заказу. Ключ появляется в кабинете и уходит на email.", sortOrder: 0 },
      { question: "Когда я получу товар?", answer: "Обычно сразу после серверного подтверждения оплаты. Мы не выдаём товар по сигналу с фронтенда.", sortOrder: 1 },
      { question: "Как активировать продукт?", answer: "В разделе Licenses скопируйте ключ и следуйте инструкции варианта. Если сервис просит дополнительные данные — напишите в поддержку.", sortOrder: 2 },
      { question: "Можно ли вернуть товар?", answer: "Цифровые товары после выдачи ключа возвращаются ограниченно. Подробности — в Refund Policy. Если ключ не работает, сначала напишите в поддержку.", sortOrder: 3 },
      { question: "Что делать, если код не работает?", answer: "Проверьте срок и инструкцию. Затем откройте /support и напишите в Telegram — приложите номер заказа, не публикуйте ключ в открытый чат без нужды.", sortOrder: 4 },
      { question: "Как связаться с поддержкой?", answer: "Основной канал: https://t.me/tgn3t. Дополнительный: https://t.me/chexeso.", sortOrder: 5 },
    ],
  });

  await prisma.coupon.create({
    data: { code: "NEURO10", type: "PERCENTAGE", value: 10, usageLimit: 200, isActive: true },
  });

  await prisma.cmsSetting.createMany({
    data: [
      { key: "hero.title", value: "AI-инструменты без ожидания." },
      { key: "hero.subtitle", value: "Премиальный доступ к цифровым продуктам. Оплата защищена. Выдача — после подтверждения платежа." },
      { key: "announcement", value: "Мгновенная выдача ключей после подтверждённой оплаты." },
    ],
  });

  await prisma.banner.create({
    data: {
      title: "Grok Heavy и Cursor Ultra",
      subtitle: "Готовые варианты на 1 и 12 месяцев",
      href: "/products?featured=1",
      status: "ACTIVE",
    },
  });

  console.log("Seed complete");
  console.log("Admin:", adminEmail);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
