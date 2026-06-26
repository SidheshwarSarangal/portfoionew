import { useState } from "react";
import { motion } from "motion/react";
import { 
  User, MapPin, Mail, Sparkles, Download, 
  Phone, Globe, Github, Twitter, Linkedin, Copy, Check 
} from "lucide-react";
import { PERSONAL_BIO, SOCIAL_LINKS } from "../data";

interface LeftSidebarProps {
  onContactClick: () => void;
}

export default function LeftSidebar({ onContactClick }: LeftSidebarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_BIO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <aside 
      id="left-profile-sidebar"
      className="hidden lg:flex lg:w-[320px] xl:w-[350px] lg:h-screen lg:fixed lg:left-0 lg:top-0 lg:overflow-y-auto lg:border-r border-white/5 pt-16 pb-6 px-6 bg-[#000000] flex flex-col justify-between scrollbar-thin scrollbar-thumb-white/5 z-20"
    >
      <div className="space-y-5">
        {/* Profile Card & Avatar */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="relative group">
            {/* Ambient pulsing glowing border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-neutral-200/20 to-neutral-500/20 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-700 animate-pulse" />
            <img 
              src={PERSONAL_BIO.avatarUrl} 
              alt={PERSONAL_BIO.name} 
              className="relative w-24 h-24 rounded-full border border-white/10 object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            {/* Active Status Ring */}
            <span className="absolute bottom-1 right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#0c0d0e] border border-white/10" title="Active developer">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="font-mono text-xl text-white font-medium tracking-tight">
              {PERSONAL_BIO.fullName}
              <span className="text-amber-400/80 font-mono text-xs font-light"> .info</span>
            </h1>
            <p className="font-mono text-[11px] text-[#8e9196] tracking-wider uppercase">
              {PERSONAL_BIO.title}
            </p>
          </div>
        </div>

        {/* Short bio block */}
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <p className="font-mono text-xs text-neutral-400 leading-relaxed font-light">
            I am a B.Tech undergraduate at <strong className="text-amber-400 font-medium">IIT Roorkee</strong> building full-stack products, REST APIs, and backend systems.
          </p>
        </div>

        {/* Fact metadata list */}
        <div className="space-y-3.5">
          <span className="font-mono text-[10px] uppercase text-neutral-500 tracking-wider font-semibold pl-1">
            // PROFILE DETAILS
          </span>
          
          <ul className="space-y-2.5 font-mono text-xs text-neutral-450 font-light pl-1">
            <li className="flex items-center gap-2.5">
              <User size={13} className="text-amber-400" />
              <span>B.Tech Biosciences & Bioengineering</span>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin size={13} className="text-neutral-500" />
              <span>{PERSONAL_BIO.location}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Globe size={13} className="text-neutral-500" />
              <span>Java, Python, C++, JavaScript</span>
            </li>
            <li 
              onClick={handleCopyEmail}
              className="flex items-center gap-2.5 cursor-pointer hover:text-amber-400 transition-colors duration-200 group"
            >
              <Mail size={13} className="text-neutral-500 group-hover:text-amber-400 transition-colors" />
              <span className="truncate">{PERSONAL_BIO.email}</span>
              <button className="text-neutral-500 hover:text-amber-400 ml-auto cursor-pointer" title="Copy email">
                {copied ? <Check size={11} className="text-amber-400" /> : <Copy size={11} />}
              </button>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-2">
          <a
            href="https://peerlist.io/sidheshwar_s_"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-white text-black font-mono font-medium text-xs rounded-lg flex items-center justify-center gap-2 hover:bg-amber-450 hover:text-black active:scale-[0.98] transition-all cursor-pointer shadow-sm shadow-white/5 text-center group"
          >
            <Sparkles size={12} className="text-amber-600 group-hover:text-black transition-colors" />
            <span>Connect on Peerlist</span>
          </a>

          <a 
            href={`mailto:${PERSONAL_BIO.email}?subject=Collaboration Proposal`}
            className="w-full py-2.5 bg-white/5 border border-white/10 text-white font-mono font-medium text-xs rounded-lg flex items-center justify-center gap-2 hover:bg-neutral-900 hover:border-amber-500/25 hover:text-amber-400 active:scale-[0.98] transition-all text-center"
          >
            <Phone size={12} className="text-neutral-500" />
            <span>Schedule a Call</span>
          </a>

          <button 
            onClick={onContactClick}
            className="w-full py-2.5 border border-white/10 hover:border-amber-500/20 text-neutral-300 font-mono font-medium text-xs rounded-lg flex items-center justify-center gap-2 hover:bg-neutral-900 hover:text-amber-400 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Download size={12} className="text-neutral-500" />
            <span>Download Resume</span>
          </button>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
        {/* Social Quick-Grid */}
        <div className="flex items-center justify-center gap-3 text-neutral-500">
          {SOCIAL_LINKS.filter(s => s.platform !== "Email" && s.platform !== "Peerlist").map((social) => (
            <a 
              key={social.platform}
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
              title={social.platform}
            >
              {social.platform === "GitHub" && <Github size={15} />}
              {social.platform === "X / Twitter" && <Twitter size={15} />}
              {social.platform === "LinkedIn" && <Linkedin size={15} />}
            </a>
          ))}
        </div>

        <p className="font-mono text-[9px] text-neutral-600 tracking-wider text-center">
          (c) {currentYear} SIDHESHWAR - IITR
        </p>
      </div>
    </aside>
  );
}
