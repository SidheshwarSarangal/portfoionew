import { motion, useReducedMotion } from "motion/react";
import {
  Building2,
  CalendarRange,
  CheckCircle2,
  Download,
  ExternalLink,
  Github,
  Route,
  Target,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Project } from "../types";
import { trackEvent } from "../lib/analytics";
import { resolveAssetUrl } from "../lib/assets";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

const actionClasses = "inline-flex w-full items-center justify-center gap-2 px-4 py-3 font-mono text-sm font-bold underline decoration-2 underline-offset-[5px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:w-auto";
type DetailView = "problem" | "technology" | "outcomes";

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const [detailView, setDetailView] = useState<DetailView>("problem");

  useEffect(() => {
    setDetailView("problem");
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const technologyRoles = project.details.technologyRoles ?? project.technologies.map((technology) => ({
    technology,
    purpose: `Used as part of the ${project.category.toLowerCase()} implementation.`,
  }));
  const useCaseImageUrl = resolveAssetUrl(project.hoverImageUrl);
  const pdfUrl = resolveAssetUrl(project.pdfUrl);
  const timeline = [project.startedAt, project.completedAt].filter(Boolean).join(" — ") || project.year;

  return (
    <motion.div
      className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-[#020305]/95 p-1.5 sm:p-5 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
    >
      <motion.article
        onClick={(event) => event.stopPropagation()}
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: 10 }}
        transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="project-popup-readable relative mx-auto my-1 w-full max-w-6xl transform-gpu overflow-hidden rounded-xl border border-white/[0.12] bg-[#090b0f] shadow-[0_35px_120px_rgba(0,0,0,0.72)] [backface-visibility:hidden] sm:my-5 sm:rounded-[1.75rem]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_16%_0%,rgba(251,191,36,0.11),transparent_38%),radial-gradient(circle_at_88%_8%,rgba(59,130,246,0.09),transparent_36%)]" />

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-3 top-3 z-30 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/65 text-neutral-300 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:right-4 sm:top-4 sm:h-10 sm:w-10"
        >
          <X size={17} />
        </button>

        <header className="relative isolate overflow-hidden border-b border-white/[0.08] px-3.5 pb-6 pt-16 min-[380px]:px-4 sm:px-8 sm:pb-9 sm:pt-12 lg:px-10 lg:py-14">
          {useCaseImageUrl && (
            <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
              <img
                src={useCaseImageUrl}
                alt=""
                decoding="async"
                className="h-full w-full scale-[1.04] object-cover opacity-90 blur-[1.5px] saturate-110"
              />
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,5,8,0.82)_0%,rgba(3,5,8,0.62)_48%,rgba(3,5,8,0.24)_100%),linear-gradient(0deg,rgba(3,5,8,0.78)_0%,rgba(3,5,8,0.16)_58%,rgba(3,5,8,0.28)_100%)]" aria-hidden="true" />

          <div className="relative max-w-4xl p-4 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-200 sm:text-xs">
                {project.category}
              </span>
              <span className="px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-100 sm:text-xs">
                {project.status ?? "Completed"}
              </span>
            </div>

            <h1 id="project-modal-title" className="mt-5 max-w-3xl font-display text-3xl font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              {project.title}
            </h1>
            <p className="mt-5 max-w-3xl font-sans text-base font-normal leading-8 text-neutral-100 sm:text-lg sm:leading-9">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="px-3.5 py-2 font-mono text-xs font-semibold text-white sm:px-4 sm:py-2.5 sm:text-sm"
                >
                  {technology}
                </span>
              ))}
            </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("project_repository_click", { project_id: project.id })}
                    className={`${actionClasses} text-amber-200 decoration-amber-300/70 hover:text-amber-100 hover:decoration-amber-200`}
                  >
                    <Github size={17} strokeWidth={2.2} /> Repository <ExternalLink size={14} strokeWidth={2.2} />
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("live_demo_click", { project_id: project.id })}
                    className={`${actionClasses} text-sky-200 decoration-sky-300/70 hover:text-sky-100 hover:decoration-sky-200`}
                  >
                    <ExternalLink size={17} strokeWidth={2.2} /> Live product
                  </a>
                )}
                {pdfUrl && (
                  <a
                    href={pdfUrl}
                    download
                    className={`${actionClasses} text-emerald-200 decoration-emerald-300/70 hover:text-emerald-100 hover:decoration-emerald-200`}
                  >
                    <Download size={17} strokeWidth={2.2} /> Download full PDF
                  </a>
                )}
            </div>
          </div>

          <dl className="relative mt-8 grid gap-px overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
            <Metadata icon={<CalendarRange size={14} />} label="Date / timeline" value={timeline} />
            <Metadata icon={<Building2 size={14} />} label="Context" value={project.associatedWith ?? "Independent project"} />
            <Metadata icon={<Users size={14} />} label="Contributors" value={project.contributors?.join(", ") ?? "Sidheshwar Sarangal"} />
            <Metadata icon={<Wrench size={14} />} label="Role" value={project.roles.join(" · ")} />
          </dl>
        </header>

        <main className="relative space-y-10 px-3.5 py-6 min-[380px]:px-4 sm:space-y-12 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <section aria-label="Project details">
            <div className="grid gap-2 p-2 sm:grid-cols-3" role="tablist" aria-label="Choose project detail">
              <DetailTab
                active={detailView === "problem"}
                icon={<Target size={17} />}
                label="Problem solved"
                onClick={() => setDetailView("problem")}
              />
              <DetailTab
                active={detailView === "technology"}
                icon={<Wrench size={17} />}
                label="Technology functions"
                onClick={() => setDetailView("technology")}
              />
              <DetailTab
                active={detailView === "outcomes"}
                icon={<CheckCircle2 size={17} />}
                label="Outcomes"
                onClick={() => setDetailView("outcomes")}
              />
            </div>

            <motion.div
              key={detailView}
              role="tabpanel"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6"
            >
              {detailView === "problem" && (
                <div className="grid gap-4 lg:grid-cols-2">
                  <ContentPanel
                    icon={<Target size={17} />}
                    label="Real-world problem"
                    text={project.details.problem}
                    accent="amber"
                  />
                  <ContentPanel
                    icon={<Route size={17} />}
                    label="Implementation approach"
                    text={project.details.solution}
                    accent="blue"
                  />
                </div>
              )}

              {detailView === "technology" && (
                <div className="grid gap-3 md:grid-cols-2">
                  {technologyRoles.map((item, index) => (
                    <article key={item.technology} className="p-5">
                      <div className="flex items-start gap-4">
                        <span className="grid h-8 w-8 shrink-0 place-items-center font-mono text-[10px] text-amber-200">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="font-mono text-sm font-semibold text-white">{item.technology}</h3>
                          <p className="mt-2 font-sans text-sm leading-7 text-neutral-200">{item.purpose}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {detailView === "outcomes" && (
                <div className="grid gap-3 lg:grid-cols-2">
                  {[...project.details.outcomes, ...(project.details.highlights ?? [])].map((outcome) => (
                    <div key={outcome} className="flex gap-3 p-4">
                      <CheckCircle2 size={16} className="mt-1 shrink-0 text-emerald-400" />
                      <p className="font-sans text-sm leading-7 text-neutral-100">{outcome}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </section>

        </main>
      </motion.article>
    </motion.div>
  );
}

function Metadata({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="p-4">
      <dt className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-amber-100">{icon}{label}</dt>
      <dd className="mt-2 font-sans text-sm font-medium leading-6 text-white">{value}</dd>
    </div>
  );
}

function DetailTab({ active, icon, label, onClick }: { active: boolean; icon: ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`flex min-h-14 items-center justify-center gap-2.5 border-b px-4 py-3 font-mono text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
        active
          ? "border-amber-300/70 text-amber-100"
          : "border-transparent text-neutral-200 hover:border-white/30 hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function ContentPanel({ icon, label, text, accent }: { icon: ReactNode; label: string; text: string; accent: "amber" | "blue" }) {
  const accentClasses = accent === "amber" ? "text-amber-200" : "text-blue-200";

  return (
    <article className={`p-5 sm:p-6 ${accentClasses}`}>
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.13em]">{icon}{label}</div>
      <p className="mt-4 font-sans text-base leading-8 text-neutral-100">{text}</p>
    </article>
  );
}
