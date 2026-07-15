'use client';

import { useTranslations } from "next-intl";

/**
 * Reusable instruction/manual block for every tool page.
 * Content lives in the `toolsManual.<toolKey>` namespace (en.json / ar.json)
 * so it stays bilingual and editable without touching component code.
 *
 * Expected shape in messages:
 *   toolsManual.<toolKey> = {
 *     title: string,
 *     subtitle: string,
 *     steps: string[]   // numbered automatically at render
 *   }
 */
export function ToolGuide({ toolKey }: { toolKey: string }) {
  const t = useTranslations(`toolsManual.${toolKey}` as Parameters<typeof useTranslations>[0]);
  const steps = (t.raw("steps") as string[]) ?? [];

  return (
  <section className="border border-paper/10 bg-white/[0.02] p-8 md:p-10">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#d8d9dc]">
        How to use
      </p>
      <h2 className="mt-3 text-2xl font-bold text-paper md:text-3xl">{t("title")}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper/60 font-light">
        {t("subtitle")}
      </p>

      <ol className="mt-8 space-y-4">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-4">
          <span className="flex size-7 shrink-0 items-center justify-center border border-paper/15 bg-paper/[0.04] font-mono text-xs font-bold text-[#d8d9dc]">
              {i + 1}
            </span>
            <p className="pt-0.5 text-sm leading-relaxed text-paper/80 font-light">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
