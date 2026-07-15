'use client';

import React, { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ProcessStep = { num: string; title: string; tag: string; desc: string };

const STEP_SPECS: Record<string, { diagram: string; deliverable: string; metric: string }> = {
  '01': {
    diagram: `+---------------------------------------------+
|  CLIENT OPERATIONS / RAW WORKFLOW INTAKE    |
+---------------------+-----------------------+
                      | [SYSTEM MAPPING]
                      v
+---------------------------------------------+
|  FOUNDER DIRECT TECHNICAL ARCHITECTURE SPEC |
+---------------------------------------------+`,
    deliverable: 'Signed Architecture Specification & Fixed Scope Matrix',
    metric: '100% Founder Direct (No Account Managers)',
  },
  '02': {
    diagram: `+-------------------+         +-------------------+
|  RELATIONAL SQL   | <-----> | STRICT TYPE-SAFE  |
|  POSTGRES SCHEMA  |         | API ROUTE LAYER   |
+-------------------+         +-------------------+
          ^                             ^
          +--------------+--------------+
                         v
                [ZERO-BLOAT CORE]`,
    deliverable: 'Normalized 3NF SQL Schema & Type Definitions',
    metric: 'Zero ORM Bloat / Pure Type Safety',
  },
  '03': {
    diagram: `+---------------------------------------------+
|  FRONTEND / UI ENGINEERING (NEXT.JS / REACT)|
+---------------------+-----------------------+
                      | [HYBRID RENDERING]
                      v
+---------------------------------------------+
|  EDGE SERVERLESS OR NATIVE RUST/NODE WORKER |
+---------------------------------------------+`,
    deliverable: 'Production-ready Codebase with First-class RTL/Arabic',
    metric: 'Sub-100ms LCP & API Response Times',
  },
  '04': {
    diagram: `+---------------------------------------------+
|  REGULATORY / COMPLIANCE VERIFICATION       |
+---------------------+-----------------------+
                      | [CRYPTO SIGNING & SSL]
                      v
+---------------------------------------------+
|  AUTOMATED END-TO-END INTEGRATION TEST SUITE|
+---------------------------------------------+`,
    deliverable: 'Certified Security & Regulatory Verification Logs',
    metric: '100% Audit Compliance Readiness',
  },
  '05': {
    diagram: `+---------------------------------------------+
|  DEDICATED DOCKER / EDGE PRODUCTION CLUSTER |
+---------------------+-----------------------+
                      | [IMMUTABLE BUILD]
                      v
+---------------------------------------------+
|  LIVE PRODUCTION DEPLOYMENT & HEALTH CHECKS |
+---------------------------------------------+`,
    deliverable: 'Live Production Environment & Documented Runbooks',
    metric: 'Zero-downtime Blue/Green Deployment',
  },
  '06': {
    diagram: `+---------------------------------------------+
|  1-YEAR FOUNDER DIRECT PRODUCTION SUPPORT   |
+---------------------+-----------------------+
                      | [DIRECT INBOX ACCESS]
                      v
+---------------------------------------------+
|  CONTINUOUS PERFORMANCE & SCALE MONITORING  |
+---------------------------------------------+`,
    deliverable: 'Direct Engineering Hotline & Quarterly Optimization',
    metric: 'Long-term Architectural Integrity',
  },
};

export function ProcessSection() {
  const t = useTranslations('process');
  const steps = t.raw('steps') as ProcessStep[];
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const activeStep = steps[activeIdx] || steps[0];
  const spec = STEP_SPECS[activeStep.num] || STEP_SPECS['01'];

  // Desktop: scrolling through the section drives which step is highlighted, mirroring
  // Hero/TickerSection's scroll-driven interaction. Below 1024px stays tap-to-select only
  // (same convention used everywhere else — no pin, so no mobile clipping risk).
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!window.matchMedia('(min-width: 1024px)').matches) return;

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 1,
        onUpdate: (self) => {
          const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
          setActiveIdx(idx);
        },
      });

      return () => trigger.kill();
    },
    { dependencies: [steps.length], scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="process" className="bg-[#000000] py-28 border-t border-white/10 select-none">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl">
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#d8d9dc]">
            {t('eyebrow')}
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {t('heading')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#9494a0] leading-relaxed">
            {t('subline')}
          </p>
        </div>

        {/* Interactive Studio Timeline & Architecture Inspector */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Step Selector List (Left Column) */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((step, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`w-full text-start p-5 border transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? 'bg-[#0f0f0f] border-[#d8d9dc] text-white shadow-lg'
                      : 'bg-[#060606] border-white/10 text-[#8e8f94] hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 border border-white/10">
                      {step.num}
                    </span>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-[#9494a0]">
                        {step.tag}
                      </div>
                      <div className="font-display text-base sm:text-lg font-bold">
                        {step.title}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs rtl:-scale-x-100">
                    {isActive ? '•' : '→'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Specification & Blueprint Viewer (Right Column) */}
          <div className="lg:col-span-7 border border-white/15 bg-[#080808] p-6 sm:p-10 flex flex-col justify-between min-h-[440px]">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8e8f94]">
                    ARCHITECTURE STAGE // {activeStep.num}
                  </span>
                  <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
                    {activeStep.title}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-2 border border-white/15 px-3 py-1 font-mono text-xs text-[#d8d9dc]">
                <span className="size-1.5 bg-[#d8d9dc]"/>
                  {activeStep.tag}
                </span>
              </div>

              <p className="mt-6 text-base sm:text-lg font-light leading-relaxed text-[#d8d9dc]">
                {activeStep.desc}
              </p>

              {/* ASCII / Schematic Diagram */}
              <div className="mt-8 border border-white/10 bg-[#000000] p-4 sm:p-6 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-[#9494a0] leading-tight">
                  {spec.diagram}
                </pre>
              </div>
            </div>

            {/* Stage Metrics Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#8e8f94]">
                  Key Deliverable
                </span>
                <p className="mt-1 font-mono text-xs text-white font-semibold">
                  {spec.deliverable}
                </p>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#8e8f94]">
                  Engineering Standard
                </span>
                <p className="mt-1 font-mono text-xs text-white font-semibold">
                  {spec.metric}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
