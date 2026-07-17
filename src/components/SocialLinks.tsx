import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Code2,
  Github,
  Layers3,
  MessageCircle,
  Newspaper,
  Sparkles,
  Twitter,
  Utensils,
} from "lucide-react";
import type { SocialLink } from "../types";

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  discord: MessageCircle,
  x: Twitter,
  twitter: Twitter,
  "x / twitter": Twitter,
  "stack overflow": Layers3,
  stackoverflow: Layers3,
  dev: Newspaper,
  "dev.to": Newspaper,
  upwork: BriefcaseBusiness,
  wellfound: BriefcaseBusiness,
  leetcode: Code2,
  codeforces: Code2,
  github: Github,
  codechef: Utensils,
  peerlist: Sparkles,
};

export function LinkedInBrandMark({ size = 18 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className="shrink-0"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9H7.12v11.452z" />
    </svg>
  );
}

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
  wellfound: "text-white hover:border-white/30 hover:bg-white/10",
  leetcode: "text-[#f5a623] hover:border-[#f5a623]/50 hover:bg-[#f5a623]/10",
  codeforces: "text-[#55a8e0] hover:border-[#55a8e0]/50 hover:bg-[#55a8e0]/10",
  github: "text-white hover:border-white/30 hover:bg-white/10",
  codechef: "text-[#c99a6b] hover:border-[#8b5a2b]/50 hover:bg-[#8b5a2b]/10",
  peerlist: "text-[#00aa6c] hover:border-[#00aa6c]/50 hover:bg-[#00aa6c]/10",
};

function PlatformMark({ platform, size }: { platform: string; size: number }) {
  const name = platform.trim().toLowerCase();

  if (name === "linkedin") {
    return <LinkedInBrandMark size={size} />;
  }

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
  tileSize?: "normal" | "large" | "xlarge";
  className?: string;
  includeLinkedIn?: boolean;
  showTooltip?: boolean;
}

export default function SocialLinks({
  links,
  size = 15,
  tileSize = "normal",
  className = "",
  includeLinkedIn = false,
  showTooltip = false,
}: SocialLinksProps) {
  const visibleLinks = links.filter(
    (link) => {
      const platform = link.platform.toLowerCase();
      return platform !== "email"
        && (includeLinkedIn || platform !== "linkedin")
        && hasSocialUrl(link);
    },
  );

  if (!visibleLinks.length) return null;

  return (
    <div className={className}>
      {visibleLinks.map((social) => {
        const platformKey = social.platform.trim().toLowerCase();
        const tileClass = tileSize === "xlarge"
          ? "h-14 w-14 rounded-xl"
          : tileSize === "large"
            ? "h-11 w-11 rounded-lg"
            : "h-9 w-9 rounded-lg";

        return (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex items-center justify-center border border-white/10 bg-white/[0.035] shadow-sm shadow-black/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 ${tileClass} ${SOCIAL_STYLES[platformKey] ?? "text-neutral-300 hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-300"}`}
            title={showTooltip ? undefined : social.platform}
            aria-label={social.platform}
          >
            <PlatformMark platform={social.platform} size={size} />
            {showTooltip && (
              <span className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full border border-white/15 bg-neutral-950/95 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wide text-white opacity-0 shadow-xl backdrop-blur-xl transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                {social.platform}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
