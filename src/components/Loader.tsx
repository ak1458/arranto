'use client';

import React, { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';

export function Loader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Run sleek progress sequence from 0 to 100 over ~1.5s
    const start = performance.now();
    const duration = 1500;

    const interval = setInterval(() => {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 300);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  if (done) return null;

  return (
    <div
      id="loader"
      aria-hidden={done}
      style={{ contain: 'paint layout', maxWidth: '100vw', maxHeight: '100vh', overflow: 'clip' }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-[#000000] p-8 text-white transition-opacity duration-500 select-none max-w-[100vw] max-h-[100vh] overflow-x-clip [contain:paint_layout]"
    >
      <div className="w-full flex justify-between items-center max-w-6xl">
        <Logo variant="full" size="md" className="text-white" />
        <span className="font-mono text-xs tracking-widest uppercase text-[#8e8f94]">
          SYS // BOOT_SEQ
        </span>
      </div>

      <div className="flex flex-col items-center text-center max-w-md w-full">
        <Logo variant="mark" size="xl" className="text-white mb-8 animate-pulse" />
        <h1 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-wider text-white">
          Arranto Studio
        </h1>
        <p className="font-mono text-xs text-[#8e8f94] uppercase tracking-widest mt-2">
          Initializing Digital Architectures
        </p>

        {/* Crisp monochrome progress line */}
        <div className="w-full h-[2px] bg-white/10 mt-8 overflow-hidden relative">
          <div
            className="h-full bg-white transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="w-full flex justify-between items-center mt-3 font-mono text-[11px] text-[#8e8f94]">
          <span>STATUS: ONLINE</span>
          <span>{progress.toString().padStart(3, '0')}%</span>
        </div>
      </div>

      <div className="w-full flex justify-between items-center max-w-6xl font-mono text-[10px] text-[#8e8f94] uppercase tracking-widest">
        <span>EST. 2017</span>
        <span>START TO RUNNING. NOTHING LEFT UNDONE.</span>
      </div>
    </div>
  );
}
