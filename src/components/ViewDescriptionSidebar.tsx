import { FolderKanban, MessageSquareText } from "lucide-react";
import { usePortfolioContent } from "../content";

interface ViewDescriptionSidebarProps {
  view: "projects" | "social";
}

export default function ViewDescriptionSidebar({ view }: ViewDescriptionSidebarProps) {
  const { projects, socialPosts } = usePortfolioContent();
  const isProjects = view === "projects";
  const Icon = isProjects ? FolderKanban : MessageSquareText;

  return (
    <aside className="fixed right-0 top-0 hidden h-screen w-[300px] 2xl:flex flex-col border-l border-white/10 bg-neutral-900/80 px-9 pb-10 pt-28 z-20">
      <div className="space-y-7">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#fbbc04]/25 bg-[#fbbc04]/10 text-[#fbbc04]">
          <Icon size={26} />
        </div>
        <div className="space-y-3">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#fbbc04]">
            // {isProjects ? "Projects" : "Social"}
          </p>
          <h2 className="font-display text-2xl font-semibold text-white">
            {isProjects ? "Selected work" : "Posts & updates"}
          </h2>
          <p className="font-mono text-sm leading-7 text-neutral-400">
            {isProjects
              ? "A focused collection of products, backend systems, experiments, and full-stack applications I have built."
              : "A growing collection of technical notes, project announcements, articles, and updates from my social profiles."}
          </p>
        </div>
        <div className="border-t border-white/10 pt-6 font-mono text-[13px] text-neutral-500">
          <span className="text-[#fbbc04] font-semibold">{isProjects ? projects.length : socialPosts.length}</span>
          <span className="ml-2">{isProjects ? "projects available" : "posts available"}</span>
        </div>
      </div>
    </aside>
  );
}
