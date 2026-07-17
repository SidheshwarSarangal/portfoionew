import type { ReactNode, RefObject } from "react";

interface ScrollSceneProps {
  children: ReactNode;
  containerRef: RefObject<HTMLDivElement | null>;
}

export default function ScrollScene({ children }: ScrollSceneProps) {
  return (
    <div className="scroll-scene relative min-h-[calc(100svh-4rem)]">
      <div className="scroll-scene-content min-h-[calc(100svh-4rem)]">
        {children}
      </div>
    </div>
  );
}
