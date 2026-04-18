# TRX Concept — Design System

Multi-page lead generation site for a personal TRX trainer in Santiago, Chile. Built with HTML, custom CSS, and Bootstrap 5.3 as a utility layer. Language: Spanish (es).

Pages: `/` (landing), `/sobre-mi`, `/servicios`, `/preguntas-frecuentes`, `/assets` (printable logos).

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#ffd700` | Brand gold. Header background, footer background, CTA button, testimonial quote marks, comparison highlight |
| `--color-black` | `#000` | Body text, dark buttons, logo |
| `--color-white` | `#fff` | Page background, inverted button text |
| `--color-gray-light` | `#f5f5f5` | Section backgrounds (benefits, pricing) |
| `--color-gray` | `#ededed` | Table header background |
| `--color-gray-dark` | `#444` | Secondary body text, testimonial quotes, benefit descriptions |
| `--color-gray-note` | `#a3a3a3` | Fine print, pricing notes |
| WhatsApp green | `#25d366` | Floating WhatsApp button only — not a CSS variable |
| Comparison highlight | `color-mix(in srgb, #ffd700, #fff 60%)` | TRX Concept column in comparison table — gold at 40% on white |

---

## Typography

### Typefaces

| Role | Family | Source |
|---|---|---|
| Body / UI | `Montserrat` 400, 500, 700 | Google Fonts |
| Logo wordmark | `Impact` | cdnfonts.com |
| Fallback | `"Helvetica Neue", Arial, sans-serif` | System |

### Scale

| Token | Value | Maps to |
|---|---|---|
| `--fs-h1` | `clamp(2rem, 4vw, 2.75rem)` | `h1` |
| `--fs-h2` | `clamp(1.6rem, 3vw, 2rem)` | `h2` |
| `--fs-h3` | `1.25rem` | `h3` |
| `--fs-body` | `1rem` | `p` |
| `--fs-small` | `0.9rem` | `small`, `.hero-note`, `.pricing-note` |

Hero `h1` overrides the scale to a fixed `2.5rem`. Hero `p` is `1.25rem`.

Line height: `1.6` (body), `1.75` (testimonial quotes).

### Logo

`.logo` uses Impact at `3rem` (desktop) / `2.2rem` (≤768px) / hidden (≤576px). Uppercase, `letter-spacing: 0.1rem`.

---

## Spacing

| Token | Value | Usage |
|---|---|---|
| `--space-section` | `clamp(2rem, 5vw, 4rem)` | Default `padding-block` on all `<section>` elements |
| Hero padding | `4rem 1.5rem` | Fixed, not fluid |
| Trust section | `2rem 1.5rem` | Fixed |
| Comparison / Pricing | `3rem 1.5rem` | Fixed |
| Footer | `2rem 1.5rem` | Fixed |

Some sections override `--space-section` via Bootstrap utilities (`py-5`, `pt-5`, etc.).

---

## Buttons

All buttons share a base `.btn` class (pill shape, `border-radius: 999px`, Montserrat 600, `padding: 0.75rem 1.5rem`). Transition on `background-color`, `transform`, and `box-shadow` at `0.18s ease`.

### Variants

**`.btn-trx`** — Primary CTA
- Background: `#ffd700`
- Text: `#000`
- Hover/Active: background darkens 10% via `color-mix`, lifts `translateY(-1px)`, shadow `0 6px 18px rgba(0,0,0,0.18)`
- Has inline WhatsApp icon (`.wa-icon`) via `inline-flex`

**`.btn-whatsapp`** — Header nav CTA
- Background: `#000`
- Text: `#fff`
- Hover/Active: background `#111`, same lift and shadow
- Has inline WhatsApp icon

**`.btn-invert`** — Footer CTA
- Identical styling to `.btn-whatsapp` but used outside the header context

**`.btn-float-wa`** — Floating WhatsApp FAB
- Fixed position: `bottom: 1.5rem`, `right: 1.5rem`
- Circle `3.5rem × 3.5rem`, `border-radius: 50%`
- Background: `#25d366` (WhatsApp green)
- Icon: white SVG, `1.75rem`
- Hover: lifts `translateY(-2px)`, shadow deepens
- `z-index: 999`

### Focus
All `.btn` elements show `outline: 2px solid currentColor` with `outline-offset: 2px` on `:focus-visible`.

### Active state (Bootstrap override)
Bootstrap 5's default `--bs-btn-active-bg` is `transparent`. Overridden per variant:
- `.btn-trx`: `--bs-btn-active-bg: color-mix(in srgb, #ffd700, #000 10%)`
- `.btn-whatsapp`, `.btn-invert`: `--bs-btn-active-bg: #111`

---

## WhatsApp Icon

Inline SVG `<symbol>` defined once in `<body>`, referenced via `<use href="#wa-symbol"/>`. `viewBox="0 0 448 448"`.

```html
<!-- Symbol definition (hidden, top of body) -->
<svg style="display:none" aria-hidden="true">
  <symbol id="wa-symbol" viewBox="0 0 448 448">
    <path d="..."/>
  </symbol>
</svg>

<!-- Usage in a button -->
<svg class="wa-icon" aria-hidden="true" focusable="false">
  <use href="#wa-symbol"/>
</svg>
```

`.wa-icon` sizing: `20px` default, `16px` in header. `fill: currentColor` — inherits button text color. Exception: `.hero .btn-trx .wa-icon` explicitly sets `fill: #000` because `.hero * { color: #fff }` would otherwise override it.

---

## Layout & Grid

Max container width: `--container-max: 1200px` (Bootstrap `.container` class used throughout).

Page is a single vertical stack of full-width sections. No multi-column page layout; columns exist only within sections.

**Breakpoints** (custom, not Bootstrap's):
- `< 992px`: nav collapses (hamburger on mobile), logo image shrinks to `4rem`, `main` padding-top becomes `6rem`
- `< 768px`: logo wordmark font shrinks to `2.2rem`; nav becomes hamburger drawer
- `< 576px`: logo wordmark hidden; logo image shrinks to `3.5rem`; comparison table font shrinks to `0.8em`, padding tightens to `0.3rem`

---

## Sections

### Header
Yellow (`#ffd700`) **fixed** bar (`position: fixed; top: 0; left: 0; right: 0`). Flex row: logo image + wordmark (Impact) + nav links + `.btn-whatsapp` CTA.

**Sizes:**
- Desktop (≥992px): logo image `5rem`, inner padding `1rem` → total height `~7rem`
- Tablet (<992px): logo image `4rem`, inner padding `1rem` → total height `~6rem`
- Mobile (<576px): logo image `3.5rem`, inner padding `1rem` → total height `~5.5rem`; wordmark hidden

**`.scrolled` state** (added at `scrollY > 70`, removed at `scrollY < 50` via rAF-gated scroll handler):
- `.header-inner` padding shrinks to `0.4rem` block
- `.brand img` shrinks to `3rem` (desktop) / `2.5rem` (mobile)
- Both animate with `0.25s ease` transitions

**`<main>` offset:** `padding-top: 7rem` (6rem at <992px) keeps content from hiding behind the fixed header. The padding area uses a CSS gold→white gradient (`linear-gradient(var(--color-primary) 7rem, var(--color-white) 7rem)`) to prevent a white flash when the header expands back to full size on scroll-up.

### Hero
Full-bleed image (`hero.webp`) with `rgba(0,0,0,0.4)` overlay. All child text is white with `text-shadow: 0 2px 4px rgba(0,0,0,0.6)`. H1 + 2 subhead paragraphs + `.btn-trx` CTA + `.hero-note` fine print. Text centered, `padding: 4rem 1.5rem`.

### Trust Anchor
White background, centered. Circular profile photo (`140px`, `border-radius: 50%`, `box-shadow: 0 4px 12px rgba(0,0,0,0.2)`), trainer name as `h3`, 2 credential lines in `--color-gray-dark`.

### Benefits
Gray (`#f5f5f5`) background. Three-column flex grid (`.benefits-grid`), each card `flex: 1 1 250px`, `max-width: 300px`. H3 title + supporting paragraph in `--color-gray-dark`. Wraps to 1 column on mobile naturally.

### Mid-Page CTA
No background (inherits white). `text-center py-5 mt-5` (Bootstrap utilities). Single `.btn-trx` centered. The `mt-5` compensates for the benefits section's gray bottom padding being visually absorbed, making spacing symmetric with the testimonials section above.

### Testimonials
White background, `max-width: 900px`, centered. Bootstrap 3-column grid (`col-md-4`). Each column: circular photo (`120px`) + `<blockquote>` with gold opening quote mark (`::before`, `font-size: 3rem`, `opacity: 0.6`) + italic text in `--color-gray-dark` + bold author attribution.

### Comparison Table
White background, centered, `max-width: 900px`. 4 columns (feature + 3 options). Header row in `--color-gray` (`#ededed`). **TRX Concept column (last)** highlighted with `color-mix(in srgb, #ffd700, #fff 60%)` background and `font-weight: 700`. Row headers use `<th scope="row">`. Mobile: font shrinks to `0.8em`, padding tightens.

### Pricing
Gray (`#f5f5f5`) background. Centered text. H2 + price lines in `--color-gray-dark` + `.pricing-note` in `--color-gray-note` + `.btn-trx` CTA.

### Footer
Yellow (`#ffd700`) background. H2 + `.btn-invert` CTA + copyright + agency credit in small dotted-underline link. Copyright year auto-updates via `new Date().getFullYear()`.

### Floating FAB
`.btn-float-wa` fixed at bottom-right. Always visible. WhatsApp green circle with white icon.

---

## Imagery

All images are WebP format. Circular photos use `aspect-ratio: 1/1`, `object-fit: cover`, `border-radius: 50%`. Testimonial images use `loading="lazy"`.

| File | Usage |
|---|---|
| `logo.webp` | Header logo image |
| `hero.webp` | Hero section background (cover, centered) |
| `nico.webp` | Trust anchor profile photo |
| `og-image.webp` | Open Graph / Twitter Card preview |
| `testimonio-valentinarosenthal.webp` | Testimonial 1 |
| `testimonio-marisagracia.webp` | Testimonial 2 |
| `testimonio-mariaignacia.webp` | Testimonial 3 |

---

## Tone & Copy Conventions

- Language: Spanish (Chile)
- Voice: Direct, motivational, low-friction ("sin excusas", "a tu ritmo")
- Primary conversion action: WhatsApp message to `+56 9 8440 2664`
- Trust signals used: certification credentials, years of experience, real client testimonials with photos, response-time guarantee ("4 horas o menos")
- CTA copy: "¡Reserva tu clase gratis!" (primary), "Escríbeme por WhatsApp" (secondary/footer)
