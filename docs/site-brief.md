# Site brief — TRX Concept

Business and product framing for trxconcept.cl. This is not a copy-style guide (see
`docs/voice-and-tone.md`) and not a feature/page inventory (see `docs/prd.md` and
`docs/feature-inventory.md`). It answers: what is this business, who is it for, what is the
site supposed to achieve, and what is deliberately out of scope.

---

## 1. What TRX Concept is

TRX Concept is the 1-on-1 personal training practice of Nicolás Echeverría ("Nico"), a
certified TRX Suspension Trainer™ and TRX Rip Trainer® with 10+ years of experience training
people in Santiago, Chile. Sessions happen at the client's home or in nearby parks — never in
a fixed gym, never in group classes, and never on machines. Nico brings the TRX equipment to
every session. Coverage is Santiago, mainly the sectores oriente and centro; the client's
exact comuna is confirmed over WhatsApp. trxconcept.cl is the small marketing/lead-generation
website for this practice — a static Astro site with no backend, no e-commerce, and no
booking system.

## 2. Business goals for the website

- Capture organic search traffic for the demand that actually exists: TRX-branded and
  local-intent queries ("clases de trx", "trx cerca de mi", "gimnasio trx", "trx santiago/chile"),
  not generic "entrenador personal" terms, which have near-zero real search volume (see
  `docs/search-console-insights.md`).
- Let visitors self-qualify quickly — understand within seconds whether this service fits
  their situation (beginner, returning, dealing with an injury, time-poor, etc.) without
  reading a wall of copy.
- Convert visitors into WhatsApp conversations, and from there into booked free first
  sessions. The website's only meaningful conversion event is starting a WhatsApp chat; there
  is no on-site checkout, form submission, or account creation.

## 3. Audience segments

Six segments, each arriving with a distinct emotional state (fear of judgment, distrust of
gyms, time scarcity, fear of re-injury, desire for safe autonomy, or boredom/disconnection
from movement): absolute beginners or people returning after a long break; people who dislike
or fear gyms; busy professionals; people with knee/back concerns who need careful
progression; older adults seeking strength, balance, and confidence; desk/tech workers who
want to move and get outdoors. The full breakdown — segment-by-segment emotional state and
the "emotional job" the copy has to solve — lives in `docs/voice-and-tone.md` §2 and §4; do
not duplicate it here.

## 4. Core promise / positioning statement

> "Entrenamiento personal 1 a 1, seguro y humano, en Santiago, para personas que quieren
> empezar o retomar el ejercicio sin presión de gimnasio, sin miedo a lesionarse y sin
> rutinas genéricas."

English gloss (for reference only — never use as site copy): "Safe, human, 1-on-1 personal
training in Santiago for people who want to start or return to exercise without gym pressure,
injury fear, or generic routines."

## 5. What this site explicitly is NOT

Not positioned as: luxury fitness, hardcore functional training, body-transformation
aesthetics, gym-bro motivation, medical rehabilitation, a generic TRX equipment vendor, or a
SaaS landing page.

This matters directly for scope decisions:

- **No luxury visual language.** No "premium", "exclusivo", high-gloss aspirational imagery,
  or scarcity/status framing in copy, design, or new features.
- **No body-transformation testimonial framing.** Testimonials (only 3 real ones exist — see
  §8) must never be edited or captioned to imply before/after body change; keep them about
  consistency, confidence, posture, and process, as they were actually given.
  See `docs/voice-and-tone.md` §15.
- **No medical claims.** Never imply diagnosis, treatment, or rehabilitation. Injury-adjacent
  copy stays in "we adapt, and coordinate with your doctor/kinesiólogo when needed" language
  (`docs/voice-and-tone.md` §9), not "we heal/fix/cure".
  See `docs/voice-and-tone.md` §9.
- **No gym-bro or hardcore-functional framing.** No "no excuses", intensity-as-virtue, or
  competitive framing — this contradicts the calm/no-judgment promise for the anxious
  segments this business actually serves.
- **No equipment-sales or SaaS-landing patterns.** No product catalog, no pricing-tiers-as-
  software-plans UI conventions, no "sign up" flows — the only "product" is a WhatsApp
  conversation and a free assessment.

## 6. Constraints

- **Solo trainer.** No team, no franchise, no multi-location structure. All copy and schema
  (`Person`, `founder`) reflect one named individual, Nicolás Echeverría.
- **Santiago-only service area**, concentrated in sectores oriente and centro. Do not imply
  national or multi-city coverage.
- **No e-commerce or equipment sales.** The FAQ and Servicios pages explicitly say Nico does
  not sell TRX equipment; he brings his own to every session.
- **No booking or payment system.** Scheduling and payment happen off-site, coordinated
  directly over WhatsApp. Do not add an on-site calendar, checkout, or payment integration.
- **Chilean Spanish only, no i18n.** The site has one locale (`es-CL`) and no plans for
  additional languages or region variants.

## 7. Success metrics

Tracked at the CTA/conversion-funnel level, not as a separate metrics system on-site:
WhatsApp CTA click-through rate, discovery-flow completion rate, qualified-lead rate (leads
arriving with objetivo/molestia/comuna/horario already stated), and free-assessment booking
rate. Full metric definitions, why each matters, and how to compare the direct WhatsApp CTA
against the 3-step discovery flow are in `docs/conversion-strategy.md` §4.

## 8. Non-goals

- **No blog or content-marketing plan currently.** `docs/seo-content-plan.md` identifies
  *where demand exists* for future content, but there is no editorial calendar, blog
  section, or content-collection infrastructure in this repo today.
- **No multi-trainer scaling.** The site, its schema, and its voice assume a single named
  trainer indefinitely; do not add trainer-selection or team-profile patterns speculatively.
- **No client portal or app.** No login, no session history, no client-facing dashboard.
  Every interaction beyond browsing the marketing site happens over WhatsApp.
- **Only 3 real testimonials exist** (Valentina Rosenthal, Marisa Gracia, María Ignacia
  Williamson). Do not imply a larger review base, and do not fabricate an aggregate rating
  beyond the honest `ratingValue: 5.0, reviewCount: 3` already in the Home page's
  `structuredData` (`src/data/pages.ts`).
