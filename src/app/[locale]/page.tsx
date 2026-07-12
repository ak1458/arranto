import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { TechnicalScene } from "@/components/TechnicalScene";
import { ExecutionScene } from "@/components/ExecutionScene";
import { WorkGrid } from "@/components/WorkGrid";
import { TerminalForm } from "@/components/TerminalForm";
import { alternatesFor, ORG_JSONLD } from "@/lib/seo";
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
      <Hero />
      <TechnicalScene
        mode="systems"
        index="01"
        eyebrow="SYSTEMS EVERYWHERE."
        lines={["Disconnected.", "Inefficient.", "Holding you back."]}
      />
      <TechnicalScene
        mode="core"
        index="02"
        eyebrow="ONE INTELLIGENT CORE."
        lines={["We connect", "everything that", "matters."]}
      />
      <ExecutionScene />
      <WorkGrid items={sorted} locale={locale as Locale} />
      <TerminalForm />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
      />
    </>
  );
}
