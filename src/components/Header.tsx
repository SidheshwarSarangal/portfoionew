import { motion } from "motion/react";
import { FolderKanban, FileText, MessageSquareText, PanelRightOpen, X, User } from "lucide-react";
import { usePortfolioContent } from "../content";

export type PortfolioView = "bio" | "info" | "projects" | "social";

interface HeaderProps {
  activeView: PortfolioView;
  onViewChange: (view: PortfolioView) => void;
  isSidebarOpen: boolean;
  onSidebarToggle: () => void;
}

export default function Header({ activeView, onViewChange, isSidebarOpen, onSidebarToggle }: HeaderProps) {
  const { projects: PROJECTS, socialPosts: SOCIAL_POSTS } = usePortfolioContent();

  const desktopTabs = [
    { label: "info", id: "info" as const, icon: <FileText size={18} className="text-current" /> },
    { label: "projects", id: "projects" as const, icon: <FolderKanban size={18} className="text-[#fbbc04]" />, badge: PROJECTS.length },
    { label: "social", id: "social" as const, icon: <MessageSquareText size={18} className="text-current" />, badge: SOCIAL_POSTS.length },
  ];

  const compactTabs = [
    { label: "bio", id: "bio" as const, icon: <User size={15} className="text-current" /> },
    ...desktopTabs,
  ];

  const renderTab = (tab: typeof compactTabs[number], compact = false) => {
    const isSelected = activeView === tab.id;

    return (
      <button
        key={tab.id}
        type="button"
        onClick={() => onViewChange(tab.id)}
        className={`${compact ? "text-[11px] sm:text-xs gap-1.5" : "min-w-36 px-7 text-sm gap-3"} h-full border-r border-white/10 flex items-center justify-center font-mono cursor-pointer relative transition-all duration-150 ${
          isSelected ? "bg-[#fbbc04]/20 text-white font-semibold" : "text-white/80 hover:text-[#fbbc04] hover:bg-white/5"
        }`}
      >
        {isSelected && (
          <motion.span
            layoutId={compact ? "compact-header-active-tab-indicator" : "header-active-tab-indicator"}
            className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#fbbc04] rounded-full"
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
          />
        )}

        {tab.icon}
        <span className="tracking-tight">{tab.label}</span>

        {"badge" in tab && tab.badge !== undefined && !compact && (
          <span className="font-mono text-[10px] bg-white/10 text-white/65 px-1.5 py-0.5 rounded border border-white/10 font-semibold">
            {tab.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <header className="portfolio-topbar fixed top-0 left-0 right-0 2xl:right-[300px] h-16 bg-black/45 backdrop-blur-xl border-b border-x border-white/10 z-[60] flex items-center justify-start select-none shadow-sm shadow-black/25 overflow-hidden">
      <div className="topbar-wave-gradient pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="desktop-nav-1200 relative z-10 h-full items-center justify-start">
        <nav className="flex items-center justify-start h-full">
          {desktopTabs.map((tab) => renderTab(tab))}
        </nav>
      </div>

      <div className="compact-nav-1200 relative z-10 grid grid-cols-4 w-full h-full pr-14">
        {compactTabs.map((tab) => renderTab(tab, true))}
      </div>

      {activeView !== "bio" && (
        <button
          type="button"
          onClick={onSidebarToggle}
          aria-label={isSidebarOpen ? "Close right sidebar" : "Open right sidebar"}
          aria-expanded={isSidebarOpen}
          className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-white/10 bg-black/45 text-white/80 backdrop-blur-xl transition-all hover:border-[#fbbc04]/40 hover:bg-[#fbbc04]/10 hover:text-[#fbbc04] 2xl:hidden"
        >
          {isSidebarOpen ? <X size={19} /> : <PanelRightOpen size={19} />}
        </button>
      )}
    </header>
  );
}
