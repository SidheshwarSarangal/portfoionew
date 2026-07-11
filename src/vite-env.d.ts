/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTENT_PROVIDER?: "local" | "rest" | "sanity";
  readonly VITE_CONTENT_API_URL?: string;
  readonly VITE_SANITY_PROJECT_ID?: string;
  readonly VITE_SANITY_DATASET?: string;
  readonly VITE_SANITY_API_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
