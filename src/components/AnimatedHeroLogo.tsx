'use client';

import React from 'react';
import Image from 'next/image';

/**
 * Arranto Brand Hero Logo — the iconic metallic geometric symbol with
 * luxury light sheen reflection, ambient aura, and subtle floating motion.
 */
export function AnimatedHeroLogo({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      aria-hidden="true"
    >
      <style>{`
        @keyframes heroAuraPulse {
          0%, 100% {
            opacity: 0.35;
            transform: scale(0.96);
          }
          50% {
            opacity: 0.65;
            transform: scale(1.04);
          }
        }
        @keyframes heroSheen {
          0% {
            transform: translateX(-150%) skewX(-25deg);
            opacity: 0;
          }
          15% {
            opacity: 0.75;
          }
          30% {
            transform: translateX(250%) skewX(-25deg);
            opacity: 0;
          }
          100% {
            transform: translateX(250%) skewX(-25deg);
            opacity: 0;
          }
        }
        @keyframes heroFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .hero-aura {
          animation: heroAuraPulse 4s ease-in-out infinite;
        }
        .hero-sheen-beam {
          animation: heroSheen 5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        .hero-float-wrapper {
          animation: heroFloat 6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-aura, .hero-sheen-beam, .hero-float-wrapper {
            animation: none !important;
          }
        }
      `}</style>

      {/* Ambient silver/platinum backlight aura */}
      <div
        className="hero-aura absolute inset-0 -m-6 rounded-full pointer-events-none blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(216, 217, 220, 0.25) 0%, rgba(255, 255, 255, 0.08) 45%, transparent 75%)',
        }}
      />

      {/* Floating container */}
      <div className="hero-float-wrapper relative flex items-center justify-center">
        {/* Crisp Symbol Image */}
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src="/brand/arranto-symbol.png"
            alt="Arranto Symbol"
            width={915}
            height={1028}
            priority
            className="h-24 sm:h-32 md:h-40 lg:h-48 w-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] filter transition-transform duration-500 group-hover:scale-105"
          />

          {/* Light Sheen Reflection Sweep */}
          <div
            className="hero-sheen-beam absolute inset-0 pointer-events-none w-1/2 h-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
              mixBlendMode: 'overlay',
            }}
          />
        </div>
      </div>
    </div>
  );
}
