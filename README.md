# trxconcept.cl

Static marketing site for TRX Concept, a personal TRX training business in Santiago, Chile.

The site is now built with Astro and deployed as static HTML. It keeps the original lightweight approach: vanilla CSS, vanilla browser JavaScript, static assets, and no runtime server.

## Tech Stack

- Astro 6
- Node.js 24
- TypeScript for shared site/page data
- Vanilla CSS in `public/assets/css/style.css`
- Minified production CSS in `public/assets/css/style.min.css`
- Vanilla JavaScript in `public/assets/js/main.js` and `public/assets/js/cookie-consent.js`
- Static deployment output in `dist/`

## Project Structure

```text
src/components/              Shared Astro components
src/data/pages.ts            Page metadata, SEO tags, and page HTML content
src/data/site.ts             Site-wide settings, nav, legal links, GA4 id
src/layouts/BaseLayout.astro Shared document layout
src/pages/                   Astro routes
public/assets/               CSS, JS, images, fonts, logos, icons
public/_headers              Cloudflare Pages cache headers
public/robots.txt            Robots policy
public/sitemap.xml           Static sitemap
dist/                        Generated build output
```

Routes are generated as static pages with trailing slashes:

```text
/                         Home
/servicios/               Services
/sobre-mi/                About
/preguntas-frecuentes/    FAQ
/politica-de-cookies/     Cookie policy
/404.html                 Not found page
```

## Local Development

Use Node 24. The repo includes `.nvmrc` with `24`.

```bash
npm install
npm run dev
```

Build and preview the static output:

```bash
npm run build
npm run preview
```

If Astro tries to write telemetry config outside the project in a restricted environment, disable telemetry for the command:

```bash
ASTRO_TELEMETRY_DISABLED=1 npm run build
```

PowerShell:

```powershell
$env:ASTRO_TELEMETRY_DISABLED='1'; npm run build
```

## Deployment

Deploy with Cloudflare Pages.

Recommended Cloudflare Pages settings:

```text
Framework preset: Astro
Build command: npm run build
Build output directory: dist
Node version: 24
Production branch: main
```

Set the Node version in Cloudflare with an environment variable if needed:

```text
NODE_VERSION=24
```

The generated site is fully static. Cloudflare serves files from `dist/`, while `public/_headers` configures long-lived caching for assets and revalidation for HTML routes.

## Content And SEO Notes

- Canonical URLs use `https://trxconcept.cl` with trailing slashes for directory pages.
- Navigation links also use trailing slashes.
- Open Graph URLs should match canonical URLs.
- Google Analytics 4 is consent-gated through `cookie-consent.js`.
- WhatsApp links are populated by `main.js` from a single source of truth.
- Header, footer, and shared symbols live in Astro components, so global UI changes should be made once in `src/components/`.

## Common Commands

```bash
npm run dev      # Start Astro dev server
npm run build    # Generate static output in dist/
npm run preview  # Preview the built site locally
```
