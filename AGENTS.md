# Agent Guidance

This repository is the public Astro site for **TRX Concept**, Nicolás Echeverría's 1-on-1 personal training service (TRX method) in Santiago, Chile. It is a static site with no backend, no database, and no content collections — deployed via Cloudflare Pages' Git integration.

The site is a small, conversion-focused marketing site: 5 routes, all copy and structured data centralized in one TypeScript data file plus a handful of Astro components. Treat it as a content-and-conversion-driven site with strong SEO, accessibility, and Chilean-Spanish voice constraints — not as an application.

## Primary Goal

- Keep the site correct, fast, accessible, and easy for a non-developer to reason about.
- Preserve the brand voice defined in `docs/voice-and-tone.md` — calm, human, safety-aware, never generic "AI slop" fitness copy.
- Protect the conversion architecture: WhatsApp is the primary CTA everywhere, the 3-step discovery flow is the secondary path. See `docs/conversion-strategy.md`.
- Keep verification green: formatting, linting, `astro check`, build, and the Playwright/Lighthouse suites.

## Required Opening Moves

- Use jCodeMunch for code navigation when the repo is indexed. Prefer indexed discovery, outlines, symbol lookups, references, and blast-radius checks over blind searching.
- If the repo is not indexed, index it before broad code navigation work.
- Start every code session with:
  1. `resolve_repo { "path": "." }`
  2. `plan_turn { "repo": "...", "query": "your task", "model": "<your-model-id>" }`
- Use the Astro Docs MCP for framework questions (routing, `astro:assets`, integrations) — verify current APIs before changing anything that drifts across Astro versions.

## Project Snapshot

- Framework: Astro 7, `output: "static"`, `trailingSlash: "always"`.
- Hosting: Cloudflare Pages (Git-integration deploy; no wrangler config or `_redirects` file in this repo — `public/_headers` covers security/cache headers only).
- Package manager: npm with committed `package-lock.json`.
- Runtime: Node `24.x` via `.nvmrc` and `package.json` engines (`>=24 <25`). If your local/sandbox Node is older, builds still tend to work but CI is the source of truth.
- Images: `astro:assets` `<Picture>` with AVIF/WebP responsive variants.
- Styling: one plain CSS file — no CSS framework, no Tailwind, no CSS-in-JS.
- Analytics: GA4 loaded directly via `gtag.js` (no GTM container) after cookie consent. See "Analytics and Consent" below.
- SEO: `@astrojs/sitemap`, `astro-robots-txt`, and `@jdevalk/astro-seo-graph` (+ `@jdevalk/seo-graph-core`) for the `<Seo>` component, JSON-LD graph, H1/metadata/alt/internal-link validation, IndexNow, and Markdown alternates.
- Tests: Playwright only (`@axe-core/playwright` for a11y). No unit test runner (no Vitest) — there is no framework-free logic worth unit testing yet.
- Lighthouse: `@lhci/cli`, thresholds are `warn`-only (do not fail CI).

## Repo Layout

- `src/pages/`: public routes — `index.astro`, `servicios/`, `sobre-mi/`, `preguntas-frecuentes/`, `politica-de-cookies/`, `404.astro`, plus SEO-graph endpoints (`schema/pages.json.ts`, `schemamap.xml.ts`, `.well-known/api-catalog.ts`, the IndexNow key file).
- `src/layouts/BaseLayout.astro`: document shell — `<Seo>`, font preloads, inlined CSS, `Header`, `MobileCtaBar`, `Footer`, `CookieBanner`.
- `src/components/`: `Header.astro`, `Footer.astro`, `HomeContent.astro`, `AboutContent.astro`, `DiscoveryFlow.astro`, `MobileCtaBar.astro`, `CookieBanner.astro`, `WaSymbol.astro` (inline SVG sprite def).
- `src/data/site.ts`: site-wide config — name, nav, WhatsApp number/default message, Instagram.
- `src/data/pages.ts`: per-page metadata (`title`, `description`, `structuredData`, `breadcrumb`) **and**, for `servicios`, `preguntas-frecuentes`, `politica-de-cookies`, the page body as an HTML string rendered via `set:html` (`404.astro` defines its own page object inline). `pages.home.content` and `pages.about.content` are intentionally empty strings — Home renders through `HomeContent.astro` and `sobre-mi` through `AboutContent.astro`.
- `src/utils/schema.ts`: builds the shared JSON-LD `@graph` (WebSite, Organization, WebPage, BreadcrumbList) merged with each page's `structuredData`.
- `public/assets/css/style.css`: **the single source of truth for all styling.**
- `public/assets/js/main.js`: nav toggle, footer year, scrolled-header state, the WhatsApp href-rewriting mechanism, and the discovery-flow state machine.
- `public/assets/js/cookie-consent.js`: consent banner logic + GA4 loader.
- `docs/`: voice, conversion strategy, SEO plan, GSC insights, and (see Documentation Expectations) product/architecture reference docs.

## Architecture Essentials

### Rendering model — no content collections

There is no `src/content/` and no content-collection schema. All page copy and metadata live in `src/data/pages.ts` (typed as `SitePage`) or directly inside Astro components. When asked to change page copy, find it in `pages.ts` first; only fall back to a component (`HomeContent.astro`, `AboutContent.astro`, `DiscoveryFlow.astro`) if it's Home, Sobre mí, or the discovery flow.

### CSS pipeline — do not edit the `.min.css` file

- `public/assets/css/style.css` is hand-written and is the only file to edit.
- `scripts/sync-css.mjs` (run by both `npm run check` and `npm run build`) does a naive comment-strip + whitespace-collapse into `public/assets/css/style.min.css`.
- `BaseLayout.astro` reads `style.min.css` from disk at build time (`readFileSync`) and inlines it via `<style is:inline>`. Astro's own `build.inlineStylesheets: "always"` setting then also inlines Astro-scoped component styles — but this project intentionally has none; all styling stays in the one global file.
- If you edit CSS and only run `astro dev`, the minified file will be stale until you run `npm run sync:css`, `npm run check`, or `npm run build`.

### WhatsApp CTA mechanism

- Every WhatsApp anchor carries `data-wa` **and a real base `href="https://wa.me/56984402664"` (never `href="#"`)** so the CTA still works without JS. On load, `main.js` rewrites the `href` to `https://wa.me/56984402664?text=<encoded message>`.
- The message comes from that link's own `data-wa-msg` attribute; if absent, a generic default is used.
- This lets every CTA on the site say something specific ("what happens next") instead of sharing one generic message. When adding a new WhatsApp CTA, always set `data-wa-msg` to a message appropriate to that CTA's context.

### Discovery flow (secondary conversion path)

- Markup: `src/components/DiscoveryFlow.astro` — a 3-step `<fieldset>` stepper (goal → injury/beginner concern → comuna + schedule).
- Behavior: `main.js` progressively enhances it — without JS, all three steps render stacked (still usable) with a permanent plain-WhatsApp fallback link below the widget; with JS, only the active step shows, with a progress bar and a result screen.
- On completion it builds a message client-side from lookup tables (`OBJETIVO`, `MOLESTIA`) plus the chosen comuna/schedule and sets it as `data-wa-msg` on the result's WhatsApp link. See `docs/conversion-strategy.md` for the exact template and rationale.

### Mobile sticky bar vs. floating button

- `MobileCtaBar.astro` (rendered in `BaseLayout`) is a fixed bottom bar shown only below 680px width: primary WhatsApp button + a link to `#descubre` (the discovery flow).
- `Footer.astro` also renders a floating round WhatsApp button (`.btn-float-wa`) for desktop/tablet; CSS hides it at the same breakpoint where the sticky bar appears, so the two never show at once.

## Non-Negotiable Standards

- Never use absolute filesystem paths in repo files or docs. Use repo-relative paths.
- Preserve UTF-8 and Chilean Spanish accents everywhere — never introduce mojibake or broken accents.
- Do not hand-edit dependency versions in `package.json`; use npm commands.
- Do not invent prices, credentials, testimonials, review counts, comunas served, or medical claims. If information is missing, leave a TODO or ask rather than fabricate — see `docs/voice-and-tone.md` §9.
- Avoid ad hoc client JS frameworks or state libraries. The site's only client script is plain, dependency-free JS in `public/assets/js/`; keep it that way.

## Content and Voice

- `docs/voice-and-tone.md` is the source of truth for rhythm, phrasing, tone, and CTA style. Read it before writing or editing any user-facing copy.
- `docs/conversion-strategy.md` governs where and how CTAs appear.
- `docs/seo-content-plan.md` and `docs/search-console-insights.md` ground title/meta/heading decisions in real query data — do not invent keyword strategy from generic fitness-SEO assumptions. Notably: generic "entrenador personal" terms have ~zero real search demand for this site; "TRX" + "Santiago" + "a domicilio"/"cerca de mí" are the real anchors.
- Never use banned phrases from `docs/voice-and-tone.md` §14 (e.g. "sin excusas", "transforma tu vida", "premium", body-transformation framing, medical-outcome promises).

## Images and Asset Handling

- Prefer imported images under `src/assets/images/` processed through `astro:assets` (`<Picture>`/`getImage`) for anything that needs responsive variants.
- `public/assets/img/` holds legacy static variants kept for backward compatibility; current pages import images from `src/assets/images/` and process them through `astro:assets`. Do not add new hand-rolled variants here unless an external system requires a stable URL.
- Do not add remote image dependencies or CDNs.

## SEO, Accessibility, and Performance

- `astro.config.mjs` turns on `validateH1`, `validateUniqueMetadata`, `validateImageAlt`, `validateMetadataLength`, and `validateInternalLinks` in the SEO graph integration — a broken H1, missing alt text, duplicate metadata, an over-length title/description, or a dead internal link will surface as a build warning (treat warnings as build-breaking for your own change, even though the build doesn't hard-fail).
- `markdownAlternate: true` is on; the plugin self-heals by stripping `.md` alternate links for routes where no `.md` output exists (you'll see benign "stripped link" warnings for pre-existing pages — this is expected, not a bug to fix).
- IndexNow is always enabled (key file at `src/pages/591c2b87f0b68c44f260215f5d8e9da3.txt.ts`) — unlike stricter setups, it is not gated behind an env var here.
- Keep JSON-LD centralized: extend `structuredData` in `pages.ts` and let `src/utils/schema.ts` merge it into the shared graph, rather than hand-writing a second `<script type="application/ld+json">`.
- The sitemap excludes `404.html` and `/politica-de-cookies/` by design (`astro.config.mjs`).

## Analytics and Consent

- GA4 (`site.ga4Id` in `data/site.ts`) loads directly via `gtag.js` **only after consent** — there is no GTM container in this project (do not add one; do not assume brigadagalgos-style "GTM-only" rules apply here).
- Consent state lives in a `site_consent` cookie (12-month expiry); `"accepted"` loads GA4, `"rejected"` or unset does not.
- "Gestionar preferencias de cookies" (in the footer) clears the cookie and reloads, re-showing the banner.
- Respect `docs/politica-de-cookies` wording (Chilean Ley 19.628) if you touch consent copy or cookie durations.

## Security and Deployment

- `public/_headers` is the only Cloudflare Pages config file in this repo — it sets HSTS, a strict CSP (script-src limited to self + `googletagmanager.com` + `cloudflareinsights.com`), frame/referrer/permissions policies, and per-route cache headers. Update it if you add a new third-party script or a new top-level route that needs its own cache rule.
- There is no `_redirects` file yet. If a route is ever renamed or removed, add one rather than letting the old URL 404 (WhatsApp/Instagram links to specific pages should keep working).
- Actual deployment happens through Cloudflare Pages' own Git integration outside this repo; `.github/workflows/deploy.yml` only runs post-deploy Playwright smoke tests against the live `deployment_status` URL, it does not perform the deploy itself.

## Testing and Verification

Run before delivery unless the task clearly doesn't touch the relevant surface:

```bash
npm run format:check
npm run lint
npm run check
npm run build
```

For changes to interactive behavior (discovery flow, nav, CTAs) or visible UI:

```bash
npm run test:playwright:a11y
```

For major visual/SEO/performance-sensitive changes:

```bash
npm run test:lighthouse
```

Notes:

- `npm run lint` runs ESLint (Astro + TypeScript) and Stylelint together.
- `npm run check` runs `sync:css` then `astro check` (type + template diagnostics).
- `npm run build` runs `sync:css` then `astro build`, which is also where the SEO-graph validations (H1, alt text, metadata, internal links) run.
- `tests/visual/smoke.spec.ts` is **not** part of the main `ci.yml` job — it runs in `deploy.yml` against the deployed URL after a successful deployment. It can still be run locally against a preview server; if a stale `astro preview` process is already bound to the configured port, kill it first or the test may hit stale content.
- `tests/visual/capture.spec.ts` is a manual visual-QA tool (`npm run capture:local` / `capture:home` / `capture:servicios` / `capture:sobre-mi`), not a pass/fail gate.
- The Lychee link-checker workflow runs on a weekly schedule / manual dispatch only, not on every push.
- If a required check is skipped, state that explicitly and explain why.

## Key Files Worth Knowing

- `astro.config.mjs` — static build config, sitemap/robots/SEO-graph integration and validation flags, IndexNow key, `markdownAlternate`.
- `src/layouts/BaseLayout.astro` — document shell, CSS inlining mechanism, `<Seo>` props, `MobileCtaBar` placement.
- `src/data/pages.ts` — canonical per-page metadata + inline HTML content; the type `SitePage` defines the schema.
- `src/data/site.ts` — global site config, WhatsApp default number/message, nav.
- `src/utils/schema.ts` — JSON-LD graph builder shared by `BaseLayout` and `src/pages/schema/pages.json.ts`.
- `public/assets/js/main.js` — WhatsApp href rewriting, discovery-flow state machine, nav/header behavior.
- `public/assets/css/style.css` — the only stylesheet source.
- `scripts/sync-css.mjs` — CSS minification step; must run before `astro check`/`astro build` sees current styles (both scripts call it automatically).

## Known Gotchas

- Editing `public/assets/css/style.min.css` directly is a no-op the next time anyone runs `sync:css`, `check`, or `build` — always edit `style.css`.
- `pages.home.content` and `pages.about.content` are empty strings on purpose; Home content lives in `HomeContent.astro` and Sobre mí content in `AboutContent.astro`.
- Adding a WhatsApp link without `data-wa-msg` silently falls back to the generic default message — fine for minor/utility links, but primary CTAs should always set a specific message.
- `astro preview` processes can linger between test runs (Playwright's `reuseExistingServer` will happily reuse a stale one) and produce misleading smoke-test failures; if `smoke.spec.ts` fails with a bad HTTP status, check for a leftover preview process before assuming a real regression.
- Node in some local/sandbox environments may be older than the `.nvmrc`-pinned `24.x` — builds have worked on 22.x in practice, but don't rely on that; CI uses `.nvmrc`.

## Code Navigation Rules

Always prefer jCodeMunch over raw shell exploration for repo understanding.

Use:

- `search_symbols` for named code entities.
- `search_text` for strings, comments, config values, and HTML content inside `pages.ts`.
- `get_repo_outline` or `get_file_tree` for structure.
- `get_file_outline` before opening a file.
- `get_symbol_source` and `get_context_bundle` for implementation context.
- `find_references`, `find_importers`, and `get_blast_radius` before changing shared modules like `data/site.ts`, `data/pages.ts`, or `utils/schema.ts`.

If `plan_turn` confidence is:

- `high`: follow the recommended files and use minimal supplementary reads.
- `medium`: inspect recommended files, then broaden carefully.
- `low`: report that the feature likely does not exist; do not keep thrashing.

## Editing Behavior

- Respect existing user changes; do not revert unrelated work.
- Keep comments sparse and useful — explain non-obvious _why_, not _what_.
- Keep changes small and defensible.
- If PostToolUse hooks are unavailable and cache invalidation matters, register edited paths with jCodeMunch.

## Documentation Expectations

- `AGENTS.md` (this file) is the operational source for agents. Keep it specific and update it when workflows or conventions change.
- `README.md` is for humans. Keep it illustrative and lighter on internal implementation detail.
- `docs/site-brief.md` — business context, audience, goals, and scope/non-scope for the site.
- `docs/prd.md` — current functional requirements per page and feature.
- `docs/spec.md` — architecture, data flow, integrations, and key implementation decisions.
- `docs/feature-inventory.md` — every page, section, and capability the site currently has.
- `docs/content-model.md` — the `pages.ts`/`site.ts` schema, testimonial and FAQ data, discovery-flow answer options and message templates, editorial rules.
- `docs/architecture-map.md` — component and data-flow map.
- `docs/developer-reference.md` — CSS tokens, image pipeline details, WhatsApp/analytics/schema implementation notes, editing cookbook.
- `docs/voice-and-tone.md` — source of truth for site copy.
- `docs/conversion-strategy.md` — CTA placement and discovery-flow rationale.
- `docs/seo-content-plan.md` / `docs/search-console-insights.md` — keyword and metadata strategy grounded in real query data.
