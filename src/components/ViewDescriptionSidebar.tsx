import { FolderKanban, MessageSquareText } from "lucide-react";
import { usePortfolioContent } from "../content";

interface ViewDescriptionSidebarProps {
  view: "projects" | "social";
  variant?: "desktop" | "drawer";
}

export default function ViewDescriptionSidebar({ view, variant = "desktop" }: ViewDescriptionSidebarProps) {
  const { projects, articles } = usePortfolioContent();
  const isProjects = view === "projects";
  const Icon = isProjects ? FolderKanban : MessageSquareText;

  return (
    <aside className={`flex-col border-l border-white/10 bg-[#08090c]/70 backdrop-blur-2xl backdrop-saturate-150 shadow-[-24px_0_70px_rgba(0,0,0,0.22)] px-8 pb-10 pt-28 select-none ${
      variant === "desktop"
        ? "fixed right-0 top-0 hidden h-screen w-[300px] 2xl:flex z-20"
        : "relative flex h-full w-full overflow-y-auto"
    }`}>
      <div className="space-y-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#fbbc04]/25 bg-[#fbbc04]/10 text-[#fbbc04] shadow-[0_0_30px_rgba(251,188,4,0.08)]">
          <Icon size={30} />
        </div>
        <div className="space-y-4">
          <h2 className="font-display text-3xl font-semibold leading-tight text-white">
            {isProjects ? "Selected work" : "From my desk"}
          </h2>
          <p className="font-mono text-[15px] leading-7 text-neutral-300/85">
            {isProjects
              ? "A focused collection of products, backend systems, experiments, and full-stack applications I have built."
              : "A focused reading desk for technical notes, interface thinking, engineering articles, and project reflections."}
          </p>
        </div>
        <div className="border-t border-white/10 pt-6 font-mono text-sm text-neutral-400">
          <span className="text-[#fbbc04] font-semibold">{isProjects ? projects.length : articles.length}</span>
          <span className="ml-2">{isProjects ? "projects available" : "articles available"}</span>
        </div>
      </div>
    </aside>
  );
}
