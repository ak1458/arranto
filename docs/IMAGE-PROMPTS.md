# Arranto — Image Needs & AI Generation Prompts

Every image goes in `site/public/work/` (thumbnails) or `site/public/` (OG).
Until these exist, the site renders generative convergence-pattern SVGs in their
place — nothing is broken, images are a drop-in upgrade.

**Global style clause (append to every prompt below):**

> Dark, premium, minimal aesthetic on a deep ink-violet background (#1C1B2E).
> Single warm amber-gold accent (#C9862E) used sparingly as glowing light —
> never as a large fill. Soft cinematic lighting, subtle film grain, generous
> negative space, no text, no words, no letters, no watermark, no logos.
> Photorealistic 3D render quality, shallow depth of field.

---

## 1. Case-study thumbnails — 5 images, 1920×1200 (16:10), WebP

Used on `/work` tiles and each detail page. Name files exactly:

### `public/work/pulsekart.webp`
> A sleek dark point-of-sale terminal interface floating as a glass panel in a
> dark pharmacy environment, rows of softly blurred medicine shelves in the
> deep background. The glass UI shows abstract inventory rows and a billing
> column as glowing wireframe blocks — deliberately abstract, unreadable. One
> amber-gold node pulses where a barcode scan line meets the panel. Composition:
> panel on the right two-thirds, dark negative space on the left.

### `public/work/orderflow.webp`
> A dark logistics command view from above: a minimal night map rendered as
> faint dot-grid streets, with three or four delivery routes drawn as thin
> luminous paths converging toward one amber-gold hub point. Tiny vehicle
> markers glow faintly along the routes. Feels like a live operations
> dashboard, not a printed map. Composition: hub point at right-center,
> routes flowing in from the left.

### `public/work/veloria-vault.webp`
> A premium leather handbag photographed in near-darkness on a reflective
> black surface, lit by one warm amber rim light. In front of it floats a
> minimal translucent e-commerce product card as a glass panel — abstract
> wireframe blocks for title and price, a soft gold buy-button block.
> Luxurious, editorial, moody product photography.

### `public/work/zatca-compliance-engine.webp`
> An abstract visualization of secure real-time document clearance: a stream
> of thin translucent invoice-like rectangles flying along a curved path
> through a dark space, each one passing through a glowing amber-gold ring —
> the stamping gate — and emerging with a tiny gold seal of light. Cryptographic
> feel: faint hexadecimal-like dot patterns in the deep background, unreadable.
> Composition: stream enters from the left, gate at right-center.

### `public/work/sanad-os.webp`
> A dark isometric view of a modern facility floor — server rooms, HVAC units,
> corridors — rendered as minimal wireframe volumes in deep ink tones. Above
> three of the units float small glass status chips connected by thin luminous
> threads to one amber-gold core node at the top right. Feels like a building
> made legible by one system. Clean, architectural, precise.

---

## 2. Social share image — 1 image, 1200×630, PNG

### `public/og.png`
> A wide, dark brand image: a field of small paper-white dots scattered across
> the left half, sweeping into thin curved luminous lines that converge into a
> single glowing amber-gold node at the right third. Deep ink-violet background
> with a very subtle vignette. Nothing else — pure convergence motif, cinematic
> and calm. (Leave clear space center-left; the wordmark gets overlaid in code
> later if needed.)

---

## 3. Optional / later

- **Founder portrait** (`/studio`, optional): dark, editorial, side-lit
  portrait against ink background, warm gold key light. Only if you want a
  face on the studio page — the spec keeps it minimal without one.
- **Logo animation video**: you already have `Make_the_logo_animation_with_a.mp4`
  in Files and docs — the hero currently uses a live generative canvas of the
  same convergence motif, so the video isn't required. If you prefer the video
  as the hero visual, say so and I'll wire it in with a scroll-scrubbed player.
