# Developer Reference

Detailed implementation notes that don't fit `docs/spec.md`'s architecture-level view. Use this as a cookbook when making common changes. All facts here are grounded in the current codebase (2026-07 redesign baseline) — verify against the actual files if this drifts.

## CSS tokens (`public/assets/css/style.css`)

Custom properties defined on `:root`:

| Token                                                          | Value                                               | Use                                             |
| -------------------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------- |
| `--color-black`                                                | `#000`                                              | Primary text, dark surfaces                     |
| `--color-white`                                                | `#fff`                                              | Light surfaces                                  |
| `--color-gray-light`                                           | `#f5f5f5`                                           | Alt section background, cards                   |
| `--color-gray`                                                 | `#ededed`                                           | Borders                                         |
| `--color-gray-dark`                                            | `#444`                                              | Secondary text                                  |
| `--color-gray-note`                                            | `#555`                                              | Small print, notes                              |
| `--color-primary`                                              | `#ffd700`                                           | Brand yellow — CTAs, accents, header background |
| `--font-base`                                                  | `"Montserrat", "Helvetica Neue", Arial, sans-serif` | Body copy                                       |
| `--font-logo`                                                  | `"Anton", "Impact", "Arial Black", sans-serif`      | Headings, logo, prices                          |
| `--container-max`                                              | `1200px`                                            | Max content width                               |
| `--heading-max-ch`                                             | `25ch`                                              | Caps H1 line length for readability             |
| `--fs-h1` / `--fs-h2` / `--fs-h3` / `--fs-body` / `--fs-small` | fluid `clamp()` or fixed rem                        | Type scale                                      |
| `--space-section`                                              | `clamp(2rem, 5vw, 4rem)`                            | Default vertical section padding                |

There is no design-token build step — these are plain CSS custom properties, edit them directly in `style.css`.

## Editing checklist for common tasks

**Change a price or plan detail** — edit in three places that must stay in sync:

1. `src/data/pages.ts` → `services.structuredData.hasOfferCatalog.itemListElement` (JSON-LD `Offer` price/description).
2. `src/data/pages.ts` → `faq.structuredData` and the matching visible `<details>` block (the "¿Cuánto cuestan las clases de TRX?" question, both the schema copy and the rendered FAQ HTML must match).
3. `src/components/HomeContent.astro` → the `#pricing` section's three `.pricing-card` blocks.

**Add a new FAQ question** — add both:

1. A new entry in `pages.faq.structuredData.mainEntity` (schema.org `Question`/`Answer`).
2. A matching `<details class="faq-item" id="...">` block in `pages.faq.content` with the same question/answer text (schema and visible copy must match verbatim — search engines and users should see the same answer).

If the question is generic enough to belong on the homepage's condensed FAQ, also add a short version to `HomeContent.astro`'s `#faq-home` section (keep it to the ~4 most decision-critical questions; the full list lives only on `/preguntas-frecuentes/`).

**Add a new WhatsApp CTA** — always set both `data-wa` and a specific `data-wa-msg` (see "WhatsApp link mechanism" in `AGENTS.md`/`spec.md`), and always give the anchor the real base `href="https://wa.me/56984402664"` (never `href="#"`) so the CTA still works without JS. Don't rely on the generic message fallback for a primary CTA; the whole point of `data-wa-msg` is that every button says what happens next.

**Add a new page** — add a new key to `src/data/pages.ts` (typed as `SitePage`), add a `src/pages/<slug>/index.astro` that imports `BaseLayout` and either renders `<Fragment set:html={page.content} />` (simple content pages) or a dedicated component (if the page needs interactivity or complex layout, following the `HomeContent.astro`/`AboutContent.astro` pattern). Then:

- Add a nav entry in `site.ts` if it should appear in the header, or a footer/legal link if not.
- Add a `breadcrumb` array and matching `structuredData` if the page should carry schema.
- Add the route to `.lighthouserc.cjs`'s `url` array if it's a primary page worth auditing.
- Add a cache-control block to `public/_headers` for the new path.
- If the page shouldn't be indexed (like the cookies page), exclude it in the `sitemap()` filter in `astro.config.mjs` and set `robots: "noindex"` on the page object.

**Change the discovery-flow answer options or message template** — the option **values** and their Spanish phrasing live in two places that must stay in sync:

1. `src/components/DiscoveryFlow.astro` — the actual `<input>`/`<option>` `value` attributes the visitor interacts with.
2. `public/assets/js/main.js` — the `OBJETIVO` and `MOLESTIA` lookup objects that map those same `value`s to the phrase inserted into the generated WhatsApp message.

If you add a new radio value in the markup without adding a matching key in the JS lookup, the generated message will silently fall back to a generic phrase for that answer — always update both files together.

## Image pipeline

- Imported images (`src/assets/images/*.webp`) go through `astro:assets`. `HomeContent.astro`/`AboutContent.astro` use the `<Picture>` component with explicit `formats={["avif", "webp"]}`, a `widths` array, and a `sizes` attribute — always set `alt` to real descriptive text (empty `alt=""` only for genuinely decorative images, and even then prefer omitting `aria-hidden` complexity unless needed; the SEO-graph `validateImageAlt` check will flag `<img>` tags with no `alt` attribute at all).
- `src/pages/index.astro` additionally pre-generates AVIF variants of the hero image via `getImage()` to build a `<link rel="preload">` with a matching `imagesrcset`/`imagesizes` — this must stay in sync with the `widths`/`quality` used by the `<Picture>` call inside `HomeContent.astro`'s hero, or the preload will fetch a size the browser doesn't end up using.
- Font preloads in `BaseLayout.astro` are deliberately limited to `anton-latin`, `montserrat-latin-400` and `montserrat-latin-700`. `anton-latin-ext` is **not** preloaded: the Chilean-Spanish copy only needs the latin subset, and preloading the ext file competed with the hero image and pushed home LCP from ~1.7 s to ~2.0 s (Lighthouse performance 99 instead of 100). Don't re-add it.
- `public/assets/img/*.avif`/`*.webp` are pre-generated static variants at fixed widths (not touched by Astro's build), used by the inline HTML content strings in `pages.ts` (services/FAQ/cookies/404) since those aren't Astro components and can't call `<Picture>`. If you need a new responsive image inside one of those HTML strings, generate the variants ahead of time and reference them by static path, following the existing `<picture><source type="image/avif" srcset="..."><source type="image/webp" srcset="..."><img ...></picture>` pattern already used there.

## WhatsApp number and message construction

- The number is hardcoded in two places that must stay in sync: `src/data/site.ts` (`whatsappHref`, used as the default/fallback target) and `public/assets/js/main.js` (`WA_NUMBER`, used for every `data-wa` rewrite). If the business phone number ever changes, update both.
- Message text must be URL-encoded. In `main.js`, `encodeURIComponent` handles this automatically for `data-wa-msg` values — always write the Spanish message as plain readable text in the `data-wa-msg` attribute; don't pre-encode it yourself.

## Analytics/consent implementation notes

- `data-ga4-id` and `data-consent-cookie` are set as attributes on the `<html>` element in `BaseLayout.astro`, read by `cookie-consent.js` via `document.documentElement.dataset`. If you ever move GA4 config out of `site.ts`, keep this attribute-based handoff — the script has no other way to learn the ID.
- GA4 is loaded via `gtag.js` directly (`https://www.googletagmanager.com/gtag/js?id=<GA4_ID>`) — this is **not** a GTM container despite the googletagmanager.com domain; there is no GTM container ID anywhere in this project. Don't add `dataLayer.push` calls expecting a GTM container to pick them up unless you deliberately introduce one (and update `public/_headers`' CSP + `AGENTS.md` accordingly).

## Schema/SEO graph notes

- `src/utils/schema.ts`'s `buildSchemaGraph()` always emits, in order: `WebSite` (with a `SearchAction`), `Organization`, `WebPage`, and (if a `breadcrumb` was provided) `BreadcrumbList`. `BaseLayout.astro` then merges each page's own `structuredData` (e.g. `LocalBusiness`, `Service`, `FAQPage`) into that graph's `@graph` array — either by spreading an existing `@graph` array or appending the single node with its own `@context` stripped.
- `src/pages/schema/pages.json.ts` reconstructs the same graph server-side for every entry in `pages` (via `@jdevalk/astro-seo-graph`'s `createSchemaEndpoint`) — if you add a new page to `src/data/pages.ts`, it's automatically picked up here with no extra wiring, as long as it's exported from the `pages` object.

## Local verification tips

- After editing `public/assets/css/style.css`, run `npm run sync:css` (or just `npm run check`/`npm run build`, which call it) before trusting what renders locally in `astro dev` — `astro dev` does not re-run the sync script on file save.
- Before running `npm run test:playwright:smoke` locally, make sure no stale `astro preview` process is bound to the configured port (`playwright.config.ts` defaults to `127.0.0.1:4325`); Playwright's `reuseExistingServer: !process.env.CI` will happily reuse a stale server and produce misleading failures.
- `npm run capture:home` / `capture:servicios` / `capture:sobre-mi` are Playwright `--grep` filters tagged `@home`/`@servicios`/`@sobre-mi` inside `capture.spec.ts` — use them for fast visual spot-checks instead of the full `capture:local` run.
