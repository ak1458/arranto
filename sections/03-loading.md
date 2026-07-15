# 03 — Loading screen

## Reference used
Block 1 "Hyper-Speed Loading" in `reference_code.md` (stand-in until the `velocity` doc is supplied), plus `design_preview/01_loading.html`.

## Adaptation notes
- Built exact `#loader` markup: animated character/speeder loader, "longfazers" background lines, noise texture, progress bar, brand mark.
- Recolored loader + accents to lime `--accent` (source was black `#000` on white → now lime on `--bg-2`).
- Shown on every load, auto-dismisses on `window.load` (+0.9s) or hard safety cap at 4s.
- **STAND-IN ONLY** — final must match the `velocity` loading doc once the user provides it.

## Open questions
- [ ] Provide the `velocity` loading doc → swap this block for the real one.
