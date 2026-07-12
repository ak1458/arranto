"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { CaseStudy, Locale } from "@/content/work";

export function TilePattern({ seed = 1, className = "" }: { seed?: number; className?: string }) {
  const random = (index: number) => {
    const value = Math.sin(seed * 127.1 + index * 311.7) * 43758.5453;
    return value - Math.floor(value);
  };
  const coreX = 230 + random(0) * 60;
  const coreY = 60 + random(1) * 80;
  const dots = Array.from({ length: 26 }, (_, index) => ({
    x: 10 + random(index * 3 + 2) * 150,
    y: 10 + random(index * 3 + 3) * 180,
    r: 1 + random(index * 3 + 4) * 1.6,
  }));

  return (
    <svg
      viewBox="0 0 320 200"
      aria-hidden="true"
      className={`block w-full bg-[#050505] rtl:-scale-x-100 ${className}`}
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#FF6B00" opacity={0.2 + (i % 4) * 0.08} />
      ))}
      {dots.slice(0, 7).map((d, i) => (
        <path
          key={`l${i}`}
          d={`M${d.x} ${d.y} Q ${(d.x + coreX) / 2} ${d.y}, ${coreX} ${coreY}`}
          stroke="#FF6B00"
          strokeWidth="0.6"
          opacity="0.25"
          fill="none"
        />
      ))}
      <circle cx={coreX} cy={coreY} r="14" fill="#FF6B00" opacity="0.15" />
      <circle cx={coreX} cy={coreY} r="4" fill="#FF6B00" />
    </svg>
  );
}

export function WorkGrid({ items, locale }: { items: CaseStudy[]; locale: Locale }) {
  const scope = useRef<HTMLElement>(null);

  // Everything shown derives from real case-study content — status labels
  // read from the `status` field, never hand-typed (trust rule, arranto-rules.md).
  const cardsData = items.map((c) => ({
    slug: `/work/${c.slug}`,
    tag: "ENTERPRISE CASE STUDY",
    title: c.title,
    metric: c.outcome[locale],
    desc: c.body[locale],
    stack: c.stack,
    statusLabel: c.status === "proven" ? "PROVEN OUTCOME" : "ACTIVE PILOT",
    color: "from-orange-500/15 to-transparent",
  }));

  useGSAP(
    () => {
      const section = scope.current;
      if (!section) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        // Intro header reveal
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
            },
          })
          .fromTo(
            "[data-work-copy] > *",
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }
          );

        // Stacking Cards depth effect: scale down & subtly dim each card as next card stacks over it
        const wrappers = gsap.utils.toArray<HTMLElement>("[data-work-card-wrapper]");
        wrappers.forEach((wrapper, i) => {
          const nextWrapper = wrappers[i + 1];
          if (!nextWrapper) return;
          const cardInner = wrapper.querySelector("[data-work-card-inner]");
          if (!cardInner) return;

          gsap.to(cardInner, {
            scale: 0.94,
            opacity: 0.65,
            ease: "none",
            scrollTrigger: {
              trigger: nextWrapper,
              start: "top 85%",
              end: "top 25%",
              scrub: true,
            },
          });
        });
      });
    },
    { scope, dependencies: [cardsData.length] }
  );

  return (
    <section
      ref={scope}
      id="work"
      className="relative min-h-svh w-full overflow-clip bg-[#050505] py-28"
    >
      <div className="relative z-10 mx-auto flex min-h-[80svh] max-w-7xl flex-col justify-between px-6 md:px-12">
        {/* Top Header + Right Stepper */}
        <div className="grid w-full gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div data-work-copy className="max-w-lg">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#FF6B00]">
              SELECTED WORK
            </p>
            <h2 className="mt-6 font-sans text-[clamp(2.8rem,5.2vw,5.5rem)] font-light leading-[1.04] tracking-[-0.04em] text-paper">
              Proof over<br />
              <em className="font-display font-normal italic text-[#FF6B00]">
                promises.
              </em>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-paper/75 md:text-lg">
              Every project is engineered for resilience, speed, and measurable
              impact across mission-critical operations.
            </p>
          </div>

          {/* Right Stepper Timeline */}
          <div className="hidden lg:flex flex-col gap-8 font-sans text-sm">
            {[
              { id: "01", label: "Disconnected" },
              { id: "02", label: "Converge" },
              { id: "03", label: "Execute" },
              { id: "04", label: "Deliver" },
            ].map((item, idx) => {
              const isActive = item.id === "04";
              return (
                <div key={item.id} className="relative flex items-center gap-6">
                  {idx < 3 && (
                    <div className="absolute left-[13px] top-6 h-8 w-px bg-paper/15" />
                  )}
                  <span
                    className={`font-mono text-xs font-semibold ${
                      isActive ? "text-[#FF6B00] scale-110" : "text-muted"
                    }`}
                  >
                    {item.id}
                  </span>
                  <span
                    className={`transition-all duration-300 ${
                      isActive
                        ? "text-paper font-medium tracking-wide"
                        : "text-fog/45"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stacking Cards Deck */}
        <div className="mt-20 flex flex-col pb-36">
          {cardsData.map((project, idx) => {
            const indexNumber = (idx + 1).toString().padStart(2, "0");

            return (
              <div
                key={project.title}
                data-work-card-wrapper
                style={{
                  top: `calc(6.5rem + ${idx * 1.5}rem)`,
                }}
                className="sticky w-full mb-12 last:mb-0"
              >
                <a
                  href={project.slug}
                  data-work-card-inner
                  className="group relative block overflow-hidden rounded-[32px] border border-paper/15 bg-[#0D0D0D] p-8 md:p-12 lg:p-14 shadow-[0_25px_65px_rgba(0,0,0,0.85)] transition-all duration-500 hover:border-[#FF6B00]/60 hover:shadow-[0_20px_50px_rgba(255,107,0,0.18)] origin-top"
                >
                  {/* Top Ambient Glow Gradient */}
                  <div
                    className={`absolute inset-x-0 top-0 h-48 bg-gradient-to-b ${project.color} opacity-35 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none`}
                  />

                  {/* Header Tab Bar (stays visible as top tab when next card stacks) */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-paper/10 pb-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#FF6B00]">
                        {indexNumber}
                      </span>
                      <span className="h-3 w-px bg-paper/20" />
                      <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-paper/85">
                        {project.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-paper/15 bg-paper/5 px-3.5 py-1">
                      <span className="size-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
                      <span className="font-mono text-[10px] uppercase tracking-wider text-paper/70">
                        {project.statusLabel}
                      </span>
                    </div>
                  </div>

                  {/* Main Widescreen Card Content */}
                  <div className="relative z-10 mt-8 grid gap-10 lg:grid-cols-12 lg:items-center">
                    {/* Left Column: Title, Description & Stack Pills */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        <h3 className="font-sans text-3xl font-light leading-[1.15] tracking-tight text-paper transition-colors duration-300 group-hover:text-[#FF6B00] md:text-4xl lg:text-5xl">
                          {project.title}
                        </h3>
                        <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper/75 md:text-lg">
                          {project.desc}
                        </p>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="mt-8 flex flex-wrap gap-2.5">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-paper/10 bg-paper/[0.04] px-3.5 py-1.5 font-mono text-xs text-paper/75 transition-colors group-hover:border-paper/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Interactive Telemetry & Verified Outcome Metric */}
                    <div className="lg:col-span-5">
                      <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-paper/12 bg-[#050505]/90 p-6 md:p-8 transition-all duration-300 group-hover:border-[#FF6B00]/40">
                        {/* Ambient Tile Pattern */}
                        <div className="absolute inset-0 opacity-40 pointer-events-none">
                          <TilePattern seed={idx + 1} className="h-full w-full object-cover" />
                        </div>

                        <div className="relative z-10 flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                            Verified Outcome
                          </span>
                          <span className="inline-flex size-9 items-center justify-center rounded-full border border-paper/15 bg-paper/5 text-paper transition-all duration-300 group-hover:border-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-ink">
                            →
                          </span>
                        </div>

                        <div className="relative z-10 mt-10">
                          <span className="font-mono text-3xl font-bold tracking-tight text-[#FF951D] md:text-4xl">
                            {project.metric}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

