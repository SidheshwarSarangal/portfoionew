# Connect Content and Backends

## Pick a provider

```mermaid
flowchart TD
  A{Where is the content?}
  A -->|This repository| B[Local]
  A -->|Public JSON endpoint| C[REST]
  A -->|Sanity dashboard| D[Sanity]
  A -->|Private API| E[Serverless proxy → REST]
  A -->|Another service| F[Custom provider]
```

Copy the environment template once:

```bash
cp .env.example .env.local
```

Restart `npm run dev` after changing `.env.local`.

---

## Option A — local content

```mermaid
flowchart LR
  Data[src/data.ts] --> Fallback[Built-in content]
  JSON[public/portfolio-data.json] --> Override[Optional overrides]
  Fallback --> Merge[Merge]
  Override --> Merge
  Merge --> UI[Portfolio]
```

```env
VITE_CONTENT_PROVIDER=local
```

| Task | File |
|---|---|
| Edit the complete example | `src/data.ts` |
| Override selected fields at runtime | `public/portfolio-data.json` |
| Add local images | `public/images/` |

Use image paths such as `/images/project.webp`.

---

## Option B — REST backend

```mermaid
sequenceDiagram
  participant Browser
  participant API as Your API
  participant Fallback as src/data.ts
  Browser->>API: GET VITE_CONTENT_API_URL
  alt 200 JSON
    API-->>Browser: PortfolioContentOverrides
  else error
    Browser->>Fallback: render built-in content
  end
```

### 1. Configure

```env
VITE_CONTENT_PROVIDER=rest
VITE_CONTENT_API_URL=https://api.example.com/portfolio
```

### 2. Backend requirements

| Requirement | Expected value |
|---|---|
| Method | `GET` |
| Response | `application/json` |
| CORS | Allow the portfolio origin |
| Authentication | None/private proxy only |
| Shape | `PortfolioContentOverrides` |
| Protocol | HTTPS in production |

### 3. Minimal response

```json
{
  "personalBio": {
    "fullName": "Ada Developer",
    "title": "Software Engineer"
  },
  "projects": [
    {
      "id": "search-platform",
      "title": "Search Platform",
      "category": "Backend",
      "description": "Search and indexing system.",
      "roles": ["Backend Engineering"],
      "year": "2026",
      "technologies": ["Java", "OpenSearch"],
      "accentColor": "amber",
      "imageUrl": "https://cdn.example.com/search.webp",
      "links": {
        "github": "https://github.com/user/search-platform"
      },
      "details": {
        "problem": "Users needed relevant results.",
        "solution": "Built a ranked indexing pipeline.",
        "outcomes": ["Implemented searchable document indexing"]
      },
      "featured": true
    }
  ]
}
```

Missing properties use fallback data. An included empty array intentionally removes that section's entries.

### 4. CORS example

```http
Access-Control-Allow-Origin: https://your-domain.com
Content-Type: application/json
```

### Private APIs

```mermaid
flowchart LR
  Browser --> Proxy[Serverless function]
  Proxy -->|private token| API[Private API/database]
  API --> Proxy -->|public portfolio JSON| Browser
```

Point `VITE_CONTENT_API_URL` to the proxy. Never expose the private token through `VITE_*`.

---

## Option C — Sanity

No separate custom backend is required.

```mermaid
flowchart LR
  Studio[Sanity Studio] --> Lake[Sanity Content Lake]
  Lake -->|public read CDN| Adapter[SanityProvider]
  Adapter --> UI[Portfolio]
```

### Setup checklist

```text
[ ] Create a Sanity project
[ ] Create a public dataset (usually production)
[ ] Add the portfolio domain to Sanity CORS origins
[ ] Define and publish one document with _type = portfolio
[ ] Add the environment values below
[ ] Restart or redeploy the portfolio
```

```env
VITE_CONTENT_PROVIDER=sanity
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2025-02-19
```

### Sanity document map

```mermaid
classDiagram
  class portfolio {
    personalBio object
    projects array
    articles array
    timeline array
    socialLinks array
    experienceSummary array
    capabilities array
    techSkills array
    industryAwards array
    teamAwards array
    testimonials array
  }
```

The field shapes must match [`src/content/types.ts`](../src/content/types.ts) and [`src/types.ts`](../src/types.ts).

| UI value | Sanity field options |
|---|---|
| Profile image | `personalBio.avatarUrl` or `personalBio.avatar` image |
| Project image | `project.imageUrl` or `project.image` image |
| Testimonial image | `testimonial.avatarUrl` or `testimonial.avatar` image |
| Article body | Markdown/plain string in `content` |

The adapter reads the first published `portfolio` document. Drafts are not returned by the public CDN query.

```text
Safe in frontend: project ID, dataset name, API version
Never in frontend: write token, management token, private read token
```

---

## Option D — custom provider

```mermaid
flowchart LR
  Service[Firebase / Supabase / GraphQL / CMS] --> Map[Map service fields]
  Map --> Contract[PortfolioContentOverrides]
  Contract --> UI[Existing UI]
```

Add the provider inside `src/content/providers.ts`:

```ts
class CustomProvider implements ContentProvider {
  readonly name = "custom";

  async load(signal?: AbortSignal): Promise<PortfolioContentOverrides> {
    const response = await fetch("https://example.com/content", { signal });
    const remote = await response.json();

    return {
      personalBio: {
        fullName: remote.profile.name,
        title: remote.profile.role,
      },
      projects: remote.work,
    };
  }
}
```

Register it in the factory:

```ts
case "custom":
  return new CustomProvider();
```

Then extend `VITE_CONTENT_PROVIDER` in `src/vite-env.d.ts`.

## Connection checklist

```mermaid
flowchart TD
  A[Select provider] --> B[Set .env.local]
  B --> C[Return canonical JSON]
  C --> D[Allow CORS]
  D --> E[Test fallback]
  E --> F[Build + deploy]
  F --> G[Test direct project/article URLs]
```

## Troubleshooting

| Symptom | Check |
|---|---|
| Built-in content appears | Browser console and provider variables |
| REST request blocked | API CORS header |
| Sanity returns no data | Published `_type: portfolio` document |
| Images disappear | HTTP/HTTPS URL or valid Sanity image field |
| Array section is empty | Remote response may contain `[]` |
| Configuration change ignored | Restart Vite/redeploy |
