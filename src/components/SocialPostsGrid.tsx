import { ArrowUpRight } from "lucide-react";
import { usePortfolioContent } from "../content";

export default function SocialPostsGrid() {
  const { socialPosts } = usePortfolioContent();

  return (
    <section className="mx-auto w-full max-w-5xl px-3 py-9 select-text sm:px-6 sm:py-12">
      <div className="mb-8 space-y-2">
        <h1 className="font-display text-3xl font-semibold text-white sm:text-5xl">Posts & updates</h1>
        <p className="max-w-2xl font-mono text-base leading-7 text-neutral-400">
          Notes, articles, releases, and updates from across my social profiles.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {socialPosts.map((post) => {
          return (
            <article
              key={post.id}
              className="min-w-0"
            >
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[230px] cursor-pointer flex-col justify-between rounded-2xl border border-white/[0.1] bg-white/[0.015] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/25 hover:bg-white/[0.04] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.11),0_20px_55px_rgba(0,0,0,0.22)] sm:min-h-[270px] sm:p-7"
              >
                <div className="flex items-center justify-between gap-3 font-mono text-xs font-medium uppercase tracking-[0.12em] text-neutral-300 transition-colors group-hover:text-amber-400">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span>{post.publishedAt}</span>
                  </span>
                  <span className="text-[10px] text-neutral-500 transition-colors group-hover:text-amber-400 sm:text-xs">
                    {post.platform}
                  </span>
                </div>

                <div className="my-6 space-y-4">
                  <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-amber-400 sm:text-3xl">
                    {post.title}
                  </h2>
                  <p className="font-mono text-sm font-light leading-7 text-neutral-400">
                    {post.summary}
                  </p>
                </div>

                <span className="flex items-center gap-2 font-mono text-xs font-semibold text-amber-500 transition-colors group-hover:text-amber-400">
                  <span>View on LinkedIn</span>
                  <ArrowUpRight size={13} className="text-amber-500/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-400" />
                </span>
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
