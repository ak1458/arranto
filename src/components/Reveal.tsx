"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/** Scroll-triggered rise + fade. Reduced motion: content simply stays visible. */
export function Reveal({ children, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { y: 28, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            delay,
            clearProps: "transform",
            scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
          },
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(ref.current, { autoAlpha: 1 });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`gs-reveal ${className}`}>
      {children}
    </div>
  );
}
