# 02 — Global hover system

## Reference used
`premium-components/hover19/` — hover19 vanilla + GSAP proximity "jiggle". Read `code/script.js` + `code/styles.css`.

## Adaptation notes
- The source is a full proximity-physics playground (cursor-velocity push on absolutely-positioned cards). That is heavy and off-brand for a content site, so I implemented the brief's intent — "subtle jiggle when a card is touched/hovered" — as a lightweight CSS `@keyframes jiggle` on `.card-hover:hover`.
- Applied `.card-hover` to all real cards site-wide: stacking work cards (Section 6) and gallery reel tiles (Section 8).
- Kept motion tiny (≤2px translate, ≤0.6deg rotate) so it reads as a tactile nudge, not a wobble. Honors "one decisive flourish" restraint.

## Open questions
- None. Behavior matches brief intent; escalate to full hover19 proximity physics only if you want the playful bounce on a specific surface.
