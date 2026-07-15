import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Loader } from "@/components/Loader";
import { Dock } from "@/components/Dock";
import { Hero } from "@/components/Hero";
import { WorkGrid } from "@/components/WorkGrid";
import { TickerSection } from "@/components/TickerSection";
import { ProcessSection } from "@/components/ProcessSection";
import { TerminalForm } from "@/components/TerminalForm";
import { alternatesFor, orgJsonLd } from "@/lib/seo";
import { sorted, type Locale } from "@/content/work";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: alternatesFor("", locale) };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Loader />
      <Dock />
      <Hero />
      {/* Brand layer: tiles carry the name and the region-free outcome only. The proof-layer
          detail (`body`, FAQ) is one click deeper, on /work — MASTER-CONTEXT §1. */}
      <WorkGrid
        items={sorted.map((c) => ({
          slug: c.slug,
          title: c.title,
          status: c.status,
          stack: c.stack,
          outcome: c.outcome[locale as Locale],
        }))}
      />
      <TickerSection />
      <ProcessSection />
      <TerminalForm />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd(locale)) }}
      />
    </>
  );
}
