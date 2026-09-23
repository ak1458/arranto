export type Locale = "en" | "ar";

export type JobDetail = {
  slug: string;
  id: string;
  status: "open" | "closed";
  title: Record<Locale, string>;
  department: Record<Locale, string>;
  departmentKey: "engineering" | "marketing" | "design" | "sales";
  location: Record<Locale, string>;
  employmentType: Record<Locale, string>;
  experience: Record<Locale, string>;
  compensation?: Record<Locale, string>;
  summary: Record<Locale, string>;
  aboutRole: Record<Locale, string[]>;
  responsibilities: Record<Locale, { title: string; items: string[] }[]>;
  technologiesOrSkills: Record<Locale, { category: string; items: string[] }[]>;
  requirements: Record<Locale, string[]>;
  whatWeOffer: Record<Locale, string[]>;
  whoShouldApply?: Record<Locale, string[]>;
  importantNote?: Record<Locale, string>;
  screening: {
    experienceOptions: string[];
    q1Label: string;
    q1Options: string[];
    q2Label: string;
    q2Options: string[];
    scenarioTitle: string;
    scenarioQuestion: string;
    scenarioPlaceholder: string;
  };
};

export const jobPostings: JobDetail[] = [
  // ── 1. ACTIVE: SENIOR FULL-STACK ENGINEER ──
  {
    slug: "full-stack-engineer",
    id: "ARRANTO-ENG-02",
    status: "open",
    title: {
      en: "Senior Full-Stack Engineer – Modern Web Systems, Next.js & Cloud Architecture",
      ar: "مهندس برمجيات متكامل أول (Senior Full-Stack) – تطبيقات الويب الحديثة والحوسبة السحابية",
    },
    department: {
      en: "Engineering & Systems Architecture",
      ar: "الهندسة وبنية الأنظمة البرمجية",
    },
    departmentKey: "engineering",
    location: {
      en: "100% Remote (Worldwide)",
      ar: "عن بُعد 100% (عالمياً)",
    },
    employmentType: {
      en: "Full-Time",
      ar: "دوام كامل",
    },
    experience: {
      en: "3+ Years Professional Experience (Required)",
      ar: "3+ سنوات من الخبرة المهنية (مطلوب)",
    },
    compensation: {
      en: "Competitive Global Base + Performance Bonuses",
      ar: "راتب عالمي تنافسي + مكافآت أداء سنوية",
    },
    summary: {
      en: "Arranto is seeking an accomplished Senior Full-Stack Engineer with 3+ years of production experience to architect, build, and optimize high-throughput web applications, serverless systems, and scalable enterprise platforms using Next.js, TypeScript, Node.js, and cloud databases.",
      ar: "تبحث أرانتو عن مهندس برمجيات متكامل أول يمتلك خبرة إنتاجية لا تقل عن 3 سنوات لتصميم وبناء وتطوير تطبيقات الويب عالية الأداء والأنظمة السحابية الموسعة باستخدام Next.js و TypeScript و Node.js وقواعد البيانات الحديثة.",
    },
    aboutRole: {
      en: [
        "At Arranto, we engineer bespoke digital products and resilient software architectures for fast-growing businesses and enterprise clients across the globe.",
        "As a Senior Full-Stack Engineer, you will take end-to-end ownership of system architecture, front-end performance, robust backend APIs, and distributed cloud deployment.",
        "You will design scalable database schemas, implement asynchronous queues, write clean typed interfaces, and ensure maximum reliability and sub-second load times.",
        "We value high-velocity autonomous engineers who write self-documenting code, care deeply about developer experience, and deliver production-grade systems without micromanagement."
      ],
      ar: [
        "في أرانتو، نقوم بهندسة منتجات رقمية مخصصة وبنى تحتية برمجية متينة تخدم كبرى الشركات والشركات الناشئة سريعة النمو حول العالم.",
        "بصفتك مهندس برمجيات متكامل أول، ستتولى المسؤولية الكاملة عن المعمارية البرمجية، وأداء الواجهات، وواجهات برمجة التطبيقات الخلفية، والنشر السحابي الموزع.",
        "ستقوم بتصميم مخططات قواعد بيانات متقدمة، وتنفيذ طوابير المعالجة غير المتزامنة، وكتابة أكواد نظيفة تضمن استقرار النظام وسرعة استجابة فائقة.",
        "نقدر المهندسين الذين يتمتعون باستقلالية عالية، ويهتمون بجودة الكود وتجربة المطور، ويبنون أنظمة موثوقة جاهزة لبيئة الإنتاج."
      ],
    },
    responsibilities: {
      en: [
        {
          title: "Full-Stack Architecture & Development",
          items: [
            "Architect and build high-performance web applications using Next.js (App Router, Server Components, Server Actions) and React 19.",
            "Develop robust, well-typed REST and GraphQL backend services in TypeScript and Node.js with strict validation and error boundaries.",
            "Design scalable relational database models (PostgreSQL, Prisma, Supabase) and optimize indexing, connection pooling, and complex queries.",
            "Implement resilient caching layers with Redis, edge routing, and asynchronous background job queues."
          ]
        },
        {
          title: "Performance, Security & Code Quality",
          items: [
            "Audit and optimize Core Web Vitals (LCP, INP, CLS) to achieve consistent 95+ PageSpeed scores.",
            "Enforce strict enterprise security standards: CSRF/CORS protection, token-based auth, rate limiting, and encrypted data storage.",
            "Author comprehensive automated tests (unit, integration, and E2E) to maintain zero-regression deployments.",
            "Conduct structured peer code reviews, establishing best practices for type safety and architectural consistency."
          ]
        },
        {
          title: "DevOps & Cloud Infrastructure",
          items: [
            "Manage and optimize cloud deployments across Vercel, AWS, and Docker containerized environments.",
            "Build automated CI/CD deployment pipelines with automated linting, type-checking, and preview environments.",
            "Instrument real-time telemetry, structured logging, and APM tracing for production observability."
          ]
        }
      ],
      ar: [
        {
          title: "التطوير البرمجي وهندسة النظم",
          items: [
            "تصميم وبناء تطبيقات ويب عالية الأداء باستخدام Next.js و React 19 ومكونات الخادم.",
            "تطوير خدمات خلفية متينة وواجهات REST/GraphQL بلغة TypeScript مع التحقق الدقيق ومعالجة الأخطاء.",
            "تصميم مخططات قواعد بيانات علائقية موسعة (PostgreSQL، Prisma) وتحسين الفهارس واستعلامات البيانات المعقدة.",
            "بناء طبقات تخزين مؤقت متطورة باستخدام Redis ومعالجة المهام الخلفية غير المتزامنة."
          ]
        },
        {
          title: "الأداء والأمان وجودة البرمجيات",
          items: [
            "تحسين مؤشرات أداء الويب الأساسية (Core Web Vitals) للحصول على درجات تفوق 95+ في سرعة التحميل.",
            "تطبيق أعلى معايير الأمان المؤسسي: حماية المصادقة، وتحديد معدل الطلبات (Rate Limiting)، والتشفير.",
            "كتابة اختبارات آلية شاملة (Unit و Integration و E2E) لضمان استقرار التحديثات البرمجية.",
            "مراجعة الكود البرمجي ووضع أفضل الممارسات الموثقة للفريق الهندسي."
          ]
        },
        {
          title: "البنية السحابية وعمليات التشغيل (DevOps)",
          items: [
            "إدارة عمليات النشر السحابي عبر بيئات Vercel و AWS وحاويات Docker.",
            "بناء مسارات التكامل والنشر المستمر (CI/CD) مع الفحص الآلي للأنواع وجودة الكود.",
            "إعداد أنظمة التتبع والمراقبة اللحظية للأخطاء والأداء في بيئة الإنتاج."
          ]
        }
      ]
    },
    technologiesOrSkills: {
      en: [
        {
          category: "Frontend Core",
          items: [
            "TypeScript (advanced patterns & generics)",
            "Next.js (App Router, Server Components & Actions)",
            "React 19 & React Hook Form",
            "Tailwind CSS & Modern CSS architecture",
            "State management & client data sync"
          ]
        },
        {
          category: "Backend & Storage",
          items: [
            "Node.js runtime & Express/Fastify/Next API",
            "PostgreSQL & relational data modeling",
            "Prisma ORM & Drizzle",
            "Redis caching & BullMQ message queues",
            "Zod schema validation"
          ]
        },
        {
          category: "Infrastructure & Tools",
          items: [
            "Git, GitHub Actions & CI/CD",
            "Docker containerization",
            "Vercel, AWS (S3, CloudFront, ECS/Lambda)",
            "Web Vitals profiling & Lighthouse audit",
            "REST, GraphQL & WebSockets"
          ]
        }
      ],
      ar: [
        {
          category: "الواجهات الأمامية",
          items: [
            "لغة TypeScript المتقدمة",
            "إطار عمل Next.js (App Router والمكونات السحابية)",
            "مكتبة React 19 وإدارة النماذج",
            "تصميم Tailwind CSS وأنظمة التنسيق الحديثة",
            "إدارة الحالة وتزامن البيانات"
          ]
        },
        {
          category: "الخدمات الخلفية وقواعد البيانات",
          items: [
            "بيئة Node.js وواجهات API السحابية",
            "قواعد بيانات PostgreSQL وتصميم المخططات",
            "مكتبات Prisma ORM و Drizzle",
            "التخزين المؤقت عبر Redis ومعالجة الطوابير",
            "التحقق من البيانات عبر Zod"
          ]
        },
        {
          category: "البنية التحتية والأدوات",
          items: [
            "نظام Git ومسارات GitHub Actions و CI/CD",
            "حاويات Docker",
            "منصات Vercel وخدمات AWS السحابية",
            "قياس وتحسين مؤشرات سرعة الويب والأداء",
            "بروتوكولات REST و GraphQL و WebSockets"
          ]
        }
      ]
    },
    requirements: {
      en: [
        "3+ years of verifiable professional experience building full-stack applications in production environments.",
        "Expertise in modern TypeScript across both client-side and server-side runtimes.",
        "Demonstrated track record of shipping scalable Next.js or React applications with clean architecture.",
        "Solid grasp of relational databases, indexing, transactional integrity, and data normalization.",
        "Strong understanding of web security, authentication mechanisms, and API performance tuning.",
        "Autonomous problem-solving ability with clear, proactive written and verbal English communication.",
        "Working knowledge of CI/CD, Git branching workflows, and containerized deployments."
      ],
      ar: [
        "خبرة مهنية موثقة لا تقل عن 3 سنوات في بناء تطبيقات متكاملة وتطويرها في بيئات الإنتاج.",
        "إتقان عميق للغة TypeScript في كل من الواجهة الأمامية والخلفية البرمجية.",
        "سجل حافل ومثبت في إطلاق تطبيقات Next.js أو React ذات معمارية برمجية منظمة وعالية الكفاءة.",
        "فهم قوي لقواعد البيانات العلائقية، وتحسين الفهارس، وسلامة المعاملات المالية والبيانية.",
        "معرفة ممتازة بأمن تطبيقات الويب وآليات التحقق وتحسين استجابة واجهات البرمجة.",
        "القدرة على العمل باستقلالية تامة وحل المشكلات المعقدة مع تواصل باللغة الإنجليزية بوضوح واحترافية.",
        "خبرة عملية في مسارات النشر الآلي CI/CD وإدارة بيئات Git والحاويات."
      ]
    },
    whatWeOffer: {
      en: [
        "100% remote flexibility — work from your ideal workspace.",
        "Competitive compensation benchmarked against global standards with performance-based bonuses.",
        "Direct impact on core architecture and freedom to choose best-in-class modern tooling.",
        "Zero unnecessary meetings or bureaucracy — outcome-focused engineering culture.",
        "Paid access to modern developer tools, AI accelerators, and cloud learning resources."
      ],
      ar: [
        "مرونة العمل عن بُعد بنسبة 100% من أي مكان في العالم.",
        "تعويض مالي تنافسي وفق المعايير العالمية مع مكافآت أداء مجزية.",
        "تأثير مباشر في القرارات المعمارية وحرية اختيار أفضل الأدوات التقنية الحديثة.",
        "بيئة هندسية تركز على الإنجاز والنتائج بعيداً عن الاجتماعات غير الضرورية.",
        "توفير اشتراكات في أدوات الذكاء الاصطناعي والموارد السحابية المتطورة."
      ]
    },
    whoShouldApply: {
      en: [
        "You have built and maintained production systems that real users rely on daily.",
        "You care about writing clean, typed, maintainable software and leaving code better than you found it.",
        "You take ownership of the full lifecycle — from feature spec to deployment and production monitoring.",
        "You communicate proactively and thrive in an asynchronous, remote-first team."
      ],
      ar: [
        "بنيت وحافظت على أنظمة برمجية يعتمد عليها المستخدمون الفعليون يومياً.",
        "تهتم بنظافة الكود، وسلامة الأنواع البرمجية، وتعتبر الكود وسيلة لحل مشكلات الأعمال.",
        "تتحمل المسؤولية الكاملة عن دورة حياة البرمجيات من الفكرة إلى النشر والمراقبة.",
        "تتواصل بفعالية وتزدهر في بيئات العمل المتزامنة وغير المتزامنة عن بُعد."
      ]
    },
    importantNote: {
      en: "We review actual production code and live portfolio projects. Please include active GitHub repositories, deployed web applications, or architecture case studies with your application.",
      ar: "نحن نولي أهمية قصوى للأكواد البرمجية الفعلية والمشاريع المباشرة. يُرجى إرفاق رابط حساب GitHub والمشاريع المنشورة مع طلب التقديم."
    },
    screening: {
      experienceOptions: [
        "3–4 Years Professional Experience",
        "4–6 Years Professional Experience",
        "6+ Years Lead / Staff Level"
      ],
      q1Label: "Production TypeScript, Next.js & Node.js Mastery",
      q1Options: [
        "Yes — 3+ years architecting production full-stack systems with Next.js/React & TypeScript",
        "No — Less than 3 years or junior level"
      ],
      q2Label: "Database Modeling, APIs & Asynchronous Systems",
      q2Options: [
        "Yes — Strong expertise in PostgreSQL/Prisma, caching, API security, and CI/CD pipelines",
        "No — Familiar with front-end only / basic backend"
      ],
      scenarioTitle: "High-Concurrency Architecture & Resilience Scenario",
      scenarioQuestion: "Describe how you would design an asynchronous webhook processing pipeline for real-time payment or compliance events (e.g. Stripe or ZATCA e-invoicing) that guarantees idempotency, sub-100ms acknowledgment, and zero data loss under high load spikes.",
      scenarioPlaceholder: "Walk through your choice of queue/worker architecture, database transaction isolation, Redis caching/locking, retry backoff logic, and monitoring."
    }
  },

  // ── 2. ACTIVE: PERFORMANCE MARKETING LEAD ──
  {
    slug: "performance-marketer",
    id: "ARRANTO-MKT-01",
    status: "open",
    title: {
      en: "Performance Marketing Lead – Paid Acquisition, Funnel Economics & ROAS Scaling",
      ar: "قائد تسويق الأداء والنمو – الحملات الممولة واقتصاديات التحويل",
    },
    department: {
      en: "Growth & Performance Marketing",
      ar: "النمو وتسويق الأداء الرقمي",
    },
    departmentKey: "marketing",
    location: {
      en: "100% Remote (Worldwide)",
      ar: "عن بُعد 100% (عالمياً)",
    },
    employmentType: {
      en: "Full-Time",
      ar: "دوام كامل",
    },
    experience: {
      en: "3+ Years Paid Acquisition & Media Buying (Required)",
      ar: "3+ سنوات من الخبرة المثبتة في الحملات المدفوعة (مطلوب)",
    },
    compensation: {
      en: "Competitive Base + High-Impact Performance & ROAS Bonuses",
      ar: "راتب أساسي تنافسي + مكافآت وحوافز أداء مرتبطة بالعائد",
    },
    summary: {
      en: "Arranto is hiring a data-driven Performance Marketing Lead with 3+ years of verifiable experience scaling paid acquisition across Google Ads, Meta Ads Manager, and LinkedIn Ads, with laser focus on CAC, payback periods, conversion funnels, and high-return revenue growth.",
      ar: "تبحث أرانتو عن قائد تسويق أداء متميز يمتلك خبرة لا تقل عن 3 سنوات في إدارة الحملات الإعلانية الممولة عبر Google Ads و Meta و LinkedIn Ads مع التركيز الدقيق على تكلفة اكتساب العملاء (CAC) ومعدلات التحويل ومضاعفة العائد الاستثماري على الإنفاق الإعلاني (ROAS).",
    },
    aboutRole: {
      en: [
        "As the Performance Marketing Lead at Arranto, you will be in the driver's seat for client acquisition, paid media strategy, funnel economics, and revenue acceleration.",
        "You will design, deploy, and scale multi-channel performance campaigns targeting high-intent business decision-makers and high-value customer segments.",
        "You will test hundreds of creative angles, write compelling direct-response copy, build rigorous attribution models, and run relentless conversion rate optimization (CRO) experiments.",
        "This is not a theoretical brand marketing role — it is an analytical, revenue-generating media buying position measured on pipeline, qualified leads, and profitable ROAS."
      ],
      ar: [
        "بصفتك قائداً لتسويق الأداء في أرانتو، ستتولى قيادة استراتيجيات الاستحواذ المدفوع، واقتصاديات مسارات التحويل، وتحقيق النمو المستدام للإيرادات.",
        "ستقوم بتصميم وإطلاق وتوسيع حملات متعددة القنوات تستهدف صناع القرار والشركات ذات القيمة العالية.",
        "ستعمل على اختبار مئات الزوايا الإعلانية المبتكرة، وكتابة نصوص إعلانية محفزة للتحويل، وبناء نماذج إسناد (Attribution) متقدمة وتحسين معدلات التحويل (CRO).",
        "هذا ليس دوراً نظرياً في التسويق العام، بل هو منصب تنفيذي تحليلي يركز على العائد الاستثماري وجلب العملاء المؤهلين وزيادة الربحية."
      ],
    },
    responsibilities: {
      en: [
        {
          title: "Multi-Channel Media Buying & Budget Management",
          items: [
            "Build, manage, and scale paid advertising campaigns across Google Ads (Search, Performance Max, YouTube), Meta Ads (Facebook & Instagram), and LinkedIn Campaign Manager.",
            "Manage monthly ad budgets with strict adherence to target CAC, LTV:CAC ratios, and return on ad spend (ROAS).",
            "Execute granular keyword research, audience segmentation, lookalikes, custom intent audiences, and account exclusion lists.",
            "Rapidly adjust bidding strategies (tCPA, tROAS, Max Conversions) based on real-time funnel signals and lead qualification metrics."
          ]
        },
        {
          title: "Creative Strategy, Copywriting & Landing Page CRO",
          items: [
            "Collaborate closely with our design team to conceptualize, brief, and test high-converting video and static ad creatives.",
            "Write high-converting, direct-response ad copy, headlines, and calls-to-action that capture attention and drive action.",
            "Conduct structured landing page A/B tests (layout, value proposition, social proof, forms) to maximize conversion velocity.",
            "Map full-funnel customer journeys from initial impression to completed onboarding."
          ]
        },
        {
          title: "Data Analytics, Attribution & Reporting",
          items: [
            "Build and maintain bulletproof tracking architectures using Google Tag Manager (GTM), GA4, Meta Conversions API (CAPI), and offline conversion imports.",
            "Construct automated executive dashboards in Looker Studio or similar tools providing transparency into cost-per-acquisition and channel ROI.",
            "Perform weekly cohort analyses, attribution modeling, and deep dives into customer lifetime value."
          ]
        }
      ],
      ar: [
        {
          title: "شراء المساحات الإعلانية وإدارة الميزانيات",
          items: [
            "بناء وإدارة وتوسيع الحملات الإعلانية الممولة عبر منصات Google Ads و Meta Ads و LinkedIn Campaign Manager.",
            "إدارة الميزانيات الإعلانية الشهرية مع الالتزام التام بتكلفة الاستحواذ المستهدفة (Target CAC) وتحقيق أعلى عائد استثماري.",
            "إجراء أبحاث دقيقة للكلمات المفتاحية واستهداف الجماهير المخصصة والشرائح المشابهة (Lookalikes) وقوائم الاستبعاد.",
            "تحسين استراتيجيات المزايدة الآلية واليدوية بناءً على إشارات جودة العملاء الفعلية."
          ]
        },
        {
          title: "الاستراتيجية الإبداعية وكتابة الإعلانات وتحسين التحويل (CRO)",
          items: [
            "التعاون مع الفريق الإبداعي لإنتاج واختبار مقاطع فيديو وصور إعلانية ذات معدلات تحويل استثنائية.",
            "كتابة نصوص إعلانية مقنعة ومباشرة تخاطب نقاط الألم لدى العملاء وتحث على اتخاذ الإجراء الفوري.",
            "تنفيذ اختبارات A/B دورية على صفحات الهبوط لتحسين نسب التحويل وتسريع وتيرة المبيعات.",
            "هندسة مسار العميل الرقمي من المشاهدة الأولى وحتى إتمام التعاقد."
          ]
        },
        {
          title: "التحليلات ونماذج الإسناد والتقارير",
          items: [
            "إعداد ومتابعة أنظمة التتبع الدقيقة عبر Google Tag Manager و GA4 وواجهات التحويل المباشرة للواجهة الخلفية (CAPI).",
            "بناء لوحات بيانات تفاعلية (Looker Studio) توضح تكلفة التحويل، والعائد الاستثماري لكل منصة.",
            "إجراء تحليلات دورية لشرائح العملاء، ونماذج إسناد التحويلات، وتقدير القيمة الدائمة للعميل (LTV)."
          ]
        }
      ]
    },
    technologiesOrSkills: {
      en: [
        {
          category: "Ad Platforms",
          items: [
            "Meta Ads Manager (FB/IG)",
            "Google Ads (Search, Display, PMax, YouTube)",
            "LinkedIn Campaign Manager",
            "X/Twitter Ads & emerging networks",
            "Audience targeting & bidding automation"
          ]
        },
        {
          category: "Measurement & Tracking",
          items: [
            "Google Analytics 4 (GA4)",
            "Google Tag Manager (GTM & Server-Side GTM)",
            "Meta Conversions API (CAPI)",
            "Attribution modeling & UTM architecture",
            "Looker Studio & data reporting"
          ]
        },
        {
          category: "Optimization & Economics",
          items: [
            "Conversion Rate Optimization (CRO)",
            "Landing page A/B testing methodologies",
            "Direct-response copywriting",
            "Funnel unit economics (CAC, LTV, payback)",
            "Customer journey mapping"
          ]
        }
      ],
      ar: [
        {
          category: "المنصات الإعلانية",
          items: [
            "مدير إعلانات Meta (فيسبوك وإنستغرام)",
            "إعلانات Google (البحث، الشبكة الإعلانية، Performance Max، يوتيوب)",
            "مدير حملات LinkedIn للمؤسسات والشركات",
            "استراتيجيات الاستهداف والمزايدة الذكية"
          ]
        },
        {
          category: "التتبع والقياس",
          items: [
            "منصة Google Analytics 4 (GA4)",
            "Google Tag Manager والتتبع عبر السيرفر",
            "واجهة التحويلات المباشرة Meta CAPI",
            "نماذج إسناد التحويل وبنية روابط UTM",
            "لوحات القيادة وتقارير Looker Studio"
          ]
        },
        {
          category: "التحسين واقتصاديات التحويل",
          items: [
            "تحسين معدلات التحويل (CRO)",
            "اختبارات صفحات الهبوط المقارنة (A/B Testing)",
            "كتابة الإعلانات المباشرة المقنعة",
            "تحليل اقتصاديات الاستحواذ والقيمة الدائمة للعميل",
            "هندسة مسارات المبيعات الرقمية"
          ]
        }
      ]
    },
    requirements: {
      en: [
        "3+ years of verifiable professional experience in paid acquisition managing substantial ad budgets with proven ROAS.",
        "Demonstrated track record scaling B2B or B2C accounts through systematic testing and data analysis.",
        "In-depth technical command of GA4, Google Tag Manager, custom pixel events, and server-side tracking.",
        "Deep analytical competence: ability to translate raw numbers into actionable growth initiatives.",
        "Strong direct-response copywriting skills and the ability to formulate creative hooks that stand out.",
        "High personal discipline, excellent English communication skills, and comfort in an autonomous remote culture."
      ],
      ar: [
        "خبرة مهنية موثقة لا تقل عن 3 سنوات في إدارة الحملات الإعلانية المدفوعة بميزانيات معتبرة وتحقيق عوائد مجزية.",
        "سجل مثبت في تنمية حسابات الشركات (B2B) أو المستهلكين (B2C) عبر التحليل المنهجي للبيانات.",
        "إتقان تقني ممتاز لأدوات GA4 و GTM وأحداث التتبع المخصصة والتتبع عبر الخادم.",
        "عقلية تحليلية متقدمة وقدرة على استخلاص الرؤى القابلة للتنفيذ من الأرقام والبيانات الإحصائية.",
        "مهارة عالية في صياغة الرسائل الإعلانية المؤثرة وابتكار أفكار تسويقية غير تقليدية.",
        "التزام شخصي عالي وتواصل احترافي باللغة الإنجليزية في بيئة عمل مرنة ومستقلة."
      ]
    },
    whatWeOffer: {
      en: [
        "100% remote work setup — autonomy over your location and schedule.",
        "Competitive base salary plus direct performance incentives tied to revenue and ROAS milestones.",
        "Substantial ad budgets and creative freedom to launch experimental campaigns.",
        "Direct collaboration with leadership without red tape or delayed decision-making.",
        "Full access to premium intelligence, spy tools, analytics platforms, and AI copy assistants."
      ],
      ar: [
        "عمل كامل عن بُعد 100% مع حرية تنظيم ساعات العمل والإنتاجية.",
        "راتب أساسي مجزٍ وحوافز أداء مرتبطة بنمو الإيرادات والعائد على الإنفاق الإعلاني.",
        "ميزانيات إعلانية طموحة وحرية إبداعية لتجربة أفكار واستراتيجيات تسويقية نوعية.",
        "تنسيق مباشر مع الإدارة التنفيذية وسرعة فائقة في اتخاذ القرارات.",
        "توفير اشتراكات في أحدث أدوات تحليل المنافسين والبيانات وأنظمة الذكاء الاصطناعي."
      ]
    },
    whoShouldApply: {
      en: [
        "You are obsessed with metrics: CPA, ROAS, conversion rates, and profit margins.",
        "You treat client budget like your own money, continuously cutting waste and reinvesting in winners.",
        "You test methodically rather than relying on intuition alone.",
        "You are self-directed, thrive under target accountability, and communicate outcomes clearly."
      ],
      ar: [
        "شغوف بالمؤشرات المالية ومعدلات التحويل وهامش الربحية وعائد الإنفاق.",
        "تتعامل مع ميزانيات الإعلانات وكأنها استثمارك الخاص، فتلغي الهدر وتضاعف الميزانية في الحملات الناجحة.",
        "تعتمد على البيانات والاختبار العلمي المنظم بدلاً من التخمين.",
        "تتمتع بالحافز الذاتي وتحقيق الأهداف المحددة بوضوح وتفوق."
      ]
    },
    importantNote: {
      en: "Please provide real case studies or performance metrics from accounts you have personally managed (budgets, ROAS turnaround, or scale achieved).",
      ar: "يرجى تقديم أمثلة أو دراسات حالة حقيقية لحسابات أدرتها بنفسك تتضمن الميزانيات ونسب العائد أو النمو الذي تحقق."
    },
    screening: {
      experienceOptions: [
        "3–4 Years Paid Acquisition Experience",
        "4–6 Years Paid Acquisition Experience",
        "6+ Years Growth Lead / Director Level"
      ],
      q1Label: "Paid Media Scale & Direct ROAS Experience",
      q1Options: [
        "Yes — 3+ years managing profitable 5-to-6-figure monthly budgets across Meta & Google Ads",
        "No — Less than 3 years or organic social media only"
      ],
      q2Label: "Attribution, Server-Side CAPI & Funnel Analytics",
      q2Options: [
        "Yes — Advanced mastery of GA4, GTM, server-side CAPI tracking, and CRO landing page testing",
        "No — Basic dashboard monitoring only"
      ],
      scenarioTitle: "B2B / SaaS Funnel Turnaround Scenario",
      scenarioQuestion: "A high-ticket B2B service or enterprise SaaS is spending $20,000/month across Google & LinkedIn, but CAC has risen 60% over 2 quarters while lead quality has dropped. Walk us through your forensic audit, channel reallocation, creative hook revamp, and 45-day turnaround action plan.",
      scenarioPlaceholder: "Detail how you would analyze search intent, audience exclusions, creative testing cadence, landing page conversion barriers, and attribution accuracy."
    }
  },

  // ── 3. ACTIVE: SENIOR VISUAL & BRAND DESIGNER ──
  {
    slug: "graphic-designer",
    id: "ARRANTO-DES-01",
    status: "open",
    title: {
      en: "Senior Visual & Brand Designer – Design Systems, Digital Interfaces & Brand Identity",
      ar: "مصمم هوية بصرية وواجهات أول – أنظمة التصميم والهوية الرقمية",
    },
    department: {
      en: "Creative Direction & Visual Systems",
      ar: "الإدارة الإبداعية والأنظمة البصرية",
    },
    departmentKey: "design",
    location: {
      en: "100% Remote (Worldwide)",
      ar: "عن بُعد 100% (عالمياً)",
    },
    employmentType: {
      en: "Full-Time",
      ar: "دوام كامل",
    },
    experience: {
      en: "3+ Years Professional Design & Brand Experience (Required)",
      ar: "3+ سنوات من الخبرة المهنية في التصميم والهوية (مطلوب)",
    },
    compensation: {
      en: "Competitive Base + Project Performance Bonuses",
      ar: "راتب أساسي تنافسي + مكافآت تميز للمشاريع الإبداعية",
    },
    summary: {
      en: "Arranto is seeking an extraordinary Senior Visual & Brand Designer with 3+ years of professional studio experience to architect cohesive digital identities, comprehensive Figma design systems, dark-mode web experiences, and high-conversion marketing collateral that command enterprise respect.",
      ar: "تبحث أرانتو عن مصمم هوية بصرية وواجهات استثنائي يتمتع بخبرة لا تقل عن 3 سنوات في استوديوهات التصميم العالمية لتطوير هويات رقمية متكاملة وأنظمة تصميم Figma متطورة وواجهات ويب حديثة ومواد تسويقية تحظى بتقدير الشركات الكبرى.",
    },
    aboutRole: {
      en: [
        "Visual craft is at the center of Arranto's identity. We believe software and digital presences should feel unmistakably premium, modern, and memorable.",
        "As our Senior Visual & Brand Designer, you will shape the creative identity of Arranto and create world-class digital brands for our global clientele.",
        "You will architect scalable Figma component libraries, craft exquisite typography hierarchies, design sleek dark-mode user interfaces, and direct visual storytelling across web, motion, and digital campaigns.",
        "The ideal candidate possesses impeccable taste, understands editorial composition, and balances uncompromising aesthetic refinement with usability and high conversion."
      ],
      ar: [
        "الحرفية البصرية هي جوهر هوية أرانتو. نؤمن بأن البرمجيات والواجهات الرقمية يجب أن تكون راقية وحديثة وتترك انطباعاً فريداً لا يُنسى.",
        "بصفتك مصمماً أول للهوية البصرية والواجهات، ستحدد المعالم الإبداعية لأرانتو وستبني علامات تجارية رقمية رفيعة المستوى لعملائنا في مختلف أنحاء العالم.",
        "ستقوم ببناء مكتبات مكونات Figma القابلة للتوسع، وتنسيق خطوط طباعية مميزة، وتصميم واجهات الوضع الداكن الأنيقة، وقيادة السرد البصري عبر الويب والوسائط التفاعلية.",
        "المرشح المثالي يمتلك ذائقة فنية رفيعة، ويفهم قواعد التركيب البصري، ويجمع بين الجماليات الراقية وسهولة الاستخدام ومعدلات التحويل العالية."
      ],
    },
    responsibilities: {
      en: [
        {
          title: "Brand Identity & Design System Architecture",
          items: [
            "Conceive and establish comprehensive brand identity systems: logos, typography systems, color tokens, visual metaphors, and brand guidelines.",
            "Architect and maintain scalable, modular design systems in Figma using auto-layout, tokens, nested components, and variant properties.",
            "Define consistent design tokens (spacing, typography, elevation, motion) bridging the gap between Figma and front-end code.",
            "Ensure flawless visual consistency across all digital touchpoints, from marketing websites to enterprise web applications."
          ]
        },
        {
          title: "Digital Product & Landing Page UI/UX",
          items: [
            "Design cutting-edge, high-converting responsive web pages, dashboards, and digital studio interfaces with bold contemporary aesthetics.",
            "Translate complex product value propositions into intuitive, engaging visual storytelling and wireframes.",
            "Produce interactive micro-interactions, layout prototypes, and design handoff specifications for engineering implementation.",
            "Test and iterate layout variations to continually improve user engagement and conversion metrics."
          ]
        },
        {
          title: "Marketing Assets, Motion & Visual Collateral",
          items: [
            "Create high-impact marketing visuals: social media announcement carousels, pitch decks, infographics, and display ad creatives.",
            "Produce lightweight vector illustrations, 2D animations, and motion graphic assets that bring interfaces to life.",
            "Curate and edit digital assets, custom icon sets, and editorial mockups to maintain world-class presentation standards."
          ]
        }
      ],
      ar: [
        {
          title: "بناء الهوية البصرية وأنظمة التصميم",
          items: [
            "ابتكار وتأسيس أنظمة هوية بصرية متكاملة: الشعارات، وتنسيقات الخطوط، ولوحات الألوان، والأدلة الإرشادية للعلامة التجارية.",
            "تصميم وإدارة أنظمة تصميم قابلة للتطوير على Figma باستخدام Auto-layout والمكونات المتداخلة والمتغيرات المتقدمة.",
            "تحديد رموز التصميم (Design Tokens) لتوحيد المسافات والألوان والخطوط بالتوافق مع مهندسي الواجهات.",
            "ضمان الاتساق البصري التام عبر جميع المنصات ونقاط الاتصال الرقمية."
          ]
        },
        {
          title: "واجهات المنتجات الرقمية وصفحات الهبوط",
          items: [
            "تصميم صفحات هبوط ولوحات تحكم رقمية فائقة التميز والجاذبية متوافقة مع جميع الأجهزة.",
            "تحويل المفاهيم المعقدة إلى تجارب بصرية بديهية وتخطيطات واجهات مستخدم ممتعة.",
            "إعداد نماذج تفاعلية (Prototypes) ومواصفات تسليم واضحة وموثقة للمطورين.",
            "تطوير واختبار خيارات تصميمية مبتكرة لرفع تفاعل المستخدمين ومعدلات التحويل."
          ]
        },
        {
          title: "المحتوى التسويقي والموشن جرافيك",
          items: [
            "إنتاج تصاميم تسويقية عالية التأثير: عروض تقديمية للمستثمرين، ومنشورات ترويجية، ورسوم بيانية وإعلانات ممولة.",
            "تصميم رسومات متجهة ورسوم متحركة خفيفة (Motion Graphics) تعزز حيوية الواجهات وتفاعلها.",
            "تصميم وتجهيز حزم أيقونات مخصصة وعروض واقعية (Mockups) بأعلى المعايير العالمية."
          ]
        }
      ]
    },
    technologiesOrSkills: {
      en: [
        {
          category: "Design Software",
          items: [
            "Figma (Auto-layout, Components, Variants & Tokens)",
            "Adobe Illustrator (vector branding & iconography)",
            "Adobe Photoshop (retouching & composition)",
            "Adobe After Effects (motion graphics & micro-animations)",
            "Lottie & SVG asset optimization"
          ]
        },
        {
          category: "Visual Craft",
          items: [
            "Typography pairing & editorial hierarchy",
            "Sleek dark-mode & chromatic lighting theory",
            "Brutalist & Swiss modernist grid systems",
            "Brand identity & logo design systems",
            "Information design & data visualization"
          ]
        },
        {
          category: "Product & Engineering Alignment",
          items: [
            "Design token specification & developer handoff",
            "Responsive layout principles & breakpoints",
            "Component lifecycle & variant documentation",
            "Accessibility (WCAG contrast & readability)",
            "High-fidelity interactive prototyping"
          ]
        }
      ],
      ar: [
        {
          category: "برامج وأدوات التصميم",
          items: [
            "برنامج Figma (Auto-layout والمكونات المتقدمة ورموز التصميم)",
            "برنامج Adobe Illustrator (الهويات والشعارات والأيقونات)",
            "برنامج Adobe Photoshop (معالجة الصور والتركيب البصري)",
            "برنامج Adobe After Effects (الموشن جرافيك والحركات التفاعلية)",
            "تصدير وتحسين ملفات SVG و Lottie للويب"
          ]
        },
        {
          category: "الحرفية البصرية",
          items: [
            "فنون التايبوغرافي وتنسيق الخطوط والتراتبية البصرية",
            "جماليات الوضع الداكن (Dark Mode) ونظريات الإضاءة الرقمية",
            "أنظمة الشبكات البصرية السويسرية والحديثة",
            "تصميم أدلة الهوية المؤسسية والشعارات",
            "تصميم الرسوم البيانية وتبسيط البيانات"
          ]
        },
        {
          category: "التكامل مع الهندسة البرمجية",
          items: [
            "توثيق رموز التصميم وتسليم الملفات للمطورين",
            "مبادئ التصميم المتجاوب مع مختلف الشاشات",
            "توثيق المكونات وحالاتها المختلفة",
            "معايير سهولة الوصول والتباين البصري (WCAG)",
            "بناء نماذج تفاعلية فائقة الدقة"
          ]
        }
      ]
    },
    requirements: {
      en: [
        "3+ years of professional visual, brand, or UI design experience in an agency, studio, or high-growth tech company.",
        "A standout online portfolio (personal website, Behance, Dribbble, or Figma showcase) proving world-class craft and typography mastery.",
        "Deep expertise in Figma, including design systems, component properties, and token architecture.",
        "Proficiency in Adobe Creative Suite (Illustrator, Photoshop, After Effects).",
        "Refined visual instincts with strong appreciation for minimalist, high-contrast, dark-mode aesthetics.",
        "Ability to articulate design rationale clearly in English and collaborate constructively with engineers.",
        "Disciplined time management and autonomy in a 100% remote setting."
      ],
      ar: [
        "خبرة مهنية لا تقل عن 3 سنوات في تصميم الهويات البصرية أو واجهات المستخدم في استوديو أو شركة تقنية متقدمة.",
        "ملف أعمال استثنائي على الإنترنت (موقع شخصي أو Behance أو Dribbble أو Figma) يثبت التمكن والذائقة الرفيعة.",
        "خبرة متعمقة في استخدام Figma وأنظمة التصميم والمكونات المتقدمة.",
        "إتقان العمل على برامج أدوبي الإبداعية (Illustrator، Photoshop، After Effects).",
        "حس بصري عالٍ وإلمام بالتصاميم الحديثة والتباين العالي والوضع الداكن الراقي.",
        "القدرة على شرح القرارات التصميمية بوضوح باللغة الإنجليزية والتعاون البناء مع المطورين.",
        "إدارة ذاتية للوقت والمهام بكفاءة في بيئة عمل مرنة عن بُعد."
      ]
    },
    whatWeOffer: {
      en: [
        "100% remote flexibility with absolute trust and autonomy.",
        "Competitive salary plus performance bonuses for high-impact creative projects.",
        "A brand that genuinely values world-class design over generic templates.",
        "Full creative ownership to define aesthetics and experiment with cutting-edge visual styles.",
        "Paid subscriptions for Figma, Adobe Creative Cloud, premium typefoundry licenses, and design tools."
      ],
      ar: [
        "مرونة تامة للعمل عن بُعد 100% مع الثقة والاستقلالية الكاملة.",
        "راتب تنافسي ومكافآت أداء للمشاريع الإبداعية المتميزة.",
        "العمل مع علامة تقدر التصميم الأصيل وترفض القوالب الجاهزة المكررة.",
        "حرية إبداعية كاملة لتطوير الهوية وتجربة أحدث الأساليب البصرية.",
        "توفير اشتراكات Figma وأدوات Adobe CC وتراخيص الخطوط العالمية."
      ]
    },
    whoShouldApply: {
      en: [
        "You obsess over typography, spacing, micro-contrast, and visual harmony.",
        "You refuse to create boring or boilerplate designs.",
        "You love dark mode, clean lines, and technical elegance.",
        "You take pride in organized Figma files that engineers love building from."
      ],
      ar: [
        "تهتم بأدق تفاصيل الخطوط والمسافات والتباين والانسجام اللوني العام.",
        "ترفض إنشاء تصاميم تقليدية أو مستهلكة.",
        "شغوف بالوضع الداكن والأناقة البصرية العصرية.",
        "تفخر بملفات Figma المنظمة التي تسهل مهمة المهندسين البرمجيين."
      ]
    },
    importantNote: {
      en: "Applications without an accessible online portfolio link (website, Behance, Dribbble, or Figma) will not be reviewed. Please ensure your best live work is linked.",
      ar: "لن يتم النظر في أي طلب لا يحتوي على رابط لملف أعمال متاح (موقع إلكتروني أو Behance أو Dribbble أو Figma). يُرجى التأكد من إرفاق رابط أعمالك."
    },
    screening: {
      experienceOptions: [
        "3–4 Years Professional Design Experience",
        "4–6 Years Professional Design Experience",
        "6+ Years Senior / Art Director Level"
      ],
      q1Label: "Professional Design Experience & Live Portfolio",
      q1Options: [
        "Yes — 3+ years professional design experience with an exceptional live portfolio link",
        "No — Less than 3 years or no accessible portfolio"
      ],
      q2Label: "Figma Design Tokens & Typography Systems",
      q2Options: [
        "Yes — Expert in Figma auto-layout, design tokens, Adobe Suite, and luxury/dark aesthetics",
        "No — Basic graphic design / template editing only"
      ],
      scenarioTitle: "Brand Identity & Visual System Scenario",
      scenarioQuestion: "We are developing an ultra-modern digital studio brand for enterprise clients. How would you establish the typography pairing, chromatic dark palette, micro-contrast rules, and modular Figma component system to project authority, speed, and precision?",
      scenarioPlaceholder: "Discuss your font selection philosophy, spacing grid, component variants, responsive tokens, and how you ensure handoff alignment with front-end engineers."
    }
  },

  // ── 4. CLOSED: AI/ML ENGINEER ──
  {
    slug: "ai-ml-engineer",
    id: "ARRANTO-ENG-01",
    status: "closed",
    title: {
      en: "AI/ML Engineer – Machine Learning, Deep Learning & AI Applications",
      ar: "مهندس ذكاء اصطناعي وتعلم آلي – التعلم العميق وتطبيقات الذكاء الاصطناعي",
    },
    department: {
      en: "Engineering / Information Technology",
      ar: "الهندسة وتكنولوجيا المعلومات",
    },
    departmentKey: "engineering",
    location: {
      en: "100% Remote",
      ar: "عن بُعد 100%",
    },
    employmentType: {
      en: "Full-Time",
      ar: "دوام كامل",
    },
    experience: {
      en: "3+ Years Professional Experience",
      ar: "3+ سنوات خبرة مهنية",
    },
    compensation: {
      en: "Competitive Base + Performance Growth",
      ar: "راتب تنافسي + مكافآت أداء ونمو",
    },
    summary: {
      en: "This position is currently closed to new applications. Arranto previously hired for practical, production-ready AI applications across Machine Learning, Deep Learning, LLMs, and intelligent software architectures.",
      ar: "هذا الشاغر مغلق حالياً ولا يستقبل طلبات جديدة. كانت أرانتو تبحث عن مهندس ذكاء اصطناعي لبناء تطبيقات عملية تشمل التعلم العميق والنماذج اللغوية الكبيرة.",
    },
    aboutRole: {
      en: [
        "Applications for this role are currently closed.",
        "Arranto is a high-performance digital services and AI studio engineering custom applications and intelligent workflows."
      ],
      ar: [
        "التقديم على هذا الشاغر مغلق حالياً.",
        "أرانتو استوديو رقمي عالي الأداء يبني حلولاً ذكية وأنظمة برمجية متطورة."
      ],
    },
    responsibilities: {
      en: [
        {
          title: "Role Concluded",
          items: [
            "Build AI-powered web applications and intelligent software products.",
            "Develop and integrate Machine Learning and Deep Learning models.",
            "Work with LLMs, embeddings, vector databases, RAG, and AI agents."
          ]
        }
      ],
      ar: [
        {
          title: "انتهت فترة التقديم",
          items: [
            "بناء تطبيقات ويب ذكية وأنظمة برمجية مدعومة بالذكاء الاصطناعي.",
            "تطوير ودمج نماذج التعلم الآلي والتعلم العميق.",
            "العمل مع النماذج اللغوية الكبيرة والمتجهات ووكلاء الذكاء الاصطناعي."
          ]
        }
      ]
    },
    technologiesOrSkills: {
      en: [
        {
          category: "Core Stack",
          items: ["Python", "PyTorch", "LLMs & RAG", "Vector Databases", "FastAPI"]
        }
      ],
      ar: [
        {
          category: "التقنيات الأساسية",
          items: ["بايثون", "PyTorch", "النماذج اللغوية", "قواعد بيانات المتجهات", "FastAPI"]
        }
      ]
    },
    requirements: {
      en: ["3+ years in AI/ML software engineering."],
      ar: ["3+ سنوات خبرة في هندسة برمجيات الذكاء الاصطناعي."]
    },
    whatWeOffer: {
      en: ["100% remote flexibility and competitive compensation."],
      ar: ["مرونة كاملة للعمل عن بُعد وراتب تنافسي."]
    },
    screening: {
      experienceOptions: ["3+ years engineering experience"],
      q1Label: "Python & ML/DL Foundations",
      q1Options: ["Yes — Strong Python, ML/DL concepts, and hands-on coding ability"],
      q2Label: "Remote Work Setup & Readiness",
      q2Options: ["Yes — Fully equipped with laptop/stable internet & comfortable working remotely"],
      scenarioTitle: "Technical Project Deep Dive",
      scenarioQuestion: "Position is currently filled.",
      scenarioPlaceholder: "Position closed."
    }
  },

  // ── 5. CLOSED: BUSINESS DEVELOPMENT EXECUTIVE ──
  {
    slug: "business-development-executive",
    id: "ARRANTO-SALES-01",
    status: "closed",
    title: {
      en: "Business Development Executive (B2B)",
      ar: "مسؤول تطوير الأعمال (B2B)",
    },
    department: {
      en: "Sales & Growth / Business Development",
      ar: "المبيعات وتطوير الأعمال",
    },
    departmentKey: "sales",
    location: {
      en: "100% Remote",
      ar: "عن بُعد 100%",
    },
    employmentType: {
      en: "Full-Time",
      ar: "دوام كامل",
    },
    experience: {
      en: "3+ Years B2B Sales Experience",
      ar: "3+ سنوات خبرة في مبيعات B2B",
    },
    compensation: {
      en: "Fixed Base + High-Growth Performance Incentives & Commission",
      ar: "راتب أساسي + عمولات وحوافز أداء مجزية",
    },
    summary: {
      en: "This position is currently closed to new applications. Arranto previously hired for identifying qualified B2B prospects and driving digital software service revenue.",
      ar: "هذا الشاغر مغلق حالياً ولا يستقبل طلبات جديدة. كانت أرانتو تبحث عن مسؤول تطوير أعمال لتحديد العملاء المحتملين وبدء محادثات مهنية مع أصحاب الشركات.",
    },
    aboutRole: {
      en: [
        "Applications for this role are currently closed.",
        "Arranto works with ambitious companies across North America, Europe, and the Middle East."
      ],
      ar: [
        "التقديم على هذا الشاغر مغلق حالياً.",
        "تعمل أرانتو مع شركات رائدة في أمريكا الشمالية وأوروبا والشرق الأوسط."
      ],
    },
    responsibilities: {
      en: [
        {
          title: "Role Concluded",
          items: [
            "B2B prospecting and cold outreach across LinkedIn, email, and calls.",
            "Qualifying inbound leads and booking discovery meetings."
          ]
        }
      ],
      ar: [
        {
          title: "انتهت فترة التقديم",
          items: [
            "التواصل الاستباقي وتحديد العملاء المحتملين عبر LinkedIn والبريد.",
            "تأهيل العملاء وترتيب اجتماعات استكشافية."
          ]
        }
      ]
    },
    technologiesOrSkills: {
      en: [
        {
          category: "Core Skills",
          items: ["B2B Prospecting", "CRM Tools", "Cold Outreach", "English Fluency"]
        }
      ],
      ar: [
        {
          category: "المهارات الأساسية",
          items: ["التواصل مع الشركات", "أدوات CRM", "المراسلات الاحترافية", "إتقان الإنجليزية"]
        }
      ]
    },
    requirements: {
      en: ["3+ years in B2B sales or business development."],
      ar: ["3+ سنوات في مبيعات B2B وتطوير الأعمال."]
    },
    whatWeOffer: {
      en: ["Competitive fixed salary plus uncapped commissions."],
      ar: ["راتب أساسي تنافسي بالإضافة إلى عمولات مجزية."]
    },
    screening: {
      experienceOptions: ["3+ years B2B experience"],
      q1Label: "English Communication Skills",
      q1Options: ["Yes — Fluent & confident in professional English"],
      q2Label: "Remote Work Setup & Readiness",
      q2Options: ["Yes — Fully equipped with laptop/stable internet & comfortable working remotely"],
      scenarioTitle: "Outreach Scenario Question",
      scenarioQuestion: "Position is currently filled.",
      scenarioPlaceholder: "Position closed."
    }
  }
];

export function getJobBySlug(slug: string): JobDetail | undefined {
  return jobPostings.find((j) => j.slug === slug);
}
