import {
  User, MapPin, Mail, Download,
  Phone, Globe, Copy, Check, Linkedin
} from "lucide-react";
import { usePortfolioContent } from "../content";
import SocialLinks, { findSocialLink } from "./SocialLinks";
import { useCopyFeedback } from "../hooks/useCopyFeedback";

export default function BioPage() {
  const { personalBio: PERSONAL_BIO, socialLinks: SOCIAL_LINKS } = usePortfolioContent();
  const { copied, copyText } = useCopyFeedback();
  const linkedin = findSocialLink(SOCIAL_LINKS, "LinkedIn");

  const handleCopyEmail = () => {
    void copyText(PERSONAL_BIO.email);
  };

  const handleCall = () => {
    if (!PERSONAL_BIO.phone) return;
    const isPhone = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isPhone) window.location.href = `tel:${PERSONAL_BIO.phone}`;
    else window.alert(`Contact at ${PERSONAL_BIO.phone}`);
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-8 md:py-10 select-text flex items-start lg:items-center">
      <div className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-black/45 p-4 sm:p-6 md:p-7 shadow-2xl shadow-black/30">
        <div className="flex flex-col gap-5 sm:gap-6">
          <div className="flex flex-col items-center text-center gap-3 sm:gap-4 border-b border-white/5 pb-5 sm:pb-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/25 via-[#fbbc04]/20 to-white/15 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-700 animate-pulse" />
              <img
                src={PERSONAL_BIO.avatarUrl}
                alt={PERSONAL_BIO.name}
                width="128"
                height="128"
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/10 object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-1">
              <h1 className="font-mono text-xl text-white font-medium tracking-tight">
                {PERSONAL_BIO.fullName}
                <span className="text-[#fbbc04] font-mono text-xs font-light"> .info</span>
              </h1>
              <p className="font-mono text-sm text-[#a3a6ab] tracking-wider uppercase">
                {PERSONAL_BIO.title}
              </p>
            </div>
          </div>

          <div className="space-y-5 w-full">
            <div className="space-y-2 text-left">
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <p className="font-mono text-sm text-neutral-300 leading-6 font-light">
                  I am a B.Tech undergraduate at <strong className="text-[#fbbc04] font-medium">IIT Roorkee</strong> building full-stack products, REST APIs, and backend systems.
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-left">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-sm text-neutral-300 font-light">
                <li className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.015] p-3">
                  <User size={16} className="text-[#fbbc04] shrink-0" />
                  <span>B.Tech Biosciences & Bioengineering</span>
                </li>
                <li className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.015] p-3">
                  <MapPin size={16} className="text-neutral-500 shrink-0" />
                  <span>{PERSONAL_BIO.location}</span>
                </li>
                <li className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.015] p-3">
                  <Globe size={16} className="text-neutral-500 shrink-0" />
                  <span>Java, Python, C++, JavaScript</span>
                </li>
                <li
                  onClick={handleCopyEmail}
                  className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.015] p-3 cursor-pointer hover:text-[#fbbc04] transition-colors duration-200 group"
                >
                  <Mail size={16} className="text-neutral-500 group-hover:text-[#fbbc04] transition-colors shrink-0" />
                  <span className="truncate">{PERSONAL_BIO.email}</span>
                  <button className="text-neutral-500 hover:text-[#fbbc04] ml-auto cursor-pointer" title="Copy email">
                    {copied ? <Check size={11} className="text-[#fbbc04]" /> : <Copy size={11} />}
                  </button>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 text-center">
              {linkedin && (
                <a
                  href={linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-white text-black font-mono font-medium text-[13px] rounded-lg flex items-center justify-center gap-2.5 hover:bg-[#fbbc04] active:scale-[0.98] transition-all cursor-pointer shadow-sm shadow-white/10 text-center group"
                >
                  <Linkedin size={16} className="text-[#0a66c2] group-hover:text-black transition-colors" />
                  <span>Connect on LinkedIn</span>
                </a>
              )}

              {PERSONAL_BIO.phone && (
                <button
                  type="button"
                  onClick={handleCall}
                  className="w-full py-2.5 bg-white/5 border border-white/10 text-white font-mono font-medium text-[13px] rounded-lg flex items-center justify-center gap-2.5 hover:bg-[#fbbc04]/10 hover:border-[#fbbc04]/35 hover:text-[#fbbc04] active:scale-[0.98] transition-all text-center"
                >
                  <Phone size={16} className="text-neutral-500" />
                  <span>Schedule a Call</span>
                </button>
              )}

              {PERSONAL_BIO.resumeUrl ? (
                <a
                  href={PERSONAL_BIO.resumeUrl}
                  download
                  className="w-full py-2.5 border border-white/10 hover:border-[#fbbc04]/35 text-neutral-300 font-mono font-medium text-[13px] rounded-lg flex items-center justify-center gap-2.5 text-center hover:bg-[#fbbc04]/10 hover:text-[#fbbc04] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Download size={16} className="text-neutral-500" />
                  <span>Download Resume</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => window.alert("Resume PDF is not available yet.")}
                  className="w-full py-2.5 border border-white/10 hover:border-[#fbbc04]/35 text-neutral-300 font-mono font-medium text-[13px] rounded-lg flex items-center justify-center gap-2.5 text-center hover:bg-[#fbbc04]/10 hover:text-[#fbbc04] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Download size={16} className="text-neutral-500" />
                  <span>Download Resume</span>
                </button>
              )}
            </div>

            <div className="pt-4 border-t border-white/5">
              <SocialLinks
                links={SOCIAL_LINKS}
                size={22}
                tileSize="large"
                className="flex flex-wrap items-center justify-center gap-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
