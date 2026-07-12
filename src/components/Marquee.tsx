const STACK = [
  "Next.js",
  "TypeScript",
  "React",
  "GSAP",
  "Node.js",
  "Postgres",
  "Tailwind",
  "AI systems",
  "Automation",
];

/** Slow tech-stack ticker. Pure CSS animation; pauses under reduced motion. */
export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-line py-4">
      <div dir="ltr" className="flex w-max animate-marquee gap-14">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 gap-14 font-mono text-sm text-muted"
          >
            {STACK.map((item) => (
              <li key={item} className="flex items-center gap-14">
                {item}
                <span className="text-gold/60">·</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
