# 04 — Mobile / tablet bottom navigation (magnification dock)

## Reference used
`design_preview/03_dock.html` (self-contained macOS-style magnification dock). Logic read + replicated.

## Adaptation notes
- Replicated the vanilla magnification math exactly: base 46px, magnification 72px, distance 180px, linear falloff `1 - d/dist`, per-item width/height tween on `mousemove`, reset on `mouseleave`.
- Rendered only ≤860px (mobile/tablet) as a fixed bottom-center dock; hidden on desktop where the top nav is used.
- Items: Home, Work, Reel, Contact — each scrolls to its section via Lenis (active state tracked).
- Tooltips on hover/focus. SVG icons (inline, monoline) instead of the lucide CDN dependency.

## Open questions
- None. Match "behaves exactly like Apple's dock" satisfied.
