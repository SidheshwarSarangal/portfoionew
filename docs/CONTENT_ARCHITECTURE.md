# Pluggable Content Architecture

## Project objective

This repository is a reusable portfolio frontend. It owns the visual design, responsive layout, animations, and UI components. Portfolio content may come from a local file, a hosted CMS, a generic REST API, or a user-written provider.

The frontend must not require a repository-specific backend.

## Non-negotiable design lock

Content-system work must not:

- remove, add, reorder, or redesign visible sections;
- change component markup for visual reasons;
- change Tailwind classes, CSS, spacing, typography, colors, or animations;
- alter responsive behavior;
- make a provider responsible for presentation.

Providers return data only. Existing React components remain responsible for rendering it.

## Architecture

```text
React components
      |
      v
PortfolioContentProvider
      |
      v
ContentProvider interface
      |
      +-- local JSON provider
      +-- generic REST provider
      +-- Sanity provider
      +-- future custom provider
```

Every provider implements the same contract:

```ts
interface ContentProvider {
  readonly name: string;
  load(signal?: AbortSignal): Promise<PortfolioContentOverrides>;
}
```

Provider responses use the canonical `PortfolioContent` shape. Components never import provider-specific SDKs or inspect provider-specific response formats.

## Provider selection

The provider is selected at build time with `VITE_CONTENT_PROVIDER`:

- `local`: reads `public/portfolio-data.json`;
- `rest`: reads a user-owned JSON API;
- `sanity`: queries a public Sanity dataset;
- omitted or unknown: uses `local`.

All provider configuration uses public, read-only frontend variables. Write credentials must never be added to `VITE_*` variables because Vite exposes those values to browsers.

## Canonical content sections

- `personalBio`
- `projects`
- `articles`
- `timeline`
- `socialLinks`
- `experienceSummary`
- `capabilities`
- `techSkills`
- `industryAwards`
- `teamAwards`
- `testimonials`

`personalBio` supports partial overrides. Array properties replace their complete fallback arrays.

## Reliability rules

1. `src/data.ts` is the built-in demonstration and emergency fallback.
2. A failed external request must not blank the site.
3. Missing content properties fall back to built-in content.
4. Provider failures may be logged, but must not modify the visual experience.
5. Requests use `AbortSignal` so unmounted React trees do not update state.

## Adding another provider

1. Create `src/content/providers/<name>.provider.ts`.
2. Implement `ContentProvider`.
3. Convert the remote response into `PortfolioContentOverrides` inside that provider.
4. Register it in `src/content/providers/index.ts`.
5. Add only public configuration examples to `.env.example`.
6. Do not change UI components.

Examples of future providers include Supabase, Firebase, Contentful, Strapi, Directus, GitHub, and a GraphQL API.

## Current implementation boundary

The system reads published portfolio content. Content creation and updates happen in the selected CMS/backend dashboard. The frontend must never contain database write credentials.
