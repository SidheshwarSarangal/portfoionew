import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, Share2, ExternalLink } from "lucide-react";
import type { Article } from "../types";
import { useEffect, useMemo } from "react";
import { useCopyFeedback } from "../hooks/useCopyFeedback";

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

function renderContentLines(content: string) {
  return content.split("\n").map((line, index) => {
    const trimmed = line.trim();
    const key = `${index}-${trimmed.slice(0, 24)}`;
    if (!trimmed) return <div key={key} className="h-4" />;

    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={key} className="font-display text-xl sm:text-2xl text-white font-semibold mt-8 mb-4 tracking-tight">
          {trimmed.slice(3)}
        </h2>
      );
    }

    if (trimmed.startsWith("### ")) {
      return (
        <h3 key={key} className="font-display text-lg text-white font-medium mt-6 mb-3 tracking-tight">
          {trimmed.slice(4)}
        </h3>
      );
    }

    if (trimmed.startsWith("#### ")) {
      return (
        <h4 key={key} className="font-display text-base text-neutral-200 mt-5 mb-2 font-medium tracking-tight">
          {trimmed.slice(5)}
        </h4>
      );
    }

    if (trimmed.startsWith("- ")) {
      return (
        <li key={key} className="mb-2 list-inside list-disc pl-4 font-sans text-base font-light leading-7 text-neutral-200">
          {trimmed.slice(2)}
        </li>
      );
    }

    if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      return (
        <p key={key} className="font-sans text-neutral-100 text-base leading-7 mb-4 font-medium">
          {trimmed.replaceAll("**", "")}
        </p>
      );
    }

    return (
      <p key={key} className="font-sans text-neutral-200 text-base leading-7 mb-4 font-light">
        {trimmed}
      </p>
    );
  });
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  const { copied, copyText } = useCopyFeedback();
  const articleContent = article?.content ?? "";

  useEffect(() => {
    if (!article) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [article, onClose]);

  const renderedContent = useMemo(
    () => renderContentLines(articleContent),
    [articleContent],
  );

  if (!article) return null;

  const handleShare = () => {
    void copyText(article.externalUrl ?? window.location.href);
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
        <div className="relative flex min-h-[100dvh] items-start justify-center p-1.5 sm:items-center sm:p-6 md:p-8">
          <motion.article
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative my-1 w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-[#0d0e10] px-4 pb-5 pt-16 shadow-2xl min-[380px]:px-5 sm:my-0 sm:rounded-2xl sm:p-8 md:p-10"
            id="article-detail-modal-card"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close article"
              className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white cursor-pointer sm:right-5 sm:top-5 sm:h-9 sm:w-9"
              id="article-modal-close-btn"
            >
              <X size={16} />
            </button>

            {/* Editorial Metadata */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[11px] font-medium text-neutral-400 sm:gap-3 sm:text-xs" id="article-modal-metadata">
              <span className="text-[#a3a3a3] uppercase tracking-wider">{article.category}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar size={13} />
                <span>{article.publishedAt}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock size={13} />
                <span>{article.readTime}</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-medium tracking-tight mt-6 leading-tight" id="article-modal-title">
              {article.title}
            </h1>

            {/* Divider */}
            <div className="my-6 h-px bg-white/5 sm:my-8" />

            {/* Editorial Article Body */}
            <div className="prose prose-invert mb-7 max-w-none sm:mb-10" id="article-modal-md-body">
              {renderedContent}
            </div>

            {/* Footer / Share Button Row */}
            <div className="mt-10 flex flex-col gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between" id="article-modal-footer">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-white text-sm font-mono">
                  S
                </div>
                <div>
                  <h4 className="font-sans text-sm text-white font-medium">Sidheshwar</h4>
                  <p className="font-mono text-[11px] text-neutral-400">SOFTWARE ENGINEER</p>
                </div>
              </div>

              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <button
                  onClick={handleShare}
                  className="flex cursor-pointer items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 font-sans text-sm font-medium text-neutral-200 transition-colors hover:bg-white/10 hover:text-white"
                  id="article-share-btn"
                >
                  <Share2 size={12} />
                  <span>{copied ? "Copied Link!" : "Copy post link"}</span>
                </button>
                {article.externalUrl && (
                  <a
                    href={article.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-full bg-[#0a66c2] px-4 py-2.5 font-sans text-sm font-semibold text-white transition-all hover:bg-[#1681d9] hover:shadow-[0_10px_28px_rgba(10,102,194,0.28)]"
                  >
                    <span>View on LinkedIn</span>
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </AnimatePresence>
  );
}
