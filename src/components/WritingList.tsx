import { motion } from "motion/react";
import type { Article } from "../types";
import { usePortfolioContent } from "../content";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { articlePath } from "../lib/routes";

interface WritingListProps {
  onArticleClick: (article: Article) => void;
}

export default function WritingList({ onArticleClick }: WritingListProps) {
  const { articles: ARTICLES } = usePortfolioContent();
  return (
    <section id="writings" className="max-w-5xl mx-auto px-6 py-10 border-t border-white/5 select-text">
      
      {/* Commentary Marker */}
      <div className="font-mono text-[11px] text-neutral-600 mb-5 flex items-center justify-between select-none">
        <div className="flex items-center gap-1">
          <span>&lt;!--</span>
          <span className="text-neutral-500 font-medium">From My Design Desk</span>
          <span>--&gt;</span>
        </div>
        
        <div className="font-mono text-[10px] text-neutral-500 select-none">
          // blog.md • journals
        </div>
      </div>

      <div className="mb-6 border-b border-transparent">
        <h2 className="font-display text-4xl sm:text-5xl text-white font-extrabold tracking-tight">
          From My Design Desk
        </h2>
      </div>

      {/* Grid of Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="writings-list-grid">
        {ARTICLES.map((article, index) => (
          <motion.a
            key={article.id}
            href={articlePath(article.slug)}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={(event) => {
              event.preventDefault();
              onArticleClick(article);
            }}
            className="group cursor-pointer bg-[#0c0d10]/40 border border-white/5 hover:border-amber-500/20 p-6 rounded-2xl flex flex-col justify-between min-h-[240px] transition-all duration-300 hover:bg-[#0c0d10]/70"
            id={`article-card-${article.id}`}
          >
            {/* Top Row: Date */}
            <div className="font-mono text-xs text-neutral-500 group-hover:text-neutral-400 transition-colors">
              {article.publishedAt}
            </div>

            {/* Middle Row: Title */}
            <h3 className="font-sans text-xl sm:text-2xl text-white group-hover:text-amber-400 font-bold tracking-tight leading-snug transition-colors my-4">
              {article.title}
            </h3>

            {/* Bottom Row: Read Action Link */}
            <div className="flex items-center" id={`article-card-footer-${article.id}`}>
              <span className="font-mono text-xs text-amber-500 flex items-center gap-2 group-hover:text-amber-400 font-semibold transition-colors">
                <span>Read full blog</span>
                <ArrowRight size={13} className="text-amber-500/70 group-hover:translate-x-1 group-hover:text-amber-400 transition-all duration-300" />
              </span>
            </div>
          </motion.a>
        ))}

        {/* Card 3: View All Blogs / CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#0c0d10]/15 border border-dashed border-white/5 hover:border-white/10 rounded-2xl flex flex-col justify-center items-center min-h-[240px] p-6 transition-all duration-300"
          id="article-view-all-card"
        >
          <button 
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="font-mono text-xs text-neutral-300 hover:text-amber-500 border border-white/10 hover:border-amber-500/40 px-6 py-3 rounded-full flex items-center gap-2 transition-all cursor-pointer bg-[#070809]/40 hover:bg-neutral-900 group"
          >
            <span>View all blog</span>
            <ArrowUpRight size={13} className="text-neutral-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform group-hover:text-amber-500" />
          </button>
        </motion.div>
      </div>

    </section>
  );
}
