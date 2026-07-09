# PRD — TRX Concept website

Current functional requirements, page by page, reflecting the **July 2026 redesign
baseline** (hybrid conversion model: WhatsApp as primary CTA everywhere, 3-step discovery
flow as secondary path). This document describes what the site _does today_, grounded in
`src/data/pages.ts`, `src/data/site.ts`, `src/components/HomeContent.astro`, and
`src/components/DiscoveryFlow.astro` — not aspirational features. For business framing see
`docs/site-brief.md`; for copy rules see `docs/voice-and-tone.md`; for CTA rationale see
`docs/conversion-strategy.md`.

There are 5 public routes plus a 404 page. Every route must offer at least one clear
WhatsApp path; Home additionally exposes the full hybrid model (direct CTA + discovery flow
at `#descubre`).

---

## `/` — Home

**Purpose:** Primary entry point (29 of ~30 tracked clicks land here). In a few seconds,
communicate what TRX Concept is (1-on-1 TRX in Santiago, at home or outdoors), who it's for
(start or return without pressure or fear), who trains you (Nico, certified, 10+ years), and
lower the barrier to contact via the free assessment.

**Content source:** `src/components/HomeContent.astro` (rendered directly; `pages.home.content`
in `pages.ts` is intentionally an empty string).

**Required sections** (in order, by `id`):

1. `#hero` — H1 ("Clases de TRX en Santiago, 1 a 1 en tu casa o al aire libre"), lead
   paragraph, trust chips (certified trainer, 10+ years, free initial assessment, "respondo
   en 4 h", Santiago oriente y centro), primary WhatsApp CTA + secondary anchor link to
   `#descubre`.
2. `#como-empezamos` — 4-step "how we start" process (contact → review objetivo/horario/
   molestias → free assessment → define a plan if it fits).
3. `#descubre` — the `DiscoveryFlow` component (see dedicated section below).
4. `#para-quien` — "who this is for" grid (6 fit cases) plus a note on when to see a health
   professional first (acute injury, recent surgery, diagnosis requiring supervision).
5. `#seguridad` — "how I look after your safety" — movement check first, adaptation to level/
   history, gradual progression, full attention (1-on-1), explicit scope limit ("esto es
   entrenamiento con criterio, no tratamiento médico").
6. `#como-funciona` — service-model bullet list (home/parks, always 1-on-1, Santiago oriente y
   centro, no machines/no fixed membership, flexible schedule from 6 AM).
7. `#pricing` — 3 pricing cards: free initial assessment, monthly plan $160.000 (featured,
   "Más elegido", 3x/week ≈12 sessions, ≈$13.300/session), single session $15.000. Each card
   has its own WhatsApp CTA with a distinct `data-wa-msg`. Cancellation note (>24h, free)
   below the cards.
8. `#testimonios` — exactly 3 testimonial cards (Valentina, Marisa Gracia, María Ignacia
   Williamson), each with photo, 5-star label, quote, first-name/name attribution as given,
   plus a link to Instagram @trxconcept as social proof (not a conversion CTA).
9. `#entrenador` — trainer summary card linking to `/sobre-mi/`.
10. `#faq-home` — condensed FAQ (4 questions) plus a link to the full FAQ page.

**SEO requirements:**

- Title: `Clases de TRX en Santiago, a domicilio y 1 a 1` (unique; see `pages.home.title`).
- Meta description: unique, mentions 1-on-1 TRX, Santiago, at-home/outdoor, free evaluation
  via WhatsApp (see `pages.home.description`).
- Exactly one H1 (`#hero .hero-title`).
- Structured data: `LocalBusiness` + `HealthAndBeautyBusiness` (combined `@type` array) with
  `@id`, name, description, url, telephone, image, `priceRange`, address/areaServed (Santiago,
  CL), founder (Person: Nicolás Echeverría), `sameAs` (Instagram), and an honest
  `AggregateRating` (`ratingValue: 5.0`, `reviewCount: 3`) plus the 3 `Review` entries. Never
  inflate `reviewCount` or add reviews beyond the 3 real ones.

**CTA requirements:** WhatsApp CTA in the hero (immediately visible, no scroll needed) with
message `waEval`; additional WhatsApp CTAs after pricing (per-plan messages `waEval`/`waPlan`/
`waSingle`); discovery flow as the secondary path from the hero and from its own section;
mobile sticky CTA bar (`MobileCtaBar.astro`, <680px) with primary WhatsApp button + link to
`#descubre`; desktop/tablet floating WhatsApp button (`Footer.astro` `.btn-float-wa`) at the
same breakpoint boundary so the two never show simultaneously.

---

## `/servicios/` — Servicios

**Purpose:** Explain how sessions work, what's included, where they happen, and give clear
pricing. Per GSC data this page had ~50 impressions and 0 clicks at position ~49 — the
single biggest on-site SEO opportunity — so title/H1 must be explicit, local, and TRX-first.

**Content source:** inline HTML string in `pages.services.content` (`src/data/pages.ts`),
rendered via `set:html`.

**Required sections:**

1. Page hero (via `renderPageHero`): H1 "Clases de TRX a domicilio en Santiago", intro
   line, breadcrumb (Inicio → Servicios).
2. "Nuestros servicios" — pricing/service cards: Sesión individual ($15.000), Plan mensual
   ($160.000, featured "Más elegido"), TRX Suspension Trainer™ description, TRX Rip Trainer®
   description.
3. "¿Cómo reservar una clase?" — 3-step ordered list (WhatsApp → coordinate day/time → first
   class free) plus a note that equipment is not sold, Nico brings it.
4. "¿Qué es el entrenamiento TRX?" — explanatory paragraph, links to FAQ.
5. "¿Para quién es?" — 5-item audience grid (beginners, people with injuries, busy
   professionals, active athletes, people looking for a "TRX gym" alternative).
6. "¿Cómo es una sesión?" — session structure (~1 hour: warm-up → main TRX block → stretch/
   mobility), pre-session conversation about goals/injury history/availability, equipment
   note, link to `/sobre-mi/`.
7. CTA band — "La evaluación inicial es gratis y sin compromiso" + WhatsApp button.

**SEO requirements:**

- Title: `Clases de TRX a domicilio en Santiago: precios` (unique).
- Meta description: unique, mentions free evaluation, $15.000 single session, $160.000
  monthly plan, beginners/returning audience.
- Exactly one H1 ("Clases de TRX a domicilio en Santiago").
- Breadcrumb schema (Inicio → Servicios) plus page-level `Service` structured data: name
  "Clases de TRX en Santiago", provider (`LocalBusiness` reference), `areaServed` (Santiago,
  CL), `hasOfferCatalog` with 3 real `Offer` entries (evaluación $0, sesión individual
  $15.000, plan mensual $160.000, all `priceCurrency: CLP`).

**CTA requirements:** WhatsApp CTA band at the end of the page with message referencing "una
clase de TRX" and the free evaluation; internal links to FAQ and Sobre mí double as secondary
conversion-supporting paths (trust/objection-handling before contact).

---

## `/sobre-mi/` — Sobre mí

**Purpose:** Build trust in Nico as a person and professional — certification, 10+ years of
experience, and a calm/no-judgment/injury-aware approach — in first person.

**Content source:** `src/components/AboutContent.astro` (component-rendered, not
`pages.ts` HTML string — `pages.about` in `pages.ts` also holds equivalent content but per
`AGENTS.md`, Sobre mí renders through the component; treat `AboutContent.astro` as the
canonical source when editing this page's body copy).

**Required sections:**

1. Page hero: H1 "Tu entrenador TRX en Santiago", intro line naming the certifications and
   years of experience, breadcrumb (Inicio → Sobre mí).
2. Bio — photo + text: 10+ years as a personal trainer in Santiago, TRX method described,
   "cada persona es diferente" / no generic routines, no mass groups.
3. "Certificaciones" — TRX Suspension Trainer™ (official), TRX Rip Trainer® (official),
   certified group/individual training, 10+ years continuous practice in Santiago.
4. "¿Por qué elegir un entrenador TRX certificado?" — why certification matters (angle/
   tension adjustments, injury-risk reduction).
5. "Mi filosofía de entrenamiento" — exercise shouldn't be intimidating; TRX is infinitely
   adjustable; no joint impact; trains at home or in parks because environment matters, gym
   stress doesn't help performance.

**SEO requirements:**

- Title: `Nico Echeverría, entrenador TRX en Santiago` (unique).
- Meta description: unique, mentions certified TRX trainer, 10+ years, 1-on-1, low-impact
  method.
- Exactly one H1.
- Page-level `Person` structured data in `pages.ts` (`@id: .../sobre-mi/#person`): Nicolás
  Echeverría, `jobTitle`, `knowsAbout`, `hasCredential` (TRX Suspension Trainer™ / Rip
  Trainer® certificates), `worksFor` TRX Concept, `sameAs` Instagram, `areaServed` Santiago —
  implementing the `seo-content-plan.md` recommendation.

**CTA requirements:** No explicit standalone WhatsApp CTA band is present in
`AboutContent.astro` itself; the page relies on global CTAs (header/mobile sticky bar/footer
floating button) plus the "método TRX" link back to `/servicios/`, which itself ends in a
WhatsApp CTA band.

---

## `/preguntas-frecuentes/` — Preguntas frecuentes

**Purpose:** Resolve the real anxieties visitors have before contacting: prior experience,
equipment, safety with injuries, medical scope, coverage area, schedule, frequency,
cancellation policy, pricing, weight loss, equipment sales, and how to book.

**Content source:** inline HTML string in `pages.faq.content` (`src/data/pages.ts`), 14
`<details class="faq-item">` accordion entries, each mirroring one `Question`/`acceptedAnswer`
pair in the page's `structuredData`.

**Required sections:**

1. Page hero: H1 "Preguntas frecuentes sobre clases de TRX", intro linking to `/servicios/`
   and `/sobre-mi/`, breadcrumb (Inicio → Preguntas frecuentes).
2. 14 FAQ accordion items, each with a stable `id` matching its topic (e.g.
   `experiencia-previa`, `lesion-o-dolor-cronico`, `es-rehabilitacion`, `sectores-de-santiago`,
   `horarios-disponibles`, `frecuencia-semanal`, `cancelacion-de-sesion`, `primera-clase`,
   `precios`, `bajar-de-peso`, `donde-clases`, `venden-equipos`, `como-agendar`).
   Injury/medical-scope answers must use the safe-language framing from
   `docs/voice-and-tone.md` §9 (adapt with judgment, coordinate with a doctor/kinesiólogo when
   needed — never claim to treat, cure, or rehabilitate).

**SEO requirements:**

- Title: `Preguntas frecuentes sobre clases de TRX` (unique).
- Meta description: unique, mentions experience, equipment, schedules, pricing, booking,
  first class free.
- Exactly one H1.
- `FAQPage` structured data with 14 `Question`/`Answer` pairs whose text matches the visible
  `<details>` content verbatim (any copy edit to a visible answer must be mirrored in
  `structuredData`, and vice versa).

**CTA requirements:** No explicit WhatsApp CTA band on this page beyond the global CTAs
(header, mobile sticky bar, floating button); several answers (coverage, booking, pricing)
explicitly instruct the reader to message via WhatsApp.

---

## `/politica-de-cookies/` — Política de cookies

**Purpose:** Legal/consent disclosure page for cookie usage, required to support the consent
banner and GA4 gating; not a conversion page.

**Content source:** inline HTML string in `pages.cookies.content` (`src/data/pages.ts`).

**Required sections:** what cookies are; the cookie table (`site_consent` — 12 months,
necessary/preferences; `_ga`/`_ga_*` — up to 2 years, optional analytics, only loaded on
consent); how consent is managed (accept/reject banner, 12-month persistence); how to
withdraw consent ("Gestionar preferencias de cookies" in the footer, clears the cookie and
reloads); legal basis (Chilean Ley N.° 19.628).

**SEO requirements:**

- Title: `Política de Cookies y Consentimiento` (unique).
- Meta description: unique, describes cookie usage and preference management.
- `robots: noindex` — this page is intentionally excluded from indexing and from the sitemap
  (`astro.config.mjs` excludes `/politica-de-cookies/` by design).
- Exactly one H1.
- No structured data / no `LocalBusiness`-type schema on this page — it is a legal utility
  page, not a marketing page.

**CTA requirements:** None required beyond the global header/footer/sticky-bar CTAs; this
page's job is disclosure and consent control, not conversion.

---

## `/404`

**Purpose:** Recoverable dead-end for broken/removed URLs; keep the visitor inside the site
rather than losing them.

**Content source:** `src/pages/404.astro` (page object defined inline in the route file, not
in `pages.ts`).

**Required sections:** "404" label, H1 "Página no encontrada", explanatory line, a
`FuzzyRedirect` component (from `@jdevalk/astro-seo-graph`) suggesting a likely intended
page, and two actions: "Volver al inicio" (`/`) and "Ver servicios" (`/servicios/`).

**SEO requirements:** Title "Página no encontrada", `robots: noindex`, canonical set to
`https://trxconcept.cl/404.html`. Excluded from the sitemap by design
(`astro.config.mjs` excludes `404.html`). Exactly one H1.

**CTA requirements:** No WhatsApp CTA band on the 404 page itself; global header/mobile
sticky bar/floating button still apply since `BaseLayout` renders them; the two recovery
links (Home, Servicios) each lead to pages that do carry WhatsApp CTAs.

---

## Discovery flow — functional specification

Component: `src/components/DiscoveryFlow.astro`, mounted on Home at `#descubre`. Behavior
(state machine, message generation) lives in `public/assets/js/main.js`.

### Steps

A 3-step `<fieldset>` stepper inside one `<form data-discovery-form>`:

1. **Step 1 — Objetivo** ("¿Qué te gustaría lograr?"). Radio group `name="objetivo"`, values:
   `empezar` ("Empezar desde cero"), `retomar` ("Retomar el ejercicio"), `molestia`
   ("Entrenar cuidando una molestia"), `fuerza` ("Ganar fuerza y mejorar la postura").
2. **Step 2 — Molestia** ("¿Tienes alguna molestia o eres principiante?"). Radio group
   `name="molestia"`, values: `ninguna` ("Ninguna en particular"), `rodilla` ("Molestia de
   rodilla"), `espalda` ("Molestia de espalda"), `principiante` ("Soy principiante"), `otra`
   ("Otra, te la cuento"). Includes a hint line clarifying this is training with judgment, not
   medical treatment.
3. **Step 3 — Comuna + horario** ("¿Dónde y cuándo te acomoda?"). A `<select name="comuna">`
   with a fixed list: Providencia, Las Condes, Vitacura, Ñuñoa, La Reina, Lo Barnechea,
   Santiago Centro, Macul, Peñalolén, plus `otra comuna` ("Otra comuna") as a catch-all. A
   radio group `name="horario"` with values `mañanas`, `mediodía`, `tardes`.

Each step has a validation error message ("Elige una opción/un horario para seguir.") shown
inline; the step's legend carries `tabindex="-1"` so it can receive programmatic focus when a
step becomes active (accessibility requirement, see below).

### Progressive enhancement (hard requirement)

Without JavaScript, all three `<fieldset>` steps render stacked in the same form (no
step-hiding, no progress bar) and remain fully usable — a plain, always-visible WhatsApp
fallback link (`.discovery-fallback`, `https://wa.me/56984402664`, `data-wa`) sits below the
widget regardless of JS state. With JavaScript, `main.js` hides all but the active step, shows
a progress bar (`data-discovery-bar`), enables Next/Back navigation
(`data-discovery-next`/`data-discovery-back`), and reveals a result screen
(`data-discovery-result`) with a "Volver a empezar" restart button
(`data-discovery-restart`) on completion. This is a strict requirement: the flow must never
be the only way to reach WhatsApp — the fallback link must always be present and functional
even if JS fails to load or execute.

### Message generation

On completion (JS path), the result screen's WhatsApp link (`data-discovery-link`) gets its
`data-wa-msg` set from a client-side template built from the three answers, using this exact
format (must match `docs/voice-and-tone.md` §16.1 and `docs/conversion-strategy.md` §2
verbatim):

```
Hola Nico, vi el sitio de TRX Concept. {Objetivo}, {molestia} y entreno en {comuna} ({horario}). Me interesa la evaluación gratis.
```

Objetivo/molestia value-to-text mapping (must stay identical to the voice-and-tone source of
truth):

- **objetivo:** `empezar` → "quiero empezar desde cero" · `retomar` → "quiero retomar el
  ejercicio" · `molestia` → "quiero entrenar cuidando una molestia" · `fuerza` → "quiero ganar
  fuerza y mejorar mi postura"
- **molestia:** `ninguna` → "sin lesiones" · `rodilla` → "con una molestia de rodilla" ·
  `espalda` → "con una molestia de espalda" · `principiante` → "soy principiante" · `otra` →
  "con una molestia que te cuento"
- **comuna:** the selected `<select>` value verbatim (free text from the fixed list, or "otra
  comuna").
- **horario:** the selected radio value verbatim (`mañanas` / `mediodía` / `tardes`).

Example output: "Hola Nico, vi el sitio de TRX Concept. Quiero retomar el ejercicio, con una
molestia de rodilla y entreno en Ñuñoa (mañanas). Me interesa la evaluación gratis."

Rationale: every discovery-flow lead arrives at Nico already qualified (objetivo, molestia,
comuna, horario), shortening the WhatsApp exchange and increasing booking rate — see
`docs/conversion-strategy.md` §2.

---

## Accessibility and performance requirements

- **Keyboard operability.** All discovery-flow controls (radio inputs, the comuna `<select>`,
  Next/Back/Restart buttons, the result WhatsApp link) must be reachable and operable by
  keyboard alone; step legends carry `tabindex="-1"` specifically so JS can move focus to the
  newly active step when advancing, which is required for a usable keyboard/screen-reader
  experience across steps.
- **Visible focus states.** Interactive elements (nav links, CTA buttons, discovery-flow
  options, accordion `<summary>` triggers) must retain a visible focus indicator; this is
  covered by the project's Playwright + axe-core a11y suite (`tests/visual/a11y.spec.ts`,
  `npm run test:playwright:a11y`), which scans all pages for WCAG 2.1 AA violations.
- **Lighthouse thresholds (`.lighthouserc.cjs`).** Collected against `/`, `/servicios/`,
  `/sobre-mi/`, `/preguntas-frecuentes/` (single run each). All assertions are **warn-only** —
  they do not fail CI, but should be treated as build-breaking for any change that touches
  the affected surface:
  - `categories:performance` ≥ 0.8, `categories:accessibility` ≥ 0.9,
    `categories:best-practices` ≥ 0.9, `categories:seo` ≥ 0.9.
  - Core Web Vitals budgets: LCP ≤ 3500ms, CLS ≤ 0.1, TBT ≤ 200ms.
  - Known, monitored-but-not-blocking issues: `color-contrast`,
    `label-content-name-mismatch`, `heading-order`, `lcp-lazy-loaded`, `errors-in-console`,
    `robots-txt`, `uses-responsive-images`, `modern-image-formats`,
    `render-blocking-resources`.
  - Several Lighthouse "insight" audits are explicitly turned off as informational-only:
    `network-dependency-tree-insight`, `image-delivery-insight`, `dom-size-insight`,
    `lcp-discovery-insight`, `render-blocking-insight`, `forced-reflow-insight`.
- **Mobile-first.** Google Search Console data shows mobile dominates impressions and
  converts at roughly double the desktop CTR (`docs/search-console-insights.md`) — the sticky
  mobile CTA bar (`MobileCtaBar.astro`, <680px) and mobile-first layout are load-bearing
  product requirements, not just responsive-design nice-to-haves.

## Current status

This PRD reflects the **July 2026 redesign baseline**: the hybrid WhatsApp-primary +
discovery-flow-secondary conversion model, the current 5-page + 404 route set, and the
current SEO/structured-data setup per page as implemented in `src/data/pages.ts`,
`src/components/HomeContent.astro`, `src/components/AboutContent.astro`, and
`src/components/DiscoveryFlow.astro` at the time of writing. Known gap: Sobre mí has no
page-level `structuredData` (`Person` schema) yet, despite `docs/seo-content-plan.md`
recommending one — treat that as a backlog item, not a documentation error.
