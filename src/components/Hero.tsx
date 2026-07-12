import { ArrowDown, Mail } from "lucide-react";
import DecryptText from "./DecryptText";

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export default function Hero({ onExploreClick, onContactClick }: HeroProps) {
  return (
    <section 
      id="hero" 
      className="relative min-h-[68vh] flex flex-col justify-center max-w-5xl mx-auto px-6 pt-14 pb-12 select-text"
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
          <div>
            Software
          </div>
          <div className="text-neutral-500 font-light italic">
            Engineer
          </div>
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
      <div
        className="flex flex-wrap items-center gap-3 mt-8"
        id="hero-cta-block"
      >
        <button
          onClick={onExploreClick}
          className="px-6 py-3 bg-white text-black font-sans font-medium text-xs rounded-full flex items-center gap-2 hover:bg-neutral-200 cursor-pointer transition-all active:scale-[0.98] shadow-lg shadow-white/5"
          id="hero-explore-work-btn"
        >
          <span>Professional work</span>
          <ArrowDown size={12} className="animate-bounce" />
        </button>

        <button
          type="button"
          onClick={onContactClick}
          className="px-6 py-3 bg-[#0d0e10] border border-white/5 text-neutral-300 font-sans font-medium text-xs rounded-full flex items-center gap-2 hover:bg-white/[0.02] hover:border-white/10 transition-all"
          id="hero-email-contact-link"
        >
          <Mail size={12} className="text-neutral-500" />
          <span>Get in touch</span>
        </button>
      </div>
    </section>
  );
}
