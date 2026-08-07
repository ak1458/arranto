import type { Repo } from '@/lib/github';
import { Link } from '@/i18n/navigation';

type Props = {
  repos: Repo[];
  eyebrow: string;
  heading: string;
};

// Renders the live GitHub feed as real links into /work/[slug] (the same route's
// repo-fallback branch already builds a full, honest detail page from real repo
// data — no separate modal, no invented overview/business-value copy).
export function WorkPortfolioModal({ repos, eyebrow, heading }: Props) {
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
              {repos.length} REPOSITORIES
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((r) => (
            <Link
              key={r.name}
              href={`/work/${r.name}`}
              className="group flex flex-col justify-between border border-white/10 bg-[#0a0a0a] p-6 sm:p-7 shadow-xl transition-colors duration-300 hover:border-[#d8d9dc] hover:bg-[#111114]"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#d8d9dc]">
                    {r.formattedName}
                  </h3>
                  <span className="font-mono text-xs text-[#8e8f94] group-hover:text-white transition-colors">
                    &rarr;
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
                      <span className="size-1.5 bg-[#d8d9dc]" />
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
