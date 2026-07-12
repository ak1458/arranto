export type Locale = "en" | "ar";
export type Status = "proven" | "in-pilot";

type Localized = Record<Locale, string>;

export type CaseStudy = {
  slug: string;
  title: string;
  outcome: Localized;
  status: Status;
  stack: string[];
  order: number;
  body: Localized;
  faq: { q: Localized; a: Localized }[];
};

// Content contract mirrors docs/arranto-schema.md. Held products (TehsilOS)
// must not be added here until scope is confirmed — hard gate, see Rule 017.
export const caseStudies: CaseStudy[] = [
  {
    slug: "pulsekart",
    title: "PulseKart",
    outcome: {
      en: "Pharmacy, without the paperwork.",
      ar: "صيدلية، بلا أوراق.",
    },
    status: "proven",
    stack: ["Next.js", "Node", "Postgres"],
    order: 1,
    body: {
      en: "A point-of-sale system for pharmacies and retailers — inventory, billing, and prescription tracking in one place, replacing a fully manual process end to end.",
      ar: "نظام نقاط بيع للصيدليات وتجار التجزئة — المخزون والفوترة وتتبع الوصفات في مكان واحد، بديلًا كاملًا عن عملية يدوية بالكامل.",
    },
    faq: [
      {
        q: { en: "What does it cover day to day?", ar: "ماذا يغطي في العمل اليومي؟" },
        a: {
          en: "Stock levels, expiry tracking, billing at the counter, and prescription records — the four things a pharmacy touches every hour.",
          ar: "مستويات المخزون، وتتبع الصلاحية، والفوترة عند المحاسبة، وسجلات الوصفات — الأمور الأربعة التي تلمسها الصيدلية كل ساعة.",
        },
      },
      {
        q: { en: "What is it built on?", ar: "على ماذا بُني؟" },
        a: {
          en: "Next.js and Node over Postgres — boring, reliable infrastructure chosen for uptime, not novelty.",
          ar: "Next.js وNode فوق Postgres — بنية موثوقة ومجرّبة اختيرت من أجل الاستقرار لا الحداثة.",
        },
      },
    ],
  },
  {
    slug: "orderflow",
    title: "OrderFlow",
    outcome: {
      en: "Logistics, tracked in real time.",
      ar: "لوجستيات، تُتتبع لحظيًا.",
    },
    status: "proven",
    stack: ["Next.js", "Node", "WebSockets"],
    order: 2,
    body: {
      en: "An end-to-end logistics platform — orders, delivery hubs, and driver progress on one live dashboard, so dispatch decisions happen on data instead of phone calls.",
      ar: "منصة لوجستية متكاملة — الطلبات ومراكز التوزيع وتقدّم السائقين في لوحة حية واحدة، لتُتخذ قرارات الإرسال بالبيانات لا بالمكالمات.",
    },
    faq: [
      {
        q: { en: "What does “real time” mean here?", ar: "ماذا يعني «لحظيًا» هنا؟" },
        a: {
          en: "Delivery status updates stream to the dashboard as they happen — no refresh, no batch delay.",
          ar: "تحديثات حالة التوصيل تصل إلى اللوحة فور حدوثها — بلا تحديث يدوي ولا تأخير.",
        },
      },
      {
        q: { en: "Who uses it?", ar: "من يستخدمه؟" },
        a: {
          en: "Dispatch teams and hub managers — the people who need to know where every order is right now.",
          ar: "فرق الإرسال ومديرو المراكز — من يحتاجون معرفة مكان كل طلب في هذه اللحظة.",
        },
      },
    ],
  },
  {
    slug: "veloria-vault",
    title: "Veloria Vault",
    outcome: {
      en: "Commerce, rebuilt.",
      ar: "تجارة، أُعيد بناؤها.",
    },
    status: "proven",
    stack: ["Next.js", "Commerce", "SEO"],
    order: 3,
    body: {
      en: "A leather-goods e-commerce build — catalogue, checkout, and search foundations rebuilt for speed, turning a slow storefront into one that sells.",
      ar: "بناء متجر إلكتروني للمنتجات الجلدية — الكتالوج والدفع وأساسات البحث أُعيد بناؤها للسرعة، ليتحول متجر بطيء إلى متجر يبيع.",
    },
    faq: [
      {
        q: { en: "What changed for the business?", ar: "ما الذي تغيّر للنشاط التجاري؟" },
        a: {
          en: "Faster pages, cleaner product structure, and a checkout that works the first time — the fundamentals that decide whether a store converts.",
          ar: "صفحات أسرع، وهيكلة أنظف للمنتجات، ودفع يعمل من المرة الأولى — الأساسيات التي تقرر إن كان المتجر يبيع.",
        },
      },
      {
        q: { en: "Was this a redesign or a rebuild?", ar: "هل كان إعادة تصميم أم إعادة بناء؟" },
        a: {
          en: "A rebuild — the storefront was replaced, not repainted.",
          ar: "إعادة بناء — استُبدل المتجر، ولم يُعَد طلاؤه.",
        },
      },
    ],
  },
  {
    slug: "zatca-compliance-engine",
    title: "ZATCA Compliance Engine",
    outcome: {
      en: "Real-time e-invoice clearance.",
      ar: "تخليص فواتير إلكترونية لحظي.",
    },
    status: "in-pilot",
    stack: ["Next.js", "Node", "XML/Crypto"],
    order: 4,
    body: {
      en: "Built to the ZATCA Phase 2 specification — CCSID onboarding, cryptographic stamping, real-time clearance. Currently in pilot.",
      ar: "مبني وفق مواصفات المرحلة الثانية من «زاتكا» — تسجيل CCSID، وختم تشفيري، وتخليص لحظي. حاليًا قيد التجربة.",
    },
    faq: [
      {
        q: {
          en: "Does this require ZATCA accreditation?",
          ar: "هل يتطلب هذا اعتمادًا من زاتكا؟",
        },
        a: {
          en: "No — ZATCA does not require accreditation to use a compliant solution. The choice is who builds and maintains it.",
          ar: "لا — زاتكا لا تشترط اعتمادًا لاستخدام حل متوافق. الخيار هو من يبنيه ويصونه.",
        },
      },
      {
        q: {
          en: "What does CCSID onboarding involve?",
          ar: "ماذا يتضمن تسجيل CCSID؟",
        },
        a: {
          en: "Cryptographic certificate onboarding that authenticates the business to ZATCA's clearance network before invoices can be stamped and cleared in real time.",
          ar: "تسجيل شهادات تشفيرية يوثّق المنشأة لدى شبكة التخليص التابعة لزاتكا قبل أن تُختم الفواتير وتُخلَّص لحظيًا.",
        },
      },
    ],
  },
  {
    slug: "sanad-os",
    title: "SanadOS",
    outcome: {
      en: "Facilities, in one system.",
      ar: "المرافق، في نظام واحد.",
    },
    status: "in-pilot",
    stack: ["Next.js", "Node", "Postgres"],
    order: 5,
    body: {
      en: "Work orders, assets, maintenance history — replacing spreadsheets for Gulf operators. In pilot.",
      ar: "أوامر العمل والأصول وسجل الصيانة — بديل عن جداول البيانات لمشغّلي المرافق في الخليج. قيد التجربة.",
    },
    faq: [
      {
        q: {
          en: "What replaces the spreadsheets, concretely?",
          ar: "ما الذي يحل محل جداول البيانات تحديدًا؟",
        },
        a: {
          en: "One system of record: every asset, every work order, and its full maintenance history — searchable, assignable, and auditable.",
          ar: "نظام سجل واحد: كل أصل، وكل أمر عمل، وسجل صيانته الكامل — قابل للبحث والإسناد والتدقيق.",
        },
      },
      {
        q: { en: "Is it in production?", ar: "هل هو في الإنتاج؟" },
        a: {
          en: "No — it is in pilot with real operators. Status here is stated exactly as it is.",
          ar: "لا — إنه قيد التجربة مع مشغّلين فعليين. الحالة هنا مذكورة كما هي تمامًا.",
        },
      },
    ],
  },
];

export const bySlug = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);

export const sorted = [...caseStudies].sort((a, b) => a.order - b.order);
