import type { Project } from "../types";

const accentStyles: Record<string, { glow: string; chip: string; line: string }> = {
  amber: { glow: "from-amber-400/25 via-orange-400/10", chip: "border-amber-300/25 bg-amber-300/10 text-amber-100", line: "bg-amber-300" },
  blue: { glow: "from-blue-400/25 via-cyan-400/10", chip: "border-blue-300/25 bg-blue-300/10 text-blue-100", line: "bg-blue-300" },
  cyan: { glow: "from-cyan-400/25 via-sky-400/10", chip: "border-cyan-300/25 bg-cyan-300/10 text-cyan-100", line: "bg-cyan-300" },
  emerald: { glow: "from-emerald-400/25 via-teal-400/10", chip: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100", line: "bg-emerald-300" },
  purple: { glow: "from-violet-400/25 via-fuchsia-400/10", chip: "border-violet-300/25 bg-violet-300/10 text-violet-100", line: "bg-violet-300" },
  red: { glow: "from-rose-400/25 via-orange-400/10", chip: "border-rose-300/25 bg-rose-300/10 text-rose-100", line: "bg-rose-300" },
};

export default function TechnologyArtwork({ project, compact = false }: { project: Project; compact?: boolean }) {
  const accent = accentStyles[project.accentColor] ?? accentStyles.amber;
  const technologies = project.technologies.slice(0, compact ? 5 : 8);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#07090d] p-5 sm:p-7" aria-label={`${project.title} technology stack`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${accent.glow} to-transparent`} />
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/[0.07]" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative flex h-full flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55 sm:text-xs">
            <span className={`h-2 w-2 rounded-full ${accent.line} shadow-[0_0_16px_currentColor]`} />
            Technology stack
          </div>
          <p className={`mt-4 max-w-[85%] font-display font-semibold leading-[1.03] tracking-tight text-white ${compact ? "text-2xl" : "text-3xl sm:text-4xl"}`}>
            {project.title}
          </p>
        </div>

        <div className="flex flex-wrap content-end gap-2">
          {technologies.map((technology, index) => (
            <span
              key={technology}
              className={`rounded-full border px-3 py-1.5 font-mono text-[10px] shadow-sm backdrop-blur-sm sm:text-xs ${accent.chip}`}
              style={{ transform: `translateY(${(index % 3) * -2}px)` }}
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
