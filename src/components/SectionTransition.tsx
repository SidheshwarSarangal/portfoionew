import { motion, useReducedMotion } from "motion/react";

interface SectionTransitionProps {
  from: string;
  to: string;
}

export default function SectionTransition({ from, to }: SectionTransitionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex min-h-[24svh] items-center justify-center overflow-hidden px-6" aria-label={`${from} to ${to}`}>
      <motion.div
        className="relative flex w-full max-w-3xl items-center gap-4 sm:gap-7"
        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="max-w-[38%] truncate text-right font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-600 sm:text-[10px]">
          {from}
        </span>
        <div className="relative h-px flex-1 overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-[var(--rail-primary)] to-[var(--rail-secondary)]"
            initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.75 }}
            viewport={{ once: true, amount: 0.5 }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <motion.span
          className="max-w-[42%] truncate font-display text-lg font-semibold tracking-tight text-white sm:text-2xl"
          initial={reduceMotion ? false : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {to}
        </motion.span>
      </motion.div>
    </div>
  );
}
