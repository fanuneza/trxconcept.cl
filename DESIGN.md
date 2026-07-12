---
name: TRX Concept
description: Clases de TRX 1 a 1 en Santiago, a domicilio o al aire libre. Modo oscuro fijo.
colors:
  bg: "#0a0a0a"
  surface: "#111111"
  surface-raised: "#181818"
  surface-hover: "#202020"
  accent: "#f9fe05"
  accent-dim: "#d9e005"
  text: "#f5f5f5"
  text-muted: "rgba(245, 245, 245, 0.72)"
  text-subtle: "rgba(245, 245, 245, 0.48)"
  border: "rgba(255, 255, 255, 0.1)"
  border-strong: "rgba(255, 255, 255, 0.18)"
  error: "#ff6b6b"
  success: "#51cf66"
typography:
  display:
    fontFamily: "Bebas Neue, Impact, Arial Black, sans-serif"
    fontSize: "clamp(3rem, 9vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.94
    letterSpacing: "normal"
  headline:
    fontFamily: "Bebas Neue, Impact, Arial Black, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "normal"
  title:
    fontFamily: "Source Sans 3, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Source Sans 3, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Source Sans 3, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "normal"
  small:
    fontFamily: "Source Sans 3, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  caption:
    fontFamily: "Source Sans 3, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "normal"
  body-sm:
    fontFamily: "Source Sans 3, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  lead:
    fontFamily: "Source Sans 3, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  h3:
    fontFamily: "Source Sans 3, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
  price:
    fontFamily: "Bebas Neue, Impact, Arial Black, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
  hero-min:
    fontFamily: "Bebas Neue, Impact, Arial Black, sans-serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
  meta:
    fontFamily: "Source Sans 3, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  kicker:
    fontFamily: "Source Sans 3, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
  body-lg:
    fontFamily: "Source Sans 3, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  footnote:
    fontFamily: "Source Sans 3, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  quote:
    fontFamily: "Georgia, serif"
    fontSize: "2.5rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
typeRamp:
  - "clamp(3rem, 9vw, 6rem)"
  - "clamp(2.5rem, 5vw, 4rem)"
  - "clamp(2rem, 4vw, 3rem)"
  - "2.5rem"
  - "1.75rem"
  - "1.5rem"
  - "1.2rem"
  - "1.15rem"
  - "1.125rem"
  - "1.1rem"
  - "1.05rem"
  - "1rem"
  - "0.95rem"
  - "0.9rem"
  - "0.85rem"
  - "0.8rem"
  - "0.75rem"
rounded:
  pill: "999px"
  card: "0.75rem"
  control: "0.5rem"
  sm: "0.25rem"
spacing:
  section: "clamp(4rem, 8vw, 8rem)"
  container: "1180px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.75rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-dim}"
    textColor: "{colors.bg}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.75rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    borderColor: "{colors.border-strong}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.75rem"
  button-outline-light:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    borderColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.75rem"
  button-whatsapp:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    borderColor: "{colors.accent}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
  pricing-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    borderColor: "{colors.border}"
    rounded: "{rounded.card}"
    padding: "2rem 1.5rem"
  testimonial-card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.card}"
    padding: "1.75rem 1.5rem"
  discovery-card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
    borderColor: "{colors.border}"
    rounded: "{rounded.card}"
    padding: "1.75rem 1.5rem"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    borderColor: "{colors.border-strong}"
    rounded: "{rounded.control}"
    padding: "0.8rem 1rem"
---

# Design System: TRX Concept

## 1. Overview

**Creative North Star: "Entrenar con criterio, sin ruido"**

TRX Concept is not a gym brand. The interface should feel like the opposite of hardcore fitness marketing: human, unpretentious, and local. The new dark mode puts the content and the conversion path front and center; the yellow accent works as a flashlight, not a spotlight.

The aesthetic rejects luxury gloss, body-transformation framing, and SaaS landing-page conventions. There are no gradients, no glass cards, no hero metrics, and no tiny uppercase eyebrows above every section. Motion is restrained and always respects `prefers-reduced-motion`. Every surface is built to lower anxiety: clear type, generous whitespace, obvious CTAs, and honest limits.

**Key Characteristics:**

- Dark mode fixed. A single saturated yellow does almost all the accent work.
- Display type is bold and uppercase; body type is warm and readable.
- Buttons are pill-shaped; cards are softly rounded rectangles.
- Surfaces rest flat; depth arrives through hover and accent borders, not decoration.
- Mobile-first conversion: sticky bottom bar replaces floating buttons on small screens.
- Accessibility is a core feature, not an afterthought.

## 2. Colors

The palette is intentionally small. A single saturated yellow carries the brand voice; everything else is neutral ink, surface, and text.

### Primary

- **Accent** (`#f9fe05`): The brand anchor. Primary CTA buttons, featured-card borders, badges, focus rings, and key emphasis. It should feel energetic and optimistic, not aggressive or "sale" yellow.
- **Accent Dim** (`#d9e005`): Hover state for accent surfaces.

### Neutral

- **Background** (`#0a0a0a`): Page background. The near-black ground makes the accent and photography pop.
- **Surface** (`#111111`): Card backgrounds, header bar, footer.
- **Surface Raised** (`#181818`): Elevated cards and discovery form background.
- **Surface Hover** (`#202020`): Hover states for surfaces.
- **Text** (`#f5f5f5`): Primary text on dark backgrounds.
- **Text Muted** (`rgba(245, 245, 245, 0.72)`): Secondary body text and descriptions.
- **Text Subtle** (`rgba(245, 245, 245, 0.48)`): Captions, metadata, photo credits.
- **Border** (`rgba(255, 255, 255, 0.1)`): Card borders, dividers, and subtle boundaries.
- **Border Strong** (`rgba(255, 255, 255, 0.18)`): Input borders and outlined buttons.
- **Error** (`#ff6b6b`): Form validation errors only.
- **Success** (`#51cf66`): Success states only.

### Named Rules

**The One Voice Rule.** Accent yellow is the only saturated hue. Do not introduce a second bright color (teal, orange, purple) anywhere in the UI. If you need emphasis, use weight, size, or surface variation.

**The Yellow-Is-Action Rule.** Use the accent for actionable surfaces and wayfinding (primary buttons, badges, selected states, focus rings). Do not use it for large passive backgrounds or decorative fills.

## 3. Typography

**Display Font:** Bebas Neue, Impact, Arial Black, sans-serif  
**Body Font:** Source Sans 3, Helvetica Neue, Arial, sans-serif

**Character:** Bebas Neue supplies confident, uppercase display voice for headlines; Source Sans 3 provides the calm, readable body. The pairing is high contrast in weight and case, chosen for clarity rather than editorial affectation.

### Hierarchy

- **Display** (400, `clamp(3rem, 9vw, 6rem)`, line-height 0.94): Hero headline. Always uppercase. Keep it under `20ch` and use `text-wrap: balance`.
- **Headline** (400, `clamp(2.5rem, 5vw, 4rem)`, line-height 0.96): Major section headlines and page H1s. Always uppercase.
- **Title** (700, `1.5rem`, line-height 1.3): Card titles, section H2s, FAQ summaries, and list headings.
- **Body** (400, `1.125rem`, line-height 1.65): Paragraphs, descriptions, and answers. Keep line length at roughly 65–75ch for comfortable reading.
- **Label** (700, `0.95rem`, line-height 1.4): Badges, chip text, pricing notes, captions, and button labels.
- **Small** (400, `0.85rem`, line-height 1.5): Helper text and metadata.
- **Caption** (700, `0.75rem`, line-height 1.4): Photo credits and microcopy.

### Named Rules

**The Uppercase-Display-Only Rule.** Uppercase display treatment is reserved for Bebas Neue headlines. Never set body copy, card titles, or navigation in all caps.

**The Short-Line Rule.** Headlines and hero text should stay under `25ch` and use `text-wrap: balance` to avoid ragged or overflowed lines on narrow viewports.

## 4. Elevation

The system is flat by default. Depth is not used decoratively; it appears as a response to state or to separate a floating action from the page.

### Shadow Vocabulary

- **Card shadow** (`box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18)`): Resting elevation for featured cards and discovery card.
- **Raise shadow** (`box-shadow: 0 6px 18px rgba(0, 0, 0, 0.24)`): Hover/focus lift for primary buttons and interactive cards.
- **Accent glow** (`box-shadow: 0 4px 20px var(--accent-alpha-25)`): Focus glow for the featured pricing card.
- **Floating button shadow** (`box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25)`): Desktop floating WhatsApp button only. Increases to `0 8px 24px rgba(0, 0, 0, 0.3)` on hover.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only on hover, focus, or when a persistent floating action needs to sit above content.

**The One-Pixel Border Rule.** When a card needs a boundary, use `1px` solid Border. Avoid heavy borders or colored side-stripes as accents.

## 5. Components

### Buttons

- **Shape:** Pill (`border-radius: 999px`).
- **Primary:** Accent background, Background text, `0.9rem 1.75rem` padding. Used for the main CTA ("Agendar evaluación gratis") and discovery-flow send action.
- **Primary hover:** Accent Dim background, translate `-2px` vertically, and add the raise shadow.
- **Outline:** Transparent background, Text color, `1px` Border Strong border. Used for secondary pricing CTAs.
- **Outline-light:** Transparent background, Text color, `1px` Text border. Used on the hero for the secondary discovery-flow entry.
- **WhatsApp:** Transparent background, Text color, Accent border. Used for header and inline CTAs.

### Cards / Containers

- **Corner style:** `0.75rem` radius.
- **Pricing card:** Surface background, `1px` Border border, optional featured state with Accent border and accent glow.
- **Testimonial card:** Surface Raised background, no border, `1.75rem 1.5rem` padding.
- **Discovery card:** Surface Raised background, `1px` Border border, `1.75rem 1.5rem` padding.
- **Fit / method cards:** Surface Raised background, `0.75rem` radius, `1.5rem` padding.

## 6. Responsive Behavior

- **Desktop (>= 1024px):** Full navigation, side-by-side method section, three-column pricing, floating WhatsApp button.
- **Tablet (768px–1023px):** Stacked sections, two-column pricing or single column, hamburger navigation.
- **Mobile (< 768px):** Single column, sticky bottom CTA bar replaces floating WhatsApp button, hero image uses a portrait crop focused on the subject.

## 7. Accessibility

- Body text must maintain ≥ 4.5:1 contrast against Background.
- Large text (≥ 18px or bold ≥ 14px) must maintain ≥ 3:1 contrast.
- Focus rings use `2px` solid Accent with `2px` offset.
- All motion respects `prefers-reduced-motion`.
