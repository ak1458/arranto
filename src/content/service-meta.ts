import type { Locale } from "./services";

// Search-result titles/descriptions for the service pages that already earn
// impressions for commercial queries (GSC, Jul–Oct 2026: "web development",
// "digital marketing", "custom software"…). The on-page headings stay as they are;
// these only replace the <title>/meta description, which were the long marketing
// headline and subtitle (one ran to 193 characters and was truncated).
export const serviceMeta: Record<string, Record<Locale, { title: string; description: string }>> = {
  "website-development": {
    en: {
      title: "Web Development Services: Fast, SEO-Ready Websites | Arranto",
      description: "Custom websites and web applications built with Next.js, in English and Arabic (RTL). Fast, SEO-ready and fully owned by you. Talk directly to the founder.",
    },
    ar: {
      title: "خدمات تطوير المواقع: مواقع سريعة وجاهزة لمحركات البحث | أرانتو",
      description: "مواقع وتطبيقات ويب مخصصة مبنية بـ Next.js بالعربية والإنجليزية. سريعة وجاهزة لمحركات البحث وملكيتها كاملة لك. تحدّث مباشرة مع المؤسس.",
    },
  },
  "digital-marketing": {
    en: {
      title: "Digital Marketing & Growth: SEO and AI Content | Arranto",
      description: "Programmatic SEO, AI content workflows and targeted multi-channel ad campaigns to grow customer acquisition, planned and run by the founder.",
    },
    ar: {
      title: "التسويق الرقمي والنمو: تحسين محركات البحث ومحتوى الذكاء الاصطناعي | أرانتو",
      description: "تحسين برمجي لمحركات البحث، وسير عمل محتوى بالذكاء الاصطناعي، وحملات إعلانية موجهة عبر قنوات متعددة لزيادة اكتساب العملاء، يخطط لها وينفذها المؤسس.",
    },
  },
  "custom-software-development": {
    en: {
      title: "Custom Software Development for Your Business | Arranto",
      description: "Software built for how your business runs, not a template. You own the schema, code and deployment, from a studio that ships in weeks, not quarters.",
    },
    ar: {
      title: "تطوير برمجيات مخصصة لأعمالك | أرانتو",
      description: "برمجيات مبنية على طريقة عمل شركتك لا على قالب جاهز. تملك قاعدة البيانات والكود والنشر بالكامل، من استوديو يسلّم خلال أسابيع لا أرباع سنة.",
    },
  },
  "ai-saas-development": {
    en: {
      title: "AI SaaS Development: Build and Launch Your Product | Arranto",
      description: "Build, launch and scale multi-tenant AI-first SaaS products with Next.js, Stripe or HyperPay billing and serverless vector infrastructure.",
    },
    ar: {
      title: "تطوير SaaS بالذكاء الاصطناعي: ابنِ منتجك وأطلقه | أرانتو",
      description: "ابنِ منتجات SaaS متعددة المستأجرين تعتمد على الذكاء الاصطناعي وأطلقها ووسّعها باستخدام Next.js وفوترة Stripe أو HyperPay وبنية متجهات بدون خوادم.",
    },
  },
  "crm-development": {
    en: {
      title: "Custom CRM & ERP Systems to Replace Spreadsheets | Arranto",
      description: "Replace spreadsheets and outdated legacy software with fast business management systems built around how your team actually works.",
    },
    ar: {
      title: "أنظمة CRM وERP مخصصة بدلًا من جداول البيانات | أرانتو",
      description: "استبدل جداول البيانات والبرمجيات القديمة بأنظمة إدارة أعمال سريعة مبنية على طريقة عمل فريقك فعليًا.",
    },
  },
  "zatca-e-invoicing": {
    en: {
      title: "ZATCA E-Invoicing Integration (Phase 2) for Saudi Arabia | Arranto",
      description: "Connect your ERP or invoicing to ZATCA Phase 2: compliant XML, cryptographic stamping, CCSID onboarding and real-time clearance, from the studio behind FATOORA Lite.",
    },
    ar: {
      title: "تكامل الفوترة الإلكترونية فاتورة (المرحلة الثانية) في السعودية | أرانتو",
      description: "اربط نظام تخطيط الموارد أو الفوترة بالمرحلة الثانية من فاتورة: XML متوافق، وختم تشفيري، وتسجيل CCSID، وتخليص فوري، من الاستوديو الذي بنى FATOORA Lite.",
    },
  },
};
