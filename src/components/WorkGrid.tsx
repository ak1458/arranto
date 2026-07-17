'use client';

import type { Status } from '@/content/work';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Reveal } from '@/components/Reveal';

/**
 * A tile carries only what it renders, already localized. Passing whole CaseStudy objects
 * into this client component serialized every product's `body` and FAQ — including the
 * Saudi Arabia / ZATCA / CCSID detail — into the HTML of every page the grid appears on,
 * home included. Proof-layer content stays on the proof pages (MASTER-CONTEXT §1).
 */
export type WorkCard = {
  slug: string;
  title: string;
  status: Status;
  stack: string[];
  /** One-line, region-free tile copy. */
  outcome: string;
  /** Proof-layer paragraph. Supplied on /work only; omitted on the home teaser. */
  summary?: string;
  /** Image for the project thumbnail. */
  image?: string;
};

export function WorkGrid({
  items,
  withHeader = true,
}: {
  items: WorkCard[];
  withHeader?: boolean;
}) {
  const t = useTranslations('work');

  return (
    <section id="work" className="py-24 px-6 md:px-16 bg-[#050505] text-white border-b border-white/10">
      {withHeader && (
        <Reveal className="max-w-4xl mx-auto mb-16">
          <span className="font-mono text-xs tracking-[0.18em] uppercase text-[#d8d9dc]">
            {t('eyebrow')}
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            {t('heading')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#9494a0] max-w-2xl leading-relaxed">
            {t('gridIntro')}
          </p>
        </Reveal>
      )}

      {/* Sticky Stacking Cards Container (Section 6) + Global Hover Jiggle (Section 2) */}
      <Reveal delay={0.1} className="stack-container">
        {items.map((project, idx) => {
          const indexNumber = (idx + 1).toString().padStart(2, '0');
          const isProven = project.status === 'proven';

          return (
            <article
              key={project.slug}
              className="stack-card card-hover group relative"
              style={{ '--stack-top': `${16 + idx * 3}vh` } as React.CSSProperties}
            >
              <Link href={`/work/${project.slug}`} className="absolute inset-0 z-10">
                <span className="sr-only">View {project.title}</span>
              </Link>
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                  <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#9494a0]">
                    {indexNumber} / {project.title}
                  </span>

<div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#9494a0]">
                    <span
                      className={
                        isProven
                        ? 'size-1.5 bg-[#d8d9dc]'
                        : 'size-1.5 border border-[#d8d9dc] bg-transparent'
                      }
                    />
                    <span>{isProven ? t('badgeProven') : t('badgePilot')}</span>
                  </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-12 items-center mt-6">
                  <div className="lg:col-span-7">
                    <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white group-hover:text-[#d8d9dc] transition-colors">
                      <Link href={`/work/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>
                    <p className="mt-4 text-base sm:text-lg text-[#9494a0] max-w-2xl leading-relaxed">
                      {project.summary ?? project.outcome}
                    </p>
                  </div>
                  <div className="lg:col-span-5">
                    <Link
                      href={`/work/${project.slug}`}
                      className="block overflow-hidden border border-white/10 bg-[#0a0a0e] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] group-hover:border-[#d8d9dc]/40 relative aspect-video"
                    >
                      {project.image ? (
                        <Image src={project.image} alt={project.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#121218]" />
                      )}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs tracking-wider px-3 py-1.5 border border-white/20 text-[#9494a0]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Only where the paragraph is the longer proof-layer summary — on the home
                    teaser the paragraph IS the outcome, and repeating it would state the same
                    value proposition twice on one page (arranto-rules.md). */}
                {project.summary && (
                <div className="flex items-center gap-3 font-mono text-xs border border-[#d8d9dc]/30 bg-[#d8d9dc]/10 px-4 py-2">
                    <span className="text-[#9494a0] uppercase tracking-wider">{t('outcomeLabel')}</span>
                    <span className="font-bold text-[#d8d9dc]">{project.outcome}</span>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </Reveal>

      <p className="mt-16 text-center font-mono text-xs uppercase tracking-wider text-[#9494a0]">
        {t('moreComing')}
      </p>
    </section>
  );
}
