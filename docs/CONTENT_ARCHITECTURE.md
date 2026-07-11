# Content Architecture

## System map

```mermaid
flowchart LR
  ENV[.env.local] --> Factory[createContentProvider]
  Factory --> Local[LocalProvider]
  Factory --> REST[RestProvider]
  Factory --> Sanity[SanityProvider]
  Local --> Merge[mergeContent]
  REST --> Merge
  Sanity --> Merge
  Fallback[src/data.ts] --> Merge
  Merge --> Context[PortfolioContentProvider]
  Context --> UI[React components]
```

## Runtime sequence

```mermaid
sequenceDiagram
  participant UI as React UI
  participant Context as Content context
  participant Provider as Selected provider
  participant Fallback as Built-in data
  Context->>Provider: load(signal)
  alt request succeeds
    Provider-->>Context: partial content
    Context->>Fallback: fill missing sections
  else request fails
    Context->>Fallback: use all built-in content
  end
  Context-->>UI: canonical PortfolioContent
```

## Canonical contract

Defined in [`src/content/types.ts`](../src/content/types.ts).

| Section | Shape | Merge rule |
|---|---|---|
| `personalBio` | Object | Field-by-field override |
| `projects` | Array | Complete replacement |
| `articles` | Array | Complete replacement |
| `timeline` | Array | Complete replacement |
| `socialLinks` | Array | Complete replacement |
| `experienceSummary` | Array | Complete replacement |
| `capabilities` | Array | Complete replacement |
| `techSkills` | Array | Complete replacement |
| `industryAwards` | Array | Complete replacement |
| `teamAwards` | Array | Complete replacement |
| `testimonials` | Array | Complete replacement |

```mermaid
classDiagram
  PortfolioContent --> PersonalBio
  PortfolioContent --> Project
  PortfolioContent --> Article
  PortfolioContent --> TimelineEvent
  class Project {
    id
    title
    technologies[]
    links
    details
  }
  class Article {
    id
    slug
    title
    content
  }
  class PersonalBio {
    fullName
    title
    email
    avatarUrl
  }
```

```ts
interface ContentProvider {
  readonly name: string;
  load(signal?: AbortSignal): Promise<PortfolioContentOverrides>;
}
```

## File responsibilities

```mermaid
flowchart TD
  P[providers.ts] -->|fetch + map| T[types.ts]
  D[defaults.ts] -->|sanitize + merge| T
  I[index.tsx] -->|load + expose context| P
  I --> D
  C[components] -->|usePortfolioContent| I
```

## Invariants

```text
Provider-specific mapping stays in providers.ts
Secrets never enter VITE_* variables
Components never inspect provider names
Failures always fall back to src/data.ts
Backend changes never alter the design layer
```

## Extension point

```mermaid
flowchart LR
  Remote[New service response] --> Map[Custom provider mapping]
  Map --> Contract[PortfolioContentOverrides]
  Contract --> ExistingUI[Existing UI unchanged]
```

Add the provider in [`src/content/providers.ts`](../src/content/providers.ts), then register one new case in `createContentProvider()`.
