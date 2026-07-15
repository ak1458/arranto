'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

function getWordForPath(path: string): string {
  if (path.includes('/work')) return 'WORK WORK WORK WORK WORK';
  if (path.includes('/about')) return 'ABOUT ABOUT ABOUT ABOUT ABOUT';
  if (path.includes('/tools')) return 'TOOLS TOOLS TOOLS TOOLS';
  if (path.includes('/contact')) return 'CONTACT CONTACT CONTACT';
  return 'ARRANTO ARRANTO ARRANTO';
}

export function PageTransition() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const typeWrapperRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  const [targetWord, setTargetWord] = useState('ARRANTO ARRANTO ARRANTO');

  useEffect(() => {
    // Skip on very first load to avoid blocking initial load
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const container = containerRef.current;
    const wrapper = typeWrapperRef.current;
    if (!container || !wrapper) return;

    // Set word based on target path
    const word = getWordForPath(pathname);
    setTargetWord(word);

    const lines = Array.from(wrapper.querySelectorAll('.kinetic-line')) as HTMLElement[];

    const tl = gsap.timeline();

    // Reset styles
    tl.set(container, {
      opacity: 1,
      pointerEvents: 'auto',
    })
      .set(wrapper, {
        scale: 1,
        rotate: 0,
      })
      .set(lines, {
        x: '0%',
        opacity: 0.05,
      })
      // Animate typography wrapper: scale and rotate
      .to(wrapper, {
        duration: 1.4,
        ease: 'power2.inOut',
        scale: 2.7,
        rotate: -90,
      })
      // Animate individual lines: horizontal motion
      .to(
        lines,
        {
          keyframes: [
            { x: '20%', duration: 0.6, ease: 'power1.inOut' },
            { x: '-200%', duration: 0.9, ease: 'power1.in' },
          ],
          stagger: 0.04,
        },
        0
      )
      // Animate individual lines: opacity
      .to(
        lines,
        {
          keyframes: [
            { opacity: 1, duration: 0.5, ease: 'power1.in' },
            { opacity: 0, duration: 1.0, ease: 'power1.in' },
          ],
          stagger: 0.04,
        },
        0
      )
      // Fade out the main solid container overlay
      .to(
        container,
        {
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(container, { pointerEvents: 'none' });
          },
        },
        1.15
      );

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ opacity: 0, contain: 'paint layout', maxWidth: '100vw', maxHeight: '100vh', overflow: 'clip' }}
      className="fixed inset-0 z-[9999] pointer-events-none flex justify-center items-center overflow-hidden overflow-x-clip max-w-[100vw] max-h-[100vh] [contain:paint_layout] select-none bg-[#050507]"
    >
      <div
        ref={typeWrapperRef}
        className="flex flex-col justify-center items-center text-center w-[100vmax] h-[100vmax] will-change-transform"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((idx) => (
          <div
            key={idx}
            className="kinetic-line whitespace-nowrap font-display text-[clamp(3.5rem,14vh,12rem)] font-extrabold uppercase leading-[0.75] tracking-tighter text-white"
          >
            {targetWord}
          </div>
        ))}
      </div>
    </div>
  );
}
