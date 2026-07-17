import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const leftHighlights = ["Full-stack Developer", "Problem Solver", "Python Developer", "IIT Roorkee Graduate"];
const rightHighlights = ["Backend Systems", "Quick Learner", "MERN Developer"];
const entranceEase = [0.22, 1, 0.36, 1] as const;

interface HeroProps {
  playIntro?: boolean;
}

export default function Hero({ playIntro = true }: HeroProps) {
  const portraitUrl = `${import.meta.env.BASE_URL}images/profile/portfolio-hero.png`;
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [highlightsVisible, setHighlightsVisible] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { initial: true, margin: "200px 0px" });
  const reduceMotion = useReducedMotion();
  const skipIntro = reduceMotion || !playIntro;

  useEffect(() => {
    if (reduceMotion) return;
    if (!heroInView) {
      setHighlightsVisible(true);
      return;
    }

    let displayTimer: number | undefined;
    let swapTimer: number | undefined;

    const scheduleNextHighlight = () => {
      displayTimer = window.setTimeout(() => {
        setHighlightsVisible(false);
        swapTimer = window.setTimeout(() => {
          setHighlightIndex((current) => current + 1);
          setHighlightsVisible(true);
          scheduleNextHighlight();
        }, 1500);
      }, 8000);
    };

    scheduleNextHighlight();

    return () => {
      if (displayTimer !== undefined) window.clearTimeout(displayTimer);
      if (swapTimer !== undefined) window.clearTimeout(swapTimer);
    };
  }, [heroInView, reduceMotion]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero-section relative flex min-h-[calc(100svh-4rem)] w-full max-w-6xl mx-auto flex-col justify-center overflow-hidden px-2 py-3 select-text sm:px-6 sm:py-8"
    >
      <div className="hero-stage relative isolate mt-1 flex items-center justify-center [container-type:inline-size] sm:mt-3">
        <h1 className="sr-only">Software Engineer</h1>

        <motion.div
          className="hero-software-layer absolute inset-x-0 z-0 overflow-visible text-center select-none transform-gpu"
          aria-hidden="true"
          initial={skipIntro ? false : { opacity: 0, x: -64 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 300, transition: { duration: 0.72, ease: entranceEase } }}
          transition={skipIntro ? { duration: 0 } : { duration: 1.05, delay: 0.1, ease: entranceEase }}
        >
          <span className="relative inline-block">
            <span className="hero-software-title block font-black leading-[0.86] tracking-[0.045em] text-white whitespace-nowrap">
              SOFTWARE
            </span>
            <span
              className={`hero-software-title ${playIntro ? "hero-software-glow" : "hero-software-glow-static"} pointer-events-none absolute inset-0 block font-black leading-[0.86] tracking-[0.045em] text-transparent whitespace-nowrap`}
              aria-hidden="true"
            >
              SOFTWARE
            </span>
          </span>
        </motion.div>

        <motion.div
          className="hero-blue-halo absolute left-1/2 z-0 -translate-x-1/2 rounded-full bg-[#4285f4]/8"
          aria-hidden="true"
          initial={skipIntro ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, transition: { duration: 0.45 } }}
          transition={skipIntro ? { duration: 0 } : { duration: 1.6, delay: 2.9, ease: "easeOut" }}
        />

        <motion.div
          className="relative z-10"
          initial={skipIntro ? false : { opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -260, scale: 0.96, transition: { duration: 0.72, ease: entranceEase } }}
          transition={skipIntro ? { duration: 0 } : { duration: 1, delay: 1.25, ease: entranceEase }}
        >
          <div
            className="hero-portrait-frame relative aspect-[2/3] overflow-hidden"
            style={{ borderRadius: "0 0 50% 50% / 0 0 30% 30%" }}
          >
            <img
              src={portraitUrl}
              alt="Sidheshwar Sarangal"
              width="1024"
              height="1536"
              className="h-full w-full object-contain"
              fetchPriority="high"
              decoding="async"
            />
            <span className="hero-portrait-bottom-blend pointer-events-none absolute inset-x-0 bottom-0" aria-hidden="true" />
          </div>
        </motion.div>

        <motion.div
          className="hero-engineer-layer absolute inset-x-0 z-20 flex items-center justify-center select-none transform-gpu"
          aria-hidden="true"
          initial={skipIntro ? false : { opacity: 0, x: 64 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -225, transition: { duration: 0.72, ease: entranceEase } }}
          transition={skipIntro ? { duration: 0 } : { duration: 1.05, delay: 0.65, ease: entranceEase }}
        >
          <svg
            viewBox="0 0 600 220"
            className="hero-engineer-svg overflow-visible drop-shadow-[0_8px_18px_rgba(0,0,0,0.8)]"
          >
            <defs>
              <path id="hero-engineer-curve" d="M 10 30 Q 300 215 590 30" />
            </defs>
            <text
              fill="#d7dadd"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize="116"
              fontStyle="italic"
              letterSpacing="5"
            >
              <textPath href="#hero-engineer-curve" startOffset="50%" textAnchor="middle">
                Engineer
              </textPath>
            </text>
          </svg>
        </motion.div>

        <div className="hero-left-highlight absolute z-20 hidden -translate-y-1/2 min-[1320px]:block" aria-live="polite">
          <motion.div
            initial={skipIntro ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, transition: { duration: 0.4 } }}
            transition={skipIntro ? { duration: 0 } : { duration: 0.75, delay: 1.95, ease: entranceEase }}
          >
            <span
              className={`block font-serif text-[clamp(1.7rem,2.5vw,2.5rem)] italic leading-[1.05] tracking-[-0.035em] text-[#d7dadd] transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${highlightsVisible ? "translate-x-0 opacity-100 blur-0" : "-translate-x-4 opacity-0 blur-sm"}`}
            >
              {leftHighlights[highlightIndex % leftHighlights.length]}
            </span>
          </motion.div>
        </div>

        <div className="hero-right-highlight absolute z-20 hidden -translate-y-1/2 text-right min-[1320px]:block" aria-live="polite">
          <motion.div
            initial={skipIntro ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, transition: { duration: 0.4 } }}
            transition={skipIntro ? { duration: 0 } : { duration: 0.75, delay: 2.1, ease: entranceEase }}
          >
            <span
              className={`block font-serif text-[clamp(1.7rem,2.5vw,2.5rem)] italic leading-[1.05] tracking-[-0.035em] text-[#d7dadd] transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${highlightsVisible ? "translate-x-0 opacity-100 blur-0" : "translate-x-4 opacity-0 blur-sm"}`}
            >
              {rightHighlights[highlightIndex % rightHighlights.length]}
            </span>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="hero-mobile-highlights relative z-20 grid grid-cols-1 content-start gap-2 px-3 py-3 text-center sm:grid-cols-2 sm:gap-6 sm:px-4 sm:py-4 sm:text-left min-[1320px]:hidden"
        aria-live="polite"
        initial={skipIntro ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, transition: { duration: 0.4 } }}
        transition={skipIntro ? { duration: 0 } : { duration: 0.8, delay: 1.95, ease: entranceEase }}
      >
        <span
          className={`font-serif text-[1.45rem] min-[380px]:text-[1.7rem] sm:text-[2rem] italic leading-tight tracking-[-0.035em] text-[#d7dadd] transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${highlightsVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-3 opacity-0 blur-sm"}`}
        >
          {leftHighlights[highlightIndex % leftHighlights.length]}
        </span>
        <span
          className={`font-serif text-[1.45rem] min-[380px]:text-[1.7rem] sm:text-[2rem] italic leading-tight tracking-[-0.035em] text-center sm:text-right text-[#d7dadd] transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${highlightsVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-3 opacity-0 blur-sm"}`}
        >
          {rightHighlights[highlightIndex % rightHighlights.length]}
        </span>
      </motion.div>

    </section>
  );
}
