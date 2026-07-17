import type { ContentProvider, PortfolioContentOverrides } from "./types";
import { requirePublicHttpUrl } from "../lib/security";

class LocalProvider implements ContentProvider {
  readonly name = "local";

  async load(signal?: AbortSignal): Promise<PortfolioContentOverrides> {
    const url = new URL("content/portfolio-data.json", document.baseURI);
    const response = await fetch(url, { cache: "default", signal });
    if (!response.ok) throw new Error(`Local content request failed: ${response.status}`);
    return response.json() as Promise<PortfolioContentOverrides>;
  }
}

class RestProvider implements ContentProvider {
  readonly name = "rest";

  constructor(private readonly endpoint: string) {
    this.endpoint = requirePublicHttpUrl(endpoint, "VITE_CONTENT_API_URL");
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

class SanityProvider implements ContentProvider {
  readonly name = "sanity";

  constructor(
    private readonly projectId: string,
    private readonly dataset: string,
    private readonly apiVersion: string,
  ) {
    if (!projectId || !dataset) {
      throw new Error("VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET are required for Sanity.");
    }
    if (!/^[a-z0-9-]+$/.test(projectId) || !/^[a-zA-Z0-9_-]+$/.test(dataset)) {
      throw new Error("Sanity project and dataset identifiers contain unsupported characters.");
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(apiVersion)) {
      throw new Error("VITE_SANITY_API_VERSION must use YYYY-MM-DD format.");
    }
  }

  async load(signal?: AbortSignal): Promise<PortfolioContentOverrides> {
    const query = encodeURIComponent(`*[_type == "portfolio"][0]{
      personalBio{..., "avatarUrl": coalesce(avatarUrl, avatar.asset->url)},
      projects[]{..., "imageUrl": coalesce(imageUrl, image.asset->url)},
      articles, timeline, socialLinks, socialPosts, experienceSummary, capabilities,
      techSkills, industryAwards, teamAwards,
      testimonials[]{..., "avatarUrl": coalesce(avatarUrl, avatar.asset->url)}
    }`);
    const url = `https://${this.projectId}.apicdn.sanity.io/v${this.apiVersion}/data/query/${this.dataset}?query=${query}`;
    const response = await fetch(url, { headers: { Accept: "application/json" }, signal });
    if (!response.ok) throw new Error(`Sanity content request failed: ${response.status}`);

    const payload = await response.json() as { result: PortfolioContentOverrides | null };
    if (!payload.result) throw new Error('Sanity requires one published document with type "portfolio".');
    return payload.result;
  }
}

export function createContentProvider(): ContentProvider {
  switch ((import.meta.env.VITE_CONTENT_PROVIDER || "local").toLowerCase()) {
    case "rest":
      return new RestProvider(import.meta.env.VITE_CONTENT_API_URL || "");
    case "sanity":
      return new SanityProvider(
        import.meta.env.VITE_SANITY_PROJECT_ID || "",
        import.meta.env.VITE_SANITY_DATASET || "production",
        import.meta.env.VITE_SANITY_API_VERSION || "2025-02-19",
      );
    case "local":
      return new LocalProvider();
    default:
      console.warn("Unknown content provider. Using local JSON.");
      return new LocalProvider();
  }
}
