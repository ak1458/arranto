'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { Logo } from '@/components/Logo';

// ---------------------------------------------------------------------------
// Radial geometry helpers (pure — no DOM/React state), ported from the
// vanilla "pie menu" reference: annulus wedges via clip-path: path(...).
// ---------------------------------------------------------------------------

type MenuGeometry = {
  size: number;
  center: number;
  innerRadius: number;
  outerRadius: number;
  contentRadius: number;
};

function getMenuGeometry(): MenuGeometry {
  if (typeof window === 'undefined') {
    const size = 480;
    return { size, center: size / 2, innerRadius: size * 0.08, outerRadius: size * 0.42, contentRadius: size * 0.28 };
  }
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const isMobile = vw < 1024;
  const maxSize = Math.min(vw * 0.92, vh * 0.75);
  const size = isMobile ? Math.min(maxSize, 340) : Math.min(maxSize, 700);
  const innerRadius = isMobile ? size * 0.10 : size * 0.08;
  const outerRadius = isMobile ? size * 0.46 : size * 0.42;
  const contentRadius = isMobile ? size * 0.29 : size * 0.28;
  return {
    size,
    center: size / 2,
    innerRadius,
    outerRadius,
    contentRadius,
  };
}

const SEGMENT_GAP_DEG = 0.19;

function polarPoint(c: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: c + r * Math.cos(rad), y: c + r * Math.sin(rad) };
}

function segmentClipPath(geo: MenuGeometry, startDeg: number, endDeg: number) {
  const { center, innerRadius, outerRadius } = geo;
  const p1 = polarPoint(center, outerRadius, startDeg);
  const p2 = polarPoint(center, outerRadius, endDeg);
  const p3 = polarPoint(center, innerRadius, endDeg);
  const p4 = polarPoint(center, innerRadius, startDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `path('M ${p1.x} ${p1.y} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${p4.x} ${p4.y} Z')`;
}

function flickerSegment(el: HTMLElement, toActive: boolean, reduced: boolean) {
  gsap.killTweensOf(el);
  const target = toActive
    ? { backgroundColor: '#d8d9dc', color: '#000000', borderColor: '#d8d9dc' }
    : { backgroundColor: 'rgba(255,255,255,0.05)', color: '#d8d9dc', borderColor: 'rgba(255,255,255,0.1)' };
  if (reduced) {
    gsap.to(el, { ...target, duration: 0.2 });
    return;
  }
  gsap
    .timeline()
    .to(el, { ...target, duration: 0.05 })
    .to(el, { opacity: 0.4, duration: 0.04 })
    .to(el, { opacity: 1, duration: 0.04 })
    .to(el, { opacity: 0.4, duration: 0.04 })
    .to(el, { opacity: 1, duration: 0.05, ...target });
}

// ---------------------------------------------------------------------------
// Segments
// ---------------------------------------------------------------------------

type SegmentKey = 'work' | 'about' | 'tools' | 'contact';

const SEGMENT_ORDER: { key: SegmentKey; href: string }[] = [
  { key: 'work', href: '/work' },
  { key: 'about', href: '/about' },
  { key: 'tools', href: '/tools' },
  { key: 'contact', href: '/contact' },
];

function SegmentIcon({ segment }: { segment: SegmentKey }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    'aria-hidden': true,
    className: 'w-6 h-6 pointer-events-none',
  } as const;
  switch (segment) {
    case 'work':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case 'about':
      return (
        <svg {...common}>
          <circle cx="12" cy="7" r="4" />
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        </svg>
      );
    case 'tools':
      return (
        <svg {...common}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
          />
        </svg>
      );
    case 'contact':
      return (
        <svg {...common}>
          <path d="M4 4h16v16H4z" />
          <path d="M4 6l8 6 8-6" />
        </svg>
      );
  }
}

// ---------------------------------------------------------------------------
// Locale switch — lifted verbatim from the previous Nav.tsx, already platinum.
// ---------------------------------------------------------------------------

function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 font-mono text-xs" role="group" aria-label="Language switch">
      {(['en', 'ar'] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => router.replace(pathname, { locale: l })}
          aria-current={locale === l ? 'true' : undefined}
          className={`px-2 py-1 uppercase border transition-colors ${
            locale === l
              ? 'border-[#d8d9dc] text-[#d8d9dc] font-bold'
              : 'border-white/20 text-[#9494a0] hover:text-white'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Radial overlay menu
// ---------------------------------------------------------------------------

function RadialMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('nav');
  const tMenu = useTranslations('menu');
  const tFooter = useTranslations('footer');
  const router = useRouter();

  const overlayRef = useRef<HTMLDivElement>(null);
  const menuBoxRef = useRef<HTMLDivElement>(null);
  const joystickRef = useRef<HTMLButtonElement>(null);
  const topStripRef = useRef<HTMLDivElement>(null);
  const bottomStripRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<Array<HTMLAnchorElement | null>>([null, null, null, null]);
  const audioRefs = useRef<{ open?: HTMLAudioElement; close?: HTMLAudioElement; select?: HTMLAudioElement }>({});
  const reducedMotionRef = useRef(false);
  const dragRef = useRef({ dragging: false });
  const prevActiveRef = useRef<number | null>(null);

  const [geo, setGeo] = useState<MenuGeometry>(() => getMenuGeometry());
  const [everOpened, setEverOpened] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    audioRefs.current = {
      open: new Audio('/sounds/menu-open.mp3'),
      close: new Audio('/sounds/menu-close.mp3'),
      select: new Audio('/sounds/menu-select.mp3'),
    };
  }, []);

  useEffect(() => {
    const onResize = () => setGeo(getMenuGeometry());
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-way latch derived from the open prop, keeps DOM mount alive after first open
    if (open) {
      setGeo(getMenuGeometry());
      setEverOpened(true);
    } else {
      dragRef.current.dragging = false;
      setActiveIndex(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  function playSound(name: 'open' | 'close' | 'select') {
    if (reducedMotionRef.current) return;
    const el = audioRefs.current[name];
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {});
  }

  const segments = useMemo(() => {
    const n = SEGMENT_ORDER.length;
    const step = 360 / n;
    return SEGMENT_ORDER.map((s, i) => ({
      ...s,
      start: i * step + SEGMENT_GAP_DEG / 2,
      end: (i + 1) * step - SEGMENT_GAP_DEG / 2,
      mid: i * step + step / 2,
    }));
  }, []);

  // Open/close choreography — flicker-shuffle stagger, joystick scale-in.
  useGSAP(
    () => {
      if (!everOpened) return;
      const overlay = overlayRef.current;
      const joystick = joystickRef.current;
      const topStrip = topStripRef.current;
      const bottomStrip = bottomStripRef.current;
      const segEls = segmentRefs.current.filter((el): el is HTMLAnchorElement => Boolean(el));
      if (!overlay || !joystick || segEls.length === 0) return;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const shuffled = segEls.map((_, i) => i).sort(() => Math.random() - 0.5);
      gsap.set(joystick, { x: 0, y: 0 });
      const tl = gsap.timeline();

      if (open) {
        playSound('open');
        if (reduced) {
          tl.to(overlay, { opacity: 1, duration: 0.2 })
            .set(segEls, { opacity: 1 }, '<')
            .to([joystick, topStrip, bottomStrip], { opacity: 1, duration: 0.2 }, '<');
        } else {
          tl.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' })
            .fromTo(joystick, { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, '-=0.15')
            .to([topStrip, bottomStrip], { opacity: 1, duration: 0.3 }, '<');
          shuffled.forEach((idx, order) => {
            const el = segEls[idx];
            tl.fromTo(
              el,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.075,
                repeat: 3,
                yoyo: true,
                ease: 'power1.inOut',
                onComplete: () => gsap.set(el, { opacity: 1 }),
              },
              0.15 + order * 0.06
            );
          });
        }
      } else {
        playSound('close');
        if (reduced) {
          tl.to(segEls, { opacity: 0, duration: 0.15 })
            .to([joystick, topStrip, bottomStrip], { opacity: 0, duration: 0.15 }, '<')
            .to(overlay, { opacity: 0, duration: 0.15 }, '<');
        } else {
          shuffled.forEach((idx, order) => {
            const el = segEls[idx];
            tl.fromTo(
              el,
              { opacity: 1 },
              {
                opacity: 0,
                duration: 0.06,
                repeat: 3,
                yoyo: true,
                ease: 'power1.inOut',
                onComplete: () => gsap.set(el, { opacity: 0 }),
              },
              order * 0.04
            );
          });
          tl.to(joystick, { scale: 0.4, opacity: 0, duration: 0.3, ease: 'power2.in' }, '-=0.1')
            .to([topStrip, bottomStrip], { opacity: 0, duration: 0.2 }, '<')
            .to(overlay, { opacity: 0, duration: 0.25 }, '<');
        }
      }
    },
    { dependencies: [open, everOpened], scope: overlayRef }
  );

  // Hover / drag-select flicker-invert on whichever segment is "active".
  useEffect(() => {
    const prev = prevActiveRef.current;
    const reduced = reducedMotionRef.current;
    if (prev !== null && prev !== activeIndex) {
      const el = segmentRefs.current[prev];
      if (el) flickerSegment(el, false, reduced);
    }
    if (activeIndex !== null) {
      const el = segmentRefs.current[activeIndex];
      if (el) flickerSegment(el, true, reduced);
    }
    prevActiveRef.current = activeIndex;
  }, [activeIndex]);

  const knobSize = geo.innerRadius * 1.8;
  const DRAG_DEADZONE = 8;
  const MAX_DRAG = 25;

  function handlePointerDown(e: React.PointerEvent) {
    if (reducedMotionRef.current) return;
    const joystick = joystickRef.current;
    if (!joystick) return;
    joystick.setPointerCapture(e.pointerId);
    dragRef.current.dragging = true;
    gsap.killTweensOf(joystick);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragRef.current.dragging) return;
    const box = menuBoxRef.current;
    const joystick = joystickRef.current;
    if (!box || !joystick) return;
    const rect = box.getBoundingClientRect();
    let dx = e.clientX - (rect.left + rect.width / 2);
    let dy = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.hypot(dx, dy);
    if (dist > MAX_DRAG) {
      const ratio = MAX_DRAG / dist;
      dx *= ratio;
      dy *= ratio;
    }
    gsap.set(joystick, { x: dx, y: dy });

    if (dist <= DRAG_DEADZONE) {
      if (activeIndex !== null) setActiveIndex(null);
      return;
    }
    let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    if (angle < 0) angle += 360;
    const idx = segments.findIndex((s) => angle >= s.start - SEGMENT_GAP_DEG && angle <= s.end + SEGMENT_GAP_DEG);
    if (idx !== -1 && idx !== activeIndex) {
      setActiveIndex(idx);
      playSound('select');
    }
  }

  function handlePointerUp() {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    const joystick = joystickRef.current;
    if (joystick) gsap.to(joystick, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    if (activeIndex !== null) {
      const target = segments[activeIndex];
      setActiveIndex(null);
      onClose();
      router.push(target.href);
    }
  }

  if (!everOpened) {
    return (
      <div id="radial-nav-menu" role="dialog" aria-modal="true" aria-label="Navigation menu" inert className="hidden" />
    );
  }

  return (
    <div
      ref={overlayRef}
      id="radial-nav-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      inert={!open}
      className="fixed inset-0 z-[100] flex items-center justify-center opacity-0"
      style={{ background: 'radial-gradient(circle at 50% 50%, #0d0d0d 0%, #000000 70%)' }}
    >
      <div ref={topStripRef} className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-4 opacity-0 sm:px-10">
        <LocaleSwitch />
        <button
          type="button"
          onClick={onClose}
          aria-label={t('close')}
          className="flex h-9 w-9 items-center justify-center text-[#9494a0] transition-colors hover:text-[#d8d9dc]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="h-5 w-5">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div ref={menuBoxRef} className="relative" style={{ width: geo.size, height: geo.size }}>
        {segments.map((seg, i) => {
          const pos = polarPoint(geo.center, geo.contentRadius, seg.mid);
          return (
            <Link
              key={seg.key}
              href={seg.href}
              ref={(el: HTMLAnchorElement | null) => {
                segmentRefs.current[i] = el;
              }}
              onMouseEnter={() => !dragRef.current.dragging && setActiveIndex(i)}
              onMouseLeave={() => !dragRef.current.dragging && setActiveIndex(null)}
              onFocus={() => setActiveIndex(i)}
              onBlur={() => setActiveIndex(null)}
              onClick={onClose}
              className="absolute flex items-center justify-center border border-white/10 bg-white/5 text-[#d8d9dc] opacity-0 backdrop-blur-sm"
              // clipPath coordinates are physical (CSS px space, direction-agnostic), so the box must be too.
              style={{ left: 0, top: 0, width: geo.size, height: geo.size, clipPath: segmentClipPath(geo, seg.start, seg.end), zIndex: activeIndex === i ? 20 : 1 }}
            >
              <span
                className="pointer-events-none absolute flex flex-col items-center gap-1 sm:gap-2"
                style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
              >
                <div className="scale-85 sm:scale-100 transition-transform">
                  <SegmentIcon segment={seg.key} />
                </div>
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider">{t(seg.key)}</span>
              </span>
            </Link>
          );
        })}

        <button
          ref={joystickRef}
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="absolute z-30 touch-none select-none rounded-full bg-[#d8d9dc] opacity-0 shadow-[0_0_40px_rgba(216,217,220,0.35)] active:cursor-grabbing"
          style={{ width: knobSize, height: knobSize, left: '50%', top: '50%', marginLeft: -knobSize / 2, marginTop: -knobSize / 2, cursor: 'grab' }}
        />
        <p
          className="pointer-events-none absolute inset-x-0 z-30 mx-auto w-fit whitespace-nowrap font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8e8f94]"
          style={{ top: geo.center + knobSize / 2 + (typeof window !== 'undefined' && window.innerWidth < 1024 ? 10 : 16) }}
        >
          {tMenu('hint')}
        </p>
      </div>

      <div
        ref={bottomStripRef}
        className="absolute inset-x-0 bottom-0 flex flex-col-reverse items-center gap-2.5 px-6 pb-24 pt-4 opacity-0 sm:flex-row sm:justify-between sm:px-10 sm:py-5"
      >
        <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#8e8f94] text-center max-w-[280px] sm:max-w-none leading-relaxed">
          {tMenu('copyright')}
        </p>
        <div className="flex items-center gap-5 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#9494a0]">
          <Link href="/legal/privacy" onClick={onClose} className="transition-colors hover:text-[#d8d9dc] py-1">
            {tFooter('privacy')}
          </Link>
          <Link href="/legal/terms" onClick={onClose} className="transition-colors hover:text-[#d8d9dc] py-1">
            {tFooter('terms')}
          </Link>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Nav
// ---------------------------------------------------------------------------

export function Nav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('nav');

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-ink/65 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" aria-label="Arranto" className="flex items-center text-white hover:opacity-90 transition-opacity">
            <Logo variant="full" size="md" className="text-white" />
          </Link>

          <div className="flex items-center gap-4">
            <LocaleSwitch />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="radial-nav-menu"
              className="flex h-9 w-9 -me-1 flex-col items-center justify-center gap-1.5 text-[#9494a0] transition-colors hover:text-[#d8d9dc]"
            >
              <span className="sr-only">{open ? t('close') : t('menu')}</span>
              <span
                aria-hidden
                className="block h-[1.5px] w-5 bg-current transition-transform duration-300"
                style={{ transform: open ? 'translateY(3.5px) rotate(45deg)' : 'none' }}
              />
              <span
                aria-hidden
                className="block h-[1.5px] w-5 bg-current transition-transform duration-300"
                style={{ transform: open ? 'translateY(-3.5px) rotate(-45deg)' : 'none' }}
              />
            </button>
          </div>
        </div>
      </header>

      <RadialMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
