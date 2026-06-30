import { createSchemaEndpoint } from "@jdevalk/astro-seo-graph";
import { buildSchemaGraph } from "../../utils/schema";
import { pages, type SitePage } from "../../data/pages";

export const GET = createSchemaEndpoint({
  entries: async (): Promise<readonly SitePage[]> => Object.values(pages) as SitePage[],
  mapper: (page: SitePage) => {
    const graph = buildSchemaGraph({
      pageType: page.isHome ? "website" : "webpage",
      url: page.canonical,
      title: page.title,
      description: page.description,
      breadcrumb: page.breadcrumb,
    });

    if (page.structuredData) {
      const schema = page.structuredData as Record<string, unknown>;
      if ("@graph" in schema && Array.isArray(schema["@graph"])) {
        (graph["@graph"] as Record<string, unknown>[]).push(...(schema["@graph"] as Record<string, unknown>[]));
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { "@context": _ctx, ...node } = schema;
        (graph["@graph"] as Record<string, unknown>[]).push(node);
      }
    }

    return graph["@graph"];
  },
});
