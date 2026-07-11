/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTENT_PROVIDER?: "local" | "rest" | "sanity";
  readonly VITE_CONTENT_API_URL?: string;
  readonly VITE_SANITY_PROJECT_ID?: string;
  readonly VITE_SANITY_DATASET?: string;
  readonly VITE_SANITY_API_VERSION?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
