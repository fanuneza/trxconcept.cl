# OG image proposals

Five Open Graph / social-share image proposals (1200×630), built entirely from the site's own assets — the brand fonts (Bebas Neue + Source Sans 3), the yellow logo (`trx-concept-logo-transparente-amarillo.png`), and the existing hero/portrait photos. Nothing here is wired into the site yet; these are for review. Adopt one via the steps at the bottom.

Preview them together in `contact-sheet.png`, or individually as `og-v1…v5.webp`.

| #   | File         | Direction                                                                   | Photo used                               | Job                                                |
| --- | ------------ | --------------------------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------- |
| 1   | `og-v1.webp` | **Foto + titular** — full-bleed photo, diagonal scrim, headline bottom-left | `hero.webp` (park training + kettlebell) | The safe workhorse. Warm, real, unmistakably TRX.  |
| 2   | `og-v2.webp` | **Split editorial** — near-black type panel + toned photo, trust signals    | `hero-desktop.jpg`                       | Maximum legibility at thumbnail; leads with proof. |
| 3   | `og-v3.webp` | **Drenched typographic** — no photo, huge Bebas + acid yellow               | — (type only)                            | Reads at any size, even a tiny WhatsApp thumb.     |
| 4   | `og-v4.webp` | **Duotone acid** — photo collapsed into the brand's black→yellow world      | `hero.webp` (duotone)                    | The boldest, most ownable palette moment.          |
| 5   | `og-v5.webp` | **Nico, la persona** — portrait in the site's yellow-ring avatar treatment  | `nico.webp`                              | Puts a human face on the share; the trust angle.   |

**Notes**

- Copy is Chilean Spanish and on-voice (no banned phrases). V4's line is DESIGN.md's north star, "Entrenar con criterio, sin ruido."
- V1 and V4 use the same source photo on purpose — they demonstrate two opposite treatments of it (photojournalistic vs. duotone). Only one would ship, so the reuse is moot; if you like the duotone but want a distinct photo, I can re-cut V4 on the TRX-strap shot with a hand-masked scrim.
- All are ≤103 KB (current `og-image.webp` is 194 KB), so any is a net weight win.

## How these were rendered

Compositions are `v1…v5.html` + `base.css` (self-contained, real brand fonts/photos referenced locally). They were screenshotted at 1200×630 @2× with the project's Playwright/Chromium via `render.mjs`, then downscaled to 1200×630 WebP (q82). To regenerate, drop the brand fonts + resized photos next to the HTML and run `node render.mjs`.

## To adopt one

1. Copy the chosen `og-vN.webp` to `src/assets/images/og-image.webp` (the file imported by `src/layouts/BaseLayout.astro` and `src/data/pages.ts`).
2. `npm run build` — Astro re-hashes it; `og:image` picks up the new `/_astro/og-image.*.webp` automatically. No markup changes needed.
3. Re-validate the share preview (WhatsApp/Instagram or a social-card validator).
