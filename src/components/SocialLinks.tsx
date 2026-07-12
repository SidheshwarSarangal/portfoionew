import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Code2,
  Github,
  Layers3,
  Linkedin,
  MessageCircle,
  Newspaper,
  Sparkles,
  Twitter,
  Utensils,
} from "lucide-react";
import type { SocialLink } from "../types";

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  discord: MessageCircle,
  linkedin: Linkedin,
  x: Twitter,
  twitter: Twitter,
  "x / twitter": Twitter,
  "stack overflow": Layers3,
  stackoverflow: Layers3,
  dev: Newspaper,
  "dev.to": Newspaper,
  upwork: BriefcaseBusiness,
  leetcode: Code2,
  codeforces: Code2,
  github: Github,
  codechef: Utensils,
  peerlist: Sparkles,
};

const SOCIAL_STYLES: Record<string, string> = {
  discord: "text-[#8b9dff] hover:border-[#5865f2]/50 hover:bg-[#5865f2]/10",
  linkedin: "text-[#4ba3e3] hover:border-[#0a66c2]/50 hover:bg-[#0a66c2]/10",
  x: "text-white hover:border-white/30 hover:bg-white/10",
  twitter: "text-white hover:border-white/30 hover:bg-white/10",
  "x / twitter": "text-white hover:border-white/30 hover:bg-white/10",
  "stack overflow": "text-[#f48024] hover:border-[#f48024]/50 hover:bg-[#f48024]/10",
  stackoverflow: "text-[#f48024] hover:border-[#f48024]/50 hover:bg-[#f48024]/10",
  dev: "text-white hover:border-white/30 hover:bg-white/10",
  "dev.to": "text-white hover:border-white/30 hover:bg-white/10",
  upwork: "text-[#14a800] hover:border-[#14a800]/50 hover:bg-[#14a800]/10",
  leetcode: "text-[#f5a623] hover:border-[#f5a623]/50 hover:bg-[#f5a623]/10",
  codeforces: "text-[#55a8e0] hover:border-[#55a8e0]/50 hover:bg-[#55a8e0]/10",
  github: "text-white hover:border-white/30 hover:bg-white/10",
  codechef: "text-[#c99a6b] hover:border-[#8b5a2b]/50 hover:bg-[#8b5a2b]/10",
  peerlist: "text-[#00aa6c] hover:border-[#00aa6c]/50 hover:bg-[#00aa6c]/10",
};

function PlatformMark({ platform, size }: { platform: string; size: number }) {
  const name = platform.trim().toLowerCase();

  if (name === "dev" || name === "dev.to") {
    return <span className={`font-sans font-black tracking-[-0.08em] ${size >= 20 ? "text-[11px]" : "text-[9px]"}`}>DEV</span>;
  }

  if (name === "upwork") {
    return <span className={`font-sans font-black tracking-[-0.12em] ${size >= 20 ? "text-base" : "text-[13px]"}`}>up</span>;
  }

  if (name === "leetcode") {
    return <span className={`font-mono font-bold ${size >= 20 ? "text-base" : "text-[15px]"}`}>LC</span>;
  }

  if (name === "codeforces") {
    return (
      <span className={`flex items-end gap-[2px] ${size >= 20 ? "h-5" : "h-4"}`} aria-hidden="true">
        <span className={`${size >= 20 ? "h-4 w-[5px]" : "h-3 w-[4px]"} rounded-[1px] bg-[#ffd43b]`} />
        <span className={`${size >= 20 ? "h-5 w-[5px]" : "h-4 w-[4px]"} rounded-[1px] bg-[#55a8e0]`} />
        <span className={`${size >= 20 ? "h-3 w-[5px]" : "h-2 w-[4px]"} rounded-[1px] bg-[#ef5350]`} />
      </span>
    );
  }

  if (name === "codechef") {
    return <span className={`font-serif font-black ${size >= 20 ? "text-base" : "text-[14px]"}`}>CC</span>;
  }

  const Icon = SOCIAL_ICONS[name] ?? Code2;
  return <Icon size={size} strokeWidth={1.8} />;
}

export function hasSocialUrl(link: SocialLink) {
  return Boolean(link.url?.trim() && link.url !== "#");
}

export function findSocialLink(links: SocialLink[], platform: string) {
  const wanted = platform.toLowerCase();
  return links.find(
    (link) => link.platform.toLowerCase() === wanted && hasSocialUrl(link),
  );
}

interface SocialLinksProps {
  links: SocialLink[];
  size?: number;
  tileSize?: "normal" | "large";
  className?: string;
}

export default function SocialLinks({ links, size = 15, tileSize = "normal", className = "" }: SocialLinksProps) {
  const visibleLinks = links.filter(
    (link) => !["email", "linkedin"].includes(link.platform.toLowerCase()) && hasSocialUrl(link),
  );

  if (!visibleLinks.length) return null;

  return (
    <div className={className}>
      {visibleLinks.map((social) => {
        const platformKey = social.platform.trim().toLowerCase();

        return (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] shadow-sm shadow-black/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${tileSize === "large" ? "h-11 w-11" : "h-9 w-9"} ${SOCIAL_STYLES[platformKey] ?? "text-neutral-300 hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-300"}`}
            title={social.platform}
            aria-label={social.platform}
          >
            <PlatformMark platform={social.platform} size={size} />
          </a>
        );
      })}
    </div>
  );
}
