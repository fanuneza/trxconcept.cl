import {
  makeIds,
  buildWebSite,
  buildWebPage,
  buildPiece,
  type WebPageInput,
  type GraphEntity,
  type WebSiteInput,
} from "@jdevalk/seo-graph-core";
import { site } from "../data/site";

const SITE_URL = site.url.endsWith("/") ? site.url : `${site.url}/`;

export function mergeStructuredData(graph: { "@graph": GraphEntity[] }, structuredData: unknown): void {
  const schema = structuredData as Record<string, unknown>;
  if ("@graph" in schema && Array.isArray(schema["@graph"])) {
    graph["@graph"].push(...(schema["@graph"] as GraphEntity[]));
  } else {
    const { "@context": _unusedCtx, ...node } = schema;
    void _unusedCtx;
    graph["@graph"].push(node as GraphEntity);
  }
}

export function buildSchemaGraph(options: {
  pageType: "website" | "webpage";
  url: string;
  title: string;
  description: string;
  breadcrumb?: { name: string; item: string }[];
}) {
  const ids = makeIds({ siteUrl: SITE_URL });
  const pieces: GraphEntity[] = [];

  // 1. WebSite (con SearchAction de búsqueda interna)
  pieces.push(
    buildWebSite(
      {
        url: SITE_URL,
        name: site.name,
        alternateName: [site.name, "trxconcept.cl"],
        description: options.description,
        publisher: { "@id": ids.organization("trx-concept") },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${SITE_URL}?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          } as unknown as Record<string, unknown>,
        ],
      } as unknown as WebSiteInput,
      ids
    ) as GraphEntity
  );

  // 2. Organización
  pieces.push(
    buildPiece({
      "@type": "Organization",
      "@id": ids.organization("trx-concept"),
      name: site.name,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}assets/logos/trx-concept-logo-big.png`,
      },
    }) as GraphEntity
  );

  // 3. WebPage
  const webPageInput: WebPageInput = {
    url: options.url,
    name: options.title,
    description: options.description,
    isPartOf: { "@id": ids.website },
  };
  if (options.breadcrumb) {
    webPageInput.breadcrumb = { "@id": ids.breadcrumb(options.url) };
  }
  pieces.push(buildWebPage(webPageInput, ids) as GraphEntity);

  // 4. BreadcrumbList
  if (options.breadcrumb) {
    pieces.push({
      "@type": "BreadcrumbList",
      "@id": ids.breadcrumb(options.url),
      itemListElement: options.breadcrumb.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.item,
      })),
    } as unknown as GraphEntity);
  }

  return {
    "@context": "https://schema.org" as const,
    "@graph": pieces,
  };
}
