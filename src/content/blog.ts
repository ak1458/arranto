export type Locale = "en" | "ar";

export type BlogCategory =
  | "AI Automation"
  | "Custom AI Solutions"
  | "AI SaaS Development"
  | "AI Development"
  | "Website Development"
  | "Chatbots"
  | "Business Automation"
  | "Planning Software"
  | "Full-Stack Development";

export type BlogFaqItem = {
  q: Record<Locale, string>;
  a: Record<Locale, string>;
};

export type BlogPost = {
  slug: string;
  title: Record<Locale, string>;
  category: BlogCategory;
  date: string;
  readTime: string;
  excerpt: Record<Locale, string>;
  article: Record<Locale, string>;
  faq?: BlogFaqItem[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "the-future-of-ai-automation",
    title: {
      en: "The Future of AI Automation in Small Businesses",
      ar: "مستقبل أتمتة الذكاء الاصطناعي في الشركات الصغيرة",
    },
    category: "AI Automation",
    date: "2026-07-15",
    readTime: "5 min read",
    excerpt: {
      en: "How autonomous agents are replacing mundane repetitive tasks and allowing founders to focus on growth.",
      ar: "كيف تحل الوكلاء المستقلون محل المهام المتكررة العادية وتسمح للمؤسسين بالتركيز على النمو.",
    },
    article: {
      en: [
        "### Introduction",
        "Artificial Intelligence is no longer just for enterprise giants. Today, small and medium-sized businesses (SMEs) are leveraging AI automation to streamline their operations, reduce costs, and scale faster than ever before. This shift is fundamentally changing the competitive landscape.",
        "",
        "### The Problem with Manual Operations",
        "Founders often spend up to 40% of their day managing repetitive tasks: scheduling, responding to basic inquiries, data entry, and lead qualification. This 'busy work' prevents them from focusing on high-impact strategic growth.",
        "",
        "> [!IMPORTANT]",
        "> If you are spending more time managing your software than talking to your customers, you are losing money.",
        "",
        "### Enter the Autonomous Agent",
        "Unlike traditional software that requires human input to move from step A to step B, modern AI agents operate autonomously. They can:",
        "*   Read incoming emails and draft contextual responses.",
        "*   Qualify leads via natural conversation.",
        "*   Generate complex quotes or proposals instantly.",
        "*   Sync data across CRMs, ERPs, and marketing platforms without zapier-like fragility.",
        "",
        "### The Architecture of Automation",
        "A proper AI automation setup isn't just a ChatGPT wrapper. It requires a robust architecture:",
        "```typescript",
        "// A simplified view of an autonomous lead qualification loop",
        "async function handleInquiry(message: string) {",
        "  const intent = await nlp.extractIntent(message);",
        "  if (intent === 'purchase') {",
        "    return await commerce.generateCheckoutLink(message);",
        "  } else {",
        "    return await crm.scheduleConsultation(message);",
        "  }",
        "}",
        "```",
        "",
        "### Conclusion",
        "The businesses that adopt AI automation today will be the ones that dominate tomorrow. It's not about replacing humans; it's about elevating them."
      ].join("\n\n"),
      ar: [
        "### مقدمة",
        "لم تعد أتمتة الذكاء الاصطناعي حكراً على الشركات الكبيرة. تستطيع الشركات الصغيرة والمتوسطة اليوم استخدام الأتمتة لتقليل الأعمال المتكررة وتحسين سرعة خدمة العملاء ومنح المؤسسين وقتاً أكبر للتركيز على النمو.",
        "### أين تبدأ المشكلة؟",
        "يقضي كثير من أصحاب الأعمال وقتاً طويلاً في إدخال البيانات والرد على الأسئلة المتكررة وتأهيل العملاء وإعداد التقارير. هذه المهام ليست دائماً صعبة، لكنها تستهلك الانتباه وتزيد احتمال الخطأ عندما تنتقل البيانات بين البريد وجداول البيانات وأنظمة CRM.",
        "### ما الذي يفعله الوكيل الذكي؟",
        "يمكن لوكيل الذكاء الاصطناعي قراءة طلب وارد، فهم هدفه، اقتراح رد، ثم تمرير القرار إلى الموظف أو تنفيذ الخطوة المسموح بها. المهم أن يكون لكل إجراء نطاق واضح وصلاحيات وسجل يمكن مراجعته، بدلاً من ترك النظام يتصرف دون حدود.",
        "### الأتمتة ليست مجرد روبوت محادثة",
        "يتطلب مسار العمل الجيد مصادر بيانات محددة وقواعد للتعامل مع الاستثناءات وطريقة واضحة لإرجاع الخطأ إلى الإنسان. قد يشمل ذلك ربط البريد وCRM وERP وقاعدة البيانات، مع اختبار الأمثلة العربية والإنجليزية التي يستخدمها الفريق فعلياً.",
        "### كيف تختار أول عملية؟",
        "ابدأ بمهمة متكررة يمكن قياسها ولا تحمل خطراً كبيراً، مثل تصنيف الاستفسارات أو إعداد ملخص داخلي أو مزامنة حقل بين نظامين. بعد ذلك راقب الدقة والوقت الذي تم توفيره وحالات الفشل قبل توسيع الأتمتة إلى إجراءات أكثر حساسية.",
        "### الخلاصة",
        "أفضل أتمتة هي التي تجعل العمل اليومي أوضح وأسهل، لا التي تضيف أداة جديدة بلا حاجة. ابدأ بمشكلة حقيقية، اختبرها على بيانات حقيقية، ووثق دائماً ما يستطيع النظام فعله وما يجب أن يبقى تحت مراجعة الفريق."
      ].join("\n\n"),
    },
  },
  {
    slug: "building-ai-saas-from-scratch",
    title: {
      en: "Building a scalable AI SaaS from scratch",
      ar: "بناء برمجيات كخدمة للذكاء الاصطناعي قابلة للتطوير من الصفر",
    },
    category: "AI SaaS Development",
    date: "2026-07-10",
    readTime: "8 min read",
    excerpt: {
      en: "A comprehensive guide to architecting an AI-first SaaS product using Next.js and custom LLM integrations.",
      ar: "دليل شامل لهندسة منتج SaaS يعتمد على الذكاء الاصطناعي باستخدام Next.js وتكامل LLM المخصص.",
    },
    article: {
      en: [
        "### Introduction",
        "Building a modern AI SaaS product requires more than just integrating an LLM endpoint. To serve enterprises in Saudi Arabia and the Gulf, applications must handle real-time streaming, strict data governance, zero-latency caching, and seamless localization.",
        "### The Modern AI SaaS Architecture",
        "A robust AI SaaS platform relies on a hybrid serverless architecture. By leveraging Next.js App Router with edge runtime handlers, custom vector databases (such as Pinecone or Supabase Vector), and robust queue management, businesses achieve high availability and rapid response times.",
        "### Key Considerations for Gulf & Enterprise Deployments",
        "* **Bilingual First:** Native English and Arabic support across all UI layers and prompt templates.",
        "* **Data Security & Sovereignty:** Ensuring compliance with regional data protection laws.",
        "* **Scalable LLM Orchestration:** Smart fallback mechanisms to maintain 99.9% uptime during API rate limits.",
        "### Conclusion",
        "Architecting an AI-first SaaS with high performance and regional compliance positions software businesses for long-term dominance."
      ].join("\n\n"),
      ar: [
        "### مقدمة",
        "يتطلب بناء برمجيات الذكاء الاصطناعي كخدمة (AI SaaS) الحديثة أكثر من مجرد ربط واجهة برمجة تطبيقات. لخدمة الشركات في السعودية والخليج، يجب أن تتعامل التطبيقات مع التدفق اللحظي، وحوكمة البيانات الصارمة، والتكيّف اللغوي الكامل.",
        "### الهندسة البرمجية الحديثة",
        "تعتمد منصات AI SaaS الحديثة على بنية هجينة تضمن السرعة والموثوقية، مع تقديم دعم كامل باللغتين العربية والإنجليزية لضمان أفضل تجربة للمستخدم العربي والخليجي.",
        "### الخاتمة",
        "الاستثمار في بناء برمجيات ذكاء اصطناعي قابلة للتطوير يمنح المنشآت ميزة تنافسية مستدامة."
      ].join("\n\n"),
    }
  },
  {
    slug: "customer-service-chatbots",
    title: {
      en: "Why rule-based Chatbots are dead",
      ar: "لماذا ماتت روبوتات الدردشة القائمة على القواعد",
    },
    category: "Chatbots",
    date: "2026-07-05",
    readTime: "4 min read",
    excerpt: {
      en: "The transition from frustrating decision-tree bots to natural, empathetic AI assistants.",
      ar: "الانتقال من روبوتات شجرة القرار المحبطة إلى مساعدي الذكاء الاصطناعي الطبيعيين والمتعاطفين.",
    },
    article: {
      en: [
        "### Introduction",
        "Traditional decision-tree chatbots frustrate customers. Modern generative AI assistants understand context, intent, and multi-turn conversations, providing instant, accurate resolutions across customer touchpoints.",
        "### The Shift to Conversational AI",
        "Rule-based bots fail as soon as a user strays from a predefined script. Conversational AI assistants connect directly to company knowledge bases, CRMs, and live inventory to answer complex inquiries naturally.",
        "### Benefits for Growing Enterprises",
        "* **24/7 Availability:** Instant support across WhatsApp, web chat, and email.",
        "* **Lower Support Costs:** Automating up to 80% of routine customer inquiries.",
        "* **Personalized Experience:** Remembering customer history and preferences for tailor-made service."
      ].join("\n\n"),
      ar: [
        "### مقدمة",
        "تسببت روبوتات الدردشة التقليدية في إحباط العملاء لسنوات. اليوم، يوفر مساعدو الذكاء الاصطناعي التوليدي استجابات دقيقة وفورية تفهم سياق المحادثة وتغني عن القوائم المعقدة.",
        "### التحول إلى الذكاء الاصطناعي التفاعلي",
        "يتصل المساعد الذكي مباشرة بقواعد المعرفة وأنظمة إدارة علاقات العملاء (CRM) لتقديم إجابات مخصصة وحل المشكلات بأسلوب طبيعي وموثوق."
      ].join("\n\n"),
    }
  },
  {
    slug: "what-full-stack-development-means",
    title: {
      en: "What \"Full-Stack Development\" Actually Means When You Hire a Studio",
      ar: "ماذا يعني \"التطوير الشامل\" فعليًا عند التعاقد مع استوديو برمجي",
    },
    category: "Full-Stack Development",
    date: "2026-08-04",
    readTime: "9 min read",
    excerpt: {
      en: "\"Full-stack developer\" and \"full-stack development service\" get used interchangeably online, but they're different things to hire. Here's the real difference, using four shipped projects as evidence.",
      ar: "يُستخدم مصطلحا \"مطوّر شامل\" و\"خدمة تطوير شامل\" بالتبادل، لكنهما شيئان مختلفان عند التعاقد. إليك الفرق الحقيقي، مدعومًا بأربعة مشاريع فعلية.",
    },
    faq: [
      {
        q: { en: "Is full-stack development more expensive than hiring separate frontend and backend developers?", ar: "هل التطوير الشامل أغلى من التعاقد مع مطوّر واجهة ومطوّر خلفية منفصلين؟" },
        a: { en: "It's scoped per project rather than published as a flat rate, but the honest comparison isn't hourly rate — it's total coordination cost. Two specialists on two schedules usually spend more combined hours on handoff and integration than one person spends building the same thing end to end.", ar: "يُحدَّد النطاق لكل مشروع بدلًا من نشر سعر ثابت، لكن المقارنة الصادقة ليست في سعر الساعة بل في تكلفة التنسيق الإجمالية. غالبًا ما ينفق أخصائيان على جدولين منفصلين ساعات أكثر مجتمعة على التسليم والتكامل مما ينفقه شخص واحد يبني الشيء نفسه من البداية للنهاية." }
      },
      {
        q: { en: "Can a solo studio really handle enterprise-scale full-stack work?", ar: "هل يستطيع استوديو فردي فعلًا التعامل مع أعمال شاملة بحجم المنشآت؟" },
        a: { en: "\"Enterprise\" doesn't always mean SAP/Oracle scale. For a growing business, a lean, correctly-scoped CRM or ERP genuinely beats an oversized platform nobody fully uses — that's the work the CRM & ERP development page covers.", ar: "\"المنشآت\" لا تعني دائمًا حجم SAP أو Oracle. بالنسبة لعمل تجاري نامٍ، نظام CRM أو ERP مصمم بحجم مناسب يتفوق فعليًا على منصة ضخمة لا يستخدمها أحد بالكامل — وهذا ما تغطيه صفحة تطوير CRM وERP." }
      },
      {
        q: { en: "What's the difference between full-stack development and \"custom software development\"?", ar: "ما الفرق بين التطوير الشامل و\"تطوير البرمجيات المخصصة\"؟" },
        a: { en: "Full-stack is the technical discipline — owning every layer of a build. Custom software development is the commercial category it sits inside. You don't hire \"full-stack\" as a standalone service; you hire custom software development, and full-stack is how it gets executed correctly.", ar: "التطوير الشامل هو الانضباط التقني، أي امتلاك كل طبقة من البناء. أما تطوير البرمجيات المخصصة فهو الفئة التجارية التي يندرج تحتها. لا تتعاقد على \"التطوير الشامل\" كخدمة قائمة بذاتها، بل تتعاقد على تطوير برمجيات مخصصة، والتطوير الشامل هو الطريقة الصحيحة لتنفيذه." }
      },
      {
        q: { en: "Do you use the same stack for every project?", ar: "هل تُستخدم نفس التقنيات في كل مشروع؟" },
        a: { en: "No. Next.js is the common thread on the frontend, but the backend and database follow the problem: Postgres for PulseKart's transactional point-of-sale data, Supabase for SanadOS's real-time facilities data, dedicated XML/crypto modules for FATOORA Lite's ZATCA integration.", ar: "لا. يُعد Next.js القاسم المشترك في الواجهة، لكن الخلفية وقاعدة البيانات تتبعان طبيعة المشكلة: Postgres لبيانات نقاط البيع التبادلية في PulseKart، وSupabase للبيانات اللحظية لمرافق SanadOS، ووحدات XML وتشفير مخصصة لتكامل FATOORA Lite مع زاتكا." }
      },
      {
        q: { en: "What happens if I already have a partially-built product?", ar: "ماذا لو كان لدي منتج مبني جزئيًا بالفعل؟" },
        a: { en: "The existing code gets assessed before anything else — what's worth keeping, what needs rebuilding, and why. Inheriting half a system usually needs more architectural judgment than starting clean, not less.", ar: "يُقيَّم الكود الحالي قبل أي شيء آخر — ما يستحق الإبقاء عليه، وما يحتاج إعادة بناء، ولماذا. غالبًا ما يتطلب توريث نظام غير مكتمل حكمًا معماريًا أكبر من البدء من الصفر، لا أقل." }
      },
      {
        q: { en: "How long does a full-stack build typically take?", ar: "كم يستغرق بناء مشروع شامل عادةً؟" },
        a: { en: "Custom software typically runs 6–14 weeks depending on scope, agreed before code begins — the same timeline the studio quotes for any custom build, full-stack or otherwise.", ar: "تستغرق البرمجيات المخصصة عادةً من 6 إلى 14 أسبوعًا حسب النطاق، ويُتفق عليها قبل بدء الكتابة البرمجية — نفس الجدول الزمني الذي يعتمده الاستوديو لأي بناء مخصص، شاملًا كان أم غيره." }
      }
    ],
    article: {
      en: [
        "### Introduction",
        "Two very different searches use the same words. \"Full-stack developer\" mostly surfaces freelancer marketplaces — arc.dev, Wellfound — people trying to add one person to a team they already run. \"Full-stack development services\" surfaces studios and agencies: people (or, in my case, one person) who own a project front to back. Google treats these as separate searches because buyers mean separate things by them.",
        "If you're reading this because you need software built, not a contractor added to your headcount, you're in the second category. Before you take my word for anything about how I build, here's what \"full-stack\" actually covers.",
        "I'm Ashraf Kamal. I run Arranto alone, which means every project below went through my hands at every layer — not a handoff between a frontend contractor, a backend contractor, and whoever happened to own the database that quarter.",
        "### What \"full-stack\" is actually made of",
        "\"Full-stack\" gets used as one word, but it's really four separate jobs that happen to live in one person, or one small team, when it's done well.",
        "#### The part users touch",
        "Frontend: the interface, the forms, the thing that has to feel fast on a mid-range Android phone with patchy connectivity, not just a fast laptop on office wifi. This is where most of the <a href=\"/en/services/website-development\">website and web application development</a> conversation stops — and it's also where a lot of \"full-stack\" claims quietly turn out to be front-end-only work.",
        "#### The part users never see",
        "Backend: the logic deciding what a request is even allowed to do. Authentication, authorization, rate limits — the parts that never show up in a portfolio screenshot but are the actual difference between software that survives contact with real users and software that doesn't.",
        "#### The part that outlives the interface",
        "Database and infrastructure: schema design, migrations, backups, the decisions that are expensive to reverse later. A good-looking interface on a bad schema is a demo. A good-looking interface on a schema built for how the business actually operates is a product.",
        "#### The part nobody asks about until it breaks",
        "Deployment and monitoring: what happens when a payment webhook fails, when a background job silently stops running, when a client calls because \"the system is down\" and you need to know why in minutes, not after a support ticket routes through three people.",
        "A freelancer hired for \"full-stack development\" is usually covering the first two of these. A full-stack development service covers all four, end to end, on one project, without three people needing to sync up about what the schema means.",
        "### Four real projects, one person, every layer",
        "I'd rather show this than describe it in the abstract.",
        "<a href=\"/en/work/pulsekart\">PulseKart</a> is point-of-sale and inventory software for pharmacies — billing, stock levels, and expiry tracking on one screen, built on Next.js and Node over Postgres. I designed the schema for what a \"sale\" actually touches (inventory, expiry batches, the till), wrote the API routes, and built the interface a pharmacist uses between customers, where a slow screen isn't an inconvenience — it's a line forming.",
        "<a href=\"/en/work/veloria-vault\">Veloria Vault</a> was a storefront migration to headless Next.js — the site, the ad creatives, and the product content managed end to end, not just a visual reskin sitting on the old backend.",
        "<a href=\"/en/work/sanad-os\">SanadOS</a> is currently in pilot: a facilities-operations platform on React and Supabase, tracking assets, work orders, and maintenance history as one system of record instead of the spreadsheet-per-building setup it replaces.",
        "<a href=\"/en/work/fatoora-lite\">FATOORA Lite</a> is the clearest example of why the backend and infrastructure layers matter as much as the interface. It's an e-invoicing engine built around Saudi Arabia's ZATCA Phase 2 clearance workflow — Next.js and Node on the surface, but the real engineering is the XML generation and cryptographic stamping underneath. That's the part a client never sees on screen and would never know to ask for by name, and it's the entire reason an invoice clears or doesn't.",
        "None of these shipped through a handoff. That's not a claim about being better than a team — a team has real advantages a solo studio doesn't, starting with parallel capacity. It's a claim about what \"full-stack\" gets you when it's structural rather than a job title: nobody has to explain the schema to whoever's building the API, because it's the same person, and nobody has to explain the API contract to whoever's building the interface, for the same reason.",
        "### What that looks like in code",
        "One habit that comes directly from owning every layer: validating input at the boundary where a request enters the system, rather than trusting that the frontend already checked it. Here's the shape of it, stripped down from how mutation endpoints get built across these projects:",
        "```typescript\nconst InquirySchema = z.object({\n  name: z.string().min(1).max(120),\n  email: z.string().email(),\n  message: z.string().min(10).max(2000),\n});\n\nexport async function POST(req: Request) {\n  const body = InquirySchema.safeParse(await req.json());\n  if (!body.success) return Response.json({ error: \"Invalid input\" }, { status: 400 });\n  // proceed with a value TypeScript and the runtime both agree is real\n}\n```",
        "It's a small pattern, but it only happens consistently when the same person who wrote the form also wrote the endpoint. Split those across two contractors on two different schedules and this kind of boundary-checking is exactly what gets skipped under deadline pressure — invisible until the day it isn't.",
        "### \"Full-stack developer\" vs. \"full-stack development service\" — the honest difference",
        "If what you need is one more engineer inside a team you already run day to day, reporting to your own lead, you want a full-stack *developer* — a staffing marketplace or a direct hire is the right fit, not a studio.",
        "If what you need is a working product, planned, built, and shipped without you coordinating between a frontend person, a backend person, and whoever handles the database — that's a full-stack development *service*, and that's what the four projects above demonstrate rather than just claim.",
        "There's a smaller, related question worth naming: <a href=\"/en/services/custom-ai-solutions\">custom software</a> versus a configured off-the-shelf tool. Full-stack development is how the custom side actually gets built — it's the discipline, not a separate line item on top.",
        "### How to evaluate a full-stack studio",
        "Three concrete things worth asking before hiring anyone claiming full-stack capability, mine included:",
        "* Ask who owns the database schema after launch — if the answer changes depending on which layer breaks, that's a real gap.",
        "* Ask to see one project where the same person or team handled the interface *and* the part underneath it that never shows on screen (auth, background jobs, integrations) — FATOORA Lite's ZATCA clearance logic is that kind of proof, not the dashboard sitting on top of it.",
        "* Ask what happens at 2am when something silently fails — a real answer names a specific monitoring or alerting mechanism, not \"we'll get back to you.\"",
        "### Where this fits at Arranto",
        "Full-stack development isn't a separate line item here — it's the default, because one person is accountable for every layer on every project. That's also the honest explanation for why a build takes the time it takes: nothing happens in parallel across specialists, it happens in sequence, in one head, which is slower in theory and more consistent in practice. If that trade-off fits what you're building, <a href=\"/en/contact\">the contact page</a> is the fastest way to describe the project and get a real answer about scope."
      ].join("\n\n"),
      ar: [
        "### مقدمة",
        "هناك بحثان مختلفان تمامًا يستخدمان الكلمات نفسها. \"مطوّر شامل\" يُظهر غالبًا منصات العمل الحر — arc.dev، Wellfound — أشخاصًا يحاولون إضافة عضو واحد إلى فريق يديرونه بالفعل. أما \"خدمات التطوير الشامل\" فتُظهر استوديوهات ووكالات: أشخاصًا (أو في حالتي، شخصًا واحدًا) يمتلكون المشروع من البداية إلى النهاية. تتعامل جوجل مع هذين البحثين بشكل منفصل لأن الباحثين يقصدون بهما أمرين مختلفين.",
        "إذا كنت تقرأ هذا لأنك تحتاج إلى بناء برمجية، لا إلى مقاول يُضاف لعدد موظفيك، فأنت في الفئة الثانية. قبل أن تصدّق أي شيء أقوله عن طريقة عملي، إليك ما يغطيه \"التطوير الشامل\" فعليًا.",
        "أنا أشرف كمال. أدير أرانطو بمفردي، ما يعني أن كل مشروع أدناه مرّ عبر يديّ في كل طبقة — لا تسليمًا بين مقاول واجهة ومقاول خلفية ومن يملك قاعدة البيانات في تلك الفترة.",
        "### مما يتكون \"التطوير الشامل\" فعليًا",
        "تُستخدم كلمة \"شامل\" كأنها مهمة واحدة، لكنها في الحقيقة أربع مهام منفصلة تجتمع في شخص واحد، أو فريق صغير، حين يُنفَّذ العمل بشكل صحيح.",
        "#### الجزء الذي يلمسه المستخدم",
        "الواجهة الأمامية: التصميم والنماذج، والشيء الذي يجب أن يبدو سريعًا على هاتف أندرويد متوسط باتصال إنترنت غير مستقر، لا فقط على حاسوب سريع بشبكة مكتب. هنا تتوقف معظم النقاشات حول <a href=\"/ar/services/website-development\">تطوير المواقع وتطبيقات الويب</a> — وهنا أيضًا يتضح أن كثيرًا من ادعاءات \"التطوير الشامل\" هي في الواقع عمل واجهة أمامية فقط.",
        "#### الجزء الذي لا يراه المستخدم أبدًا",
        "الخلفية البرمجية: المنطق الذي يحدد ما يُسمح للطلب بفعله أصلًا. المصادقة، والصلاحيات، وحدود معدل الطلبات — الأجزاء التي لا تظهر أبدًا في لقطة شاشة لمعرض الأعمال، لكنها الفرق الحقيقي بين برمجية تصمد أمام مستخدمين حقيقيين وأخرى لا تصمد.",
        "#### الجزء الذي يبقى بعد تغيّر الواجهة",
        "قاعدة البيانات والبنية التحتية: تصميم المخطط، والترحيلات، والنسخ الاحتياطي — القرارات التي يصعب التراجع عنها لاحقًا. واجهة جميلة فوق مخطط سيئ هي عرض تجريبي فقط. واجهة جميلة فوق مخطط مصمم لطريقة عمل المنشأة الفعلية هي منتج حقيقي.",
        "#### الجزء الذي لا يسأل عنه أحد حتى يتعطل",
        "النشر والمراقبة: ماذا يحدث حين يفشل webhook للدفع، أو حين تتوقف مهمة خلفية بصمت، أو حين يتصل عميل لأن \"النظام متوقف\" وتحتاج معرفة السبب خلال دقائق، لا بعد مرور تذكرة دعم عبر ثلاثة أشخاص.",
        "المقاول الذي يُستأجر لـ\"تطوير شامل\" يغطي عادةً أول جزأين فقط. أما خدمة التطوير الشامل فتغطي الأربعة كاملة، من البداية للنهاية، في مشروع واحد، دون حاجة ثلاثة أشخاص للتنسيق حول معنى المخطط.",
        "### أربعة مشاريع حقيقية، شخص واحد، كل طبقة",
        "أفضّل أن أعرض هذا بدلًا من وصفه نظريًا.",
        "<a href=\"/ar/work/pulsekart\">PulseKart</a> برمجية نقاط بيع ومخزون للصيدليات — الفوترة ومستويات المخزون وتتبع الصلاحية في شاشة واحدة، مبنية على Next.js وNode فوق Postgres. صممت المخطط لما تلمسه \"عملية بيع\" فعليًا (المخزون، دفعات الصلاحية، الصندوق)، وكتبت مسارات API، وبنيت الواجهة التي يستخدمها الصيدلي بين عميل وآخر، حيث الشاشة البطيئة ليست إزعاجًا بسيطًا — بل طابور يتشكل.",
        "<a href=\"/ar/work/veloria-vault\">Veloria Vault</a> كانت عملية ترحيل متجر إلى بنية Next.js بلا واجهة (headless) — الموقع والإبداعات الإعلانية والمحتوى المنتجي مُدارة بالكامل، لا مجرد إعادة تصميم بصري فوق الخلفية القديمة.",
        "<a href=\"/ar/work/sanad-os\">SanadOS</a> قيد التجربة حاليًا: منصة عمليات مرافق مبنية على React وSupabase، تتبّع الأصول وأوامر العمل وسجل الصيانة كنظام سجل موحد بدلاً من جدول بيانات لكل مبنى.",
        "<a href=\"/ar/work/fatoora-lite\">FATOORA Lite</a> هو أوضح مثال على أهمية طبقتي الخلفية والبنية التحتية بقدر أهمية الواجهة. إنه محرك فوترة إلكترونية مبني حول مسار تخليص المرحلة الثانية لزاتكا في السعودية — Next.js وNode في الظاهر، لكن الهندسة الحقيقية في توليد XML والختم التشفيري في الأسفل. هذا الجزء لا يراه العميل على الشاشة أبدًا ولن يعرف أن يسأل عنه باسمه، وهو السبب الكامل وراء تخليص الفاتورة من عدمه.",
        "لم يُبنَ أي من هذه المشاريع عبر تسليم بين أطراف متعددة. هذا ليس ادعاءً بالتفوق على فريق كامل — فالفريق يملك مزايا حقيقية لا يملكها استوديو فردي، أولها القدرة على العمل المتوازي. إنه ادعاء بما يمنحه \"التطوير الشامل\" حين يكون بنيويًا لا مجرد مسمى وظيفي: لا أحد يحتاج شرح المخطط لمن يبني API، لأنه الشخص نفسه، ولا أحد يحتاج شرح عقد API لمن يبني الواجهة، للسبب ذاته.",
        "### كيف يبدو هذا في الكود",
        "من العادات المباشرة الناتجة عن امتلاك كل طبقة: التحقق من المدخلات عند الحد الذي يدخل منه الطلب إلى النظام، بدلًا من الثقة بأن الواجهة الأمامية تحققت منها بالفعل. إليك الشكل العام، مبسّطًا من طريقة بناء نقاط النهاية عبر هذه المشاريع:",
        "```typescript\nconst InquirySchema = z.object({\n  name: z.string().min(1).max(120),\n  email: z.string().email(),\n  message: z.string().min(10).max(2000),\n});\n\nexport async function POST(req: Request) {\n  const body = InquirySchema.safeParse(await req.json());\n  if (!body.success) return Response.json({ error: \"Invalid input\" }, { status: 400 });\n  // المتابعة بقيمة يتفق عليها TypeScript ووقت التشغيل معًا\n}\n```",
        "إنه نمط بسيط، لكنه يحدث باستمرار فقط حين يكون من كتب النموذج هو نفسه من كتب نقطة النهاية. افصل هذا بين مقاولَين على جدولين مختلفين، وهذا النوع من التحقق عند الحدود هو بالضبط ما يُتجاهل تحت ضغط المواعيد النهائية — غير مرئي حتى اليوم الذي يظهر فيه.",
        "### \"مطوّر شامل\" مقابل \"خدمة تطوير شامل\" — الفرق الصادق",
        "إذا كنت تحتاج مهندسًا إضافيًا داخل فريق تديره يوميًا ويقدّم تقاريره لقائدك، فأنت تحتاج \"مطوّر شامل\" — منصة توظيف مستقلين أو تعاقد مباشر هو الخيار الأنسب، لا استوديو.",
        "أما إذا كنت تحتاج منتجًا عاملًا، مخططًا ومبنيًا ومُطلقًا دون أن تنسّق بين شخص للواجهة وآخر للخلفية وثالث لقاعدة البيانات — فهذه \"خدمة تطوير شامل\"، وهذا ما تُثبته المشاريع الأربعة أعلاه لا مجرد تدّعيه.",
        "هناك سؤال أصغر ومرتبط يستحق الذكر: <a href=\"/ar/services/custom-ai-solutions\">البرمجيات المخصصة</a> مقابل أداة جاهزة مُهيّأة. التطوير الشامل هو الطريقة التي يُبنى بها الجانب المخصص فعليًا — إنه انضباط، لا بند خدمة منفصل.",
        "### كيف تُقيّم استوديو تطوير شامل",
        "ثلاثة أسئلة عملية تستحق أن تُطرح قبل التعاقد مع أي جهة تدّعي قدرة شاملة، بما في ذلك أرانطو:",
        "* اسأل من يملك مخطط قاعدة البيانات بعد الإطلاق — إذا تغيّر الجواب حسب الطبقة التي تتعطل، فهذه فجوة حقيقية.",
        "* اطلب رؤية مشروع واحد حيث تولى الشخص أو الفريق نفسه الواجهة *و*الجزء الذي تحتها ولا يظهر على الشاشة (المصادقة، المهام الخلفية، التكاملات) — منطق تخليص زاتكا في FATOORA Lite هو هذا النوع من الإثبات، لا لوحة التحكم فوقه.",
        "* اسأل ماذا يحدث الساعة الثانية فجرًا حين يفشل شيء بصمت — الإجابة الحقيقية تذكر آلية مراقبة أو تنبيه محددة، لا \"سنعاود التواصل معك\".",
        "### أين يقع هذا في أرانطو",
        "التطوير الشامل ليس بندًا منفصلًا هنا — إنه الوضع الافتراضي، لأن شخصًا واحدًا مسؤول عن كل طبقة في كل مشروع. وهذا أيضًا التفسير الصادق لسبب استغراق البناء الوقت الذي يستغرقه: لا شيء يحدث بالتوازي بين أخصائيين، بل يحدث بالتسلسل، في عقل واحد، وهو أبطأ نظريًا وأكثر اتساقًا عمليًا. إذا كانت هذه المقايضة تناسب ما تبنيه، فإن <a href=\"/ar/contact\">صفحة التواصل</a> هي أسرع طريقة لوصف المشروع والحصول على إجابة حقيقية حول نطاقه."
      ].join("\n\n"),
    }
  }
];

export const getPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
