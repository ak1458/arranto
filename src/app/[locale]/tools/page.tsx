import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { ToolsWorkbench } from "@/components/ToolsWorkbench";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    title: t("toolsTitle"),
    description: t("toolsDescription"),
    path: "/tools",
    locale,
  });
}

const tools = [
  {
    href: "/tools/website-audit",
    titleKey: "toolsGrid.audit.title",
    badge: "toolsGrid.audit.badge",
    descKey: "toolsGrid.audit.desc",
    features: ["toolsGrid.audit.f1", "toolsGrid.audit.f2", "toolsGrid.audit.f3", "toolsGrid.audit.f4"],
  },
  {
    href: "/tools/seo-content",
    titleKey: "toolsGrid.seo.title",
    badge: "toolsGrid.seo.badge",
    descKey: "toolsGrid.seo.desc",
    features: ["toolsGrid.seo.f1", "toolsGrid.seo.f2", "toolsGrid.seo.f3", "toolsGrid.seo.f4"],
  },
  {
    href: "/tools/brand-kit",
    titleKey: "toolsGrid.brand.title",
    badge: "toolsGrid.brand.badge",
    descKey: "toolsGrid.brand.desc",
    features: ["toolsGrid.brand.f1", "toolsGrid.brand.f2", "toolsGrid.brand.f3", "toolsGrid.brand.f4"],
  },
  {
    href: "/tools/content-calendar",
    titleKey: "toolsGrid.calendar.title",
    badge: "toolsGrid.calendar.badge",
    descKey: "toolsGrid.calendar.desc",
    features: ["toolsGrid.calendar.f1", "toolsGrid.calendar.f2", "toolsGrid.calendar.f3", "toolsGrid.calendar.f4"],
  },
  {
    href: "/tools/document-intelligence",
    titleKey: "toolsGrid.docs.title",
    badge: "toolsGrid.docs.badge",
    descKey: "toolsGrid.docs.desc",
    features: ["toolsGrid.docs.f1", "toolsGrid.docs.f2", "toolsGrid.docs.f3", "toolsGrid.docs.f4"],
  },
  {
    href: "/tools/website-factory",
    titleKey: "toolsGrid.factory.title",
    badge: "toolsGrid.factory.badge",
    descKey: "toolsGrid.factory.desc",
    features: ["toolsGrid.factory.f1", "toolsGrid.factory.f2", "toolsGrid.factory.f3", "toolsGrid.factory.f4"],
  },
  {
    href: "/tools/yt-bulk-optimizer",
    titleKey: "toolsGrid.yt.title",
    badge: "toolsGrid.yt.badge",
    descKey: "toolsGrid.yt.desc",
    features: ["toolsGrid.yt.f1", "toolsGrid.yt.f2", "toolsGrid.yt.f3", "toolsGrid.yt.f4"],
  },
];

export default async function ToolsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tools");

  return (
    <div className="relative min-h-screen bg-[#050505] text-paper">
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-36 md:px-12">
        <Reveal>
          <div className="mb-16 text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#d8d9dc]">
              {t("eyebrow")}
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.04] tracking-[-0.04em]">
              {t("heading")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#9494a0] font-light">
              {t("subline")}
            </p>
          </div>
        </Reveal>

        <ToolsWorkbench
          tools={tools.map((tool) => ({
            href: tool.href,
            title: t(tool.titleKey),
            badge: t(tool.badge),
            desc: t(tool.descKey),
            features: tool.features.map((f) => t(f)),
          }))}
          openText={t("openTool")}
        />
      </div>
    </div>
  );
}
