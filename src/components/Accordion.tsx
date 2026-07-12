"use client";

import { useId, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  label: string;
  items: { q: string; a: string }[];
};

/** The site's one piece of progressive disclosure: a collapsed Details panel. */
export function Accordion({ label, items }: Props) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();

  useGSAP(
    () => {
      const el = panel.current!;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(el, { height: open ? "auto" : 0, autoAlpha: open ? 1 : 0 });
        return;
      }
      gsap.to(el, {
        height: open ? "auto" : 0,
        autoAlpha: open ? 1 : 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    },
    { dependencies: [open] },
  );

  return (
    <div className="border-y border-line">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between py-5 text-start font-mono text-sm uppercase tracking-widest"
      >
        {label}
        <span
          aria-hidden
          className={`text-gold transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <div id={id} ref={panel} className="h-0 overflow-hidden opacity-0">
        <dl className="flex flex-col gap-6 pb-8">
          {items.map(({ q, a }) => (
            <div key={q}>
              <dt className="font-medium">{q}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-fog">{a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
