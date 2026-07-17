/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTENT_PROVIDER?: "local" | "rest" | "sanity";
  readonly VITE_CONTENT_API_URL?: string;
  readonly VITE_SANITY_PROJECT_ID?: string;
  readonly VITE_SANITY_DATASET?: string;
  readonly VITE_SANITY_API_VERSION?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_GOOGLE_FORM_ACTION_URL?: string;
  readonly VITE_GOOGLE_FORM_FIRST_NAME_ENTRY?: string;
  readonly VITE_GOOGLE_FORM_LAST_NAME_ENTRY?: string;
  readonly VITE_GOOGLE_FORM_EMAIL_ENTRY?: string;
  readonly VITE_GOOGLE_FORM_SUBJECT_ENTRY?: string;
  readonly VITE_GOOGLE_FORM_MESSAGE_ENTRY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
