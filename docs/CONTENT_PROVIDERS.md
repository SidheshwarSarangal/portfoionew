# Connect Content and Backends

## Provider Choice

```mermaid
flowchart TD
  A{Where should content live?}
  A -->|Inside repo| Local[Local provider]
  A -->|Public JSON endpoint| REST[REST provider]
  A -->|Sanity dashboard| Sanity[Sanity provider]
  A -->|Private database/API| Proxy[Serverless proxy -> REST]
  A -->|Other CMS/service| Custom[Custom provider]
```

## Environment Switch

```env
VITE_CONTENT_PROVIDER=local
```

| Provider | Extra env |
|---|---|
| `local` | None |
| `rest` | `VITE_CONTENT_API_URL` |
| `sanity` | `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, `VITE_SANITY_API_VERSION` |
| `custom` | Add only public browser-safe values |

## Local Flow

```mermaid
flowchart LR
  Data[src/data.ts] --> Merge[Fallback merge]
  Projects[src/projectData.ts] --> Merge
  JSON[public/content/portfolio-data.json] --> Merge
  Merge --> UI[Portfolio UI]
```

| Task | File |
|---|---|
| Main portfolio text | `src/data.ts` |
| PDF-backed projects | `src/projectData.ts` |
| Small override | `public/content/portfolio-data.json` |
| Images | `public/images/` |
| Documents | `public/documents/` |

Array rule:

```mermaid
flowchart LR
  Object[Object field] --> Partial[Partial override allowed]
  Array[Array field] --> Replace[Complete replacement]
```

## REST Flow

```mermaid
sequenceDiagram
  participant UI as Browser
  participant API as Public API
  participant Fallback as Built-in content
  UI->>API: GET VITE_CONTENT_API_URL
  alt valid JSON
    API-->>UI: PortfolioContentOverrides
  else error
    UI->>Fallback: render built-in content
  end
```

```env
VITE_CONTENT_PROVIDER=rest
VITE_CONTENT_API_URL=https://api.example.com/portfolio
```

| Requirement | Value |
|---|---|
| Method | `GET` |
| Response | `application/json` |
| CORS | Allow portfolio origin |
| Auth | None in browser |
| Shape | `PortfolioContentOverrides` |
| Production | HTTPS |

## Private API Pattern

```mermaid
flowchart LR
  Browser --> Proxy[Serverless function]
  Proxy -->|private token| API[Private API/database]
  API --> Proxy
  Proxy -->|public JSON| Browser
```

Never expose private tokens through `VITE_*`.

## Sanity Flow

```mermaid
flowchart LR
  Studio[Sanity Studio] --> Lake[Content Lake]
  Lake -->|public CDN read| Adapter[SanityProvider]
  Adapter --> UI[Portfolio UI]
```

```env
VITE_CONTENT_PROVIDER=sanity
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2025-02-19
```

```mermaid
classDiagram
  class portfolio {
    personalBio object
    projects array
    articles array
    timeline array
    socialLinks array
    socialPosts array
    experienceSummary array
    capabilities array
    techSkills array
    testimonials array
  }
```

| UI value | Sanity field |
|---|---|
| Profile image | `personalBio.avatarUrl` or `personalBio.avatar` |
| Project image | `project.imageUrl` or `project.image` |
| Testimonial image | `testimonial.avatarUrl` or `testimonial.avatar` |
| Article body | `content` |

## Custom Provider

```mermaid
flowchart LR
  Service[Service response] --> Map[Map fields]
  Map --> Contract[PortfolioContentOverrides]
  Contract --> ExistingUI[Existing UI unchanged]
```

Touch points:

| Step | File |
|---|---|
| Add provider class | `src/content/providers.ts` |
| Register factory case | `createContentProvider()` |
| Add env typing | `src/vite-env.d.ts` |
| Keep UI unchanged | `src/components/` |

## Connection Checklist

```mermaid
flowchart LR
  Pick[Pick provider] --> Env[Set env]
  Env --> Shape[Return canonical shape]
  Shape --> CORS[Allow CORS]
  CORS --> Fallback[Test fallback]
  Fallback --> Build[npm run build]
```

## Troubleshooting

| Symptom | Check |
|---|---|
| Built-in content appears | Provider env + browser console |
| REST blocked | CORS header |
| Sanity empty | Published `_type: portfolio` document |
| Images missing | URL/path validity |
| Section empty | Remote array may be `[]` |
| Env ignored | Restart Vite or redeploy |
