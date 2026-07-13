# Portfolio editing instructions

This is a React 19 + TypeScript + Vite + Tailwind CSS portfolio. Most work in this repository is small visual or layout refinement.

## Keep work efficient

- Make the smallest change that fully satisfies the request.
- Inspect only the component, stylesheet, and directly related types needed for the requested area.
- Do not scan `node_modules`, `dist`, generated files, documentation, or unrelated components unless the task requires it.
- Do not use subagents, broad research, web search, or image generation unless the user explicitly requests them or the task cannot be completed locally.
- Do not add packages, refactor architecture, rewrite whole files, or change content/data while making a design adjustment unless required.
- Preserve existing user changes and the established visual language.
- Keep explanations and progress updates concise.

## Where to edit

- Page composition and view switching: `src/App.tsx`
- Reusable page sections: `src/components/`
- Global styling, responsive rules, and design tokens: `src/index.css`
- Portfolio copy and data: `src/data.ts` and `src/content/`

Prefer existing CSS utilities, variables, spacing, colors, typography, and component patterns before introducing new ones.

## Verification

- For a small CSS or copy-only change, inspect the diff and run no command unless validation adds value.
- For TSX, behavior, or multi-file changes, run `npm run lint`.
- Run `npm run build` only for structural, routing, configuration, dependency, or release-readiness changes, or when the user asks.
- Report only what changed and the verification result.
