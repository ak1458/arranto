const DOTS = [
  [4, 8], [4, 16], [4, 24],
  [11, 4], [11, 12], [11, 20], [11, 28],
  [18, 8], [18, 16], [18, 24],
  [25, 12], [25, 20],
];

/** Convergence mark: many paths, one core. Mirrored in RTL via CSS. */
export function Logo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 32"
      aria-hidden="true"
      className={`rtl:-scale-x-100 ${className}`}
    >
      <g fill="currentColor" opacity="0.75">
        {DOTS.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.4" />
        ))}
      </g>
      <g
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      >
        <path d="M27 8 C 34 8, 37 14, 41 16" />
        <path d="M27 16 H 41" />
        <path d="M27 24 C 34 24, 37 18, 41 16" />
      </g>
      <circle cx="41" cy="16" r="3.2" fill="var(--color-gold)" />
    </svg>
  );
}
