import { motion } from "motion/react";
import { ArrowDown, Mail } from "lucide-react";
import { PERSONAL_BIO } from "../data";
import DecryptText from "./DecryptText";

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <section 
      id="hero" 
      className="relative min-h-[65vh] flex flex-col justify-center max-w-5xl mx-auto px-6 pt-16 pb-10 select-text"
    >
      {/* Code Comment Marker */}
      <div className="font-mono text-[11px] text-neutral-600 mb-4 flex items-center gap-1 select-none">
        <span>&lt;!--</span> 
        <span className="text-neutral-500 font-medium">Hero section</span> 
        <span>--&gt;</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-4" id="hero-headline-div">
        <h1 className="font-display text-6xl sm:text-8xl md:text-[110px] text-white font-extrabold tracking-tight leading-[1.0] max-w-5xl select-none">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Software
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-500 font-light italic"
          >
            Engineer
          </motion.div>
        </h1>

        <div className="pt-4 max-w-3xl">
          <p className="font-sans text-neutral-450 text-sm sm:text-lg leading-relaxed font-light">
            <DecryptText 
              text="Entry-level software engineer with strong DSA foundations and hands-on work across Spring Boot, Python, MERN, REST APIs, Docker, and Kubernetes." 
              delay={350} 
              duration={1000} 
            />
          </p>
        </div>
      </div>

      {/* Action / Connect Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-wrap items-center gap-3 mt-8"
        id="hero-cta-block"
      >
        <button
          onClick={onExploreClick}
          className="px-6 py-3 bg-white text-black font-sans font-medium text-xs rounded-full flex items-center gap-2 hover:bg-neutral-200 cursor-pointer transition-all active:scale-[0.98] shadow-lg shadow-white/5"
          id="hero-explore-work-btn"
        >
          <span>Selected Work</span>
          <ArrowDown size={12} className="animate-bounce" />
        </button>

        <a
          href={`mailto:${PERSONAL_BIO.email}`}
          className="px-6 py-3 bg-[#0d0e10] border border-white/5 text-neutral-300 font-sans font-medium text-xs rounded-full flex items-center gap-2 hover:bg-white/[0.02] hover:border-white/10 transition-all"
          id="hero-email-contact-link"
        >
          <Mail size={12} className="text-neutral-500" />
          <span>Get in touch</span>
        </a>
      </motion.div>
    </section>
  );
}
