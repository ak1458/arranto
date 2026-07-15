"use client";

import { useEffect } from "react";
import gsap from "gsap";

/**
 * CardRepetitionClickEffect
 * Implements Repetition Hover Effect 7 on card click across the site.
 * Creates staggered, repeating visual layers that scale smoothly over clicked cards.
 */
export function CardRepetitionClickEffect() {
  useEffect(() => {
    // Purely decorative, so under reduced-motion it is skipped outright rather than
    // shortened — nothing is lost but the flourish. Implementation plan 5.4.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleCardClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const card = target.closest(".card-hover") as HTMLElement | null;
      if (!card) return;

      // Ensure relative or absolute positioning for layers
      const computedStyle = window.getComputedStyle(card);
      if (computedStyle.position === "static") {
        card.style.position = "relative";
      }

      const numLayers = 4;
      const layers: HTMLDivElement[] = [];

      for (let i = 0; i < numLayers; i++) {
        const layer = document.createElement("div");
        layer.className = "repetition-layer";
        card.appendChild(layer);
        layers.push(layer);
      }

      // Initial scales based on Repetition Effect 7
      const initialScales = [1.6, 1.4, 1.22, 1.1];
      const initialOpacities = [0.45, 0.6, 0.75, 0.9];

      layers.forEach((layer, idx) => {
        gsap.set(layer, {
          scale: initialScales[idx] || 1.3,
          opacity: initialOpacities[idx] || 0.5,
          transformOrigin: "50% 50%",
        });
      });

      // Staggered repetition scale animation exactly modeled on Effect 7
      gsap.to(layers, {
        scale: 1,
        opacity: 0,
        duration: 0.65,
        stagger: -0.08,
        ease: "power2.out",
        onComplete: () => {
          layers.forEach((l) => {
            if (l.parentNode === card) {
              card.removeChild(l);
            }
          });
        },
      });
    };

    document.addEventListener("click", handleCardClick);
    return () => document.removeEventListener("click", handleCardClick);
  }, []);

  return null;
}
