import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { serviceDetails, type Locale } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return pageMetadata({
    title: isArabic ? "خدمات البرمجيات والذكاء الاصطناعي | أرانطو" : "AI, SaaS & Custom Software Services | Arranto",
    description: isArabic
      ? "خدمات أرانطو لبناء أتمتة الذكاء الاصطناعي ومنصات SaaS وأنظمة الأعمال والمواقع وحلول النمو المخصصة."
      : "Explore Arranto services for AI automation, custom AI solutions, SaaS products, CRM systems, high-performance websites, and measurable growth.",
    path: "/services",
    locale,
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = (locale === "ar" ? "ar" : "en") as Locale;
  const isArabic = l === "ar";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: isArabic ? "خدمات أرانطو" : "Arranto Services",
        description: isArabic
          ? "خدمات تطوير البرمجيات والذكاء الاصطناعي المخصصة من أرانطو."
          : "Arranto's custom software, AI, SaaS, CRM, website, and growth services.",
        url: `https://arranto.com/${l}/services`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: serviceDetails.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service.title[l],
            url: `https://arranto.com/${l}/services/${service.slug}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: isArabic ? "الرئيسية" : "Home", item: `https://arranto.com/${l}` },
          { "@type": "ListItem", position: 2, name: isArabic ? "الخدمات" : "Services", item: `https://arranto.com/${l}/services` },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="px-6 pb-16 md:px-12 border-b border-white/10">
        <div className="mx-auto max-w-6xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#d8d9dc]">
            {isArabic ? "أرانطو // الخدمات" : "ARRANTO // SERVICES"}
          </span>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold tracking-tight">
            {isArabic ? "نبني الأنظمة التي يحتاجها عملك" : "Software built around how your business works."}
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-[#9494a0] font-light leading-relaxed">
            {isArabic
              ? "من الأتمتة والمنصات الذكية إلى أنظمة الأعمال والمواقع، نبدأ من المشكلة الفعلية ونبني حلاً قابلاً للاستخدام والتطوير."
              : "From AI automation and SaaS products to business systems and high-performance websites, each engagement starts with the real problem and ends with a usable, maintainable system."}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-20 md:px-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {serviceDetails.map((service) => (
            <article key={service.slug} className="border border-white/10 bg-[#08080a] p-7 transition-colors hover:border-white/30">
              <h2 className="font-display text-2xl font-bold tracking-tight text-white">
                <Link href={`/services/${service.slug}`} className="hover:text-[#d8d9dc]">
                  {service.title[l]}
                </Link>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#9494a0]">{service.subtitle[l]}</p>
              <Link
                href={`/services/${service.slug}`}
                className="mt-8 inline-flex border border-white/20 px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-[#d8d9dc] transition-colors hover:bg-white hover:text-black"
              >
                {isArabic ? "عرض الخدمة" : "Explore service"} <span aria-hidden className="ms-2">→</span>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
