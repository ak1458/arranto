'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type TickerVariant = 'desktop' | 'tablet' | 'mobile';

function getTickerVariant(): TickerVariant {
  if (window.innerWidth >= 1024) return 'desktop';
  if (window.innerWidth >= 640) return 'tablet';
  return 'mobile';
}

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
  const [variant, setVariant] = useState<TickerVariant | null>(null);

  useEffect(() => {
    const updateVariant = () => setVariant(getTickerVariant());
    const queries = [
      window.matchMedia('(min-width: 1024px)'),
      window.matchMedia('(min-width: 640px)'),
    ];

    updateVariant();
    queries.forEach((query) => query.addEventListener('change', updateVariant));

    return () => {
      queries.forEach((query) => query.removeEventListener('change', updateVariant));
    };
  }, []);

  useGSAP(
    () => {
      if (!variant) return;
      if (!sectionRef.current) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!trackRef.current) return;

      const track = trackRef.current;
      const section = sectionRef.current;
      const getDist = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const getPinDistance = () => {
        const distance = getDist();
        const minimum = variant === 'desktop' ? window.innerHeight * 1.5 : window.innerHeight * 1.25;
        return Math.max(distance, minimum);
      };

      const tween = gsap.to(track, {
        x: () => -getDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getPinDistance()}`,
          scrub: variant === 'desktop' ? 1 : 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.refresh();

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef, dependencies: [variant] }
  );

  const renderPhrase = (phrase: string, i: number) => (
    <React.Fragment key={`${phrase}-${i}`}>
      <span className={`font-display px-3 ${i % 2 === 1 ? 'text-[#d8d9dc]' : ''}`}>{phrase}</span>
      <span className={`inline-flex items-center px-3 ${i % 2 === 0 ? 'text-[#d8d9dc]' : 'text-[#9494a0]'}`}>
        {i % 2 === 0 ? <ArrowGlyph /> : <StarGlyph />}
      </span>
    </React.Fragment>
  );

  if (!variant) {
    return (
      <section
        ref={sectionRef}
        className="ticker-section ticker-section-loading select-none"
        aria-hidden="true"
      />
    );
  }

  return (
    <section ref={sectionRef} className="ticker-section select-none" data-ticker-variant={variant}>
      {variant === 'desktop' && (
        <div ref={trackRef} className="ticker-track flex w-max text-white">
          {phrases.map((p, i) => renderPhrase(p, i))}
        </div>
      )}

      {variant === 'tablet' && (
        <div className="w-full overflow-hidden py-16 bg-[var(--bg-2)]">
          <div ref={trackRef} className="ticker-track-mobile flex w-max items-center flex-nowrap whitespace-nowrap font-display text-[42px] font-bold tracking-tight text-white will-change-transform">
            {phrases.map((p, i) => renderPhrase(p, i))}
          </div>
        </div>
      )}

      {variant === 'mobile' && (
        <div className="w-full overflow-hidden py-14 bg-[var(--bg-2)]">
          <div ref={trackRef} className="ticker-track-mobile flex w-max items-center flex-nowrap whitespace-nowrap font-display text-[32px] font-bold tracking-tight text-white will-change-transform">
            {phrases.map((p, i) => renderPhrase(p, i))}
          </div>
        </div>
      )}
    </section>
  );
}
