import { createApiCatalog } from "@jdevalk/astro-seo-graph";

export const GET = createApiCatalog({
  siteUrl: "https://trxconcept.cl",
  schemaEndpoints: [
    {
      path: "/schema/pages.json",
      schemaType: "WebPage",
      serviceDoc: "/servicios/",
    },
  ],
  schemaMap: {
    path: "/schemamap.xml",
    serviceDoc: "/servicios/",
  },
});
