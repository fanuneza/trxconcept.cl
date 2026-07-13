// Production Lighthouse gate.
//
// Thresholds are grounded in a measured 4-route baseline (throttled mobile,
// see docs/final-production-audit.md): every route scored Performance 99-100,
// Accessibility / Best-Practices / SEO 100, LCP 1.4-2.3 s, CLS 0, TBT 0 ms.
// The gate locks in that quality: category and Core-Web-Vitals regressions now
// FAIL CI instead of only warning. Three runs per URL (median asserted) absorbs
// run-to-run noise so the error-level gates are firm without being brittle.
module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
      url: ["/", "/servicios/", "/sobre-mi/", "/preguntas-frecuentes/"],
      numberOfRuns: 3,
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        // Categories — measured 99-100 / 100 / 100 / 100. Performance keeps a
        // small margin for timing noise; the deterministic categories are held
        // at 100.
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 1 }],
        "categories:best-practices": ["error", { minScore: 1 }],
        "categories:seo": ["error", { minScore: 1 }],

        // Core Web Vitals — the real "good" thresholds, all met with headroom.
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "total-blocking-time": ["error", { maxNumericValue: 200 }],

        // Previously warn-only "known issues" — all verified resolved, so they
        // are now hard failures to prevent regression.
        "color-contrast": "error",
        "label-content-name-mismatch": "error",
        "heading-order": "error",
        "lcp-lazy-loaded": "error",
        "errors-in-console": "error",
        "robots-txt": "error",
        "modern-image-formats": "error",
        "render-blocking-resources": "error",
        // Informational: surfaces a ~19 KB opportunity on the sobre-mí portrait
        // hero (the served AVIF is one width-step above the DPR-ideal size).
        // Kept as warn, not error — the "ideal" width depends on Lighthouse's
        // device DPR math, so an error gate here would be brittle for a
        // sub-threshold saving on a page already at Perf 99 / LCP ~2.1 s.
        "uses-responsive-images": "warn",

        // Insight audits — informational and score-less; keep them visible for
        // diagnosis (warn) rather than off, but never fail CI on them.
        "network-dependency-tree-insight": "warn",
        "image-delivery-insight": "warn",
        "dom-size-insight": "warn",
        "lcp-discovery-insight": "warn",
        "render-blocking-insight": "warn",
        "forced-reflow-insight": "warn",
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
