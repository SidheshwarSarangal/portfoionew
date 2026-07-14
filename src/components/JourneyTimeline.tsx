import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
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

const TOOL_SYMBOLS = [
  { name: "Python", short: "Py", icon: "https://cdn.simpleicons.org/python/3776ab", color: "#3776ab" },
  { name: "MERN Stack", short: "M", icon: "https://cdn.simpleicons.org/mongodb/47a248", color: "#47a248" },
  { name: "Angular", short: "A", icon: "https://cdn.simpleicons.org/angular/dd0031", color: "#dd0031" },
  { name: "C++", short: "C++", icon: "https://cdn.simpleicons.org/cplusplus/659ad2", color: "#659ad2" },
  { name: "Git", short: "Git", icon: "https://cdn.simpleicons.org/git/f05032", color: "#f05032" },
  { name: "VS Code", short: "VS", icon: "https://cdn.simpleicons.org/visualstudiocode/23a8f2", color: "#23a8f2" },
  { name: "Codex", short: "AI", icon: "https://cdn.simpleicons.org/openai/10a37f", color: "#10a37f" },
  { name: "JavaScript", short: "JS", icon: "https://cdn.simpleicons.org/javascript/f7df1e", color: "#f7df1e" },
  { name: "TypeScript", short: "TS", icon: "https://cdn.simpleicons.org/typescript/3178c6", color: "#3178c6" },
  { name: "Electron", short: "E", icon: "https://cdn.simpleicons.org/electron/9feaf9", color: "#9feaf9" },
  { name: "React", short: "R", icon: "https://cdn.simpleicons.org/react/61dafb", color: "#61dafb" },
  { name: "Node.js", short: "N", icon: "https://cdn.simpleicons.org/nodedotjs/5fa04e", color: "#5fa04e" },
  { name: "Spring Boot", short: "S", icon: "https://cdn.simpleicons.org/springboot/6db33f", color: "#6db33f" },
  { name: "Docker", short: "D", icon: "https://cdn.simpleicons.org/docker/2496ed", color: "#2496ed" },
  { name: "Kubernetes", short: "K8s", icon: "https://cdn.simpleicons.org/kubernetes/326ce5", color: "#326ce5" },
  { name: "PostgreSQL", short: "SQL", icon: "https://cdn.simpleicons.org/postgresql/5b8fc8", color: "#5b8fc8" },
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
  const portraitY = useTransform(aboutScrollProgress, [0, 1], [-90, portraitTravel]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 640px)");
    const update = () => setWideAboutLayout(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
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
      className="w-full max-w-5xl mx-auto px-6 py-12 border-t border-white/5 space-y-14 relative select-text"
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
            <div className="mb-3 flex items-center gap-1 font-mono text-xs text-neutral-500 select-none">
              <span>&lt;!--</span><span>About section</span><span>--&gt;</span>
            </div>
            <span className="block whitespace-nowrap font-display text-[clamp(3.2rem,14cqw,8.6rem)] font-black uppercase leading-[0.82] tracking-[-0.055em] text-neutral-300">
              SINCE 2022
            </span>
          </motion.div>

          <div ref={aboutTrackRef} className="relative grid grid-cols-1 gap-12 sm:grid-cols-12 sm:gap-8 lg:gap-12">
            <div className="space-y-20 sm:col-span-7 lg:col-span-8">
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
                <div className="flex items-center gap-1 font-mono text-xs text-neutral-500 select-none">
                  <span>&lt;!--</span><span>What I do</span><span>--&gt;</span>
                </div>
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

              <motion.div
                className="space-y-7 scroll-mt-24"
                id="chapter-tech-stack"
                initial={{ opacity: 0, x: -86 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.16 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-1 font-mono text-xs text-neutral-500 select-none">
                  <span>&lt;!--</span><span>My tech stack</span><span>--&gt;</span>
                </div>
                <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">Tools I Build With</h2>
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {TOOL_SYMBOLS.map((tool, idx) => (
                    <motion.div
                      key={tool.name}
                      className="group relative aspect-square min-h-40 overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.11),0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_24px_60px_rgba(0,0,0,0.34)]"
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: (idx % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div
                        className="pointer-events-none absolute inset-0 opacity-35 transition-opacity duration-500 group-hover:opacity-55"
                        style={{ background: `radial-gradient(circle at 50% 44%, ${tool.color}45 0%, ${tool.color}16 34%, transparent 70%)` }}
                      />
                      <div className="absolute inset-0 grid place-items-center p-[22%] transition-all duration-500 group-hover:-translate-y-3 group-hover:scale-95">
                        <span className="font-mono text-2xl font-black" style={{ color: tool.color }}>{tool.short}</span>
                        <img
                          src={tool.icon}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.34)]"
                        />
                      </div>
                      <div className="absolute inset-x-3 bottom-3 translate-y-3 rounded-xl border border-white/15 bg-black/30 px-3 py-3 text-center opacity-0 shadow-lg backdrop-blur-xl transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-white sm:text-sm">{tool.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="sm:col-span-5 lg:col-span-4">
                <motion.div
                  ref={portraitCardRef}
                  className="flex flex-col items-center gap-4 sm:items-end"
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                  style={wideAboutLayout && !reduceMotion ? { y: portraitY } : undefined}
                >
                  <div className="relative aspect-[2/3] w-full max-w-[310px] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                    <img src={aboutPortraitUrl} alt="Sidheshwar Sarangal" className="h-full w-full object-contain object-bottom transition-transform duration-700 hover:scale-[1.02]" />
                  </div>
                  <div className="flex items-center gap-4 pr-1 font-mono text-xs text-neutral-500 select-none">
                    <span>follow me:</span>
                    <a href="https://github.com/mrsidverse" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-amber-400" title="GitHub"><Github size={14} /></a>
                    <a href="https://x.com/mrsidverse" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-amber-400" title="X"><Twitter size={14} /></a>
                    <a href="https://www.linkedin.com/in/sidheshwar-sarangal-0b31482b8/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-amber-400" title="LinkedIn"><Linkedin size={14} /></a>
                  </div>
                </motion.div>
            </div>
          </div>
        </div>
      )}

      {showExperience && (
        <>
      {/* SECTION 3.5: METICULOUS EDUCATION ARCHIVES (Practice Chronology List) */}
      <div className="space-y-5 scroll-mt-24" id="chapter-history">
        {/* Massive Backdrop text: EXPERIENCE left reveal */}
        <div
          className="group/experience relative w-full overflow-hidden select-none mb-5 h-[clamp(88px,16cqw,180px)] flex items-center [container-type:inline-size]"
        >
          <div className="relative w-full flex items-center justify-start px-[clamp(12px,4vw,72px)] whitespace-nowrap">
            <span
              className="font-display text-[clamp(44px,16cqw,132px)] font-black uppercase text-neutral-700 leading-none transition-colors duration-300 group-hover/experience:text-neutral-300"
            >
              EXPERIENCE
            </span>
          </div>
        </div>

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
        {/* Commentary Marker */}
        <div className="font-mono text-[11px] text-neutral-600 flex items-center gap-1 select-none">
          <span>&lt;!--</span>
          <span className="text-neutral-500 font-medium">Practice Chronologies</span>
          <span>--&gt;</span>
        </div>

        

        <div className="relative border-l border-white/5 ml-3 pl-6 space-y-6" id="histories-timeline-track">
          {TIMELINE.map((event) => (
            <div key={event.id} className="relative group" id={`history-node-${event.id}`}>
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#070809] border border-white/10 flex items-center justify-center text-neutral-500 group-hover:border-amber-500/30 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-amber-400 transition-colors" />
              </div>

              <div className="space-y-2" id={`history-node-body-${event.id}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5" id={`history-node-header-${event.id}`}>
                  <div>
                    <h3 className="font-mono text-sm sm:text-base text-white/90 font-semibold group-hover:text-amber-400 transition-colors">
                      {event.role}
                    </h3>
                    <div className="font-mono text-[11px] text-neutral-500 mt-0.5">
                      <span className="text-neutral-300 font-medium">{event.organization}</span>
                      <span className="mx-1.5">•</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-neutral-400 bg-white/5 border border-[#ffffff08] px-2 py-0.5 rounded self-start sm:self-center group-hover:text-amber-400 group-hover:border-amber-500/25 transition-all">
                    {event.period}
                  </span>
                </div>

                <p className="font-mono text-xs sm:text-sm text-neutral-450 font-light leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3.6: CLIENT WORDS */}
      <div className="space-y-6 relative py-4 scroll-mt-24" id="chapter-testimonials">
        {/* Huge backdrop of words left reveal */}
        <div
          className="group/words relative w-full overflow-hidden select-none mb-5 h-[clamp(88px,16cqw,180px)] flex items-center [container-type:inline-size]"
        >
          <div className="relative w-full flex items-center justify-start px-[clamp(12px,4vw,72px)] whitespace-nowrap">
            <span className="font-display text-[clamp(44px,16cqw,132px)] font-black uppercase text-neutral-700 leading-none transition-colors duration-300 group-hover/words:text-neutral-300">
              WORDS MATTER
            </span>
          </div>
        </div>

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
        {/* Commentary Marker */}
        <div className="font-mono text-[11px] text-neutral-600 flex items-center gap-1 select-none">
          <span>&lt;!--</span>
          <span className="text-neutral-500 font-medium">What clients say</span>
          <span>--&gt;</span>
        </div>

        

        <div className="relative space-y-10">
          <div className="text-center">
            <h3 className="font-display text-4xl sm:text-6xl text-white font-extrabold tracking-tight select-none">
              Feedback That <span className="text-neutral-500">Fuels Me</span>
            </h3>
          </div>

          <div className="space-y-6 max-w-2xl mx-auto px-6 relative" id="testimonials-list">
            {feedback.map((f, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx} 
                  className={`relative p-6 sm:p-8 bg-[#090a0c]/85 border border-white/5 rounded-2xl hover:border-amber-500/20 transition-all duration-300 flex flex-col justify-between ${
                    isEven 
                      ? "pl-14 sm:pl-20 text-left" 
                      : "pr-14 sm:pr-20 text-left"
                  }`}
                  id={`testimonial-row-${idx}`}
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
                      className="w-full h-full object-cover grayscale brightness-[0.85] hover:grayscale-0 hover:brightness-100 transition-all duration-300"
                    />
                  </div>

                  {/* Body Copy - Monospace code block style */}
                  <p className="font-mono text-xs sm:text-[13px] text-neutral-300 font-light leading-relaxed select-text mb-4">
                    <span className="text-amber-400 font-bold text-sm mr-1">“</span>
                    {f.quote}
                    <span className="text-amber-400 font-bold text-sm ml-1">”</span>
                  </p>
                  
                  {/* Author Line */}
                  <div className="font-mono text-[10px] sm:text-xs">
                    <span className="text-white font-bold">{f.author}</span>
                    <span className="text-neutral-500">, {f.role}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center pt-4">
            <button className="px-5 py-2 bg-white/5 border border-white/5 hover:border-amber-500/20 hover:text-amber-400 text-neutral-300 font-mono text-[10px] rounded-lg transition-colors hover:bg-white/10 select-none">
              Load more
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 3.7: ACHIEVEMENTS & AWARDS */}
      <div className="space-y-5 border-t border-white/5 pt-12 scroll-mt-24" id="chapter-awards">
        {/* Commentary Marker */}
        <div className="font-mono text-[11px] text-neutral-600 flex items-center gap-1 select-none">
          <span>&lt;!--</span>
          <span className="text-neutral-500 font-medium">Achievements & Awards</span>
          <span>--&gt;</span>
        </div>

        {/* Table representation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-1">
          {/* Industry Recognition Column */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] text-amber-500 uppercase tracking-widest font-bold">
              // Industry recognition
            </h4>
            <div className="space-y-2">
              {industryAwards.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-1.5 border-b border-white/[0.03] text-sm group hover:border-amber-550/20 transition-colors">
                  <span className="font-mono text-neutral-200 group-hover:text-amber-400 transition-colors">{item.award}</span>
                  <span className="font-mono text-xs text-neutral-500 group-hover:text-white transition-colors">{item.year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Recognition Column */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] text-amber-500 uppercase tracking-widest font-bold">
              // Personal & Team recognition
            </h4>
            <div className="space-y-2">
              {teamAwards.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-1.5 border-b border-white/[0.03] text-sm group hover:border-amber-550/20 transition-colors">
                  <span className="font-mono text-neutral-200 group-hover:text-amber-400 transition-colors">{item.award}</span>
                  <span className="font-mono text-xs text-neutral-500 group-hover:text-white transition-colors">{item.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
        </>
      )}
    </section>
  );
}
