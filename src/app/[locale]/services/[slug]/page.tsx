import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { getServiceBySlug, Locale } from "@/content/services";

type Props = { params: Promise<{ locale: string; slug: string }> };

type BlueprintStep = { num: string; title: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = (locale === "ar" ? "ar" : "en") as Locale;
  const serviceDetail = getServiceBySlug(slug);

  if (!serviceDetail) {
    return pageMetadata({
      title: "Service Not Found",
      description: "The requested service could not be found.",
      path: `/services/${slug}`,
      locale,
    });
  }

  return pageMetadata({
    title: `${serviceDetail.title[l]} | Arranto`,
    description: serviceDetail.subtitle[l],
    path: `/services/${slug}`,
    locale,
  });
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = (locale === "ar" ? "ar" : "en") as Locale;
  const serviceDetail = getServiceBySlug(slug);

  if (!serviceDetail) {
    notFound();
  }

  const tRoot = await getTranslations();
  const blueprint = tRoot.raw("blueprint") as {
    heading: string;
    pricingHeading: string;
    pricingBody: string;
    steps: BlueprintStep[];
    cta: string;
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceDetail.title[l],
    description: serviceDetail.citablePassage[l],
    provider: {
      "@type": "Organization",
      name: "Arranto",
      url: "https://arranto.com",
      founder: {
        "@type": "Person",
        name: "Ashraf Kamal",
        url: "https://github.com/ak1458",
      },
    },
    areaServed: ["SA", "AE", "KW", "QA", "OM", "BH"],
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        minPrice: serviceDetail.startingTier.replace(/[^0-9]/g, ""),
      },
    },
  };

  return (
    <div className="relative min-h-svh w-full bg-[#050505] text-white overflow-hidden py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Background flare */}
      <div className="absolute top-0 start-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-[#d8d9dc]/5 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12">
        <Link
          href="/#services"
          className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#8e8f94] transition-colors duration-300 hover:text-white mb-16"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 rtl:-scale-x-100">
            ←
          </span>
          {locale === "ar" ? "العودة" : "BACK TO SERVICES"}
        </Link>

        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-12">
          <div className="mb-4 inline-flex border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#d8d9dc]">
            SERVICE_DETAILS // {slug.toUpperCase().replace(/-/g, "_")}
          </div>
          <h1 className="mt-4 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold uppercase leading-[1.0] tracking-tight">
            {serviceDetail.title[l]}
          </h1>
          <p className="mt-6 text-lg text-[#a1a2a7] max-w-3xl font-light leading-relaxed">
            {serviceDetail.subtitle[l]}
          </p>

          {/* E-E-A-T Author Badge */}
          <div className="mt-8 inline-flex items-center gap-3 border border-white/10 bg-[#0A0A0C] px-4 py-2 text-xs text-[#8e8f94] font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {locale === "ar"
                ? "إشراف وتصميم المهندس: أشرف كمال (Founder & Lead Architect)"
                : "Architected & Managed by: Ashraf Kamal (Founder & Principal Engineer)"}
            </span>
          </div>
        </div>

        {/* AEO / GEO Citable Answer Block */}
        <div className="mb-16 border border-[#d8d9dc]/30 bg-[#0c0d10] p-8 rounded-sm">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[#d8d9dc] flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-[#d8d9dc]" />
            {locale === "ar" ? "ملخص معتمد لمرحلة البحث" : "EXECUTIVE SUMMARY // AEO CITATION BLOCK"}
          </div>
          <p className="text-base text-white/90 leading-relaxed font-normal">
            {serviceDetail.citablePassage[l]}
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Main Column */}
          <div className="lg:col-span-7 flex flex-col gap-16">
            {/* Overview */}
            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#d8d9dc] mb-6 border-b border-white/10 pb-3">
                {locale === "ar" ? "نظرة عامة على الخدمة" : "Overview & Approach"}
              </h2>
              <div className="flex flex-col gap-4 text-base text-[#c4c5c9] font-light leading-relaxed">
                {serviceDetail.overview[l].map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#d8d9dc] mb-6 border-b border-white/10 pb-3">
                {locale === "ar" ? "المميزات الرئيسية" : "Core Capabilities"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {serviceDetail.features[l].map((feat, i) => (
                  <div key={i} className="border border-white/10 bg-[#08080a] p-5">
                    <h3 className="font-mono text-xs text-white uppercase tracking-wider mb-2 font-semibold">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-[#8e8f94] leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Blueprint Process */}
            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#d8d9dc] mb-8 border-b border-white/10 pb-4">
                {blueprint.heading}
              </h2>

              <div className="flex flex-col gap-6 relative before:absolute before:inset-y-0 before:start-4 before:w-[1px] before:bg-white/10">
                {blueprint.steps.map((step, index) => (
                  <div key={index} className="relative flex items-start gap-6 group">
                    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center bg-[#050505] font-mono text-[10px] text-[#8e8f94] transition-colors group-hover:text-white group-hover:bg-[#d8d9dc]/10 ring-1 ring-white/10">
                      {step.num}
                    </div>
                    <div className="pt-1.5">
                      <p className="text-base font-light text-[#d8d9dc] leading-relaxed group-hover:text-white transition-colors">
                        {step.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service FAQ */}
            {serviceDetail.faq.length > 0 && (
              <div>
                <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#d8d9dc] mb-6 border-b border-white/10 pb-3">
                  {locale === "ar" ? "الأسئلة الشائعة" : "Service FAQs"}
                </h2>
                <div className="flex flex-col gap-6">
                  {serviceDetail.faq.map((item, i) => (
                    <div key={i} className="border border-white/10 bg-[#08080a] p-6">
                      <h3 className="font-mono text-sm text-white font-semibold mb-3">
                        Q: {item.q[l]}
                      </h3>
                      <p className="text-sm text-[#a1a2a7] font-light leading-relaxed">
                        {item.a[l]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Pricing & Compliance */}
          <div className="lg:col-span-5 flex flex-col gap-8 sticky top-32">
            {/* Starting Tier */}
            <div className="border border-white/10 bg-[#0A0A0C] p-8 shadow-2xl">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#8e8f94] mb-2">
                {locale === "ar" ? "يبدأ من" : "ESTIMATED STARTING INVESTMENT"}
              </div>
              <div className="font-mono text-3xl font-bold text-white mb-4">
                {serviceDetail.startingTier}
              </div>
              <p className="text-xs text-[#8e8f94] leading-relaxed border-t border-white/10 pt-4">
                {blueprint.pricingBody}
              </p>
            </div>

            {/* GCC Compliance Badge */}
            <div className="border border-emerald-500/20 bg-emerald-950/10 p-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {locale === "ar" ? "الامتثال الخليجي" : "REGIONAL COMPLIANCE"}
              </div>
              <p className="text-xs text-emerald-200/80 leading-relaxed">
                {serviceDetail.gulfCompliance[l]}
              </p>
            </div>

            {/* CTA Box */}
            <div className="border border-[#d8d9dc]/20 bg-[#d8d9dc]/5 p-8 text-center">
              <p className="font-mono text-[10px] text-[#8e8f94] tracking-widest mb-6 uppercase">
                {locale === "ar" ? "جاهز للبدء؟" : "Ready to get started?"}
              </p>
              <Link
                href={`/contact?service=${slug}`}
                className="inline-flex w-full justify-center items-center gap-2 border border-[#d8d9dc] bg-[#d8d9dc] px-6 py-4 text-xs font-extrabold uppercase tracking-widest text-black transition-all hover:bg-transparent hover:text-[#d8d9dc]"
              >
                {">"} {blueprint.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

