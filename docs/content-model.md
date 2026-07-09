# Content Model

This site has no CMS and no Astro content collections. This document is the schema reference for the two TypeScript files that replace them: `src/data/pages.ts` and `src/data/site.ts`, plus the fixed data sets embedded in components (`HomeContent.astro`, `DiscoveryFlow.astro`) that aren't in `pages.ts`.

## 1. `SitePage` type (`src/data/pages.ts`)

```ts
type SitePage = {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  robots?: string;
  structuredData?: unknown;
  breadcrumb?: { name: string; item: string }[];
  content: string;
  isHome?: boolean;
};
```

Field meanings:

- `title` — page `<title>` (rendered through `titleTemplate="%s | TRX Concept"` in `BaseLayout.astro`).
- `description` — meta description, also reused as OG description unless `ogDescription` is set.
- `canonical` — absolute canonical URL; falls back to `Astro.url` if omitted.
- `ogTitle` / `ogDescription` / `ogImage` / `ogType` — Open Graph overrides; only `home` sets a custom `ogTitle`. `ogImage` defaults to the imported `og-image.webp` if unset.
- `twitterCard` — defaults to `summary_large_image` if unset.
- `robots` — only set to `"noindex"` on `cookies` and the 404 page.
- `structuredData` — raw JSON-LD (an object, or an object with its own `@graph` array) merged into the shared schema graph by `buildSchemaGraph()` (see `docs/spec.md` §5). Only `home`, `services`, and `faq` set this.
- `breadcrumb` — array of `{ name, item }` used both for the `<BreadcrumbList>` JSON-LD and for the visible breadcrumb nav rendered by the `renderPageHero()` helper inside `pages.ts`.
- `content` — an HTML string rendered with `set:html`/`<Fragment set:html>` in the corresponding route file. Home's is intentionally empty (home renders through `HomeContent.astro` instead); `about` also has a full `content` string but the `sobre-mi` route actually renders `AboutContent.astro`, not `pages.about.content` — the string in `pages.ts` for `about` is present but unused by the route (a near-duplicate of `AboutContent.astro`'s markup).
- `isHome` — only `true` for `home`; used to choose `pageType: "website"` vs `"webpage"` when building the schema graph.

## 2. `pages.ts` entries

- `pages.home` — SEO metadata + full LocalBusiness/HealthAndBeautyBusiness `structuredData` (including the 3 reviews, see §4) + `aggregateRating` (`ratingValue: "5.0"`, `reviewCount: "3"`). `content: ""`.
- `pages.services` — SEO metadata + `Service` structuredData with an `OfferCatalog` of 3 offers (free assessment $0, single session $15.000, monthly package $160.000, all `priceCurrency: "CLP"`). `content` is a full HTML string: page hero, services/pricing grid, "how to book" steps, "what is TRX" blurb, "for whom" grid, "what to expect" section, CTA band.
- `pages.about` — SEO metadata only, no `structuredData`. `content` is a full bio/certifications/philosophy HTML string, but the actual route uses `AboutContent.astro` instead (see above).
- `pages.faq` — SEO metadata + `FAQPage` structuredData with 13 `Question`/`acceptedAnswer` pairs (see §5 for the full list). `content` renders the same 13 questions as `<details class="faq-item" id="...">` elements — the visible page content and the JSON-LD `mainEntity` array are two independently hand-written copies of the same 13 Q&A pairs (not generated from one source), so any FAQ edit must be applied in both places to stay in sync.
- `pages.cookies` — SEO metadata (`robots: "noindex"`), no `structuredData`. `content` covers what cookies are, the 2-row cookie table (`site_consent`; `_ga`/`_ga_*`), consent management, withdrawal, and Ley 19.628 legal basis.

## 3. `site.ts` fields

```ts
export const site = {
  name: "TRX Concept",
  url: "https://trxconcept.cl",
  ga4Id: "G-P1W5Z80Z88",
  consentCookie: "site_consent",
  instagram: "https://www.instagram.com/trxconcept",
  whatsappHref: "https://wa.me/56984402664?text=...",
  whatsappLabel: "Agendar evaluación gratis por WhatsApp",
  nav: [
    { href: "/servicios/", label: "Servicios" },
    { href: "/sobre-mi/", label: "Sobre mí" },
    { href: "/preguntas-frecuentes/", label: "Preguntas frecuentes" },
  ],
  legal: [{ href: "/politica-de-cookies/", label: "Política de cookies" }],
};
```

- `name` / `url` — used throughout SEO (`<Seo siteName>`, schema graph `SITE_URL`) and as the base for `og:image` absolute URLs.
- `ga4Id` — stamped on `<html data-ga4-id>`, read by `cookie-consent.js`.
- `consentCookie` — the cookie name (`site_consent`), stamped on `<html data-consent-cookie>` so the plain-JS consent script doesn't hardcode it.
- `instagram` — used as `rel="me"` link in `<Seo extraLinks>`, footer social link, and homepage testimonial "more on Instagram" link.
- `whatsappHref` — a **pre-rendered** fallback WhatsApp link with a URL-encoded generic message, used as the initial `href` on some anchors before `main.js` runs and rewrites it via `data-wa`/`data-wa-msg`.
- `whatsappLabel` — accessible label for the floating WhatsApp button in `Footer.astro`.
- `nav` — drives `Header.astro`'s primary nav (note: home `/` is not in this list, it's the logo link).
- `legal` — drives the footer's legal links row (currently only the cookie policy).

## 4. Testimonials (3 total — do not add more without new real quotes)

Defined in two places that must stay consistent: the homepage `#testimonios` section in `HomeContent.astro`, and the `review` array inside `pages.home.structuredData`.

1. **Valentina Rosenthal** — "Entreno con Nico desde 2021. Partimos dos veces a la semana y hoy entrenamos tres. Sin haber sido nunca buena para hacer deportes, Nico ha logrado que tenga una rutina y que lleve cuatro años entrenando, con todos los beneficios que esto trae." (attributed as "– Valentina" on the visible card)
2. **Marisa Gracia** — "Entrenar con Nicolás fue una excelente experiencia. Gracias a su guía y el trabajo constante con TRX, mi cuerpo ganó fuerza, estabilidad y tono muscular. Noté mejoras en mi postura, control corporal y energía general."
3. **María Ignacia Williamson** — "Entrenar con Nico fue una muy buena experiencia. Su enfoque personalizado y su profundo conocimiento del TRX hicieron que cada sesión fuera desafiante pero muy gratificante." (attributed as "– María Ignacia" on the visible card)

All three are rated 5 stars; `aggregateRating.reviewCount` is `"3"` — this must always equal the number of testimonials actually present. Do not fabricate additional reviews or bump the count.

## 5. FAQ question set (14 questions — `pages.faq.structuredData.mainEntity`, mirrored as `<details id="...">` in `pages.faq.content`)

1. `experiencia-previa` — ¿Necesito experiencia previa para entrenar TRX?
2. `que-necesito-en-casa` — ¿Qué necesito tener en casa para entrenar?
3. `lesion-o-dolor-cronico` — ¿Es seguro si tengo una lesión o dolor crónico?
4. `es-rehabilitacion` — ¿Esto es rehabilitación o tratamiento médico? (the medical-boundary question — answer explicitly states this is not rehab/medical treatment and defers to the visitor's health professional)
5. `sectores-de-santiago` — ¿En qué sectores de Santiago entrenas?
6. `horarios-disponibles` — ¿Cuáles son los horarios disponibles?
7. `frecuencia-semanal` — ¿Cuántas veces a la semana debería entrenar?
8. `cancelacion-de-sesion` — ¿Qué pasa si tengo que cancelar una sesión?
9. `primera-clase` — ¿Cómo es la primera clase?
10. `precios` — ¿Cuánto cuestan las clases de TRX?
11. `bajar-de-peso` — ¿El TRX sirve para bajar de peso?
12. `donde-clases` — ¿Dónde das las clases de TRX?
13. `venden-equipos` — ¿Vendes equipos TRX?
14. `como-agendar` — ¿Cómo agendo una clase de TRX?

(14 `<details>`/`Question` entries total, listed above in source order, all present verbatim in `pages.ts`.)

The homepage's condensed FAQ (`#faq-home` in `HomeContent.astro`) is a **separate**, shorter set of 4 questions (not IDs from the list above, no `structuredData` of their own): "¿Necesito experiencia previa?", "¿Es seguro si tengo una molestia de rodilla o espalda?", "¿Dónde son las clases?", "¿Qué incluye la evaluación gratis?" — with a link through to the full `/preguntas-frecuentes/` page.

## 6. Discovery-flow answer option sets (`DiscoveryFlow.astro` markup + `OBJETIVO`/`MOLESTIA` lookup tables in `main.js`)

**`objetivo` (radio, step 1)** — value → label → message fragment (from `OBJETIVO` in `main.js`):
- `empezar` — "Empezar desde cero" → "quiero empezar desde cero"
- `retomar` — "Retomar el ejercicio" → "quiero retomar el ejercicio"
- `molestia` — "Entrenar cuidando una molestia" → "quiero entrenar cuidando una molestia"
- `fuerza` — "Ganar fuerza y mejorar la postura" → "quiero ganar fuerza y mejorar mi postura"

**`molestia` (radio, step 2)** — value → label → message fragment (from `MOLESTIA` in `main.js`):
- `ninguna` — "Ninguna en particular" → "sin lesiones"
- `rodilla` — "Molestia de rodilla" → "con una molestia de rodilla"
- `espalda` — "Molestia de espalda" → "con una molestia de espalda"
- `principiante` — "Soy principiante" → "soy principiante"
- `otra` — "Otra, te la cuento" → "con una molestia que te cuento"

**`comuna` (select, step 3)** — literal option list, in order: Providencia, Las Condes, Vitacura, Ñuñoa, La Reina, Lo Barnechea, Santiago Centro, Macul, Peñalolén, Otra comuna (value `"otra comuna"`).

**`horario` (radio, step 3)** — values: `mañanas` ("Mañanas"), `mediodía` ("Mediodía"), `tardes` ("Tardes").

**Message template** (built by `buildMessage()` in `main.js`):
```
Hola Nico, vi el sitio de TRX Concept. {Objetivo (capitalized)}, {molestia fragment} y entreno en {comuna} ({horario}). Me interesa la evaluación gratis.
```
Falls back to "Santiago" if no comuna selected, "cuando se pueda" if no horario selected, "quiero empezar a entrenar" if no objetivo selected, and "sin lesiones" if no molestia selected — though in practice all fields are required to reach the result step (see per-step validation in `docs/spec.md` §4).

## 7. Pricing figures (source of truth — do not alter without a real business decision)

- **Evaluación inicial**: free ("Gratis"), no commitment.
- **Sesión Individual**: $15.000 CLP, ~1 hour, no continuity commitment.
- **Paquete Mensual / Plan de constancia**: $160.000 CLP/month, 3 sessions/week (~12 sessions/month), ≈ $13.300 CLP per session (stated explicitly in both the homepage pricing card and FAQ answer `precios`).
- Cancellations with more than 24 hours' notice are free of charge (stated in `pages.services.content` pricing note and FAQ `cancelacion-de-sesion`).
- These three figures (free / $15.000 / $160.000, and the derived ≈$13.300/session) appear consistently across: homepage pricing cards, `/servicios/` page content, `/servicios/` `structuredData.hasOfferCatalog`, and the FAQ. Any future price change must be applied in all of these locations.

## 8. Editorial rules

- Never invent prices, credentials, testimonials, review counts, comunas served, or medical claims. If information is missing, leave a TODO or ask — do not fabricate (per `AGENTS.md` and `docs/voice-and-tone.md` §9).
- Keep the testimonial count honest: exactly 3 testimonials exist; `aggregateRating.reviewCount` must match. Do not add a 4th without a genuine new review, and update the count if one is added or removed.
- The medical-boundary language must be preserved verbatim in spirit wherever it appears: "esto es entrenamiento con criterio, no tratamiento médico" (and its variants in the FAQ, the fit-section callout, and the discovery flow's step-2 hint). Do not soften this into a medical claim, and do not remove the deferral to a health professional for acute injuries/recent surgery/diagnoses requiring supervision.
- Never use banned phrases from `docs/voice-and-tone.md` §14 (e.g. "sin excusas", "transforma tu vida", "premium", body-transformation framing, medical-outcome promises).
- For full voice, rhythm, and phrasing rules, see `docs/voice-and-tone.md` — this document only covers the data shape and the concrete values, not how to write new copy.
