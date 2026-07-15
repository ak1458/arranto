# 05 — Contact form (terminal style)

## Reference used
Block 4 "Terminal CLI" in `reference_code.md` (phosphor-green design system) + `design_preview/04_terminal.html`. Built from scratch per brief ("you build this yourself").

## Adaptation notes
- Real, working form: name / email / message inputs styled as shell prompts (`$ name`, `$ email`, `$ message`).
- Validation on submit: required-field + email-format check; echoes a `transmit` command, the message, and an `[OK]` confirmation. Soft red `[ERR]` on failure.
- Phosphor aesthetic: `#07090a` bg, `#3fff7a` green, 1px dim-green borders, scanline overlay, blinking caret, inverted hover on the submit button.
- Restyle note: I dropped the source's pure `#33ff00` / amber in favor of a slightly calmer green that still clears contrast — say the word if you want the exact `#33ff00`.

## Open questions
- Where does the transmitted message actually go? (wire to an API/email later — currently logs to the on-screen terminal only.)
