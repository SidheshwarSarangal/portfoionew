import { useRef } from "react";
import type { ReactNode, RefObject } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

interface ScrollSceneProps {
  children: ReactNode;
  containerRef: RefObject<HTMLDivElement | null>;
}

export default function ScrollScene({ children, containerRef }: ScrollSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress: entryProgress } = useScroll({
    container: containerRef,
    target: sceneRef,
    offset: ["start end", "start start"],
  });
  const { scrollYProgress: exitProgress } = useScroll({
    container: containerRef,
    target: sceneRef,
    offset: ["end end", "end start"],
  });
  const smoothEntryProgress = useSpring(entryProgress, {
    stiffness: 215,
    damping: 34,
    mass: 0.3,
    restDelta: 0.001,
  });
  const smoothExitProgress = useSpring(exitProgress, {
    stiffness: 215,
    damping: 34,
    mass: 0.3,
    restDelta: 0.001,
  });
  const entryOpacity = useTransform(smoothEntryProgress, [0, 0.38, 0.76, 1], [0, 0, 1, 1]);
  const exitOpacity = useTransform(smoothExitProgress, [0, 0.24, 0.62, 1], [1, 1, 0, 0]);
  const opacity = useTransform(() => Math.min(entryOpacity.get(), exitOpacity.get()));
  const y = useTransform(() => (1 - entryOpacity.get()) * 22 - (1 - exitOpacity.get()) * 22);

  return (
    <div ref={sceneRef} className="scroll-scene relative min-h-[calc(100svh-4rem)]">
      <motion.div
        className="scroll-scene-content min-h-[calc(100svh-4rem)] transform-gpu"
        style={reduceMotion ? undefined : { opacity, y }}
      >
        {children}
      </motion.div>
    </div>
  );
}
