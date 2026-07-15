export type Locale = "en" | "ar";

type Localized = Record<Locale, string>;

export type Service = {
  slug: string;
  name: Localized;
  promise: Localized;
  includes: Localized[];
  from: string; // USD "from" price, display string
};

export const services: Service[] = [
  {
    slug: "premium-website-development",
    name: { en: "Website Development", ar: "تطوير المواقع" },
    promise: {
      en: "A marketing site that loads fast and converts.",
      ar: "موقع تسويقي سريع يحوّل الزوار إلى عملاء.",
    },
    includes: [
      { en: "English and Arabic, full RTL", ar: "بالإنجليزية والعربية، بدعم كامل للكتابة من اليمين" },
      { en: "Core Web Vitals in the green", ar: "مؤشرات الأداء الأساسية في النطاق الأخضر" },
      { en: "SEO and AEO built in from day one", ar: "تهيئة لمحركات البحث ومحركات الإجابة من اليوم الأول" },
      { en: "Analytics and handover documentation", ar: "تحليلات وتوثيق تسليم كامل" },
    ],
    from: "$6,500",
  },
  {
    slug: "custom-software-development",
    name: { en: "Custom Software", ar: "برمجيات مخصصة" },
    promise: {
      en: "Internal tools your team actually uses.",
      ar: "أدوات داخلية يستخدمها فريقك فعلًا.",
    },
    includes: [
      { en: "Dashboards and internal tools", ar: "لوحات تحكم وأدوات داخلية" },
      { en: "Integrations with the systems you already run", ar: "تكامل مع الأنظمة التي تعمل بها بالفعل" },
      { en: "Boring, reliable stacks — chosen for uptime", ar: "تقنيات مجرّبة وموثوقة — مختارة من أجل الاستقرار" },
      { en: "Handover documentation", ar: "توثيق تسليم كامل" },
    ],
    from: "$18,000",
  },
  {
    slug: "saas-development",
    name: { en: "SaaS Development", ar: "تطوير منتجات SaaS" },
    promise: {
      en: "From MVP to production SaaS.",
      ar: "من النموذج الأولي إلى منتج SaaS جاهز للإنتاج.",
    },
    includes: [
      { en: "Authentication and user management", ar: "المصادقة وإدارة المستخدمين" },
      { en: "Billing and subscriptions", ar: "الفوترة والاشتراكات" },
      { en: "Multi-tenancy from the first commit", ar: "تعدد المستأجرين من أول سطر برمجي" },
      { en: "Deployment, monitoring, and handover", ar: "النشر والمراقبة والتسليم" },
    ],
    from: "$30,000",
  },
  {
    slug: "ai-automation",
    name: { en: "AI Automation", ar: "الأتمتة بالذكاء الاصطناعي" },
    promise: {
      en: "AI agents that take repetitive work off your team.",
      ar: "وكلاء ذكاء اصطناعي يرفعون العمل المتكرر عن فريقك.",
    },
    includes: [
      { en: "Document processing pipelines", ar: "معالجة آلية للمستندات" },
      { en: "Lead intake and routing", ar: "استقبال العملاء المحتملين وتوجيههم" },
      { en: "Automated reporting", ar: "تقارير آلية" },
      { en: "Monitoring and monthly tuning", ar: "مراقبة وضبط شهري" },
    ],
    from: "$4,500 + $1,500/mo",
  },
  {
    slug: "ai-integrations",
    name: { en: "AI Integrations", ar: "تكاملات الذكاء الاصطناعي" },
    promise: {
      en: "LLM features inside the product you already have.",
      ar: "ميزات نماذج لغوية داخل منتجك الحالي.",
    },
    includes: [
      { en: "Chat and copilots", ar: "محادثة ومساعدون أذكياء" },
      { en: "Extraction and classification", ar: "استخلاص البيانات وتصنيفها" },
      { en: "Semantic search", ar: "بحث دلالي" },
      { en: "Evaluation before launch", ar: "تقييم قبل الإطلاق" },
    ],
    from: "$3,500",
  },
  {
    slug: "business-systems",
    name: { en: "Business Systems", ar: "أنظمة الأعمال" },
    promise: {
      en: "The systems a business runs on, in one place.",
      ar: "الأنظمة التي يقوم عليها العمل، في مكان واحد.",
    },
    includes: [
      { en: "Point of sale and inventory", ar: "نقاط البيع والمخزون" },
      { en: "Invoicing, including ZATCA Phase 2 e-invoicing", ar: "الفوترة، بما فيها الفوترة الإلكترونية وفق المرحلة الثانية من زاتكا" },
      { en: "Operations and back-office workflows", ar: "سير عمل التشغيل والمكتب الخلفي" },
      { en: "Training and handover", ar: "تدريب وتسليم" },
    ],
    from: "$12,000",
  },
  {
    slug: "product-engineering",
    name: { en: "Product Engineering", ar: "هندسة المنتجات" },
    promise: {
      en: "A founder-led engineering partner, month to month.",
      ar: "شريك هندسي يقوده المؤسس، شهرًا بشهر.",
    },
    includes: [
      { en: "Roadmap to shipped product", ar: "من خارطة الطريق إلى منتج مُسلَّم" },
      { en: "Direct line to the founder", ar: "تواصل مباشر مع المؤسس" },
      { en: "Weekly shipping cadence", ar: "إيقاع تسليم أسبوعي" },
      { en: "No handoffs, no account managers", ar: "بلا وسطاء وبلا مديري حسابات" },
    ],
    from: "$7,500/mo",
  },
];

/** Copy for the services page (bilingual, per content-module convention). */
export const servicesCopy = {
  metaTitle: { en: "Services — Arranto", ar: "الخدمات — أرانتو" },
  metaDescription: {
    en: "Websites, custom software, SaaS, AI automation, and business systems. Fixed starting prices. Founder-led delivery since 2017.",
    ar: "مواقع، وبرمجيات مخصصة، ومنتجات SaaS، وأتمتة بالذكاء الاصطناعي، وأنظمة أعمال. أسعار بداية ثابتة وتنفيذ يقوده المؤسس منذ 2017.",
  } as Localized,
  eyebrow: { en: "Services", ar: "الخدمات" } as Localized,
  heading: { en: "What we build.", ar: "ما الذي نبنيه." } as Localized,
  intro: {
    en: "Seven services, with starting prices. Every engagement begins with a scoping call.",
    ar: "سبع خدمات بأسعار بداية واضحة. كل تعاون يبدأ بمكالمة لتحديد النطاق.",
  } as Localized,
  fromLabel: { en: "from", ar: "يبدأ من" } as Localized,
  cta: { en: "Start a conversation", ar: "ابدأ الحوار" } as Localized,
};

/** Copy for the pricing page, which reuses the services above. */
export const pricingCopy = {
  metaTitle: { en: "Pricing — Arranto", ar: "الأسعار — أرانتو" },
  metaDescription: {
    en: "Starting prices for every Arranto service. Fixed-scope proposals, no hourly billing, 50% to start, handover documentation included.",
    ar: "أسعار البداية لكل خدمات أرانتو. عروض بنطاق ثابت، بلا فوترة بالساعة، 50% عند البدء، والتوثيق مشمول عند التسليم.",
  } as Localized,
  eyebrow: { en: "Pricing", ar: "الأسعار" } as Localized,
  heading: { en: "One price, stated up front.", ar: "سعر واحد، مُعلن منذ البداية." } as Localized,
  intro: {
    en: "Starting prices below. Final scope and price are fixed in a written proposal before work begins.",
    ar: "أسعار البداية أدناه. يُثبَّت النطاق والسعر النهائيان في عرض مكتوب قبل بدء العمل.",
  } as Localized,
  fromLabel: { en: "from", ar: "يبدأ من" } as Localized,
  howHeading: { en: "How engagements work", ar: "كيف تسير التعاقدات" } as Localized,
  how: [
    {
      en: "Every project starts with a scoping call with the founder. You receive a fixed-scope written proposal — the price does not drift.",
      ar: "كل مشروع يبدأ بمكالمة تحديد نطاق مع المؤسس. تتلقى بعدها عرضًا مكتوبًا بنطاق ثابت — والسعر لا يتغير.",
    },
    {
      en: "No hourly billing. You pay for an outcome, not for hours.",
      ar: "لا فوترة بالساعة. تدفع مقابل نتيجة، لا مقابل ساعات.",
    },
    {
      en: "50% to start. The rest is due on agreed milestones.",
      ar: "50% عند البدء، والباقي عند مراحل إنجاز متفق عليها.",
    },
    {
      en: "Every project ships with handover documentation. The system is yours.",
      ar: "كل مشروع يُسلَّم مع توثيق كامل. النظام ملكك.",
    },
  ] as Localized[],
  ctaHeading: {
    en: "The next step is a scoping call.",
    ar: "الخطوة التالية مكالمة لتحديد النطاق.",
  } as Localized,
  ctaBtn: { en: "Get a proposal", ar: "اطلب عرضًا" } as Localized,
};
