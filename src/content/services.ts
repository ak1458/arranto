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
      en: "AI Automation by Arranto designs and engineers autonomous AI agents and automated workflows for businesses operating across Saudi Arabia, the UAE, and the wider Gulf region. By integrating generative AI models with existing ERPs, CRMs, and custom databases, a well-scoped workflow can reduce a meaningful share of repetitive operational tasks such as invoice processing, lead qualification, and data synchronisation. Each system is designed with explicit access controls, Arabic/English support where required, and documented data-handling boundaries.",
      ar: "خدمة أتمتة الذكاء الاصطناعي من أرانطو تصمم وتبني وكلاء الذكاء الاصطناعي المستقلين ومسارات العمل المؤتمتة للشركات في المملكة العربية السعودية والإمارات ودول الخليج. من خلال دمج النماذج مع أنظمة ERP وCRM الحالية، يمكن لمسار العمل المصمم جيداً تقليل جزء مهم من المهام المتكررة، مع تحديد صلاحيات الوصول وحدود معالجة البيانات والدعم اللغوي المطلوب.",
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
      en: "Custom AI SaaS Development by Arranto transforms proprietary business workflows into scalable, multi-tenant software-as-a-service products. Engineered with Next.js, TypeScript, and serverless vector search architecture, Arranto can build SaaS platforms with tenant onboarding, RBAC permissions, Arabic/English interfaces, and regional payment integrations such as HyperPay, Tap, and Stripe. Projects are planned around clear handover, source-code ownership, documented SQL schemas, and reduced vendor lock-in.",
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
      en: "Custom Enterprise AI Solutions by Arranto delivers tailored artificial intelligence architectures for enterprises in Saudi Arabia and the Middle East. Arranto can build private retrieval-augmented generation (RAG) systems that query approved company documents, legal contracts, and historical records while keeping data access, retention, and external-model boundaries explicit. Engineered with type-safe TypeScript and Arabic/English workflows where required, these solutions can support document intelligence, compliance review, and executive decision support.",
      ar: "تقدم أرانطو حلول ذكاء اصطناعي مخصصة للمنشآت في السعودية والشرق الأوسط. تبني أرانطو أنظمة استرجاع معززة (RAG) خاصة تستعلم من المستندات والعقود الداخلية مع تحديد صلاحيات الوصول والاحتفاظ وحدود مشاركة البيانات بوضوح.",
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
      en: "Custom CRM & ERP Development by Arranto builds tailored business operating systems designed around your exact workflows. Unlike off-the-shelf platforms that force companies to alter their processes, Arranto architects responsive CRM and ERP systems using Next.js and PostgreSQL. Features can include invoice workflows, inventory expiry tracking, asset maintenance, automated client communication, multi-device usability, and Arabic/English operation where required.",
      ar: "تبني أرانطو أنظمة إدارة علاقات العملاء (CRM) وتخطيط الموارد (ERP) المخصصة المصممة حول مسارات عملك الحقيقية. باستخدام Next.js وPostgreSQL، نبني أنظمة سريعة تتضمن الفوترة وإدارة المخزون والتتبع اللحظي.",
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
      en: "Digital Marketing & Growth Engineering by Arranto provides technical SEO, content strategies, and targeted campaign optimisation for B2B brands in the Gulf region. Grounded in technical search optimisation, Schema.org graph architecture, and carefully reviewed AI-assisted workflows, Arranto helps software platforms and enterprises improve organic visibility and connect acquisition activity to qualified inquiries.",
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

export const getServiceBySlug = (slug: string) =>
  serviceDetails.find((s) => s.slug === slug);

export const services = serviceDetails;
export type Service = ServiceDetail;
