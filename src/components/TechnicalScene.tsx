"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Node = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  orange: boolean;
};

function initNodes(w: number, h: number, count: number): Node[] {
  let seed = 918;
  const rand = () => ((seed = (seed * 48271) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: count }, (_, i) => ({
    x: w * (0.05 + rand() * 0.9),
    y: h * (0.08 + rand() * 0.84),
    r: 1.5 + rand() * 2.2,
    vx: (rand() - 0.5) * 0.45,
    vy: (rand() - 0.5) * 0.45,
    orange: i % 4 === 0 || i % 7 === 0,
  }));
}

export function TechnicalScene({
  mode = "systems",
  index = "01",
  eyebrow = "SYSTEMS EVERYWHERE.",
  lines = ["Disconnected.", "Inefficient.", "Holding you back."],
}: {
  mode?: "systems" | "core";
  index?: string;
  eyebrow?: string;
  lines?: string[];
}) {
  const scope = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      const cvs = canvasRef.current;
      const ctx = cvs?.getContext("2d");
      if (!el || !cvs || !ctx) return;

      let w = 0;
      let h = 0;
      let nodes: Node[] = [];
      let animId: number;

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
        w = cvs.clientWidth;
        h = cvs.clientHeight;
        cvs.width = w * dpr;
        cvs.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        nodes = initNodes(w, h, w < 768 ? 40 : 85);
      };

      resize();
      const obs = new ResizeObserver(resize);
      obs.observe(cvs);

      const render = () => {
        ctx.clearRect(0, 0, w, h);

        nodes.forEach((n) => {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 10 || n.x > w - 10) n.vx *= -1;
          if (n.y < 10 || n.y > h - 10) n.vy *= -1;
        });

        const maxDist = mode === "systems" ? 140 : 210;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.hypot(dx, dy);
            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * (mode === "systems" ? 0.35 : 0.6);
              ctx.strokeStyle =
                nodes[i].orange || nodes[j].orange
                  ? `rgba(255, 107, 0, ${alpha * 1.3})`
                  : `rgba(236, 235, 234, ${alpha * 0.2})`;
              ctx.lineWidth = nodes[i].orange || nodes[j].orange ? 1.1 : 0.5;
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.stroke();
            }
          }
        }

        nodes.forEach((n) => {
          ctx.fillStyle = n.orange ? "#FF6B00" : "rgba(255, 255, 255, 0.65)";
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        });

        animId = requestAnimationFrame(render);
      };

      render();

      gsap.fromTo(
        "[data-stage-copy]",
        { autoAlpha: 0, y: 35 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
          },
        }
      );

      return () => {
        obs.disconnect();
        cancelAnimationFrame(animId);
      };
    },
    { scope }
  );

  const activeStep = mode === "systems" ? "01" : "02";

  return (
    <section
      ref={scope}
      className="relative min-h-svh w-full overflow-hidden bg-[#050505] py-28"
    >
      {/* Ambient Lighting */}
      <div
        className={`absolute top-1/3 right-1/4 h-[450px] w-[450px] rounded-full blur-[150px] pointer-events-none transition-all duration-700 ${
          mode === "systems" ? "bg-red-500/10" : "bg-[#FF6B00]/15"
        }`}
      />

      {/* Dynamic Network Particle Layer */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 z-1 h-full w-full pointer-events-none"
      />

      <div className="relative z-10 mx-auto flex min-h-[82svh] max-w-7xl flex-col justify-between px-6 md:px-12">
        {/* Top Header Eyebrow */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-[#FF6B00]">
              {index}
            </span>
            <span className="h-px w-8 bg-[#FF6B00]" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#FF6B00]">
              {eyebrow}
            </span>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <span className="font-mono text-xs text-muted">
              {mode === "systems"
                ? "DIAGNOSTIC: FRAGMENTED ARCHITECTURE"
                : "DIAGNOSTIC: UNIFIED ORCHESTRATION"}
            </span>
            <span
              className={`inline-block size-2.5 rounded-full ${
                mode === "systems" ? "bg-amber-400 animate-pulse" : "bg-[#FF6B00]"
              }`}
            />
          </div>
        </div>

        {/* Center Split Grid: Left Copy + Right Interactive Architecture Stage */}
        <div className="my-auto grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Typography */}
          <div data-stage-copy className="max-w-[38rem]">
            <h2 className="font-sans text-[clamp(2.8rem,5vw,5.5rem)] font-light leading-[0.93] tracking-[-0.04em] text-paper">
              {mode === "systems" ? (
                <>
                  Systems everywhere.
                  <br />
                  <span className="font-display italic text-[#FF6B00]">
                    Connected nowhere.
                  </span>
                </>
              ) : (
                <>
                  One intelligent
                  <br />
                  <span className="font-display italic text-[#FF6B00]">
                    unified core.
                  </span>
                </>
              )}
            </h2>

            <div className="mt-8 space-y-3">
              {lines.map((line, idx) => (
                <div
                  key={line}
                  className="flex items-center gap-4 text-xl font-light text-paper/85 md:text-2xl"
                >
                  <span className="font-mono text-xs text-[#FF6B00]">
                    0{idx + 1}
                  </span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Engineered Architecture HUD */}
          <div
            data-stage-copy
            className="relative flex min-h-[380px] w-full flex-col justify-between rounded-3xl border border-paper/15 bg-[#0B0B0B]/90 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            {mode === "systems" ? (
              /* SYSTEMS MODE: Fragmented Interactive Diagnostic HUD */
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-paper/10 pb-4">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
                    [ WARN ] LEGACY STACK DETECTED
                  </span>
                  <span className="font-mono text-xs text-muted">
                    ERR_LATENCY_SPIKE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 transition-transform hover:scale-[1.02]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-paper">
                        CRM // SILO-01
                      </span>
                      <span className="size-2 rounded-full bg-red-500 animate-ping" />
                    </div>
                    <p className="mt-2 font-mono text-xs text-red-400">
                      DESYNC: 480ms delay
                    </p>
                  </div>

                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 transition-transform hover:scale-[1.02]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-paper">
                        ERP // SILO-02
                      </span>
                      <span className="size-2 rounded-full bg-amber-400" />
                    </div>
                    <p className="mt-2 font-mono text-xs text-amber-400">
                      MANUAL RECONCILIATION
                    </p>
                  </div>

                  <div className="rounded-xl border border-paper/15 bg-paper/5 p-4 transition-transform hover:scale-[1.02]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-paper">
                        PAYMENT GATEWAY
                      </span>
                      <span className="size-2 rounded-full bg-paper/30" />
                    </div>
                    <p className="mt-2 font-mono text-xs text-muted">
                      ISOLATED QUEUE
                    </p>
                  </div>

                  <div className="rounded-xl border border-paper/15 bg-paper/5 p-4 transition-transform hover:scale-[1.02]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-paper">
                        ANALYTICS ENGINE
                      </span>
                      <span className="size-2 rounded-full bg-paper/30" />
                    </div>
                    <p className="mt-2 font-mono text-xs text-muted">
                      BATCH 24H DELAY
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-paper/15 bg-[#121212] p-4 font-mono text-xs text-fog">
                  <div className="text-amber-400">
                    &gt; DIAGNOSTIC: 4 isolated databases operating without single
                    source of truth.
                  </div>
                  <div className="mt-1 text-paper/70">
                    &gt; RECOMMENDATION: Converge onto Arranto Unified Core.
                  </div>
                </div>
              </div>
            ) : (
              /* CORE MODE: Unified Interactive Orchestration HUD */
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-[#FF6B00]/30 pb-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#FF6B00]">
                    [ NOMINAL ] ARRANTO SYNCHRONIZED CORE
                  </span>
                  <span className="font-mono text-xs text-emerald-400">
                    LATENCY: &lt; 2ms
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-[#FF6B00]/40 bg-[#FF6B00]/10 p-4 transition-transform hover:scale-[1.03]">
                    <span className="font-mono text-[10px] uppercase text-[#FF951D]">
                      ORCHESTRATOR
                    </span>
                    <div className="mt-1 font-mono text-sm font-bold text-paper">
                      REAL-TIME
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#FF6B00]/40 bg-[#FF6B00]/10 p-4 transition-transform hover:scale-[1.03]">
                    <span className="font-mono text-[10px] uppercase text-[#FF951D]">
                      API MESH
                    </span>
                    <div className="mt-1 font-mono text-sm font-bold text-paper">
                      UNIFIED
                    </div>
                  </div>

                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 transition-transform hover:scale-[1.03]">
                    <span className="font-mono text-[10px] uppercase text-emerald-400">
                      THROUGHPUT
                    </span>
                    <div className="mt-1 font-mono text-sm font-bold text-paper">
                      100% RELIABLE
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-[#FF6B00]/30 bg-[#151210] p-4 font-mono text-xs">
                  <div className="text-[#FF951D]">
                    &gt; STATUS: All systems converged. Zero data drift.
                  </div>
                  <div className="mt-1 text-paper/80">
                    &gt; EVENT STREAM: Automated real-time execution active.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section Protocol & Stepper */}
        <div className="flex items-center justify-between border-t border-paper/10 pt-8">
          <div className="flex items-center gap-6">
            <span className="font-mono text-xs font-bold text-[#FF6B00]">
              PROTOCOL: {mode === "systems" ? "AUDIT ARCHITECTURE" : "UNIFIED CORE"}
            </span>
            <span className="hidden font-mono text-xs text-muted md:inline">
              STATUS: {mode === "systems" ? "FRAGMENTED" : "UNIFIED"}
            </span>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <span
              className={
                activeStep === "01"
                  ? "font-bold text-[#FF6B00] underline underline-offset-4"
                  : "text-muted"
              }
            >
              01 Disconnected
            </span>
            <span className="text-paper/20">/</span>
            <span
              className={
                activeStep === "02"
                  ? "font-bold text-[#FF6B00] underline underline-offset-4"
                  : "text-muted"
              }
            >
              02 Converge
            </span>
            <span className="text-paper/20">/</span>
            <span className="text-muted">03 Execute</span>
            <span className="text-paper/20">/</span>
            <span className="text-muted">04 Deliver</span>
          </div>
        </div>
      </div>
    </section>
  );
}
