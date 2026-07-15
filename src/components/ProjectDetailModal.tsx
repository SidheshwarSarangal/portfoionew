import { motion } from "motion/react";
import { Building2, CalendarRange, Dribbble, ExternalLink, Github, Layers3, Users, X } from "lucide-react";
import type { Project } from "../types";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { trackEvent } from "../lib/analytics";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

const linkClasses = "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2.5 font-mono text-xs text-neutral-200 transition-all hover:border-amber-300/35 hover:bg-amber-300/10 hover:text-amber-200";

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;
  const architecture = project.details.architecture?.length
    ? project.details.architecture
    : project.technologies.slice(0, 5);

  return (
    <motion.div
      className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="fixed inset-0 bg-[#020305]/75 backdrop-blur-xl" aria-hidden="true" />

      <div className="relative flex min-h-full items-start justify-center p-2 sm:p-5 lg:p-8">
        <motion.article
          initial={{ opacity: 0, scale: 0.965, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.965, y: 28 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={(event) => event.stopPropagation()}
          className="relative my-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-[#0a0c11]/80 shadow-[0_35px_120px_rgba(0,0,0,0.72)] backdrop-blur-2xl sm:rounded-[1.75rem]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_3%,rgba(251,191,36,0.10),transparent_28%),radial-gradient(circle_at_0%_60%,rgba(59,130,246,0.08),transparent_32%)]" />

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/35 text-neutral-300 backdrop-blur-xl transition-all hover:rotate-90 hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <X size={17} />
          </button>

          <div className="relative grid lg:grid-cols-[1.18fr_0.82fr]">
            <div className="border-b border-white/10 p-4 sm:p-6 lg:border-b-0 lg:border-r lg:p-8">
              {project.videoUrl ? (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={project.videoPosterUrl ?? project.imageUrl}
                  className="aspect-video w-full rounded-2xl border border-white/10 bg-black object-cover"
                >
                  <source src={project.videoUrl} />
                  Your browser does not support embedded video.
                </video>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {[project.imageUrl, project.hoverImageUrl].filter(Boolean).map((image, index) => (
                    <figure key={`${image}-${index}`} className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                      <img
                        src={image}
                        alt={`${project.title} ${index === 0 ? "overview" : "alternate view"}`}
                        className="h-full w-full object-cover brightness-[0.82] transition duration-700 group-hover:scale-105 group-hover:brightness-100"
                        referrerPolicy="no-referrer"
                      />
                      <figcaption className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/55 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-white/85 backdrop-blur-md">
                        {index === 0 ? "Primary view" : "Detail view"}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}

              <section className="mt-8">
                <div className="mb-4 flex items-center gap-2 text-neutral-400">
                  <Layers3 size={14} />
                  <h2 className="font-mono text-xs uppercase tracking-[0.16em]">System diagram</h2>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  {architecture.map((stage, index) => (
                    <div key={stage} className="contents">
                      <div className="flex min-h-16 flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] px-3 text-center font-mono text-xs leading-5 text-neutral-200">
                        {stage}
                      </div>
                      {index < architecture.length - 1 && (
                        <span className="text-center font-mono text-xs text-amber-300/60 sm:-mx-1">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="relative p-5 sm:p-7 lg:p-8">
              <span className="inline-flex rounded-full border border-amber-300/15 bg-amber-300/[0.07] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-amber-200/90">
                {project.category} · {project.year}
              </span>
              <h1 id="project-modal-title" className="mt-5 max-w-xl font-display text-3xl leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 font-sans text-base leading-8 text-neutral-300">{project.description}</p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Fact icon={<CalendarRange size={14} />} label="Timeline" value={[project.startedAt, project.completedAt].filter(Boolean).join(" — ") || project.year} />
                <Fact icon={<Building2 size={14} />} label="Associated with" value={project.associatedWith ?? "Independent project"} />
                <Fact icon={<Users size={14} />} label="Contributors" value={project.contributors?.join(", ") ?? "Sidheshwar Sarangal"} />
                <Fact icon={<Layers3 size={14} />} label="Status" value={project.status ?? "Completed"} />
              </div>

              <div className="mt-7">
                <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-400">Tech stack</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 font-mono text-xs text-neutral-200">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.links.github && <ProjectLink href={project.links.github} label="Repository" icon={<Github size={13} />} onClick={() => trackEvent("project_repository_click", { project_id: project.id })} />}
                {project.links.live && <ProjectLink href={project.links.live} label="Live demo" icon={<ExternalLink size={13} />} onClick={() => trackEvent("live_demo_click", { project_id: project.id })} />}
                {project.links.dribbble && <ProjectLink href={project.links.dribbble} label="Dribbble" icon={<Dribbble size={13} />} />}
                {project.links.behance && <ProjectLink href={project.links.behance} label="Behance" icon={<ExternalLink size={13} />} />}
              </div>
            </div>
          </div>

          <div className="relative border-t border-white/10 p-5 sm:p-7 lg:p-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <Narrative title="The brief" text={project.details.problem} />
              <Narrative title="The approach" text={project.details.solution} />
              <div>
                <h2 className="font-display text-lg text-white">Results & highlights</h2>
                <ul className="mt-3 space-y-3">
                  {[...project.details.outcomes, ...(project.details.highlights ?? [])].map((item) => (
                    <li key={item} className="flex gap-3 font-sans text-sm leading-7 text-neutral-300">
                      <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-amber-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}

function Fact({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-black/15 p-3">
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-neutral-500">{icon}{label}</div>
      <p className="mt-2 font-sans text-sm leading-6 text-neutral-200">{value}</p>
    </div>
  );
}

function Narrative({ title, text }: { title: string; text: string }) {
  return (
    <section>
      <h2 className="font-display text-lg text-white">{title}</h2>
      <p className="mt-3 font-sans text-sm leading-7 text-neutral-300">{text}</p>
    </section>
  );
}

function ProjectLink({ href, label, icon, onClick }: { href: string; label: string; icon: ReactNode; onClick?: () => void }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={linkClasses}>
      {icon}<span>{label}</span>
    </a>
  );
}
