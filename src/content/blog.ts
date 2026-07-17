export type Locale = "en" | "ar";

export type BlogCategory = 
  | "AI Automation"
  | "Custom AI Solutions"
  | "AI SaaS Development"
  | "AI Development"
  | "Website Development"
  | "Chatbots"
  | "Business Automation"
  | "Planning Software";

export type BlogPost = {
  slug: string;
  title: Record<Locale, string>;
  category: BlogCategory;
  date: string;
  readTime: string;
  excerpt: Record<Locale, string>;
  article: Record<Locale, string>;
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
      ].join("\\n"),
      ar: "محتوى المقال باللغة العربية. (Dummy Arabic content).",
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
      en: "Coming soon.",
      ar: "قريباً.",
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
      en: "Coming soon.",
      ar: "قريباً.",
    }
  }
];

export const getPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
