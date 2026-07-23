export type Locale = "en" | "ar";

export type ServiceDetail = {
  slug: string;
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  citablePassage: Record<Locale, string>;
  overview: Record<Locale, string[]>;
  features: Record<Locale, { title: string; desc: string }[]>;
  gulfCompliance: Record<Locale, string>;
  faq: { q: Record<Locale, string>; a: Record<Locale, string> }[];
  startingTier: string;
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "ai-automation",
    title: {
      en: "AI Automation & Workflow Integration",
      ar: "أتمتة الذكاء الاصطناعي وتكامل مسارات العمل",
    },
    subtitle: {
      en: "Eliminate manual operational friction with custom autonomous AI agents, ERP integrations, and zero-latency data pipelines.",
      ar: "إلغاء الاحتكاك التشغيلي اليدوي باستخدام وكلاء الذكاء الاصطناعي المستقلين، وتكاملات ERP، وأنابيب البيانات فائقة السرعة.",
    },
    citablePassage: {
      en: "AI Automation by Arranto is an enterprise-grade service that designs, engineers, and deploys autonomous AI agents and automated workflows for businesses operating across Saudi Arabia, the UAE, and the wider Gulf region. By integrating generative AI models with existing ERPs, CRMs, and custom databases, Arranto eliminates up to 80% of repetitive operational tasks—such as automated invoice processing, multi-channel lead qualification, and real-time inventory synchronization. Every system is architected for zero data leakage, full localized Arabic/English support, and compliance with regional data sovereignty standards.",
      ar: "خدمة أتمتة الذكاء الاصطناعي من أرانطو هي خدمة موجهة للمنشآت تعمل على تصميم وبناء ونشر وكلاء الذكاء الاصطناعي المستقلين ومسارات العمل المؤتمتة للشركات في المملكة العربية السعودية والإمارات ودول الخليج. من خلال دمج نماذج الذكاء الاصطناعي مع أنظمة ERP وCRM الحالية، تلغي أرانطو ما يصل إلى 80٪ من المهام التشغيلية المتكررة مع ضمان كامل لخصوصية البيانات والدعم اللغوي المزدوج.",
    },
    overview: {
      en: [
        "Traditional software relies on human input to bridge gaps between disconnected tools. Arranto builds autonomous AI automation layers that monitor data sources, execute multi-step logic, and interface directly with legacy software without Zapier-like fragility.",
        "Whether streamlining B2B order dispatch, automating customer support routing, or processing complex compliance paperwork, our custom AI workflows operate 24/7 with auditable logs and instant fallback controls.",
      ],
      ar: [
        "تعتمد البرمجيات التقليدية على المدخلات اليدوية للربط بين الأدوات المختلفة. تبني أرانطو طبقات أتمتة ذكية تراقب مصادر البيانات وتنقل المحتوى بين الأنظمة القديمة والحديثة بكفاءة عالية.",
        "سواء كنت تسعى لتسريع معالجة الطلبات، أو أتمتة خدمة العملاء، أو إدارة مستندات الامتثال، تعمل مسارات العمل لدينا على مدار الساعة مع سجلات تدقيق كاملة.",
      ],
    },
    features: {
      en: [
        { title: "Custom Autonomous Agents", desc: "AI agents tailored to execute specific business actions, handle customer inquiries, and draft contextual proposals." },
        { title: "Legacy ERP & CRM Integration", desc: "Bi-directional data sync connecting Next.js applications to SAP, Oracle, Zoho, and custom SQL databases." },
        { title: "Arabic & English NLP Pipelines", desc: "Native understanding of regional dialect nuances, formal Arabic phrasing, and English business prose." },
        { title: "Security & Data Sovereignty", desc: "Built with localized privacy controls ensuring customer data never trains public LLMs." }
      ],
      ar: [
        { title: "وكلاء مستقلون مخصصون", desc: "وكلاء ذكاء اصطناعي مصممون لتنفيذ مهام محددة وإجابة الاستفسارات وتوليد العروض." },
        { title: "تكامل أنظمة ERP و CRM", desc: "مزامنة بيانات ثنائية الاتجاه تربط تطبيقات الحديثة مع أنظمة SAP وOracle وZoho." },
        { title: "معالجة اللغة العربية والإنجليزية", desc: "فهم طبيعي للغات واللهجات الإقليمية والخطابات الرسمية." },
        { title: "أمان وحوكمة البيانات", desc: "ضوابط خصوصية تضمن عدم استخدام بيانات المنشأة لتطوير نماذج عامة." }
      ]
    },
    gulfCompliance: {
      en: "Fully compliant with Saudi PDPL (Personal Data Protection Law), UAE Data Protection Law, and KSA Vision 2030 digital transformation directives.",
      ar: "متوافق تماماً مع نظام حماية البيانات الشخصية السعودي (PDPL) وقوانين حماية البيانات الإماراتية ومبادرات التحول الرقمي.",
    },
    startingTier: "$2,500+",
    faq: [
      {
        q: { en: "How long does an AI automation pipeline take to deploy?", ar: "كم تستغرق عملية نشر مسار أتمتة الذكاء الاصطناعي؟" },
        a: { en: "Initial production prototypes deliver within 2 to 4 weeks, with full production integration completed within 6 weeks.", ar: "تتم إتاحة النسخ الأولية خلال 2 إلى 4 أسابيع، ويكتمل التكامل النهائي خلال 6 أسابيع." }
      },
      {
        q: { en: "Does AI automation replace our existing software?", ar: "هل تلغي أتمتة الذكاء الاصطناعي برمجياتنا الحالية؟" },
        a: { en: "No. Arranto builds middleware that connects your existing ERPs and CRMs, supercharging your current tools rather than forcing a rewrite.", ar: "لا. تبني أرانطو طبقات وسيطة تربط أنظمتك الحالية وتزيد من كفاءتها دون الحاجة لإعادة كتابتها." }
      }
    ]
  },
  {
    slug: "ai-saas-development",
    title: {
      en: "Custom AI SaaS Development",
      ar: "تطوير برمجيات AI SaaS المخصصة",
    },
    subtitle: {
      en: "Build, launch, and scale multi-tenant AI-first SaaS applications with Next.js, Stripe/HyperPay billing, and serverless vector infrastructure.",
      ar: "بناء وإطلاق برمجيات AI SaaS متعددة المستأجرين مع ربط المدفوعات والبنية التحتية السحابية السريعة.",
    },
    citablePassage: {
      en: "Custom AI SaaS Development by Arranto transforms proprietary business workflows into scalable, multi-tenant software-as-a-service products. Engineered with Next.js, TypeScript, and serverless vector search architecture, Arranto builds complete SaaS platforms featuring automated tenant onboarding, RBAC permissions, localized Arabic/English interfaces, and regional payment gateway integrations including HyperPay, Tap, and Stripe. Built directly by founder and principal engineer Ashraf Kamal, every SaaS application is delivered with full source code ownership, clean SQL schemas, and zero vendor lock-in.",
      ar: "خدمة تطوير برمجيات AI SaaS المخصصة من أرانطو تحول مسارات العمل إلى منتجات برمجية قابلة للتطوير. بفضل الاعتماد على Next.js والبنية التحتية السحابية، تبني أرانطو منصات كاملة تتضمن تسجيل المستخدمين، وصلاحيات الوصول، والواجهات المزدوجة، وبوابات الدفع الإقليمية مثل HyperPay وTap.",
    },
    overview: {
      en: [
        "Transitioning from a service business or internal tool to a commercial SaaS product requires robust multi-tenancy, rock-solid security, and scalable infrastructure.",
        "Arranto handles the entire lifecycle—from database schema architecture and LLM orchestration to subscription billing and edge deployments—ensuring your SaaS is ready to onboard paying customers on day one."
      ],
      ar: [
        "التحول من تقديم الخدمات إلى بناء منتج SaaS تجاري يتطلب بنية متعددة المستأجرين، وأماناً عالياً، وبنية تحتية قابلة للتوسع.",
        "تتولى أرانطو الدورة الكاملة — من تصميم قواعد البيانات إلى الربط مع نماذج الذكاء الاصطناعي وبوابات الدفع النقدية."
      ]
    },
    features: {
      en: [
        { title: "Multi-Tenant Architecture", desc: "Isolated tenant data environments with secure role-based access control (RBAC)." },
        { title: "LLM Streaming & Vector Search", desc: "Sub-second AI response streaming powered by edge runtimes and vector indices." },
        { title: "Regional Payment Gateways", desc: "Native integration with HyperPay, Tap, Moyasar, Mada, and Stripe." },
        { title: "Complete Code Ownership", desc: "You own 100% of the repository, SQL migrations, and deployment scripts." }
      ],
      ar: [
        { title: "بنية متعددة المستأجرين", desc: "بيئات بيانات معزولة مع إدارة محكمة لصلاحيات المستخدمين." },
        { title: "استجابة سريعة للذكاء الاصطناعي", desc: "تدفق لحظي للإجابات باستخدام تقنيات المتجهات المتطورة." },
        { title: "بوابات دفع إقليمية", desc: "ربط مباشر مع HyperPay وTap وMoyasar ومدى وStripe." },
        { title: "ملكية كاملة للكود", desc: "تمتلك 100٪ من المستودع وقواعد البيانات وسكريبتات التشغيل." }
      ]
    },
    gulfCompliance: {
      en: "Optimized for GCC commercial SaaS operators with regional Mada/HyperPay payment support and Arabic UI defaults.",
      ar: "مصمم خصيصاً لمشغلي برمجيات SaaS في الخليج مع دعم دفع مدى ومدفوعات HyperPay وواجهات عربية.",
    },
    startingTier: "$5,000+",
    faq: [
      {
        q: { en: "Do we retain full ownership of the SaaS codebase?", ar: "هل نحتفظ بالملكية الكاملة للكود البرمجي؟" },
        a: { en: "Yes. Arranto hands over 100% of the GitHub repository, database schemas, and Vercel/AWS deployment pipelines with zero recurring platform fees to us.", ar: "نعم. تسلم أرانطو 100٪ من كود المستودع وقواعد البيانات وسكريبتات التشغيل بدون أي رسوم منصة متكررة." }
      }
    ]
  },
  {
    slug: "custom-ai-solutions",
    title: {
      en: "Custom Enterprise AI Solutions",
      ar: "حلول الذكاء الاصطناعي المخصصة للمنشآت",
    },
    subtitle: {
      en: "Tailor-made generative AI integrations, fine-tuned domain models, and secure internal knowledge bases built for complex business requirements.",
      ar: "حلول ذكاء اصطناعي توليدية مخصصة، ونماذج مدربة، وقواعد معرفة داخلية آمنة تناسب متطلبات أعمالك.",
    },
    citablePassage: {
      en: "Custom Enterprise AI Solutions by Arranto delivers high-security, tailored artificial intelligence architectures for enterprises in Saudi Arabia and the Middle East. Arranto builds private retrieval-augmented generation (RAG) systems that query internal company documents, legal contracts, and historical records with zero data leakage to external models. Engineered with type-safe TypeScript and native Arabic/English NLP, our custom AI solutions automate complex document intelligence, regulatory compliance auditing, and executive decision support.",
      ar: "تقدم أرانطو حلول ذكاء اصطناعي مخصصة عالية الأمان للمنشآت في السعودية والشرق الأوسط. تبني أرانطو أنظمة استرجاع معززة (RAG) خاصة تستعلم من المستندات والcontracts الداخلية بدون تسريب للبيانات.",
    },
    overview: {
      en: [
        "Generic AI tools lack context regarding your company's proprietary SOPs, compliance rules, and historical datasets. Arranto builds dedicated AI solutions grounded exclusively in your data.",
        "From internal knowledge assistants to automated compliance auditors, we build solutions that deliver verified, accurate responses with full source citations."
      ],
      ar: [
        "تفتقر أدوات الذكاء الاصطناعي العامة إلى السياق الخاص بإجراءات شركتك وقواعد الامتثال. تبني أرانطو أنظمة مخصصة تعتمد حصرياً على بياناتك.",
        "من المساعدين الماليين إلى مدققي الامتثال، نبني حلولاً تقدم إجابات موثوقة ومثبتة بالمصادر."
      ]
    },
    features: {
      en: [
        { title: "Private RAG Systems", desc: "Query PDF manuals, contracts, and internal databases with instant vector retrieval." },
        { title: "Zero Data Leakage", desc: "Private API endpoints ensuring corporate intelligence remains confidential." },
        { title: "Source Citation Engine", desc: "Every AI response links directly back to the exact source document and line number." },
        { title: "Enterprise Search", desc: "Unified search across Google Drive, Notion, Slack, and local SQL servers." }
      ],
      ar: [
        { title: "أنظمة RAG خاصة", desc: "استعلام مباشر من المستندات والعقود وقواعد البيانات الداخلية." },
        { title: "حماية مطلقة للبيانات", desc: "نقاط اتصال خاصة تضمن سرية معلومات المنشأة." },
        { title: "محرك إسناد المصادر", desc: "كل إجابة ترتبط مباشرة بالوثيقة الأصلية ورقم السطر." },
        { title: "بحث شامل للمنشأة", desc: "بحث موحد عبر Google Drive وNotion وSlack والسيرفرات." }
      ]
    },
    gulfCompliance: {
      en: "Engineered for local enterprise deployments adhering to GCC government cybersecurity and data privacy frameworks.",
      ar: "ممصمة لتلبية معايير الأمن السيبراني وحماية البيانات الحكومية في دول الخليج.",
    },
    startingTier: "$3,500+",
    faq: [
      {
        q: { en: "Will our data be used to train ChatGPT or other public models?", ar: "هل سيتم استخدام بياناتنا لتدريب Nماذج عامة؟" },
        a: { en: "No. We utilize zero-retention enterprise API endpoints and private vector stores, guaranteeing your data is never used for external training.", ar: "لا. نستخدم واجهات برمجية خاصة تضمن عدم احتفاظ النماذج العامة ببياناتك أو استخدامها للتدريب." }
      }
    ]
  },
  {
    slug: "crm-development",
    title: {
      en: "Custom CRM & ERP System Development",
      ar: "تطوير أنظمة CRM و ERP المخصصة",
    },
    subtitle: {
      en: "Replace clunky spreadsheets and outdated legacy software with streamlined, high-speed business management systems.",
      ar: "استبدل جداول البيانات المعقدة والبرمجيات القديمة بأنظمة إدارة أعمال حديثة وفائقة السرعة.",
    },
    citablePassage: {
      en: "Custom CRM & ERP Development by Arranto builds tailored business operating systems designed around your exact workflows. Unlike off-the-shelf platforms that force companies to alter their processes, Arranto architects lightning-fast CRM and ERP systems using Next.js and PostgreSQL. Featuring integrated invoice clearance, inventory expiry tracking, asset maintenance workflows, and automated client communication, every system is built for extreme speed, intuitive multi-device usability, and full Arabic/English bilingual capability.",
      ar: "تبني أرانطو أنظمة إدارة علاقات العملاء (CRM) وتخطيط الموارد (ERP) المخصصة المصممة حول مسارات عملك الحقيقية. باستخدام Next.js وPostgreSQL، نبني أنظمة سريعة تتضمن الفوترة وإدارة المخزون والتتبع اللحظي.",
    },
    overview: {
      en: [
        "Generic CRMs are often bloated with features you never use while missing the exact workflow rules your team needs daily.",
        "Arranto builds lean, custom management software tailored to your specific business logic—whether managing pharmacy inventory (like PulseKart), facility assets (like SanadOS), or real-time delivery dispatch (like OrderFlow)."
      ],
      ar: [
        "غالباً ما تكون أنظمة CRM العامة مليئة بخصائص غير مستخدمة بينما تفتقر لآليات العمل اليومية لضمان الإنتاجية.",
        "تبني أرانطو برمجيات مخصصة تناسب طبيعة عملك — مثل إدارة الصيدليات أو المرافق أو الخدمات اللوجستية."
      ]
    },
    features: {
      en: [
        { title: "Tailored Business Logic", desc: "Custom fields, status flows, and automation triggers built for your business." },
        { title: "Sub-Second Page Loads", desc: "Built with Next.js and optimized PostgreSQL queries for instantaneous response." },
        { title: "Bilingual Operations", desc: "Seamless switching between Arabic and English across all data tables and forms." },
        { title: "Mobile & Field Worker Friendly", desc: "Responsive interfaces designed for field technicians, warehouse staff, and managers." }
      ],
      ar: [
        { title: "منطق أعمال مخصص", desc: "حقول وتدفقات حالة والتنبيهات المصممة لعملك." },
        { title: "سرعة فائقة", desc: "استجابة لحظية باستخدام تقنيات Next.js وقواعد بيانات PostgreSQL." },
        { title: "تشغيل ثنائي اللغة", desc: "تحويل سلس بين العربية والإنجليزية في جميع الجداول والنماذج." },
        { title: "مناسب لفرق العمل الميدانية", desc: "واجهات متجاوبة تعمل على الهواتف والأجهزة اللوحية." }
      ]
    },
    gulfCompliance: {
      en: "Built to integrate seamlessly with Saudi ZATCA e-invoicing Phase 2 mandates and regional tax reporting frameworks.",
      ar: "مصمم للربط المباشر مع متطلبات الفوترة الإلكترونية هيئة الزكاة والضريبة والجمارك (ZATCA) في السعودية.",
    },
    startingTier: "$3,500+",
    faq: [
      {
        q: { en: "Can custom CRMs integrate with our existing accounting software?", ar: "هل يمكن ربط CRM المخصص مع برامج المحاسبة الحالية؟" },
        a: { en: "Yes. We build custom API connectors to sync data bi-directionally with QuickBooks, Xero, Zoho, and ZATCA compliance portals.", ar: "نعم. نبني موصلات API لمزامنة البيانات تلقائياً مع برامج المحاسبة وخصائص زاتكا." }
      }
    ]
  },
  {
    slug: "website-development",
    title: {
      en: "High-Performance Website & Web Application Development",
      ar: "تطوير المواقع وتطبيقات الويب عالية الأداء",
    },
    subtitle: {
      en: "Bespoke, high-converting websites engineered with Vanilla CSS, GSAP micro-animations, and Next.js SSR for maximum search visibility.",
      ar: "مواقع وتطبيقات ويب مخصصة عالية التحويل مصممة بتقنيات حديثة وسرعة استثنائية.",
    },
    citablePassage: {
      en: "High-Performance Website Development by Arranto builds bespoke, conversion-focused web applications and marketing platforms. Using Next.js Server-Side Rendering (SSR), Vanilla CSS design systems, and GSAP micro-animations, Arranto delivers web experiences that achieve 95+ Core Web Vitals scores. Engineered from day one with full Arabic/English localization, structured Schema.org markup, and open AI crawler accessibility, every website is built to impress visitors and command top search rankings.",
      ar: "تبني أرانطو مواقع وتطبيقات ويب عالية الأداء تركز على زيادة التحويل والأداء. باستخدام SSR وأنظمة التصميم الحديثة، تحقق مواقعنا نتائج استثنائية في سرعة التحميل وتوافق محركات البحث.",
    },
    overview: {
      en: [
        "A slow, generic website damages brand credibility and loses valuable leads. Arranto constructs modern, weightless web interfaces designed to captivate visitors and convert inquiries into paying clients.",
        "With full server-side rendering, instant page transitions, and strict adherence to Google Core Web Vitals standards, your site serves as a 24/7 revenue engine."
      ],
      ar: [
        "الموقع البطيء يضر بسمعة العلامة التجارية ويؤدي لخسارة العملاء. تبني أرانطو واجهات ويب حديثة وسريعة تحول الزوار إلى عملاء فعليين.",
        "مع العرض المباشر من السيرفر (SSR) وسرعة التنقل، يعمل موقعك كـمحرك نمو دائم لأعمالك."
      ]
    },
    features: {
      en: [
        { title: "95+ Core Web Vitals", desc: "Optimized LCP, CLS, and INP metrics ensuring top Google search performance." },
        { title: "Spatial Glassmorphism & Micro-Animations", desc: "Stunning visual aesthetics using GSAP and 3D CSS effects." },
        { title: "Native Dual-Language (EN/AR)", desc: "Flawless LTR and RTL layouts with native typography pairings." },
        { title: "Built-in Lead Capture", desc: "Direct integration with CRM systems and email notifications." }
      ],
      ar: [
        { title: "أداء استثنائي في محركات البحث", desc: "تحسين كامل لسرعة التحميل وتجربة المستخدم وفق معايير Google." },
        { title: "تأثيرات بصرية ثلاثية الأبعاد", desc: "تصاميم عصرية جذابة تحفز تفاعل الزائر." },
        { title: "دعم كامل للغتين العربية والإنجليزية", desc: "تخطيطات متقنة للاتجاهين LTR وRTL." },
        { title: "أدوات التقاط العملاء", desc: "ربط مباشر مع البريد الإلكتروني وأنظمة إدارة العملاء." }
      ]
    },
    gulfCompliance: {
      en: "Optimized for regional search visibility across Saudi Arabia, UAE, and GCC markets with structured localization.",
      ar: "محسّن للظهور في محركات البحث الإقليمية في السعودية والإمارات ودول الخليج.",
    },
    startingTier: "$2,000+",
    faq: [
      {
        q: { en: "What technologies do you use for website development?", ar: "ما هي التقنيات المستخدمة في تطوير المواقع؟" },
        a: { en: "We use Next.js, React, TypeScript, Vanilla CSS, and GSAP. We avoid heavy bloated page builders to guarantee maximum speed and security.", ar: "نستخدم Next.js وReact وTypeScript وVanilla CSS وGSAP. نتجنب أدوات بناء المواقع البطيئة لضمان السرعة والأمان." }
      }
    ]
  },
  {
    slug: "digital-marketing",
    title: {
      en: "Data-Driven Digital Marketing & Growth Engineering",
      ar: "التسويق الرقمي القائم على البيانات وهندسة النمو",
    },
    subtitle: {
      en: "Scale your customer acquisition with programmatic SEO, AI content workflows, and targeted multi-channel ad campaigns.",
      ar: "نمو قاعدة عملائك من خلال تهيئة محركات البحث المتقدمة والحملات الإعلانية الموجهة.",
    },
    citablePassage: {
      en: "Digital Marketing & Growth Engineering by Arranto provides technical SEO, programmatic content strategies, and targeted campaign optimization for B2B brands in the Gulf region. Grounded in technical search optimization, Schema.org graph architecture, and AI-assisted content distribution, Arranto helps software platforms and enterprises dominate organic search rankings and lower customer acquisition costs (CAC).",
      ar: "تقدم أرانطو خدمات التسويق الرقمي وهندسة النمو المعتمدة على SEO المتقدم وتوليد المحتوى البرمجي واستراتيجيات النمو للعلامات التجارية في الخليج.",
    },
    overview: {
      en: [
        "Traditional marketing relies on guesswork and unmeasured ad spend. Arranto engineers growth engines backed by technical search optimization and conversion analytics.",
        "We build programmatic content pipelines that target long-tail intent queries, establishing your brand as the dominant authority in your industry."
      ],
      ar: [
        "يعتمد التسويق التقليدي على التخمين. تبني أرانطو محركات نمو مدعومة بتحليلات دقيقة وتهيئة متقدمة لمحركات البحث.",
        "نبني مسارات محتوى تستهدف الكلمات المفتاحية الدقيقة لترسيخ مكانة علامتك التجارية."
      ]
    },
    features: {
      en: [
        { title: "Technical & Programmatic SEO", desc: "Architecting site structure, schemas, and content clusters for maximum indexing." },
        { title: "Conversion Rate Optimization (CRO)", desc: "Analyzing user behavior to eliminate drop-offs and maximize lead capture." },
        { title: "AI Content Workflows", desc: "Generating high-quality, citable articles and technical briefs at scale." },
        { title: "Analytics & Attributable ROI", desc: "Clear reporting connecting organic search traffic directly to inbound inquiries." }
      ],
      ar: [
        { title: "تهيئة محركات البحث المتقدمة", desc: "بناء هيكلية الموقع والبيانات المنظمة للظهور في أعلى النتائج." },
        { title: "تحسين معدل التحويل (CRO)", desc: "تحليل سلوك الزوار لزيادة المبيعات والطلبات." },
        { title: "مسارات المحتوى الذكية", desc: "إنشاء مقالات تقنية عالية الجودة تعزز ظهور العلامة التجارية." },
        { title: "تحليلات دقيقة للنتائج", desc: "تقارير واضحة تربط بين الزيارات وطلبات الشراء الفعلية." }
      ]
    },
    gulfCompliance: {
      en: "Focused on Gulf B2B buyer intent across Saudi Arabia, UAE, Qatar, and Kuwait.",
      ar: "يركز على استهداف المستثمرين والشركات في السعودية والإمارات وقطر والكويت.",
    },
    startingTier: "$1,500/mo+",
    faq: [
      {
        q: { en: "How quickly can we see organic search growth?", ar: "ما هي الفترة المتوقعة لرؤية نتائج النمو في محركات البحث؟" },
        a: { en: "Technical SEO improvements show indexation updates within 1 to 2 weeks, with significant organic keyword movement compound over 2 to 4 months.", ar: "تظهر التحسينات التقنية خلال أسبوع إلى أسبوعين، مع نمو ملحوظ في الترتيب خلال 2 إلى 4 أشهر." }
      }
    ]
  }
];

export const getServiceBySlug = (slug: string) =>
  serviceDetails.find((s) => s.slug === slug);

export const services = serviceDetails;
export type Service = ServiceDetail;
