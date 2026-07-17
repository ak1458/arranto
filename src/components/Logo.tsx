import { michroma } from "@/lib/fonts";

type LogoProps = {
  variant?: "full" | "mark" | "wordmark";
  className?: string;
  wordmarkClassName?: string;
  /** Override the node (convergence dot) colour */
  node?: string;
  /** Size preset — controls mark height and wordmark text size */
  size?: "sm" | "md" | "lg" | "xl";
};

/** Monochrome node — the single convergence point in the mark. */
const NODE = "#d8d9dc";

const SIZE_MAP = {
  sm: { mark: "h-5 w-auto", text: "text-xs" },
  md: { mark: "h-7 w-auto", text: "text-sm" },
  lg: { mark: "h-9 w-auto", text: "text-lg" },
  xl: { mark: "h-12 w-auto", text: "text-2xl" },
};

/**
 * Arranto brand mark — a grid of dots converging into a single node:
 * "many inputs → one point / start to running". Dots + curves use
 * `currentColor` (white on dark, ink on light); the node stays platinum.
 */
export function LogoMark({ className = "", node = NODE }: { className?: string; node?: string }) {
  const cols = [6, 20, 34, 48, 62];
  const rows = [10, 25, 40, 55, 70];
  const nodeX = 150;
  const nodeY = 40;

  return (
    <svg
      viewBox="0 0 168 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <style>{`
        @keyframes logoDotFade {
          0% { opacity: 0; transform: translateX(-30px) scale(0.1); }
          100% { opacity: var(--dot-op); transform: translateX(0) scale(1); }
        }
        @keyframes logoPathReveal {
          0% { opacity: 0; transform: translateX(-15px); }
          100% { opacity: 0.5; transform: translateX(0); }
        }
        @keyframes logoNodePulse {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        .logo-dot {
          opacity: 0;
          animation: logoDotFade 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: center;
        }
        .logo-path {
          opacity: 0;
          animation: logoPathReveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .logo-node {
          opacity: 0;
          animation: logoNodePulse 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-dot { animation: none; opacity: var(--dot-op); }
          .logo-path { animation: none; opacity: 0.5; }
          .logo-node { animation: none; opacity: 1; }
        }
      `}</style>
      {rows.map((y, rowIdx) =>
        cols.map((x, ci) => {
          const op = 0.35 + ci * 0.14;
          return (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r={1.6}
              fill="currentColor"
              className="logo-dot"
              style={{
                "--dot-op": op,
                animationDelay: ((rowIdx + ci) * 0.05) + "s"
              } as React.CSSProperties}
            />
          );
        })
      )}
      {rows.map((y, i) => {
        const startX = 66;
        const c1x = 100;
        const c2x = 128;
        return (
          <path
            key={`curve-${y}`}
            d={`M ${startX} ${y} C ${c1x} ${y}, ${c2x} ${nodeY}, ${nodeX - 6} ${nodeY}`}
            stroke="currentColor"
            strokeWidth={1.1}
            strokeLinecap="round"
            strokeDasharray={i % 2 === 0 ? "0" : "3 4"}
            className="logo-path"
            style={{ animationDelay: (0.3 + i * 0.1) + "s" }}
          />
        );
      })}
      <circle cx={nodeX} cy={nodeY} r={7} fill={node} className="logo-node" style={{ animationDelay: "1s" }} />
    </svg>
  );
}

/**
 * Full lockup: mark + ARRANTO wordmark in Michroma (the logo font).
 * White/current on transparent — drops onto AMOLED background cleanly.
 */
export function Logo({
  variant = "full",
  className = "",
  wordmarkClassName = "",
  node,
  size = "md",
}: LogoProps) {
  const s = SIZE_MAP[size];

  if (variant === "mark") {
    return <LogoMark className={`${s.mark} ${className}`} node={node} />;
  }

  const wordmark = (
    <span
      className={`${michroma.className} tracking-[0.28em] leading-none ${s.text} ${wordmarkClassName}`}
      style={{ fontFeatureSettings: '"kern" 1' }}
    >
      ARRANTO
    </span>
  );

  if (variant === "wordmark") {
    return (
      <span className={`inline-flex items-center text-current ${className}`} aria-label="Arranto">
        {wordmark}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 text-current ${className}`} aria-label="Arranto">
      <LogoMark className={`${s.mark} shrink-0`} node={node} />
      {wordmark}
    </span>
  );
}
