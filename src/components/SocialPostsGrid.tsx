import { ArrowUpRight, MessageSquareText } from "lucide-react";
import { usePortfolioContent } from "../content";

export default function SocialPostsGrid() {
  const { socialPosts } = usePortfolioContent();

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 select-text sm:px-6 sm:py-12">
      <div className="mb-8 space-y-2">
        <h1 className="font-display text-3xl sm:text-5xl font-semibold text-white">Posts & updates</h1>
        <p className="max-w-2xl font-mono text-base leading-7 text-neutral-400">
          Notes, articles, releases, and updates from across my social profiles.
        </p>
      </div>

      <div
        className="grid gap-5"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}
      >
        {socialPosts.map((post) => {
          const card = (
            <>
              {post.imageUrl ? (
                <img src={post.imageUrl} alt="" className="h-40 w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              ) : (
                <div className="h-32 flex items-center justify-center bg-gradient-to-br from-white/[0.06] via-[#fbbc04]/10 to-black border-b border-white/5">
                  <MessageSquareText size={30} className="text-white/40" />
                </div>
              )}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between gap-3 font-mono text-xs uppercase tracking-wider">
                  <span className="text-[#fbbc04]">{post.platform}</span>
                  <span className="text-neutral-400">{post.publishedAt}</span>
                </div>
                <h2 className="font-mono text-lg font-semibold text-white group-hover:text-[#fbbc04] transition-colors">{post.title}</h2>
                <p className="font-mono text-sm leading-6 text-neutral-400">{post.summary}</p>
                {post.url && <ArrowUpRight size={15} className="text-neutral-600 group-hover:text-white transition-colors" />}
              </div>
            </>
          );

          return (
            <article
              key={post.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] hover:border-[#fbbc04]/35 transition-colors"
            >
              {post.url ? <a href={post.url} target="_blank" rel="noopener noreferrer" className="block h-full">{card}</a> : card}
            </article>
          );
        })}
      </div>
    </section>
  );
}
