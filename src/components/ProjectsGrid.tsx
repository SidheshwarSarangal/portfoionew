import { motion } from "motion/react";
import type { Project } from "../types";
import { usePortfolioContent } from "../content";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { projectPath } from "../lib/routes";

interface ProjectsGridProps {
  onProjectClick: (project: Project) => void;
}

export default function ProjectsGrid({ onProjectClick }: ProjectsGridProps) {
  const { projects: PROJECTS } = usePortfolioContent();
  return (
    <section id="work" className="max-w-5xl mx-auto px-6 py-10 border-t border-white/5 select-text">
      {/* Commentary Marker */}
      <div className="font-mono text-[11px] text-neutral-600 mb-5 flex items-center gap-1 select-none">
        <span>&lt;!--</span>
        <span className="text-neutral-500 font-medium">Featured work</span>
        <span>--&gt;</span>
      </div>

      {/* Grid of Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" id="projects-grid-list">
        {PROJECTS.map((project, index) => (
          <motion.a
            key={project.id}
            href={projectPath(project.id)}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onClick={(event) => {
              event.preventDefault();
              onProjectClick(project);
            }}
            className="group cursor-pointer flex flex-col space-y-3"
            id={`project-card-${project.id}`}
          >
            {/* Header row: Title and Link Arrow */}
            <div className="flex items-center justify-between" id={`project-card-header-${project.id}`}>
              <h3 className="font-mono text-sm sm:text-base text-white group-hover:text-amber-400 font-semibold tracking-tight transition-colors">
                {project.title}
              </h3>
              <div className="text-neutral-500 group-hover:text-amber-400 transition-colors duration-300">
                <ArrowUpRight size={15} />
              </div>
            </div>

            {/* Project Image Container */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/5 bg-neutral-950 flex items-center justify-center">
              {project.imageUrl ? (
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  width="700"
                  height="525"
                  className="w-full h-full object-cover grayscale brightness-[0.85] group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-[#0d0e10] flex items-center justify-center text-neutral-500 font-mono text-[10px]">
                  _IMAGE_STRETCH_METRIC
                </div>
              )}
              {/* Soft overlay on hover */}
              <div className="absolute inset-0 bg-black/10 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
            </div>
          </motion.a>
        ))}
      </div>

      {/* Footer Explore Card Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10 p-5 bg-[#0c0d10]/40 border border-white/5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        id="explore-full-work-card"
      >
        <div className="space-y-1">
          <p className="font-sans text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">
            Explore the full collection of my design and development work.
            <span className="font-mono text-[10px] text-neutral-500 ml-2 select-none">.2k v56fd2918 b19-7</span>
          </p>
        </div>

        <button 
          onClick={() => {
            const el = document.getElementById("contact");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-4 py-2 bg-white/5 border border-white/5 hover:border-amber-500/25 hover:text-amber-400 text-white font-mono text-[10px] rounded-lg flex items-center justify-center gap-2 hover:bg-neutral-900 active:scale-[0.98] transition-all cursor-pointer self-start sm:self-center shrink-0 group"
        >
          <span>View all works</span>
          <ArrowRight size={11} className="text-neutral-500 group-hover:translate-x-1 group-hover:text-amber-400 transition-all duration-300" />
        </button>
      </motion.div>
    </section>
  );
}
