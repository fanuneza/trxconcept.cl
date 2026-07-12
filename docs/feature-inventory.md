# Feature Inventory

A literal inventory of every route, section, component, client-side behavior, and non-page capability that currently exists in the codebase. This is a "what exists" list, not a "why" document — see `docs/spec.md` for architecture rationale and `docs/prd.md` for requirements framing.

## 1. Routes

| Route                    | Source file                                  | Renders via                                                           | Notes                                                                                               |
| ------------------------ | -------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `/`                      | `src/pages/index.astro`                      | `HomeContent.astro`                                                   | `pages.home`; preloads hero image variants; `isHome: true`                                          |
| `/servicios/`            | `src/pages/servicios/index.astro`            | `pages.services.content` (`set:html`)                                 | Pricing + service info; has `structuredData` (Service + OfferCatalog)                               |
| `/sobre-mi/`             | `src/pages/sobre-mi/index.astro`             | `AboutContent.astro`                                                  | Trainer bio/certifications                                                                          |
| `/preguntas-frecuentes/` | `src/pages/preguntas-frecuentes/index.astro` | `pages.faq.content` (`set:html`)                                      | Full FAQ list; has FAQPage `structuredData`                                                         |
| `/politica-de-cookies/`  | `src/pages/politica-de-cookies/index.astro`  | `pages.cookies.content` (`set:html`)                                  | `robots: "noindex"`; excluded from sitemap                                                          |
| `/404`                   | `src/pages/404.astro`                        | inline JSX in the route file (own `page` object, not from `pages.ts`) | `robots: "noindex"`; includes `<FuzzyRedirect />` from the SEO-graph package; excluded from sitemap |

## 2. Homepage sections (in DOM order, all in `HomeContent.astro` unless noted)

1. **Hero** (`#hero`) — headline, lead paragraph, trust chips (certified/10+ years/free eval/4h response/coverage area), primary WhatsApp CTA + anchor link to `#descubre`.
2. **Cómo empezamos** (`#como-empezamos`, `.process`) — 4-step numbered process list (write on WhatsApp → discuss goal/schedule/injuries → free assessment → define a plan if it fits).
3. **Discovery flow** (`#descubre`) — rendered via `<DiscoveryFlow />` component; see §4.
4. **Para quién / Fit** (`#para-quien`, `.fit`) — 6-card grid of audience fits + a callout on when to see a health professional first.
5. **Cómo cuido tu seguridad / Method** (`#seguridad`, `.method`) — 5-item list of safety/method principles, ending in the medical-boundary statement ("entrenamiento con criterio, no tratamiento médico").
6. **Cómo funciona el servicio / Service model** (`#como-funciona`) — 6-item plain list of service mechanics (location, 1-on-1 only, coverage, no fixed monthly gym fee, flexible schedule from 6 AM).
7. **Pricing** (`#pricing`) — 3-card pricing grid: free assessment, monthly plan (featured/"Más elegido"), single session; each card has its own WhatsApp CTA with a distinct `data-wa-msg`.
8. **Testimonios / Social proof** (`#testimonios`) — 3 testimonial cards (Valentina Rosenthal, Marisa Gracia, María Ignacia Williamson), each with photo, 5-star label, quote, author; link to Instagram below.
9. **Entrenador / Trainer** (`#entrenador`) — photo + bio summary, "en qué me fijo" list, link to `/sobre-mi/`.
10. **FAQ (condensed)** (`#faq-home`) — 4 abbreviated FAQ `<details>` items + link to the full `/preguntas-frecuentes/` page.

## 3. Reusable components (`src/components/`)

| Component             | Responsibility                                                                                                                                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Header.astro`        | Site nav from `site.nav`, logo, primary WhatsApp CTA, mobile nav toggle button (behavior in `main.js`); marks current nav item via `aria-current`                                                                  |
| `Footer.astro`        | Floating round WhatsApp button (`.btn-float-wa`, hidden <680px), CTA band, copyright with JS-filled year, site-credit line, legal links (`site.legal`), Instagram link, "Gestionar preferencias de cookies" button |
| `HomeContent.astro`   | All homepage sections (see §2); only place `DiscoveryFlow` is mounted                                                                                                                                              |
| `AboutContent.astro`  | Sobre mí page body (bio, certifications list, "why a certified coach" section, philosophy)                                                                                                                         |
| `DiscoveryFlow.astro` | 3-step qualifier form markup (see §4)                                                                                                                                                                              |
| `MobileCtaBar.astro`  | Fixed bottom bar, visible only <680px: primary WhatsApp button + link to `#descubre`                                                                                                                               |
| `CookieBanner.astro`  | Consent banner markup (Accept/Reject buttons, link to cookie policy); visibility driven by `cookie-consent.js`                                                                                                     |
| `WaSymbol.astro`      | Inline SVG `<symbol>` sprite definition for the WhatsApp icon, referenced via `<use href="#wa-symbol">` throughout                                                                                                 |

## 4. Discovery flow — literal structure

- Container: `<section id="descubre">` → `.discovery-card[data-discovery]` → progress bar (`[data-discovery-bar]`) → `<form data-discovery-form>`.
- Step 1 (`data-step="1"`): radio group `objetivo` — 4 options.
- Step 2 (`data-step="2"`): radio group `molestia` — 5 options, with a hint line stating the medical-boundary language.
- Step 3 (`data-step="3"`): `<select name="comuna">` (10 options) + radio group `horario` — 3 options.
- Result block (`[data-discovery-result]`, initially `hidden`): heading, copy, WhatsApp CTA (`[data-discovery-link]`), "Volver a empezar" restart button.
- Nav controls (`.discovery-nav`, initially `hidden`): Back button (`[data-discovery-back]`, hidden on step 1), Next button (`[data-discovery-next]`, relabeled "Ver mi resultado" on the last step).
- Permanent fallback: `.discovery-fallback` plain WhatsApp link, always rendered regardless of JS state.
- Full option-value lists and message-building logic are documented in `docs/content-model.md`.

## 5. Client-side JS behaviors (`public/assets/js/`)

| Behavior                     | File                | Trigger / mechanism                                                                                                                                                                                           |
| ---------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Copyright year fill          | `main.js`           | Sets `#yr` textContent to current year on load                                                                                                                                                                |
| Mobile nav toggle            | `main.js`           | Click on `.nav-toggle-btn` toggles `aria-expanded` + `.nav-open` on `#nav-main`; outside-click closes it; Escape closes it and returns focus to the toggle button                                             |
| WhatsApp href rewriting      | `main.js`           | Rewrites every `[data-wa]` element's `href` using `data-wa-msg` (or `WA_DEFAULT`) + hardcoded number `56984402664`                                                                                            |
| Scrolled header state        | `main.js`           | Scroll listener with rAF gate + hysteresis (add `.scrolled` at scrollY > 70, remove at < 50) on `.site-header`                                                                                                |
| Discovery flow state machine | `main.js`           | Step show/hide, progress bar fill, per-step validation (`.has-error`), auto-clear on radio change, final message build + result reveal, restart handler (see `docs/spec.md` §4)                               |
| Cookie consent + GA4 loader  | `cookie-consent.js` | Reads `site_consent` cookie; shows/hides banner; on Accept, injects `gtag.js` + preconnect and initializes `dataLayer`/`gtag`; on Reject, hides banner only; "Gestionar preferencias" clears cookie + reloads |

## 6. Non-page capabilities / endpoints

| Capability                              | File                                                   | Notes                                                                                                                              |
| --------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| XML sitemap                             | `@astrojs/sitemap` integration (`astro.config.mjs`)    | Excludes `404.html` and `/politica-de-cookies/`                                                                                    |
| `robots.txt`                            | `astro-robots-txt` integration                         | Default config                                                                                                                     |
| JSON-LD schema graph (per-page, inline) | `src/utils/schema.ts` + `BaseLayout.astro`             | Organization + WebPage + BreadcrumbList, merged with page `structuredData`; `WebSite` is homepage-only via `index.astro` head slot |
| Standalone schema endpoint              | `src/pages/schema/pages.json.ts`                       | Serves the same merged graph for every page in `pages.ts`, as JSON, via `createSchemaEndpoint`                                     |
| Schema map (AI/agent discovery)         | `src/pages/schemamap.xml.ts`                           | `createSchemaMap`, points at `/schema/pages.json`                                                                                  |
| API catalog (`.well-known`)             | `src/pages/.well-known/api-catalog.ts`                 | `createApiCatalog`, references `/schema/pages.json` and `/schemamap.xml`, service doc `/servicios/`                                |
| IndexNow key route                      | `src/pages/591c2b87f0b68c44f260215f5d8e9da3.txt.ts`    | `createIndexNowKeyRoute`; always enabled, filename is the key                                                                      |
| Cookie policy page                      | `/politica-de-cookies/`                                | Documents `site_consent` and `_ga`/`_ga_*` cookies, consent mechanics, Ley 19.628 basis                                            |
| Security/cache headers                  | `public/_headers`                                      | Cloudflare Pages HSTS/CSP/frame/referrer/permissions policies + per-route cache-control                                            |
| CSS inlining                            | `BaseLayout.astro` (`readFileSync` of `style.min.css`) | No external stylesheet request at runtime                                                                                          |
| Analytics                               | GA4 via `gtag.js`, ID `site.ga4Id`                     | Loaded only post-consent; no GTM container                                                                                         |

## 7. Testing capabilities

| Layer                   | File                                | Scope                                                                       |
| ----------------------- | ----------------------------------- | --------------------------------------------------------------------------- |
| Accessibility           | `tests/visual/a11y.spec.ts`         | axe-core scan, 6 pages, WCAG 2.1 AA (3 rules disabled)                      |
| Visual capture (manual) | `tests/visual/capture.spec.ts`      | Screenshots, 5 pages × 4 viewports, not a CI gate                           |
| Smoke                   | `tests/visual/smoke.spec.ts`        | HTTP 200 + body/main visibility, 5 pages; runs post-deploy, not in `ci.yml` |
| Lighthouse              | `.lighthouserc.cjs` via `@lhci/cli` | Performance/a11y/best-practices/SEO, warn-only thresholds                   |
