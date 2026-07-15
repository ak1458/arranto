# 08 — Product showcase (scroll-driven reel)

## Reference used
Block 7 "GSAP sticky horizontal gallery" in `reference_code.md` + `design_preview/07_gallery.html`.

## Adaptation notes
- Reproduced the robust pinned horizontal reel: `pin:true`, `scrub:1`, `anticipatePin:1`, `invalidateOnRefresh`, `setTimeout(refresh,300)` + `load` refresh (the safety-check the source explicitly required).
- 5 tiles (Launch / Build / Ship / Scale / Repeat) as a vertical-scroll-locked horizontal swipe; reverses on scroll-up (native ScrollTrigger scrub behavior).
- Recolored from per-tile rainbow gradients to unified dark surface + lime numerals; each tile `.card-hover` (Section 2).
- Placeholders `.ph-img` (reel.01–05) — swap for real product shots.

## Open questions
- [ ] Real product/showcase imagery for the 5 tiles.
