import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

type BlueprintStep = { num: string; title: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  
  const servicesMap = t.raw("servicesList") as Record<string, { title: string; slug: string }>;
  
  // Find the service that matches the slug
  const service = Object.values(servicesMap).find((s) => s.slug === slug);
  if (!service) {
    return pageMetadata({
      title: "Service Not Found",
      description: "The requested service could not be found.",
      path: `/services/${slug}`,
      locale,
    });
  }

  return pageMetadata({
    title: `${service.title} | Arranto`,
    description: `Learn more about our ${service.title} service and the process we follow to deliver exceptional results.`,
    path: `/services/${slug}`,
    locale,
  });
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const tRoot = await getTranslations();
  
  const servicesMap = tRoot.raw("servicesList") as Record<string, { title: string; slug: string }>;
  const service = Object.values(servicesMap).find((s) => s.slug === slug);
  
  if (!service) {
    notFound();
  }

  const blueprint = tRoot.raw("blueprint") as {
    heading: string;
    pricingHeading: string;
    pricingBody: string;
    steps: BlueprintStep[];
    cta: string;
  };

  return (
    <div className="relative min-h-svh w-full bg-[#050505] text-white overflow-hidden py-32">
      {/* Background flare */}
      <div className="absolute top-0 start-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-[#d8d9dc]/5 blur-[140px] pointer-events-none"/>
      
      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12">
        <Link
          href="/#services"
          className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#8e8f94] transition-colors duration-300 hover:text-white mb-16"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 rtl:-scale-x-100">
            ←
          </span>
          {locale === 'ar' ? 'العودة' : 'BACK'}
        </Link>

        {/* Header */}
        <div className="mb-20">
          <div className="mb-4 inline-flex border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#d8d9dc]">
            SERVICE_DETAILS // {slug.toUpperCase().replace(/-/g, '_')}
          </div>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-bold uppercase leading-[0.95] tracking-tight">
            {service.title}
          </h1>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Blueprint Process */}
          <div className="lg:col-span-7">
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

          {/* Sidebar / Pricing */}
          <div className="lg:col-span-5 flex flex-col gap-10 sticky top-32">
            <div className="border border-white/10 bg-[#0A0A0C] p-8 shadow-2xl">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white mb-4 flex items-center gap-2">
                <span className="size-1.5 bg-[#d8d9dc] animate-pulse"></span>
                {blueprint.pricingHeading}
              </h3>
              <p className="text-sm leading-relaxed text-[#8e8f94] font-light">
                {blueprint.pricingBody}
              </p>
            </div>

            <div className="border border-[#d8d9dc]/20 bg-[#d8d9dc]/5 p-8 text-center">
              <p className="font-mono text-[10px] text-[#8e8f94] tracking-widest mb-6 uppercase">Ready to get started?</p>
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
