'use client';

import React from 'react';

/**
 * Arranto Brand Mark - Animated with LangChain-style glowing vector flows.
 * Represents "many inputs -> one point" with pulsing light streams.
 */
export function AnimatedHeroLogo({ className = '' }: { className?: string }) {
  const cols = [6, 20, 34, 48, 62];
  const rows = [10, 25, 40, 55, 70];
  const nodeX = 150;
  const nodeY = 40;

  return (
    <svg
      viewBox="0 0 180 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      style={{
        WebkitFontSmoothing: 'antialiased',
        overflow: 'visible',
      }}
    >
      <defs>
        {/* Intense Red Glow Filter - Large bounds to prevent square clipping */}
        <filter id="heroGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur1" />
          <feGaussianBlur stdDeviation="6" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradient for paths: Dark Red to Bright Red */}
        <linearGradient id="pathGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8c1c1c" stopOpacity="0.2" />
          <stop offset="70%" stopColor="#ff3333" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ff3333" stopOpacity="1" />
        </linearGradient>

        <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="30%" stopColor="#ff3333" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#030710" stopOpacity="0" />
        </radialGradient>
      </defs>

      <style>{`
        @keyframes streamFlow {
          0% { stroke-dashoffset: 150; }
          100% { stroke-dashoffset: -150; }
        }
        /* Aura pulses in sync with the streams (every 2.5s) */
        @keyframes nodeAuraPulse {
          0% { r: 6px; opacity: 0.4; }
          85% { r: 6px; opacity: 0.4; }
          95% { r: 16px; opacity: 1; }
          100% { r: 6px; opacity: 0.4; }
        }
        /* Core white dot flashes briefly only when the stream hits it */
        @keyframes nodeCoreBlink {
          0% { opacity: 0; transform: scale(0.5); }
          85% { opacity: 0; transform: scale(0.5); }
          95% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(0.5); }
        }
        @keyframes dotPulse {
          0% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 0.6; transform: scale(1.1); }
          100% { opacity: 0.15; transform: scale(0.8); }
        }
        
        .hero-stream {
          stroke: url(#pathGradient);
          stroke-dasharray: 20 130;
          animation: streamFlow 2.5s linear infinite;
          filter: url(#heroGlow);
        }
        
        .hero-stream-bg {
          stroke: #8c1c1c;
          opacity: 0.15;
        }

        .hero-node-aura {
          animation: nodeAuraPulse 2.5s ease-in-out infinite;
          transform-origin: ${nodeX}px ${nodeY}px;
        }
        
        .hero-node-core {
          animation: nodeCoreBlink 2.5s ease-in-out infinite;
          transform-origin: ${nodeX}px ${nodeY}px;
        }
      `}</style>

      {/* Grid of Dots (Inputs) */}
      {rows.map((y, rowIdx) =>
        cols.map((x, ci) => (
          <circle
            key={`dot-${x}-${y}`}
            cx={x}
            cy={y}
            r={1.2}
            fill="#ff3333"
            style={{
              animation: `dotPulse ${2 + (rowIdx + ci) * 0.2}s ease-in-out infinite`,
              transformOrigin: `${x}px ${y}px`,
            }}
          />
        ))
      )}

      {/* Converging Paths */}
      {rows.map((y, i) => {
        const startX = 66;
        const c1x = 100;
        const c2x = 128;
        const d = `M ${startX} ${y} C ${c1x} ${y}, ${c2x} ${nodeY}, ${nodeX - 4} ${nodeY}`;
        
        return (
          <g key={`flow-${y}`}>
            {/* Background Track */}
            <path
              d={d}
              fill="none"
              strokeWidth={1.5}
              strokeLinecap="round"
              className="hero-stream-bg"
              vectorEffect="non-scaling-stroke"
            />
            {/* Flowing Light Beam */}
            <path
              d={d}
              fill="none"
              strokeWidth={2.5}
              strokeLinecap="round"
              className="hero-stream"
              vectorEffect="non-scaling-stroke"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          </g>
        );
      })}

      {/* Convergence Node - The Aura/Glow */}
      <circle
        cx={nodeX}
        cy={nodeY}
        r={14}
        fill="url(#nodeGradient)"
        className="hero-node-aura"
        filter="url(#nodeGlow)"
      />
      {/* Convergence Node - The Bright White Core */}
      <circle
        cx={nodeX}
        cy={nodeY}
        r={4}
        fill="#ffffff"
        className="hero-node-core"
        filter="url(#nodeGlow)"
      />
    </svg>
  );
}
