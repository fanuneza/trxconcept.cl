# Technical Spec

How TRX Concept (trxconcept.cl) is built and why. This is the architecture-level reference; deep implementation cookbook details (CSS tokens, exact image pipeline steps, editing recipes) live in `docs/developer-reference.md`.

## 1. Stack and rendering model

- Astro 7, `output: "static"`, `trailingSlash: "always"` (`astro.config.mjs`). Every route resolves with a trailing slash except the two intentionally-`.html`-shaped exceptions used in sitemap filtering (`404.html`).
- No content collections, no `src/content/`, no CMS, no database. All page copy and metadata for `servicios`, `preguntas-frecuentes`, `politica-de-cookies`, and `404` live as HTML strings inside `src/data/pages.ts` (typed by `SitePage`), rendered with `<Fragment set:html={page.content} />` from each route file (e.g. `src/pages/servicios/index.astro`).
- Home (`src/pages/index.astro`) and Sobre mí (`src/pages/sobre-mi/index.astro`) are the two exceptions: they render through dedicated components (`HomeContent.astro`, `AboutContent.astro`) instead of an HTML string. `pages.home.content` is deliberately an empty string — it exists only to satisfy the `SitePage` type, and is never read.
- `build.inlineStylesheets: "always"` in `astro.config.mjs` is a separate mechanism from the manual CSS inlining described below — it applies to Astro component-scoped `<style>` blocks. This project has none (all styling is global, hand-written CSS), so this setting is currently a no-op safety net rather than something actively exercised.
- Routes: `/`, `/servicios/`, `/sobre-mi/`, `/preguntas-frecuentes/`, `/politica-de-cookies/`, `/404` (custom 404, not clean-URL'd), plus non-HTML endpoints under `src/pages/` (see §5).

## 2. CSS pipeline

- `public/assets/css/style.css` is the single hand-written source of truth for all styling. No Tailwind, no CSS-in-JS, no framework.
- `scripts/sync-css.mjs` is a from-scratch, dependency-free "minifier": it strips `/* ... */` comments with a regex, collapses whitespace, and tightens `{ } : ; ,` spacing. It is not a real minifier library (no PostCSS/cssnano) — it is intentionally naive.
- The script writes `public/assets/css/style.min.css`, which is committed-derived (it must be regenerated, not hand-edited).
- `npm run check` and `npm run build` both run `sync:css` first, so `style.min.css` is always regenerated before type-checking or building. Running only `astro dev` does **not** regenerate it — the file can go stale relative to `style.css` during local dev.
- `BaseLayout.astro` reads `style.min.css` off disk at build time via Node's `readFileSync(join(process.cwd(), "public/assets/css/style.min.css"), "utf-8")` and inlines its contents directly into the document with `<style is:inline set:html={siteCss}>`. This means the site ships zero external stylesheet requests — all CSS is inline in every HTML response.
- Consequence: editing `style.min.css` directly is a silent no-op the next time anyone runs `sync:css`/`check`/`build` — always edit `style.css`.

## 3. WhatsApp CTA mechanism

- WhatsApp is the primary conversion channel everywhere on the site. There is no contact form, no booking backend, no email capture.
- Every WhatsApp anchor in markup carries a bare `data-wa` attribute and a real `href="https://wa.me/56984402664"` base value (never `"#"`), so every CTA still opens WhatsApp for no-JS visitors; JS only adds the prefilled message.
- On page load, `public/assets/js/main.js` selects all `[data-wa]` elements and rewrites each `href` to `https://wa.me/56984402664?text=<encoded message>`.
- The message text is read from that specific element's own `data-wa-msg` attribute. If absent, it falls back to a generic constant, `WA_DEFAULT`, defined once in `main.js`.
- This is the entire mechanism that lets dozens of different CTAs across the site ("Agendar evaluación gratis", "Consultar el plan", "Consultar por WhatsApp", etc.) each open WhatsApp with a message specific to that CTA's context, without any server or JS framework — it's a single querySelectorAll + attribute rewrite.
- The WhatsApp number (`56984402664`) is hardcoded once in `main.js` (`WA_NUMBER`) and appears again as literal `https://wa.me/56984402664` fallback hrefs in markup (`site.ts`'s `whatsappHref`, and various component fallback hrefs) — these are pre-JS/no-JS safe defaults, not duplicated logic.

## 4. Discovery flow (secondary conversion path)

- Markup lives in `src/components/DiscoveryFlow.astro`: a `<form data-discovery-form>` inside a `<div data-discovery>` container, containing three `<fieldset class="discovery-step" data-step="N">` blocks (objetivo radios → molestia radios → comuna `<select>` + horario radios), followed by a hidden `<div data-discovery-result hidden>` block, and a permanent plain-WhatsApp fallback link (`.discovery-fallback`) that renders outside the stepper and works with zero JS.
- Progressive enhancement, implemented entirely in `main.js`:
  - Without JS: all three `<fieldset>` steps render stacked and are all usable/visible; the fallback link below still converts. No `is-enhanced` class is added, so no CSS hides any step.
  - With JS: `main.js` finds `[data-discovery]`, adds `discovery.classList.add("is-enhanced")` (this class switch is what CSS keys off of to show only the `.is-active` step and hide the rest), reveals the Next/Back nav (`.discovery-nav`, initially `hidden`), and drives a small state machine:
    - `showStep(index, moveFocus)` toggles `.is-active` on the current fieldset, updates the progress bar width via `data-discovery-bar`, shows/hides the Back button, and relabels Next → "Ver mi resultado" on the last step. Focus moves to the step's `<legend>` only when `moveFocus` is true (user-initiated Next/Back/Restart) — the initial `showStep(0, false)` render must never focus, or the page scroll-jumps past the hero on load.
    - Per-step validation: clicking Next checks **every named control group** in the step (`unansweredName()`), so step 3 requires the horario radios even though its comuna `<select>` always has an implicit value. A missing answer adds `.has-error` to the step (drives the `.discovery-error` message shown by CSS) and focuses the first control of the unanswered group; answering a radio clears `.has-error` via a `change` listener.
    - On the final step's Next click, `finish()` builds the WhatsApp message client-side from two lookup objects, `OBJETIVO` (keyed by the `objetivo` radio value) and `MOLESTIA` (keyed by the `molestia` radio value), plus the raw `comuna`/`horario` values, concatenated into one Spanish sentence. It sets this string on the result CTA both as `href` (via the same `waHref()` helper used by the generic WhatsApp rewriter) and as `data-wa-msg` (for consistency with the rest of the rewriting mechanism), then hides the stepper nav and reveals `.discovery-result`, moving focus to its heading.
    - A "Volver a empezar" button resets the native `<form>` and restarts at step 0.
- Exact answer-value sets and the message template are documented in `docs/content-model.md` (source of truth: `DiscoveryFlow.astro` markup + `main.js` lookup tables) and rationale for the flow is in `docs/conversion-strategy.md`.

## 5. SEO and structured data

- SEO integration: `@jdevalk/astro-seo-graph` (`astro.config.mjs`), rendered per-page via the `<Seo>` component in `BaseLayout.astro`.
- `astro.config.mjs` enables `validateH1`, `validateUniqueMetadata`, `validateImageAlt`, `validateMetadataLength`, and `validateInternalLinks` (with a `skip` allowlist for `/api/`, `/feed.xml`, `/sitemap*.xml`, `/schemamap.xml`, `/schema/`) — these run as build-time warnings during `astro build`, not hard failures.
- `markdownAlternate: true` is enabled; the plugin strips `.md` alternate `<link>` tags for routes where no Markdown output exists, producing benign "stripped link" warnings for existing pages.
- IndexNow is always on (not gated by env var), keyed via a dedicated route file at `src/pages/591c2b87f0b68c44f260215f5d8e9da3.txt.ts` (`createIndexNowKeyRoute`) whose filename **is** the IndexNow key.
- JSON-LD: `src/utils/schema.ts` exports `buildSchemaGraph()`, which uses `@jdevalk/seo-graph-core` helpers (`buildWebPage`, `buildPiece`, `makeIds`) to construct a shared `@graph` containing:
  1. `Organization` (id `trx-concept`, with logo)
  2. `WebPage` for the current URL/title/description
  3. `BreadcrumbList`, only if the page supplies a `breadcrumb`
- The `WebSite` entity (used by Google to determine the search-result site name) is declared explicitly on the homepage only, via a `<script type="application/ld+json">` injected through the `head` slot of `BaseLayout.astro` in `src/pages/index.astro`. It is intentionally absent from the global layout so it does not repeat on subpages.
- `BaseLayout.astro` calls `buildSchemaGraph()` per request, then merges in that page's own `structuredData` from `pages.ts` (either splicing an existing `@graph` array, or pushing the object itself, stripped of `@context`). This merged graph is passed into `<Seo graph={baseGraph} />`.
- The exact same merge logic (independently re-implemented, not shared as a function) lives in `src/pages/schema/pages.json.ts`, which exposes the graph for **every** page as a standalone JSON endpoint via `createSchemaEndpoint({ entries, mapper })`, iterating `Object.values(pages)`.
- `src/pages/schemamap.xml.ts` (`createSchemaMap`) and `src/pages/.well-known/api-catalog.ts` (`createApiCatalog`) are companion AI/agent-discovery endpoints from the same `@jdevalk/astro-seo-graph` package, both pointing back at `/schema/pages.json` as the one schema endpoint and `/servicios/` as the service doc.
- Sitemap (`@astrojs/sitemap`) excludes `404.html` and `/politica-de-cookies/` via a `filter` predicate in `astro.config.mjs`.
- `robots.txt` is generated by `astro-robots-txt` with default config (no custom rules seen in `astro.config.mjs` beyond the integration being present).

## 6. Analytics and consent

- GA4 is loaded directly via `gtag.js`, with no Google Tag Manager container anywhere in the project. The measurement ID (`site.ga4Id`, `"G-P1W5Z80Z88"`) is stamped onto `<html data-ga4-id={...} data-consent-cookie={...}>` in `BaseLayout.astro` so the plain-JS consent script can read it without a build-time import.
- `public/assets/js/cookie-consent.js` reads `document.documentElement.dataset.ga4Id` / `dataset.consentCookie`, checks the `site_consent` cookie (`"accepted"` / `"rejected"` / unset), and:
  - `"accepted"` → calls `loadGA4()` (injects `gtag.js` script tag, initializes `dataLayer`/`gtag`, preconnects to `googletagmanager.com`) and removes the banner.
  - `"rejected"` → removes the banner, does nothing else.
  - unset → leaves the banner in place (the banner is visible by default in the markup; the script only removes it once consent is recorded).
- Accept/Reject buttons (`#cookie-accept`, `#cookie-reject`) set the `site_consent` cookie with `max-age=31536000` (12 months), `SameSite=Lax`, `Secure`.
- The footer's "Gestionar preferencias de cookies" button (`#cookie-manage-btn`) clears the cookie (`max-age=0`) and calls `window.location.reload()`, which re-shows the banner on the next paint.
- Consent copy and cookie durations are documented user-facing in `pages.cookies.content` (the `/politica-de-cookies/` page), grounded in Chilean Ley 19.628.

## 7. Security headers and deployment

- `public/_headers` is the **only** Cloudflare Pages configuration file in the repo. It sets: HSTS (`max-age=31536000; includeSubDomains`), a strict CSP (`script-src 'self' https://www.googletagmanager.com https://static.cloudflareinsights.com`; `style-src 'self' 'unsafe-inline'` — required because CSS is inlined per-page; `connect-src` allowlists GA4/Cloudflare Insights endpoints), `X-Frame-Options: SAMEORIGIN`, a locked-down `Permissions-Policy`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Content-Type-Options: nosniff`, a scoped `Access-Control-Allow-Origin`, and a `No-Vary-Search` hint for common UTM/click-id params.
- Per-route `Cache-Control` rules: `/assets/*` gets `public, max-age=31536000, immutable` (fingerprint-free static assets are cached hard); every HTML route (`/`, `/servicios/`, `/sobre-mi/`, `/preguntas-frecuentes/`, `/politica-de-cookies/`, and the generic `/*.html` pattern) gets `public, max-age=3600, stale-while-revalidate=86400`.
- There is no `_redirects` file yet — a known gap. If a route is ever renamed/removed, one should be added rather than letting old links (WhatsApp/Instagram bio links to specific pages) 404.
- Deployment itself happens through Cloudflare Pages' Git integration, entirely outside this repository — there is no `wrangler.toml`, no deploy step in CI. `.github/workflows/deploy.yml` only runs Playwright's `smoke.spec.ts` against the live `deployment_status` URL after Cloudflare Pages reports a successful deploy; it does not perform or trigger the deploy.

## 8. Testing layers

- Playwright only; no Vitest/unit-test runner exists (there's no framework-free logic worth unit-testing yet, per `AGENTS.md`).
- `tests/visual/a11y.spec.ts`: axe-core (`@axe-core/playwright`) scans all 6 built pages (`/`, `/servicios/`, `/sobre-mi/`, `/preguntas-frecuentes/`, `/politica-de-cookies/`, `/404`) against `wcag2a`/`wcag2aa`/`wcag21aa` tags, with three rules permanently disabled (`color-contrast`, `label-content-name-mismatch`, `heading-order`) due to pre-existing design choices; violations still fail the test.
- `tests/visual/capture.spec.ts`: manual visual-QA tool, not a CI gate — takes full-page screenshots of 5 pages (no `/404`) at 4 viewports (1440, 1200, 810, 390) into `.cache/parity/`, tagged (`@home`, `@servicios`, etc.) for selective runs via `npm run capture:*`.
- `tests/visual/smoke.spec.ts`: checks 5 pages (no `/404`) return HTTP OK and that `body`/`main` are visible. Not part of `ci.yml`; runs in `deploy.yml` against the live production URL post-deploy, and can be run locally against `astro preview` — watch for a lingering `astro preview` process, since Playwright's `reuseExistingServer` will happily reuse a stale one and produce misleading failures.

## 9. CI/CD workflows (`.github/workflows/`)

- `ci.yml`: runs on every push/PR to `main` — format check, lint (ESLint + Stylelint), `astro check`, build, Lighthouse CI (warn-only thresholds via `@lhci/cli`), and the a11y Playwright suite.
- `deploy.yml`: triggered by Cloudflare Pages' `deployment_status` event; runs `smoke.spec.ts` against the live deployed URL. Does not deploy.
- `lychee.yml`: weekly-scheduled + manually-dispatchable broken-link checker over `README.md` and `src/**/*.astro`, `src/**/*.ts`.

## 10. Runtime pin

- Node `24.x`, enforced via `.nvmrc` and `package.json` `engines: ">=24 <25"`. Local/sandbox environments have built successfully on Node 22.x in practice, but CI (on 24.x) is authoritative — don't rely on 22.x compatibility persisting.
