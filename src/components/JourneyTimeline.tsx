import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { usePortfolioContent } from "../content";
import { 
  Github, Twitter, Linkedin, ArrowDown
} from "lucide-react";

interface JourneyTimelineProps {
  section?: "about" | "experience" | "all";
  containerRef?: RefObject<HTMLDivElement | null>;
}

const DEVICON_ROOT = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const LINKEDIN_RECOMMENDATIONS_URL = "https://www.linkedin.com/in/sidheshwar-sarangal-0b31482b8/";

const TOOL_SYMBOLS: Array<{
  name: string;
  icon: string;
  color: string;
}> = [
  { name: "Python", icon: `${DEVICON_ROOT}/python/python-original.svg`, color: "#3776ab" },
  { name: "MongoDB", icon: `${DEVICON_ROOT}/mongodb/mongodb-original.svg`, color: "#47a248" },
  { name: "Express", icon: "https://cdn.simpleicons.org/express/ffffff", color: "#ffffff" },
  { name: "Angular", icon: `${DEVICON_ROOT}/angular/angular-original.svg`, color: "#dd0031" },
  { name: "C++", icon: `${DEVICON_ROOT}/cplusplus/cplusplus-original.svg`, color: "#659ad2" },
  { name: "Git", icon: `${DEVICON_ROOT}/git/git-original.svg`, color: "#f05032" },
  { name: "JavaScript", icon: `${DEVICON_ROOT}/javascript/javascript-original.svg`, color: "#f7df1e" },
  { name: "TypeScript", icon: `${DEVICON_ROOT}/typescript/typescript-original.svg`, color: "#3178c6" },
  { name: "Electron", icon: `${DEVICON_ROOT}/electron/electron-original.svg`, color: "#9feaf9" },
  { name: "React", icon: `${DEVICON_ROOT}/react/react-original.svg`, color: "#61dafb" },
  { name: "Node.js", icon: `${DEVICON_ROOT}/nodejs/nodejs-original.svg`, color: "#5fa04e" },
  { name: "Spring Boot", icon: `${DEVICON_ROOT}/spring/spring-original.svg`, color: "#6db33f" },
  { name: "Docker", icon: `${DEVICON_ROOT}/docker/docker-original.svg`, color: "#2496ed" },
  { name: "Kubernetes", icon: `${DEVICON_ROOT}/kubernetes/kubernetes-original.svg`, color: "#326ce5" },
  { name: "PostgreSQL", icon: `${DEVICON_ROOT}/postgresql/postgresql-original.svg`, color: "#5b8fc8" },
];

export default function JourneyTimeline({ section = "all", containerRef }: JourneyTimelineProps) {
  const {
    timeline: TIMELINE,
    capabilities: whatIDo,
    industryAwards,
    teamAwards,
    testimonials: feedback,
  } = usePortfolioContent();
  const showAbout = section !== "experience";
  const showExperience = section !== "about";
  const aboutPortraitUrl = `${import.meta.env.BASE_URL}portfolio-hero.png`;
  const aboutTrackRef = useRef<HTMLDivElement>(null);
  const portraitCardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [portraitTravel, setPortraitTravel] = useState(0);
  const [wideAboutLayout, setWideAboutLayout] = useState(false);
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    container: containerRef,
    target: aboutTrackRef,
    offset: ["start 22%", "end end"],
  });
  const portraitY = useTransform(aboutScrollProgress, [0, 1], [0, portraitTravel]);
  const smoothPortraitY = useSpring(portraitY, {
    stiffness: 42,
    damping: 24,
    mass: 1.35,
  });

  useEffect(() => {
    const track = aboutTrackRef.current;
    if (!track) return;
    const update = () => setWideAboutLayout(track.clientWidth >= 760);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const track = aboutTrackRef.current;
    const card = portraitCardRef.current;
    if (!track || !card || !wideAboutLayout) {
      setPortraitTravel(0);
      return;
    }
    const measure = () => setPortraitTravel(Math.max(0, track.clientHeight - card.offsetHeight));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(card);
    return () => observer.disconnect();
  }, [wideAboutLayout]);

  return (
    <section
      id={section === "experience" ? "experience" : "about"}
      className="relative mx-auto w-full max-w-5xl space-y-14 border-t border-white/5 px-4 py-10 [container-type:inline-size] select-text sm:px-6 sm:py-12"
    >
      {showAbout && (
        <div className="relative" id="chapter-about">
          <motion.div
            className="mb-8 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-6 sm:px-8 sm:py-8 [container-type:inline-size]"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block whitespace-nowrap font-display text-[clamp(3.2rem,14cqw,8.6rem)] font-black uppercase leading-[0.82] tracking-[-0.055em] text-neutral-300">
              SINCE 2022
            </span>
          </motion.div>

          <div ref={aboutTrackRef} className="about-track relative grid gap-12">
            <div className="min-w-0 space-y-16 sm:space-y-20">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -86 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.22 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Inside My Creative Core
                </h2>
                <div className="space-y-5 font-mono text-sm font-light leading-7 text-neutral-300 sm:text-[15px] lg:text-base lg:leading-8">
                  <p>
                    I'm a <span className="rounded border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 text-amber-400 font-semibold">Software Engineer and Full-Stack Developer</span> with strong foundations in DSA, REST APIs, and product-focused engineering. I work across Spring Boot, Python, MERN, Docker, and Kubernetes to build reliable, usable systems.
                  </p>
                  <p>
                    I enjoy collaborating with teams, solving real-world problems, and <span className="rounded border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 text-amber-400 font-medium">turning complex workflows into clean application code</span>.
                  </p>
                </div>
                <button
                  onClick={() => window.open("mailto:sidheshwar.sarangal22@gmail.com")}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0e0f11] px-6 py-3 font-mono text-sm font-medium text-neutral-300 shadow-md transition-all hover:border-amber-500/25 hover:bg-neutral-900 hover:text-amber-400"
                >
                  <span>Download CV</span><ArrowDown size={14} className="text-neutral-500" />
                </button>
              </motion.div>

              <motion.div
                className="space-y-7 scroll-mt-24"
                id="chapter-what-i-do"
                initial={{ opacity: 0, x: -86 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">Capabilities</h2>
                <div className="space-y-7 border-l border-white/10 pl-5 sm:pl-6">
                  {whatIDo.map((capability) => (
                    <div key={capability.num} className="space-y-3">
                      <div className="flex items-center gap-3 font-mono text-sm font-semibold text-white sm:text-base">
                        <span className="text-amber-400">{capability.num}</span>
                        <span className="tracking-tight transition-colors hover:text-amber-400">{capability.title}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-3 gap-y-2 sm:pl-7">
                        {capability.items.map((item) => (
                          <span key={item} className="font-mono text-[13px] leading-6 text-neutral-400 transition-colors hover:text-white sm:text-sm">
                            {item}<span className="ml-3 text-neutral-700">/</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>

            <div className="min-w-0">
                <motion.div
                  ref={portraitCardRef}
                  className="flex flex-col items-center gap-4 sm:items-end"
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                  style={wideAboutLayout && !reduceMotion ? { y: smoothPortraitY } : undefined}
                >
                  <div className="relative aspect-[2/3] w-full max-w-[310px] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                    <img src={aboutPortraitUrl} alt="Sidheshwar Sarangal" className="h-full w-full object-contain object-bottom transition-transform duration-700 hover:scale-[1.02]" />
                  </div>
                  <div className="flex items-center gap-4 pr-1 font-mono text-sm text-neutral-400 select-none">
                    <span>follow me:</span>
                    <a href="https://github.com/mrsidverse" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-amber-400" title="GitHub"><Github size={14} /></a>
                    <a href="https://x.com/mrsidverse" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-amber-400" title="X"><Twitter size={14} /></a>
                    <a href="https://www.linkedin.com/in/sidheshwar-sarangal-0b31482b8/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-amber-400" title="LinkedIn"><Linkedin size={14} /></a>
                  </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="mt-20 w-full space-y-7 scroll-mt-24"
            id="chapter-tech-stack"
            initial={{ opacity: 0, x: -86 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.16 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">Tools I Build With</h2>
            <div className="tech-gallery relative overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.018] py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_55px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:py-8">
              <div className="tech-gallery-track flex w-max items-center">
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex shrink-0 items-center gap-4 pr-4 sm:gap-5 sm:pr-5" aria-hidden={copy === 1}>
                    {TOOL_SYMBOLS.map((tool) => (
                      <div
                        key={`${copy}-${tool.name}`}
                        role="img"
                        aria-label={copy === 0 ? tool.name : undefined}
                        tabIndex={copy === 0 ? 0 : -1}
                        className="group relative grid h-28 w-28 shrink-0 place-items-center outline-none sm:h-32 sm:w-32"
                      >
                        <span className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 scale-90 whitespace-nowrap rounded-full border border-white/20 bg-neutral-950/85 px-3 py-1.5 font-mono text-[11px] font-semibold tracking-wide text-white opacity-0 shadow-[0_8px_28px_rgba(0,0,0,0.48)] backdrop-blur-xl transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                          {tool.name}
                        </span>
                        <span className="relative grid h-full w-full place-items-center overflow-hidden rounded-2xl border border-white/[0.11] bg-black/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.09)] transition-colors duration-300 group-hover:border-white/25 group-focus-visible:border-white/25">
                          <span
                            className="pointer-events-none absolute inset-0 opacity-20 blur-xl transition-opacity duration-300 group-hover:opacity-40 group-focus-visible:opacity-40"
                            style={{ background: `radial-gradient(circle at center, ${tool.color} 0%, transparent 68%)` }}
                          />
                          <img
                            src={tool.icon}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="relative h-[68px] w-[68px] object-contain drop-shadow-[0_10px_22px_rgba(0,0,0,0.38)] transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110 sm:h-20 sm:w-20"
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {showExperience && (
        <>
      {/* SECTION 3.5: METICULOUS EDUCATION ARCHIVES (Practice Chronology List) */}
      <div className="space-y-5 scroll-mt-24" id="chapter-history">
        {/* Massive Backdrop text: EXPERIENCE left reveal */}
        <motion.div
          className="mb-8 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-6 sm:px-8 sm:py-8 [container-type:inline-size]"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block whitespace-nowrap font-display text-[clamp(3.2rem,14cqw,8.6rem)] font-black uppercase leading-[0.82] tracking-[-0.055em] text-neutral-300">
            EXPERIENCE
          </span>
        </motion.div>

        {/* Massive Backdrop text: EXPERIENCE (Continuous Arrow Marquee) */}
        <div className="hidden">
          <div className="relative w-full flex overflow-hidden whitespace-nowrap">
            <div className="animate-marquee flex-none min-w-full flex justify-around gap-12 text-4xl sm:text-6xl md:text-[75px] font-black uppercase text-white tracking-widest leading-none pr-10">
              <span>EXPERIENCE → EXPERIENCE → EXPERIENCE → EXPERIENCE → </span>
            </div>
            <div className="animate-marquee flex-none min-w-full flex justify-around gap-12 text-4xl sm:text-6xl md:text-[75px] font-black uppercase text-white tracking-widest leading-none pr-10" aria-hidden="true">
              <span>EXPERIENCE → EXPERIENCE → EXPERIENCE → EXPERIENCE → </span>
            </div>
          </div>
        </div>
        <div className="relative border-l border-white/5 ml-3 pl-6 space-y-6" id="histories-timeline-track">
          {TIMELINE.map((event, idx) => (
            <motion.div
              key={event.id}
              className="group relative rounded-xl border border-transparent px-3 py-3 transition-colors hover:border-white/[0.06] hover:bg-white/[0.025]"
              id={`history-node-${event.id}`}
              initial={{ opacity: 0, x: -72 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#070809] border border-white/10 flex items-center justify-center text-neutral-500 group-hover:border-amber-500/30 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-amber-400 transition-colors" />
              </div>

              <div className="space-y-2" id={`history-node-body-${event.id}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5" id={`history-node-header-${event.id}`}>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-white/90 transition-colors group-hover:text-amber-400 sm:text-xl">
                      {event.role}
                    </h3>
                    <div className="mt-1 font-mono text-sm text-neutral-400">
                      <span className="text-neutral-300 font-medium">{event.organization}</span>
                      <span className="mx-1.5">•</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <span className="self-start rounded border border-[#ffffff08] bg-white/5 px-2.5 py-1 font-mono text-xs text-neutral-300 transition-all group-hover:border-amber-500/25 group-hover:text-amber-400 sm:self-center">
                    {event.period}
                  </span>
                </div>

                <p className="font-mono text-sm font-light leading-7 text-neutral-400 sm:text-base sm:leading-8">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SECTION 3.6: ACHIEVEMENTS & AWARDS */}
      <motion.div
        className="space-y-6 border-t border-white/5 pt-12 scroll-mt-24"
        id="chapter-awards"
        initial={{ opacity: 0, x: -90 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-8 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-6 sm:px-8 sm:py-8 [container-type:inline-size]">
          <span className="block whitespace-nowrap font-display text-[clamp(2.5rem,11.5cqw,7.2rem)] font-black uppercase leading-[0.82] tracking-[-0.055em] text-neutral-300">
            ACHIEVEMENTS
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 pl-1 md:grid-cols-2">
          <div className="space-y-3">
            <h4 className="font-display text-lg font-semibold tracking-tight text-amber-400">
              Industry recognition
            </h4>
            <div className="space-y-2">
              {industryAwards.map((item, idx) => (
                <div key={idx} className="group flex items-center justify-between border-b border-white/[0.03] py-2.5 text-sm transition-colors hover:border-amber-500/20">
                  <span className="font-mono text-base text-neutral-200 transition-colors group-hover:text-amber-400">{item.award}</span>
                  <span className="font-mono text-sm text-neutral-400 transition-colors group-hover:text-white">{item.year}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-lg font-semibold tracking-tight text-amber-400">
              Personal &amp; Team recognition
            </h4>
            <div className="space-y-2">
              {teamAwards.map((item, idx) => (
                <div key={idx} className="group flex items-center justify-between border-b border-white/[0.03] py-2.5 text-sm transition-colors hover:border-amber-500/20">
                  <span className="font-mono text-base text-neutral-200 transition-colors group-hover:text-amber-400">{item.award}</span>
                  <span className="font-mono text-sm text-neutral-400 transition-colors group-hover:text-white">{item.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* SECTION 3.7: CLIENT WORDS */}
      <div className="space-y-6 relative py-4 scroll-mt-24" id="chapter-testimonials">
        {/* Huge backdrop of words left reveal */}
        <motion.div
          className="mb-8 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-6 sm:px-8 sm:py-8 [container-type:inline-size]"
          initial={{ opacity: 0, x: -90 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block whitespace-nowrap font-display text-[clamp(2.6rem,12cqw,7.5rem)] font-black uppercase leading-[0.82] tracking-[-0.055em] text-neutral-300">
            WORDS MATTER
          </span>
        </motion.div>

        {/* Huge backdrop of words (Continuous Arrow Marquee) */}
        <div className="hidden">
          <div className="relative w-full flex overflow-hidden whitespace-nowrap">
            <div className="animate-marquee flex-none min-w-full flex justify-around gap-12 text-4xl sm:text-6xl md:text-[75px] font-black uppercase text-white tracking-widest leading-none pr-10">
              <span>WORDS MATTER → WORDS MATTER → WORDS MATTER → WORDS MATTER → </span>
            </div>
            <div className="animate-marquee flex-none min-w-full flex justify-around gap-12 text-4xl sm:text-6xl md:text-[75px] font-black uppercase text-white tracking-widest leading-none pr-10" aria-hidden="true">
              <span>WORDS MATTER → WORDS MATTER → WORDS MATTER → WORDS MATTER → </span>
            </div>
          </div>
        </div>
        <div className="relative space-y-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.86 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-display text-4xl sm:text-6xl text-white font-extrabold tracking-tight select-none">
              Feedback That <span className="text-neutral-500">Fuels Me</span>
            </h3>
          </motion.div>

          <div className="relative mx-auto max-w-2xl space-y-6 px-2 sm:px-6" id="testimonials-list">
            {feedback.map((f, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.a
                  key={idx}
                  href={LINKEDIN_RECOMMENDATIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${f.author}'s recommendation on LinkedIn`}
                  className={`group/recommendation relative flex cursor-pointer flex-col justify-between rounded-2xl border border-white/[0.09] bg-white/[0.012] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_18px_45px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/25 hover:bg-white/[0.035] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.11),0_24px_60px_rgba(0,0,0,0.22)] sm:p-8 ${
                    isEven 
                      ? "pl-14 sm:pl-20 text-left" 
                      : "pr-14 sm:pr-20 text-left"
                  }`}
                  id={`testimonial-row-${idx}`}
                  initial={{ opacity: 0, scale: 0.82 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.35 }}
                  transition={{ duration: 0.72, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Floating Avatar. Offset left or right depending on row layout */}
                  <div className={`absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl top-1/2 -translate-y-1/2 ${
                    isEven 
                      ? "left-[#10px] sm:left-[-24px]" 
                      : "right-[#10px] sm:right-[-24px]"
                  }`}>
                    <img 
                      src={f.avatarUrl}
                      alt={f.author}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale brightness-[0.85] transition-all duration-300 group-hover/recommendation:grayscale-0 group-hover/recommendation:brightness-100"
                    />
                  </div>

                  {/* Body Copy - Monospace code block style */}
                  <p className="mb-5 font-mono text-sm font-light leading-7 text-neutral-200 select-text sm:text-base sm:leading-8">
                    <span className="text-amber-400 font-bold text-sm mr-1">“</span>
                    {f.quote}
                    <span className="text-amber-400 font-bold text-sm ml-1">”</span>
                  </p>
                  
                  {/* Author Line */}
                  <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs sm:text-sm">
                    <span>
                      <span className="text-white font-bold">{f.author}</span>
                      <span className="text-neutral-400">, {f.role}</span>
                    </span>
                    <span className="text-amber-400 transition-transform duration-300 group-hover/recommendation:translate-x-1">
                      Click here →
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>

        </>
      )}
    </section>
  );
}
