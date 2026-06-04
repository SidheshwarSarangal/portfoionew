import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, X, Clock, FileCode, CheckCheck, FileText, 
  BookOpen, Braces, Terminal, ArrowUpRight, ChevronRight,
  User, MapPin, Github, Twitter, Dribbble
} from "lucide-react";
import { PROJECTS, ARTICLES, PERSONAL_BIO } from "../data";

interface HeaderProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

export default function Header({ activeSection, onNavClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { label: "sidheshwar.info", id: "hero", icon: <FileText size={12} className="text-purple-400" /> },
    { label: "work.done", id: "work", icon: <CheckCheck size={12} className="text-emerald-400" />, badge: PROJECTS.length },
    { label: "practice.log", id: "about", icon: <FileCode size={12} className="text-blue-450" /> },
    { label: "journal.md", id: "writings", icon: <BookOpen size={12} className="text-red-400" />, badge: ARTICLES.length },
    { label: "collab.json", id: "contact", icon: <Braces size={12} className="text-amber-400" /> },
  ];

  const handleTabClick = (sectionId: string) => {
    onNavClick(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#0a0a0b]/90 backdrop-blur-md border-b border-white/5 z-40 flex items-center select-none w-full">
      
      {/* 1. LEFT UTILITY COLUMN (Matches Left Sidebar Width on Desktop) */}
      <div 
        onClick={() => handleTabClick("hero")}
        className="w-full lg:w-[320px] xl:w-[350px] h-full lg:border-r border-white/5 flex items-center px-6 justify-between shrink-0 cursor-pointer group"
      >
        <div className="flex items-center gap-2">
          {/* Custom Terminal Prompt Dot Logo */}
          <div className="w-5 h-5 rounded-md bg-white text-black flex items-center justify-center font-mono text-[10px] font-bold">
            &gt;_
          </div>
          <span className="font-mono text-xs font-semibold text-white tracking-tight group-hover:text-neutral-350 transition-colors">
            Sidheshwar<span className="text-white/30 font-light">.s_</span>
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-1 font-mono text-[9px] text-neutral-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">
          <span>PORTFOLIO v2</span>
        </div>
      </div>

      {/* 2. CENTER TABS AREA (Active buffers / files) */}
      <div className="flex-grow h-full flex items-end overflow-x-auto scrollbar-none border-r border-white/5 lg:px-2 bg-[#090a0a]/30">
        <nav className="hidden md:flex items-end h-full">
          {tabs.map((tab) => {
            const isSelected = activeSection === tab.id || 
              (tab.id === "about" && (activeSection === "chapter-what-i-do" || activeSection === "chapter-tech-stack" || activeSection === "chapter-history" || activeSection === "chapter-awards" || activeSection === "chapter-testimonials"));
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`h-11 px-4 border-r border-white/5 flex items-center gap-2 font-mono text-[11px] cursor-pointer relative transition-all duration-150 ${
                  isSelected 
                    ? "bg-[#0c0d0e] text-white border-b border-b-white/5" 
                    : "text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.01]"
                }`}
              >
                {/* Active Underline slide accent */}
                {isSelected && (
                  <motion.div 
                    layoutId="header-active-tab-indicator"
                    className="absolute top-0 left-0 right-0 h-[2px] bg-white rounded-full mx-1.5"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                
                {tab.icon}
                <span className="tracking-tight">{tab.label}</span>
                
                {tab.badge !== undefined && (
                  <span className="font-mono text-[9px] bg-white/5 text-neutral-400 px-1 rounded border border-white/5 font-semibold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 3. RIGHT METADATA PANEL (Matches Right Sidebar on Desktop) */}
      <div className="w-auto xl:w-[270px] h-full flex items-center justify-end px-4 lg:px-6 gap-4 shrink-0 bg-[#0a0a0b]/20">
        
        {/* Open to work beacon banner */}
        <div className="lg:flex items-center gap-1.5 font-mono text-[9px] text-[#4ade80] bg-emerald-500/5 px-2.5 py-1 border border-emerald-500/10 rounded-full select-none shrink-0 hidden uppercase tracking-wider">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span>Alive</span>
        </div>

        {/* Live IST clock */}
        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-neutral-400 select-none bg-white/[0.02] border border-white/5 px-3 py-1 rounded-md shrink-0">
          <Clock size={11} className="text-amber-400 animate-pulse" />
          <span className="text-neutral-500 uppercase">IST:</span>
          <span className="text-white font-medium tabular-nums">{currentTime || "00:00:00"}</span>
        </div>

        {/* Mobile menu interface toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 bg-white/5 border border-white/10 rounded-lg text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.15 }}
            className="absolute top-14 left-0 right-0 md:hidden bg-[#0a0a0b] border-b border-white/10 p-5 flex flex-col gap-4 shadow-2xl z-50 rounded-b-xl"
          >
            <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest border-b border-white/5 pb-2 flex items-center gap-1.5">
              <Terminal size={10} className="text-amber-400" />
              <span>ACTIVE EDIT buffers</span>
            </div>
            
            <ul className="flex flex-col gap-1">
              {tabs.map((tab) => {
                const isSelected = activeSection === tab.id ||
                  (tab.id === "about" && (activeSection === "chapter-what-i-do" || activeSection === "chapter-tech-stack" || activeSection === "chapter-history" || activeSection === "chapter-awards" || activeSection === "chapter-testimonials"));
                return (
                  <li key={tab.id}>
                    <button
                      onClick={() => handleTabClick(tab.id)}
                      className={`w-full text-left font-mono text-xs py-2 px-3 rounded-lg flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-white/5 text-white font-medium"
                          : "text-neutral-400 hover:bg-white/[0.01]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {tab.icon}
                        <span>{tab.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {tab.badge && (
                          <span className="text-[9px] bg-white/10 text-neutral-400 px-1 rounded">{tab.badge}</span>
                        )}
                        <ChevronRight size={11} className="text-neutral-600" />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* DEVELOPER PROFILE DETAILS FOR MOBILE VIEWPORTS */}
            <div className="border-t border-white/5 pt-4 mt-1 space-y-3">
              <div className="font-mono text-[9px] text-[#8e9196] uppercase tracking-widest flex items-center gap-1.5">
                <User size={10} className="text-emerald-400 animate-pulse" />
                <span>DEVELOPER ENVIRONMENT</span>
              </div>
              
              <div className="flex items-center gap-3 bg-white/[0.01] p-3 rounded-lg border border-white/5">
                <img 
                  src={PERSONAL_BIO.avatarUrl} 
                  alt={PERSONAL_BIO.name} 
                  className="w-9 h-9 rounded-lg object-cover border border-white/10"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-mono text-xs font-semibold text-white">{PERSONAL_BIO.name}</div>
                  <div className="font-mono text-[10px] text-neutral-400">{PERSONAL_BIO.title}</div>
                  <div className="flex items-center gap-1 font-mono text-[9px] text-[#4ade80] mt-0.5">
                    <MapPin size={9} />
                    <span>{PERSONAL_BIO.location}</span>
                  </div>
                </div>
              </div>

              <p className="font-sans text-[11px] text-neutral-400 leading-relaxed font-light">
                {PERSONAL_BIO.about}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
                <a 
                  href="https://peerlist.io/sidheshwar_s_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 border border-[#ffffff08] rounded text-center text-[10px] text-neutral-300 hover:text-white transition-colors"
                >
                  Peerlist Profile
                </a>
                <a 
                  href={`mailto:${PERSONAL_BIO.email}`}
                  className="p-2 bg-emerald-500/5 border border-emerald-500/10 rounded text-center text-[10px] text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                >
                  Direct SMTP
                </a>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => handleTabClick("contact")}
                  className="w-full py-2 bg-[#0d0e10] border border-white/5 text-neutral-300 font-sans font-medium text-xs rounded-lg flex items-center justify-center gap-2 hover:bg-white/[0.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Download Résumé</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-5 pt-3 border-t border-white/5 select-none">
                <a href="https://github.com/mrsidverse" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors" title="GitHub"><Github size={14} /></a>
                <a href="https://x.com/mrsidverse" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors" title="X"><Twitter size={14} /></a>
                <a href="https://dribbble.com/mrsidverse" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors" title="Dribbble"><Dribbble size={14} /></a>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-neutral-500 mt-1">
              <div className="flex items-center gap-1.5">
                <Clock size={11} className="text-amber-400" />
                <span>IST: {currentTime}</span>
              </div>
              <span className="text-emerald-400 uppercase font-semibold text-[8px] border border-emerald-500/10 bg-emerald-500/5 px-2 py-0.5 rounded-full animate-pulse">
                ALIVE & OPEN TO WORK
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

