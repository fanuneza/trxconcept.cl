import { createSchemaMap, gitLastmod } from "@jdevalk/astro-seo-graph";

export const GET = createSchemaMap({
  siteUrl: "https://trxconcept.cl",
  entries: [
    {
      path: "/schema/pages.json",
      lastModified: gitLastmod("src/pages/schema/pages.json.ts") || new Date(),
    },
  ],
});
