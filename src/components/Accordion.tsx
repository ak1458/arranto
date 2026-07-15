'use client';

import { useId, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

type Props = {
  label: string;
  items: { q: string; a: string }[];
};

export function Accordion({ label, items }: Props) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        gsap.set(panel, { height: open ? 'auto' : 0, opacity: open ? 1 : 0 });
        return;
      }

      gsap.to(panel, {
        height: open ? 'auto' : 0,
        opacity: open ? 1 : 0,
        duration: 0.4,
        ease: 'power2.inOut',
      });
    },
    { dependencies: [open] },
  );

  if (items.length === 0) return null;

  return (
    <div className="border-y border-white/10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between py-5 text-start font-mono text-sm uppercase tracking-widest text-paper transition-colors hover:text-[#d8d9dc]"
      >
        {label}
        <span aria-hidden className="font-bold text-[#d8d9dc]">
          {open ? '−' : '+'}
        </span>
      </button>

      <div id={id} ref={panelRef} className="h-0 overflow-hidden opacity-0">
        <dl className="flex flex-col gap-6 pb-8">
          {items.map(({ q, a }) => (
            <div key={q}>
              <dt className="font-semibold text-paper">{q}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-[#9494a0]">{a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
