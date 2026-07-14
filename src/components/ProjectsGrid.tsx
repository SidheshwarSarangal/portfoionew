import type { Project } from "../types";
import { usePortfolioContent } from "../content";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { projectPath } from "../lib/routes";
import { motion, useReducedMotion } from "motion/react";

interface ProjectsGridProps {
  onProjectClick: (project: Project) => void;
  onViewAll?: () => void;
}

export default function ProjectsGrid({ onProjectClick, onViewAll }: ProjectsGridProps) {
  const { projects } = usePortfolioContent();
  const reduceMotion = useReducedMotion();

  return (
    <section id="work" className="w-full max-w-[1080px] mx-auto px-5 sm:px-7 lg:px-5 xl:px-8 py-14 sm:py-16 lg:py-20 select-text overflow-hidden">
      <motion.div
        className="mb-8 sm:mb-10 flex items-center justify-between gap-4 border-b border-white/[0.07] pb-4"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.75 }}
        transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="font-mono text-[10px] sm:text-[11px] text-neutral-500 select-none">
          &lt;!-- <span className="text-neutral-300">Selected projects</span> --&gt;
        </div>
        <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.16em] sm:tracking-[0.2em] text-neutral-600">Hover to reveal · click to inspect</span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 xl:gap-x-8 gap-y-10 sm:gap-y-12" id="projects-grid-list">
        {projects.slice(0, 10).map((project, index) => {
          const fromLeft = index % 2 === 0;
          return (
            <motion.a
              key={project.id}
              href={projectPath(project.id)}
              onClick={(event) => {
                event.preventDefault();
                onProjectClick(project);
              }}
              className="group cursor-pointer flex min-w-0 flex-col gap-3 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
              id={`project-card-${project.id}`}
              initial={reduceMotion ? false : { opacity: 0, x: fromLeft ? -120 : 120, y: 24 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.15, margin: "-6% 0px -6% 0px" }}
              transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex min-h-[2.75rem] items-end justify-between gap-4 px-1">
                <h3 className="font-mono text-sm sm:text-base text-white font-semibold leading-snug tracking-tight transition-colors group-hover:text-amber-300">
                  {project.title}
                </h3>
                <span className="shrink-0 pb-0.5 font-mono text-[9px] text-neutral-600">{project.year}</span>
              </div>

              <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-[#090b0e] shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} primary view`}
                    loading="lazy"
                    decoding="async"
                    width="700"
                    height="700"
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.035] group-hover:opacity-0 group-focus:scale-[1.035] group-focus:opacity-0"
                    referrerPolicy="no-referrer"
                  />
                ) : null}
                {project.hoverImageUrl ? (
                  <img
                    src={project.hoverImageUrl}
                    alt={`${project.title} alternate view`}
                    loading="lazy"
                    decoding="async"
                    width="700"
                    height="700"
                    className="absolute inset-0 h-full w-full scale-[1.055] object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus:scale-100 group-focus:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                ) : null}
                {!project.imageUrl && (
                  <div className="absolute inset-0 grid place-items-center font-mono text-[10px] text-neutral-600">MEDIA PENDING</div>
                )}
                <div className="absolute inset-0 flex translate-y-3 flex-col justify-end bg-gradient-to-t from-black/75 via-black/20 to-transparent p-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 sm:p-5">
                  <div className="rounded-xl border border-white/10 bg-black/45 p-4 shadow-xl backdrop-blur-md">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-amber-300/90">
                          {String(index + 1).padStart(2, "0")} · {project.category}
                        </p>
                        <p className="mt-2 line-clamp-3 font-sans text-[11px] leading-relaxed text-white/80 sm:text-xs">
                          {project.description}
                        </p>
                      </div>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-300 group-hover:rotate-12 group-hover:border-amber-400/50 group-hover:text-amber-300">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="rounded-full border border-white/10 bg-white/[0.06] px-2 py-1 font-mono text-[8px] text-white/65">{tech}</span>
                      ))}
                    </div>
                    <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.14em] text-white/45">{project.status ?? project.year}</p>
                  </div>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>

      {onViewAll && (
        <motion.div
          className="mt-14 sm:mt-16 rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 backdrop-blur-sm"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: reduceMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="font-display text-lg text-white">Want the uninterrupted project view?</p>
            <p className="mt-1 font-sans text-xs text-neutral-500">Switch the center workspace and its information panel entirely to projects.</p>
          </div>
          <button
            type="button"
            onClick={onViewAll}
            className="group flex shrink-0 items-center justify-center gap-2 rounded-xl border border-amber-400/20 bg-amber-400/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-amber-200 transition-all hover:border-amber-400/45 hover:bg-amber-400/15 active:scale-[0.98]"
          >
            <span>See more projects</span>
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      )}
    </section>
  );
}
