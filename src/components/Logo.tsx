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
      {rows.map((y) =>
        cols.map((x, ci) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={1.6}
            fill="currentColor"
            opacity={0.35 + ci * 0.14}
          />
        ))
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
            strokeOpacity={0.5}
            strokeLinecap="round"
            strokeDasharray={i % 2 === 0 ? "0" : "3 4"}
          />
        );
      })}
      <circle cx={nodeX} cy={nodeY} r={7} fill={node} />
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
