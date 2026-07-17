# Asset Organization

## Asset Flow

```mermaid
flowchart LR
  Public[public/] --> Vite[npm run build]
  Vite --> Dist[dist/]
  Dist --> Browser[served site]
  Src[src data paths] --> Public
```

`public/` is source-controlled. `dist/` is generated.

## Folder Map

```mermaid
flowchart TD
  Public[public]
  Public --> Docs[documents]
  Docs --> ProjectPDF[projects<br/>case-study PDFs]
  Docs --> Resume[resume<br/>downloadable resume]
  Public --> Images[images]
  Images --> Profile[profile<br/>portrait + references]
  Images --> Projects[projects]
  Projects --> Photos[photos<br/>active card images]
  Projects --> Art[illustrations<br/>retained generated artwork]
  Public --> Content[content<br/>portfolio-data.json]
```

## Responsibility Matrix

| Folder | Contains | Referenced by |
|---|---|---|
| `public/documents/projects/` | Project PDFs | `src/projectData.ts` |
| `public/documents/resume/` | Resume PDF | `src/data.ts` |
| `public/images/profile/` | Portrait and profile imagery | Profile, testimonials, SEO |
| `public/images/projects/photos/` | Current project images | Project tiles |
| `public/images/projects/illustrations/` | Preserved generated artwork | Future visual reuse |
| `public/content/` | Optional JSON override | Local content provider |

## Path Rule

```mermaid
flowchart LR
  File[public/images/projects/photos/example.webp] --> Ref[/images/projects/photos/example.webp]
  Ref --> Render[resolveAssetUrl]
  Render --> Works[Root + subpath deploys]
```

Use:

```text
/images/projects/photos/search-platform.webp
/documents/projects/01_AI_Curated_Search_Engine.pdf
```

Avoid:

```text
dist/...
public/...
file://...
images with spaces in names
```

## Add Project Assets

```mermaid
flowchart TD
  A[Add technology image] --> B[Add hover/use-case image]
  B --> C[Add project PDF]
  C --> D[Update sources.json]
  D --> E[Reference paths in projectData.ts]
  E --> F[npm run build]
  F --> G[Test card + download]
```

## Preservation Rule

```mermaid
flowchart TD
  Asset{Currently visible?}
  Asset -->|Yes| Active[Keep in active folder]
  Asset -->|No but reusable| Library[Move/keep in documented library]
  Asset -->|Duplicate/broken?| Review[Review before deletion]
```

Do not delete useful generated artwork just because the current UI does not render it.
