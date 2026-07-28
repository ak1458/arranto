'use client';

import { useEffect, useState } from 'react';

/**
 * Floating "scroll to top" button — appears after scrolling 400px down.
 * Positioned bottom-right, above the chat widget. Uses smooth native scroll.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setVisible(window.scrollY > 400);
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0 })}
      className={`
        fixed z-40 flex items-center justify-center
        rounded-full border border-white/15 bg-[#0a0a0a]/80 backdrop-blur-sm
        text-[#d8d9dc] shadow-lg
        transition-all duration-300 ease-out
        hover:bg-[#d8d9dc] hover:text-black hover:border-[#d8d9dc] hover:shadow-[0_0_20px_rgba(216,217,220,0.25)]
        active:scale-90
        w-10 h-10 bottom-24 end-5
        sm:w-11 sm:h-11 sm:bottom-8 sm:end-6
        ${visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
        }
      `}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 sm:w-5 sm:h-5"
        aria-hidden="true"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
