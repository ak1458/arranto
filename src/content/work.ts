import { caseStudiesSchema, type CaseStudy } from "./work.schema";

export type Locale = "en" | "ar";
export type Status = CaseStudy["status"];
export type { CaseStudy };

// Content follows arranto-website-content-v3.md. Held products (TehsilOS)
// must not be added here until scope is confirmed — hard gate.
const content: CaseStudy[] = [
  {
    slug: "pulsekart",
    title: "PulseKart",
    outcome: {
      en: "Point-of-sale software for pharmacies.",
      ar: "برمجيات نقاط البيع للصيدليات.",
    },
    status: "proven",
    stack: ["Next.js", "Node", "Postgres"],
    order: 3,
    repo: "pulsekart-web-nextjs",
    image: "/projects/pulsekart.jpg",
    body: {
      en: "Point-of-sale software for pharmacies — billing, inventory, and expiry tracking in one screen. Replaced manual billing registers and paper stock logs.",
      ar: "برمجيات نقاط البيع للصيدليات — الفوترة والمخزون وتتبع الصلاحية في شاشة واحدة. استبدلت سجلات الفوترة اليدوية ودفاتر المخزون الورقية.",
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
    slug: "veloria-vault",
    title: "Veloria Vault",
    outcome: {
      en: "Headless commerce, migrated to Next.js.",
      ar: "تجارة بلا واجهة، مهاجرة إلى Next.js.",
    },
    status: "proven",
    stack: ["Next.js", "Headless"],
    order: 4,
    image: "/projects/veloria-vault.jpg",
    body: {
      en: "Headless commerce, migrated to Next.js. Site, ads, and product creatives — managed end-to-end.",
      ar: "تجارة بلا واجهة، مهاجرة إلى Next.js. الموقع والإعلانات والإبداعات المنتجية — مُدارة بالكامل.",
    },
    faq: [
      {
        q: { en: "What did the migration involve?", ar: "ماذا تضمّنت عملية الترحيل؟" },
        a: {
          en: "The storefront was rebuilt headless on Next.js for speed, with site, ad creatives, and product content managed end-to-end — not just a repaint.",
          ar: "أُعيد بناء المتجر بلا واجهة على Next.js من أجل السرعة، مع إدارة الموقع والإبداعات الإعلانية والمحتوى المنتجي بالكامل — لا مجرد إعادة طلاء.",
        },
      },
      {
        q: { en: "Is it still running?", ar: "هل ما زال يعمل؟" },
        a: {
          en: "Yes — proven, live in production.",
          ar: "نعم — مُثبت، ويعمل فعليًا في الإنتاج.",
        },
      },
    ],
  },
  {
    slug: "fatoora-lite",
    title: "FATOORA Lite",
    // Region-free by contract (arranto-schema.md): `outcome` is the tile line and tiles
    // render on the home page, which is brand layer — no region names. The Saudi/ZATCA
    // detail lives in `body` and the FAQ, which render only on the /work proof pages.
    outcome: {
      en: "Real-time e-invoice clearance.",
      ar: "تخليص فواتير إلكترونية لحظي.",
    },
    status: "in-pilot",
    stack: ["Next.js", "Node", "XML/Crypto"],
    order: 1,
    repo: "fatooralite",
    docs: "/support/docs/fatoora-lite",
    image: "/projects/fatoora-lite.jpg",
    body: {
      en: "Real-time e-invoice clearance for Saudi Arabia — CCSID onboarding, cryptographic stamping, live clearance.",
      ar: "تخليص فواتير إلكترونية لحظي للسعودية — تسجيل CCSID، وختم تشفيري، وتخليص مباشر.",
    },
    article: {
      en: [
        "### Introduction",
        "FATOORA Lite is a mission-critical, ZATCA-compliant e-invoicing and real-time clearance engine designed for businesses operating in Saudi Arabia. It eliminates the complexity of adhering to stringent national tax regulations, enabling seamless and automated invoice reporting directly to the ZATCA portal.",
        "",
        "### The Problem",
        "Saudi Arabia's ZATCA Phase 2 e-invoicing mandate requires businesses to digitally sign, cryptographically stamp, and clear B2B invoices in real time via the ZATCA API. Traditional ERPs and accounting software often lack the native cryptographic capabilities needed, leading to compliance failures, heavy manual workloads, and potential fines.",
        "",
        "### The Technology",
        "Built on a high-performance stack using **Next.js**, **Node.js**, and custom **XML/Crypto** modules, FATOORA Lite is designed for speed and reliability. The system features a modern, dark-mode SaaS dashboard with an isometric view of financial data, providing users with a comprehensive overview of their compliance status.",
        "",
        "### Background: What is ZATCA?",
        "The Zakat, Tax and Customs Authority (ZATCA) is the government body responsible for tax administration in Saudi Arabia. Their e-invoicing initiative aims to digitize the economy, reduce tax evasion, and increase transparency. Compliance is mandatory and requires complex technical integration.",
        "",
        "### Development Story",
        "The development of FATOORA Lite started as a response to the urgent need for a lightweight, developer-friendly clearance solution. The goal was to build a system that handles the heavy lifting of XML generation and cryptographic signing without forcing businesses into clunky, outdated software ecosystems.",
        "",
        "### Features",
        "*   **Real-time Clearance:** Direct integration with the ZATCA API for instant invoice clearance.",
        "*   **Cryptographic Stamping:** Automated generation of compliant XML with required cryptographic stamps.",
        "*   **CCSID Onboarding:** Streamlined onboarding process for acquiring Cryptographic Stamp Identifiers.",
        "*   **Modern Dashboard:** A sleek, premium dashboard for monitoring invoice status, errors, and analytics.",
        "",
        "### Use Cases",
        "*   **SMEs:** Small and medium enterprises needing an affordable, compliant invoicing tool.",
        "*   **Enterprise Integration:** Large businesses requiring a middleware solution to connect their existing ERPs to ZATCA.",
        "*   **E-commerce:** Online platforms needing automated clearance for B2B transactions.",
        "",
        "### Benefits",
        "*   **Guaranteed Compliance:** Avoid penalties and ensure adherence to all ZATCA regulations.",
        "*   **Automation:** Reduce manual data entry and associated errors.",
        "*   **Peace of Mind:** Focus on business growth while the system handles the complexities of tax reporting."
      ].join("\\n"),
      ar: "نظام تخليص الفواتير الإلكترونية اللحظي المتوافق مع هيئة الزكاة والضريبة والجمارك (ZATCA)... (التفاصيل الكاملة متوفرة باللغة الإنجليزية)",
    },
    faq: [
      {
        q: {
          en: "Does this need ZATCA accreditation?",
          ar: "هل يتطلب هذا اعتمادًا من زاتكا؟",
        },
        a: {
          en: "No. ZATCA doesn't require it — the choice is who builds and maintains the system.",
          ar: "لا. زاتكا لا تشترط ذلك — الخيار هو من يبني النظام ويصونه.",
        },
      },
      {
        q: {
          en: "What does CCSID onboarding involve?",
          ar: "ماذا يتضمن تسجيل CCSID؟",
        },
        a: {
          en: "A cryptographic certificate that authenticates the business to ZATCA's network before invoices can be stamped and cleared in real time.",
          ar: "شهادة تشفيرية توثّق المنشأة لدى شبكة زاتكا قبل أن تُختم الفواتير وتُخلَّص لحظيًا.",
        },
      },
    ],
  },
  {
    slug: "sanad-os",
    title: "SanadOS",
    outcome: {
      en: "Facilities operations, in one system.",
      ar: "عمليات المرافق، في نظام واحد.",
    },
    status: "in-pilot",
    stack: ["React", "Supabase", "AI"],
    order: 2,
    docs: "/support/docs/sanad-os",
    image: "/projects/sanados.jpg",
    body: {
      en: "Facilities operations — work orders, assets, maintenance history — in one system.",
      ar: "عمليات المرافق — أوامر العمل والأصول وسجل الصيانة — في نظام واحد.",
    },
    faq: [
      {
        q: { en: "What replaces the spreadsheets, concretely?", ar: "ما الذي يحل محل جداول البيانات تحديدًا؟" },
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
  {
    slug: "orderflow",
    title: "OrderFlow",
    outcome: {
      en: "Logistics, tracked in real time.",
      ar: "الخدمات اللوجستية، متتبَّعة في الوقت الحقيقي.",
    },
    status: "proven",
    stack: ["Next.js", "Node", "Postgres"],
    order: 5,
    image: "/projects/orderflow.jpg",
    body: {
      en: "Logistics, tracked in real time — orders, dispatch, and delivery state on one live board instead of phone calls and spreadsheets.",
      ar: "الخدمات اللوجستية، متتبَّعة في الوقت الحقيقي — الطلبات والإرسال وحالة التسليم على لوحة واحدة مباشرة بدلًا من المكالمات وجداول البيانات.",
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
];

export const caseStudies: CaseStudy[] = caseStudiesSchema.parse(content);

export const bySlug = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);

export const sorted = [...caseStudies].sort((a, b) => a.order - b.order);
