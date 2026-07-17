import type { Project } from "../types";
import { usePortfolioContent } from "../content";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { projectPath } from "../lib/routes";
import { motion } from "motion/react";
import { resolveAssetUrl } from "../lib/assets";

interface ProjectsGridProps {
  onProjectClick: (project: Project) => void;
  onViewAll?: () => void;
}

export default function ProjectsGrid({ onProjectClick, onViewAll }: ProjectsGridProps) {
  const { projects } = usePortfolioContent();

  return (
    <section id="work" className="mx-auto w-full max-w-[1080px] overflow-hidden px-3 py-9 select-text sm:px-7 sm:py-16 lg:px-5 lg:py-20 xl:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 xl:gap-x-8 gap-y-8 sm:gap-y-12" id="projects-grid-list">
        {projects.slice(0, 10).map((project, index) => {
          const hoverImageUrl = resolveAssetUrl(project.hoverImageUrl);
          const imageUrl = resolveAssetUrl(project.imageUrl);
          return (
            <motion.a
              key={project.id}
              href={projectPath(project.id)}
              onClick={(event) => {
                event.preventDefault();
                onProjectClick(project);
              }}
              className="group flex min-w-0 cursor-pointer flex-col gap-3 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
              id={`project-card-${project.id}`}
            >
              <div className="flex min-h-[2.75rem] items-end justify-between gap-3 px-1">
                <h3 className="min-w-0 font-mono text-sm font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-amber-300 min-[380px]:text-base sm:text-lg">
                  {project.title}
                </h3>
                <span className="shrink-0 pb-0.5 font-mono text-xs text-neutral-400">{project.year}</span>
              </div>

              <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-[#090b0e] shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={`${project.title} technology workspace`}
                    loading="lazy"
                    decoding="async"
                    width="1200"
                    height="1200"
                    className="project-card-base-image absolute inset-0 h-full w-full object-cover group-hover:opacity-0 group-focus:opacity-0"
                  />
                )}
                {hoverImageUrl ? (
                  <img
                    src={hoverImageUrl}
                    alt={`${project.title} use case illustration`}
                    loading="lazy"
                    decoding="async"
                    width="700"
                    height="700"
                    className="project-card-hover-image absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 group-focus:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                ) : null}
                <div className="pointer-events-none absolute inset-0 opacity-0 backdrop-blur-[4px] [mask-image:linear-gradient(to_top,black_0%,black_42%,rgba(0,0,0,0.72)_62%,transparent_88%)] transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-focus:opacity-100" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 flex min-h-[64%] translate-y-3 flex-col justify-end bg-gradient-to-t from-black/90 via-black/52 to-transparent p-5 opacity-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 sm:p-6">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-sm font-bold uppercase tracking-[0.13em] text-amber-200 [text-shadow:0_1px_5px_rgba(0,0,0,0.9)]">
                          {String(index + 1).padStart(2, "0")} · {project.category}
                        </p>
                        <p className="mt-2 line-clamp-3 font-sans text-base font-medium leading-7 text-white [text-shadow:0_1px_7px_rgba(0,0,0,0.95)]">
                          {project.description}
                        </p>
                      </div>
                      <span className="shrink-0 pt-0.5 text-white transition-[transform,color] duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-200">
                        <ArrowUpRight size={20} strokeWidth={2.2} />
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="rounded-md border border-white/25 bg-transparent px-2.5 py-1.5 font-mono text-xs font-semibold text-white shadow-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-white/85 [text-shadow:0_1px_5px_rgba(0,0,0,0.9)]">{project.status ?? project.year}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 px-1 md:hidden">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.12em] text-amber-300/90">
                  <span>{project.category}</span>
                  <span className="text-white/25">/</span>
                  <span className="text-neutral-400">{project.status ?? project.year}</span>
                </div>
                <p className="line-clamp-2 font-sans text-sm leading-6 text-neutral-400">{project.description}</p>
              </div>
            </motion.a>
          );
        })}
      </div>

      {onViewAll && (
        <motion.div
          className="mt-11 sm:mt-16 rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 backdrop-blur-sm"
        >
          <div>
            <p className="font-display text-lg text-white">Want the uninterrupted project view?</p>
            <p className="mt-1 font-sans text-sm leading-6 text-neutral-400">Switch the center workspace and its information panel entirely to projects.</p>
          </div>
          <button
            type="button"
            onClick={onViewAll}
            className="group flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-amber-400/20 bg-amber-400/10 px-5 py-3 font-mono text-xs uppercase tracking-[0.1em] text-amber-200 transition-all hover:border-amber-400/45 hover:bg-amber-400/15 active:scale-[0.98] sm:w-auto"
          >
            <span>See more projects</span>
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      )}
    </section>
  );
}
