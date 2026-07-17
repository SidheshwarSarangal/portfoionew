import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultContent, mergeContent } from "./defaults";
import { createContentProvider } from "./providers";
import type { PortfolioContent, PortfolioContentOverrides } from "./types";

export type { PortfolioContent, PortfolioContentOverrides } from "./types";

const PortfolioContentContext = createContext<PortfolioContent>(defaultContent);

function matchesBuiltInContent(overrides: PortfolioContentOverrides) {
  return (Object.entries(overrides) as Array<[keyof PortfolioContent, unknown]>).every(
    ([key, value]) => JSON.stringify(value) === JSON.stringify(defaultContent[key]),
  );
}

export function PortfolioContentProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<PortfolioContentOverrides>({});

  useEffect(() => {
    const controller = new AbortController();

    try {
      const provider = createContentProvider();
      provider.load(controller.signal)
        .then((loadedOverrides) => {
          // Avoid a second full-tree render when the local editable content mirrors the built-in fallback.
          if (!matchesBuiltInContent(loadedOverrides)) setOverrides(loadedOverrides);
        })
        .catch((error: unknown) => {
          if (error instanceof DOMException && error.name === "AbortError") return;
          console.warn(`Using built-in portfolio content because the ${provider.name} provider failed.`, error);
        });
    } catch (error) {
      console.warn("Using built-in portfolio content because the selected provider is not configured.", error);
    }

    return () => controller.abort();
  }, []);

  const content = useMemo(() => mergeContent(overrides), [overrides]);

  return (
    <PortfolioContentContext.Provider value={content}>
      {children}
    </PortfolioContentContext.Provider>
  );
}

export function usePortfolioContent() {
  return useContext(PortfolioContentContext);
}
