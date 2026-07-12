---
name: TRX Concept
description: Clases de TRX 1 a 1 en Santiago, a domicilio o al aire libre.
colors:
  santiago-morning-sun: "#ffd700"
  ink: "#000000"
  paper: "#ffffff"
  calm-gray: "#f5f5f5"
  border-gray: "#ededed"
  body-gray: "#444444"
  note-gray: "#555555"
  whatsapp-green: "#25d366"
  error-red: "#c0392b"
typography:
  display:
    fontFamily: "Anton, Impact, Arial Black, sans-serif"
    fontSize: "clamp(2.2rem, 5vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "0.02em"
  headline:
    fontFamily: "Anton, Impact, Arial Black, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "0.04em"
  title:
    fontFamily: "Montserrat, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "Montserrat, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Montserrat, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  pill: "999px"
  card: "1rem"
  control: "0.6rem"
spacing:
  section: "clamp(2rem, 5vw, 4rem)"
  container: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.santiago-morning-sun}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
  button-primary-hover:
    backgroundColor: "#e6c200"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
  button-whatsapp:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
  button-whatsapp-hover:
    backgroundColor: "#111111"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
  pricing-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "2rem 1.5rem"
  testimonial-card:
    backgroundColor: "{colors.calm-gray}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "2rem 1.5rem"
  discovery-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "1.75rem 1.5rem"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.7rem 0.8rem"
---

# Design System: TRX Concept

## 1. Overview

**Creative North Star: "The Calm Gym Alternative"**

TRX Concept is not a gym brand. The interface should feel like the opposite of hardcore fitness marketing: human, unpretentious, and local. Visual density is moderate — enough structure to guide a nervous visitor, never so much that it feels like a sales funnel. The system relies on a single high-energy accent (Santiago Morning Sun) against a near-neutral ground, so the brand reads as confident without shouting.

The aesthetic rejects luxury gloss, body-transformation framing, and SaaS landing-page conventions. There are no gradients, no glass cards, no hero metrics, and no tiny uppercase eyebrows above every section. Motion is restrained and always respects `prefers-reduced-motion`. Every surface is built to lower anxiety: clear type, generous whitespace, obvious CTAs, and honest limits.

**Key Characteristics:**

- One accent color does almost all the visual work.
- Display type is bold and uppercase; body type is warm and readable.
- Buttons are pill-shaped; cards are softly rounded rectangles.
- Surfaces rest flat; depth arrives through hover, not decoration.
- Mobile-first conversion: sticky bottom bar replaces floating buttons on small screens.
- Accessibility is a core feature, not an afterthought.

## 2. Colors

The palette is intentionally small. A single saturated yellow carries the brand voice; everything else is neutral ink, paper, and a calm gray family.

### Primary

- **Santiago Morning Sun** (`#ffd700`): The brand anchor. Used for the fixed header background, primary CTA buttons, featured-card borders, badges, process-number circles, and key emphasis. It should feel warm and optimistic, not aggressive or "sale" yellow.

### Neutral

- **Ink** (`#000000`): Primary text on light backgrounds, footer background, WhatsApp-primary button background, and focus rings. Use at full weight for headings and UI chrome.
- **Paper** (`#ffffff`): Page background, card backgrounds, and text on dark surfaces (footer, page hero, mobile sticky bar).
- **Calm Gray** (`#f5f5f5`): Alternate section backgrounds, testimonial cards, and fit/method cards. The system relies on this tone to create rhythm without introducing new hues.
- **Border Gray** (`#ededed`): Card borders, dividers, and subtle boundaries.
- **Body Gray** (`#444444`): Secondary body text and descriptions where full ink would feel too heavy.
- **Note Gray** (`#555555`): Captions, hints, and metadata.
- **WhatsApp Green** (`#25d366`): Reserved exclusively for the floating WhatsApp button. Do not use it elsewhere.
- **Error Red** (`#c0392b`): Form validation errors only.

### Named Rules

**The One Voice Rule.** Santiago Morning Sun is the only saturated accent. Do not introduce a second bright color (teal, orange, purple) anywhere in the UI. If you need emphasis, use weight, size, or ink — never a competing hue.

**The Yellow-Is-Action Rule.** Use the primary yellow for actionable surfaces and wayfinding (header, primary buttons, badges, selected states). Do not use it for large passive backgrounds or decorative fills.

## 3. Typography

**Display Font:** Anton, Impact, Arial Black, sans-serif  
**Body Font:** Montserrat, Helvetica Neue, Arial, sans-serif

**Character:** Anton supplies confident, uppercase display voice for the logo and page headlines; Montserrat provides the calm, readable body. The pairing is high contrast in weight and case, but both are sans-serifs chosen for clarity rather than editorial affectation.

### Hierarchy

- **Display** (400, `clamp(2.2rem, 5vw, 3.5rem)`, line-height 1.1, letter-spacing `0.02em`): Hero headlines and major page H1s. Always uppercase. Used inside the hero and page hero only.
- **Headline** (400, `clamp(2rem, 5vw, 3rem)`, line-height 1.1, letter-spacing `0.04em`): Section H1s on inner pages. Always uppercase. Use sparingly.
- **Title** (700, `1.25rem`, line-height 1.4): Card titles, section H2s, FAQ summaries, and list headings.
- **Body** (400, `1rem`, line-height 1.6): Paragraphs, descriptions, and answers. Keep line length at roughly 65–75ch for comfortable reading.
- **Label** (600, `0.9rem`, line-height 1.4): Badges, chip text, pricing notes, captions, and button labels.

### Named Rules

**The Uppercase-Display-Only Rule.** Anton uppercase treatment is reserved for the logo and H1-level display text. Never set body copy, card titles, or navigation in all caps.

**The Short-Line Rule.** Headlines and hero text should stay under `25ch` and use `text-wrap: balance` to avoid ragged or overflowed lines on narrow viewports.

## 4. Elevation

The system is flat by default. Depth is not used decoratively; it appears as a response to state or to separate a floating action from the page.

### Shadow Vocabulary

- **Card shadow** (`box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06)`): Resting elevation for featured cards and discovery card. Subtle enough to read as a boundary, not a lift.
- **Raise shadow** (`box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18)`): Hover/focus lift for primary buttons, WhatsApp buttons, and interactive cards.
- **Floating button shadow** (`box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25)`): Desktop floating WhatsApp button only. Increases to `0 8px 24px rgba(0, 0, 0, 0.3)` on hover.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only on hover, focus, or when a persistent floating action needs to sit above content.

**The One-Pixel Border Rule.** When a card needs a boundary, use `1px` or `2px` solid Border Gray. Avoid heavy borders or colored side-stripes as accents.

## 5. Components

### Buttons

- **Shape:** Pill (`border-radius: 999px`).
- **Primary:** Santiago Morning Sun background, Ink text, `0.75rem 1.5rem` padding. Used for the main CTA ("Agendar evaluación gratis") and discovery-flow send action.
- **Primary hover:** Darken the yellow toward `#e6c200`, translate `-1px` vertically, and add the raise shadow.
- **WhatsApp:** Ink background, Paper text, pill shape. Used for header and inline CTAs.
- **WhatsApp hover:** Slightly lighter ink (`#111111`), `-1px` lift, raise shadow.
- **Ghost:** Transparent background, Ink text, `2px` Border Gray border. Used for secondary actions like "Atrás" in the discovery flow.
- **Outline-light:** Transparent background, Paper text, `2px` Paper border. Used on the hero for the secondary discovery-flow entry.

### Cards / Containers

- **Corner style:** `1rem` radius.
- **Pricing card:** Paper background, `2px` Border Gray border, optional featured state with Santiago Morning Sun border and card shadow. Internal padding `2rem 1.5rem`.
- **Testimonial card:** Calm Gray background, no border, `2rem 1.5rem` padding.
- **Discovery card:** Paper background, `2px` Border Gray border, card shadow, `1.75rem 1.5rem` padding.
- **Fit / method / audience cards:** Calm Gray background, `1rem` radius, `1.5rem 1.25rem` padding.

### Inputs / Fields

- **Style:** Paper background, `2px` Border Gray border, `0.6rem` radius, `0.7rem 0.8rem` padding.
- **Focus:** `2px` Ink outline with `2px` offset.
- **Select:** Custom chevron SVG, same border treatment.
- **Radio / checkbox options:** Bordered pill-like rows that highlight with a light yellow tint when selected.

### Navigation

- **Header:** Fixed top bar with Santiago Morning Sun background. Logo (SVG + Anton wordmark) on the left, centered text nav, WhatsApp CTA on the right.
- **Nav links:** Ink text, `0.95rem`, bold. Hover and current-page state use reduced opacity (`0.72`).
- **Mobile:** Hamburger button reveals a dropdown panel that inherits the yellow background. The header WhatsApp CTA remains visible; the floating WhatsApp button is hidden and replaced by the sticky mobile CTA bar.

### Discovery Flow (signature component)

A three-step fieldset stepper that progressively enhances with JavaScript. Without JS, all steps stack with a permanent plain-WhatsApp fallback. With JS, only the active step is visible, with a progress bar and back/next navigation.

- Step options render as bordered rows with radio/checkbox inputs.
- Selected options get a Santiago Morning Sun border and a very light yellow background (`color-mix(in srgb, #ffd700, #fff 82%)`).
- The result screen offers a pre-filled WhatsApp CTA and a restart button.

### Cookie Banner

- Fixed bottom bar with Ink background and Paper text.
- Accept button uses Santiago Morning Sun; reject button is transparent with a Paper border.
- On mobile, the banner sits above the sticky CTA bar so both actions remain reachable.

## 6. Do's and Don'ts

### Do:

- **Do** use Santiago Morning Sun for the header, primary CTAs, badges, and selected states.
- **Do** pair Anton display type with Montserrat body; keep Anton uppercase and headline-only.
- **Do** keep body text in Ink or Body Gray on Paper or Calm Gray backgrounds.
- **Do** use pill-shaped buttons for every CTA.
- **Do** make every WhatsApp CTA say what happens next ("Agendar evaluación gratis", "Consultar el plan").
- **Do** respect `prefers-reduced-motion` by disabling animations and smooth scrolling.
- **Do** maintain a semantic z-index scale (header → dropdown → cookie banner → mobile sticky bar → floating button) instead of arbitrary values.

### Don't:

- **Don't** use `border-left` or `border-right` greater than `1px` as a colored accent on cards, callouts, list items, or alerts.
- **Don't** introduce a second saturated accent color.
- **Don't** use gradient text (`background-clip: text`), glassmorphism, or decorative blurs.
- **Don't** use arbitrary z-index values like `999`.
- **Don't** use the hero-metric template (big number + small label + supporting stats).
- **Don't** add tiny uppercase tracked eyebrows above every section.
- **Don't** use numbered section markers as default scaffolding across the site.
- **Don't** use generic AI fitness copy, gym-bro motivation, or body-transformation framing.
- **Don't** use WhatsApp Green anywhere except the floating WhatsApp button.
- **Don't** set body copy, card titles, or navigation in all caps.
