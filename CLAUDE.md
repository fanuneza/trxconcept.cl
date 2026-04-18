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

Single-page site (`index.html`) with one stylesheet (`assets/css/style.css`). All content lives in `index.html`; all styling in `style.css`.

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
- Responsive breakpoints: `768px` and `576px`

## Contact / CTA

All WhatsApp links point to `https://wa.me/56984402664`. Update this number if the contact changes.
