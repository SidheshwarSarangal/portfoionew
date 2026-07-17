import { useCallback, useMemo, useSyncExternalStore } from "react";

export function useMediaQuery(query: string) {
  const mediaQuery = useMemo(() => window.matchMedia(query), [query]);
  const subscribe = useCallback((notify: () => void) => {
    mediaQuery.addEventListener("change", notify);
    return () => mediaQuery.removeEventListener("change", notify);
  }, [mediaQuery]);
  const getSnapshot = useCallback(() => mediaQuery.matches, [mediaQuery]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
