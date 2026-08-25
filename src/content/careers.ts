export type Locale = "en" | "ar";

export type JobDetail = {
  slug: string;
  id: string;
  title: Record<Locale, string>;
  department: Record<Locale, string>;
  departmentKey: "engineering" | "sales";
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
  {
    slug: "ai-ml-engineer",
    id: "ARRANTO-ENG-01",
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
      en: "0–3+ Years (Freshers & Experienced Welcome)",
      ar: "0-3+ سنوات (نرحب بالخريجين وأصحاب الخبرة)",
    },
    compensation: {
      en: "Competitive Base + Performance Growth",
      ar: "راتب تنافسي + مكافآت أداء ونمو",
    },
    summary: {
      en: "Arranto is looking for an AI/ML Engineer to build practical, production-ready AI applications across Machine Learning, Deep Learning, LLMs, AI agents, RAG systems, data pipelines, and intelligent software architectures.",
      ar: "تبحث أرانتو عن مهندس ذكاء اصطناعي وتعلم آلي لبناء تطبيقات ذكاء اصطناعي عملية وجاهزة للإنتاج تشمل التعلم العميق والنماذج اللغوية الكبيرة ووكلاء الذكاء الاصطناعي وأنابيب البيانات.",
    },
    aboutRole: {
      en: [
        "Arranto is looking for an AI/ML Engineer to join our team and work on building practical, production-ready AI applications.",
        "This role is for someone who is genuinely interested in Machine Learning, Deep Learning, LLMs, AI agents, and intelligent software systems — not just someone who has experience calling an AI API.",
        "You will work on building AI-powered products and internal systems similar in complexity to modern AI applications such as intelligent research, prospecting, coding, automation, and productivity tools.",
        "The ideal candidate should be comfortable going from an idea or prototype to a working application, including the AI/ML layer, backend integration, data processing, evaluation, and deployment."
      ],
      ar: [
        "تبحث أرانتو عن مهندس ذكاء اصطناعي للانضمام إلى فريقنا وبناء تطبيقات ذكاء اصطناعي إنتاجية وعملية.",
        "هذا الدور مخصص لشخص شغوف بالتعلم الآلي والتعلم العميق والنماذج اللغوية ووكلاء الذكاء الاصطناعي — وليس مجرد شخص يجري استدعاءات لواجهات برمجة التطبيقات.",
        "ستعمل على بناء منتجات وأنظمة ذكية متطورة تشمل البحث الآلي والأتمتة والإنتاجية.",
        "المرشح المثالي قادر على تحويل الفكرة إلى تطبيق متكامل يعمل في بيئة الإنتاج."
      ],
    },
    responsibilities: {
      en: [
        {
          title: "AI Product & Model Development",
          items: [
            "Build AI-powered web applications and intelligent software products.",
            "Develop and integrate Machine Learning and Deep Learning models.",
            "Work with LLMs, embeddings, vector databases, RAG, AI agents, and tool calling.",
            "Build AI systems that can research, reason, retrieve information, process data, and perform actions."
          ]
        },
        {
          title: "Data Pipelines & Fine-Tuning",
          items: [
            "Develop intelligent automation and workflow systems.",
            "Work with structured and unstructured data, building ingestion and preprocessing pipelines.",
            "Build robust data pipelines for training, evaluation, and inference.",
            "Experiment with different models, prompts, architectures, and fine-tune or adapt models when required."
          ]
        },
        {
          title: "Backend, Scaling & Production",
          items: [
            "Build model evaluation, hallucination detection, and testing systems.",
            "Integrate AI systems with APIs, databases, microservices, and external tools.",
            "Develop backend services required to support AI applications.",
            "Optimize AI applications for reliability, latency, scalability, and compute/token cost.",
            "Deploy and maintain AI/ML systems in production environments."
          ]
        }
      ],
      ar: [
        {
          title: "تطوير المنتجات والنماذج الذكية",
          items: [
            "بناء تطبيقات ويب ذكية وأنظمة برمجية مدعومة بالذكاء الاصطناعي.",
            "تطوير ودمج نماذج التعلم الآلي والتعلم العميق.",
            "العمل مع النماذج اللغوية الكبيرة والمتجهات وقواعد بيانات المتجهات ووكلاء الذكاء الاصطناعي.",
            "بناء أنظمة ذكية قادرة على البحث والاستنتاج ومعالجة البيانات واتخاذ الإجراءات."
          ]
        },
        {
          title: "أنابيب البيانات والضبط الدقيق",
          items: [
            "تطوير مسارات عمل مؤتمتة وأنظمة سير عمل متطورة.",
            "التعامل مع البيانات المهيكلة وغير المهيكلة وبناء أنابيب التدريب والاستدلال.",
            "التجريب المستمر مع مختلف البنى المعمارية ونماذج الذكاء الاصطناعي والضبط الدقيق."
          ]
        },
        {
          title: "الخلفية البرمجية والتحسين للإنتاج",
          items: [
            "بناء أنظمة تقييم واختبار جودة النماذج.",
            "تكامل أنظمة الذكاء الاصطناعي مع واجهات REST وقواعد البيانات.",
            "تحسين التطبيقات من حيث السرعة والتكلفة والموثوقية ونشرها في بيئة الإنتاج."
          ]
        }
      ]
    },
    technologiesOrSkills: {
      en: [
        {
          category: "Machine Learning & Deep Learning",
          items: [
            "Machine Learning & Deep Learning fundamentals",
            "Neural networks & model training/evaluation",
            "Classification, regression, clustering & recommendation systems",
            "Natural Language Processing (NLP)",
            "PyTorch and/or TensorFlow",
            "NumPy, Pandas, Scikit-learn",
            "Computer Vision is a plus"
          ]
        },
        {
          category: "Modern AI & Agentic Systems",
          items: [
            "Large Language Models (LLMs)",
            "RAG (Retrieval-Augmented Generation) architectures",
            "Embeddings & vector search (Chroma, pgvector, Qdrant)",
            "AI agents, multi-agent orchestration & tool/function calling",
            "Prompt engineering, evaluation & fine-tuning",
            "Open-source model inference & local deployment"
          ]
        },
        {
          category: "Software Engineering & Infrastructure",
          items: [
            "Strong Python programming",
            "REST APIs & backend development (FastAPI / Node)",
            "Databases & SQL (PostgreSQL, Redis)",
            "Git / GitHub version control",
            "Docker & containerization (is a plus)",
            "Cloud deployment & monitoring (is a plus)"
          ]
        }
      ],
      ar: [
        {
          category: "التعلم الآلي والتعلم العميق",
          items: [
            "أساسيات التعلم الآلي والتعلم العميق",
            "الشبكات العصبية وتدريب النماذج وتقييمها",
            "معالجة اللغة الطبيعية (NLP)",
            "PyTorch و/أو TensorFlow",
            "NumPy و Pandas و Scikit-learn"
          ]
        },
        {
          category: "الذكاء الاصطناعي الحديث",
          items: [
            "النماذج اللغوية الكبيرة (LLMs)",
            "أنظمة RAG والبحث الدلالي",
            "وكلاء الذكاء الاصطناعي واستدعاء الأدوات",
            "هندسة التوجيهات والضبط الدقيق (Fine-tuning)"
          ]
        },
        {
          category: "هندسة البرمجيات والبنية التحتية",
          items: [
            "برمجة بايثون المتقدمة (Python)",
            "واجهات برمجة التطبيقات (REST APIs)",
            "قواعد البيانات و SQL",
            "Git و Docker والحوسبة السحابية"
          ]
        }
      ]
    },
    requirements: {
      en: [
        "Strong understanding of Machine Learning and Deep Learning concepts.",
        "Strong Python programming and problem-solving skills.",
        "Ability to understand technical papers, documentation, and concepts independently.",
        "Ability to turn an AI/ML concept into a working, reliable production application.",
        "Understanding of model evaluation and the difference between a prototype and a production system.",
        "Curiosity about new AI technologies and willingness to experiment.",
        "Self-discipline to work autonomously in a 100% remote setup.",
        "0–3+ years of relevant experience. Open to fresh graduates, self-taught developers, and experienced engineers."
      ],
      ar: [
        "فهم قوي لمفاهيم التعلم الآلي والتعلم العميق.",
        "مهارات برمجية عالية بلغة بايثون وقدرة على حل المشكلات البرمجية المعقدة.",
        "القدرة على قراءة الأوراق البحثية والتوثيقات التقنية وتحويلها إلى كود تنفيذي.",
        "القدرة على تحويل النماذج الأولية إلى أنظمة إنتاجية مستقرة.",
        "الانضباط الذاتي للعمل عن بُعد بنسبة 100% وإدارة المهام باستقلالية.",
        "0-3+ سنوات من الخبرة. نرحب بالخريجين وأصحاب المشاريع المستقلة."
      ]
    },
    whatWeOffer: {
      en: [
        "Remote, full-time flexibility from anywhere in the world.",
        "Opportunity to work on real, cutting-edge AI/ML products and agentic systems.",
        "Freedom to experiment with modern architectures, models, and research techniques.",
        "Performance-based compensation and direct career growth.",
        "Collaborative, high-ownership engineering environment with zero bureaucratic friction."
      ],
      ar: [
        "مرونة كاملة في العمل عن بُعد من أي مكان في العالم.",
        "العمل على منتجات ذكاء اصطناعي حقيقية ومتقدمة.",
        "حرية التجريب والابتكار مع أحدث نماذج وأدوات الذكاء الاصطناعي.",
        "فرص نمو وظيفي وتعويضات مرتبطة بالأداء والإنجاز."
      ]
    },
    importantNote: {
      en: "We are not looking for someone who only knows how to connect an OpenAI/Claude/Gemini API to a website. We want an engineer who understands what is happening underneath and can work across the AI/ML stack — from data and models to backend systems and the final application. A strong GitHub project or live portfolio is highly valued!",
      ar: "نحن لا نبحث عن شخص يقتصر دوره على ربط واجهات OpenAI بموقع إلكتروني فقط. نريد مهندسًا يفهم آليات النماذج والبيانات والبنية التحتية التحتية. المشاريع العملية وحساب GitHub القوي لهما قيمة كبرى!"
    },
    screening: {
      experienceOptions: [
        "0–1 years (Fresher / Projects)",
        "1–2 years practical experience",
        "3+ years engineering experience"
      ],
      q1Label: "Python & ML/DL Foundations",
      q1Options: [
        "Yes — Strong Python, ML/DL concepts, and hands-on coding ability",
        "No — Only basic API calling / No ML background"
      ],
      q2Label: "Remote Work Setup & Readiness",
      q2Options: [
        "Yes — Fully equipped with laptop/stable internet & comfortable working remotely",
        "No — Prefer in-office setup only"
      ],
      scenarioTitle: "Technical Project Deep Dive",
      scenarioQuestion: "Describe your strongest AI/ML, Deep Learning, or Agentic AI project. What was the architecture, what models/techniques did you use (e.g. PyTorch, RAG, custom embeddings, fine-tuning), what challenge did you solve, and what was the outcome?",
      scenarioPlaceholder: "Details of your strongest project: architecture, tech stack (PyTorch/TensorFlow, LLMs, Vector DBs, RAG, etc.), challenges overcome, and GitHub/demo link if available."
    }
  },
  {
    slug: "business-development-executive",
    id: "ARRANTO-SALES-01",
    title: {
      en: "Business Development Executive",
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
      en: "0–1+ Years (Freshers Warmly Welcome)",
      ar: "0-1+ سنوات (نرحب بالخريجين الجدد)",
    },
    compensation: {
      en: "Fixed Base + High-Growth Performance Incentives & Commission",
      ar: "راتب أساسي + عمولات وحوافز أداء مجزية",
    },
    summary: {
      en: "Arranto is looking for an ambitious Business Development Executive to identify qualified B2B prospects, initiate meaningful conversations with business owners, and drive digital software service revenue.",
      ar: "تبحث أرانتو عن مسؤول تطوير أعمال طموح لتحديد العملاء المحتملين وبدء محادثات مهنية مع أصحاب الشركات وتحويل الفرص إلى إيرادات مستمرة.",
    },
    aboutRole: {
      en: [
        "Arranto is a growing digital services company helping businesses build, improve, and scale their digital presence through modern technology and digital solutions.",
        "We are looking for a Business Development Executive who can help us identify the right businesses, start meaningful conversations with decision-makers, generate qualified opportunities, and convert them into long-term clients.",
        "This is a full-time remote opportunity and is suitable for both freshers and experienced candidates.",
        "We are not looking for someone who simply sends hundreds of generic messages every day. We are looking for someone who can understand a prospect's business, identify genuine opportunities, communicate value clearly, follow up consistently, and ultimately generate revenue."
      ],
      ar: [
        "أرانتو شركة خدمات رقمية متنامية تساعد الشركات على بناء وتوسيع تواجدها الرقمي عبر أحدث التقنيات والحلول الرقمية.",
        "نبحث عن مسؤول تطوير أعمال للمساعدة في استهداف الشركات المناسبة، وبدء محادثات هادفة مع صناع القرار، وتوليد فرص مؤهلة وتحويلها إلى عملاء دائمين.",
        "فرصة عمل كاملة عن بُعد ومناسبة للخريجين الجدد وأصحاب الخبرة.",
        "لا نبحث عن شخص يرسل مئات الرسائل العشوائية يوميًا، بل عن شخص يفهم متطلبات العميل ويوضح القيمة الفعلية ويتابع بذكاء."
      ]
    },
    responsibilities: {
      en: [
        {
          title: "Prospecting & Market Research",
          items: [
            "Research and identify businesses that could benefit from Arranto's digital services.",
            "Find business owners, founders, directors, managers, and relevant C-level decision-makers.",
            "Build and maintain a qualified, high-intent B2B prospect database."
          ]
        },
        {
          title: "Outreach & Consultative Conversations",
          items: [
            "Prospect through LinkedIn, Google, business directories, email, WhatsApp, calls, and other channels.",
            "Initiate professional, engaging conversations with potential clients.",
            "Understand the prospect's business model, technical challenges, requirements, and growth goals."
          ]
        },
        {
          title: "Qualification, Meeting & Closing",
          items: [
            "Qualify prospects based on requirements, budget, authority, and timeline fit.",
            "Present relevant Arranto services and articulate how they solve business pain points.",
            "Schedule meetings and discussions with qualified prospects.",
            "Follow up consistently throughout the sales cycle, handle objections, and assist in deal closure."
          ]
        }
      ],
      ar: [
        {
          title: "البحث وتحديد الفرص",
          items: [
            "البحث عن الشركات والمنشآت التي تحتاج إلى خدمات وحلول أرانتو الرقمية.",
            "الوصول إلى أصحاب الشركات والمديرين وصناع القرار الفعليين.",
            "بناء وإدارة قوائم عملاء محتملين مؤهلة وعالية الجودة."
          ]
        },
        {
          title: "التواصل وإجراء المحادثات",
          items: [
            "التواصل عبر لينكد إن، والبريد الإلكتروني، والواتساب، والمكالمات الهاتفية.",
            "بدء محادثات مهنية تشرح القيمة التنافسية لخدمات أرانتو.",
            "فهم متطلبات العميل ونقاط الضعف في نظامه الرقمي الحالي."
          ]
        },
        {
          title: "التأهيل وجدولة الاجتماعات والإغلاق",
          items: [
            "تأهيل العملاء وفق الميزانية والاحتياج وسلطة اتخاذ القرار.",
            "جدولة الاجتماعات وجلسات العرض مع المستشارين التقنيين.",
            "المتابعة الدقيقة والتعامل مع الاعتراضات باحترافية حتى إتمام التعاقد."
          ]
        }
      ]
    },
    technologiesOrSkills: {
      en: [
        {
          category: "Core Sales & Communication",
          items: [
            "Excellent verbal and written English communication",
            "Confidence when speaking with business owners and decision-makers",
            "Strong interpersonal and relationship-building skills",
            "Ability to understand business requirements and ask the right questions",
            "Good persuasion, negotiation, and objection handling"
          ]
        },
        {
          category: "Lead Generation & Outreach Tools",
          items: [
            "Strong prospecting and lead-generation skills",
            "Cold calling and multi-channel outreach ability",
            "LinkedIn prospecting and research skills",
            "Comfortable working with Google Workspace, spreadsheets, LinkedIn, WhatsApp & CRM tools"
          ]
        },
        {
          category: "Mindset & Execution",
          items: [
            "Self-motivated, target-oriented, and focused on measurable revenue",
            "Strong follow-up and pipeline management",
            "Resilience: ability to handle rejection professionally and keep prospecting consistently",
            "Ability to work independently in a 100% remote environment"
          ]
        }
      ],
      ar: [
        {
          category: "التواصل والمبيعات",
          items: [
            "مهارات تواصل ممتازة باللغة الإنجليزية (كتابة وتحدثًا)",
            "الثقة واللباقة عند التحدث مع أصحاب الأعمال",
            "مهارات التفاوض والإقناع والتعامل مع الاعتراضات"
          ]
        },
        {
          category: "أدوات البحث والتنقيب",
          items: [
            "مهارات البحث في لينكد إن وتوليد العملاء المحتملين",
            "القدرة على إجراء المكالمات والمراسلات الباردة الفعالة",
            "التعامل مع جداول البيانات وأدوات CRM والواتساب"
          ]
        }
      ]
    },
    requirements: {
      en: [
        "0–1+ years of relevant experience in sales, business development, lead generation, telecalling, or customer acquisition.",
        "Freshers are warmly welcome to apply.",
        "Prior experience is helpful but not mandatory. If you have strong communication skills, confidence, sales ability, and the willingness to learn, we encourage you to apply.",
        "Fluent and professional English communication is essential.",
        "Equipped and comfortable working 100% remotely."
      ],
      ar: [
        "0-1+ سنوات من الخبرة في المبيعات وتطوير الأعمال وتوليد العملاء.",
        "نرحب ترحيبًا حارًا بالخريجين الجدد.",
        "إتقان التواصل المهني باللغة الإنجليزية شرط أساسي.",
        "الجاهزية الكاملة للعمل عن بُعد."
      ]
    },
    whatWeOffer: {
      en: [
        "Full-time remote position with complete geographic flexibility.",
        "Performance-driven compensation: fixed component + generous incentives/commissions.",
        "Uncapped earning growth based on closed deals and performance.",
        "Hands-on experience in high-ticket B2B tech sales and client acquisition.",
        "Merit-based environment with direct growth as contribution increases."
      ],
      ar: [
        "وظيفة كاملة عن بُعد بمرونة مكانية تامة.",
        "هيكل تعويضات مجزٍ: راتب ثابت + عمولات وحوافز أداء تصاعدية.",
        "اكتساب خبرة مباشرة في مبيعات التكنولوجيا وخدمات B2B.",
        "بيئة عمل تعتمد على الإنجاز الفعلي والنمو السريع."
      ]
    },
    whoShouldApply: {
      en: [
        "You enjoy talking to people and building professional relationships.",
        "You are comfortable approaching new businesses and making cold calls.",
        "You communicate confidently with founders and executives.",
        "You are motivated by targets and performance-based earnings.",
        "You work independently with discipline and are eager to learn continuously."
      ],
      ar: [
        "تستمتع بالتحدث مع الناس وبناء علاقات مهنية مثمرة.",
        "لا تتردد في إجراء المكالمات والتواصل مع الشركات الجديدة.",
        "تتواصل بثقة مع المديرين وصناع القرار.",
        "يحفزك تحقيق الأهداف وزيادة الدخل المرتبط بالإنجاز."
      ]
    },
    screening: {
      experienceOptions: [
        "0–1 years (Fresher welcome)",
        "1–2 years",
        "2+ years"
      ],
      q1Label: "English Communication Skills",
      q1Options: [
        "Yes — Fluent & confident in professional English",
        "No — Basic / Not comfortable speaking with founders"
      ],
      q2Label: "Remote Work Setup & Readiness",
      q2Options: [
        "Yes — Fully equipped with laptop/stable internet & comfortable working remotely",
        "No — Prefer in-office setup only"
      ],
      scenarioTitle: "Outreach Scenario Question",
      scenarioQuestion: "Imagine you have identified a business that could benefit from Arranto's services. How would you approach the business owner for the first time and try to turn them into a client?",
      scenarioPlaceholder: "Walk us through your initial research, the message angle or cold call opening you would use, what value you would highlight, and how you would guide the discussion toward a meeting."
    }
  }
];

export function getJobBySlug(slug: string): JobDetail | undefined {
  return jobPostings.find((j) => j.slug === slug);
}
