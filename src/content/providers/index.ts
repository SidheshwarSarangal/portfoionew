import type { ContentProvider } from "../types";
import { LocalContentProvider } from "./local.provider";
import { RestContentProvider } from "./rest.provider";
import { SanityContentProvider } from "./sanity.provider";

export function createContentProvider(): ContentProvider {
  const providerName = (import.meta.env.VITE_CONTENT_PROVIDER || "local").toLowerCase();

  switch (providerName) {
    case "rest":
      return new RestContentProvider(import.meta.env.VITE_CONTENT_API_URL || "");
    case "sanity":
      return new SanityContentProvider(
        import.meta.env.VITE_SANITY_PROJECT_ID || "",
        import.meta.env.VITE_SANITY_DATASET || "production",
        import.meta.env.VITE_SANITY_API_VERSION || "2025-02-19",
      );
    case "local":
      return new LocalContentProvider();
    default:
      console.warn(`Unknown content provider "${providerName}". Using local JSON.`);
      return new LocalContentProvider();
  }
}
