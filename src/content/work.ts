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
      en: "Comprehensive point-of-sale and inventory system designed specifically for pharmacies to manage stock and billing efficiently.",
      ar: "نظام شامل لنقاط البيع والمخزون مصمم خصيصًا للصيدليات لإدارة المخزون والفوترة بكفاءة.",
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
      en: "Modernized digital storefront with blazing fast performance and seamless end-to-end management for products and ad creatives.",
      ar: "واجهة متجر رقمية حديثة بأداء فائق السرعة وإدارة سلسة وشاملة للمنتجات والإبداعات الإعلانية.",
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
      en: "Mission-critical, compliant e-invoicing engine that automates cryptographic stamping and real-time clearance for B2B transactions.",
      ar: "محرك فواتير إلكترونية مصمم لمسارات الختم التشفيري والتخليص لمعاملات الشركات B2B.",
    },
    status: "in-pilot",
    stack: ["Next.js", "Node", "XML/Crypto"],
    order: 1,
    repo: "fatooralite",
    docs: "/support/docs/fatoora-lite",
    image: "/projects/fatoora-lite.jpg",
    body: {
      en: "Real-time e-invoice clearance for Saudi Arabia — CCSID onboarding, cryptographic stamping, live clearance.",
      ar: "مسار تخليص فواتير إلكترونية للسعودية — تسجيل CCSID، وختم تشفيري، وتكامل تخليص قيد التجربة.",
    },
    article: {
      en: [
        "### Introduction",
        "FATOORA Lite is a mission-critical e-invoicing and real-time clearance engine designed around Saudi Arabia's ZATCA Phase 2 workflows. It is intended to reduce the operational complexity of invoice reporting while the pilot continues to validate the integration and deployment model.",
        "### The Problem",
        "Saudi Arabia's ZATCA Phase 2 e-invoicing mandate requires businesses to digitally sign, cryptographically stamp, and clear B2B invoices in real time via the ZATCA API. Traditional ERPs and accounting software often lack the native cryptographic capabilities needed, leading to compliance failures, heavy manual workloads, and potential fines.",
        "### The Technology",
        "Built on a high-performance stack using **Next.js**, **Node.js**, and custom **XML/Crypto** modules, FATOORA Lite is designed for speed and reliability. The system features a modern, dark-mode SaaS dashboard with an isometric view of financial data, providing users with a comprehensive overview of their compliance status.",
        "### Background: What is ZATCA?",
        "The Zakat, Tax and Customs Authority (ZATCA) is the government body responsible for tax administration in Saudi Arabia. Its e-invoicing initiative requires technical integration, but a software system alone is not a substitute for a business's own regulatory review or professional tax advice.",
        "### Development Story",
        "The development of FATOORA Lite started as a response to the urgent need for a lightweight, developer-friendly clearance solution. The goal was to build a system that handles the heavy lifting of XML generation and cryptographic signing without forcing businesses into clunky, outdated software ecosystems.",
        "### Key Features",
        "* **Real-time Clearance Workflow:** Integration designed to support invoice clearance through the ZATCA API during the pilot.",
        "* **Cryptographic Stamping:** Automated generation of compliant XML with required cryptographic stamps.",
        "* **CCSID Onboarding:** Streamlined onboarding process for acquiring Cryptographic Stamp Identifiers.",
        "* **Modern Dashboard:** A sleek, premium dashboard for monitoring invoice status, errors, and analytics.",
        "### Target Use Cases",
        "* **SMEs:** Small and medium enterprises needing an affordable, compliant invoicing tool.",
        "* **Enterprise Integration:** Large businesses requiring a middleware solution to connect their existing ERPs to ZATCA.",
        "* **E-commerce:** Online platforms needing automated clearance for B2B transactions.",
        "### Key Benefits",
        "* **Compliance Workflow Support:** Provide a technical foundation for the client's ZATCA review and invoice clearance workflow.",
        "* **Automation:** Reduce manual data entry and associated errors.",
        "* **Peace of Mind:** Focus on business growth while the system handles the complexities of tax reporting."
      ].join("\n\n"),
      ar: "نظام لتخطيط مسار تخليص الفواتير الإلكترونية وفق متطلبات هيئة الزكاة والضريبة والجمارك (ZATCA). يتيح النظام تصور الربط المباشر والختم التشفيري وإجراءات CCSID ضمن نطاق التجربة.",
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
      {
        q: {
          en: "Is FATOORA Lite live in production?",
          ar: "هل يعمل FATOORA Lite في بيئة الإنتاج؟",
        },
        a: {
          en: "No. FATOORA Lite is in pilot. The page describes the intended workflow and technical direction, not a claim that the product is generally available or production-proven.",
          ar: "لا. FATOORA Lite قيد التجربة. تصف الصفحة مسار العمل المقصود والتوجه التقني، ولا تدعي أن المنتج متاح بشكل عام أو مثبت في بيئة الإنتاج.",
        },
      },
      {
        q: {
          en: "Does the system replace our ERP or accounting software?",
          ar: "هل يحل النظام محل برنامج ERP أو المحاسبة الحالي؟",
        },
        a: {
          en: "It is designed as a possible clearance and integration layer. Whether it replaces or connects to an existing system depends on the client's invoice flow, API access, and regulatory requirements.",
          ar: "صُمم ليكون طبقة محتملة للتخليص والتكامل. يعتمد استبداله للنظام الحالي أو ربطه به على مسار الفواتير وصلاحيات API والمتطلبات التنظيمية للعميل.",
        },
      },
      {
        q: {
          en: "What should a Saudi business confirm before using an e-invoicing integration?",
          ar: "ما الذي يجب على المنشأة السعودية تأكيده قبل استخدام تكامل الفوترة الإلكترونية؟",
        },
        a: {
          en: "The business should confirm its ZATCA phase, invoice types, certificate and credential process, ERP responsibilities, testing plan, and who owns ongoing regulatory maintenance. Those decisions belong in the implementation scope.",
          ar: "يجب على المنشأة تأكيد مرحلتها لدى زاتكا وأنواع الفواتير وإجراءات الشهادات وبيانات الاعتماد ومسؤوليات ERP وخطة الاختبار وملكية الصيانة التنظيمية المستمرة. يجب إدراج هذه القرارات في نطاق التنفيذ.",
        },
      },
    ],
  },
  {
    slug: "sanad-os",
    title: "SanadOS",
    outcome: {
      en: "Unified platform for facility operators to track assets, manage work orders, and maintain comprehensive audit logs all in one place.",
      ar: "منصة موحدة لمشغلي المرافق لتتبع الأصول، وإدارة أوامر العمل، والاحتفاظ بسجلات تدقيق شاملة في مكان واحد.",
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
      {
        q: { en: "Who is SanadOS designed for?", ar: "لمن صُممت SanadOS؟" },
        a: {
          en: "It is designed for facility and operations teams that need one place for assets, work orders, maintenance history, assignments, and audit records. The exact workflows are shaped with the pilot operators.",
          ar: "صُممت لفرق تشغيل وإدارة المرافق التي تحتاج إلى مكان واحد للأصول وأوامر العمل وسجل الصيانة والإسناد وسجلات التدقيق. يتم تشكيل مسارات العمل الدقيقة مع المشغلين في التجربة.",
        },
      },
      {
        q: { en: "Can technicians use it from the field?", ar: "هل يمكن للفنيين استخدامها في الميدان؟" },
        a: {
          en: "The workflow can support mobile-friendly work orders, status updates, asset details, and maintenance notes. Device and offline requirements should be confirmed before finalizing the pilot scope.",
          ar: "يمكن لمسار العمل دعم أوامر عمل مناسبة للهاتف وتحديثات الحالة وتفاصيل الأصول وملاحظات الصيانة. يجب تأكيد متطلبات الأجهزة والعمل دون اتصال قبل اعتماد نطاق التجربة النهائي.",
        },
      },
      {
        q: { en: "What does the pilot validate?", ar: "ماذا تتحقق منه مرحلة التجربة؟" },
        a: {
          en: "The pilot validates whether the asset model, work-order flow, permissions, reporting, and day-to-day adoption fit the operator's real process. It is not presented as proof that every facility will need the same configuration.",
          ar: "تتحقق التجربة من ملاءمة نموذج الأصول ومسار أوامر العمل والصلاحيات والتقارير والاستخدام اليومي لعملية المشغل الحقيقية. ولا تقدم دليلاً على أن كل مرفق سيحتاج إلى الإعداد نفسه.",
        },
      },
    ],
  },
];

export const caseStudies: CaseStudy[] = caseStudiesSchema.parse(content);

export const bySlug = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);

export const sorted = [...caseStudies].sort((a, b) => a.order - b.order);
