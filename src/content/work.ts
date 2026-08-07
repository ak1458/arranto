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
    article: {
      en: [
        "### Introduction",
        "PulseKart is a point-of-sale and inventory system built for pharmacies, combining billing, stock management, and expiry tracking into a single screen. It is live and in use, with the underlying codebase still under regular, ongoing development.",
        "### The Problem",
        "Many pharmacies run billing and stock control separately, often on paper — a manual sales register for each transaction and a handwritten log for stock on hand. Keeping the two in sync by hand makes it easy to lose track of what's actually in stock, and medication nearing its expiry date can go unnoticed until it's already unsellable. A single connected system for billing and inventory removes the need to reconcile two separate paper trails.",
        "### The Technology",
        "PulseKart is built on Next.js for the interface, a Node backend, and a Postgres database for storing stock, billing, and expiry records.",
        "### Key Features",
        "* **Point-of-Sale Billing:** Process pharmacy sales from a single screen.",
        "* **Inventory Management:** Track stock levels as items are sold and restocked.",
        "* **Expiry Tracking:** Keep expiry dates attached to stock records so aging inventory is visible in the same screen instead of buried in a separate paper log.",
        "### Development Approach",
        "The codebase is under active, ongoing development, with regular commits and open issues tracked and worked through as the system is used in real pharmacy settings — it wasn't shipped once and left alone.",
        "### Key Benefits",
        "* **Fewer Manual Records:** Replaces paper billing registers and stock logs with one digital system.",
        "* **Stock Visibility:** Keeps inventory and expiry data together instead of split across separate logs.",
        "* **Live Use:** Deployed and used by pharmacies for day-to-day billing and stock management, not a prototype sitting on a shelf.",
      ].join("\n\n"),
      ar: "بولسكارت هو نظام نقاط بيع وإدارة مخزون مصمم خصيصًا للصيدليات، يجمع الفوترة وتتبع المخزون وتواريخ الصلاحية في شاشة واحدة، ليحل محل سجلات الفوترة الورقية وسجلات المخزون اليدوية. تم بناؤه باستخدام Next.js وNode وPostgres، وهو حاليًا قيد الاستخدام الفعلي في الصيدليات، مع استمرار العمل على الكود وتحديثه بشكل منتظم استنادًا إلى الاستخدام اليومي الحقيقي.",
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
      {
        q: { en: "Is PulseKart actually deployed and being used, or is this still a prototype?", ar: "هل بولسكارت مُفعّل ومستخدم فعليًا، أم أنه لا يزال نموذجًا أوليًا؟" },
        a: {
          en: "It's live — pharmacies use it for day-to-day billing and inventory instead of paper registers and stock logs. The codebase is still updated on an ongoing basis as real use surfaces new needs.",
          ar: "النظام قيد الاستخدام الفعلي — تعتمد عليه صيدليات في الفوترة وإدارة المخزون اليومية بدلاً من السجلات الورقية. الكود البرمجي لا يزال يُحدَّث بشكل مستمر بناءً على الاستخدام الحقيقي.",
        },
      },
      {
        q: { en: "How does the expiry tracking actually work?", ar: "كيف يعمل تتبع تواريخ الصلاحية بالضبط؟" },
        a: {
          en: "Expiry dates are recorded alongside each stock item, so aging inventory shows up in the same screen as billing and stock levels rather than needing a separate paper log to check by hand.",
          ar: "تُسجَّل تواريخ الصلاحية مع كل عنصر في المخزون، بحيث تظهر المنتجات القريبة من انتهاء صلاحيتها في نفس شاشة الفوترة والمخزون، دون الحاجة لسجل ورقي منفصل يُراجَع يدويًا.",
        },
      },
      {
        q: { en: "What happens to our existing paper records if we switch to PulseKart?", ar: "ماذا يحدث لسجلاتنا الورقية الحالية عند الانتقال إلى بولسكارت؟" },
        a: {
          en: "PulseKart is built to take over what a manual billing register and paper stock log were doing — sales, stock counts, and expiry dates all live in the system instead. Migrating specific historical records would need to be scoped separately, since that depends on what you're bringing over.",
          ar: "صُمِّم بولسكارت ليحل محل ما كان يقوم به سجل الفوترة اليدوي وسجل المخزون الورقي — إذ تُسجَّل المبيعات وكميات المخزون وتواريخ الصلاحية جميعها داخل النظام. أما نقل سجلات تاريخية محددة فيحتاج إلى تحديد نطاقه بشكل منفصل، حسب طبيعة البيانات المطلوب ترحيلها.",
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
    article: {
      en: [
        "### Introduction",
        "Veloria Vault is a digital storefront running on a headless commerce architecture, with a Next.js front end. It is live in production today.",
        "### The Problem",
        "Monolithic, plugin-heavy WordPress commerce setups tend to couple content, catalog logic, and page rendering together. As a catalog and marketing workload grows, that coupling can slow down page delivery and make it harder to manage product listings and ad creatives from one place.",
        "### The Technology",
        "The storefront runs on a headless commerce architecture: the Next.js front end is decoupled from the commerce backend. The current build is the result of moving off a legacy WordPress setup, evidenced by the project's own history of separate builds as the architecture evolved.",
        "### Key Features",
        "* **Headless Architecture:** Front-end rendering (Next.js) is decoupled from commerce backend logic.",
        "* **Unified Content Management:** Products and ad creatives are managed end-to-end from a single system rather than separate tools.",
        "* **Migrated Foundation:** Rebuilt from a legacy WordPress storefront onto the current headless stack.",
        "### Development Approach",
        "The project moved through more than one build on its way from the original WordPress storefront to the current Next.js headless setup — a staged migration rather than a single rewrite.",
        "### Key Benefits",
        "* **Operational Simplicity:** Manage the storefront, ad creatives, and product catalog end-to-end without switching between disconnected systems.",
        "* **Modern Front End:** A Next.js-based front end, decoupled from the commerce backend, running in production.",
      ].join("\n\n"),
      ar: "فيلوريا فولت هو متجر رقمي يعمل ببنية تجارة إلكترونية منفصلة (Headless)، بواجهة أمامية مبنية على Next.js، ويعمل حاليًا في بيئة الإنتاج الفعلية. مرّ المشروع بعملية انتقال من إعداد قديم قائم على ووردبريس إلى هذه البنية الحالية، عبر أكثر من مرحلة تطوير، بهدف فصل واجهة العرض عن منطق التجارة الإلكترونية في الخلفية. يتيح هذا الفصل إدارة المنتجات والمواد الإعلانية من نظام واحد بدلًا من أدوات متفرقة، وهو ما يخدم العمليات اليومية للمتجر، دون الدخول في أرقام أو مقاييس أداء غير موثقة هنا.",
    },
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
      {
        q: { en: "Are the product catalog and ad creatives managed from the same system?", ar: "هل تتم إدارة كتالوج المنتجات والمواد الإعلانية من النظام نفسه؟" },
        a: {
          en: "Yes. Managing products and ad creatives end-to-end from one system is part of the current build, rather than switching between separate tools.",
          ar: "نعم. إدارة المنتجات والمواد الإعلانية من نظام واحد بشكل متكامل هي جزء من البنية الحالية، بدلًا من التنقل بين أدوات منفصلة.",
        },
      },
      {
        q: { en: "Was this a single rewrite, or did it happen in stages?", ar: "هل كان هذا إعادة بناء دفعة واحدة أم تم على مراحل؟" },
        a: {
          en: "It was a staged migration. The storefront moved from a legacy WordPress setup to the current headless Next.js build across more than one development iteration.",
          ar: "تم الأمر على مراحل. انتقل المتجر من إعداد قديم قائم على ووردبريس إلى بنية Next.js الحالية المنفصلة (Headless) عبر أكثر من مرحلة تطوير.",
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
        "### Challenges",
        "ZATCA Phase 2 clearance depends on a live, real-time connection to a government API, which means the integration has to account for network latency, timeouts, and upstream availability rather than assuming a constant connection. CCSID onboarding and cryptographic stamping add an operational layer that traditional invoicing flows don't have to account for. Different clients' ERP or accounting systems structure invoice data differently, so mapping those formats into ZATCA's expected schema is an integration challenge specific to each setup. Supporting both Arabic and English across invoices and system communications adds further complexity to validation and formatting.",
        "### Target Use Cases",
        "* **SMEs:** Small and medium enterprises needing an affordable, compliant invoicing tool.",
        "* **Enterprise Integration:** Large businesses requiring a middleware solution to connect their existing ERPs to ZATCA.",
        "* **E-commerce:** Online platforms needing automated clearance for B2B transactions.",
        "### Key Benefits",
        "* **Compliance Workflow Support:** Provide a technical foundation for the client's ZATCA review and invoice clearance workflow.",
        "* **Automation:** Reduce manual data entry and associated errors.",
        "* **Peace of Mind:** Focus on business growth while the system handles the complexities of tax reporting."
      ].join("\n\n"),
      ar: "نظام لتخطيط مسار تخليص الفواتير الإلكترونية وفق متطلبات هيئة الزكاة والضريبة والجمارك (ZATCA). يتيح النظام تصور الربط المباشر والختم التشفيري وإجراءات CCSID ضمن نطاق التجربة. يواجه هذا النوع من التكامل تحديات متأصلة في طبيعته، من أبرزها الاعتماد على واجهة برمجة تطبيقات حكومية تعمل في الوقت الفعلي، ومطابقة بيانات الفواتير المختلفة الشكل القادمة من أنظمة كل عميل، إضافة إلى ضرورة دعم اللغتين العربية والإنجليزية معًا.",
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
    article: {
      en: [
        "### Introduction",
        "SanadOS is a facilities operations platform built to bring asset tracking, work orders, and maintenance history into one system of record. It is currently in pilot with real facility operators, and the workflows described here are being validated and adjusted based on that pilot rather than treated as a finished, general-availability product.",
        "### The Problem",
        "Facility teams often end up tracking assets, work orders, and maintenance history across a spreadsheet per building, plus whatever notes technicians keep on paper or in messaging threads. That split makes it hard to see an asset's condition, a work order's status, or a full maintenance history in one place, and it leaves audit trails incomplete or scattered across files that are easy to lose or overwrite.",
        "### The Technology",
        "SanadOS is built with React on the front end and Supabase on the back end, using Supabase's Postgres-based data layer along with its real-time and authentication features to keep asset and work-order records synced across users. An AI component is part of the stack; exactly what it assists with in the day-to-day workflow is one of the things the pilot is being used to validate, rather than a fixed, finished feature set.",
        "### Key Features",
        "* **Asset Tracking:** A central record for each facility asset, instead of one spreadsheet per building.",
        "* **Work Order Management:** Work orders that can be created, assigned, and tracked through to completion.",
        "* **Audit Logs:** A record of activity on assets and work orders, intended to support accountability and review.",
        "* **Real-Time Data:** Built on Supabase so records stay in sync as multiple users update them.",
        "### Target Use Cases",
        "* **Facility and Operations Teams:** Teams responsible for the assets and maintenance of one or more buildings.",
        "* **Multi-Building Operators:** Organizations currently running a separate spreadsheet per site that want one shared system instead.",
        "* **Field Technicians:** Staff who need to update work orders and asset status as part of their day-to-day work, subject to the device and offline requirements confirmed for each pilot.",
        "### Key Benefits",
        "* **One System of Record:** Replaces a spreadsheet-per-building approach with a single place for assets, work orders, and maintenance history.",
        "* **Accountability:** Audit logs are intended to make it clearer who did what to which asset, and when.",
        "* **Shaped by Real Use:** Because it is in pilot with real operators, the workflows are being adjusted against actual day-to-day use rather than assumptions.",
      ].join("\n\n"),
      ar: "سانادOS منصة لعمليات المرافق قيد التجربة حاليًا مع مشغّلين فعليين، تجمع تتبع الأصول وأوامر العمل وسجل الصيانة في نظام سجل واحد بدلاً من جدول بيانات منفصل لكل مبنى. بُنيت بواجهة React وخلفية Supabase التي توفر طبقة بيانات قائمة على Postgres مع ميزات لحظية ومصادقة تُبقي السجلات متزامنة بين المستخدمين، إلى جانب مكوّن ذكاء اصطناعي ما تزال فائدته الدقيقة في سير العمل اليومي قيد التحقق ضمن نطاق التجربة. لا يوجد حاليًا مستودع كود عام لهذا المشروع، والهدف من التجربة هو التحقق من ملاءمة نموذج الأصول وأوامر العمل وسجلات التدقيق لعملية المشغلين الحقيقية قبل أي حديث عن جاهزية عامة أو إنتاجية.",
    },
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
      {
        q: { en: "Is there a public repository or live demo for SanadOS?", ar: "هل يوجد مستودع كود عام أو نسخة تجريبية حية لـ SanadOS؟" },
        a: {
          en: "No. SanadOS doesn't have a public GitHub repo linked — it's private and unlisted at this stage. Access is arranged directly for anyone evaluating the pilot.",
          ar: "لا. لا يوجد مستودع GitHub عام مرتبط بـ SanadOS في الوقت الحالي، فهو خاص وغير مُدرج علنًا في هذه المرحلة. يُتاح الوصول إليه بشكل مباشر لمن يرغب بتقييم التجربة.",
        },
      },
      {
        q: { en: "What exactly does the AI component in SanadOS do?", ar: "ما الذي يقوم به مكوّن الذكاء الاصطناعي في SanadOS تحديدًا؟" },
        a: {
          en: "That's still being defined through the pilot. AI is part of the stack, but which tasks it assists with in day-to-day operations is being validated with real operators rather than fixed in advance.",
          ar: "لا يزال هذا قيد التحديد من خلال التجربة. الذكاء الاصطناعي جزء من التقنية المستخدمة، لكن المهام التي يساعد فيها ضمن العمليات اليومية يجري التحقق منها مع مشغّلين فعليين بدلاً من تثبيتها مسبقًا.",
        },
      },
      {
        q: { en: "Why Supabase instead of a custom backend?", ar: "لماذا تم اختيار Supabase بدلاً من خلفية مخصصة؟" },
        a: {
          en: "Supabase gives a Postgres-based data layer with real-time sync and authentication out of the box, which fits a tool where multiple people need to see the same asset and work-order records update live. That's the reasoning behind the choice, not a claim that it's the only workable option.",
          ar: "توفر Supabase طبقة بيانات قائمة على Postgres مع تزامن لحظي ومصادقة جاهزة، وهو ما يناسب أداة يحتاج فيها عدة أشخاص لرؤية تحديثات سجلات الأصول وأوامر العمل لحظيًا. هذا هو سبب الاختيار، وليس ادعاءً بأنه الخيار الوحيد الممكن.",
        },
      },
      {
        q: { en: "How complete is the audit log feature right now?", ar: "ما مدى اكتمال ميزة سجلات التدقيق حاليًا؟" },
        a: {
          en: "It's part of the current pilot scope — it records activity on assets and work orders, and its exact level of detail is being refined against what the pilot operators actually need for accountability and review.",
          ar: "هي جزء من نطاق التجربة الحالية، وتسجل النشاط على الأصول وأوامر العمل، ويجري ضبط مستوى تفاصيلها الدقيق بحسب احتياجات المشغّلين الفعليين في التجربة للمساءلة والمراجعة.",
        },
      },
    ],
  },
  {
    slug: "sovereign-vault",
    title: "Sovereign Vault",
    outcome: {
      en: "A local-first privacy vault designed to encrypt data with zero-knowledge cryptography directly in the browser, keeping sensitive information under the user's control.",
      ar: "خزنة خصوصية محلية الأولوية مصممة لتشفير البيانات باستخدام تشفير المعرفة الصفرية مباشرة داخل المتصفح، بحيث تبقى البيانات الحساسة تحت سيطرة المستخدم.",
    },
    status: "active-development",
    stack: ["React", "TypeScript", "Web Crypto API", "PWA"],
    order: 5,
    repo: "sovereign-vault",
    body: {
      en: "A local-first privacy vault in active development that uses zero-knowledge encryption in the browser to keep data on the user's device.",
      ar: "خزنة خصوصية محلية الأولوية قيد التطوير، تعتمد تشفير المعرفة الصفرية داخل المتصفح لإبقاء البيانات على جهاز المستخدم.",
    },
    article: {
      en: [
        "### Introduction",
        "Sovereign Vault is a local-first privacy vault currently in active development, built with React, TypeScript, and the Web Crypto API as a Progressive Web App. It is designed to store sensitive data using zero-knowledge encryption, meaning encryption and decryption happen only on the user's own device.",
        "### The Problem",
        "Most cloud storage and vault-style tools require trusting a third-party server with either the plaintext data or the encryption keys themselves, which makes that server a target for breaches or misuse and ties the tool to a persistent connection with it. A local-first design built on zero-knowledge encryption is meant to address both of these by keeping raw data and keys off any server the provider controls.",
        "### The Technology",
        "Sovereign Vault is built on React and TypeScript, with the Web Crypto API handling cryptographic operations directly in the browser. As a Progressive Web App, it is installable and built around a local-first approach rather than continuous dependence on a backend server.",
        "### Key Features",
        "* **Local-First Storage:** Data stays on the user's device rather than in a remote database.",
        "* **Zero-Knowledge Encryption:** Encryption and decryption happen client-side via the Web Crypto API, so raw data is not exposed to any server.",
        "* **Progressive Web App:** Installable and built to work without a constant connection.",
        "* **Vault-Style Data Model:** Structured around storing and organizing sensitive records securely.",
        "### Challenges",
        "Client-side, zero-knowledge encryption shifts key management onto the user: if the encryption key is lost, the data cannot be recovered by the vault or by its provider. This trade-off is a known, inherent challenge of zero-knowledge system design in general, not something specific to this project.",
        "### Development Approach",
        "Sovereign Vault is Arranto's own in-development product, not a client engagement. Its repository is public on GitHub and under active iteration with ongoing commits; it has not yet been deployed for client or production use.",
      ].join("\n\n"),
      ar: "سوفرين فولت (Sovereign Vault) هو خزنة خصوصية محلية الأولوية (local-first) قيد التطوير الفعلي حاليًا، مبنية بلغة TypeScript ومكتبة React وواجهة Web Crypto API، وهو تطبيق ويب تقدمي (PWA) مصمم لتخزين البيانات الحساسة باستخدام تشفير من نوع \"المعرفة الصفرية\" (zero-knowledge)، أي أن عمليتي التشفير وفك التشفير تتمّان محليًا على جهاز المستخدم فقط. سوفرين فولت منتج داخلي قيد التطوير ضمن أعمال Arranto الخاصة، وليس مشروعًا لعميل، ولم يُطرح بعد للاستخدام من قبل عملاء أو في بيئة إنتاج.",
    },
    faq: [
      {
        q: { en: "Is Sovereign Vault live or available to use right now?", ar: "هل سوفرين فولت متاح للاستخدام الآن؟" },
        a: {
          en: "Not yet. It's in active development as one of Arranto's own products, with a public GitHub repository and ongoing commits, but it has not been deployed for client or public use.",
          ar: "ليس بعد. المشروع قيد التطوير الفعلي كأحد منتجات Arranto الداخلية، وله مستودع علني على GitHub بإضافات مستمرة، لكنه لم يُطرح بعد للاستخدام من قبل عملاء أو للجمهور.",
        },
      },
      {
        q: { en: "What does \"zero-knowledge encryption\" mean in this context?", ar: "ماذا يعني \"تشفير المعرفة الصفرية\" هنا؟" },
        a: {
          en: "Data is encrypted and decrypted client-side using the Web Crypto API, so the raw, unencrypted data is not sent to or stored on a remote server.",
          ar: "تتم عمليتا التشفير وفك التشفير من جانب المستخدم عبر واجهة Web Crypto API، بحيث لا تُرسل البيانات الأصلية غير المشفرة إلى أي خادم بعيد أو تُخزَّن عليه.",
        },
      },
      {
        q: { en: "What happens if I lose my encryption key or password?", ar: "ماذا يحدث إذا فقدت مفتاح التشفير أو كلمة المرور؟" },
        a: {
          en: "Because the vault is built around client-side, zero-knowledge encryption, losing the key means the data cannot be recovered by the vault itself. That trade-off is an inherent, well-known part of zero-knowledge system design in general.",
          ar: "بما أن الخزنة مبنية على تشفير المعرفة الصفرية من جانب المستخدم، فإن فقدان المفتاح يعني تعذّر استرجاع البيانات من قبل الخزنة نفسها. هذا الجانب متأصل ومعروف في تصميم أنظمة المعرفة الصفرية بشكل عام.",
        },
      },
      {
        q: { en: "What is Sovereign Vault built with?", ar: "بماذا بُني سوفرين فولت؟" },
        a: {
          en: "React and TypeScript for the application, the Web Crypto API for the cryptographic operations, and it's structured as a Progressive Web App (PWA).",
          ar: "بُني التطبيق باستخدام React و TypeScript، وتُنفَّذ عمليات التشفير عبر Web Crypto API، وهو مُهيكل كتطبيق ويب تقدمي (PWA).",
        },
      },
      {
        q: { en: "Is this a project for a specific client?", ar: "هل هذا مشروع لعميل محدد؟" },
        a: {
          en: "No. Sovereign Vault is Arranto's own in-development product, not a client engagement.",
          ar: "لا. سوفرين فولت منتج داخلي قيد التطوير ضمن أعمال Arranto الخاصة، وليس مشروعًا لعميل.",
        },
      },
    ],
  },
  {
    slug: "tuition-mandi",
    title: "Tuition Mandi",
    outcome: {
      en: "A PWA for tuition teachers that keeps working offline, queues changes locally, and drafts student progress reports with AI assistance.",
      ar: "تطبيق ويب تقدمي (PWA) لمعلمي الدروس الخصوصية يواصل العمل دون اتصال، ويُخزّن التغييرات محليًا، ويساعد في صياغة تقارير تقدّم الطلاب عبر الذكاء الاصطناعي.",
    },
    status: "active-development",
    stack: ["React", "PWA", "Supabase"],
    order: 6,
    repo: "tuition-mandi-pwa",
    body: {
      en: "Offline-first teacher app — local mutation queue, Supabase Edge Functions, AI-drafted progress reports.",
      ar: "تطبيق للمعلمين مبني ليعمل دون اتصال أولًا — قائمة انتظار محلية للتغييرات، ووظائف Supabase Edge، وتقارير تقدّم بمساعدة الذكاء الاصطناعي.",
    },
    article: {
      en: [
        "### Introduction",
        "Tuition Mandi is a Progressive Web App built for individual tuition teachers, currently in active development. The project is public on GitHub as `tuition-mandi-pwa`, with a live preview deployed for ongoing testing and iteration.",
        "### The Problem",
        "Individual tutors often work from a phone, in classrooms or homes where the connection isn't always reliable. Software that needs a live connection to record session or student data breaks down at exactly the moment it's needed — mid-lesson, without WiFi. Offline-first behavior is a domain-level requirement for this kind of app, not an add-on feature.",
        "### The Technology",
        "Built with **React** as a **PWA** — installable on a teacher's device, working offline by design — with **Supabase** as the backend, including Supabase Edge Functions for server-side logic. An offline mutation queue lets a teacher keep entering data without a connection; queued changes sync once the network is back. Progress report content is drafted with AI assistance.",
        "### Key Features",
        "* **Offline Mutation Queue:** Actions taken while offline are queued locally and synced automatically when connectivity returns.",
        "* **Supabase Edge Functions:** Server-side logic runs through Supabase's edge function runtime.",
        "* **AI-Assisted Progress Reports:** AI drafts student progress report content for a teacher to review and finalize.",
        "* **Installable PWA:** Works as a Progressive Web App rather than requiring a native app store install.",
        "### Development Approach",
        "Tuition Mandi is under active development, with a public repository showing ongoing commits and open issues being worked through. A live preview is deployed at takhti-app.vercel.app for testing; it is not presented as a finished product or a completed client engagement.",
        "### Key Benefits",
        "* **Reliability in Low-Connectivity Settings:** The offline queue is designed so a dropped connection mid-session doesn't block the teacher from continuing to work.",
        "* **Less Manual Report Writing:** AI-assisted drafting aims to cut down the manual effort of writing individual student progress reports.",
        "* **No App Store Required:** Delivered as an installable PWA, distributed through a web link rather than an app store listing.",
      ].join("\n\n"),
      ar: "Tuition Mandi تطبيق ويب تقدمي (PWA) قيد التطوير الفعلي، مبني لمعلمي الدروس الخصوصية الذين يعملون غالبًا من الهاتف في أماكن قد لا يكون فيها الاتصال بالإنترنت مستقرًا دائمًا؛ لذلك صُمم التطبيق ليعمل دون اتصال، حيث تُخزَّن التغييرات في قائمة انتظار محلية وتُزامَن تلقائيًا مع Supabase عبر وظائف Edge Functions بمجرد عودة الاتصال. يوفر التطبيق أيضًا مساعدة بالذكاء الاصطناعي لصياغة محتوى تقارير تقدّم الطلاب، على أن يراجعها المعلم ويعتمدها. المشروع علني على GitHub باسم tuition-mandi-pwa، وله نسخة تجريبية منشورة على الرابط takhti-app.vercel.app لأغراض الاختبار والتكرار — أي أن التطبيق لا يُقدَّم هنا كمنتج جاهز أو كمشروع منجز لعميل، بل كعمل قيد التطوير النشط.",
    },
    faq: [
      {
        q: { en: "Is Tuition Mandi live in production with real tuition teachers?", ar: "هل يعمل Tuition Mandi فعليًا في بيئة الإنتاج مع معلمين حقيقيين؟" },
        a: {
          en: "No. It's in active development. A live preview is deployed for testing, but there's no completed client pilot or confirmed set of paying users to point to yet.",
          ar: "لا. التطبيق قيد التطوير النشط. هناك نسخة تجريبية منشورة للاختبار، لكن لا توجد حتى الآن تجربة عميل مكتملة أو مستخدمون مدفوعون مؤكدون يمكن الإشارة إليهم.",
        },
      },
      {
        q: { en: "What does the \"offline mutation queue\" actually do?", ar: "ما الذي تفعله \"قائمة انتظار التغييرات دون اتصال\" تحديدًا؟" },
        a: {
          en: "When a teacher makes a change without a connection, it's stored locally on the device instead of being lost, then synced to Supabase automatically once the connection comes back.",
          ar: "عندما يجري المعلم تغييرًا دون اتصال بالإنترنت، يُخزَّن هذا التغيير محليًا على الجهاز بدلاً من فقدانه، ثم يُزامَن تلقائيًا مع Supabase بمجرد عودة الاتصال.",
        },
      },
      {
        q: { en: "Does the AI write the progress reports on its own?", ar: "هل يكتب الذكاء الاصطناعي تقارير التقدّم من تلقاء نفسه؟" },
        a: {
          en: "It drafts the content. The feature is described as AI-assisted drafting for a teacher to review and finalize, not a fully automated, unsupervised report generator.",
          ar: "هو يصيغ المحتوى المبدئي فقط. الميزة موصوفة كمساعدة بالذكاء الاصطناعي في الصياغة يراجعها المعلم ويعتمدها، وليست أداة توليد تقارير آلية بالكامل دون إشراف.",
        },
      },
      {
        q: { en: "Can I try it right now?", ar: "هل يمكنني تجربته الآن؟" },
        a: {
          en: "There's a live preview at takhti-app.vercel.app. It reflects an active-development build with open issues still being worked through, so expect ongoing changes rather than a finished release.",
          ar: "توجد نسخة تجريبية منشورة على الرابط takhti-app.vercel.app. وهي تعكس نسخة قيد التطوير النشط مع مشكلات مفتوحة لا تزال قيد المعالجة، لذا يُتوقع استمرار التغييرات وليس إصدارًا نهائيًا.",
        },
      },
      {
        q: { en: "What's the stack behind it?", ar: "ما هي التقنيات المستخدمة في بنائه؟" },
        a: {
          en: "React for the frontend, built as a PWA, with Supabase (including Supabase Edge Functions) on the backend. The project is public on GitHub as tuition-mandi-pwa.",
          ar: "React للواجهة الأمامية، مبني كتطبيق ويب تقدمي (PWA)، مع Supabase (بما في ذلك وظائف Supabase Edge) للخلفية. المشروع علني على GitHub باسم tuition-mandi-pwa.",
        },
      },
    ],
  },
  {
    slug: "carfax-for-boats",
    title: "Carfax for Boats",
    outcome: {
      en: "Carfax for Boats is still in active development. It is a studio-built project, not a client engagement, and there is no release date yet.",
      ar: "لا يزال مشروع «كارفاكس للقوارب» قيد التطوير الفعلي. هذا مشروع داخلي تابع للاستوديو وليس عملاً لصالح عميل، ولم يُحدَّد بعد موعد لإطلاقه.",
    },
    status: "active-development",
    stack: ["Next.js", "PWA", "Claude Vision API"],
    order: 7,
    repo: "carfax-for-boats",
    body: {
      en: "Carfax for Boats is an internal Arranto project exploring transferable maintenance records for boats. The idea: photograph an engine plate, a receipt, or an hour meter, and let Claude's vision API turn that photo into a structured, shareable service history that can move with the boat to its next owner. The project is under active development, with a public repository showing ongoing commits and open issues being tracked.",
      ar: "«كارفاكس للقوارب» مشروع داخلي من أرانتو يستكشف فكرة سجلات صيانة قابلة للنقل للقوارب. الفكرة هي التقاط صورة للوحة المحرك أو إيصال أو عداد الساعات، ثم الاستعانة بواجهة الرؤية البصرية من Claude لتحويل تلك الصورة إلى سجل صيانة منظّم وقابل للمشاركة يمكن أن ينتقل مع القارب إلى مالكه التالي. المشروع لا يزال قيد التطوير الفعّال، إذ يشهد المستودع العام تحديثات برمجية مستمرة، مع وجود مشكلات مفتوحة قيد المتابعة.",
    },
    article: {
      en: [
        "### Introduction",
        "Carfax for Boats is an Arranto-built project, not a client engagement. It asks a simple question: when a car changes hands, a Carfax report can show its history — what happens when a boat changes hands? The project is under active development, with a public repository showing ongoing commits.",
        "### The Problem",
        "A boat's maintenance history typically lives in scattered paper receipts, a seller's verbal account, or nowhere at all. None of it reliably follows the boat when it's sold, which leaves buyers guessing about engine hours, service intervals, and past repairs, and leaves sellers with no easy way to document the upkeep they actually did.",
        "### The Technology",
        "The project is built as a Next.js Progressive Web App, so it can be used from a phone at the dock without an app-store install. It uses Claude's vision API to read photos of physical source material — an engine plate, a receipt, an hour meter — rather than requiring manual data entry.",
        "### Key Features",
        "* **Photo-Based Input:** Capture an engine plate, a receipt, or an hour meter reading directly from the PWA's camera.",
        "* **AI-Assisted Extraction:** Claude's vision API reads the photographed details instead of a person typing them in by hand.",
        "* **Structured Records:** Extracted information is organized into a maintenance record tied to the boat.",
        "* **Designed to Transfer:** Records are built to move with the boat to a new owner rather than staying locked to one account.",
        "### Target Use Cases",
        "The project targets boat owners who want a running record of their own maintenance, sellers who want to document a boat's condition before listing it, and buyers who would rather see a structured history than take a seller's word for it.",
        "### Challenges",
        "Reading real-world engine plates, faded receipts, and mechanical hour meters is harder than reading a clean digital document — stampings wear down, paper fades, lighting on a boat varies, and handwriting isn't consistent. Vision-based extraction in a marine environment has to work with source material that's often worn, glare-affected, or handwritten rather than printed.",
      ].join("\n\n"),
      ar: "«كارفاكس للقوارب» مشروع تطويره أرانتو داخليًا، وليس عملاً لصالح عميل، ولا يزال قيد التطوير الفعّال حتى تاريخه. يحاول المشروع معالجة مشكلة حقيقية: سجل صيانة القارب عادة ما يكون مبعثرًا بين إيصالات ورقية أو رواية شفهية من البائع أو لا يكون موجودًا على الإطلاق، ولا ينتقل هذا السجل مع القارب عند بيعه. يعتمد المشروع، المبني كتطبيق ويب تقدمي (PWA) باستخدام Next.js، على واجهة الرؤية البصرية من Claude لقراءة صور لوحة المحرك أو الإيصالات أو عداد الساعات وتحويلها إلى سجل صيانة منظّم يُفترض أن ينتقل مع القارب إلى مالكه التالي، بدلاً من الاعتماد على إدخال البيانات يدويًا. ولأن قراءة المواد الفعلية كاللوحات المعدنية المهترئة أو الإيصالات الباهتة أو خطوط اليد أصعب من قراءة مستند رقمي واضح، فإن استخراج البيانات في بيئة بحرية يواجه تحديات متأصلة في طبيعة هذه المصادر. المشروع ما زال في مراحله الأولى ولم يُطلق بعد للاستخدام الفعلي من قبل مالكي القوارب أو الموانئ.",
    },
    faq: [
      {
        q: { en: "Is Carfax for Boats live or available to use right now?", ar: "هل «كارفاكس للقوارب» متاح للاستخدام الآن؟" },
        a: {
          en: "No. It's under active development as an internal Arranto project, with no public release yet.",
          ar: "لا. المشروع لا يزال قيد التطوير الفعّال كمبادرة داخلية من أرانتو، ولم يُطرح بعد للجمهور.",
        },
      },
      {
        q: { en: "Is this being built for a specific client or marina?", ar: "هل يُبنى هذا المشروع لصالح عميل أو مارينا معينة؟" },
        a: {
          en: "No. This is Arranto's own build, not a client engagement, and there are no confirmed marina or brokerage partnerships at this stage.",
          ar: "لا. هذا مشروع خاص بأرانتو نفسها وليس عملاً لصالح عميل، ولا توجد حاليًا أي شراكات مؤكدة مع موانئ أو جهات بيع قوارب.",
        },
      },
      {
        q: { en: "What's the technology behind it?", ar: "ما هي التقنية المستخدمة في المشروع؟" },
        a: {
          en: "It's a Next.js Progressive Web App that uses Claude's vision API to read photos of engine plates, receipts, and hour meters and turn them into structured maintenance records.",
          ar: "هو تطبيق ويب تقدمي (PWA) مبني باستخدام Next.js، يعتمد على واجهة الرؤية البصرية من Claude لقراءة صور لوحات المحركات والإيصالات وعدادات الساعات وتحويلها إلى سجلات صيانة منظّمة.",
        },
      },
      {
        q: { en: "How accurate is the AI at reading things like engine plates or handwritten receipts?", ar: "ما مدى دقة الذكاء الاصطناعي في قراءة أشياء مثل لوحات المحركات أو الإيصالات المكتوبة بخط اليد؟" },
        a: {
          en: "That hasn't been measured or published. The project uses Claude's vision API for this kind of extraction, but no accuracy figures exist yet for this build.",
          ar: "لم يتم قياس ذلك أو نشر أي أرقام بعد. يستخدم المشروع واجهة الرؤية البصرية من Claude لهذا النوع من الاستخراج، لكن لا توجد حتى الآن أي بيانات دقة منشورة لهذا البناء.",
        },
      },
      {
        q: { en: "Will maintenance records really transfer to a new owner when a boat is sold?", ar: "هل ستنتقل سجلات الصيانة فعليًا إلى المالك الجديد عند بيع القارب؟" },
        a: {
          en: "That's the design goal — records are meant to move with the boat rather than stay tied to one account — but that transfer flow hasn't been used in a real sale yet, since the project is still in development.",
          ar: "هذا هو الهدف من التصميم — أن تنتقل السجلات مع القارب بدلاً من أن تبقى مرتبطة بحساب واحد — لكن هذا المسار لم يُختبر بعد في عملية بيع فعلية لأن المشروع ما زال قيد التطوير.",
        },
      },
    ],
  },
  {
    slug: "arranto",
    title: "Arranto",
    outcome: {
      en: "A founder-led studio site built on Next.js 16 with bilingual EN/AR delivery and full RTL support, an AI-assisted consultation tool, and a self-improving SEO agent — and the same platform currently serving this page, still under active development.",
      ar: "موقع استوديو بإدارة مؤسس واحد، مبني على Next.js 16 مع دعم ثنائي اللغة (إنجليزي/عربي) وRTL كامل، وأداة استشارة تعتمد على الذكاء الاصطناعي، وعامل ذكي لتحسين محركات البحث يعمل على تطوير نفسه ذاتياً — وهو بالضبط نفس المنصة التي تُعرض عليها هذه الصفحة حالياً، وما زالت قيد التطوير النشط.",
    },
    status: "active-development",
    stack: ["Next.js", "TypeScript", "AI"],
    order: 8,
    repo: "arranto",
    body: {
      en: "This case study is about the site the visitor is reading it on right now — arranto.com. It runs on Next.js 16 with the App Router, serves bilingual English and Arabic content with full RTL support, and includes an AI-assisted consultation tool along with a self-improving SEO agent that works on the site's own search presence over time. The project is still under active development, with a public, source-available GitHub repository (not open source) and continuous commits.",
      ar: "هذه الدراسة تتحدث عن الموقع الذي يقرأها الزائر عليه الآن — arranto.com. الموقع مبني على Next.js 16 مع App Router، يقدّم محتوى ثنائي اللغة بالإنجليزية والعربية مع دعم كامل لـ RTL، ويتضمن أداة استشارة تعتمد على الذكاء الاصطناعي، إضافة إلى عامل ذكي لتحسين محركات البحث يعمل على تطوير أدائه الخاص بمرور الوقت. المشروع لا يزال قيد التطوير النشط، والمستودع البرمجي على GitHub متاح للاطلاع العام (source-available وليس open source)، مع تحديثات مستمرة.",
    },
    article: {
      en: [
        "### Introduction",
        "This case study covers arranto.com itself — the platform currently serving the page being read. It is a real, working example of the studio's own build rather than a hypothetical or external client project.",
        "### The Technology",
        "The site runs on Next.js 16 with the App Router, written in TypeScript. It serves bilingual English and Arabic content, with full RTL layout support for the Arabic version.",
        "### Key Features",
        "* **Bilingual EN/AR Delivery:** Full English and Arabic versions of the site, including RTL layout handling for the Arabic side.",
        "* **AI-Assisted Consultation Tool:** A chat-based tool on the site that helps visitors work through initial questions about a potential project.",
        "* **Self-Improving SEO Agent:** An agent that works on maintaining and improving the site's own search presence over time.",
        "* **Source-Available Codebase:** The GitHub repository (\"arranto\") is public and viewable, though it is licensed as source-available rather than open source — see the LICENSE file for specifics.",
        "### Development Approach",
        "The site is built and maintained by a single founder rather than a team, and it is under active development rather than a finished, static build. The public repository shows continuous iteration.",
        "### Key Benefits",
        "* **Direct Demonstration:** Prospective clients can look at the actual platform running this site instead of relying only on descriptions of past work.",
        "* **Transparency:** The source-available repository lets visitors check real implementation details against what the copy on the site claims.",
        "* **Ongoing Iteration:** Because the project is in active development, features such as the AI consultation tool and the SEO agent are expected to keep changing rather than staying fixed at a single shipped state.",
      ].join("\n\n"),
      ar: "هذه الدراسة تتناول موقع arranto.com نفسه، أي المنصة التي تُعرض عليها هذه الصفحة حالياً، وليس مشروعاً افتراضياً لعميل خارجي. يعمل الموقع على Next.js 16 باستخدام App Router، ومكتوب بلغة TypeScript. يقدّم محتوى ثنائي اللغة بالإنجليزية والعربية، مع دعم كامل للكتابة من اليمين إلى اليسار (RTL) في النسخة العربية. يدير الموقع مؤسس واحد وليس فريقاً، وهو لا يزال قيد التطوير النشط وليس بناءً نهائياً ثابتاً. يُظهر المستودع العام على GitHub باسم \"arranto\" تحديثات مستمرة، وهو مرخّص كـ source-available وليس مفتوح المصدر بالكامل.",
    },
    faq: [
      {
        q: { en: "Is this actually live, or just a demo project?", ar: "هل هذا موقع فعلي يعمل فعلاً أم مجرد عرض توضيحي؟" },
        a: {
          en: "It's live — arranto.com, the site being viewed, runs on the stack described here (Next.js 16, App Router, TypeScript). That said, the project is under active development, so parts of it are expected to keep changing rather than being a finished, frozen build.",
          ar: "نعم، هو فعلي — موقع arranto.com الذي يُشاهَد الآن يعمل فعلاً على البنية التقنية الموصوفة هنا (Next.js 16 وApp Router وTypeScript). مع ذلك، المشروع قيد التطوير النشط، لذا من المتوقع أن تستمر بعض أجزائه في التغيّر ولا يمكن اعتباره بناءً نهائياً ثابتاً.",
        },
      },
      {
        q: { en: "Can I see the source code?", ar: "هل يمكن الاطلاع على الكود المصدري؟" },
        a: {
          en: "Yes. The GitHub repository is public, named \"arranto.\" It's listed as source-available rather than open source, so check its LICENSE file for what's actually permitted before assuming standard open-source terms apply.",
          ar: "نعم. مستودع GitHub عام ومتاح باسم \"arranto\". لكنه مصنّف كـ source-available وليس open source، لذا يُنصح بمراجعة ملف LICENSE لمعرفة ما هو مسموح به فعلياً قبل افتراض شروط مفتوحة المصدر التقليدية.",
        },
      },
      {
        q: { en: "Does the self-improving SEO agent guarantee better search rankings?", ar: "هل يضمن عامل تحسين محركات البحث الذاتي التحسّن تحقيق ترتيب أفضل في نتائج البحث؟" },
        a: {
          en: "No guarantee is made here. It's described as self-improving, meaning it's built to keep adjusting the site's own SEO over time — that description doesn't amount to a promised ranking outcome.",
          ar: "لا يوجد أي ضمان بهذا الخصوص. العامل موصوف بأنه \"ذاتي التحسّن\"، أي أنه مصمم لضبط إعدادات SEO الخاصة بالموقع باستمرار مع الوقت، وهذا الوصف لا يعني وعداً بنتيجة ترتيب محددة.",
        },
      },
      {
        q: { en: "Is the AI consultation tool a replacement for talking to the founder directly?", ar: "هل تُغني أداة الاستشارة بالذكاء الاصطناعي عن التواصل المباشر مع المؤسس؟" },
        a: {
          en: "No claim like that is made. It's an AI-assisted tool meant to help with early, initial questions about a project — it isn't described anywhere as a substitute for direct contact with the founder.",
          ar: "لا يوجد أي ادّعاء بذلك. الأداة مصممة لمساعدة الزوار في طرح أسئلة أولية حول مشروع محتمل، ولم تُوصف في أي مكان كبديل عن التواصل المباشر مع المؤسس.",
        },
      },
      {
        q: { en: "Who actually builds and maintains this site?", ar: "من الذي يبني ويدير هذا الموقع فعلياً؟" },
        a: {
          en: "One founder, not a team. The site is run as a solo, founder-led effort, which is part of why it's presented here as active development rather than a finished product with a dedicated engineering team behind it.",
          ar: "مؤسس واحد فقط، وليس فريقاً. يُدار الموقع كجهد فردي بقيادة المؤسس، وهذا جزء من سبب عرضه هنا كمشروع قيد التطوير النشط بدلاً من منتج نهائي يقف خلفه فريق هندسي متكامل.",
        },
      },
    ],
  },
];

export const caseStudies: CaseStudy[] = caseStudiesSchema.parse(content);

export const bySlug = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);

export const sorted = [...caseStudies].sort((a, b) => a.order - b.order);
