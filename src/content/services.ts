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
  /** Optional long-form pillar body (same markdown-ish format as blog posts,
   * rendered via ArticleBody) for services that need more depth than the
   * standard overview/features template — e.g. a cluster hub page. */
  body?: Record<Locale, string>;
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
      en: "AI Automation by Arranto designs and builds autonomous AI agents and automated workflows for businesses in Saudi Arabia, the UAE, and the wider Gulf region, integrating generative AI models with existing ERPs, CRMs, and custom databases to handle tasks such as invoice processing, lead qualification, and data synchronisation. Initial production prototypes typically deliver within 2 to 4 weeks, with full production integration completed within 6 weeks. Each system is built with explicit access controls, Arabic/English support where required, and documented data-handling boundaries — customer data is never used to train public LLMs.",
      ar: "خدمة أتمتة الذكاء الاصطناعي من أرانطو تصمم وتبني وكلاء الذكاء الاصطناعي المستقلين ومسارات العمل المؤتمتة للشركات في المملكة العربية السعودية والإمارات ودول الخليج، من خلال دمج النماذج التوليدية مع أنظمة ERP وCRM الحالية لمعالجة الفواتير وتأهيل العملاء المحتملين ومزامنة البيانات. تتوفر النماذج الأولية عادة خلال 2 إلى 4 أسابيع، ويكتمل التكامل الإنتاجي الكامل خلال 6 أسابيع. يُبنى كل نظام بصلاحيات وصول محددة ودعم لغوي عند الحاجة وحدود موثقة لمعالجة البيانات — ولا تُستخدم بيانات العميل أبدًا لتدريب نماذج عامة.",
    },
    overview: {
      en: [
        "Traditional software relies on human input to bridge gaps between disconnected tools. Arranto builds autonomous AI automation layers that monitor data sources, execute multi-step logic, and interface directly with legacy software without Zapier-like fragility.",
        "Whether streamlining B2B order dispatch, automating customer support routing, or processing compliance paperwork, custom AI workflows can run continuously with auditable logs and fallback controls designed around the risk of each action.",
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
        { title: "أمان وحوكمة البيانات", desc: "ضوابط وصول واحتفاظ موثقة تحدد كيف وأين يمكن استخدام بيانات المنشأة." }
      ]
    },
    gulfCompliance: {
      en: "Designed to support projects that need to consider Saudi PDPL, UAE data protection requirements, and regional digital transformation goals. Final compliance depends on the client's data, deployment, contracts, and legal review.",
      ar: "مصمم لدعم المشاريع التي تحتاج إلى مراعاة نظام حماية البيانات الشخصية السعودي (PDPL) ومتطلبات حماية البيانات في الإمارات. يعتمد الامتثال النهائي على بيانات العميل ونشره ومراجعة المستشارين المختصين.",
    },
    faq: [
      {
        q: { en: "How long does an AI automation pipeline take to deploy?", ar: "كم تستغرق عملية نشر مسار أتمتة الذكاء الاصطناعي؟" },
        a: { en: "Initial production prototypes deliver within 2 to 4 weeks, with full production integration completed within 6 weeks.", ar: "تتم إتاحة النسخ الأولية خلال 2 إلى 4 أسابيع، ويكتمل التكامل النهائي خلال 6 أسابيع." }
      },
      {
        q: { en: "Does AI automation replace our existing software?", ar: "هل تلغي أتمتة الذكاء الاصطناعي برمجياتنا الحالية؟" },
        a: { en: "No. Arranto builds middleware that connects your existing ERPs and CRMs, supercharging your current tools rather than forcing a rewrite.", ar: "لا. تبني أرانطو طبقات وسيطة تربط أنظمتك الحالية وتزيد من كفاءتها دون الحاجة لإعادة كتابتها." }
      },
      {
        q: { en: "Which business processes are a good fit for AI automation?", ar: "ما هي العمليات المناسبة لأتمتة الذكاء الاصطناعي؟" },
        a: { en: "Good candidates include document intake, lead qualification, support routing, recurring reports, invoice checks, and data synchronisation between systems. We start by mapping the workflow and its exceptions before recommending automation.", ar: "تشمل العمليات المناسبة استقبال المستندات وتأهيل العملاء وتوجيه الدعم والتقارير المتكررة وفحص الفواتير ومزامنة البيانات بين الأنظمة. نبدأ برسم مسار العمل والاستثناءات قبل اقتراح الأتمتة." }
      },
      {
        q: { en: "Can our team approve AI actions before they affect customers or records?", ar: "هل يمكن لفريقنا مراجعة إجراءات الذكاء الاصطناعي قبل تأثيرها على العملاء أو السجلات؟" },
        a: { en: "Yes. Workflows can include human approval steps, role-based permissions, audit logs, and fallback rules for sensitive actions. The right level of automation depends on the risk of each task.", ar: "نعم. يمكن أن تتضمن مسارات العمل خطوات موافقة بشرية وصلاحيات حسب الدور وسجلات تدقيق وقواعد بديلة للإجراءات الحساسة. يعتمد مستوى الأتمتة المناسب على مخاطر كل مهمة." }
      },
      {
        q: { en: "How do you handle business data in an AI workflow?", ar: "كيف تتم معالجة بيانات الشركة داخل مسار عمل يعتمد على الذكاء الاصطناعي؟" },
        a: { en: "We define data access, retention, logging, and vendor boundaries during the architecture stage. Sensitive data should only be exposed to the systems and people that need it, with the final controls documented for the client.", ar: "نحدد صلاحيات الوصول والاحتفاظ بالبيانات والتسجيل وحدود مزودي الخدمة خلال مرحلة التصميم. يجب ألا تُعرض البيانات الحساسة إلا للأنظمة والأشخاص الذين يحتاجون إليها، مع توثيق الضوابط النهائية للعميل." }
      },
      {
        q: { en: "Can an automated workflow support both Arabic and English operations?", ar: "هل يمكن لمسار العمل المؤتمت دعم العمليات بالعربية والإنجليزية؟" },
        a: { en: "Yes, when the selected models, source data, and review rules support both languages. We test Arabic and English examples from the real workflow instead of assuming that an English-only prototype will transfer perfectly.", ar: "نعم، عندما تدعم النماذج والبيانات وقواعد المراجعة اللغتين. نختبر أمثلة عربية وإنجليزية من مسار العمل الحقيقي بدلاً من افتراض أن النموذج الأولي باللغة الإنجليزية سينتقل بشكل مثالي." }
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
      en: "Custom AI SaaS Development by Arranto transforms proprietary business workflows into scalable, multi-tenant software-as-a-service products, engineered with Next.js, TypeScript, and serverless vector search architecture. Builds include tenant onboarding, RBAC permissions, Arabic/English interfaces, and native integration with five regional payment gateways — HyperPay, Tap, Moyasar, Mada, and Stripe. Every project transfers 100% of the GitHub repository, database schemas, and deployment scripts at handover, with zero recurring platform fee owed to Arranto.",
      ar: "خدمة تطوير برمجيات AI SaaS المخصصة من أرانطو تحول مسارات العمل الخاصة إلى منتجات برمجية قابلة للتطوير ومتعددة المستأجرين، مبنية على Next.js وTypeScript وبنية بحث متجهي بلا خوادم. تشمل المشاريع تسجيل المستأجرين وصلاحيات الوصول والواجهات المزدوجة وتكاملاً مباشرًا مع خمس بوابات دفع إقليمية — HyperPay وTap وMoyasar ومدى وStripe. يُسلَّم 100٪ من مستودع GitHub وقواعد البيانات وسكريبتات التشغيل عند كل مشروع، دون أي رسوم منصة متكررة لأرانطو.",
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
        { title: "LLM Streaming & Vector Search", desc: "Responsive AI interactions supported by edge runtimes and vector indices, tested against the product's real workload." },
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
    faq: [
      {
        q: { en: "Do we retain full ownership of the SaaS codebase?", ar: "هل نحتفظ بالملكية الكاملة للكود البرمجي؟" },
        a: { en: "Yes. Arranto hands over 100% of the GitHub repository, database schemas, and Vercel/AWS deployment pipelines with zero recurring platform fees to us.", ar: "نعم. تسلم أرانطو 100٪ من كود المستودع وقواعد البيانات وسكريبتات التشغيل بدون أي رسوم منصة متكررة." }
      },
      {
        q: { en: "What should be ready before we start building an AI SaaS product?", ar: "ما الذي يجب أن يكون جاهزاً قبل بدء بناء منتج AI SaaS؟" },
        a: { en: "A clear customer problem, the first user roles, the workflow the product must improve, and a short list of launch priorities are enough to begin. We can turn an early product idea or internal tool into a scoped first release.", ar: "يكفي في البداية تحديد مشكلة العميل وأدوار المستخدمين ومسار العمل الذي يجب تحسينه وقائمة قصيرة بأولويات الإطلاق. يمكننا تحويل فكرة أولية أو أداة داخلية إلى إصدار أول واضح النطاق." }
      },
      {
        q: { en: "Can you build subscriptions and regional payment integrations?", ar: "هل يمكنكم بناء الاشتراكات وربط بوابات الدفع الإقليمية؟" },
        a: { en: "Yes. The billing design can include subscriptions, trials, invoices, plan changes, and payment providers that fit the target market. The exact provider is selected after checking country, currency, tax, and operational requirements.", ar: "نعم. يمكن أن يشمل تصميم الفوترة الاشتراكات والفترات التجريبية والفواتير وتغيير الخطط ومزودي الدفع المناسبين للسوق المستهدف. يتم اختيار المزود بعد مراجعة الدولة والعملة والضرائب والمتطلبات التشغيلية." }
      },
      {
        q: { en: "How do you keep data isolated between SaaS tenants?", ar: "كيف يتم عزل بيانات العملاء داخل منصة SaaS متعددة المستأجرين؟" },
        a: { en: "Tenant isolation is designed at the database, authorization, API, and testing layers. We define roles and access boundaries early, then test that one tenant cannot read or change another tenant's records.", ar: "يتم تصميم عزل المستأجرين على مستوى قاعدة البيانات والصلاحيات وواجهات API والاختبارات. نحدد الأدوار وحدود الوصول مبكراً ثم نختبر عدم قدرة مستأجر على قراءة أو تعديل سجلات مستأجر آخر." }
      },
      {
        q: { en: "Can an existing internal tool become a commercial SaaS product?", ar: "هل يمكن تحويل أداة داخلية موجودة إلى منتج SaaS تجاري؟" },
        a: { en: "Often, yes, but the internal workflow usually needs new tenant boundaries, onboarding, billing, permissions, observability, and customer-facing documentation. We assess the existing code before deciding what to reuse and what to rebuild.", ar: "غالباً نعم، لكن مسار العمل الداخلي يحتاج عادةً إلى حدود مستأجرين وتسجيل مستخدمين وفوترة وصلاحيات ومراقبة وتوثيق للعملاء. نقيم الكود الحالي قبل تحديد ما يمكن إعادة استخدامه وما يحتاج إلى إعادة بناء." }
      },
      {
        q: { en: "What happens after the first SaaS release?", ar: "ماذا يحدث بعد إطلاق الإصدار الأول من منصة SaaS؟" },
        a: { en: "The handover should include deployment access, database migrations, documentation, monitoring expectations, and a clear list of follow-up work. Ongoing support can then be scoped around the product's actual usage and roadmap.", ar: "يجب أن يشمل التسليم صلاحيات التشغيل وترحيلات قاعدة البيانات والتوثيق وتوقعات المراقبة وقائمة واضحة بالخطوات التالية. يمكن بعد ذلك تحديد الدعم المستمر بناءً على استخدام المنتج وخارطة طريقه." }
      },
      {
        q: { en: "Do you handle SaaS development for products that aren't AI-first?", ar: "هل تقدمون تطوير برمجيات SaaS للمنتجات التي ليست ذكاء اصطناعي بالدرجة الأولى؟" },
        a: { en: "Yes. Multi-tenancy, RBAC, regional billing, and code ownership are the same core SaaS-development discipline whether or not the product has an AI layer — AI is Arranto's specialization, not a requirement to start a SaaS build.", ar: "نعم. عزل المستأجرين وإدارة الصلاحيات والفوترة الإقليمية وملكية الكود هي نفس أساسيات تطوير SaaS سواء تضمن المنتج طبقة ذكاء اصطناعي أم لا — الذكاء الاصطناعي تخصص أرانطو، وليس شرطاً لبدء بناء SaaS." }
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
      en: "Custom Enterprise AI Solutions by Arranto delivers tailored artificial intelligence architectures for enterprises in Saudi Arabia and the Middle East, built around private retrieval-augmented generation (RAG) systems that query approved company documents, legal contracts, and historical records with explicit access, retention, and external-model boundaries. Every AI response links directly back to its exact source document, and enterprise search can unify Google Drive, Notion, Slack, and local SQL servers into one queryable system. Engineered with type-safe TypeScript and Arabic/English workflows where required.",
      ar: "تقدم أرانطو حلول ذكاء اصطناعي مخصصة للمنشآت في السعودية والشرق الأوسط، مبنية على أنظمة استرجاع معززة (RAG) خاصة تستعلم من المستندات والعقود والسجلات الداخلية المعتمدة مع صلاحيات وصول واحتفاظ وحدود نموذج خارجي محددة بوضوح. تُسنَد كل إجابة مباشرة إلى وثيقة المصدر الدقيقة، ويمكن للبحث الموحد للمنشأة أن يجمع Google Drive وNotion وSlack والسيرفرات المحلية في نظام واحد قابل للاستعلام. مبني بلغة TypeScript الآمنة النوع مع دعم عربي/إنجليزي عند الحاجة.",
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
        { title: "Private RAG Systems", desc: "Query approved manuals, contracts, and internal databases with fast vector retrieval." },
        { title: "Access Controls & Data Boundaries", desc: "Documented API, retention, and permission controls for sensitive company information." },
        { title: "Source Citation Engine", desc: "Every AI response links directly back to the exact source document and line number." },
        { title: "Enterprise Search", desc: "Unified search across Google Drive, Notion, Slack, and local SQL servers." }
      ],
      ar: [
        { title: "أنظمة RAG خاصة", desc: "استعلام مباشر من المستندات والعقود وقواعد البيانات الداخلية." },
        { title: "حدود وصول واضحة", desc: "صلاحيات ونقاط اتصال وإعدادات احتفاظ موثقة للمعلومات الحساسة." },
        { title: "محرك إسناد المصادر", desc: "كل إجابة ترتبط مباشرة بالوثيقة الأصلية ورقم السطر." },
        { title: "بحث شامل للمنشأة", desc: "بحث موحد عبر Google Drive وNotion وSlack والسيرفرات." }
      ]
    },
    gulfCompliance: {
      en: "Engineered for local enterprise deployments adhering to GCC government cybersecurity and data privacy frameworks.",
      ar: "ممصمة لتلبية معايير الأمن السيبراني وحماية البيانات الحكومية في دول الخليج.",
    },
    faq: [
      {
        q: { en: "Will our data be used to train ChatGPT or other public models?", ar: "هل سيتم استخدام بياناتنا لتدريب Nماذج عامة؟" },
        a: { en: "Not by default. The architecture should define which providers, retention settings, and private stores are allowed, then verify those settings against the client's policies and contracts.", ar: "ليس بشكل افتراضي. يجب أن يحدد التصميم مزودي الخدمة وإعدادات الاحتفاظ والمخازن الخاصة المسموح بها، ثم يتحقق من توافقها مع سياسات وعقود العميل." }
      },
      {
        q: { en: "What is a private RAG system and when do we need one?", ar: "ما هو نظام RAG الخاص ومتى نحتاج إليه؟" },
        a: { en: "A private RAG system retrieves relevant passages from approved company sources before generating an answer. It is useful when people need to search policies, manuals, contracts, or internal records without sending the entire knowledge base into a public chat.", ar: "يسترجع نظام RAG الخاص المقاطع ذات الصلة من مصادر الشركة المعتمدة قبل إنشاء الإجابة. يفيد ذلك عند الحاجة إلى البحث في السياسات والأدلة والعقود والسجلات الداخلية دون إرسال قاعدة المعرفة كاملة إلى محادثة عامة." }
      },
      {
        q: { en: "How do you reduce incorrect or unsupported AI answers?", ar: "كيف تقللون من الإجابات غير الصحيحة أو غير المدعومة من الذكاء الاصطناعي؟" },
        a: { en: "We combine source filtering, retrieval tests, prompt rules, confidence handling, citations where appropriate, and human review for high-impact actions. No system should promise perfect answers, so the remaining limits are documented clearly.", ar: "نجمع بين تصفية المصادر واختبارات الاسترجاع وقواعد التعليمات والتعامل مع مستوى الثقة والاستشهادات عند الحاجة والمراجعة البشرية للإجراءات عالية التأثير. لا ينبغي لأي نظام أن يعد بإجابات مثالية، لذلك نوثق حدوده بوضوح." }
      },
      {
        q: { en: "Can the solution connect to our existing documents and databases?", ar: "هل يمكن ربط الحل بمستنداتنا وقواعد بياناتنا الحالية؟" },
        a: { en: "Yes, subject to access and data quality. We can plan connectors for approved document stores, databases, or business tools, then define which sources are authoritative and how updates are handled.", ar: "نعم، حسب صلاحيات الوصول وجودة البيانات. يمكننا تخطيط موصلات لمخازن المستندات وقواعد البيانات وأدوات الأعمال المعتمدة، ثم تحديد المصادر الموثوقة وطريقة التعامل مع التحديثات." }
      },
      {
        q: { en: "Do we need fine-tuning to build a useful company AI assistant?", ar: "هل نحتاج إلى تدريب مخصص لبناء مساعد ذكاء اصطناعي مفيد للشركة؟" },
        a: { en: "Not always. A well-designed retrieval and evaluation layer may be enough for a knowledge assistant. Fine-tuning is considered only when the task, examples, data quality, and expected maintenance justify it.", ar: "ليس دائماً. قد تكون طبقة الاسترجاع والتقييم المصممة جيداً كافية لمساعد المعرفة. يتم التفكير في التدريب المخصص فقط عندما تبرره طبيعة المهمة والأمثلة وجودة البيانات وتكلفة الصيانة." }
      },
      {
        q: { en: "Can the interface work for Arabic-speaking and English-speaking teams?", ar: "هل يمكن للواجهة العمل للفرق الناطقة بالعربية والإنجليزية؟" },
        a: { en: "Yes. Language support is planned across the interface, prompts, source documents, permissions, and review process. We validate both languages with examples from the team's actual vocabulary.", ar: "نعم. يتم تخطيط الدعم اللغوي في الواجهة والتعليمات والمستندات والصلاحيات ومسار المراجعة. نتحقق من اللغتين باستخدام أمثلة من مفردات الفريق الفعلية." }
      },
      {
        q: { en: "Is this custom enterprise software development, or off-the-shelf AI tools?", ar: "هل هذا تطوير برمجيات مؤسسية مخصصة أم أدوات ذكاء اصطناعي جاهزة؟" },
        a: { en: "Custom development. Every RAG pipeline, access-control layer, and search integration described here is built and owned by your company — not a configured SaaS wrapper. That's the same custom-software approach Arranto uses for CRM/ERP and full-stack builds, applied to AI-specific infrastructure.", ar: "تطوير مخصص بالكامل. كل نظام RAG وطبقة صلاحيات وتكامل بحث هنا مبني ومملوك لشركتك، وليس أداة SaaS جاهزة. هو نفس نهج البرمجيات المخصصة الذي تتبعه أرانطو في أنظمة CRM/ERP والتطوير الشامل، مطبقاً على بنية الذكاء الاصطناعي." }
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
      en: "Custom CRM & ERP Development by Arranto builds tailored business operating systems designed around your exact workflows, using Next.js and PostgreSQL rather than forcing companies to alter their processes to fit an off-the-shelf platform. Systems can include invoice workflows, inventory expiry tracking, asset maintenance, and custom API connectors syncing bi-directionally with QuickBooks, Xero, Zoho, and ZATCA e-invoicing compliance portals. PulseKart (pharmacy point-of-sale and expiry tracking) and SanadOS (facilities asset and work-order management) are two systems built on this same approach.",
      ar: "تبني أرانطو أنظمة إدارة علاقات العملاء (CRM) وتخطيط الموارد (ERP) المخصصة المصممة حول مسارات عملك الحقيقية باستخدام Next.js وPostgreSQL، بدلاً من إجبار الشركات على تغيير عملياتها لتناسب منصة جاهزة. يمكن أن تشمل الأنظمة مسارات الفوترة وتتبع صلاحية المخزون وصيانة الأصول وموصلات API مخصصة تُزامن مع QuickBooks وXero وZoho ومنصات فوترة زاتكا. PulseKart (نقاط بيع وتتبع صلاحية للصيدليات) وSanadOS (إدارة أصول وأوامر عمل للمرافق) نظامان مبنيان بهذا النهج نفسه.",
    },
    overview: {
      en: [
        "Generic CRMs are often bloated with features you never use while missing the exact workflow rules your team needs daily.",
        "Arranto builds lean, custom management software tailored to your specific business logic—whether managing pharmacy inventory (like PulseKart), facility assets (like SanadOS), or real-time compliance clearance (like FATOORA Lite)."
      ],
      ar: [
        "غالباً ما تكون أنظمة CRM العامة مليئة بخصائص غير مستخدمة بينما تفتقر لآليات العمل اليومية لضمان الإنتاجية.",
        "تبني أرانطو برمجيات مخصصة تناسب طبيعة عملك — مثل إدارة الصيدليات أو المرافق أو الخدمات اللوجستية."
      ]
    },
    features: {
      en: [
        { title: "Tailored Business Logic", desc: "Custom fields, status flows, and automation triggers built for your business." },
        { title: "Fast Day-to-Day Workflows", desc: "Built with Next.js and considered PostgreSQL queries for responsive operational screens." },
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
    faq: [
      {
        q: { en: "Can custom CRMs integrate with our existing accounting software?", ar: "هل يمكن ربط CRM المخصص مع برامج المحاسبة الحالية؟" },
        a: { en: "Yes. We build custom API connectors to sync data bi-directionally with QuickBooks, Xero, Zoho, and ZATCA compliance portals.", ar: "نعم. نبني موصلات API لمزامنة البيانات تلقائياً مع برامج المحاسبة وخصائص زاتكا." }
      },
      {
        q: { en: "Can you migrate data from spreadsheets or an older CRM?", ar: "هل يمكنكم نقل البيانات من جداول البيانات أو نظام CRM قديم؟" },
        a: { en: "Yes, after checking the structure, duplicates, missing fields, and historical records. Migration is planned with a validation pass so the team can compare important totals before switching over.", ar: "نعم، بعد فحص الهيكل والتكرارات والحقول الناقصة والسجلات التاريخية. يتم تخطيط النقل مع مرحلة تحقق حتى يتمكن الفريق من مقارنة الأرقام المهمة قبل الانتقال." }
      },
      {
        q: { en: "Can a custom CRM support different roles and approval steps?", ar: "هل يمكن لنظام CRM مخصص دعم الأدوار المختلفة وخطوات الموافقة؟" },
        a: { en: "Yes. Roles, permissions, ownership, approval states, and audit history are defined around the real workflow instead of forcing the team into a generic sales pipeline.", ar: "نعم. يتم تعريف الأدوار والصلاحيات والملكية وحالات الموافقة وسجل التدقيق حول مسار العمل الحقيقي بدلاً من إجبار الفريق على مسار مبيعات عام." }
      },
      {
        q: { en: "Will the system work for field teams on phones and tablets?", ar: "هل سيعمل النظام لفرق العمل الميدانية على الهواتف والأجهزة اللوحية؟" },
        a: { en: "It can be designed for field use with responsive forms, quick status updates, attachment handling, and clear offline expectations. The right approach depends on connectivity, device policy, and the team's daily tasks.", ar: "يمكن تصميمه للاستخدام الميداني مع نماذج متجاوبة وتحديثات سريعة للحالة وإدارة المرفقات وتوقعات واضحة بشأن العمل دون اتصال. يعتمد الحل المناسب على الاتصال وسياسة الأجهزة والمهام اليومية للفريق." }
      },
      {
        q: { en: "What reports can a custom CRM or ERP provide?", ar: "ما هي التقارير التي يمكن أن يوفرها نظام CRM أو ERP مخصص؟" },
        a: { en: "Reports should follow the decisions your team makes: pipeline health, inventory, service work, overdue tasks, revenue, or operational bottlenecks. We define the important questions before building dashboards so the reports stay useful.", ar: "يجب أن تتبع التقارير القرارات التي يتخذها فريقك مثل حالة المبيعات والمخزون وأعمال الخدمة والمهام المتأخرة والإيرادات والاختناقات التشغيلية. نحدد الأسئلة المهمة قبل بناء لوحات المعلومات حتى تظل التقارير مفيدة." }
      },
      {
        q: { en: "Can a CRM project support Saudi or India-specific tax workflows?", ar: "هل يمكن لمشروع CRM دعم مسارات الضرائب الخاصة بالسعودية أو الهند؟" },
        a: { en: "Potentially, when the required rules and integrations are confirmed during discovery. Tax and regulatory behavior must be reviewed against the client's current obligations; the software should not be treated as legal or tax advice.", ar: "يمكن ذلك عند تأكيد القواعد والتكاملات المطلوبة خلال مرحلة الاكتشاف. يجب مراجعة السلوك الضريبي والتنظيمي مقابل التزامات العميل الحالية، ولا ينبغي اعتبار البرنامج استشارة قانونية أو ضريبية." }
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
      en: "High-Performance Website Development by Arranto builds bespoke, conversion-focused web applications and marketing platforms. Using Next.js Server-Side Rendering (SSR), Vanilla CSS design systems, and GSAP micro-animations, Arranto designs around Core Web Vitals, crawlable content, Arabic/English localization, and accurate Schema.org markup. The goal is a fast, understandable website that supports search visibility and qualified inquiries.",
      ar: "تبني أرانطو مواقع وتطبيقات ويب عالية الأداء تركز على زيادة التحويل والأداء. باستخدام SSR وأنظمة التصميم الحديثة، تحقق مواقعنا نتائج استثنائية في سرعة التحميل وتوافق محركات البحث.",
    },
    overview: {
      en: [
        "A slow, generic website damages brand credibility and loses valuable leads. Arranto constructs modern, weightless web interfaces designed to captivate visitors and convert inquiries into paying clients.",
        "With server-side rendering, carefully tested page transitions, and attention to Core Web Vitals, your site can provide a faster and clearer experience for visitors and search crawlers."
      ],
      ar: [
        "الموقع البطيء يضر بسمعة العلامة التجارية ويؤدي لخسارة العملاء. تبني أرانطو واجهات ويب حديثة وسريعة تحول الزوار إلى عملاء فعليين.",
        "مع العرض المباشر من السيرفر (SSR) وسرعة التنقل، يعمل موقعك كـمحرك نمو دائم لأعمالك."
      ]
    },
    features: {
      en: [
        { title: "Core Web Vitals Focus", desc: "LCP, CLS, and INP are treated as measurable performance constraints during implementation." },
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
    faq: [
      {
        q: { en: "What technologies do you use for website development?", ar: "ما هي التقنيات المستخدمة في تطوير المواقع؟" },
        a: { en: "We use Next.js, React, TypeScript, Vanilla CSS, and GSAP when they fit the brief. We avoid unnecessary page-builder weight and validate performance and security against the actual project requirements.", ar: "نستخدم Next.js وReact وTypeScript وVanilla CSS وGSAP عندما تناسب المتطلبات. نتجنب الوزن غير الضروري لأدوات بناء المواقع ونتحقق من الأداء والأمان وفقاً لمتطلبات المشروع الفعلية." }
      },
      {
        q: { en: "Will SEO and technical accessibility be included from the start?", ar: "هل سيتم تضمين SEO وإمكانية الوصول التقنية من البداية؟" },
        a: { en: "Yes. Page structure, metadata, canonical URLs, localization, performance budgets, and crawlable text should be considered while the site is designed, not added after launch as a patch.", ar: "نعم. يجب التفكير في هيكل الصفحات والبيانات الوصفية والروابط الأساسية والتعريب وميزانية الأداء والنص القابل للزحف أثناء التصميم، وليس إضافتها بعد الإطلاق كحل مؤقت." }
      },
      {
        q: { en: "Can you build an Arabic and English website with proper RTL support?", ar: "هل يمكنكم بناء موقع عربي وإنجليزي مع دعم صحيح للكتابة من اليمين إلى اليسار؟" },
        a: { en: "Yes. Arabic is treated as a real layout and content requirement: direction, spacing, typography, navigation, metadata, and translated page copy are checked separately from English.", ar: "نعم. يتم التعامل مع العربية كمتطلب حقيقي للتخطيط والمحتوى، بما في ذلك الاتجاه والمسافات والخطوط والتنقل والبيانات الوصفية وترجمة محتوى الصفحات." }
      },
      {
        q: { en: "Do we need a CMS for the website?", ar: "هل نحتاج إلى نظام إدارة محتوى للموقع؟" },
        a: { en: "Not necessarily. A CMS is useful when a team publishes regularly, while a code-based content model can be simpler for a smaller set of carefully maintained pages. The choice follows your publishing workflow.", ar: "ليس بالضرورة. يفيد نظام إدارة المحتوى عندما ينشر الفريق بشكل متكرر، بينما قد يكون نموذج المحتوى البرمجي أبسط لعدد صغير من الصفحات التي تتم صيانتها بعناية. يعتمد الاختيار على طريقة النشر لديكم." }
      },
      {
        q: { en: "How do you measure whether the new site is successful?", ar: "كيف تقيسون نجاح الموقع الجديد؟" },
        a: { en: "We agree on the important outcomes first, such as qualified inquiries, completed actions, search visibility, accessibility, and page performance. Analytics events are then connected to those outcomes instead of tracking everything without a decision behind it.", ar: "نتفق أولاً على النتائج المهمة مثل الاستفسارات المؤهلة والإجراءات المكتملة والظهور في البحث وإمكانية الوصول وأداء الصفحة. ثم نربط أحداث التحليلات بهذه النتائج بدلاً من تتبع كل شيء دون قرار واضح." }
      },
      {
        q: { en: "What happens after the website is launched?", ar: "ماذا يحدث بعد إطلاق الموقع؟" },
        a: { en: "The handover can include deployment access, content guidance, analytics notes, technical documentation, and a list of recommended follow-up improvements. Maintenance can be scoped separately around your release and content needs.", ar: "يمكن أن يشمل التسليم صلاحيات التشغيل وإرشادات المحتوى وملاحظات التحليلات والتوثيق التقني وقائمة بالتحسينات المقترحة. ويمكن تحديد الصيانة بشكل منفصل حسب احتياجات الإصدارات والمحتوى." }
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
      en: "Digital Marketing & Growth Engineering by Arranto provides technical SEO, content strategy, and targeted campaign optimisation for B2B brands in the Gulf region. Technical SEO improvements typically show indexation changes within 1 to 2 weeks, with measurable organic keyword movement compounding over 2 to 4 months. Work is grounded in crawl/indexation audits, Schema.org graph architecture, and Search Console/analytics data tied directly to qualified inquiries — not just ranking positions.",
      ar: "تقدم أرانطو خدمات التسويق الرقمي وهندسة النمو، بما في ذلك تحسين محركات البحث التقني واستراتيجيات المحتوى وتحسين الحملات المستهدفة للعلامات التجارية B2B في الخليج. تظهر تحسينات SEO التقنية عادة تغيرات في الفهرسة خلال أسبوع إلى أسبوعين، مع تحرك ملحوظ في ترتيب الكلمات المفتاحية يتراكم خلال 2 إلى 4 أشهر. يعتمد العمل على تدقيق الزحف والفهرسة، وبنية بيانات Schema.org المنظمة، وربط بيانات Search Console والتحليلات مباشرة بالاستفسارات المؤهلة — لا مواضع الترتيب فقط.",
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
    faq: [
      {
        q: { en: "How quickly can we see organic search growth?", ar: "ما هي الفترة المتوقعة لرؤية نتائج النمو في محركات البحث؟" },
        a: { en: "Technical SEO improvements show indexation updates within 1 to 2 weeks, with significant organic keyword movement compound over 2 to 4 months.", ar: "تظهر التحسينات التقنية خلال أسبوع إلى أسبوعين، مع نمو ملحوظ في الترتيب خلال 2 إلى 4 أشهر." }
      },
      {
        q: { en: "What does a technical SEO engagement include?", ar: "ماذا يتضمن عمل SEO التقني؟" },
        a: { en: "It can include crawl checks, indexation, canonicals, redirects, metadata, structured data, internal links, performance, analytics measurement, and a practical content plan. The exact scope follows the site's current problems and business goals.", ar: "يمكن أن يشمل فحص الزحف والفهرسة والروابط الأساسية وإعادة التوجيه والبيانات الوصفية والبيانات المنظمة والروابط الداخلية والأداء وقياس التحليلات وخطة محتوى عملية. يعتمد النطاق الدقيق على مشاكل الموقع وأهداف العمل الحالية." }
      },
      {
        q: { en: "Can you support SEO for Saudi Arabia, the US, and India?", ar: "هل يمكنكم دعم SEO للسعودية والولايات المتحدة والهند؟" },
        a: { en: "Yes, when the target markets, service capability, language, and proof are defined clearly. We build regional pages and content around real search intent instead of copying the same claims onto every country page.", ar: "نعم، عند تحديد الأسواق والقدرات واللغة والأدلة بوضوح. نبني الصفحات والمحتوى الإقليمي حول نية البحث الحقيقية بدلاً من تكرار الادعاءات نفسها في كل صفحة دولة." }
      },
      {
        q: { en: "How do GEO and AEO fit into a normal SEO plan?", ar: "كيف يتكامل GEO وAEO مع خطة SEO العادية؟" },
        a: { en: "They are treated as content and discoverability goals, not magic ranking switches. Clear answers, evidence, strong page structure, internal links, accurate schema, and credible references make a site easier for both search systems and answer systems to understand.", ar: "يتم التعامل معهما كأهداف للمحتوى وقابلية الاكتشاف، وليس كمفاتيح سحرية للترتيب. تساعد الإجابات الواضحة والأدلة وهيكل الصفحة والروابط الداخلية والبيانات المنظمة الدقيقة والمراجع الموثوقة أنظمة البحث والإجابة على فهم الموقع." }
      },
      {
        q: { en: "Can AI help us create content without making the site generic?", ar: "هل يمكن للذكاء الاصطناعي مساعدتنا في إنشاء المحتوى دون جعل الموقع عاماً؟" },
        a: { en: "Yes, when it supports research, outlining, editing, and repurposing rather than replacing first-hand expertise. Human review, original examples, accurate claims, and a clear author or business point of view remain essential.", ar: "نعم، عندما يساعد في البحث وتخطيط المحتوى والتحرير وإعادة الاستخدام بدلاً من استبدال الخبرة المباشرة. تظل المراجعة البشرية والأمثلة الأصلية والادعاءات الدقيقة ووجهة نظر الكاتب أو الشركة الواضحة ضرورية." }
      },
      {
        q: { en: "How will we know whether SEO is producing business results?", ar: "كيف نعرف أن SEO يحقق نتائج تجارية؟" },
        a: { en: "We connect Search Console and analytics data to qualified inquiries, contact actions, tool usage, and other agreed outcomes. Rankings are useful diagnostics, but they are not the only measure of growth.", ar: "نربط بيانات Search Console والتحليلات بالاستفسارات المؤهلة وإجراءات التواصل واستخدام الأدوات والنتائج المتفق عليها. الترتيب مفيد للتشخيص، لكنه ليس المقياس الوحيد للنمو." }
      }
    ]
  }
];

serviceDetails.push({
  slug: "custom-software-development",
  title: {
    en: "Custom Software Development",
    ar: "تطوير البرمجيات المخصصة",
  },
  subtitle: {
    en: "Software built for how your business actually runs, not reshaped to fit a template. Full ownership of the schema, the code, and the deployment — from a studio that ships in weeks, not quarters.",
    ar: "برمجيات مبنية لطريقة عمل منشأتك الفعلية، لا معاد تشكيلها لتناسب قالبًا جاهزًا. ملكية كاملة للمخطط والكود والتشغيل — من استوديو يُسلّم خلال أسابيع لا فصول.",
  },
  citablePassage: {
    en: "Arranto builds custom software — point-of-sale systems, CRM/ERP platforms, e-invoicing engines, and internal operations tools — designed around how a specific business actually works, rather than retrofitted onto commercial off-the-shelf software. Founded in 2017 as Smile Fotilo and rebranded Arranto, the studio is run by one engineer, Ashraf Kamal, who owns every project end to end: schema design, backend logic, interface, deployment, and post-launch support. Delivered work includes PulseKart (pharmacy point-of-sale and inventory on Next.js, Node, and Postgres) and Veloria Vault (a headless Next.js commerce migration), alongside two in-pilot builds — SanadOS (facilities operations on React and Supabase) and FATOORA Lite (ZATCA-compliant e-invoicing with cryptographic stamping). Custom software projects typically run 6 to 14 weeks depending on scope, agreed before code begins.",
    ar: "تبني أرانطو برمجيات مخصصة — أنظمة نقاط بيع، ومنصات CRM وERP، ومحركات فوترة إلكترونية، وأدوات تشغيل داخلية — مصممة حول طريقة عمل منشأة محددة فعليًا، لا معاد تكييفها فوق برمجيات جاهزة. تأسس الاستوديو عام 2017 باسم Smile Fotilo قبل إعادة تسميته أرانطو، ويديره مهندس واحد، أشرف كمال، يمتلك كل مشروع من البداية للنهاية: تصميم المخطط، ومنطق الخلفية، والواجهة، والتشغيل، والدعم بعد الإطلاق. من الأعمال المُسلّمة: PulseKart (نقاط بيع ومخزون للصيدليات على Next.js وNode وPostgres) وVeloria Vault (ترحيل متجر إلى Next.js بلا واجهة)، إضافة إلى مشروعين قيد التجربة — SanadOS (عمليات مرافق على React وSupabase) وFATOORA Lite (فوترة إلكترونية متوافقة مع زاتكا بختم تشفيري). تستغرق مشاريع البرمجيات المخصصة عادة من 6 إلى 14 أسبوعًا حسب النطاق، متفق عليها قبل بدء الكود.",
  },
  overview: {
    en: [
      "Off-the-shelf software is built for the average case of a category, then sold to everyone in it. It works until your business does something the template didn't anticipate — a workflow, a compliance requirement, an integration — at which point you're either paying for a bigger plan you don't need or building a workaround on top of software you don't control.",
      "Custom software development means the schema, the logic, and the interface get designed for what your business specifically does, owned by you outright, with no per-seat pricing, no vendor lock-in, and no feature roadmap decided by someone else's other customers. It costs more upfront than a subscription and takes longer than signing up for a SaaS tool. It's the right call when the workaround has already gotten more expensive than the build would be.",
    ],
    ar: [
      "تُبنى البرمجيات الجاهزة للحالة المتوسطة في فئة معينة، ثم تُباع للجميع فيها. تعمل جيدًا حتى تفعل منشأتك شيئًا لم يتوقعه القالب — مسار عمل، أو متطلب امتثال، أو تكامل معين — عندها إما تدفع مقابل خطة أكبر لا تحتاجها، أو تبني حلاً بديلاً فوق برمجية لا تملكها.",
      "يعني تطوير البرمجيات المخصصة أن يُصمم المخطط والمنطق والواجهة لما تقوم به منشأتك تحديدًا، وتملكه بالكامل، دون تسعير لكل مستخدم، ودون ارتهان لمزود، ودون خارطة طريق يقررها عملاء آخرون غيرك. تكلفته الأولية أعلى من الاشتراك ووقته أطول من التسجيل في أداة SaaS جاهزة. إنه الخيار الصحيح حين يصبح الحل البديل أغلى بالفعل من البناء نفسه.",
    ],
  },
  features: {
    en: [
      { title: "One Engineer, Every Layer", desc: "Schema, backend, interface, and deployment owned by the same person on every project — no handoff between specialists, no context lost." },
      { title: "You Own the Repository", desc: "Full GitHub repo, database migrations, and deployment scripts transferred at handover. No recurring platform fee owed to Arranto." },
      { title: "Real Stack, Chosen Per Project", desc: "Postgres for transactional data (PulseKart), Supabase for real-time systems (SanadOS), custom crypto/XML modules where compliance demands it (FATOORA Lite) — the stack follows the problem." },
      { title: "Validated at Every Boundary", desc: "Zod schema validation on every mutation endpoint, rate limiting on every public POST route, security headers configured by default — not added after an incident." },
      { title: "Bilingual by Default", desc: "Arabic and English interfaces, RTL layout, and localized content are part of the base build for Gulf-market projects, not a paid add-on." },
      { title: "Fixed Scope, Fixed Timeline", desc: "6–14 weeks for a typical custom build, agreed in writing before code begins — not an open-ended hourly engagement." },
    ],
    ar: [
      { title: "مهندس واحد، كل طبقة", desc: "المخطط والخلفية والواجهة والتشغيل يمتلكها الشخص نفسه في كل مشروع — دون تسليم بين أخصائيين، ودون فقدان للسياق." },
      { title: "تملك المستودع بالكامل", desc: "تسليم كامل لمستودع GitHub وترحيلات قاعدة البيانات وسكريبتات التشغيل عند التسليم. دون أي رسوم منصة متكررة لأرانطو." },
      { title: "تقنيات حقيقية تُختار لكل مشروع", desc: "Postgres للبيانات التبادلية (PulseKart)، وSupabase للأنظمة اللحظية (SanadOS)، ووحدات تشفير وXML مخصصة حين يتطلب الامتثال ذلك (FATOORA Lite) — تتبع التقنية طبيعة المشكلة." },
      { title: "تحقق عند كل حد", desc: "تحقق Zod من المخطط عند كل نقطة تعديل، وحدود معدل طلبات على كل مسار POST عام، ورؤوس أمان مُهيّأة افتراضيًا — لا تُضاف بعد وقوع حادثة." },
      { title: "ثنائي اللغة افتراضيًا", desc: "واجهات عربية وإنجليزية، وتخطيط RTL، ومحتوى محلي جزء من البناء الأساسي لمشاريع السوق الخليجي، لا إضافة مدفوعة." },
      { title: "نطاق وجدول ثابتان", desc: "من 6 إلى 14 أسبوعًا للبناء المخصص المعتاد، متفق عليه كتابيًا قبل بدء الكود — لا تعاقد مفتوح بالساعة." },
    ],
  },
  gulfCompliance: {
    en: "Custom builds for Gulf-market clients include Arabic/English localization and RTL layout by default, and — where the project requires it, as with FATOORA Lite — direct integration with regional regulatory systems like ZATCA.",
    ar: "تشمل المشاريع المخصصة لعملاء السوق الخليجي التوطين العربي/الإنجليزي وتخطيط RTL افتراضيًا، وحيث يتطلب المشروع ذلك — كما في FATOORA Lite — تكاملًا مباشرًا مع الأنظمة التنظيمية الإقليمية مثل زاتكا.",
  },
  faq: [
    {
      q: { en: "How is custom software development different from hiring a full-stack developer?", ar: "ما الفرق بين تطوير البرمجيات المخصصة والتعاقد مع مطوّر شامل؟" },
      a: { en: "Custom software development is the commercial category — what you're buying. Full-stack development is the technical discipline that delivers it correctly, covering frontend, backend, database, and deployment as one accountable body of work rather than a title on a freelancer's profile.", ar: "تطوير البرمجيات المخصصة هو الفئة التجارية — ما تشتريه. أما التطوير الشامل فهو الانضباط التقني الذي يُنفّذه بشكل صحيح، ويغطي الواجهة والخلفية وقاعدة البيانات والتشغيل كعمل واحد مسؤول عنه طرف واحد، لا مجرد مسمى في ملف مستقل." }
    },
    {
      q: { en: "What does custom software typically cost?", ar: "كم تكلف البرمجيات المخصصة عادة؟" },
      a: { en: "Scoped per project rather than published as a flat rate — it depends on the number of user roles, integrations, and data complexity. The honest driver of cost is scope, not hours; a fixed price is agreed after scoping, before any code is written.", ar: "يُحدَّد النطاق لكل مشروع بدلًا من نشر سعر ثابت — يعتمد على عدد أدوار المستخدمين والتكاملات وتعقيد البيانات. المحرك الحقيقي للتكلفة هو النطاق لا الساعات؛ يُتفق على سعر ثابت بعد تحديد النطاق وقبل كتابة أي كود." }
    },
    {
      q: { en: "Can you take over a project another developer or agency started?", ar: "هل يمكنكم استكمال مشروع بدأه مطوّر أو وكالة أخرى؟" },
      a: { en: "Yes, after an assessment of the existing code — what's worth keeping, what needs rebuilding, and why. Inheriting a partially-built system usually needs more architectural judgment than starting clean, not less, so this is scoped as its own first step.", ar: "نعم، بعد تقييم الكود الحالي — ما يستحق الإبقاء عليه، وما يحتاج إعادة بناء، ولماذا. غالبًا ما يتطلب توريث نظام غير مكتمل حكمًا معماريًا أكبر من البدء من الصفر، لذلك يُحدَّد كخطوة أولى مستقلة." }
    },
    {
      q: { en: "Do I own the code after the project ships?", ar: "هل أملك الكود بعد إطلاق المشروع؟" },
      a: { en: "Yes — 100% of the GitHub repository, database schemas, and deployment scripts transfer at handover, with no recurring fee owed to Arranto and no dependency on a proprietary platform.", ar: "نعم — تُسلَّم 100٪ من مستودع GitHub وقواعد البيانات وسكريبتات التشغيل عند التسليم، دون أي رسوم متكررة لأرانطو ودون ارتباط بمنصة مملوكة لطرف آخر." }
    },
    {
      q: { en: "What happens after launch — is there ongoing support?", ar: "ماذا يحدث بعد الإطلاق — هل يوجد دعم مستمر؟" },
      a: { en: "You get a direct line to the person who built the system, not a ticket queue or a rotating account manager. Ongoing support is scoped separately once real usage patterns after launch are known.", ar: "تحصل على تواصل مباشر مع من بنى النظام، لا طابور تذاكر أو مدير حساب متغيّر. يُحدَّد الدعم المستمر بشكل منفصل بعد معرفة أنماط الاستخدام الفعلية بعد الإطلاق." }
    },
    {
      q: { en: "Why choose custom development over a SaaS tool that already does most of what I need?", ar: "لماذا اختيار تطوير مخصص بدلاً من أداة SaaS تغطي معظم ما أحتاجه؟" },
      a: { en: "If a SaaS tool covers what you need today at a price that scales sanely, it's usually the right call — custom software is for the specific gap that tool doesn't cover, not a wholesale replacement for every category of software a business runs.", ar: "إذا كانت أداة SaaS تغطي احتياجك الحالي بسعر يتوسع بشكل معقول، فهي غالبًا الخيار الصحيح — البرمجيات المخصصة مخصصة للفجوة المحددة التي لا تغطيها تلك الأداة، لا بديل شامل لكل فئة برمجية تستخدمها المنشأة." }
    },
    {
      q: { en: "Is custom software development safe for compliance-sensitive work like invoicing or tax reporting?", ar: "هل تطوير البرمجيات المخصصة آمن لأعمال حساسة للامتثال كالفوترة أو التقارير الضريبية؟" },
      a: { en: "It can be, when the compliance requirements are treated as first-class design constraints from the start — FATOORA Lite's cryptographic stamping and ZATCA clearance workflow is a real example of that, built into the architecture rather than bolted on afterward.", ar: "يمكن أن يكون كذلك، حين تُعامل متطلبات الامتثال كقيود تصميم أساسية من البداية — الختم التشفيري ومسار تخليص زاتكا في FATOORA Lite مثال حقيقي على ذلك، مبني في صميم البنية لا مضافًا لاحقًا." }
    },
    {
      q: { en: "How does this relate to full-stack development?", ar: "كيف يرتبط هذا بالتطوير الشامل؟" },
      a: { en: "Full-stack development is the discipline that makes custom software actually work end to end — see the full breakdown of what that means when you hire a studio rather than a single contractor.", ar: "التطوير الشامل هو الانضباط الذي يجعل البرمجيات المخصصة تعمل فعليًا من البداية للنهاية — راجع الشرح الكامل لما يعنيه ذلك عند التعاقد مع استوديو لا مقاول واحد." }
    }
  ],
  body: {
    en: [
      "### Why \"custom\" instead of off-the-shelf",
      "Every off-the-shelf tool is a bet that your business looks enough like everyone else's in its category. Sometimes that bet is right — accounting software, email, project trackers, most of what a business runs on doesn't need to be custom, and building it anyway would be a waste. The bet stops paying off at a specific, recognizable moment: when your team is exporting data from one system to manually re-enter it into another, when a \"customization\" from the vendor is actually a workaround with its own new bugs, or when the pricing tier you need exists mainly to fund the tool's other, unrelated features.",
      "<a href=\"/en/work/pulsekart\">PulseKart</a> exists because generic point-of-sale software treats a pharmacy like a general retailer — it doesn't understand expiry-batch tracking as a first-class concept, so pharmacies were bolting spreadsheets onto POS systems that were never built to talk to them. The custom build isn't more features for their own sake. It's the one feature that mattered, built correctly, instead of worked around badly.",
      "### What actually gets built",
      "Four real projects, four different reasons custom made sense.",
      "<a href=\"/en/work/pulsekart\">PulseKart</a> — point-of-sale and inventory for pharmacies, where a sale, a stock adjustment, and an expiry check are the same transaction, not three separate systems that need reconciling at close of day.",
      "<a href=\"/en/work/veloria-vault\">Veloria Vault</a> — a storefront migrated to headless Next.js so the site, the ad creatives, and the product content could be managed as one system instead of three loosely-connected tools fighting each other for the source of truth.",
      "<a href=\"/en/work/sanad-os\">SanadOS</a> — currently in pilot: facilities operations (assets, work orders, maintenance history) as one system of record, replacing a spreadsheet per building, which is exactly the kind of workaround that gets more expensive than a build the longer it runs.",
      "<a href=\"/en/work/fatoora-lite\">FATOORA Lite</a> — also in pilot: an e-invoicing engine built around Saudi Arabia's ZATCA Phase 2 clearance requirements, where the compliance logic (cryptographic stamping, CCSID onboarding, real-time clearance) has to be architecturally correct from day one, not something a generic accounting package can retrofit.",
      "### How the engagement actually works",
      "Scope gets defined before anything gets built: the user roles, the core workflow the system has to improve, and a short list of launch priorities. That scoping conversation is also where \"is this actually worth building custom\" gets a honest answer — sometimes it's a configured off-the-shelf tool, and saying so costs nothing.",
      "Once scope is fixed, a custom build typically runs 6–14 weeks depending on complexity, agreed in writing before code begins. One person carries the project through architecture, schema design, the interface, and deployment — see the <a href=\"/en/services\">full-stack development breakdown</a> for exactly what \"one person owning every layer\" means in practice and why it changes what gets shipped.",
      "### What ownership means at the end",
      "Handover includes deployment access, the full GitHub repository, database migrations, and documentation — not a login to a platform Arranto controls. If the relationship ends after launch, the software keeps running exactly as it did the day before. That's a deliberate design choice, not a courtesy: software a business depends on shouldn't depend on the studio that built it staying in business.",
      "### When custom software is the wrong call",
      "Worth stating plainly, since the honest answer sometimes points away from this page: if an off-the-shelf tool already covers the need at a price that scales sanely, that's usually the better call, and a custom build would just be a slower, more expensive way to reach the same result. Custom development earns its cost at the specific point where the workaround around a generic tool has gotten more expensive — in time, in errors, in data nobody trusts — than building the real thing would be."
    ].join("\n\n"),
    ar: [
      "### لماذا \"مخصص\" بدلاً من جاهز",
      "كل أداة جاهزة هي رهان بأن منشأتك تشبه بما يكفي بقية المنشآت في فئتها. أحيانًا يكون هذا الرهان صحيحًا — برمجيات المحاسبة، والبريد الإلكتروني، وأدوات تتبع المشاريع، معظم ما تعمل عليه المنشأة لا يحتاج أن يكون مخصصًا، وبناؤه رغم ذلك يكون هدرًا. يتوقف الرهان عن النجاح في لحظة محددة وواضحة: حين يُصدّر فريقك بيانات من نظام لإعادة إدخالها يدويًا في آخر، أو حين يكون \"التخصيص\" الذي يقدمه المزود حلاً بديلاً له أخطاؤه الجديدة، أو حين توجد الفئة السعرية التي تحتاجها أساسًا لتمويل ميزات أخرى للأداة لا علاقة لها بك.",
      "<a href=\"/ar/work/pulsekart\">PulseKart</a> وُجد لأن برمجيات نقاط البيع العامة تتعامل مع الصيدلية كمتجر تجزئة عادي — لا تفهم تتبع دفعات الصلاحية كمفهوم أساسي، لذا كانت الصيدليات تُلحق جداول بيانات بأنظمة نقاط بيع لم تُبنَ أصلًا للتواصل معها. البناء المخصص ليس ميزات إضافية لذاتها. إنه الميزة الوحيدة التي كانت مهمة، مبنية بشكل صحيح، بدلاً من حل بديل سيئ.",
      "### ما الذي يُبنى فعليًا",
      "أربعة مشاريع حقيقية، أربعة أسباب مختلفة جعلت التخصيص منطقيًا.",
      "<a href=\"/ar/work/pulsekart\">PulseKart</a> — نقاط بيع ومخزون للصيدليات، حيث تكون عملية البيع وتعديل المخزون وفحص الصلاحية معاملة واحدة، لا ثلاثة أنظمة منفصلة تحتاج تسوية عند الإغلاق.",
      "<a href=\"/ar/work/veloria-vault\">Veloria Vault</a> — متجر رُحّل إلى Next.js بلا واجهة ليُدار الموقع والإبداعات الإعلانية والمحتوى المنتجي كنظام واحد بدلاً من ثلاث أدوات متصلة بشكل ضعيف تتنافس على مصدر الحقيقة.",
      "<a href=\"/ar/work/sanad-os\">SanadOS</a> — قيد التجربة حاليًا: عمليات المرافق (الأصول، أوامر العمل، سجل الصيانة) كنظام سجل موحد، يحل محل جدول بيانات لكل مبنى، وهذا بالضبط نوع الحل البديل الذي يزداد تكلفة كلما طال استمراره.",
      "<a href=\"/ar/work/fatoora-lite\">FATOORA Lite</a> — قيد التجربة أيضًا: محرك فوترة إلكترونية مبني حول متطلبات المرحلة الثانية لزاتكا في السعودية، حيث يجب أن يكون منطق الامتثال (الختم التشفيري، تسجيل CCSID، التخليص اللحظي) صحيحًا معماريًا منذ اليوم الأول، لا شيئًا تضيفه حزمة محاسبة عامة لاحقًا.",
      "### كيف يسير التعاقد فعليًا",
      "يُحدَّد النطاق قبل بناء أي شيء: أدوار المستخدمين، ومسار العمل الأساسي الذي يجب أن يُحسّنه النظام، وقائمة قصيرة بأولويات الإطلاق. هذا النقاش هو أيضًا حيث تُجاب بصدق سؤال \"هل يستحق هذا فعلًا بناءً مخصصًا\" — أحيانًا يكون الجواب أداة جاهزة مُهيّأة، وقول ذلك لا يكلف شيئًا.",
      "بعد تثبيت النطاق، يستغرق البناء المخصص عادة من 6 إلى 14 أسبوعًا حسب التعقيد، متفق عليه كتابيًا قبل بدء الكود. يتولى شخص واحد المشروع عبر التصميم المعماري وتصميم المخطط والواجهة والتشغيل — راجع <a href=\"/ar/services\">شرح التطوير الشامل</a> لمعرفة ما يعنيه \"شخص واحد يمتلك كل طبقة\" عمليًا ولماذا يغيّر ذلك ما يُسلَّم.",
      "### ماذا تعني الملكية في النهاية",
      "يشمل التسليم صلاحيات التشغيل، ومستودع GitHub الكامل، وترحيلات قاعدة البيانات، والتوثيق — لا تسجيل دخول لمنصة تتحكم بها أرانطو. إذا انتهت العلاقة بعد الإطلاق، يستمر النظام بالعمل تمامًا كما كان في اليوم السابق. هذا خيار تصميم مقصود، لا مجاملة: البرمجية التي تعتمد عليها منشأة لا ينبغي أن تعتمد على استمرار الاستوديو الذي بناها في العمل.",
      "### متى يكون البناء المخصص خيارًا خاطئًا",
      "يستحق القول بوضوح، لأن الجواب الصادق يشير أحيانًا بعيدًا عن هذه الصفحة: إذا كانت أداة جاهزة تغطي الحاجة بالفعل بسعر يتوسع بشكل معقول، فهذا عادة الخيار الأفضل، وسيكون البناء المخصص مجرد طريقة أبطأ وأغلى للوصول للنتيجة نفسها. يستحق التطوير المخصص تكلفته في اللحظة التي يصبح فيها الحل البديل حول أداة جاهزة أغلى — من حيث الوقت والأخطاء والبيانات التي لا يثق بها أحد — من بناء الشيء الحقيقي."
    ].join("\n\n"),
  },
});

export const getServiceBySlug = (slug: string) =>
  serviceDetails.find((s) => s.slug === slug);

export const services = serviceDetails;
export type Service = ServiceDetail;
