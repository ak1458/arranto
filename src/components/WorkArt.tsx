import Image from 'next/image';

type WorkArtProps = {
  seed: string;
  index?: number;
  className?: string;
  label?: string;
  priority?: boolean;
};

// Slugs with real media in public/work. Anything else falls back to the honest
// empty slot — never a generated stand-in that could read as a product screenshot.
const WITH_MEDIA = new Set([
  'fatura-lite-pro',
  'orderflow',
  'pulsekart',
  'sanad-os',
  'veloria-vault',
]);

export function WorkArt({
  seed,
  className,
  label = 'Screenshot pending',
  priority = false,
}: WorkArtProps) {
  if (!WITH_MEDIA.has(seed)) {
    return (
      <div
        className={`flex items-center justify-center bg-[#0d0d0d] border border-dashed border-white/15 ${className ?? ''}`}
        style={{ aspectRatio: '4 / 3' }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6a6a70] px-4 text-center">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#0d0d0d] ${className ?? ''}`} style={{ aspectRatio: '4 / 3' }}>
      <Image
        src={`/work/${seed}.jpg`}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 40vw"
        className="object-cover"
      />
    </div>
  );
}
