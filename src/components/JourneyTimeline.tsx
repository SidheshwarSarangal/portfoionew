import { motion } from "motion/react";
import { usePortfolioContent } from "../content";
import { 
  Briefcase, GraduationCap, Github, Twitter, Linkedin, ArrowDown, UserCheck 
} from "lucide-react";
import DecryptText from "./DecryptText";

export default function JourneyTimeline() {
  const {
    timeline: TIMELINE,
    experienceSummary: experiences,
    capabilities: whatIDo,
    techSkills,
    industryAwards,
    teamAwards,
    testimonials: feedback,
  } = usePortfolioContent();

  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-10 border-t border-white/5 space-y-12 relative select-text">
      
      {/* SECTION 3.1: ABOUT ME & PREVIOUS LIFE COMBINED */}
      <div className="relative group" id="chapter-about">
        {/* Massive Backdrop text: SINCE 2022 left reveal */}
        <motion.div
          className="group/since relative w-full overflow-hidden select-none mb-5 h-[clamp(88px,16cqw,180px)] flex items-center [container-type:inline-size]"
          initial={{ opacity: 0, x: "-18%" }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.45 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-full flex items-center justify-start px-[clamp(12px,4vw,72px)] whitespace-nowrap">
            <span
              className="font-display text-[clamp(44px,16cqw,132px)] font-black uppercase text-neutral-700 leading-none transition-colors duration-300 group-hover/since:text-neutral-300"
            >
              SINCE 2022
            </span>
          </div>
        </motion.div>

        {/* Commentary Marker */}
        <div className="font-mono text-[11px] text-neutral-600 mb-4 flex items-center gap-1 select-none">
          <span>&lt;!--</span>
          <span className="text-neutral-500 font-medium">About & experience section</span>
          <span>--&gt;</span>
        </div>

        

        <div className="relative grid grid-cols-1 sm:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Left Column Description + Previous Life */}
          <div className="sm:col-span-7 md:col-span-8 space-y-10">
            
            {/* About text segment */}
            <div className="space-y-4">
              <h2 className="font-display text-4xl sm:text-5xl text-white font-extrabold tracking-tight">
                Inside My Creative Core
              </h2>

              <div className="text-neutral-400 font-mono text-xs sm:text-[13px] leading-relaxed space-y-3 font-light font-light">
                <p>
                  I'm a <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 font-mono text-xs text-amber-400 font-semibold shadow-sm select-text">Software Engineer and Full-Stack Developer</span> with strong foundations in DSA, REST APIs, and product-focused engineering. I work across Spring Boot, Python, MERN, Docker, and Kubernetes to build reliable, usable systems.
                </p>
                <p>
                  I enjoy collaborating with teams, solving real-world problems, and <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 font-mono text-xs text-amber-400 font-medium select-text">turning complex workflows into clean application code</span>.
                </p>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => window.open("mailto:sidheshwar.sarangal22@gmail.com")}
                  className="px-5 py-2.5 bg-[#0e0f11] border border-white/5 hover:border-amber-500/25 hover:bg-neutral-900 text-neutral-300 font-mono font-medium text-xs rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-md select-none hover:text-amber-400"
                >
                  <span>Download CV</span>
                  <ArrowDown size={12} className="text-neutral-500" />
                </button>
              </div>
            </div>

            {/* Previous Life Timeline list inside the same grid column to stick the right image */}
            <div className="space-y-4" id="chapter-previous-life">
              {/* Commentary Marker */}
              <div className="font-mono text-[11px] text-neutral-600 flex items-center gap-1 select-none">
                <span>&lt;!--</span>
                <span className="text-neutral-500 font-medium">In a previous life</span>
                <span>--&gt;</span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl text-white font-extrabold tracking-tight">
                In a Previous Life
              </h2>

              {/* Experience Rows */}
              <div className="divide-y divide-white/5 border-y border-white/5">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="py-2.5 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center text-left hover:bg-white/[0.015] px-2 transition-colors group">
                    <span className="sm:col-span-3 font-mono text-xs text-amber-400 font-semibold leading-none flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      {exp.period}
                    </span>
                    <span className="sm:col-span-5 font-mono text-sm text-white font-medium group-hover:text-amber-400 transition-colors">
                      {exp.role}
                    </span>
                    <span className="sm:col-span-4 font-mono text-xs text-neutral-450 sm:text-right leading-none group-hover:text-neutral-300 transition-colors">
                      {exp.org}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column Sticky Headshot Card */}
          <div className="sm:col-span-5 md:col-span-4 sm:sticky sm:top-24 flex flex-col items-center sm:items-end space-y-4 w-full sm:w-auto">
            <div className="w-full max-w-[280px] aspect-[3/4] sm:max-w-none md:max-w-[280px] rounded-xl overflow-hidden border border-white/10 sm:self-end bg-neutral-900 shadow-xl relative group">
              <div className="absolute inset-0 bg-amber-500/5 mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=400&fit=crop" 
                alt="Portrait"
                className="w-full h-full object-cover grayscale brightness-95 contrast-105 group-hover:grayscale-[20%] transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Social quick connection */}
            <div className="flex items-center gap-3 font-mono text-[10px] text-neutral-500 pr-1 select-none">
              <span>follow me:</span>
              <a href="https://github.com/mrsidverse" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" title="GitHub"><Github size={12} /></a>
              <a href="https://x.com/mrsidverse" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" title="X"><Twitter size={12} /></a>
              <a href="https://www.linkedin.com/in/sidheshwar-sarangal-0b31482b8/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" title="LinkedIn"><Linkedin size={12} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3.3: WHAT I DO */}
      <div className="space-y-5" id="chapter-what-i-do">
        {/* Commentary Marker */}
        <div className="font-mono text-[11px] text-neutral-600 flex items-center gap-1 select-none">
          <span>&lt;!--</span>
          <span className="text-neutral-500 font-medium">What I do</span>
          <span>--&gt;</span>
        </div>

        {/* Capabilities Lists */}
        <div className="space-y-5 pl-1">
          {whatIDo.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-white">
                <span className="text-amber-400">{section.num}</span>
                <span className="tracking-tight hover:text-amber-400 transition-colors">{section.title}</span>
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-1 pl-5">
                {section.items.map((item, itemIdx) => (
                  <span key={itemIdx} className="font-mono text-xs text-neutral-450 flex items-center gap-1.5 last:after:content-none after:after:text-neutral-700 hover:text-white transition-colors">
                    {item} <span className="text-neutral-700 ml-1.5">|</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3.4: MY TECH STACK */}
      <div className="space-y-5" id="chapter-tech-stack">
        {/* Commentary Marker */}
        <div className="font-mono text-[11px] text-neutral-600 flex items-center gap-1 select-none">
          <span>&lt;!--</span>
          <span className="text-neutral-500 font-medium">My tech stack</span>
          <span>--&gt;</span>
        </div>

        {/* Skill progress circles */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 pl-1 pt-1">
          {techSkills.map((skill, idx) => {
            // Circle math
            const radius = 24;
            const strokeWidth = 3;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (skill.level / 100) * circumference;

            return (
              <div key={idx} className="p-4 bg-[#0d0e10]/30 border border-white/5 rounded-xl flex flex-col items-center space-y-3 hover:border-amber-550/[0.15] hover:bg-neutral-900/[0.2] transition-colors group">
                <div className="relative w-[56px] h-[56px] flex items-center justify-center">
                  {/* Gauge background */}
                  <svg className="absolute w-full h-full -rotate-90">
                    <circle 
                      cx="28" 
                      cy="28" 
                      r={radius} 
                      className="stroke-white/5 fill-none" 
                      strokeWidth={strokeWidth} 
                    />
                    <motion.circle 
                      cx="28" 
                      cy="28" 
                      r={radius} 
                      className="stroke-amber-400 fill-none" 
                      strokeWidth={strokeWidth}
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      whileInView={{ strokeDashoffset: strokeDashoffset }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.05 }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="font-mono text-[10px] text-white font-bold group-hover:text-amber-400 transition-colors">{skill.level}%</span>
                </div>
                <span className="font-mono text-[10px] text-neutral-400 group-hover:text-white transition-all capitalize">{skill.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3.5: METICULOUS EDUCATION ARCHIVES (Practice Chronology List) */}
      <div className="space-y-5" id="chapter-history">
        {/* Massive Backdrop text: EXPERIENCE left reveal */}
        <motion.div
          className="group/experience relative w-full overflow-hidden select-none mb-5 h-[clamp(88px,16cqw,180px)] flex items-center [container-type:inline-size]"
          initial={{ opacity: 0, x: "-18%" }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.45 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-full flex items-center justify-start px-[clamp(12px,4vw,72px)] whitespace-nowrap">
            <span
              className="font-display text-[clamp(44px,16cqw,132px)] font-black uppercase text-neutral-700 leading-none transition-colors duration-300 group-hover/experience:text-neutral-300"
            >
              EXPERIENCE
            </span>
          </div>
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
      <div className="space-y-6 relative py-4" id="chapter-testimonials">
        {/* Huge backdrop of words left reveal */}
        <motion.div
          className="group/words relative w-full overflow-hidden select-none mb-5 h-[clamp(88px,16cqw,180px)] flex items-center [container-type:inline-size]"
          initial={{ opacity: 0, x: "-18%" }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.45 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-full flex items-center justify-start px-[clamp(12px,4vw,72px)] whitespace-nowrap">
            <span className="font-display text-[clamp(44px,16cqw,132px)] font-black uppercase text-neutral-700 leading-none transition-colors duration-300 group-hover/words:text-neutral-300">
              WORDS MATTER
            </span>
          </div>
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
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
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
                      referrerPolicy="no-referrer"
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
                </motion.div>
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
      <div className="space-y-5 border-t border-white/5 pt-10" id="chapter-awards">
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

    </section>
  );
}
