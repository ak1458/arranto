'use client';

import React, { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '@/components/SplitText';
import { LogoMark } from '@/components/Logo';

gsap.registerPlugin(ScrollTrigger);

// Phase boundaries as fractions of total scroll progress (0→1 over the pin).
// Sequence: bar shrinks in from left+right → System/Studio texts arrive at
// center (finishing exactly as the shrink completes) → foreground rotates
// away (texts already settled, no movement) → black panels flip closed while
// the texts fade → "Nothing left undone" reveals immediately after.
const SHRINK_END = 0.35;
const TEXT_START = SHRINK_END * 0.5; // texts begin once the shrink is ~50% done
const ROTATE_START = SHRINK_END;
const ROTATE_END = 0.55;
const FLIP_START = 0.55;
const FLIP_END = 0.8;
const REVEAL_AT = 0.82;

export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const containerRef = useRef<HTMLDivElement>(null);
  const fgContentRef = useRef<HTMLDivElement>(null);
  const fgTextRef = useRef<HTMLDivElement>(null);
  const fgOverlayDarkRef = useRef<HTMLDivElement>(null);
  const bgCopyLeftRef = useRef<HTMLDivElement>(null);
  const bgCopyRightRef = useRef<HTMLDivElement>(null);
  const outroImgTopRef = useRef<HTMLDivElement>(null);
  const outroImgBottomRef = useRef<HTMLDivElement>(null);
  const outroHeaderRef = useRef<HTMLHeadingElement>(null);
  const outroContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReduced) return;

      ScrollTrigger.refresh();

      const scrollTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 5}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const scrollProgress = self.progress;

          // ── Shrink (0 → SHRINK_END): bar closes inward from left+right via clip-path ──
          const shrinkProgress = gsap.utils.clamp(0, 1, scrollProgress / SHRINK_END);
          const slitLeftEdge = gsap.utils.interpolate(0, 48, shrinkProgress);
          const slitRightEdge = gsap.utils.interpolate(100, 52, shrinkProgress);

          gsap.set(fgContentRef.current, {
            clipPath: `polygon(${slitLeftEdge}% 0%, ${slitRightEdge}% 0%, ${slitRightEdge}% 100%, ${slitLeftEdge}% 100%)`,
          });

          // Dark overlay gradually fills the white area with black
          const darkOverlayOpacity = gsap.utils.interpolate(0, 1, shrinkProgress);
          gsap.set(fgOverlayDarkRef.current, { opacity: darkOverlayOpacity });

          // ── Text arrival (TEXT_START → SHRINK_END, i.e. the second half of the shrink):
          // System/Studio slide in from the corners and settle at center, finishing exactly
          // as the shrink completes — they must already be in position before rotation starts. ──
          const textInProgress = gsap.utils.clamp(0, 1, (scrollProgress - TEXT_START) / (SHRINK_END - TEXT_START));
          const dirFactor = dir === 'rtl' ? -1 : 1;
          const bgCopyLeftX = gsap.utils.interpolate(-100 * dirFactor, 0, textInProgress);
          const bgCopyRightX = gsap.utils.interpolate(100 * dirFactor, 0, textInProgress);

          // ── Text departure (FLIP_START → FLIP_END): fade out while the black panels close ──
          const flipProgress = gsap.utils.clamp(0, 1, (scrollProgress - FLIP_START) / (FLIP_END - FLIP_START));
          const textFadeOut = gsap.utils.interpolate(1, 0, flipProgress);
          const bgCopyOpacity = textInProgress * textFadeOut;

          gsap.set(bgCopyLeftRef.current, { x: `${bgCopyLeftX}%`, opacity: bgCopyOpacity });
          gsap.set(bgCopyRightRef.current, { x: `${bgCopyRightX}%`, opacity: bgCopyOpacity });

          // ── Rotate (ROTATE_START → ROTATE_END): foreground spins away and scales to nothing;
          // System/Studio texts are already settled by now and don't move during this. ──
          const rotateProgress = gsap.utils.clamp(0, 1, (scrollProgress - ROTATE_START) / (ROTATE_END - ROTATE_START));
          const fgRotation = gsap.utils.interpolate(0, 90, rotateProgress);
          const fgScale = gsap.utils.interpolate(1, 0, rotateProgress);
          gsap.set(fgContentRef.current, { rotate: fgRotation, scale: fgScale });

          const fgTextOpacity = gsap.utils.interpolate(1, 0, rotateProgress);
          gsap.set(fgTextRef.current, { opacity: fgTextOpacity });

          // ── Flip (FLIP_START → FLIP_END): outro panels sweep from top/bottom to black out ──
          const topImgBottomEdge = gsap.utils.interpolate(0, 100, flipProgress);
          gsap.set(outroImgTopRef.current, {
            clipPath: `polygon(0% 0%, 100% 0%, 100% ${topImgBottomEdge}%, 0% ${topImgBottomEdge}%)`,
          });

          const bottomImgTopEdge = gsap.utils.interpolate(100, 0, flipProgress);
          gsap.set(outroImgBottomRef.current, {
            clipPath: `polygon(0% ${bottomImgTopEdge}%, 100% ${bottomImgTopEdge}%, 100% 100%, 0% 100%)`,
          });

          // ── Reveal (REVEAL_AT → 1.0): "Nothing left undone" appears right after the flip closes ──
          const outroLines = outroHeaderRef.current?.querySelectorAll('.line');
          if (outroContainerRef.current) {
            gsap.set(outroContainerRef.current, { opacity: scrollProgress >= REVEAL_AT ? 1 : 0 });
          }
          if (outroLines && outroLines.length > 0) {
            if (scrollProgress >= REVEAL_AT) {
              gsap.to(outroLines, {
                y: '0%',
                duration: 0.5,
                stagger: 0.08,
                ease: 'power3.out',
                overwrite: 'auto',
              });
            } else {
              gsap.to(outroLines, {
                y: '100%',
                duration: 0.2,
                stagger: -0.04,
                ease: 'power3.out',
                overwrite: 'auto',
              });
            }
          }
        },
      });

      return () => {
        scrollTrigger.kill();
      };
    },
    { dependencies: [], scope: containerRef }
  );

  // Reverted outroText to only render "Nothing left undone." as requested
  const outroText = `${t('line2Pre')}${t('line2Em')}`;

  return (
    <div
      ref={containerRef}
      className="hero-container relative h-screen w-full overflow-hidden bg-ink select-none"
    >
      {/* 1. FOREGROUND LAYER — same scroll-driven sequence at every breakpoint */}
      <div
        ref={fgContentRef}
        className="hero-fg-content absolute inset-0 z-20 flex flex-col justify-center p-6 sm:p-12 md:p-16 select-none origin-center"
      >
        <div
          ref={fgTextRef}
          className="relative z-10 mx-auto w-full max-w-5xl text-center px-4"
        >
          {/* Brand mark — same LogoMark as the header, not a re-typed wordmark */}
          <LogoMark className="h-16 sm:h-24 md:h-32 lg:h-40 w-auto mx-auto mb-6 sm:mb-8 text-white" />
          <p className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#8e8f94] mb-4 sm:mb-6">
            {t('fragment')}
          </p>
          <h1 className="font-display text-[clamp(1.8rem,4.5vw,4.5rem)] font-bold uppercase tracking-tight text-white leading-tight">
            {t('line1')}
          </h1>
        </div>

        <div
          ref={fgOverlayDarkRef}
          className="hero-fg-overlay-dark absolute inset-0 z-1 pointer-events-none bg-ink opacity-0"
        />
      </div>

      {/* 2. BACKGROUND LAYER — Sliding "Systems" and "Studio" Columns */}
      <div className="hero-bg-content absolute inset-0 z-0 flex flex-col sm:flex-row items-center justify-between px-10 sm:px-24 md:px-32 py-12 gap-8 select-none w-full">
        <div className="flex-1 w-full flex justify-start items-center">
          <div
            ref={bgCopyLeftRef}
            className="flex flex-col gap-2 sm:gap-4 max-w-md w-full will-change-transform"
          >
            <h3 className="font-display text-2xl sm:text-3xl md:text-5xl uppercase text-ink tracking-tight">
              {t('col1Title')}
            </h3>
            <p className="font-mono text-[10px] sm:text-xs uppercase text-ink/80 leading-relaxed">
              {t('col1Text')}
            </p>
          </div>
        </div>

        <div className="flex-1 w-full flex justify-end items-center">
          <div
            ref={bgCopyRightRef}
            className="flex flex-col gap-2 sm:gap-4 max-w-md w-full text-start sm:text-end will-change-transform"
          >
            <h3 className="font-display text-2xl sm:text-3xl md:text-5xl uppercase text-ink tracking-tight">
              {t('col2Title')}
            </h3>
            <p className="font-mono text-[10px] sm:text-xs uppercase text-ink/80 leading-relaxed">
              {t('col2Text')}
            </p>
          </div>
        </div>
      </div>

      {/* 3. OUTRO LAYER — Solid black panels sweep from top/bottom to frame SplitText.
          Each panel is absolutely positioned at 51% height (not flex 50/50) so they overlap by
          1% at the seam — a sub-pixel rounding gap can never reveal the paper-toned layer
          underneath as a stray line, regardless of viewport height. */}
      <div className="hero-outro-content absolute inset-0 z-10 block select-none pointer-events-none">
        <div ref={outroImgTopRef} className="hero-outro-img hero-outro-img-top absolute inset-x-0 top-0 h-[51%] w-full bg-[#050507]" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }} />
        <div ref={outroImgBottomRef} className="hero-outro-img hero-outro-img-bottom absolute inset-x-0 bottom-0 h-[51%] w-full bg-[#050507]" style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }} />

        <div ref={outroContainerRef} className="absolute top-1/2 inset-x-0 mx-auto -translate-y-1/2 text-center w-full max-w-5xl px-6 sm:px-12 z-30 pointer-events-none opacity-0">
          <SplitText
            ref={outroHeaderRef}
            className="font-display text-3xl sm:text-5xl md:text-7xl font-extrabold uppercase tracking-tight text-white leading-tight"
          >
            {outroText}
          </SplitText>
        </div>
      </div>
    </div>
  );
}
