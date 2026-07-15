'use client';

import React, { useState } from 'react';
import type { Repo } from '@/lib/github';
import { caseStudies } from '@/content/work';
import { NanobannerCard } from '@/components/NanobannerCard';

type Props = {
  repos: Repo[];
  eyebrow: string;
  heading: string;
};

// Cross-reference against the real, honest case-study data — a repo that matches
// a known Arranto build shows its real status; anything else is just a public repo,
// never a claimed production/pilot status we can't verify.
function statusFor(repoName: string): string {
  const match = caseStudies.find((c) => c.repo === repoName);
  if (!match) return 'OPEN SOURCE';
  return match.status === 'proven' ? 'PROVEN SYSTEM' : 'ACTIVE PILOT';
}

export function WorkPortfolioModal({ repos, eyebrow, heading }: Props) {
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  if (repos.length === 0) return null;

  return (
    <section className="bg-[#050505] pb-28 border-t border-white/10 pt-20 select-none">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#d8d9dc]">
              {eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
              {heading}
            </h2>
            <p className="mt-2 font-mono text-xs text-[#8e8f94] uppercase tracking-wider">
              {repos.length} REPOSITORIES // CLICK ANY ARCHITECTURE FOR DETAIL
            </p>
          </div>
        </div>

        {/* Responsive Grid of GitHub Repositories */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((r) => (
            <div
              key={r.name}
              onClick={() => setSelectedRepo(r)}
              className="group cursor-pointer flex flex-col justify-between border border-white/10 bg-[#0a0a0a] p-6 sm:p-7 shadow-xl transition-all duration-300 hover:border-[#d8d9dc] hover:bg-[#111114] active:border-white"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#d8d9dc]">
                    {r.formattedName}
                  </h3>
                  <span className="font-mono text-xs text-[#8e8f94] group-hover:text-white transition-colors">
                    [INSPECT] &rarr;
                  </span>
                </div>
                <p className="mt-3 text-sm font-light leading-relaxed text-[#9494a0] line-clamp-3">
                  {r.description}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  {r.language && (
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#d8d9dc]">
                    <span className="size-1.5 bg-[#d8d9dc]"/>
                      {r.language}
                    </span>
                  )}
                </div>
                {r.stars > 0 && (
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8e8f94]">
                    &#9733; {r.stars}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Nanobanner Architecture Modal (Clean, No Huge Images) */}
      {selectedRepo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-fade-in"
          onClick={() => setSelectedRepo(null)}
        >
          <div
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-white/20 bg-[#0a0a0a] p-6 sm:p-8 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#d8d9dc]">
                  SYSTEM ARCHITECTURE // TECHNICAL BRIEFING
                </span>
                <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {selectedRepo.formattedName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRepo(null)}
                className="border border-white/20 px-3.5 py-1.5 font-mono text-xs text-[#8e8f94] hover:border-white hover:text-white"
              >
                [CLOSE &times;]
              </button>
            </div>

            {/* Embedded Nanobanner Card representing the product visually & technically */}
            <NanobannerCard
              title={selectedRepo.formattedName}
              category={selectedRepo.language || 'ENGINEERING ARCHITECTURE'}
              status={statusFor(selectedRepo.name)}
              stack={selectedRepo.topics.slice(0, 4)}
            />

            <div className="mt-6 space-y-6">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#d8d9dc] mb-2">
                  Description
                </h4>
                <p className="text-sm sm:text-base font-light leading-relaxed text-[#d8d9dc]">
                  {selectedRepo.description}
                </p>
              </div>

              <div className="border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {selectedRepo.topics.map((t) => (
                    <span
                      key={t}
                      className="border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-[#9494a0]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={selectedRepo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#d8d9dc]"
                >
                  View GitHub Architecture &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
