"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  orange: boolean;
  pulse: number;
};

function initNetwork(w: number, h: number, count: number): Node[] {
  let seed = 731;
  const rand = () => ((seed = (seed * 48271) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: count }, (_, i) => ({
    x: rand() * w,
    y: rand() * h,
    vx: (rand() - 0.5) * 0.8,
    vy: (rand() - 0.5) * 0.8,
    r: 1.5 + rand() * 2.5,
    orange: i % 4 === 0 || i === 0,
    pulse: rand() * Math.PI * 2,
  }));
}

export function Hero() {
  const scope = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
      let time = 0;

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
        w = cvs.clientWidth;
        h = cvs.clientHeight;
        cvs.width = w * dpr;
        cvs.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        nodes = initNetwork(w, h, w < 768 ? 45 : 95);
      };

      resize();
      const obs = new ResizeObserver(resize);
      obs.observe(cvs);

      const render = () => {
        time += 0.02;
        ctx.clearRect(0, 0, w, h);

        nodes.forEach((n) => {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 15 || n.x > w - 15) n.vx *= -1;
          if (n.y < 15 || n.y > h - 15) n.vy *= -1;
        });

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.hypot(dx, dy);
            if (dist < 150) {
              const alpha = (1 - dist / 150) * 0.45;
              ctx.strokeStyle =
                nodes[i].orange || nodes[j].orange
                  ? `rgba(255, 107, 0, ${alpha * 1.3})`
                  : `rgba(255, 255, 255, ${alpha * 0.25})`;
              ctx.lineWidth = nodes[i].orange || nodes[j].orange ? 1.2 : 0.6;
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.stroke();
            }
          }
        }

        // Draw nodes
        nodes.forEach((n) => {
          const glowR = n.r + Math.sin(time + n.pulse) * 1.2;
          ctx.fillStyle = n.orange ? "#FF6B00" : "rgba(255, 255, 255, 0.7)";
          ctx.beginPath();
          ctx.arc(n.x, n.y, Math.max(1, glowR), 0, Math.PI * 2);
          ctx.fill();

          if (n.orange) {
            ctx.fillStyle = "rgba(255, 107, 0, 0.2)";
            ctx.beginPath();
            ctx.arc(n.x, n.y, glowR * 3.5, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        animId = requestAnimationFrame(render);
      };

      render();

      gsap.fromTo(
        "[data-hero-animate]",
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }
      );

      return () => {
        obs.disconnect();
        cancelAnimationFrame(animId);
      };
    },
    { scope }
  );

  return (
    <section ref={scope} className="relative min-h-svh w-full overflow-hidden bg-[#050505] pt-28 pb-16">
      {/* Background Ambient Glow (No cheap video overlay) */}
      <div className="absolute top-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-[#FF6B00]/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-[350px] w-[350px] rounded-full bg-[#FF6B00]/5 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        {/* Main Hero Split Grid */}
        <div className="grid min-h-[72svh] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Copy Container */}
          <div className="flex flex-col justify-center">
            {/* Live System Pill */}
            <div
              data-hero-animate
              className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/10 px-4 py-1.5 font-mono text-xs text-[#FF951D]"
            >
              <span className="size-2 rounded-full bg-[#FF6B00] animate-ping" />
              <span>ARRANTO CORE ARCHITECTURE • SYSTEM NOMINAL</span>
            </div>

            <h1
              data-hero-animate
              className="mt-8 font-sans text-[clamp(3.4rem,6.2vw,6.8rem)] font-light leading-[0.93] tracking-[-0.04em] text-paper"
            >
              We turn<br />
              complexity<br />
              into{" "}
              <em className="font-display font-normal italic text-[#FF6B00]">
                execution.
              </em>
            </h1>

            <p
              data-hero-animate
              className="mt-8 max-w-xl text-lg leading-relaxed text-paper/80 font-light"
            >
              Compliance-grade software, digital products, and automation systems that
              help businesses move faster, operate smarter, and grow with confidence.
            </p>

            <div data-hero-animate className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#work"
                className="group inline-flex items-center gap-4 rounded-full border border-[#FF6B00] bg-[#FF6B00] py-3.5 pl-8 pr-4 text-sm font-semibold text-ink transition-all duration-300 hover:bg-[#FF6B00]/90 hover:shadow-[0_0_35px_rgba(255,107,0,0.4)]"
              >
                <span>Explore our work</span>
                <span className="grid size-8 place-items-center rounded-full bg-ink/15 text-sm text-ink transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-paper/20 bg-paper/5 px-7 py-3.5 text-sm font-medium text-paper transition-all duration-300 hover:border-paper/40 hover:bg-paper/10"
              >
                <span>Initiate Engagement</span>
              </a>
            </div>
          </div>

          {/* Right Side: Custom Interactive Engineered Cybernetic Stage */}
          <div
            data-hero-animate
            className="relative flex h-[460px] w-full items-center justify-center rounded-3xl border border-paper/15 bg-[#0A0A0A]/90 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden"
            style={{
              transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            {/* Live Interactive Neural Network Canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full pointer-events-none"
            />

            {/* Glowing Center Core Pulse */}
            <div className="absolute size-40 rounded-full bg-gradient-to-tr from-[#FF6B00]/30 to-transparent blur-2xl animate-pulse" />

            {/* Floating 3D Telemetry Glass Cards */}
            <div className="relative z-10 grid w-full max-w-md gap-4">
              {/* Telemetry Card 1 */}
              <div className="flex items-center justify-between rounded-xl border border-paper/15 bg-[#121212]/85 p-4 backdrop-blur-md shadow-lg transition-transform hover:scale-[1.02]">
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-[#FF6B00]" />
                  <span className="font-mono text-xs font-medium text-paper">
                    SYSTEM ORCHESTRATION CORE
                  </span>
                </div>
                <span className="font-mono text-xs text-[#FF6B00]">ACTIVE 99.99%</span>
              </div>

              {/* Telemetry Card 2 */}
              <div className="flex items-center justify-between rounded-xl border border-paper/15 bg-[#121212]/85 p-4 backdrop-blur-md shadow-lg transition-transform hover:scale-[1.02]">
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-emerald-400" />
                  <span className="font-mono text-xs font-medium text-paper">
                    REAL-TIME LATENCY
                  </span>
                </div>
                <span className="font-mono text-xs text-emerald-400">0.42 ms</span>
              </div>

              {/* Telemetry Card 3 */}
              <div className="flex items-center justify-between rounded-xl border border-[#FF6B00]/40 bg-[#FF6B00]/10 p-4 backdrop-blur-md shadow-lg transition-transform hover:scale-[1.02]">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-paper">
                    AUTOMATION THROUGHPUT
                  </span>
                </div>
                <span className="font-mono text-sm font-bold text-[#FF951D]">
                  +420% YIELD
                </span>
              </div>
            </div>

            {/* Corner Technical Frame Marks */}
            <span className="absolute top-4 left-4 font-mono text-[10px] text-muted">
              [ STAGE-01 // CORE_HUD ]
            </span>
            <span className="absolute bottom-4 right-4 font-mono text-[10px] text-[#FF6B00]">
              SYS_ID: AR-900
            </span>
          </div>
        </div>

        {/* Bottom Section Index Meter matching reference */}
        <div className="mt-14 flex items-center justify-between border-t border-paper/10 pt-8">
          <div className="flex items-center gap-4 font-mono text-xs tracking-widest text-paper/90">
            <span className="text-[#FF6B00] font-bold text-sm">01</span>
            <div className="h-[2px] w-40 bg-paper/15 md:w-64">
              <div className="h-full w-1/6 bg-[#FF6B00] shadow-[0_0_12px_#FF6B00]" />
            </div>
            <span className="text-fog">06</span>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <span className="font-mono text-xs uppercase tracking-widest text-fog">
              Scroll to explore
            </span>
            <div className="h-2 w-2 rounded-full bg-[#FF6B00] animate-ping" />
          </div>
        </div>
      </div>
    </section>
  );
}
