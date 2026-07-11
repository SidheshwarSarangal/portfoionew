import type { ContentProvider, PortfolioContentOverrides } from "../types";

interface SanityQueryResponse {
  result: PortfolioContentOverrides | null;
}

export class SanityContentProvider implements ContentProvider {
  readonly name = "sanity";

  constructor(
    private readonly projectId: string,
    private readonly dataset: string,
    private readonly apiVersion = "2025-02-19",
  ) {
    if (!projectId || !dataset) {
      throw new Error("VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET are required for the Sanity provider.");
    }
  }

  async load(signal?: AbortSignal): Promise<PortfolioContentOverrides> {
    const query = encodeURIComponent(`*[_type == "portfolio"][0]{
      personalBio{
        ...,
        "avatarUrl": coalesce(avatarUrl, avatar.asset->url)
      },
      projects[]{
        ...,
        "imageUrl": coalesce(imageUrl, image.asset->url)
      },
      articles,
      timeline,
      socialLinks,
      experienceSummary,
      capabilities,
      techSkills,
      industryAwards,
      teamAwards,
      testimonials[]{
        ...,
        "avatarUrl": coalesce(avatarUrl, avatar.asset->url)
      }
    }`);
    const endpoint = `https://${this.projectId}.apicdn.sanity.io/v${this.apiVersion}/data/query/${this.dataset}?query=${query}`;
    const response = await fetch(endpoint, { headers: { Accept: "application/json" }, signal });
    if (!response.ok) throw new Error(`Sanity content request failed: ${response.status}`);

    const payload = await response.json() as SanityQueryResponse;
    if (!payload.result) throw new Error('Sanity did not return a published document with type "portfolio".');
    return payload.result;
  }
}
