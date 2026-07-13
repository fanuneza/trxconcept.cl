# Final Production Audit — trxconcept.cl

**Date:** 2026-07-12
**Scope:** Pre-production readiness pass — measure, fix justified defects, tighten the gate, leave the repo deployable.
**Result:** Ready to deploy. Every acceptance criterion passes or has a documented, evidence-based exception (see §12).

This was **not** a redesign. The visual system, copy, IA, conversion model, and Chilean-Spanish voice are unchanged. Five files changed (§4); the rest of the site was measured and confirmed already production-grade.

---

## 1. Baseline measurements

Environment: Node **v22.22.2** (repo pins Node 24 via `.nvmrc` / `engines`; see §12), npm 10.9.7, Astro 7.0.3, `output: "static"`, `trailingSlash: "always"`, Cloudflare Pages hosting.

**Build:** 6 routes, ~1.2–1.35 s Astro build (2.66 s wall incl. `sync:css`), 12 MB `dist/`, peak RSS ~254 MB.

**Validation suite at baseline:**

| Command                 | Result                                                                                                |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| `format:check`          | ❌ **FAIL** — `src/components/DiscoveryFlow.astro` (formatting violation shipped in commit `e0fca8f`) |
| `lint`                  | ⚠️ 1 warning — `scripts/impeccable-browser-review.mjs:99` `no-console`                                |
| `check` (astro check)   | ⚠️ 0 errors, 0 warnings, **1 hint** — unused `devices` import in the same script                      |
| `build`                 | ✅ 6 pages; SEO-graph H1/alt/metadata/internal-link validation all good                               |
| `test:playwright:a11y`  | ✅ 6/6                                                                                                |
| `test:playwright:smoke` | ✅ 5/5                                                                                                |
| `test:lighthouse`       | ✅ passed — but gate was **warn-only** (see §2)                                                       |
| `npm audit`             | 16 findings (3 low / 10 moderate / 3 high), all build/dev-time (§9)                                   |

**Lighthouse baseline (throttled mobile, LHCI `staticDistDir`, median where noted):**

| Route                    | Perf | A11y | Best-Pr. | SEO | LCP   | CLS | TBT  |
| ------------------------ | ---- | ---- | -------- | --- | ----- | --- | ---- |
| `/`                      | 100  | 100  | 100      | 100 | 1.9 s | 0   | 0 ms |
| `/servicios/`            | 100  | 100  | 100      | 100 | 1.4 s | 0   | 0 ms |
| `/sobre-mi/`             | 99   | 100  | 100      | 100 | 2.1 s | 0   | 0 ms |
| `/preguntas-frecuentes/` | 99   | 100  | 100      | 100 | 2.3 s | 0   | 0 ms |

**Asset/JS baseline:** HTML 44–71 KB/route (CSS inlined). CSS: `style.css` 46.7 KB → `style.min.css` 33.9 KB (**6.8 KB gzip**). JS: `main.js` 12.4 KB, `cookie-consent.js` 2.1 KB (both plain, deferred, no framework). Largest generated images: `hero-faq` variants up to 889 KB (source `hero-faq.jpg` = **1.58 MB / 2400×1505**, a compression outlier vs. its 389 KB sibling `hero-servicios.jpg`).

**Could not evaluate:** exact CI runtime (Node 24) — ran on Node 22; desktop Lighthouse profile not separately gated (mobile is the binding/stricter target). See §12.

---

## 2. Problems found

| #   | Severity            | Problem                                                                                                                                                                                                                                                                                                                                     | Category              |
| --- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| P1  | Blocking (gate red) | `format:check` fails on `DiscoveryFlow.astro` — a formatting violation was committed in `e0fca8f`, so CI's format gate is red.                                                                                                                                                                                                              | Maintainability / CI  |
| P2  | Major               | **Self-serving review markup**: the home `#business` `LocalBusiness` node emitted `aggregateRating` (5.0 / 3) + 3 `Review` entries. Reviews are _real_ (match visible testimonials) but Google disallows self-serving review/rating markup on your own `LocalBusiness`/`Organization` — ineligible for rich results and a policy-flag risk. | SEO / structured data |
| P2  | Major               | **Lighthouse gate too permissive** — everything `warn`-only, `numberOfRuns: 1`, perf floor 0.80, and six real a11y/SEO audits explicitly downgraded. A regression to any category or Core Web Vital would pass CI silently.                                                                                                                 | Production safety     |
| P3  | Minor               | Unused `devices` import + `no-console` warning in `scripts/impeccable-browser-review.mjs` (surfaced as an astro-check hint and a lint warning).                                                                                                                                                                                             | Maintainability       |
| P3  | Minor               | Unnecessary global `Access-Control-Allow-Origin: https://trxconcept.cl` header — no same-origin static resource needs CORS; "security decoration".                                                                                                                                                                                          | Security hygiene      |
| P4  | Informational       | `hero-faq.jpg` under-compressed source (1.58 MB); ~30 unreferenced legacy files in `public/assets/img/` (~1.5 MB); `uses-responsive-images` flags a ~19 KB opportunity on the sobre-mí portrait hero.                                                                                                                                       | Assets (see §12)      |

**Notably absent** (hypothesized in the brief, disproven by inspection): no abandoned hero experiments in `src/assets/images/` (all referenced, incl. `hero-new.jpg` → sobre-mí hero); no Netlify-vs-Cloudflare `_headers` incompatibility (Cloudflare Pages supports `_headers`); no live a11y violations; no LCP/CLS/TBT failures; no fabricated data; no console errors; `prefetchAll` uses the default **hover** strategy (appropriate for a 5-page site, not mass upfront prefetch) — kept.

---

## 3. Changes made

1. **Removed self-serving review schema** (`src/data/pages.ts`) — deleted `aggregateRating` + `review[]` from the home `#business` node; kept `sameAs` and all other business/geo/founder fields. The three testimonials remain fully visible on the page (`HomeContent.astro`) and the legitimate `FAQPage`, `Person`, `Service`, `BreadcrumbList`, `Organization`, `WebSite`, `WebPage` schema is untouched. _(User-confirmed decision.)_
2. **Fixed the formatting violation** (`src/components/DiscoveryFlow.astro`) via Prettier — restores the `format:check` gate. No markup/behavior change.
3. **Cleaned `scripts/impeccable-browser-review.mjs`** — removed unused `devices` import (clears the check hint); replaced `console.log` with `process.stdout.write` (identical output, clears the lint warning). Fixed in place rather than deleted, to avoid removing owner tooling.
4. **Tightened `.lighthouserc.cjs`** into a real production gate, grounded in the measured baseline: `numberOfRuns: 3` (median asserted); categories promoted to **error** (perf ≥0.90 with noise margin, a11y/best-practices/SEO =1.0); Core Web Vitals promoted to **error** at the true "good" thresholds (LCP ≤2500, CLS ≤0.1, TBT ≤200); the six previously-downgraded audits (`color-contrast`, `label-content-name-mismatch`, `heading-order`, `lcp-lazy-loaded`, `errors-in-console`, `robots-txt`) plus `modern-image-formats`/`render-blocking-resources` promoted to **error**; insight audits re-enabled as informational **warn** (were `off`).
5. **Removed the unnecessary CORS header** (`public/_headers`) — dropped `Access-Control-Allow-Origin`. HSTS, CSP, frame/referrer/permissions policies, `No-Vary-Search`, and per-route cache rules all retained unchanged.

---

## 4. Files changed

```
 .lighthouserc.cjs                     | 71 +++++++-------  (tightened gate)
 public/_headers                       |  1 -             (removed CORS header)
 scripts/impeccable-browser-review.mjs |  4 +-            (lint/check cleanup)
 src/components/DiscoveryFlow.astro    | 14 ++--          (prettier fix)
 src/data/pages.ts                     | 32 +---          (removed review schema)
 5 files changed, 63 insertions(+), 59 deletions(-)
```

`public/assets/css/style.min.css` and `dist/` are generated; not counted as source. No dependency, framework, hosting, or content-strategy changes.

---

## 5. Before / after Lighthouse by route

Throttled mobile; **after** = median of 3 runs under the new gate. Category/CWV numbers are unchanged by design — the site was already optimal; this pass fixed correctness/policy/gate, not performance. The value is that these numbers are now **enforced** rather than merely reported.

| Route                    | Perf (before→after) | A11y | Best-Pr. | SEO | LCP before→after  | CLS | TBT  |
| ------------------------ | ------------------- | ---- | -------- | --- | ----------------- | --- | ---- |
| `/`                      | 100 → **100**       | 100  | 100      | 100 | 1.90 → **1.89 s** | 0   | 0 ms |
| `/servicios/`            | 100 → **100**       | 100  | 100      | 100 | 1.40 → **1.36 s** | 0   | 0 ms |
| `/sobre-mi/`             | 99 → **99**         | 100  | 100      | 100 | 2.10 → **2.11 s** | 0   | 0 ms |
| `/preguntas-frecuentes/` | 99 → **99**         | 100  | 100      | 100 | 2.30 → **2.26 s** | 0   | 0 ms |

All four LCP medians sit under the new 2500 ms **error** gate (worst case FAQ 2.26 s, ~240 ms margin). Gate exit code: **0** (pass).

---

## 6. Before / after asset & JS sizes

| Item                                  | Before              | After         | Note                                        |
| ------------------------------------- | ------------------- | ------------- | ------------------------------------------- |
| `dist/index.html`                     | 71.2 KB             | **70.1 KB**   | −1.1 KB from removed review JSON-LD         |
| `style.min.css` (gzip)                | 6.8 KB              | 6.8 KB        | unchanged (no CSS source change this pass)  |
| `main.js` / `cookie-consent.js`       | 12.4 / 2.1 KB       | 12.4 / 2.1 KB | unchanged; still zero client frameworks     |
| Client JS shipped from `node_modules` | 0                   | **0**         | static site — nothing hydrated              |
| Largest image variant                 | 889 KB (`hero-faq`) | 889 KB        | unchanged — see §12 (documented, not fixed) |

No new dependencies, no new client script, no new hydration.

---

## 7. Accessibility results

- **Automated:** `@axe-core/playwright` — **6/6 routes, 0 violations** (home, servicios, sobre-mí, FAQ, política-de-cookies, 404).
- **Lighthouse a11y:** **100** on all four content routes (median of 3), now an **error** gate.
- **Manual/code review:** skip link → `#main-content` (target present); one visible `<h1>` per page and logical heading order (SEO-graph `validateH1` passes); `<fieldset>/<legend>` discovery steps with `tabindex="-1"` focus targets; `role="alert"` errors inject text at validation time (announced reliably); branded focus rings on links, `.btn`, `<summary>`, and the discovery/cookie native buttons; reduced-motion honored globally + for the mobile CTA bar; decorative logo `alt=""` under a labelled brand link; cookie controls are real `<button>`s with equal-weight accept/reject.
- Contrast: every token pair clears WCAG AA (body `--text` 18:1; `--text-muted` 8.8–9.4:1; even `--text-subtle` 4.65:1). `color-contrast` is now an **error** gate.

---

## 8. SEO & structured-data validation

- **Titles/descriptions:** unique per route (SEO-graph `validateUniqueMetadata` + `validateMetadataLength` pass); titles match intent from `docs/seo-content-plan.md` (TRX + Santiago + a domicilio anchors, not generic "entrenador personal").
- **Canonicals:** self-referencing on all indexable routes; política-de-cookies is intentionally noindex/excluded.
- **Sitemap:** contains exactly the 4 canonical indexable URLs (excludes `404.html` and `/politica-de-cookies/` by design); `robots.txt` → `https://trxconcept.cl/sitemap-index.xml`.
- **Open Graph / Twitter:** present; `og:image` resolves to a stable hashed `/_astro/og-image.*.webp` absolute URL (stable while the source image is unchanged).
- **JSON-LD:** all blocks parse as valid JSON. Types per route — Home: `Organization`, `WebSite`, `WebPage`, `[LocalBusiness, HealthAndBeautyBusiness]`; FAQ: `+ FAQPage`, `BreadcrumbList`; sobre-mí: `+ Person`; servicios: `+ Service`. Entities carry stable `@id`s and reference canonical URLs. **After the fix, `grep` for `AggregateRating|ratingValue|reviewBody|"Review"` in `dist/` returns 0** — no self-serving/ineligible review markup remains. The `FAQPage` markup matches visible Q&A and is retained (it legitimately qualifies).
- Internal links: SEO-graph `validateInternalLinks` passes; all `#` fragment targets (`#main-content`, `#descubre`, `#wa-symbol`) resolve. Spanish accents render correctly (UTF-8 intact).

---

## 9. Dependency audit findings & disposition

`npm audit`: **16 findings (3 low, 10 moderate, 3 high).** **All are build/dev-time only and unreachable in the deployed artifact** — this is a static site that ships **zero `node_modules` code** to the browser.

| Chain                                                                                                       | Sev      | Reachability                                                                                          | Disposition                                   |
| ----------------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `yaml` ← `yaml-language-server` ← `volar-service-yaml` ← `@astrojs/language-server` (used by `astro check`) | moderate | Dev/editor only; only triggers on maliciously deep YAML fed to the language server — never at runtime | Defer; non-breaking `npm audit fix` available |
| `ws` ← `puppeteer-core` (via `@lhci/cli` / Playwright)                                                      | high/mod | Dev/test only                                                                                         | Defer                                         |
| Remaining low/moderate                                                                                      | —        | Transitive under build tooling                                                                        | Defer                                         |

**Action taken:** documented, not patched. Rationale: (1) none are runtime-reachable in the static output; (2) `npm audit fix --force` is forbidden and would pull breaking major bumps; (3) the non-breaking `npm audit fix` mutates `package-lock.json`, and the lockfile is the reproducibility contract — it should be regenerated and validated on the **pinned Node 24** in CI, not on this Node 22 sandbox. **Recommended follow-up:** run `npm audit fix` (non-force) on Node 24, then re-run the suite. `npm outdated` shows only minor/patch drift (astro 7.0.3→7.0.7, tooling patches); none security-critical.

---

## 10. Security-header findings

Reviewed `public/_headers` against the actual Cloudflare Pages host and the site's real external resources (GA4 via `googletagmanager.com`, Cloudflare Insights):

- **CSP** — correct and tight: `script-src` limited to self + `googletagmanager.com` + `static.cloudflareinsights.com`; `connect-src` covers the GA4 endpoints; `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'self'`, `form-action 'self'`. `style-src 'unsafe-inline'` is required by the inlined CSS (acceptable; no inline script). **Kept.**
- **HSTS** `max-age=31536000; includeSubDomains` ✅ · **X-Content-Type-Options** `nosniff` ✅ · **Referrer-Policy** `strict-origin-when-cross-origin` ✅ · **Permissions-Policy** locks down sensor/payment APIs ✅ · **X-Frame-Options** SAMEORIGIN ✅.
- **Removed:** `Access-Control-Allow-Origin: https://trxconcept.cl` — no same-origin static resource requires CORS; it was decorative and slightly confusing. **The only header change.**
- **`No-Vary-Search`** (UTM/click-id param normalization) — retained; passed through verbatim by Cloudflare Pages, ignored safely by non-supporting browsers.
- Cache headers: `/assets/*` immutable 1-year (hashed) ✅; HTML `max-age=3600, stale-while-revalidate` (not immutable) ✅.
- No secrets committed; the IndexNow key file is intentionally public and correctly served.

---

## 11. Tests executed & exact outcomes (final)

| Command                              | Outcome                                                                                                                               |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run format:check`               | ✅ "All matched files use Prettier code style!"                                                                                       |
| `npm run lint`                       | ✅ 0 errors, **0 warnings** (was 1)                                                                                                   |
| `npm run check`                      | ✅ 0 errors, 0 warnings, **0 hints** (was 1 hint)                                                                                     |
| `npm run build`                      | ✅ 6 pages; H1/alt/metadata/internal-link validation all good                                                                         |
| `npm run test:playwright:a11y`       | ✅ **6/6 passed**                                                                                                                     |
| `npm run test:playwright:smoke`      | ✅ **5/5 passed**                                                                                                                     |
| `npm run test:lighthouse` (3×4)      | ✅ **exit 0** under the tightened error gate (only informational warns)                                                               |
| `npm audit`                          | 16 build/dev-time findings, dispositioned (§9)                                                                                        |
| Structured-data validation           | ✅ all JSON-LD valid; 0 review/rating markup remaining                                                                                |
| Internal-link + fragment scan (dist) | ✅ all resolve                                                                                                                        |
| JS-disabled review                   | ✅ hero, pricing (`Gratis`/`$160.000`/`$15.000`), WhatsApp real `wa.me` hrefs, and discovery fallback link all present in static HTML |
| Consent accept/reject (code)         | ✅ GA4 loads only on `accepted`; `rejected`/unset load nothing; preference persists 12 mo                                             |

> The Lychee broken-link workflow is CI-scheduled (weekly/dispatch), not run here; the build-time internal-link validator + dist fragment scan cover internal links. `capture.spec.ts` is a manual visual-QA tool, not a gate.

---

## 12. Remaining limitations

1. **Node version:** validated on **Node 22.22.2**, not the pinned **24.x**. AGENTS.md confirms builds work on 22 and "CI is the source of truth." All gates pass on 22; CI on 24 is the authoritative check. _Re-run the suite on Node 24 before/at deploy._
2. **Desktop Lighthouse not separately gated:** the gate uses throttled **mobile** (the harder target); desktop scores are ≥ mobile. Add a desktop LHCI profile if a desktop gate is desired.
3. **`uses-responsive-images` (~19 KB, sobre-mí portrait hero):** kept as informational **warn**, not error — the "ideal" width depends on Lighthouse's device-DPR math, so an error gate would be brittle for a sub-threshold saving on a page already at Perf 99 / LCP 2.1 s. _Optional fix:_ add a ~640–720 w variant to `PageHero` widths.
4. **`hero-faq.jpg` (1.58 MB source):** an under-compressed outlier; the served variants are re-encoded by Astro at q60 and the FAQ page still hits LCP 2.26 s (< 2.5 s), so not fixed this pass. _Optional:_ re-encode the source ~q80 to trim the large-width variants.
5. **Legacy `public/assets/img/` (~30 files, ~1.5 MB):** unreferenced except `favicon.png`, but _left in place_ (user-confirmed) — old external links or cached social shares could still hit those stable URLs, and AGENTS.md calls them intentional backward-compat. They cost users nothing (never requested); they only add deploy weight. _Follow-up needing owner confirmation:_ delete all but `favicon.png` (+ optionally keep `og-image.webp`) once confirmed no external system references them.
6. **Dependency vulns:** all build/dev-time, unreachable in production; `npm audit fix` (non-force) deferred to a Node-24 CI run (§9).

---

## 13. Deployment checklist

- [ ] Run on **Node 24** (`.nvmrc`): `npm ci && npm run check && npm run lint && npm run format:check && npm run build`.
- [ ] `npm run test:playwright:a11y` (6/6) and `npm run test:playwright:smoke` (5/5).
- [ ] `npm run test:lighthouse` — expect **exit 0**; the gate now fails on any category/CWV regression.
- [ ] Confirm `dist/_headers` deploys and Cloudflare applies HSTS/CSP/cache (verify response headers on the live URL post-deploy).
- [ ] Verify `og:image` (`/_astro/og-image.*.webp`) resolves 200 and previews correctly (WhatsApp/Instagram share, or a validator).
- [ ] Re-validate the home JSON-LD in Google's Rich Results Test — confirm **no** review/rating warnings and that `LocalBusiness`/`FAQPage` parse.
- [ ] Spot-check consent: reject → no GA4 network calls; accept → single GA4 load; footer "Gestionar preferencias" re-opens the banner.
- [ ] Tap-test a WhatsApp CTA on a real phone — opens WhatsApp with the context-specific prefilled message.
- [ ] (Optional) `npm audit fix` on Node 24, then re-run the suite.

## 14. Rollback considerations for risky changes

| Change                                              | Risk                                                                                                                                                                                                                      | Rollback                                                                                                                                    |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Removed review/rating schema** (`pages.ts`)       | Low. If a rich review snippet was somehow rendering (unlikely for self-serving LocalBusiness), it would disappear — but Google's policy makes that ineligible anyway. Testimonials still show on-page.                    | `git revert` the `pages.ts` hunk to restore `aggregateRating`+`review[]`. Isolated, self-contained.                                         |
| **Tightened Lighthouse gate** (`.lighthouserc.cjs`) | Medium (CI, not runtime). A future perf dip or a fresh LH audit could turn CI red where it previously passed silently — the intended behavior, but it can surprise. FAQ LCP has ~240 ms margin under the 2500 error gate. | Loosen the specific assertion (e.g. LCP → `warn`, or perf `minScore` → 0.85) without reverting the whole file. Insight `warn`s never block. |
| **Removed CORS header** (`_headers`)                | Very low. Nothing on the site makes a cross-origin request needing it. If a future cross-origin consumer is ever added, re-add a scoped `Access-Control-Allow-Origin`.                                                    | Re-add the one line.                                                                                                                        |
| Formatting / script cleanup                         | None (cosmetic, output-preserving).                                                                                                                                                                                       | n/a                                                                                                                                         |

**No runtime behavior, layout, copy, or conversion path was modified.** All changes are content-metadata, CI configuration, one header, and lint hygiene — each independently revertible.
