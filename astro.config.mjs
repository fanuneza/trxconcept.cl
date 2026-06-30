import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import seoGraph from "@jdevalk/astro-seo-graph/integration";
import robotsTxt from "astro-robots-txt";

export default defineConfig({
  site: "https://trxconcept.cl",
  output: "static",
  trailingSlash: "always",

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },

  build: {
    inlineStylesheets: "always",
  },

  integrations: [
    sitemap({
      filter: (page) => !page.endsWith("/404.html") && !page.endsWith("/politica-de-cookies/"),
    }),
    robotsTxt(),
    seoGraph({
      validateH1: true,
      validateUniqueMetadata: true,
      validateImageAlt: true,
      validateMetadataLength: true,
      validateInternalLinks: {
        skip: (href) =>
          href.startsWith("/api/") ||
          href.startsWith("/feed.xml") ||
          href.startsWith("/sitemap-index.xml") ||
          href.startsWith("/sitemap.xml") ||
          href.startsWith("/schemamap.xml") ||
          href.startsWith("/schema/"),
      },
      indexNow: {
        key: "591c2b87f0b68c44f260215f5d8e9da3",
        host: "trxconcept.cl",
        siteUrl: "https://trxconcept.cl",
      },
      markdownAlternate: true,
    }),
  ],
});
