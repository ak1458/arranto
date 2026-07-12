"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const PIPELINE_STAGES = [
  {
    stage: "01 // DISCOVER",
    title: "DISCOVER",
    tag: "ARCHITECTURE AUDIT",
    desc: "Map operational friction, isolate bottlenecks, and define the technical blueprint.",
    metrics: "2-DAY SPEED REPORT",
    log: "$ arranto audit --stack=all --latency-check=deep\n[✓] Detected 3 isolated silos\n[✓] Blueprint compiled: 0 redundant nodes",
  },
  {
    stage: "02 // DESIGN",
    title: "DESIGN",
    tag: "UI/UX & DESIGN SYSTEM",
    desc: "Design spatial interfaces, glassmorphism design tokens, and interactive flows.",
    metrics: "100% COMPONENT TOKENIZED",
    log: "$ arranto design --tokens=glass --theme=spatial\n[✓] 480 tokens compiled\n[✓] Accessibility WCAG AAA verified",
  },
  {
    stage: "03 // BUILD",
    title: "BUILD",
    tag: "FULL-STACK ENGINEERING",
    desc: "Develop type-safe systems, automated data pipelines, and scalable APIs.",
    metrics: "ZERO RUNTIME EXCEPTION",
    log: "$ arranto build --target=production --strict\n[✓] TypeScript compile passed (0 errors)\n[✓] Edge routes optimized (<12ms)",
  },
  {
    stage: "04 // DEPLOY",
    title: "DEPLOY",
    tag: "GLOBAL CI/CD & TLS",
    desc: "Ship zero-downtime releases with automated rollback and TLS encryption.",
    metrics: "99.99% GUARANTEED SLA",
    log: "$ arranto deploy --region=global --tls=strict\n[✓] SSL certificates provisioned\n[✓] Edge nodes synchronized across 38 regions",
  },
  {
    stage: "05 // SUPPORT",
    title: "SUPPORT",
    tag: "4-HOUR SLA ENGAGEMENT",
    desc: "Dedicated principal engineering support and continuous system evolution.",
    metrics: "< 4 HOUR RESPONSE",
    log: "$ arranto monitor --daemon --alert=realtime\n[✓] Automated health checks nominal\n[✓] Principal engineer protocol active",
  },
];

export function ExecutionScene() {
  const scope = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(2); // Default to BUILD

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-exec-card]",
        { autoAlpha: 0, y: 35 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope }
  );

  const activeStage = PIPELINE_STAGES[activeIdx];

  return (
    <section
      ref={scope}
      id="approach"
      className="relative min-h-svh w-full overflow-hidden bg-[#050505] py-28"
    >
      {/* Ambient Lighting */}
      <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-[#FF6B00]/10 blur-[170px] pointer-events-none" />

      <div className="relative z-10 mx-auto flex min-h-[82svh] max-w-7xl flex-col justify-between px-6 md:px-12">
        {/* Top Split Layout: Copy Left + Interactive Console Right */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#FF6B00]">
              BUILT TO EXECUTE.
            </p>
            <h2 className="mt-6 font-sans text-[clamp(2.8rem,5.2vw,5.5rem)] font-light leading-[1.04] tracking-[-0.04em] text-paper">
              From strategy<br />
              to system.<br />
              We{" "}
              <em className="font-display font-normal italic text-[#FF6B00]">
                execute.
              </em>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-paper/75 md:text-lg">
              Every phase is custom-engineered, tested, and automated. Click any stage below to inspect our execution protocol.
            </p>
          </div>

          {/* Interactive Live Pipeline Engineering Terminal */}
          <div className="rounded-3xl border border-paper/15 bg-[#0A0A0A]/90 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-paper/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-red-500/80" />
                <span className="size-3 rounded-full bg-amber-500/80" />
                <span className="size-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs font-bold text-paper">
                  {activeStage.stage}
                </span>
              </div>
              <span className="font-mono text-xs text-[#FF6B00]">
                STATUS: LIVE EXECUTION
              </span>
            </div>

            <div className="mt-5">
              <span className="inline-block rounded-full bg-[#FF6B00]/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#FF951D]">
                {activeStage.tag}
              </span>
              <h3 className="mt-3 font-sans text-2xl font-semibold text-paper">
                {activeStage.title} PIPELINE
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/80">
                {activeStage.desc}
              </p>
            </div>

            {/* Simulated Live Terminal Output */}
            <div className="mt-6 rounded-xl border border-paper/10 bg-[#121212] p-4 font-mono text-xs text-emerald-400">
              <pre className="whitespace-pre-wrap leading-relaxed">
                {activeStage.log}
              </pre>
            </div>

            <div className="mt-4 flex items-center justify-between font-mono text-xs text-fog">
              <span>BENCHMARK SLA:</span>
              <span className="font-bold text-[#FF6B00]">{activeStage.metrics}</span>
            </div>
          </div>
        </div>

        {/* 5 Interactive Pipeline Stage Cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PIPELINE_STAGES.map((item, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={item.title}
                data-exec-card
                onClick={() => setActiveIdx(idx)}
                className={`group text-left relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300 ${
                  isActive
                    ? "border-[#FF6B00] bg-[#FF6B00]/15 shadow-[0_0_30px_rgba(255,107,0,0.3)] scale-[1.02]"
                    : "border-paper/10 bg-[#111111]/60 hover:border-paper/30 hover:bg-[#111111]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#FF6B00]">
                      0{idx + 1}
                    </span>
                    <span
                      className={`size-2 rounded-full transition-all ${
                        isActive ? "bg-[#FF6B00] animate-ping" : "bg-paper/20"
                      }`}
                    />
                  </div>
                  <h4 className="mt-3 font-sans text-lg font-bold text-paper">
                    {item.title}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-paper/70">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 border-t border-paper/10 pt-3 font-mono text-[10px] text-[#FF951D]">
                  {item.metrics}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Protocol Footer */}
        <div className="mt-12 flex items-center justify-between border-t border-paper/10 pt-8">
          <div className="flex items-center gap-6 font-mono text-xs">
            <span className="font-bold text-[#FF6B00]">PROTOCOL: END-TO-END EXECUTION</span>
            <span className="hidden text-muted md:inline">
              ENCRYPTION: TLS 1.3 // ZERO TRUST
            </span>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <span className="text-muted">03 Execute</span>
            <span className="text-paper/20">/</span>
            <span className="font-bold text-[#FF6B00] underline underline-offset-4">
              04 Deliver
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
