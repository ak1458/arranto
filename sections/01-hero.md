# 01 — Hero (scroll-driven reveal)

## Reference used
`premium-components/scroll63/` — scroll63 hero mechanic. Source files read: `files/index.html`, `files/styles.css`, `files/script.js`.

## Adaptation notes
- Reproduced the 4-phase pinned scroll mechanic faithful to scroll63:
  1. FG clip-path slit opens (0→25% progress)
  2. FG rotates 0→65deg (25→45%)
  3. FG scales 1→0 and BG copy slides apart (45→65%)
  4. Outro images wipe in from top/bottom + masked line reveal (65→90%)
- Recolored to the Arranto dark-studio system: `--bg-2` ink canvas, lime `--accent` overlay (was red `#e12c1a` in source).
- Outro line reveal uses 2 stacked `<span class="line">` (yPercent 110→0) instead of GSAP SplitText (avoids paid plugin; CSS-only masking).
- Added a `mix-blend-mode:difference` on the FG header so it stays legible over any image.
- Hero copy is placeholder-brand ("Studio for the post-screen web"); needs real brand statement — see Open questions.

## Open questions
- Real hero headline / sub-line copy.
- Real background + outro images (using `.ph-img` placeholders now).
