import { ArrowUpRight, MessageSquareText } from "lucide-react";
import { usePortfolioContent } from "../content";

export default function SocialPostsGrid() {
  const { socialPosts } = usePortfolioContent();

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-12 select-text">
      <div className="mb-8 space-y-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#fbbc04]">// SOCIAL</p>
        <h1 className="font-display text-3xl sm:text-5xl font-semibold text-white">Posts & updates</h1>
        <p className="max-w-2xl font-mono text-sm leading-6 text-neutral-500">
          Notes, articles, releases, and updates from across my social profiles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
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
                <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-wider">
                  <span className="text-[#fbbc04]">{post.platform}</span>
                  <span className="text-neutral-600">{post.publishedAt}</span>
                </div>
                <h2 className="font-mono text-base font-semibold text-white group-hover:text-[#fbbc04] transition-colors">{post.title}</h2>
                <p className="font-mono text-xs leading-5 text-neutral-500">{post.summary}</p>
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
