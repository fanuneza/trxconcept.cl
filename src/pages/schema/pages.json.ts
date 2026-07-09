import { createSchemaEndpoint } from "@jdevalk/astro-seo-graph";
import { buildSchemaGraph, mergeStructuredData } from "../../utils/schema";
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
      mergeStructuredData(graph, page.structuredData);
    }

    return graph["@graph"];
  },
});
