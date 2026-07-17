import type { CSSProperties } from "react";
import { 
  User, MapPin, Mail, Download,
  Phone, Globe, Copy, Check
} from "lucide-react";
import { usePortfolioContent } from "../content";
import SocialLinks, { findSocialLink, LinkedInBrandMark } from "./SocialLinks";
import { useCopyFeedback } from "../hooks/useCopyFeedback";

interface LeftSidebarProps {
  primaryAccent: string;
  secondaryAccent: string;
}

export default function LeftSidebar({ primaryAccent, secondaryAccent }: LeftSidebarProps) {
  const { personalBio: PERSONAL_BIO, socialLinks: SOCIAL_LINKS } = usePortfolioContent();
  const { copied, copyText } = useCopyFeedback();
  const sidebarPortraitUrl = `${import.meta.env.BASE_URL}images/profile/general-image.png`;

  const handleCopyEmail = () => {
    void copyText(PERSONAL_BIO.email);
  };

  const linkedin = findSocialLink(SOCIAL_LINKS, "LinkedIn");
  const resumeUrl = PERSONAL_BIO.resumeUrl?.startsWith("/")
    ? `${import.meta.env.BASE_URL}${PERSONAL_BIO.resumeUrl.slice(1)}`
    : PERSONAL_BIO.resumeUrl;

  const handleCall = () => {
    if (!PERSONAL_BIO.phone) return;
    const isPhone = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isPhone) window.location.href = `tel:${PERSONAL_BIO.phone}`;
    else window.alert(`Contact at ${PERSONAL_BIO.phone}`);
  };

  return (
    <aside 
      id="left-profile-sidebar"
      className="section-accent-sidebar sidebar-readable-text left-sidebar-1200 xl:w-[420px] border-white/5 py-8 xl:py-10 px-8 bg-[#000000] flex-col justify-center gap-4 text-center z-20"
      style={{
        "--rail-primary": primaryAccent,
        "--rail-secondary": secondaryAccent,
      } as CSSProperties}
    >
      <div className="google-sidebar-gradient pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 w-full space-y-4 xl:space-y-5">
        {/* Profile Card & Avatar */}
        <div className="flex flex-col items-center text-center space-y-2.5">
          <div className="relative group">
            <div className="pointer-events-none absolute -inset-2 rounded-full border border-[#fbbc04]/0 opacity-0 scale-90 transition-all duration-500 ease-out group-hover:scale-100 group-hover:border-[#fbbc04]/80 group-hover:opacity-100 group-hover:shadow-[0_0_28px_rgba(251,188,4,0.28)]" />
            <div className="pointer-events-none absolute -inset-1 rounded-full border border-white/10 transition-all duration-500 ease-out group-hover:border-white/35" />
            <img 
              src={sidebarPortraitUrl}
              alt={PERSONAL_BIO.name} 
              width="128"
              height="128"
              fetchPriority="high"
              className="relative w-24 h-24 xl:w-28 xl:h-28 rounded-full border border-white/10 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-1">
            <h1 className="font-sidebar text-xl xl:text-2xl text-white font-semibold tracking-[-0.02em]">
              {PERSONAL_BIO.fullName}
              <span className="text-[#fbbc04] font-mono text-xs font-light"> .info</span>
            </h1>
            <p className="font-sidebar text-sm font-medium text-neutral-300 tracking-[0.12em] uppercase">
              {PERSONAL_BIO.title}
            </p>
          </div>
        </div>

        {/* Short bio block */}
        <div className="space-y-2 text-left">
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
            <p className="font-sidebar text-sm xl:text-[15px] text-neutral-200 leading-[1.65] font-normal tracking-[0.005em]">
              I am a B.Tech undergraduate from <strong className="text-[#fbbc04] font-medium">IIT Roorkee</strong> building full-stack products, REST APIs, and backend systems.
            </p>
          </div>
        </div>

        {/* Fact metadata list */}
        <div className="space-y-2.5 text-left">
          <ul className="space-y-2.5 xl:space-y-3 font-sidebar text-sm xl:text-[15px] leading-5 text-neutral-200 font-normal tracking-[0.005em]">
            <li className="flex items-center gap-3">
              <User size={16} className="text-[#fbbc04] shrink-0" />
              <span>B.Tech Biosciences & Bioengineering</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-neutral-500 shrink-0" />
              <span>{PERSONAL_BIO.location}</span>
            </li>
            <li className="flex items-center gap-3">
              <Globe size={16} className="text-neutral-500 shrink-0" />
              <span>Java, Python, C++, JavaScript</span>
            </li>
            <li 
              onClick={handleCopyEmail}
              className="flex items-center gap-3 cursor-pointer hover:text-[#fbbc04] transition-colors duration-200 group"
            >
              <Mail size={16} className="text-neutral-500 group-hover:text-[#fbbc04] transition-colors shrink-0" />
              <span className="truncate max-w-[270px]">{PERSONAL_BIO.email}</span>
              <button className="text-neutral-500 hover:text-[#fbbc04] cursor-pointer" title="Copy email">
                {copied ? <Check size={11} className="text-[#fbbc04]" /> : <Copy size={11} />}
              </button>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-2 pt-1 text-center">
          {linkedin && <a
            href={linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-white py-2.5 text-center font-sidebar text-sm font-semibold tracking-[0.01em] text-black shadow-sm shadow-white/10 transition-all duration-300 hover:bg-[#0a66c2] hover:text-white hover:shadow-[0_10px_28px_rgba(10,102,194,0.28)] active:scale-[0.98]"
          >
            <span className="text-[#0a66c2] transition-colors duration-300 group-hover:text-white">
              <LinkedInBrandMark size={18} />
            </span>
            <span>Connect on LinkedIn</span>
          </a>}

          {PERSONAL_BIO.phone && <button
            type="button"
            onClick={handleCall}
            className="w-full py-2.5 bg-white/5 border border-white/10 text-white font-sidebar font-semibold text-sm tracking-[0.01em] rounded-lg flex items-center justify-center gap-2.5 hover:bg-[#fbbc04]/10 hover:border-[#fbbc04]/35 hover:text-[#fbbc04] active:scale-[0.98] transition-all text-center"
          >
            <Phone size={16} className="text-neutral-500" />
            <span>Schedule a Call</span>
          </button>}

          {resumeUrl ? (
            <a
              href={resumeUrl}
              download="SIDHESHWAR SARANGAL RESUME 18.06.2026.pdf"
              className="w-full py-2.5 border border-white/10 hover:border-[#fbbc04]/35 text-neutral-200 font-sidebar font-semibold text-sm tracking-[0.01em] rounded-lg flex items-center justify-center gap-2.5 text-center hover:bg-[#fbbc04]/10 hover:text-[#fbbc04] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Download size={16} className="text-neutral-500" />
              <span>Download Resume</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={() => window.alert("Resume PDF is not available yet.")}
              className="w-full py-2.5 border border-white/10 hover:border-[#fbbc04]/35 text-neutral-200 font-sidebar font-semibold text-sm tracking-[0.01em] rounded-lg flex items-center justify-center gap-2.5 text-center hover:bg-[#fbbc04]/10 hover:text-[#fbbc04] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Download size={16} className="text-neutral-500" />
              <span>Download Resume</span>
            </button>
          )}
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="relative z-10 w-full pt-3 xl:pt-4 border-t border-white/5">
        {/* Social Quick-Grid */}
        <SocialLinks
          links={SOCIAL_LINKS}
          size={20}
          tileSize="large"
          className="flex flex-wrap items-center justify-center gap-2"
        />
      </div>
    </aside>
  );
}
