# Content Provider Setup

Copy `.env.example` to `.env.local`, select one provider, and restart the development server after changing environment variables.

## Local JSON

```env
VITE_CONTENT_PROVIDER=local
```

The provider reads `public/portfolio-data.json`. This is the zero-configuration demonstration mode and the default when no provider is selected.

## Generic REST API

```env
VITE_CONTENT_PROVIDER=rest
VITE_CONTENT_API_URL=https://api.example.com/portfolio
```

The endpoint must:

- accept a browser `GET` request;
- allow the portfolio origin through CORS;
- return JSON using the canonical content shape;
- require no private credential in the browser.

Example response:

```json
{
  "personalBio": {
    "name": "Ada",
    "fullName": "Ada Developer",
    "title": "Software Engineer",
    "subtitle": "Backend and distributed systems",
    "location": "Remote",
    "email": "ada@example.com",
    "avatarUrl": "https://cdn.example.com/ada.webp",
    "about": "A concise professional biography."
  },
  "projects": [],
  "articles": [],
  "timeline": [],
  "socialLinks": [],
  "experienceSummary": [],
  "capabilities": [],
  "techSkills": [],
  "industryAwards": [],
  "teamAwards": [],
  "testimonials": []
}
```

Properties may be omitted to use built-in fallback content. An included empty array intentionally displays no entries for that section.

## Sanity

```env
VITE_CONTENT_PROVIDER=sanity
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2025-02-19
```

The current adapter uses Sanity's public API CDN and does not need a read token. Configure the dataset for public reading and add the deployed portfolio origin to the Sanity project's CORS origins.

Create and publish one Sanity document with `_type: "portfolio"`. Its fields must use the canonical property names:

```text
personalBio
projects
articles
timeline
socialLinks
experienceSummary
capabilities
techSkills
industryAwards
teamAwards
testimonials
```

The adapter queries the first published `portfolio` document. Draft content is not returned through this public production query. Profile, project, and testimonial images may be stored either as URL strings (`avatarUrl`/`imageUrl`) or as normal Sanity image fields (`avatar`/`image`); the adapter resolves image assets into the URL shape required by the UI.

Keep article `content` as a Markdown/plain-text string because the existing article modal renders that format. If a custom Sanity model uses Portable Text, map it to a string in a custom provider rather than changing the visual component.

Do not add a Sanity write token to this frontend. Editing and publishing belong in the authenticated Sanity Studio dashboard.

## Custom provider

Create a provider that implements `ContentProvider`:

```ts
import type {
  ContentProvider,
  PortfolioContentOverrides,
} from "../types";

export class CustomContentProvider implements ContentProvider {
  readonly name = "custom";

  async load(signal?: AbortSignal): Promise<PortfolioContentOverrides> {
    const remoteData = await loadFromYourService(signal);
    return mapRemoteDataToPortfolioContent(remoteData);
  }
}
```

Register it in `src/content/providers/index.ts`. Provider-specific field names must be converted inside the adapter; UI components should never be changed to accommodate a backend.

## Security model

This frontend is appropriate for published, publicly readable portfolio content. Browser applications cannot safely hold secrets. If a provider requires a private token to read content, place that token in a serverless function or other backend proxy—never in a `VITE_*` environment variable.
