import { motion } from "motion/react";
import { useState } from "react";
import type { RefObject } from "react";
import {
  Boxes,
  Bug,
  CreditCard,
  Database,
  DatabaseZap,
  FlaskConical,
  HardDrive,
  KeyRound,
  MailOpen,
  Network,
  Paintbrush,
  RadioTower,
  Sparkles,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { usePortfolioContent } from "../content";

interface JourneyTimelineProps {
  section?: "about" | "experience" | "all";
  containerRef?: RefObject<HTMLDivElement | null>;
}

const DEVICON_ROOT = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const LINKEDIN_RECOMMENDATIONS_URL = "https://www.linkedin.com/in/sidheshwar-sarangal-0b31482b8/";

const TOOL_SYMBOLS: Array<{
  name: string;
  icon?: string;
  glyph?: LucideIcon;
  color: string;
}> = [
  { name: "Java", icon: `${DEVICON_ROOT}/java/java-original.svg`, color: "#f89820" },
  { name: "Python", icon: `${DEVICON_ROOT}/python/python-original.svg`, color: "#3776ab" },
  { name: "C++", icon: `${DEVICON_ROOT}/cplusplus/cplusplus-original.svg`, color: "#659ad2" },
  { name: "JavaScript", icon: `${DEVICON_ROOT}/javascript/javascript-original.svg`, color: "#f7df1e" },
  { name: "TypeScript", icon: `${DEVICON_ROOT}/typescript/typescript-original.svg`, color: "#3178c6" },
  { name: "React", icon: `${DEVICON_ROOT}/react/react-original.svg`, color: "#61dafb" },
  { name: "Angular", icon: `${DEVICON_ROOT}/angular/angular-original.svg`, color: "#dd0031" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff", color: "#ffffff" },
  { name: "Redux Toolkit", icon: `${DEVICON_ROOT}/redux/redux-original.svg`, color: "#764abc" },
  { name: "Tailwind CSS", icon: `${DEVICON_ROOT}/tailwindcss/tailwindcss-original.svg`, color: "#06b6d4" },
  { name: "Vite", icon: `${DEVICON_ROOT}/vitejs/vitejs-original.svg`, color: "#646cff" },
  { name: "Electron", icon: `${DEVICON_ROOT}/electron/electron-original.svg`, color: "#9feaf9" },
  { name: "Canvas", glyph: Paintbrush, color: "#f7df1e" },
  { name: "Chrome Extensions", icon: `${DEVICON_ROOT}/chrome/chrome-original.svg`, color: "#4285f4" },
  { name: "Node.js", icon: `${DEVICON_ROOT}/nodejs/nodejs-original.svg`, color: "#5fa04e" },
  { name: "Express", icon: "https://cdn.simpleicons.org/express/ffffff", color: "#ffffff" },
  { name: "FastAPI", icon: `${DEVICON_ROOT}/fastapi/fastapi-original.svg`, color: "#009688" },
  { name: "Spring Boot", icon: `${DEVICON_ROOT}/spring/spring-original.svg`, color: "#6db33f" },
  { name: "REST APIs", glyph: Network, color: "#7aa7ff" },
  { name: "JWT", icon: "https://cdn.simpleicons.org/jsonwebtokens/d8a0d2", color: "#d8a0d2" },
  { name: "Passport", icon: "https://cdn.simpleicons.org/passport/34e27a", color: "#34e27a" },
  { name: "bcrypt", glyph: KeyRound, color: "#f59e0b" },
  { name: "Zod", icon: "https://cdn.simpleicons.org/zod/3e67b1", color: "#3e67b1" },
  { name: "MongoDB", icon: `${DEVICON_ROOT}/mongodb/mongodb-original.svg`, color: "#47a248" },
  { name: "Mongoose", icon: `${DEVICON_ROOT}/mongoose/mongoose-original.svg`, color: "#880000" },
  { name: "MySQL", icon: `${DEVICON_ROOT}/mysql/mysql-original.svg`, color: "#4479a1" },
  { name: "Spring Data JPA", glyph: DatabaseZap, color: "#6db33f" },
  { name: "H2", glyph: Database, color: "#1e88e5" },
  { name: "OpenSearch", icon: "https://cdn.simpleicons.org/opensearch/005eb8", color: "#005eb8" },
  { name: "Apache Kafka", icon: `${DEVICON_ROOT}/apachekafka/apachekafka-original.svg`, color: "#ffffff" },
  { name: "Socket.IO", icon: "https://cdn.simpleicons.org/socketdotio/ffffff", color: "#ffffff" },
  { name: "Ollama", icon: "https://cdn.simpleicons.org/ollama/ffffff", color: "#ffffff" },
  { name: "Gemma 3", glyph: Sparkles, color: "#7aa7ff" },
  { name: "Groq AI", glyph: Zap, color: "#f55036" },
  { name: "Scrapy", glyph: Bug, color: "#60a839" },
  { name: "Gmail API", icon: "https://cdn.simpleicons.org/gmail/ea4335", color: "#ea4335" },
  { name: "Cloudinary", icon: "https://cdn.simpleicons.org/cloudinary/3448c5", color: "#3448c5" },
  { name: "Cashfree", glyph: CreditCard, color: "#34a853" },
  { name: "MIME Processing", glyph: MailOpen, color: "#a78bfa" },
  { name: "Browser Storage", glyph: HardDrive, color: "#fbbf24" },
  { name: "Docker", icon: `${DEVICON_ROOT}/docker/docker-original.svg`, color: "#2496ed" },
  { name: "Kubernetes", icon: `${DEVICON_ROOT}/kubernetes/kubernetes-original.svg`, color: "#326ce5" },
  { name: "Kind", glyph: Boxes, color: "#326ce5" },
  { name: "Git", icon: `${DEVICON_ROOT}/git/git-original.svg`, color: "#f05032" },
  { name: "Linux", icon: `${DEVICON_ROOT}/linux/linux-original.svg`, color: "#fcc624" },
  { name: "Maven", icon: `${DEVICON_ROOT}/maven/maven-original.svg`, color: "#c71a36" },
  { name: "Unit Tests", glyph: FlaskConical, color: "#34a853" },
  { name: "Embedded Kafka", glyph: RadioTower, color: "#e5e7eb" },
];

export default function JourneyTimeline({ section = "all" }: JourneyTimelineProps) {
  const {
    timeline: TIMELINE,
    capabilities: whatIDo,
    industryAwards,
    teamAwards,
    testimonials: feedback,
  } = usePortfolioContent();
  const showAbout = section !== "experience";
  const showExperience = section !== "about";
  const aboutPortraitUrl = `${import.meta.env.BASE_URL}images/profile/general-image.png`;
  const [selectedCapabilityIndex, setSelectedCapabilityIndex] = useState(0);
  const selectedCapability = whatIDo[selectedCapabilityIndex] ?? whatIDo[0];
  return (
    <section
      id={section === "experience" ? "experience" : "about"}
      className="relative mx-auto w-full max-w-5xl space-y-11 border-t border-white/5 px-3 py-9 [container-type:inline-size] select-text sm:space-y-14 sm:px-6 sm:py-12"
    >
      {showAbout && (
        <div className="relative" id="chapter-about">
          <motion.div
            className="mb-7 overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-5 sm:mb-8 sm:rounded-2xl sm:px-8 sm:py-8 [container-type:inline-size]"
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block whitespace-nowrap font-display text-[clamp(3.2rem,14cqw,8.6rem)] font-black uppercase leading-[0.82] tracking-[-0.055em] text-neutral-300">
              SINCE 2022
            </span>
          </motion.div>

          <div className="about-track relative grid gap-10 sm:gap-12">
            <div className="min-w-0 space-y-12 sm:space-y-20">
              <motion.div
                className="space-y-6"
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-display text-[2.55rem] font-extrabold leading-[0.98] tracking-tight text-white min-[380px]:text-5xl lg:text-6xl">
                  Inside My Creative Core
                </h2>
                <div className="space-y-5 font-mono text-sm font-light leading-7 text-neutral-300 sm:text-[15px] lg:text-base lg:leading-8">
                  <p className="italic text-neutral-100">Hello,</p>
                  <p>
                    I'm Sidheshwar, a <span className="font-semibold text-amber-300">Software Engineer and Full-Stack Developer</span> pursuing B.Tech at IIT Roorkee. I enjoy understanding how things work, asking the extra question, and staying with a problem until the solution feels both useful and clear.
                  </p>
                  <p>
                    What I love most is the journey from a rough thought to a working product. I like shaping the idea, planning the backend, building the APIs, and then connecting everything to an interface that feels natural to use. That ability to <span className="font-semibold text-amber-300">turn an idea into a complete product</span> is what keeps me excited about engineering.
                  </p>
                  <p>
                    So far, I have worked on AI-assisted platforms, workflow engines, collaborative applications, social products, and transaction-processing systems. My toolkit includes Spring Boot, Python, MERN, Docker, and Kubernetes, but I care more about why a technology is being used than simply adding it to a stack.
                  </p>
                  <p>
                    I try to write code that is <span className="font-semibold text-amber-300">reliable, understandable, and easy to build upon</span>. Performance and maintainability matter to me, but so does the person on the other side of the screen. A system feels complete only when it solves the intended problem without making the experience harder.
                  </p>
                  <p>
                    Outside of building, I share DSA concepts, engineering lessons, and useful opportunities with a growing <span className="font-semibold text-amber-300">family of 9,000+ people on LinkedIn</span>. The conversations there keep me connected to other learners and builders, help me explain technical ideas more clearly, and make learning feel like something we do together.
                  </p>
                  <p>
                    I'm still learning, still experimenting, and still finding better ways to build. If you're working on something meaningful, I'd be happy to hear about it.
                  </p>
                  <p className="pt-1 italic text-neutral-100">Warmly,<br /><span className="font-semibold not-italic text-amber-300">Sidheshwar</span></p>
                </div>
              </motion.div>
            </div>

            <div className="min-w-0">
                <motion.div
                  className="about-portrait-sticky flex flex-col items-center gap-4 sm:items-end"
                  transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                    <img src={aboutPortraitUrl} alt="Sidheshwar Sarangal" className="h-full w-full object-cover object-[55%_center] transition-transform duration-700 hover:scale-[1.02]" />
                  </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="mt-14 w-full space-y-7 scroll-mt-24 sm:mt-20"
            id="chapter-what-i-do"
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">Capabilities</h2>
            <div className="grid grid-cols-[minmax(105px,0.72fr)_minmax(0,1.55fr)] gap-5 sm:grid-cols-[minmax(210px,0.78fr)_minmax(0,1.7fr)] sm:gap-10 lg:gap-14">
              <div className="relative border-r border-white/10 pr-3 sm:pr-7" role="tablist" aria-label="Capability categories">
                {whatIDo.map((capability, index) => {
                  const isSelected = index === selectedCapabilityIndex;
                  return (
                    <button
                      key={capability.num}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-controls="selected-capability"
                      onClick={() => setSelectedCapabilityIndex(index)}
                      className={`group relative block w-full py-3 text-left font-mono transition-colors duration-300 focus-visible:outline-none sm:py-4 ${
                        isSelected ? "text-amber-300" : "text-neutral-500 hover:text-neutral-200"
                      }`}
                    >
                      <span className="mb-1 block text-[10px] font-semibold tracking-[0.16em] sm:text-xs">
                        {capability.num}
                      </span>
                      <span className="block text-xs font-semibold leading-5 sm:text-base sm:leading-6">
                        {capability.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`absolute -right-[13px] top-1/2 h-7 w-px -translate-y-1/2 bg-amber-300 transition-all duration-300 sm:-right-[29px] ${
                          isSelected ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="flex min-h-full min-w-0 flex-col">
                {selectedCapability && (
                  <motion.div
                    key={selectedCapability.num}
                    id="selected-capability"
                    role="tabpanel"
                    className="min-w-0 py-3 sm:py-4"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="mb-6 font-display text-2xl font-semibold leading-tight tracking-tight text-white sm:mb-8 sm:text-4xl">
                      {selectedCapability.title}
                    </p>
                    <div className="flex flex-wrap gap-x-5 gap-y-3 sm:gap-x-7 sm:gap-y-4">
                      {selectedCapability.items.map((item, index) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-2 font-mono text-sm font-medium leading-6 text-neutral-200 transition-colors duration-200 hover:text-amber-300 sm:text-base sm:leading-7"
                        >
                          <span className="h-1 w-1 shrink-0 rounded-full bg-amber-300/70" aria-hidden="true" />
                          {item}
                          {index < selectedCapability.items.length - 1 && (
                            <span className="ml-2 hidden text-neutral-700 sm:inline" aria-hidden="true">/</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div className="mt-auto min-w-0 pt-8 sm:pt-10" id="chapter-tech-stack">
                  <div className="tech-gallery relative overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.018] py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_55px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:py-10">
                    <div className="tech-gallery-track flex w-max items-center">
                      {[0, 1].map((copy) => (
                        <div key={copy} className="flex shrink-0 items-center gap-5 pr-5 sm:gap-6 sm:pr-6" aria-hidden={copy === 1}>
                          {TOOL_SYMBOLS.map((tool) => (
                            <div
                              key={`${copy}-${tool.name}`}
                              role="img"
                              aria-label={copy === 0 ? tool.name : undefined}
                              tabIndex={copy === 0 ? 0 : -1}
                              className="group relative grid h-28 w-28 shrink-0 place-items-center outline-none sm:h-40 sm:w-40"
                            >
                              <span className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 scale-90 whitespace-nowrap rounded-full border border-white/20 bg-neutral-950/85 px-3 py-1.5 font-mono text-[11px] font-semibold tracking-wide text-white opacity-0 shadow-[0_8px_28px_rgba(0,0,0,0.48)] backdrop-blur-xl transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                                {tool.name}
                              </span>
                              <span className="relative grid h-full w-full place-items-center overflow-hidden rounded-2xl border border-white/[0.11] bg-black/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.09)] transition-colors duration-300 group-hover:border-white/25 group-focus-visible:border-white/25">
                                <span
                                  className="pointer-events-none absolute inset-0 opacity-20 blur-xl transition-opacity duration-300 group-hover:opacity-40 group-focus-visible:opacity-40"
                                  style={{ background: `radial-gradient(circle at center, ${tool.color} 0%, transparent 68%)` }}
                                />
                                {tool.icon ? (
                                  <img
                                    src={tool.icon}
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                    className="relative h-16 w-16 object-contain drop-shadow-[0_10px_22px_rgba(0,0,0,0.38)] transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110 sm:h-24 sm:w-24"
                                  />
                                ) : tool.glyph ? (
                                  <tool.glyph
                                    aria-hidden="true"
                                    strokeWidth={1.55}
                                    className="relative h-16 w-16 drop-shadow-[0_10px_22px_rgba(0,0,0,0.38)] transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110 sm:h-24 sm:w-24"
                                    style={{ color: tool.color }}
                                  />
                                ) : null}
                              </span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
          className="mb-7 overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-5 sm:mb-8 sm:rounded-2xl sm:px-8 sm:py-8 [container-type:inline-size]"
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
        <div className="relative ml-2 space-y-5 border-l border-white/5 pl-4 sm:ml-3 sm:space-y-6 sm:pl-6" id="histories-timeline-track">
          {TIMELINE.map((event, idx) => (
            <motion.div
              key={event.id}
              className="group relative min-w-0 rounded-xl border border-transparent px-2 py-3 transition-colors hover:border-white/[0.06] hover:bg-white/[0.025] sm:px-3"
              id={`history-node-${event.id}`}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute -left-[25px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-white/10 bg-[#070809] text-neutral-500 transition-colors group-hover:border-amber-500/30 sm:-left-[31px]">
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
        className="space-y-6 border-t border-white/5 pt-9 scroll-mt-24 sm:pt-12"
        id="chapter-awards"
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-7 overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-5 sm:mb-8 sm:rounded-2xl sm:px-8 sm:py-8 [container-type:inline-size]">
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
                <div key={idx} className="group flex items-start justify-between gap-3 border-b border-white/[0.03] py-2.5 text-sm transition-colors hover:border-amber-500/20">
                  <span className="min-w-0 font-mono text-sm leading-6 text-neutral-200 transition-colors group-hover:text-amber-400 sm:text-base">{item.award}</span>
                  <span className="shrink-0 font-mono text-xs leading-6 text-neutral-400 transition-colors group-hover:text-white sm:text-sm">{item.year}</span>
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
                <div key={idx} className="group flex items-start justify-between gap-3 border-b border-white/[0.03] py-2.5 text-sm transition-colors hover:border-amber-500/20">
                  <span className="min-w-0 font-mono text-sm leading-6 text-neutral-200 transition-colors group-hover:text-amber-400 sm:text-base">{item.award}</span>
                  <span className="shrink-0 font-mono text-xs leading-6 text-neutral-400 transition-colors group-hover:text-white sm:text-sm">{item.year}</span>
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
          className="mb-7 overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-5 sm:mb-8 sm:rounded-2xl sm:px-8 sm:py-8 [container-type:inline-size]"
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
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-display text-3xl text-white font-extrabold tracking-tight select-none min-[380px]:text-4xl sm:text-6xl">
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
                  className={`group/recommendation relative flex cursor-pointer flex-col justify-between rounded-2xl border border-white/[0.09] bg-white/[0.012] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_18px_45px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/25 hover:bg-white/[0.035] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.11),0_24px_60px_rgba(0,0,0,0.22)] sm:p-8 ${
                    isEven 
                      ? "pl-14 sm:pl-20 text-left" 
                      : "pr-14 sm:pr-20 text-left"
                  }`}
                  id={`testimonial-row-${idx}`}
                  transition={{ duration: 0.72, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Floating Avatar. Offset left or right depending on row layout */}
                  <div className={`absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl top-1/2 -translate-y-1/2 ${
                    isEven 
                      ? "left-[#10px] sm:left-[-24px]" 
                      : "right-[#10px] sm:right-[-24px]"
                  }`}>
                    {f.avatarCrop ? (
                      <div
                        role="img"
                        aria-label={f.author}
                        className="h-full w-full bg-no-repeat grayscale brightness-[0.85] transition-all duration-300 group-hover/recommendation:grayscale-0 group-hover/recommendation:brightness-100"
                        style={{
                          backgroundImage: `url(${f.avatarUrl})`,
                          backgroundSize: `${(f.avatarCrop.sourceWidth / f.avatarCrop.size) * 100}% ${(f.avatarCrop.sourceHeight / f.avatarCrop.size) * 100}%`,
                          backgroundPosition: `${(f.avatarCrop.x / (f.avatarCrop.sourceWidth - f.avatarCrop.size)) * 100}% ${(f.avatarCrop.y / (f.avatarCrop.sourceHeight - f.avatarCrop.size)) * 100}%`,
                        }}
                      />
                    ) : (
                      <img
                        src={f.avatarUrl}
                        alt={f.author}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover grayscale brightness-[0.85] transition-all duration-300 group-hover/recommendation:grayscale-0 group-hover/recommendation:brightness-100"
                      />
                    )}
                  </div>

                  {/* Body Copy - Monospace code block style */}
                  <p className="mb-5 font-mono text-sm font-light leading-7 text-neutral-200 select-text sm:text-base sm:leading-8">
                    <span className="text-amber-400 font-bold text-sm mr-1">“</span>
                    {f.quote}
                    <span className="text-amber-400 font-bold text-sm ml-1">”</span>
                  </p>
                  
                  {/* Author Line */}
                  <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs sm:text-sm">
                    <span className="min-w-0">
                      <span className="text-white font-bold">{f.author}</span>
                      <span className="text-neutral-400">, {f.role}</span>
                      {f.date && <span className="mt-1 block text-[11px] text-neutral-500 sm:text-xs">{f.date}</span>}
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
