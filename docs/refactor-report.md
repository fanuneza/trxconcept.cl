# Reporte de refactor de mantenibilidad

> Aplicación de `coding-styling-guidelines.md` al sitio Astro `trxconcept.cl`.

## Resumen ejecutivo

Se realizó un refactor de mantenibilidad enfocado en reducir duplicación, estandarizar nomenclatura CSS bajo BEM, simplificar lógica cliente y preservar comportamiento, SEO, accesibilidad y voz de marca. No se cambiaron dependencias, diseño visual, rutas, datos de contacto, precios ni claims médicos.

## Baseline

- Fecha: 2026-07-10
- `git status`: working tree limpio
- `npm run format:check`: ✅
- `npm run lint`: ✅
- `npm run check`: ✅ (0 errores, 0 warnings, 0 hints)
- `npm run build`: ✅ (warnings benignos preexistentes de `markdownAlternate`)

## Comandos de verificación usados

```bash
npm run format:check
npm run lint
npm run check
npm run build
npm run test:playwright:a11y
npm run test:playwright:smoke
npm run test:lighthouse
```

## Resultados de verificación

| Comando                 | Baseline     | Post-refactor             |
| ----------------------- | ------------ | ------------------------- |
| `format:check`          | ✅           | ✅                        |
| `lint`                  | ✅           | ✅                        |
| `check`                 | ✅           | ✅                        |
| `build`                 | ✅           | ✅                        |
| `test:playwright:a11y`  | no ejecutado | 6/6 passed                |
| `test:playwright:smoke` | no ejecutado | 5/5 passed                |
| `test:lighthouse`       | no ejecutado | passed (assertions: none) |

## Pasos completados

1. **Centralizar datos de FAQ y servicios en `src/data/pages.ts`**
   - Extraer arrays `faqItems` y `servicePlans`.
   - Generar `structuredData` y markup HTML desde una sola fuente.
   - Reducir mensajes de WhatsApp duplicados reutilizando constantes de `site.ts`.

2. **Simplificar `src/data/site.ts` y consumidores de WhatsApp**
   - Exportar `getWhatsAppHref(message?)` en lugar de un href resuelto.
   - Exportar constantes de mensajes (`WHATSAPP_MESSAGE_*`).
   - Actualizar `WhatsAppLink.astro`, `Header.astro`, `Footer.astro`, `MobileCtaBar.astro`, `HomeContent.astro` y `PricingCard.astro` para usar la nueva función y constantes.

3. **Migrar CSS a BEM y consolidar duplicados**
   - Modificadores de botón: `.btn--whatsapp`, `.btn--trx`, `.btn--outline-light`, `.btn--ghost`.
   - Modificador de card: `.pricing-card--featured`.
   - Estados: `.site-header.is-scrolled`, `.nav-list.is-open`.
   - Consolidar estilos base compartidos entre `.pricing-card` y `.service-card`.

4. **Simplificar `public/assets/js/main.js`**
   - Leer número de WhatsApp desde `data-wa-number` en `<html>`.
   - Reemplazar `var` por `const`/`let`.
   - Extraer `setOpen(open)` para el menú móvil y eliminar lógica repetida.
   - Usar `Array.from`, template literals y `Set` para reducir verbosidad.

5. **Actualizar hooks de JS y markup**
   - Renombrar clases de estado en `main.js` y en componentes.
   - Actualizar todos los componentes Astro que usaban clases antiguas.

## Código muerto removido

- Referencias a `site.whatsappHref` resuelto (reemplazado por `site.getWhatsAppHref()`).
- Número de WhatsApp hardcodeado en `main.js` (ahora proviene de `data-wa-number`).
- Mensajes de WhatsApp hardcodeados en `HomeContent.astro` y `pages.ts` (ahora desde `site.ts`).
- Duplicación de FAQ y ofertas de servicio en `pages.ts`.

No se eliminaron archivos, dependencias ni componentes completos.

## Duplicación consolidada

| Antes                                                             | Después                                                                               |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| FAQ en `structuredData` y HTML detallado (14×2)                   | Array `faqItems` con helpers `buildFaqStructuredData` / `renderFaqDetails`            |
| Ofertas en `structuredData.hasOfferCatalog` y cards HTML          | Array `servicePlans` con helpers `buildServicesStructuredData` / `renderServiceCards` |
| Mensajes WA repetidos en componentes                              | Constantes exportadas desde `site.ts`                                                 |
| `.pricing-card` y `.service-card` con ~10 declaraciones idénticas | Selector agrupado para estilos base compartidos                                       |
| Lógica de apertura/cierre del menú móvil repetida                 | Función `setOpen(open)` reutilizada                                                   |

## Archivos o módulos divididos

Ninguno. El refactor mantuvo la estructura existente; solo se reorganizó contenido dentro de archivos ya existentes.

## Dependencias removidas

Ninguna. No se agregaron ni quitaron dependencias.

## Convenciones BEM adoptadas

- Bloque: `.btn`, `.pricing-card`, `.service-card`, `.site-header`, `.nav-list`
- Elemento: `.pricing-card__*` no aplica en este refactor (los elementos existentes ya eran planos)
- Modificador: `.btn--whatsapp`, `.btn--trx`, `.btn--outline-light`, `.btn--ghost`, `.pricing-card--featured`, `.service-card--featured`
- Estados transientes: `.is-scrolled`, `.is-open`, `.is-active`, `.is-enhanced`, `.is-visible`, `.has-error`

## Mapeo de selectores CSS antiguos a nuevos

| Selector antiguo         | Selector nuevo             |
| ------------------------ | -------------------------- |
| `.btn-whatsapp`          | `.btn--whatsapp`           |
| `.btn-trx`               | `.btn--trx`                |
| `.btn-outline-light`     | `.btn--outline-light`      |
| `.btn-ghost`             | `.btn--ghost`              |
| `.pricing-card-featured` | `.pricing-card--featured`  |
| `.site-header.scrolled`  | `.site-header.is-scrolled` |
| `.nav-list.nav-open`     | `.nav-list.is-open`        |

## Verificación de preservación de comportamiento

- Build genera las mismas 6 páginas estáticas.
- Validaciones del SEO graph (H1, links internos, alt text, metadata) pasan.
- Sitemap y robots.txt se generan correctamente.
- Tests de accesibilidad y smoke pasan.
- Los CTAs de WhatsApp conservan `data-wa` y `data-wa-msg`; `main.js` sigue reescribiendo href.
- El discovery flow conserva todos los `data-discovery-*` hooks.
- El banner de cookies conserva `site_consent` y la lógica de aceptar/rechazar.

## Fallas preexistentes

- Warnings de `markdownAlternate` en build (benignos, documentados en `AGENTS.md`).
- Reglas de accesibilidad deshabilitadas en `tests/visual/a11y.spec.ts` (`color-contrast`, `label-content-name-mismatch`, `heading-order`) por decisiones de diseño previas.

## Candidatos de código muerto inciertos

- `PricingCard.astro` recibe `description?: string` que no se usa actualmente; se mantiene como API válida del componente.
- `public/assets/css/style.min.css` se regenera automáticamente; no es dead code.

## Trabajo diferido

- Migración completa de todos los componentes a BEM (algunos bloques como `.fit-item`, `.audience-item` no fueron renombrados porque no presentan duplicación crítica ni inconsistencia de modifier).
- Extracción del SVG de WhatsApp en `WhatsAppLink.astro` a un componente interno (Astro no permite asignar JSX a variables en frontmatter de forma directa).
- Unificación mayor de cards (`.fit-item`, `.audience-item`, `.process-step`) si en el futuro se justifica semánticamente.

## Riesgos conocidos

- El cambio de estado `.scrolled` → `.is-scrolled` y `.nav-open` → `.is-open` afecta solo a JS/CSS propios. Terceros no deberían depender de estas clases.
- `main.js` ahora lee `data-wa-number`; si un consumidor futuro omite el atributo, cae en el fallback `56984402664`.

## Archivos modificados

- `public/assets/css/style.css`
- `public/assets/css/style.min.css` (regenerado)
- `public/assets/js/main.js`
- `src/components/DiscoveryFlow.astro`
- `src/components/Footer.astro`
- `src/components/Header.astro`
- `src/components/HomeContent.astro`
- `src/components/MobileCtaBar.astro`
- `src/components/PricingCard.astro`
- `src/components/WhatsAppLink.astro`
- `src/data/pages.ts`
- `src/data/site.ts`
- `src/layouts/BaseLayout.astro`
- `src/pages/404.astro`

## Archivos añadidos

- `docs/refactor-audit.md`
- `docs/refactor-report.md`
