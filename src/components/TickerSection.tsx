'use client';

import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ArrowGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 rtl:-scale-x-100">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function StarGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
    </svg>
  );
}

export function TickerSection() {
  const t = useTranslations('ticker');
  const phrases = t.raw('phrases') as string[];
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const mm = gsap.matchMedia();

      // Desktop (>= 1024px): exact untouched 100vh pinned horizontal reel
      mm.add('(min-width: 1024px)', () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (!trackRef.current) return;
        const track = trackRef.current;
        const section = sectionRef.current!;
        const getDist = () => Math.max(0, track.scrollWidth - window.innerWidth);

        gsap.to(track, {
          x: () => -getDist(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getDist()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const renderPhrase = (phrase: string, i: number) => (
    <React.Fragment key={`${phrase}-${i}`}>
      <span className={`font-display px-3 ${i % 2 === 1 ? 'text-[#d8d9dc]' : ''}`}>{phrase}</span>
      <span className={`inline-flex items-center px-3 ${i % 2 === 0 ? 'text-[#d8d9dc]' : 'text-[#9494a0]'}`}>
        {i % 2 === 0 ? <ArrowGlyph /> : <StarGlyph />}
      </span>
    </React.Fragment>
  );

  return (
    <section ref={sectionRef} className="ticker-section select-none">
      {/* Desktop (>= 1024px): exactly unchanged, 100vh pinned horizontal reel */}
      <div ref={trackRef} className="ticker-track hidden lg:flex">
        {phrases.map((p, i) => renderPhrase(p, i))}
      </div>

      {/* Mobile (< 1024px): continuous infinite auto-scrolling track (`pin: false`), zero blank space */}
      <div className="lg:hidden w-full overflow-hidden py-14 bg-[var(--bg-2)]">
        <div
          className="ticker-track-mobile flex items-center flex-nowrap whitespace-nowrap font-display text-[32px] sm:text-[42px] font-bold tracking-tight text-white will-change-transform"
        >
          {phrases.map((p, i) => renderPhrase(p, i))}
          {phrases.map((p, i) => renderPhrase(p, i + phrases.length))}
        </div>
      </div>
    </section>
  );
}
