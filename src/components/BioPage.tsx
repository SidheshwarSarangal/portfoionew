import {
  User, MapPin, Mail, Download,
  Phone, Globe, Copy, Check
} from "lucide-react";
import { usePortfolioContent } from "../content";
import SocialLinks, { findSocialLink, LinkedInBrandMark } from "./SocialLinks";
import { useCopyFeedback } from "../hooks/useCopyFeedback";

export default function BioPage() {
  const { personalBio: PERSONAL_BIO, socialLinks: SOCIAL_LINKS } = usePortfolioContent();
  const { copied, copyText } = useCopyFeedback();
  const linkedin = findSocialLink(SOCIAL_LINKS, "LinkedIn");
  const compactPortraitUrl = `${import.meta.env.BASE_URL}images/profile/general-image.png`;
  const resumeUrl = PERSONAL_BIO.resumeUrl?.startsWith("/")
    ? `${import.meta.env.BASE_URL}${PERSONAL_BIO.resumeUrl.slice(1)}`
    : PERSONAL_BIO.resumeUrl;

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
    <section className="min-h-[calc(100dvh-4rem)] w-full max-w-4xl mx-auto px-2.5 py-3 sm:px-6 sm:py-8 md:py-10 select-text flex items-start lg:items-center">
      <div className="w-full min-w-0 rounded-xl sm:rounded-2xl border border-white/10 bg-black/45 p-3.5 sm:p-6 md:p-7 shadow-2xl shadow-black/30">
        <div className="flex flex-col gap-5 sm:gap-6">
          <div className="flex flex-col items-center text-center gap-3 sm:gap-4 border-b border-white/5 pb-5 sm:pb-6">
            <div className="relative group">
              <div className="pointer-events-none absolute -inset-2 scale-90 rounded-full border border-[#fbbc04]/0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:border-[#fbbc04]/80 group-hover:opacity-100 group-hover:shadow-[0_0_28px_rgba(251,188,4,0.28)]" />
              <div className="pointer-events-none absolute -inset-1 rounded-full border border-white/10 transition-all duration-500 ease-out group-hover:border-white/35" />
              <img
                src={compactPortraitUrl}
                alt={PERSONAL_BIO.name}
                width="128"
                height="128"
                fetchPriority="high"
                className="relative h-24 w-24 rounded-full border border-white/10 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025] sm:h-28 sm:w-28"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-1">
              <h1 className="font-sidebar text-lg font-semibold tracking-[-0.02em] text-white min-[380px]:text-xl">
                {PERSONAL_BIO.fullName}
                <span className="text-[#fbbc04] font-mono text-xs font-light"> .info</span>
              </h1>
              <p className="font-sidebar text-xs font-medium uppercase leading-5 tracking-[0.12em] text-neutral-300 sm:text-sm">
                {PERSONAL_BIO.title}
              </p>
            </div>
          </div>

          <div className="space-y-5 w-full">
            <div className="space-y-2 text-left">
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <p className="font-sidebar text-sm font-normal leading-[1.65] tracking-[0.005em] text-neutral-200">
                  I am a B.Tech undergraduate from <strong className="text-[#fbbc04] font-medium">IIT Roorkee</strong> building full-stack products, REST APIs, and backend systems.
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-left">
              <ul className="grid grid-cols-1 gap-3 font-sidebar text-sm font-normal tracking-[0.005em] text-neutral-200 sm:grid-cols-2">
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
                  className="group flex min-w-0 items-center gap-3 rounded-lg border border-white/5 bg-white/[0.015] p-3 cursor-pointer hover:text-[#fbbc04] transition-colors duration-200"
                >
                  <Mail size={16} className="text-neutral-500 group-hover:text-[#fbbc04] transition-colors shrink-0" />
                  <span className="min-w-0 truncate">{PERSONAL_BIO.email}</span>
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
                  className="group flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-white py-2.5 text-center font-sidebar text-sm font-semibold tracking-[0.01em] text-black shadow-sm shadow-white/10 transition-all duration-300 hover:bg-[#0a66c2] hover:text-white hover:shadow-[0_10px_28px_rgba(10,102,194,0.28)] active:scale-[0.98]"
                >
                  <span className="text-[#0a66c2] transition-colors duration-300 group-hover:text-white">
                    <LinkedInBrandMark size={18} />
                  </span>
                  <span>Connect on LinkedIn</span>
                </a>
              )}

              {PERSONAL_BIO.phone && (
                <button
                  type="button"
                  onClick={handleCall}
                  className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-white/10 bg-white/5 py-2.5 text-center font-sidebar text-sm font-semibold tracking-[0.01em] text-white transition-all hover:border-[#fbbc04]/35 hover:bg-[#fbbc04]/10 hover:text-[#fbbc04] active:scale-[0.98]"
                >
                  <Phone size={16} className="text-neutral-500" />
                  <span>Schedule a Call</span>
                </button>
              )}

              {resumeUrl ? (
                <a
                  href={resumeUrl}
                  download="SIDHESHWAR SARANGAL RESUME 18.06.2026.pdf"
                  className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg border border-white/10 py-2.5 text-center font-sidebar text-sm font-semibold tracking-[0.01em] text-neutral-200 transition-all hover:border-[#fbbc04]/35 hover:bg-[#fbbc04]/10 hover:text-[#fbbc04] active:scale-[0.98]"
                >
                  <Download size={16} className="text-neutral-500" />
                  <span>Download Resume</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => window.alert("Resume PDF is not available yet.")}
                  className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg border border-white/10 py-2.5 text-center font-sidebar text-sm font-semibold tracking-[0.01em] text-neutral-200 transition-all hover:border-[#fbbc04]/35 hover:bg-[#fbbc04]/10 hover:text-[#fbbc04] active:scale-[0.98]"
                >
                  <Download size={16} className="text-neutral-500" />
                  <span>Download Resume</span>
                </button>
              )}
            </div>

            <div className="pt-4 border-t border-white/5">
              <SocialLinks
                links={SOCIAL_LINKS}
                size={20}
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
