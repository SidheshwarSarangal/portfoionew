import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import type { RefObject } from "react";

interface SectionTransitionProps {
  from: string;
  to: string;
  containerRef?: RefObject<HTMLDivElement | null>;
}

export default function SectionTransition({ from, to, containerRef }: SectionTransitionProps) {
  const reduceMotion = useReducedMotion();
  const transitionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: transitionRef,
    offset: ["start end", "end start"],
  });
  const rawLineProgress = useTransform(scrollYProgress, [0.08, 0.68], [0, 1]);
  const smoothLineProgress = useSpring(rawLineProgress, {
    stiffness: 150,
    damping: 30,
    mass: 0.32,
    restDelta: 0.001,
  });
  const revealBySection: Record<string, { x?: number; y?: number; scale?: number }> = {
    Projects: { x: -26 },
    About: { y: 20 },
    Experience: { x: 26 },
    Writing: { y: -18 },
    Contact: { scale: 0.94, y: 10 },
  };
  const reveal = revealBySection[to] ?? { y: 18 };
  const colorsBySection: Record<string, [string, string]> = {
    Projects: ["#fbbc04", "#f59e0b"],
    About: ["#f59e0b", "#ea4335"],
    Experience: ["#ea4335", "#f59e0b"],
    Writing: ["#34a853", "#22d3ee"],
    Contact: ["#4285f4", "#a855f7"],
  };
  const [primaryColor, secondaryColor] = colorsBySection[to] ?? ["#fbbc04", "#4285f4"];

  return (
    <div ref={transitionRef} className="relative flex min-h-[18svh] items-center justify-center overflow-hidden px-3 sm:min-h-[24svh] sm:px-6" aria-label={`${from} to ${to}`}>
      <motion.div
        className="relative flex w-full max-w-3xl items-center gap-4 sm:gap-7"
        initial={reduceMotion ? false : { opacity: 0, ...reveal }}
        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: reduceMotion ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="max-w-[38%] truncate text-right font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-600 sm:text-[10px]">
          {from}
        </span>
        <div className="relative h-[2px] flex-1 overflow-visible bg-white/10">
          <motion.span
            className="absolute inset-0"
            style={{
              scaleX: reduceMotion ? 1 : smoothLineProgress,
              transformOrigin: "left",
              background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
              boxShadow: `0 0 14px ${secondaryColor}66`,
            }}
          >
            <span
              className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
              style={{ backgroundColor: secondaryColor, boxShadow: `0 0 12px ${secondaryColor}` }}
            />
          </motion.span>
        </div>
        <motion.span
          className="max-w-[42%] truncate font-display text-lg font-semibold tracking-tight text-white sm:text-2xl"
          initial={reduceMotion ? false : { opacity: 0, x: reveal.x ? -Math.sign(reveal.x) * 14 : 14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.48, delay: reduceMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {to}
        </motion.span>
      </motion.div>
    </div>
  );
}
