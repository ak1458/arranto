import type { ServiceDetail } from './services';

// Offering confirmed by the owner on 2026-10-30. No shipped-app claims.
export const mobileService: ServiceDetail = {
  slug: 'mobile-app-development',
  title: { en: 'Mobile App Development for iOS & Android', ar: 'تطوير تطبيقات الجوال لنظامي iOS وAndroid' },
  subtitle: {
    en: 'Plan, build and hand over a mobile app around the work your customers or team need to complete. Platform coverage and release scope are agreed before development.',
    ar: 'خطط وابنِ تطبيق جوال حول المهام التي يحتاج عملاؤك أو فريقك إلى إنجازها. نتفق على الأنظمة المستهدفة ونطاق الإصدار قبل التطوير.',
  },
  citablePassage: {
    en: 'Arranto offers mobile app development for businesses serving global customers. An engagement starts with the core user journey, target devices, backend dependencies and release requirements. The agreed scope can include an iOS or Android app, account access, APIs, selected device capabilities and store submission preparation. Native versus shared-code implementation is a project decision. Source ownership, testing coverage, handover and support are documented in the proposal. App store approval and review timing remain decisions of Apple and Google.',
    ar: 'تقدم أرانتو تطوير تطبيقات الجوال للشركات التي تخدم عملاء حول العالم. يبدأ العمل بتحديد رحلة المستخدم والأجهزة المستهدفة واعتماد التطبيق على الخادم ومتطلبات الإصدار. قد يشمل النطاق تطبيق iOS أو Android وتسجيل الدخول وواجهات API وميزات الجهاز المختارة والتحضير للتقديم للمتجر. نحدد التطوير الأصلي أو الكود المشترك حسب المشروع، ونوثق الملكية والاختبارات والتسليم والدعم في العرض. تبقى الموافقة ومدة المراجعة من اختصاص Apple وGoogle.',
  },
  overview: {
    en: [
      'A mobile app is useful when the workflow benefits from a device capability, repeated use or a focused experience away from the desktop. Discovery compares those needs with a responsive web application so the platform choice follows the product.',
      'The first milestone is a reviewable flow: screens, account roles, data the app needs and how a task completes. From there, scope the backend, integrations, notification rules, offline requirements and release checks. Each additional platform and device behavior changes the test matrix.',
    ],
    ar: [
      'يفيد تطبيق الجوال عندما يحتاج مسار العمل إلى ميزة في الجهاز أو استخدام متكرر أو تجربة مركزة بعيداً عن الحاسوب. نقارن هذه الاحتياجات بتطبيق ويب متجاوب حتى يتبع اختيار المنصة احتياجات المنتج.',
      'الخطوة الأولى مسار قابل للمراجعة يشمل الشاشات والأدوار والبيانات وكيفية إكمال المهمة. ثم نحدد الخادم والتكاملات والإشعارات والعمل دون اتصال واختبارات الإصدار. كل منصة أو سلوك جهاز إضافي يوسع نطاق الاختبار.',
    ],
  },
  features: {
    en: [
      { title: 'Platform & interaction design', desc: 'Define iOS/Android coverage, accessibility, navigation and device layouts around the real user journey.' },
      { title: 'Backend & account access', desc: 'Scope APIs, server-side permissions, account recovery and data synchronization with existing systems.' },
      { title: 'Device features where needed', desc: 'Agree camera, location, notifications or offline behavior explicitly, including permission denial and retry states.' },
      { title: 'Release & ownership', desc: 'Prepare builds, a device test record, store submission material and repository/build handover under client-owned accounts.' },
    ],
    ar: [
      { title: 'تصميم المنصة والتفاعل', desc: 'حدد دعم iOS وAndroid وإمكانية الوصول والتنقل وتخطيط الأجهزة حول رحلة المستخدم.' },
      { title: 'الخادم والحسابات', desc: 'حدد واجهات API والصلاحيات على الخادم واستعادة الحساب ومزامنة البيانات مع الأنظمة الحالية.' },
      { title: 'ميزات الجهاز عند الحاجة', desc: 'نتفق صراحة على الكاميرا والموقع والإشعارات أو العمل دون اتصال، بما فيها رفض الأذونات وإعادة المحاولة.' },
      { title: 'الإصدار والملكية', desc: 'جهز ملفات الإصدار وسجل اختبار الأجهزة ومواد المتجر وتسليم المستودع وتعليمات البناء ضمن حسابات العميل.' },
    ],
  },
  gulfCompliance: {
    en: 'Language, distribution countries, privacy disclosures and payment requirements follow the intended market. Arabic/RTL and other localization requirements are scoped when needed. Developer accounts and store fees are client responsibilities unless agreed otherwise.',
    ar: 'تتبع اللغة ودول التوزيع وإفصاحات الخصوصية ومتطلبات الدفع السوق المستهدف. نحدد العربية ودعم الاتجاه من اليمين إلى اليسار أو اللغات الأخرى عند الحاجة. حسابات المطور ورسوم المتاجر مسؤولية العميل ما لم نتفق على غير ذلك.',
  },
  faq: [
    { q: { en: 'Should we build for both iOS and Android at launch?', ar: 'هل نطلق على iOS وAndroid معاً؟' }, a: { en: 'Choose coverage from your users’ devices, required features and test budget. One platform can be a useful first release; launching both needs an explicit acceptance matrix for each.', ar: 'نحدد التغطية حسب أجهزة المستخدمين والميزات المطلوبة وميزانية الاختبار. قد تكفي منصة واحدة للإصدار الأول، بينما يحتاج إطلاق المنصتين إلى اختبارات قبول واضحة لكل منهما.' } },
    { q: { en: 'Can the app use our existing business software?', ar: 'هل يمكن للتطبيق استخدام برمجياتنا الحالية؟' }, a: { en: 'An integration is scoped after reviewing the existing APIs, permissions and data model. If a backend has no suitable API, the integration work must be included rather than assumed.', ar: 'نحدد التكامل بعد مراجعة واجهات API والصلاحيات ونموذج البيانات. إذا لم يوفر النظام واجهة مناسبة فيجب تضمين تطوير التكامل في النطاق.' } },
    { q: { en: 'Are store approval and ongoing costs included?', ar: 'هل تشمل الخدمة موافقة المتجر والتكاليف المستمرة؟' }, a: { en: 'The proposal defines submission assistance and support. Store approval is not guaranteed. Developer-account fees, hosting, paid APIs and maintenance are separate items to agree before launch.', ar: 'يحدد العرض المساعدة في التقديم والدعم. لا نضمن موافقة المتجر. رسوم حسابات المطور والاستضافة والواجهات المدفوعة والصيانة بنود منفصلة نتفق عليها قبل الإطلاق.' } },
    { q: { en: 'Can I review shipped mobile-app examples?', ar: 'هل يمكنني مراجعة أمثلة لتطبيقات جوال منشورة؟' }, a: { en: 'Ask for examples relevant to your platform and workflow during scoping. The public case studies on this site currently document web and business systems; they should not be treated as proof of a published mobile app.', ar: 'اطلب أمثلة مرتبطة بمنصتك ومسار عملك عند تحديد النطاق. توثق دراسات الحالة العامة هنا حالياً أنظمة ويب وأعمال، ولا ينبغي اعتبارها دليلاً على تطبيق جوال منشور.' } },
  ],
};
