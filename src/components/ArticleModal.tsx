import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, Share2 } from "lucide-react";
import type { Article } from "../types";
import { useEffect, useState } from "react";

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!article) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [article, onClose]);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Safe custom renderer translating markdown tokens into Tailwind-styled React nodes
  const renderContentLines = (content: string) => {
    const lines = content.split("\n");
    let keyIdx = 0;

    return lines.map((line) => {
      keyIdx++;
      const trimmed = line.trim();
      if (!trimmed) return <div key={keyIdx} className="h-4" />;

      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={keyIdx} className="font-display text-xl sm:text-2xl text-white font-semibold mt-8 mb-4 tracking-tight">
            {trimmed.replace("## ", "")}
          </h2>
        );
      }

      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={keyIdx} className="font-display text-lg text-white font-medium mt-6 mb-3 tracking-tight">
            {trimmed.replace("### ", "")}
          </h3>
        );
      }

      if (trimmed.startsWith("#### ")) {
        return (
          <h4 key={keyIdx} className="font-display text-base text-neutral-200 mt-5 mb-2 font-medium tracking-tight">
            {trimmed.replace("#### ", "")}
          </h4>
        );
      }

      if (trimmed.startsWith("- ")) {
        return (
          <li key={keyIdx} className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed mb-2 list-disc list-inside pl-4 font-light">
            {trimmed.replace("- ", "")}
          </li>
        );
      }

      // Strong / Bold inline rendering matches
      if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        return (
          <p key={keyIdx} className="font-sans text-neutral-150 text-sm sm:text-base leading-relaxed mb-4 font-medium">
            {trimmed.replaceAll("**", "")}
          </p>
        );
      }

      return (
        <p key={keyIdx} className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed mb-4 font-light">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 overflow-y-auto" 
        id="article-detail-modal-wrapper"
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-modal-title"
      >
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
          id="article-detail-backdrop"
        />

        {/* Modal content area container */}
        <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8 relative">
          <motion.article
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="w-full max-w-2xl bg-[#0d0e10] border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 relative shadow-2xl overflow-hidden"
            id="article-detail-modal-card"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close article"
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer transition-colors"
              id="article-modal-close-btn"
            >
              <X size={16} />
            </button>

            {/* Editorial Metadata */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-neutral-500 font-medium" id="article-modal-metadata">
              <span className="text-[#a3a3a3] uppercase tracking-wider">{article.category}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar size={10} />
                <span>{article.publishedAt}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock size={10} />
                <span>{article.readTime}</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-medium tracking-tight mt-6 leading-tight" id="article-modal-title">
              {article.title}
            </h1>

            {/* Divider */}
            <div className="h-px bg-white/5 my-8" />

            {/* Editorial Article Body */}
            <div className="prose prose-invert max-w-none mb-10" id="article-modal-md-body">
              {renderContentLines(article.content)}
            </div>

            {/* Footer / Share Button Row */}
            <div className="border-t border-white/5 pt-6 mt-10 flex items-center justify-between" id="article-modal-footer">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-white text-xs font-mono">
                  S
                </div>
                <div>
                  <h4 className="font-sans text-xs text-white font-medium">Sidheshwar</h4>
                  <p className="font-mono text-[9px] text-neutral-500">CREATIVE DIGITAL DESIGNER</p>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 text-xs font-sans font-medium text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                id="article-share-btn"
              >
                <Share2 size={12} />
                <span>{copied ? "Copied Link!" : "Share Thought"}</span>
              </button>
            </div>
          </motion.article>
        </div>
      </div>
    </AnimatePresence>
  );
}
