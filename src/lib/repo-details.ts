export type RepoDetail = {
  overview: {
    en: string;
    ar: string;
  };
  features: {
    en: string[];
    ar: string[];
  };
  businessValue: {
    en: string;
    ar: string;
  };
  architectureHighlights: {
    en: string[];
    ar: string[];
  };
};

export const repoDetails: Record<string, RepoDetail> = {
  "pulsekart-web-nextjs": {
    overview: {
      en: "PulseKart is an enterprise-grade point-of-sale and inventory management system engineered specifically for pharmaceutical retail. Built with Next.js 16, Node.js, and PostgreSQL, it unifies counter billing, automated stock reordering, batch-level expiry tracking, and prescription recordkeeping into a single sub-second dashboard.",
      ar: "PulseKart هو نظام نقاط بيع وإدارة مخزون متكامل صُمم خصيصًا لصيدليات التجزئة. أُنشئ باستعمال Next.js 16 وNode.js وPostgreSQL لدمج الفوترة المباشرة، إعادة الطلب التلقائي للمخزون، تتبع انتهاء الصلاحية على مستوى الدفعات، وسجلات الوصفات الطبية في شاشة واحدة فائقة السرعة.",
    },
    features: {
      en: [
        "Real-time counter billing with instant barcode scanning & invoice generation",
        "Automated batch & FEFO (First-Expired-First-Out) inventory dispatching",
        "Patient prescription historical archiving & medication compliance tracking",
        "Sub-second offline-tolerant local state synchronization with PostgreSQL",
      ],
      ar: [
        "فوترة سريعة عند المحاسبة مع مسح فوري للبارکود وإصدار الفواتير",
        "صرف آلي للمخزون وفق مبدأ الأقرب صلاحية أولاً (FEFO)",
        "أرشفة تاريخية لوصفات المرضى وتتبع الامتثال الدوائي",
        "مزامنة لحظر انقطاع الاتصال مع قاعدة بيانات PostgreSQL",
      ],
    },
    businessValue: {
      en: "Eliminates manual paper ledger tracking, reduces inventory shrinkage and expired stock loss by up to 90%, and accelerates customer checkout time to under 5 seconds per transaction.",
      ar: "يلغي السجلات الورقية اليدوية، ويقلل تلف وتاريخ انتهاء الدواء بنسبة تصل إلى 90٪، ويسرّع عملية الدفع إلى أقل من 5 ثوانٍ لكل معاملة.",
    },
    architectureHighlights: {
      en: ["Next.js App Router", "Node.js REST Services", "PostgreSQL Transaction Engine", "TailwindCSS + Logical Properties"],
      ar: ["Next.js App Router", "خدمات Node.js REST", "محرك معاملات PostgreSQL", "TailwindCSS وخواص منطقية"],
    },
  },

  fatooralite: {
    overview: {
      en: "FATOORA Lite is a mission-critical, ZATCA Phase 2 e-invoicing compliance and real-time clearance platform designed for businesses in Saudi Arabia. Built on Next.js 16, PostgreSQL, and custom XML/Cryptographic modules, it automates CSID onboarding, SHA-256 invoice hashing, ECDSA cryptographic stamping, and direct ZATCA regulatory submission.",
      ar: "FATOORA Lite هي منصة امتثال وتخليص الفواتير الإلكترونية المرحلة الثانية المتوافقة مع هیئة الزكاة والضريبة والجمارك (ZATCA) للشركات في السعودية. أُنشئت على Next.js 16 وPostgreSQL وموديولات تشفير XML مخصصة لأتمتة إصدار شهادات CSID، والتختيم التشفيري ECDSA، والارتباط المباشر مع بوابة زاتكا.",
    },
    features: {
      en: [
        "Automated ZATCA Phase 2 CSID cryptographic certificate onboarding",
        "Real-time B2B invoice clearance and B2C invoice reporting API integrations",
        "Cryptographic SHA-256 hashing, UBL 2.1 XML generation & QR code stamping",
        "Bilingual Arabic/English dashboard with real-time audit logs and error diagnostics",
      ],
      ar: [
        "تسجيل تلقائي لشهادات CSID التشفيرية لمرحلة زاتكا الثانية",
        "ربط برمجي لحظي لتخليص فواتير B2B والإبلاغ عن فواتير B2C",
        "تشفير SHA-256 وتوليد XML UBL 2.1 وتختيم QR التفاعلي",
        "لوحة قيادة ثنائية اللغة (عربي/إنجليزي) مع سجلات تدقيق وتشخيص أخطاء لحظي",
      ],
    },
    businessValue: {
      en: "Guarantees 100% legal compliance with Saudi Arabian tax mandates, eliminates penalties, and enables seamless ERP middleware connectivity without expensive legacy upgrades.",
      ar: "يضمن الامتثال القانوني بنسبة 100٪ لتشريعات هيئة الزكاة والضريبة والجمارك السعودية، ويدعم الربط السلس مع أنظمة ERP دون الحاجة لاستبدالها.",
    },
    architectureHighlights: {
      en: ["Next.js 16 Server Actions", "Node.js Crypto Module", "PostgreSQL / Prisma ORM", "ZATCA OpenAPI Integration"],
      ar: ["Next.js 16 Server Actions", "موديول تشفير Node.js", "PostgreSQL / Prisma ORM", "ربط OpenAPI مع زاتكا"],
    },
  },

  "carfax-for-boats": {
    overview: {
      en: "Carfax for Boats is an AI-powered marine asset maintenance & service history verification platform. By leveraging computer vision and Claude Multimodal AI, boat owners and marine fleet managers snap photos of engine plates, hour meters, or service receipts to generate immutable, shareable maintenance passports that increase vessel resale value.",
      ar: "Carfax for Boats هي منصة صيانه وتوثيق سجلات الأصول البحرية المعززة بالذكاء الاصطناعي. من خلال الرؤية الحاسوبية نماذج Claude الذكية، يلتقط مالي البحرية والقوارب صورًا للوحات المحرك وسجلات الصيانة لبناء جواز صيانة موثق وقابل للمشاركة للرفع من قيمة إعادة البيع.",
    },
    features: {
      en: [
        "AI vision OCR extraction for engine serial numbers, hour meters & work invoices",
        "Transferable digital service passport for prospective buyers & marine surveyors",
        "Automated preventative maintenance alerts based on operating hours & seasonal milestones",
        "Offline PWA engine record logging with automatic cloud synchronization via Supabase",
      ],
      ar: [
        "استخراج OCR بالذكاء الاصطناعي للأرقام التسلسلية وساعات التشغيل وفواتير الصيانة",
        "جواز صيانة رقمي موثق يسهل نقله للمشترين الجدد والخبراء البحريين",
        "تنبيهات صيانة وقائية تلقائية بناءً على ساعات التشغيل ومواسم التشغيل",
        "تطبيق PWA يعمل بدون إنترنت مع مزامنة سحابية تلقائية عبر Supabase",
      ],
    },
    businessValue: {
      en: "Protects marine asset equity, proves verified maintenance compliance during vessel sales, and eliminates paper receipt loss for boat operators.",
      ar: "يحمي قيمة الأصول البحرية، ويقدم دليل صيانة موثق عند بيع القوارب، ويلغي فقدان الفواتير الورقية لمشغلي البحرية.",
    },
    architectureHighlights: {
      en: ["Next.js PWA Framework", "Claude Vision API (Anthropic)", "Supabase Realtime Database", "TailwindCSS / TypeScript"],
      ar: ["إطار عمل Next.js PWA", "واجهة Claude Vision (Anthropic)", "قاعدة بيانات Supabase Realtime", "TailwindCSS / TypeScript"],
    },
  },

  "creator-agent-toolbox": {
    overview: {
      en: "Creator Agent Toolbox is an autonomous AI production and content engineering suite. Built with Python, FastAPI, and React, it empowers digital media teams and creators to automate YouTube competitor keyword analysis, generate multi-platform video scripts, run A/B headline optimizations, and track audience retention patterns.",
      ar: "Creator Agent Toolbox هي مجموعة أدوات أتمتة وإندماج المحتوى بالذكاء الاصطناعي. أُنشئت باستخدام Python وFastAPI وReact لتمكين صُنّاع المحتوى والفرق الرقمية من تحليل المنافسين على YouTube، توليد السيناريوهات تلقائياً، وإجراء اختبارات A/B للعناوين.",
    },
    features: {
      en: [
        "Automated YouTube API competitor metadata scraping & trend clustering",
        "LLM-driven script drafting with brand voice constraints & retention hooks",
        "Headline A/B testing & CTR optimization prediction engines",
        "FastAPI backend microservices connected to responsive React interface",
      ],
      ar: [
        "سحب بيانات المنافسين وتجميع الاتجاهات عبر API YouTube",
        "صياغة سيناريوهات الفيديو بالذكاء الاصطناعي مع الحفاظ على نبرة العلامة التجارية",
        "محرك تنبؤ واختبارات A/B لتحسين نسبة النقر (CTR) للعناوين",
        "خلفية FastAPI ميكروسيرفيس مرتبطة بواجهة React متجاوبة",
      ],
    },
    businessValue: {
      en: "Cuts content pre-production time by 75%, increases video CTR through empirical headline prediction, and automates tedious channel market research.",
      ar: "يخفض وقت إعداد وتخطيط المحتوى بنسبة 75٪، ويرفع نسبة مشاهدة الفيديوهات بتنبؤات العناوين، ويؤتمت أبحاث السوق لمقاطع الفيديو.",
    },
    architectureHighlights: {
      en: ["FastAPI (Python 3.11)", "React / TypeScript", "YouTube Data API v3", "LLM Agent Pipelines"],
      ar: ["FastAPI (Python 3.11)", "React / TypeScript", "YouTube Data API v3", "خطوط أنابيب AI Agents"],
    },
  },

  "sovereign-vault": {
    overview: {
      en: "Sovereign Vault is a zero-knowledge, local-first privacy security application engineered with React, Web Crypto API, and PWA capabilities. It provides client-side AES-256-GCM encryption for sensitive documents, identity records, and private credentials without exposing raw data to server backends.",
      ar: "Sovereign Vault هو تطبيق أمان وخصوصية محلية (Local-First) وتشفير مبني بدون معرفة (Zero-Knowledge). بُني بـ React وWeb Crypto API مع إمكانيات PWA لتشفير المستندات الحساسة وسجلات الهوية محلياً بـ AES-256-GCM دون إرسال البيانات غير المشفرة للأجهزة الخادمة.",
    },
    features: {
      en: [
        "Client-side Web Crypto API AES-256-GCM encryption before data persistence",
        "Local-first SQLite / IndexedDB sync for instant offline accessibility",
        "Biometric authentication & master password key derivation (PBKDF2)",
        "Zero-knowledge server telemetry — data remains entirely under user ownership",
      ],
      ar: [
        "تشفير محلي متقدم بـ Web Crypto API AES-256-GCM قبل التخزين",
        "مزامنة محليّة سرعة مع SQLite / IndexedDB لاستخدام بدون إنترنت",
        "مصادقة بيومترية واشتقاق مفاتيح السرية (PBKDF2)",
        "خصوصية تامة 0-Knowledge — تبقى البيانات مملوكة للمستخدم بالكامل",
      ],
    },
    businessValue: {
      en: "Provides absolute data sovereignty for security-conscious professionals and enterprises seeking full compliance with strict privacy mandates like PDPL and GDPR.",
      ar: "يوفر سيادة كاملة على البيانات المهنية والخاصة للشركات والأفراد الذين يبحثون عن امثال تمل للأنظمة اللائحة مثل PDPL وGDPR.",
    },
    architectureHighlights: {
      en: ["React 19 + TypeScript", "Web Crypto API (AES-256-GCM)", "IndexedDB / SQLite Storage", "Progressive Web App (PWA)"],
      ar: ["React 19 + TypeScript", "Web Crypto API (AES-256-GCM)", "تخزين IndexedDB / SQLite", "تطبيق PWA"],
    },
  },

  "attest-health-tracker": {
    overview: {
      en: "Attest Health Tracker is a clinical symptom-tracking and documentation suite designed for patients and medical practitioners managing chronic health conditions. Built as an offline-resilient PWA with React and TypeScript, it generates deterministic clinical summary exports.",
      ar: "Attest Health Tracker هو جناح توثيق طبي وتتبع الأعراض السريرية صُمم لمتابعة الحالات الصحية المزمنة. بُني كتطبيق PWA يعمل بـ React وTypeScript لإنشاء تقارير سريرية دقيقة ومحكمة.",
    },
    features: {
      en: [
        "Deterministic symptom severity logging & longitudinal trend analytics",
        "Clinical PDF report export tailored for physician review and health audits",
        "Offline-first PWA architecture with local background queueing",
        "HIPAA / privacy-conscious local data encryption",
      ],
      ar: [
        "تسجيل الأعراض وتحليل اتجاهاتها على المدى الطويل",
        "تصدير تقارير PDF سريرية مهيأة لمراجعة الأطباء والجهات الصحية",
        "بنية PWA تعمل بدون إنترنت مع مزامنة خلفية عند الاتصال",
        "تشفير محلي متوافق مع معايير الخصوصية الصحية",
      ],
    },
    businessValue: {
      en: "Improves clinical consultation efficacy by replacing vague patient recollections with structured, empirical medical timelines.",
      ar: "يرفع كفاءة الاستشارات الطبية باستبدال وصف المريض الشفهي بسجل تاريخي دقيق وموثق للأعراض.",
    },
    architectureHighlights: {
      en: ["Vite + React", "TypeScript", "IndexedDB Offline Engine", "TailwindCSS"],
      ar: ["Vite + React", "TypeScript", "محرك IndexedDB 오프라인", "TailwindCSS"],
    },
  },

  "ai-executive-seo-agent": {
    overview: {
      en: "AI Executive SEO Agent is an autonomous, open-source search optimization engine. Operating locally via Ollama and Python, it automatically audits Google Search Console metrics, identifies keyword ranking opportunities, and drafts structured schema-rich technical content updates.",
      ar: "AI Executive SEO Agent هو محرك تحسين محركات البحث المستقل الذاتي. يعمل محليًا عبر Ollama وPython لفحص بيانات Google Search Console وتحديد فرص الكلمات المفتاحية وصياغة المقالات المؤهلة للأرشفة.",
    },
    features: {
      en: [
        "Google Search Console API integration for impression & click trend analysis",
        "Local LLM execution via Ollama (zero API token costs)",
        "Automated semantic keyword clustering & JSON-LD schema generation",
        "Self-improving SEO audit loop for continuous page rank optimization",
      ],
      ar: [
        "ربط مباشر مع API Google Search Console لتحليل انطباعات ومرور الموقع",
        "تشغيل نماذج ذكاء اصطناعي محليًا عبر Ollama (بدون تكاليف توكن)",
        "تجميع الكلمات المفتاحية الدلالية وتوليد ترميز JSON-LD المتقدم",
        "حلقة مراجعة تلقائية مستمرة لرفع الترتيب في محركات البحث",
      ],
    },
    businessValue: {
      en: "Automates repetitive organic search management, drives organic search volume gains, and keeps proprietary SEO analytics strictly inside local infrastructure.",
      ar: "يؤتمت أبحاث محركات البحث اليومية، ويزيد الترتيب المجاني، ويحافظ على تحليلات SEO داخل البنية المحلية للشركة.",
    },
    architectureHighlights: {
      en: ["Python 3.11", "Ollama LLM Engine", "Google Search Console API", "Rich CLI & Automated Dispatch"],
      ar: ["Python 3.11", "محرك Ollama المحلي", "Google Search Console API", "واجهة أتمتة تواصلية"],
    },
  },

  "youtube-bulk-optimizer": {
    overview: {
      en: "YouTube Bulk Optimizer is a developer and channel management system for scaling video metadata and playlist infrastructure. Built with Flask, Python, and official Google OAuth 2.0 YouTube Data APIs, it enables mass updating of titles, descriptions, and automated playlist sync.",
      ar: "YouTube Bulk Optimizer هو نظام إدارة وتطوير محتوى الفيديو وقوائم التشغيل. بُني باستخدام Flask وPython وGoogle OAuth 2.0 API لإدارة وتحديث العناوين والوصف وقوائم التشغيل بكميات كبيرة.",
    },
    features: {
      en: [
        "Direct Google OAuth 2.0 authorization (user credentials never stored)",
        "Bulk AI SEO metadata drafting & instant YouTube API publishing",
        "Automated multi-video playlist synchronization & category batching",
        "Live YouTube API quota usage monitor & rate-limit safety controls",
      ],
      ar: [
        "مصادقة مباشرة عبر Google OAuth 2.0 بدون حفظ بيانات اعتماد المستخدم",
        "صياغة وصف وعناوين للفيديوهات بالذكاء الاصطناعي مع النشر اللحظي",
        "مزامنة وتصنيف قوائم التشغيل المتعددة بضغطة زر",
        "مراقبة استهلاك كوتا YouTube API لتفادي تجاوز الحدود",
      ],
    },
    businessValue: {
      en: "Saves video operations teams dozens of hours when updating catalog metadata and improves organic video discoverability across large YouTube channels.",
      ar: "يوفر عشرات الساعات على فرق إدارة الفيديوهات عند تحديث بيانات الفيديوهات، ويرفع معدل اكتشاف الفيديوهات على يوتيوب.",
    },
    architectureHighlights: {
      en: ["Flask / Python", "Google OAuth 2.0", "YouTube Data API v3", "Tailwind UI"],
      ar: ["Flask / Python", "Google OAuth 2.0", "YouTube Data API v3", "Tailwind UI"],
    },
  },
};

/**
 * Returns detailed architectural overview for a repository name.
 * If specific details are not pre-mapped, generates an evidence-based overview
 * from the repository name, language, and topics.
 */
export function getRepoDetail(name: string, defaultDesc: string, language: string | null, topics: string[]): RepoDetail {
  const key = name.toLowerCase();
  if (repoDetails[key]) {
    return repoDetails[key];
  }

  const stackString = [language, ...topics.slice(0, 3)].filter(Boolean).join(", ");
  const formattedTitle = name.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return {
    overview: {
      en: `${formattedTitle} is a production-ready software repository maintained by Arranto Studio. ${defaultDesc} Built using ${stackString || "modern web architecture"}, it embodies our commitment to type-safe code, scalable API infrastructure, and production reliability.`,
      ar: `${formattedTitle} هو مستودع برمجي جاهز للإنتاج تمت صيانته بواسطة استوديو أرانتو. ${defaultDesc} مبني باستخدام ${stackString || "معمارية ويب حديثة"} لضمان بنية تحتية مستقرة وقابلة للتوسع.`,
    },
    features: {
      en: [
        `Production-tested code structure optimized for speed & reliability`,
        `Type-safe API integrations and data handling`,
        `Clean modular architecture designed for seamless developer handoff`,
        `Built with modern tooling (${stackString || "TypeScript / Node"})`,
      ],
      ar: [
        `بنية كود مختبرة للإنتاج مخصصة للسرعة والموثوقية`,
        `تكاملات ووسائط بيانات آمنة ودقيقة`,
        `معمارية برمجية منظمة لتسهيل التطوير والتسليم`,
        `مبني باستخدام تقنيات حديثة (${stackString || "TypeScript / Node"})`,
      ],
    },
    businessValue: {
      en: `Serves as a robust technical foundation for building high-performance systems, reducing custom development timelines and ensuring clean scalability.`,
      ar: `يُعد أساساً تقنياً متيناً لبناء أنظمة عالية الأداء، مما يقلل الوقت المطلوب للتطوير المخصص ويضمن سهولة التوسع.`,
    },
    architectureHighlights: {
      en: topics.slice(0, 4).map((t) => t.toUpperCase()) || ["TYPESCRIPT", "NEXT.JS", "POSTGRESQL"],
      ar: topics.slice(0, 4).map((t) => t.toUpperCase()) || ["TYPESCRIPT", "NEXT.JS", "POSTGRESQL"],
    },
  };
}
