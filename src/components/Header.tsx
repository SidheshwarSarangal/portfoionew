import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FolderKanban, FileText, MessageSquareText,
  User, MapPin,
  Mail, Phone, Download, Globe, Copy, Check, Linkedin
} from "lucide-react";
import { usePortfolioContent } from "../content";
import SocialLinks, { findSocialLink } from "./SocialLinks";

interface HeaderProps {
  activeView: "info" | "projects" | "social";
  onViewChange: (view: "info" | "projects" | "social") => void;
}

export default function Header({ activeView, onViewChange }: HeaderProps) {
  const {
    projects: PROJECTS,
    socialPosts: SOCIAL_POSTS,
    personalBio: PERSONAL_BIO,
    socialLinks: SOCIAL_LINKS,
  } = usePortfolioContent();
  const [bioOpen, setBioOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const linkedin = findSocialLink(SOCIAL_LINKS, "LinkedIn");

  const handleCall = () => {
    if (!PERSONAL_BIO.phone) return;
    const isPhone = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isPhone) window.location.href = `tel:${PERSONAL_BIO.phone}`;
    else window.alert(`Contact at ${PERSONAL_BIO.phone}`);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_BIO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { label: "info", id: "info" as const, icon: <FileText size={18} className="text-current" /> },
    { label: "projects", id: "projects" as const, icon: <FolderKanban size={18} className="text-[#fbbc04]" />, badge: PROJECTS.length },
    { label: "social", id: "social" as const, icon: <MessageSquareText size={18} className="text-current" />, badge: SOCIAL_POSTS.length },
  ];

  const handleTabClick = (view: "info" | "projects" | "social") => {
    onViewChange(view);
    setBioOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 min-[1200px]:left-[380px] xl:left-[420px] 2xl:right-[300px] h-16 bg-black/45 backdrop-blur-xl border-b border-x border-white/10 z-40 flex items-center justify-start select-none shadow-sm shadow-black/25 overflow-visible">
      <div className="topbar-wave-gradient pointer-events-none absolute inset-0" aria-hidden="true" />
      {/* Desktop page navigation */}
      <div className="relative z-10 hidden min-[1200px]:flex h-full items-center justify-start">
        <nav className="flex items-center justify-start h-full">
          {tabs.map((tab) => {
            const isSelected = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`h-full min-w-36 px-7 border-r border-black/10 flex items-center justify-center gap-3 font-mono text-sm cursor-pointer relative transition-all duration-150 ${
                  isSelected 
                    ? "bg-[#fbbc04]/20 text-white font-semibold"
                    : "text-white/80 hover:text-[#fbbc04] hover:bg-white/5"
                }`}
              >
                {/* Active Underline slide accent */}
                {isSelected && (
                  <motion.div 
                    layoutId="header-active-tab-indicator"
                    className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#fbbc04] rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                
                {tab.icon}
                <span className="tracking-tight">{tab.label}</span>
                
                {tab.badge !== undefined && (
                  <span className="font-mono text-[10px] bg-white/10 text-white/65 px-1.5 py-0.5 rounded border border-white/10 font-semibold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Compact navigation below 1200px */}
      <div className="relative z-10 grid min-[1200px]:hidden grid-cols-4 w-full h-full">
        <button
          type="button"
          onClick={() => setBioOpen((open) => !open)}
          className={`h-full border-r border-white/10 flex items-center justify-center gap-1.5 font-mono text-[11px] sm:text-xs cursor-pointer relative transition-colors ${
            bioOpen ? "bg-[#fbbc04]/20 text-white font-semibold" : "text-white/80 hover:text-[#fbbc04] hover:bg-white/5"
          }`}
        >
          {bioOpen && <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#fbbc04] rounded-full" />}
          <User size={15} className="text-current" />
          <span>bio</span>
        </button>

        {tabs.map((tab) => {
          const isSelected = activeView === tab.id && !bioOpen;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`h-full border-r border-white/10 flex items-center justify-center gap-1.5 font-mono text-[11px] sm:text-xs cursor-pointer relative transition-colors ${
                isSelected ? "bg-[#fbbc04]/20 text-white font-semibold" : "text-white/80 hover:text-[#fbbc04] hover:bg-white/5"
              }`}
            >
              {isSelected && <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#fbbc04] rounded-full" />}
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bio drawer for widths below 1200px */}
      <AnimatePresence>
        {bioOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.15 }}
            className="fixed top-16 left-0 right-0 bottom-0 min-[1200px]:hidden bg-[#000000]/98 backdrop-blur-xl border-b border-white/10 p-4 sm:p-6 flex flex-col shadow-2xl z-50 overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-white/10"
          >
            {/* DEVELOPER PROFILE DETAILS FOR MOBILE VIEWPORTS */}
            <div className="w-full max-w-4xl mx-auto my-auto border border-white/10 bg-black/35 rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="font-mono text-[9px] text-[#8e9196] uppercase tracking-widest flex items-center gap-1.5">
                <User size={10} className="text-amber-400 animate-pulse" />
                <span>// DEVELOPER ENVIRONMENT</span>
              </div>
              
              {/* Profile Card & Avatar */}
              <div className="flex items-center gap-4 text-left bg-white/[0.02] border border-white/10 p-4 rounded-xl">
                <div className="relative group shrink-0">
                  {/* pulsing glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-neutral-200/10 to-neutral-500/10 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-700 animate-pulse" />
                  <img 
                    src={PERSONAL_BIO.avatarUrl} 
                    alt={PERSONAL_BIO.name} 
                    className="relative w-20 h-20 rounded-full border border-white/10 object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="min-w-0 flex-1 space-y-1.5">
                  <h3 className="font-mono text-base text-white font-medium tracking-tight">
                    {PERSONAL_BIO.fullName}
                    <span className="text-amber-400/80 font-mono text-[10px] font-light"> .info</span>
                  </h3>
                  <p className="font-mono text-[10px] text-[#8e9196] tracking-wider uppercase">
                    {PERSONAL_BIO.title}
                  </p>
                  <div className="space-y-1 pt-1 font-mono text-[10px] text-neutral-400">
                    <p className="flex items-center gap-1.5"><MapPin size={11} className="shrink-0 text-amber-400" /> <span className="truncate">{PERSONAL_BIO.location}</span></p>
                    <p className="flex items-center gap-1.5"><Mail size={11} className="shrink-0 text-neutral-500" /> <span className="truncate">{PERSONAL_BIO.email}</span></p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Short bio block */}
                <div className="space-y-2 text-left">
                  <span className="block font-mono text-[9px] uppercase text-[#fbbc04] tracking-wider font-semibold pl-1">
                    // BIO
                  </span>
                  <div className="p-4 rounded-xl border border-white/5 bg-[#070809]/40">
                    <p className="font-mono text-[13px] text-neutral-400 leading-5 font-light">
                      I am a B.Tech undergraduate at <strong className="text-amber-400 font-medium">IIT Roorkee</strong> building full-stack products, REST APIs, and backend systems.
                    </p>
                  </div>
                </div>

                {/* Profile details */}
                <div className="space-y-2">
                  <span className="font-mono text-[9px] uppercase text-[#fbbc04] tracking-wider font-semibold pl-1">
                    // PROFILE DETAILS
                  </span>
                
                  <ul className="space-y-2.5 font-mono text-[13px] text-neutral-300 font-light pl-1 bg-white/[0.01] p-3 rounded-xl border border-white/5">
                    <li className="flex items-center gap-2.5">
                      <User size={13} className="text-amber-400 shrink-0" />
                      <span>B.Tech Biosciences & Bioengineering</span>
                    </li>
                    <li className="flex items-center gap-2.5 sm:hidden">
                      <MapPin size={13} className="text-neutral-500 shrink-0" />
                      <span>{PERSONAL_BIO.location}</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Globe size={13} className="text-neutral-500 shrink-0" />
                      <span>Java, Python, C++, JavaScript</span>
                    </li>
                    <li
                      onClick={handleCopyEmail}
                      className="flex sm:hidden items-center gap-2.5 cursor-pointer hover:text-amber-400 transition-colors duration-250 group pr-1"
                    >
                      <Mail size={13} className="text-neutral-500 group-hover:text-amber-400 transition-colors shrink-0" />
                      <span className="truncate">{PERSONAL_BIO.email}</span>
                      <button className="text-neutral-500 hover:text-amber-400 ml-auto cursor-pointer" title="Copy email">
                        {copied ? <Check size={11} className="text-amber-400 font-semibold" /> : <Copy size={11} />}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 pt-1 text-center">
                {linkedin && <a
                  href={linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-white text-black font-mono font-medium text-xs rounded-lg flex items-center justify-center gap-2 hover:bg-amber-450 hover:text-black active:scale-[0.98] transition-all cursor-pointer text-center group"
                >
                  <Linkedin size={12} className="text-[#0a66c2] group-hover:text-black transition-colors" />
                  <span>Connect on LinkedIn</span>
                </a>}

                {PERSONAL_BIO.phone && <button
                  type="button"
                  onClick={handleCall}
                  className="w-full py-2 bg-white/5 border border-white/10 text-white font-mono font-medium text-xs rounded-lg flex items-center justify-center gap-2 hover:bg-neutral-900 hover:border-amber-500/25 hover:text-amber-400 active:scale-[0.98] transition-all text-center"
                >
                  <Phone size={11} className="text-neutral-500" />
                  <span>Schedule a Call</span>
                </button>}

                {PERSONAL_BIO.resumeUrl ? (
                  <a
                    href={PERSONAL_BIO.resumeUrl}
                    download
                    className="w-full py-2 border border-white/10 hover:border-amber-500/20 text-neutral-300 font-mono font-medium text-xs rounded-lg flex items-center justify-center gap-2 text-center hover:bg-neutral-900 hover:text-amber-400 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Download size={11} className="text-neutral-500" />
                    <span>Download Resume</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => window.alert("Resume PDF is not available yet.")}
                    className="w-full py-2 border border-white/10 hover:border-amber-500/20 text-neutral-300 font-mono font-medium text-xs rounded-lg flex items-center justify-center gap-2 text-center hover:bg-neutral-900 hover:text-amber-400 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Download size={11} className="text-neutral-500" />
                    <span>Download Resume</span>
                  </button>
                )}
              </div>

              {/* Sidebar Footer Link list */}
              <SocialLinks
                links={SOCIAL_LINKS}
                size={18}
                tileSize="large"
                className="flex flex-wrap items-center justify-center gap-2.5 pt-3 border-t border-white/5 select-none"
              />
            </div>

            <div className="pt-3 border-t border-white/5" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
