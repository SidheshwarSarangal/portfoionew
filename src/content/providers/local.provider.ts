import type { ContentProvider, PortfolioContentOverrides } from "../types";

export class LocalContentProvider implements ContentProvider {
  readonly name = "local";

  constructor(private readonly contentUrl = new URL("portfolio-data.json", document.baseURI).toString()) {}

  async load(signal?: AbortSignal): Promise<PortfolioContentOverrides> {
    const response = await fetch(this.contentUrl, { cache: "no-cache", signal });
    if (!response.ok) throw new Error(`Local content request failed: ${response.status}`);
    return response.json() as Promise<PortfolioContentOverrides>;
  }
}
