# Auditoría de refactor de mantenibilidad

> Refactor conducido siguiendo `coding-styling-guidelines.md`.
> Objetivo: hacer el codebase más ligero, claro y consistente preservando comportamiento, SEO, accesibilidad y voz de marca.

## Baseline (2026-07-10)

- `git status`: working tree limpio, sin modificaciones previas.
- `npm run format:check`: ✅
- `npm run lint`: ✅
- `npm run check`: ✅ (0 errores, 0 warnings, 0 hints)
- `npm run build`: ✅ (solo warnings benignos preexistentes de `markdownAlternate`)
- Tests no ejecutados aún en baseline; se correrán tras cada paso que toque superficie relevante.

## Hallazgos principales

### 1. Duplicación significativa en `src/data/pages.ts`

- **FAQ duplicado**: las 14 preguntas/respuestas existen dos veces: una en `structuredData` (JSON-LD FAQPage) y otra en `content` como `<details class="faq-item">`. Cualquier cambio futuro debe editarse en dos lugares.
- **Servicios/precios duplicados**: en `/servicios` los planes y precios aparecen en `structuredData.hasOfferCatalog` (OfferCatalog) y en `content` como cards HTML. Los mensajes de WhatsApp para cada plan también se repiten en `HomeContent.astro`.
- **Hero de página duplicado**: `renderPageHero` y `renderBreadcrumb` son helpers locales que podrían compartirse o al menos usar la misma fuente de breadcrumb que el `structuredData`.

### 2. Convención de nombres CSS inconsistente con BEM

El proyecto no sigue BEM de forma sistemática. Ejemplos de clases que deberían migrarse:

| Actual                            | Propuesto BEM                  |
| --------------------------------- | ------------------------------ |
| `.btn-whatsapp`                   | `.btn--whatsapp`               |
| `.btn-trx`                        | `.btn--trx`                    |
| `.btn-outline-light`              | `.btn--outline-light`          |
| `.btn-ghost`                      | `.btn--ghost`                  |
| `.pricing-card-featured`          | `.pricing-card--featured`      |
| `.service-card--featured`         | ya casi BEM, mantener          |
| `.nav-open` (clase en `<ul>`)     | `.is-open` o `.nav-list--open` |
| `.scrolled` (clase en `<header>`) | `.is-scrolled`                 |
| `.has-error` (clase en fieldset)  | ya es estado `has-*`, mantener |
| `.is-active` (clase en step)      | ya es estado `is-*`, mantener  |
| `.is-enhanced` (clase en card)    | ya es estado `is-*`, mantener  |
| `.is-visible` (clase en banner)   | ya es estado `is-*`, mantener  |

### 3. Código muerto / candidatos

- `public/assets/css/style.min.css` es generado por `scripts/sync-css.mjs`; no debe editarse a mano. Está correctamente ignorado por git.
- `src/env.d.ts` no exporta nada; es necesario para tipos de Astro.
- `PricingCard.astro` recibe `description?: string` pero en home no se usa; en servicios no se usa `PricingCard`. No es dead code, es una variante no usada actualmente pero válida.
- `site.whatsappHref` se exporta como string ya resuelta, no como función. Funciona, pero dificulta reuso con mensajes dinámicos.

### 4. Complejidad

- `src/data/pages.ts` (~678 líneas) mezcla datos, metadatos SEO y markup HTML. Es intencional según `AGENTS.md` (no hay content collections), pero se puede reducir duplicación generando FAQ y servicios desde una fuente común.
- `main.js::showStep` y `main.js::finish` tienen complejidad ciclomática alta según `jCodeMunch`.
- `schema.ts::mergeStructuredData` usa `void _unusedCtx` para silenciar una variable; se puede simplificar con destructuring directo.

### 5. Magic values / hardcoded

- Número de WhatsApp hardcodeado en `main.js` (`56984402664`) aunque ya viene de `site.ts` vía `data-wa-default-msg`.
- Mensajes de WhatsApp hardcodeados en `HomeContent.astro` y en `pages.ts`.

## Plan de pasos

1. **Extraer fuentes comunes de datos**
   - Crear arrays tipados para FAQ y servicios en `src/data/pages.ts`.
   - Generar `structuredData` y `content` desde esos arrays.
   - Reducir mensajes de WhatsApp duplicados reutilizando constantes.

2. **Simplificar `src/utils/schema.ts` y `src/data/site.ts`**
   - Eliminar `void _unusedCtx` en `mergeStructuredData`.
   - Cambiar `site.whatsappHref` a función exportada `getWhatsAppHref(message?)`.
   - Actualizar consumidores (`WhatsAppLink.astro`, `Header.astro`, `Footer.astro`, `MobileCtaBar.astro`).

3. **Simplificar `WhatsAppLink.astro`**
   - Evitar duplicar el SVG; renderizar una sola vez.

4. **Migrar CSS a BEM (selectores de componentes propios)**
   - Modificadores de botón: `.btn--whatsapp`, `.btn--trx`, `.btn--outline-light`, `.btn--ghost`.
   - Modificador de card: `.pricing-card--featured`.
   - Estados: `.site-header.is-scrolled`, `.nav-list.is-open`.
   - Actualizar markup en componentes, HTML generado en `pages.ts`, y selectores en `main.js`.

5. **Consolidar estilos duplicados**
   - Unificar estilos base de `.service-card` y `.pricing-card` mediante una clase compartida (por ejemplo `.card`) o custom properties, sin cambiar visualmente.

6. **Simplificar `main.js`**
   - Leer número de WhatsApp de un `data-*` en `<html>` para evitar duplicar.
   - Reducir anidamiento y repetición en event listeners del menú.
   - Usar `const`/`let` modernos donde no rompa compatibilidad (los scripts ya usan IIFE; el target es navegadores modernos).

7. **Verificaciones finales**
   - `npm run format:check`, `npm run lint`, `npm run check`, `npm run build`.
   - `npm run test:playwright:a11y` si se tocan selectores o componentes interactivos.
   - Revisar diff completo para asegurar que no hay cambios no relacionados.

## Riesgos y restricciones

- No migrar a content collections (prohibido por arquitectura del proyecto).
- No cambiar voz, precios, comunas, datos de contacto, ni claims médicos.
- No eliminar `style.min.css` ni modificar a mano; siempre regenerar vía `sync-css.mjs`.
- No modificar dependencias ni actualizar versiones.
- Preservar atributos `data-wa`, `data-wa-msg`, `data-discovery-*` porque son los hooks de JS.
