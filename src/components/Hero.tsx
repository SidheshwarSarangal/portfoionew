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
      className="relative min-h-[calc(100svh-4rem)] w-full max-w-6xl mx-auto px-2 py-3 sm:px-6 sm:py-8 flex flex-col justify-center select-text overflow-hidden"
    >
      <div className="hero-stage relative isolate mt-1 h-[clamp(430px,68svh,520px)] sm:mt-3 sm:h-[680px] md:h-[790px] flex items-center justify-center [container-type:inline-size]">
        <h1 className="sr-only">Software Engineer</h1>

        <motion.div
          className="absolute inset-x-0 top-[15%] z-0 text-center overflow-visible select-none transform-gpu"
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
          className="absolute left-1/2 top-[48%] z-0 h-[34%] w-[76%] -translate-x-1/2 rounded-full bg-[#4285f4]/8 blur-[70px]"
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
            className="-translate-y-6 sm:-translate-y-12 w-[min(84vw,320px)] sm:w-[430px] md:w-[480px] aspect-[2/3] overflow-hidden"
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
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-x-0 top-[65%] z-20 flex items-center justify-center select-none transform-gpu"
          aria-hidden="true"
          initial={skipIntro ? false : { opacity: 0, x: 64 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -225, transition: { duration: 0.72, ease: entranceEase } }}
          transition={skipIntro ? { duration: 0 } : { duration: 1.05, delay: 0.65, ease: entranceEase }}
        >
          <svg
            viewBox="0 0 600 220"
            className="w-[min(108%,820px)] overflow-visible drop-shadow-[0_8px_18px_rgba(0,0,0,0.8)]"
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

        <div className="absolute left-[7%] top-[58%] z-20 hidden lg:block w-[205px] -translate-y-1/2" aria-live="polite">
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

        <div className="absolute right-[7%] top-[60%] z-20 hidden lg:block w-[200px] -translate-y-1/2 text-right" aria-live="polite">
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
        className="relative z-20 -mt-5 sm:-mt-8 md:-mt-12 grid min-h-[112px] sm:min-h-[88px] grid-cols-1 sm:grid-cols-2 content-start gap-2 sm:gap-6 px-3 py-3 sm:px-4 sm:py-4 text-center sm:text-left lg:hidden"
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
