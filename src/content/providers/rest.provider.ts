import type { ContentProvider, PortfolioContentOverrides } from "../types";

export class RestContentProvider implements ContentProvider {
  readonly name = "rest";

  constructor(private readonly endpoint: string) {
    if (!endpoint) throw new Error("VITE_CONTENT_API_URL is required for the REST content provider.");
  }

  async load(signal?: AbortSignal): Promise<PortfolioContentOverrides> {
    const response = await fetch(this.endpoint, {
      headers: { Accept: "application/json" },
      signal,
    });
    if (!response.ok) throw new Error(`REST content request failed: ${response.status}`);
    return response.json() as Promise<PortfolioContentOverrides>;
  }
}
