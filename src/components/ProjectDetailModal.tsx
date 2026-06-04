import { motion, AnimatePresence } from "motion/react";
import { X, ArrowUpRight, Github, ExternalLink, Dribbble } from "lucide-react";
import { Project } from "../types";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 overflow-y-auto" 
        id="project-detail-modal-wrapper"
      >
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          id="project-detail-backdrop"
        />

        {/* Modal content area container */}
        <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-10 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="w-full max-w-3xl bg-[#0e0f10] border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 relative shadow-2xl overflow-hidden"
            id="project-detail-modal-card"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer transition-colors"
              id="project-modal-close-btn"
            >
              <X size={16} />
            </button>

            {/* Header section */}
            <div className="border-b border-white/5 pb-6 mb-8" id="project-modal-header">
              <span className="font-mono text-xs text-neutral-500 font-medium bg-white/5 px-2.5 py-1 rounded-md">
                Project • {project.year}
              </span>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-medium tracking-tight mt-4">
                {project.title}
              </h1>
              <p className="font-sans text-neutral-400 text-sm mt-3 leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            {/* Grid for Roles, Tech and Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8" id="project-modal-summary-panel">
              <div>
                <h4 className="font-mono text-[10px] uppercase text-neutral-500 tracking-wider font-semibold">My Roles</h4>
                <ul className="mt-2 text-sm text-neutral-300 font-sans font-light space-y-1">
                  {project.roles.map((role) => <li key={role}>{role}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-[10px] uppercase text-neutral-500 tracking-wider font-semibold">Tech Palette</h4>
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="font-mono text-[10px] text-neutral-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-mono text-[10px] uppercase text-neutral-500 tracking-wider font-semibold">Asset Source</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
                    >
                      <Github size={12} />
                      <span>Repository</span>
                    </a>
                  )}
                  {project.links.dribbble && (
                    <a
                      href={project.links.dribbble}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
                    >
                      <Dribbble size={12} />
                      <span>Shots</span>
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-white text-black text-xs hover:bg-neutral-200 font-medium transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLink size={12} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Core Narrative */}
            <div className="space-y-8" id="project-modal-narrative">
              <div>
                <h3 className="font-display text-base text-white font-medium tracking-tight">The Friction (Problem)</h3>
                <p className="font-sans text-neutral-400 text-sm leading-relaxed mt-2 font-light">
                  {project.details.problem}
                </p>
              </div>

              <div>
                <h3 className="font-display text-base text-white font-medium tracking-tight">The Overhaul (Solution)</h3>
                <p className="font-sans text-neutral-400 text-sm leading-relaxed mt-2 font-light">
                  {project.details.solution}
                </p>
              </div>

              <div>
                <h3 className="font-display text-base text-white font-medium tracking-tight">Key Outcomes</h3>
                <ul className="mt-2 text-sm text-neutral-300 list-inside list-disc font-sans font-light space-y-2">
                  {project.details.outcomes.map((outcome, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
