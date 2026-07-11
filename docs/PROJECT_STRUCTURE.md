# Simple Project Structure

This guide is the starting point for anyone reusing the portfolio.

## Design rule

The visual design lives in `src/components/` and `src/index.css`. Content and backend integrations must not require edits to those files.

## Directory map

```text
portfolio/
├── public/
│   ├── portfolio-data.json    # Optional local content overrides
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── generate-seo.mjs       # Creates sitemap and direct route files
├── src/
│   ├── components/            # All visible UI sections and modals
│   ├── content/
│   │   ├── index.tsx          # React content context
│   │   ├── providers.ts       # Local, REST, and Sanity loaders
│   │   ├── defaults.ts        # Fallback merge behavior
│   │   └── types.ts           # Shared content contract
│   ├── lib/
│   │   ├── analytics.ts       # Optional GA4 tracking
│   │   ├── routes.ts          # Project and article URL helpers
│   │   └── seo.ts             # Metadata and structured data
│   ├── App.tsx                # Page composition and modal routing
│   ├── data.ts                # Complete built-in example content
│   ├── index.css              # Global styling
│   └── main.tsx               # Application entry point
├── .env.example               # All optional configuration
├── index.html                 # Base document metadata
├── package.json
└── vite.config.ts
```

Root files such as `vercel.json` and `netlify.toml` remain at the root because those hosting platforms look for them there.

## Simplest usage

For a personal copy that does not need a CMS:

1. Edit the complete example content in `src/data.ts`.
2. Keep `VITE_CONTENT_PROVIDER=local` or omit the variable.
3. Build and deploy.

`public/portfolio-data.json` can override only the fields that should differ from `src/data.ts`.

## External content usage

Only users who need content updates outside Git should configure a provider:

```env
VITE_CONTENT_PROVIDER=sanity
```

or:

```env
VITE_CONTENT_PROVIDER=rest
VITE_CONTENT_API_URL=https://api.example.com/portfolio
```

All provider selection is contained in `src/content/providers.ts`. UI components do not know which provider is active.

## Where to make common changes

| Goal | File |
|---|---|
| Change portfolio content | `src/data.ts` |
| Add local overrides | `public/portfolio-data.json` |
| Select a CMS/API | `.env.local` |
| Add another provider | `src/content/providers.ts` |
| Change content fields | `src/content/types.ts` |
| Configure SEO/analytics | `.env.local` |
| Change visible UI | `src/components/` |

## Simplicity principles

- Start with built-in content; add a remote provider only when required.
- Keep one canonical content shape for every provider.
- Convert backend-specific fields inside `providers.ts`.
- Keep components focused on rendering.
- Keep secrets out of browser environment variables.
- Prefer existing utilities before adding dependencies.
- Do not add state-management or routing libraries until the application genuinely needs them.
