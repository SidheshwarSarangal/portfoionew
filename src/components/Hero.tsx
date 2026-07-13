import { ArrowDown, Mail } from "lucide-react";
import DecryptText from "./DecryptText";

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export default function Hero({ onExploreClick, onContactClick }: HeroProps) {
  const portraitUrl = `${import.meta.env.BASE_URL}portfolio-hero.png`;

  return (
    <section
      id="hero"
      className="relative min-h-[78vh] max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-14 select-text overflow-hidden"
    >
      <div className="font-mono text-[10px] text-neutral-600 flex items-center justify-center gap-2 tracking-[0.18em] uppercase select-none">
        <span className="h-px w-8 bg-white/10" />
        <span>Portfolio / 2026</span>
        <span className="h-px w-8 bg-white/10" />
      </div>

      <div className="relative mt-3 h-[430px] sm:h-[520px] md:h-[560px] flex items-center justify-center">
        <div className="absolute inset-x-0 top-[17%] z-0 text-center overflow-visible select-none" aria-hidden="true">
          <span className="block font-display text-[clamp(3.6rem,13vw,11rem)] font-black leading-[0.86] tracking-[-0.085em] text-white whitespace-nowrap">
            SOFTWARE
          </span>
        </div>

        <div className="absolute left-1/2 top-[48%] z-0 h-[34%] w-[76%] -translate-x-1/2 rounded-full bg-[#4285f4]/8 blur-[70px]" aria-hidden="true" />

        <div
          className="relative z-10 mt-2 h-[350px] w-[235px] sm:h-[440px] sm:w-[294px] md:h-[485px] md:w-[324px] overflow-hidden"
          style={{ borderRadius: "0 0 48% 48% / 0 0 12% 12%" }}
        >
          <img
            src={portraitUrl}
            alt="Sidheshwar Sarangal"
            className="h-full w-full object-contain"
            fetchPriority="high"
          />
        </div>

        <div className="absolute inset-x-0 top-[66%] z-20 flex items-center justify-center select-none" aria-hidden="true">
          <span className="font-serif text-[clamp(3.7rem,8vw,7.5rem)] italic leading-none tracking-[-0.07em] text-[#d7dadd] drop-shadow-[0_8px_18px_rgba(0,0,0,0.8)]">
            Engineer
          </span>
        </div>

        <div className="absolute left-[4%] top-[48%] hidden lg:flex items-center gap-2 font-mono text-[8px] tracking-[0.18em] text-neutral-600 uppercase" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4285f4]" />
          Full-stack systems
        </div>
        <div className="absolute right-[4%] top-[48%] hidden lg:flex items-center gap-2 font-mono text-[8px] tracking-[0.18em] text-neutral-600 uppercase" aria-hidden="true">
          IIT Roorkee
          <span className="h-1.5 w-1.5 rounded-full bg-[#fbbc04]" />
        </div>
      </div>

      <div className="relative z-30 mx-auto -mt-5 max-w-2xl text-center">
        <p className="font-sans text-base sm:text-lg leading-relaxed text-neutral-400 font-light">
          <DecryptText
            text="Entry-level software engineer building dependable full-stack products, REST APIs, and backend systems."
            delay={350}
            duration={1000}
          />
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onExploreClick}
            className="px-7 py-3.5 bg-white text-black font-sans font-medium text-sm rounded-full flex items-center gap-2 hover:bg-neutral-200 cursor-pointer transition-all active:scale-[0.98] shadow-lg shadow-white/5"
          >
            <span>Professional work</span>
            <ArrowDown size={13} className="animate-bounce" />
          </button>

          <button
            type="button"
            onClick={onContactClick}
            className="px-7 py-3.5 bg-[#0d0e10] border border-white/10 text-neutral-300 font-sans font-medium text-sm rounded-full flex items-center gap-2 hover:bg-white/[0.04] hover:border-white/20 transition-all"
          >
            <Mail size={13} className="text-neutral-500" />
            <span>Get in touch</span>
          </button>
        </div>
      </div>
    </section>
  );
}
