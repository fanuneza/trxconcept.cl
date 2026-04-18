# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for TRX Concept, a personal training business in Santiago, Chile. Hosted on GitHub Pages at `trxconcept.cl`. No build step — edit files and push directly to deploy.

## Development

No package manager or build tools. To preview locally, open `index.html` in a browser or use any static file server:

```bash
npx serve .
# or
python -m http.server 8000
```

## Architecture

Multi-page static site. One shared stylesheet (`assets/css/style.css`). Pages:

| File | URL |
|---|---|
| `index.html` | `/` — main landing page |
| `sobre-mi/index.html` | `/sobre-mi` — about page |
| `servicios/index.html` | `/servicios` — services page |
| `preguntas-frecuentes/index.html` | `/preguntas-frecuentes` — FAQ page |
| `assets/index.html` | `/assets` — printable logos |

All pages share the same header/footer markup and the same inline `<script>` block at the bottom of `<body>`. When changing header/nav/scroll logic, update all pages.

**External dependencies (CDN only):**
- Bootstrap 5.3.7
- Montserrat (Google Fonts) + Impact (cdnfonts)
- Google Analytics 4 (GA ID: `G-P1W5Z80ZJS`)

**Assets:** `assets/img/` holds WebP images; `assets/icons/` holds the WhatsApp SVG mask.

## CSS Conventions

CSS variables are defined in `:root` — use them for any new styles:
- `--color-primary`: `#ffd700` (gold)
- `--color-black`, `--color-white`, `--color-gray-*`
- Fluid typography via `clamp()`
- Responsive breakpoints: `992px`, `768px`, and `576px`

## Header / Scroll Behavior

The `.site-header` is `position: fixed` (not sticky) so its size changes never affect `window.scrollY`. `<main>` has `padding-top: 7rem` (6rem at <992px) to compensate, and a CSS gradient that colors the padding area gold — this prevents a white flash when the header transitions back to full size on scroll-up.

The `.scrolled` class is added/removed by an inline script using **hysteresis + rAF**:
- Added when `scrollY > 70`
- Removed when `scrollY < 50`
- Gated behind `requestAnimationFrame` so only one evaluation runs per paint frame

When `.scrolled` is active: `padding-block` on `.header-inner` shrinks to `0.4rem` and `.brand img` shrinks to `3rem` (both with `0.25s ease` transitions). Do not change the transitions to layout-affecting values without re-testing the scroll oscillation bug.

## Contact / CTA

All WhatsApp links point to `https://wa.me/56984402664`. Update this number if the contact changes.
