# TRX Concept

Sitio estático desarrollado con Astro para TRX Concept, entrenamiento personal con TRX en Santiago, Chile. Clases individuales y paquetes mensuales con Nicolás Echeverría, entrenador certificado.

## Stack

- `Astro 6` con output estático
- `TypeScript`
- `@astrojs/sitemap` para generación de sitemap
- `Playwright` + `@axe-core/playwright` para testing de accesibilidad
- `@lhci/cli` para Lighthouse CI

## Requisitos

- `Node.js` >= 24 < 25
- `npm`

## Comandos

| Comando                     | Descripción                                          |
| --------------------------- | ---------------------------------------------------- |
| `npm install`               | Instala las dependencias del proyecto.               |
| `npm run dev`               | Levanta el entorno local de desarrollo.              |
| `npm run build`             | Genera la versión de producción en `dist/`.          |
| `npm run preview`           | Sirve localmente la compilación de producción.       |
| `npm run test:lighthouse`   | Ejecuta Lighthouse CI sobre `dist/`.                 |
| `npm run capture:local`     | Ejecuta capturas visuales con Playwright.            |
| `npm run capture:home`      | Ejecuta capturas visuales de la página de inicio.    |
| `npm run capture:servicios` | Ejecuta capturas visuales de la página de servicios. |
| `npm run capture:sobre-mi`  | Ejecuta capturas visuales de la página sobre mí.     |

## Estructura del proyecto

```
src/
  pages/                    # Rutas del sitio
    servicios/index.astro   # Página de servicios
    sobre-mi/index.astro    # Página sobre el entrenador
    preguntas-frecuentes/index.astro # Página de FAQ
    politica-de-cookies/index.astro  # Página de política de cookies
    404.astro               # Página de error 404
    index.astro             # Página de inicio
  layouts/                  # Layouts compartidos
    BaseLayout.astro        # Layout base del sitio
  components/               # Componentes reutilizables de interfaz
    CookieBanner.astro
    Footer.astro
    Header.astro
    SeoHead.astro
    WaSymbol.astro
  data/                     # Datos compartidos del sitio
    site.ts                 # Configuración del sitio
    pages.ts                # Contenido y metadatos de páginas
public/                     # Archivos estáticos publicados sin procesamiento
  assets/                   # Imágenes, íconos y otros assets
```

## Modelo de contenido

El contenido de cada página se define en `src/data/pages.ts` como objetos TypeScript con metadatos SEO y contenido HTML. Desde ahí se generan las páginas estáticas con su estructura, schema.org y breadcrumb.

Campos del esquema:

- `title` — Título de la página
- `description` — Descripción para meta tags
- `canonical` — URL canónica
- `ogTitle`, `ogDescription`, `ogImage`, `ogType` — Open Graph
- `twitterCard` — Twitter card type
- `robots` — Directivas de robots (opcional)
- `structuredData` — Schema.org JSON-LD
- `breadcrumb` — BreadcrumbList schema
- `content` — Contenido HTML de la página
- `isHome` — Indica si es la página de inicio

## Testing

El proyecto incluye tres capas de testing automatizado:

1. **Accesibilidad** — `tests/visual/a11y.spec.ts` escanea todas las páginas con axe-core buscando violaciones WCAG 2.1 AA.
2. **Capturas visuales** — `tests/visual/capture.spec.ts` genera screenshots full-page en 4 viewports (1440, 1200, 810, 390) para validación visual.
3. **Lighthouse CI** — `.lighthouserc.cjs` audita performance, accesibilidad, best practices y SEO contra umbrales definidos.

### Requisitos para tests

```powershell
npm install
npx playwright install chromium
```

### Ejecutar tests

```powershell
# Accesibilidad y capturas visuales (requiere build previo)
npm run build
npm run capture:local

# Lighthouse CI (requiere build previo)
npm run build
npm run test:lighthouse
```

## Flujo de trabajo recomendado

1. Instala dependencias con `npm install`.
2. Trabaja localmente con `npm run dev`.
3. Si cambias rutas, contenido o estilos, valida el resultado en navegador.
4. Antes de cerrar tu cambio, ejecuta `npm run build`.
5. Para cambios visibles, considera correr `npm run capture:local` y `npm run test:lighthouse`.

## Notas

- `dist/`, caches, logs, resultados de pruebas y otros archivos generados no forman parte de la fuente de verdad del proyecto.
- No subas secretos ni archivos `.env` reales al repositorio.
- El sitio está configurado en español de Chile (`lang="es-CL"`).
