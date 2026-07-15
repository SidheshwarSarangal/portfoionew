import type { Article } from "../types";
import { usePortfolioContent } from "../content";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { articlePath } from "../lib/routes";

interface WritingListProps {
  onArticleClick: (article: Article) => void;
  onViewAll?: () => void;
}

export default function WritingList({ onArticleClick, onViewAll }: WritingListProps) {
  const { articles: ARTICLES } = usePortfolioContent();
  const visibleArticles = onViewAll ? ARTICLES.slice(0, 3) : ARTICLES;
  return (
    <section id="writings" className="mx-auto w-full max-w-5xl border-t border-white/5 px-4 py-10 select-text sm:px-6 sm:py-12">
      
      <div className="mb-6 border-b border-transparent">
        <h2 className="font-display text-4xl sm:text-5xl text-white font-extrabold tracking-tight">
          From My Design Desk
        </h2>
      </div>

      {/* Grid of Blog Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2" id="writings-list-grid">
        {visibleArticles.map((article) => (
          <a
            key={article.id}
            href={articlePath(article.slug)}
            onClick={(event) => {
              event.preventDefault();
              onArticleClick(article);
            }}
            className="group flex min-h-[270px] cursor-pointer flex-col justify-between rounded-2xl border border-white/[0.1] bg-white/[0.015] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/25 hover:bg-white/[0.04] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.11),0_20px_55px_rgba(0,0,0,0.22)] sm:p-7"
            id={`article-card-${article.id}`}
          >
            <div className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.12em] text-neutral-300 transition-colors group-hover:text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>{article.publishedAt}</span>
            </div>

            <div className="my-6 space-y-4">
              <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-amber-400 sm:text-3xl">
                {article.title}
              </h3>
              <p className="font-mono text-sm font-light leading-7 text-neutral-400">
                {article.summary}
              </p>
            </div>

            <div className="flex items-center" id={`article-card-footer-${article.id}`}>
              <span className="font-mono text-xs text-amber-500 flex items-center gap-2 group-hover:text-amber-400 font-semibold transition-colors">
                <span>Read full blog</span>
                <ArrowRight size={13} className="text-amber-500/70 group-hover:translate-x-1 group-hover:text-amber-400 transition-all duration-300" />
              </span>
            </div>
          </a>
        ))}

        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            id="article-view-all-card"
            className="group flex min-h-[270px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.015] p-7 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/35 hover:bg-white/[0.04] hover:shadow-[0_20px_55px_rgba(0,0,0,0.25)]"
          >
            <span className="mb-4 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-black/30 text-neutral-500 transition-colors group-hover:border-amber-500/30 group-hover:text-amber-400">
              <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <span className="font-display text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-amber-400 sm:text-3xl">
              View all blogs
            </span>
            <span className="mt-3 max-w-xs font-mono text-sm leading-7 text-neutral-400 group-hover:text-neutral-300">
              Explore more notes, articles, and updates from my social profiles.
            </span>
          </button>
        )}
      </div>

    </section>
  );
}
