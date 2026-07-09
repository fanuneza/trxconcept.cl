# Architecture Map

A component/data-flow map for this repo. Its job: given a change you need to make, tell you which files it touches. For "how it's built and why," see `docs/spec.md`. For the exact data shapes, see `docs/content-model.md`.

## 1. Document composition — who renders what

```
BaseLayout.astro (document shell, per route)
├── <head>
│   ├── <Seo ...>                    ← @jdevalk/astro-seo-graph, fed by pages.ts + utils/schema.ts
│   ├── font preloads (static hrefs)
│   ├── <style is:inline set:html={siteCss}>  ← readFileSync of style.min.css at build time
│   └── <script defer src="/assets/js/main.js">
├── <body>
│   ├── <WaSymbol />                 ← inline SVG <symbol> def, referenced by every WhatsApp icon
│   ├── <Header />                   ← site.nav, site.whatsappHref
│   ├── <main><slot /></main>        ← page-specific content goes here
│   ├── <Footer />                   ← floating WA button, site.legal, site.instagram
│   ├── <MobileCtaBar />             ← fixed bottom bar, <680px only
│   ├── <CookieBanner />             ← consent banner markup
│   └── <script src="/assets/js/cookie-consent.js" defer>
```

Each route file supplies `page` (a `SitePage` from `pages.ts`, or an inline object for `404.astro`) and, for Home only, a `preloadImage` prop. `<slot />` is filled per-route:

- `/` → `<HomeContent />` (mounts `<DiscoveryFlow />` internally)
- `/servicios/` → `<Fragment set:html={page.content} />`
- `/sobre-mi/` → `<AboutContent />`
- `/preguntas-frecuentes/` → `<Fragment set:html={page.content} />`
- `/politica-de-cookies/` → `<Fragment set:html={page.content} />`
- `/404` → hand-written JSX in `404.astro` itself (not from `pages.ts`)

## 2. Data flow — `site.ts` / `pages.ts` into pages

```
src/data/site.ts  ──┬─→ Header.astro (nav, whatsappHref)
                     ├─→ Footer.astro (whatsappHref, whatsappLabel, instagram, legal)
                     ├─→ BaseLayout.astro (name, url, ga4Id, consentCookie → <html data-*> attrs)
                     ├─→ utils/schema.ts (name, url → WebSite/Organization JSON-LD)
                     └─→ HomeContent.astro (instagram link)

src/data/pages.ts (`pages` object, typed `SitePage`) ──┬─→ route files (title/description/canonical/
                                                        │    robots/breadcrumb/structuredData/content)
                                                        ├─→ BaseLayout.astro (via `page` prop → <Seo>,
                                                        │    schema graph merge)
                                                        └─→ src/pages/schema/pages.json.ts
                                                             (Object.values(pages) → JSON schema endpoint)
```

To change page copy or metadata: edit `pages.ts` first. Only touch a component directly if the content is Home (`HomeContent.astro`), Sobre mí (`AboutContent.astro`), or the discovery flow (`DiscoveryFlow.astro`) — those three render markup that lives outside `pages.ts`'s `content` strings.

## 3. Plain-JS ↔ markup binding — data attributes, not component props

This is a static/no-framework site: `main.js` and `cookie-consent.js` are dependency-free scripts that bind to the DOM purely through `data-*` attributes and element IDs, never through component props or a client framework's reactivity. If you rename one of these attributes in a component, you must update the matching selector in the JS file, and vice versa.

| Attribute / ID                                                                 | Set in (markup)                                                                                                    | Read in (JS)        | Purpose                                                                      |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------- | ---------------------------------------------------------------------------- |
| `data-wa`                                                                      | any WhatsApp anchor (`Header`, `Footer`, `HomeContent`, `MobileCtaBar`, `pages.services.content`, `DiscoveryFlow`) | `main.js`           | Marks an element for href rewriting                                          |
| `data-wa-msg`                                                                  | same anchors, per-CTA custom text                                                                                  | `main.js`           | Message text source; absent → `WA_DEFAULT`                                   |
| `data-discovery`                                                               | `DiscoveryFlow.astro` root card                                                                                    | `main.js`           | Entry point for the discovery state machine; presence gates all discovery JS |
| `data-discovery-form`                                                          | `<form>` in `DiscoveryFlow.astro`                                                                                  | `main.js`           | Form element reference for `reset()`/`querySelector`                         |
| `data-step`                                                                    | each `<fieldset class="discovery-step">`                                                                           | `main.js`           | Step ordering/indexing (not read by value, order via DOM query)              |
| `data-discovery-bar`                                                           | progress bar `<span>`                                                                                              | `main.js`           | Width set as `%` per step                                                    |
| `data-discovery-next` / `data-discovery-back`                                  | nav buttons                                                                                                        | `main.js`           | Click handlers, label/hidden toggling                                        |
| `data-discovery-result`                                                        | result `<div>`                                                                                                     | `main.js`           | Shown/hidden at flow completion                                              |
| `data-discovery-link`                                                          | result CTA `<a>`                                                                                                   | `main.js`           | `href`/`data-wa-msg` set to the built message                                |
| `data-discovery-restart`                                                       | restart `<button>`                                                                                                 | `main.js`           | Resets form and step index                                                   |
| `id="yr"`                                                                      | `Footer.astro`                                                                                                     | `main.js`           | Copyright year fill                                                          |
| `id="nav-main"`, `.nav-toggle-btn`                                             | `Header.astro`                                                                                                     | `main.js`           | Mobile nav toggle                                                            |
| `id="cookie-banner"`, `#cookie-accept`, `#cookie-reject`, `#cookie-manage-btn` | `CookieBanner.astro` / `Footer.astro`                                                                              | `cookie-consent.js` | Consent flow                                                                 |
| `data-ga4-id`, `data-consent-cookie`                                           | `<html>` in `BaseLayout.astro`                                                                                     | `cookie-consent.js` | Passes `site.ts` config into plain JS without a build-time import            |

## 4. SEO/schema graph flow

```
pages.ts (per-page `structuredData`, `breadcrumb`, `title`, `description`, `canonical`, `isHome`)
   │
   ├──→ BaseLayout.astro:
   │      buildSchemaGraph({ pageType, url, title, description, breadcrumb })  ← utils/schema.ts
   │      + merge page.structuredData (splice @graph, or push node minus @context)
   │      → passed as `graph` prop to <Seo> (@jdevalk/astro-seo-graph)
   │      → rendered as one inline <script type="application/ld+json"> per page
   │
   └──→ src/pages/schema/pages.json.ts:
          createSchemaEndpoint({ entries: Object.values(pages), mapper: <same buildSchemaGraph + merge, re-implemented independently> })
          → serves /schema/pages.json with every page's graph, as JSON

src/pages/schemamap.xml.ts        → createSchemaMap, points to /schema/pages.json (with git-lastmod)
src/pages/.well-known/api-catalog.ts → createApiCatalog, references /schema/pages.json + /schemamap.xml + /servicios/ as service doc
src/pages/591c2b87f0b68c44f260215f5d8e9da3.txt.ts → IndexNow key file (filename = key)
```

Important: the merge logic (splice `@graph` vs. push a single node minus `@context`) is duplicated between `BaseLayout.astro` and `schema/pages.json.ts` — they are not sharing a function, just the same `buildSchemaGraph()` builder plus independently written merge code. A change to how merging should work needs to be applied in both places.

## 5. "If I need to change X, which files touch it" quick index

| Change                                                               | Files                                                                                                                                                                                                         |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page copy (services/FAQ/cookies/404)                                 | `src/data/pages.ts` (`content` string for services/FAQ/cookies); `src/pages/404.astro` for 404                                                                                                                |
| Home page copy/sections                                              | `src/components/HomeContent.astro`                                                                                                                                                                            |
| Sobre mí copy                                                        | `src/components/AboutContent.astro`                                                                                                                                                                           |
| Page `<title>`/meta description/OG/canonical                         | `src/data/pages.ts`                                                                                                                                                                                           |
| JSON-LD for a specific page                                          | `pages.ts` → that page's `structuredData`                                                                                                                                                                     |
| Shared JSON-LD graph shape (WebSite/Organization/WebPage/Breadcrumb) | `src/utils/schema.ts`                                                                                                                                                                                         |
| Nav links                                                            | `src/data/site.ts` (`nav`) → consumed by `Header.astro`                                                                                                                                                       |
| Footer legal links                                                   | `src/data/site.ts` (`legal`) → consumed by `Footer.astro`                                                                                                                                                     |
| WhatsApp number                                                      | `public/assets/js/main.js` (`WA_NUMBER`) + literal fallback hrefs in `site.ts`/components                                                                                                                     |
| Default WhatsApp message                                             | `public/assets/js/main.js` (`WA_DEFAULT`)                                                                                                                                                                     |
| A specific CTA's WhatsApp message                                    | that CTA's `data-wa-msg` attribute, in its component or `pages.ts` HTML string                                                                                                                                |
| Discovery flow questions/options                                     | `src/components/DiscoveryFlow.astro` (markup)                                                                                                                                                                 |
| Discovery flow message-building logic                                | `public/assets/js/main.js` (`OBJETIVO`, `MOLESTIA`, `buildMessage()`)                                                                                                                                         |
| Mobile sticky bar content                                            | `src/components/MobileCtaBar.astro`                                                                                                                                                                           |
| Floating WA button (desktop/tablet)                                  | `src/components/Footer.astro`                                                                                                                                                                                 |
| Any visual styling                                                   | `public/assets/css/style.css` only (never `.min.css`)                                                                                                                                                         |
| GA4 ID / consent cookie name                                         | `src/data/site.ts` (`ga4Id`, `consentCookie`) → read via `<html data-*>` in `BaseLayout.astro` → `cookie-consent.js`                                                                                          |
| Consent behavior / GA4 loading                                       | `public/assets/js/cookie-consent.js`                                                                                                                                                                          |
| Cookie policy copy                                                   | `pages.ts` → `pages.cookies.content`                                                                                                                                                                          |
| Security headers / cache rules                                       | `public/_headers`                                                                                                                                                                                             |
| Sitemap exclusions                                                   | `astro.config.mjs` (`sitemap({ filter })`)                                                                                                                                                                    |
| SEO validation flags (H1, alt, metadata length, internal links)      | `astro.config.mjs` (`seoGraph({...})`)                                                                                                                                                                        |
| IndexNow key                                                         | `src/pages/591c2b87f0b68c44f260215f5d8e9da3.txt.ts` filename + `astro.config.mjs` `indexNow` config (must match)                                                                                              |
| Adding/removing a route                                              | new file under `src/pages/`; update `site.nav` if it should appear in the header; update `public/_headers` per-route cache rule if it needs one; consider a `_redirects` entry if replacing an existing route |
