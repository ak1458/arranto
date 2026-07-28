'use client';

import React, { useState } from 'react';

type Step = {
  id: string;
  label: string;
  x: number;
};

const STEPS: Step[] = [
  { id: 'discover', label: 'Discover', x: 150 },
  { id: 'design', label: 'Design', x: 375 },
  { id: 'build', label: 'Build', x: 600 },
  { id: 'deploy', label: 'Deploy', x: 825 },
  { id: 'support', label: 'Support', x: 1050 },
];

export function FlowAnimation({ className = '' }: { className?: string }) {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const nodeY = 32;
  const convergeX = 600;
  const convergeY = 250;
  const stemEndY = 380;

  return (
    <div className={`relative w-full max-w-5xl mx-auto overflow-hidden select-none ${className}`}>
      <style>{`
        @keyframes flowPulse {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes nodeGlowPulse {
          0% { r: 6px; opacity: 0.6; }
          50% { r: 12px; opacity: 1; }
          100% { r: 6px; opacity: 0.6; }
        }
        .flow-path-bg {
          stroke: rgba(65, 104, 135, 0.25);
          transition: stroke 0.4s ease, stroke-width 0.4s ease, opacity 0.4s ease;
        }
        .flow-path-glow {
          stroke: #7ec7ff;
          stroke-dasharray: 80 400;
          animation: flowPulse 4s linear infinite;
        }
        .flow-path-active {
          stroke: #7ec7ff !important;
          stroke-width: 3px !important;
          filter: drop-shadow(0 0 8px #7ec7ff);
        }
      `}</style>

      {/* Top Pill Badges */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-12 pt-2 pb-6">
        {STEPS.map((step) => {
          const isActive = activeStep === step.id;
          return (
            <button
              key={step.id}
              onMouseEnter={() => setActiveStep(step.id)}
              onMouseLeave={() => setActiveStep(null)}
              onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              className={`group relative flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full font-mono text-[10px] sm:text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                isActive
                  ? 'bg-[#7ec7ff]/20 text-[#7ec7ff] border border-[#7ec7ff] shadow-[0_0_20px_rgba(126,199,255,0.4)] scale-105'
                  : 'bg-[#060c18]/80 text-[#94a3b8] border border-[#1e293b] hover:border-[#7ec7ff]/50 hover:text-white hover:shadow-[0_0_12px_rgba(126,199,255,0.2)]'
              }`}
            >
              <span
                className={`size-1.5 rounded-full transition-colors ${
                  isActive ? 'bg-[#7ec7ff] shadow-[0_0_8px_#7ec7ff]' : 'bg-[#475569] group-hover:bg-[#7ec7ff]'
                }`}
              />
              <span>{step.label}</span>
            </button>
          );
        })}
      </div>

      {/* SVG Canvas with LangChain-style glowing curves */}
      <svg
        viewBox="0 0 1200 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto pointer-events-none"
        shapeRendering="geometricPrecision"
      >
        <defs>
          {/* Cyan Glow Filter */}
          <filter id="flowGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial Gradient for Stem Glow */}
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7ec7ff" stopOpacity="1" />
            <stop offset="60%" stopColor="#416887" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#030710" stopOpacity="0" />
          </radialGradient>

          {/* Linear Gradient for Stem Line */}
          <linearGradient id="stemGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7ec7ff" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#416887" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7ec7ff" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Ambient Glow Background Paths */}
        {STEPS.map((step) => {
          const isActive = activeStep === step.id;
          const isOtherActive = activeStep !== null && !isActive;

          // Bezier curve calculations
          const pathD =
            step.x === convergeX
              ? `M ${step.x} ${nodeY} L ${convergeX} ${convergeY}`
              : `M ${step.x} ${nodeY} C ${step.x} ${nodeY + 110}, ${convergeX} ${nodeY + 110}, ${convergeX} ${convergeY}`;

          return (
            <g key={`group-${step.id}`}>
              {/* Background static curve */}
              <path
                d={pathD}
                fill="none"
                strokeWidth={isActive ? 3.5 : 1.8}
                className={`flow-path-bg ${isActive ? 'flow-path-active' : ''}`}
                style={{
                  opacity: isOtherActive ? 0.15 : isActive ? 1 : 0.45,
                  stroke: isActive ? '#7ec7ff' : '#334155',
                }}
              />

              {/* Animated Light Pulse overlay */}
              <path
                d={pathD}
                fill="none"
                strokeWidth={isActive ? 3.5 : 2}
                strokeLinecap="round"
                className="flow-path-glow"
                filter="url(#flowGlow)"
                style={{
                  opacity: isOtherActive ? 0.1 : isActive ? 1 : 0.65,
                }}
              />
            </g>
          );
        })}

        {/* Central Vertical Stem */}
        <line
          x1={convergeX}
          y1={convergeY}
          x2={convergeX}
          y2={stemEndY}
          stroke="url(#stemGradient)"
          strokeWidth="2.5"
          filter="url(#flowGlow)"
        />

        {/* Convergence Node Glow Aura */}
        <circle
          cx={convergeX}
          cy={stemEndY}
          r="24"
          fill="url(#nodeGradient)"
          className="opacity-75"
        />

        {/* Outer Pulsing Glow Circle */}
        <circle
          cx={convergeX}
          cy={stemEndY}
          r="8"
          fill="none"
          stroke="#7ec7ff"
          strokeWidth="1.5"
          filter="url(#flowGlow)"
          style={{ animation: 'nodeGlowPulse 2.5s ease-in-out infinite' }}
        />

        {/* Solid Center Node Dot */}
        <circle
          cx={convergeX}
          cy={stemEndY}
          r="5"
          fill="#7ec7ff"
          className="shadow-[0_0_15px_#7ec7ff]"
        />
      </svg>
    </div>
  );
}
