import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Dock } from "@/components/Dock";
import { Hero } from "@/components/Hero";
import { WorkGrid } from "@/components/WorkGrid";
import { TickerSection } from "@/components/TickerSection";
import { TerminalForm } from "@/components/TerminalForm";
import { alternatesFor } from "@/lib/seo";
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
      <Dock />
      <Hero />
      {/* Brand layer: tiles carry the name and the region-free outcome only. The proof-layer
          detail (`body`, FAQ) is one click deeper, on /work — MASTER-CONTEXT §1.
          Homepage stays a short teaser (the original 4 flagship case studies) — the
          full, growing portfolio (including active-development builds) lives on /work,
          not stacked onto the homepage where it would bloat first-load weight. */}
      <WorkGrid
        items={sorted.slice(0, 4).map((c) => ({
          slug: c.slug,
          title: c.title,
          status: c.status,
          stack: c.stack,
          outcome: c.outcome[locale as Locale],
          image: c.image,
        }))}
      />
      <TickerSection />
      <TerminalForm />
    </>
  );
}
