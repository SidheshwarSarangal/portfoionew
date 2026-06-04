import { motion, AnimatePresence } from "motion/react";

interface RightSidebarProps {
  activeSection: string;
  onSymbolClick: (sectionId: string) => void;
}

export default function RightSidebar({ activeSection, onSymbolClick }: RightSidebarProps) {
  const symbols = [
    { label: "Work", id: "work" },
    { label: "About me", id: "about" },
    { label: "What I do", id: "chapter-what-i-do" },
    { label: "Tech stack", id: "chapter-tech-stack" },
    { label: "Practice Hist.", id: "chapter-history" },
    { label: "Client's word", id: "chapter-testimonials" },
    { label: "Awards", id: "chapter-awards" },
    { label: "Blog", id: "writings" },
    { label: "Contact me", id: "contact" }
  ];

  const getActiveIndex = () => {
    return symbols.findIndex((s) => s.id === activeSection);
  };

  const activeIndex = getActiveIndex();

  return (
    <aside
      id="right-indexes-sidebar"
      className="w-[200px] xl:w-[240px] h-screen fixed right-0 top-0 border-l border-white/5 pt-24 pb-8 px-5 bg-black/[0.1] hidden xl:flex flex-col justify-between z-20 select-none"
    >
      <div className="space-y-6 text-left">
        {/* Outline Title */}
        <div className="pl-2 select-none">
          <span className="font-mono text-[10px] uppercase text-neutral-500 tracking-widest font-semibold block">
            Index
          </span>
        </div>

        {/* Tree List Container */}
        <div className="relative mt-2 pl-1">
          {/* Active indicator bar/dot on the right or left of text */}
          <AnimatePresence>
            {activeIndex !== -1 && (
              <motion.div
                className="absolute left-[2px] w-[1.5px] bg-white rounded-full"
                animate={{
                  top: activeIndex * 28 + 6, // vertical offset matching line padding (h-7/28px)
                  height: 12,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 29 }}
              />
            )}
          </AnimatePresence>

          <ul className="space-y-0 text-left">
            {symbols.map((item) => {
              const isSelected = activeSection === item.id;
              return (
                <li key={item.id} className="relative group h-7 flex items-center">
                  <button
                    onClick={() => onSymbolClick(item.id)}
                    className="w-full text-left font-mono text-[11px] pl-4 pr-1 rounded hover:bg-white/[0.01] cursor-pointer transition-all duration-150 overflow-hidden text-ellipsis whitespace-nowrap block"
                  >
                    <span
                      className={`transition-colors duration-150 ${
                        isSelected 
                          ? "text-white font-semibold" 
                          : "text-neutral-500 group-hover:text-neutral-300"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Synchronized Terminal Status Block */}
      <div className="pt-4 select-none text-left">
        <div className="flex items-center gap-1.5 pl-2 justify-start">
          <div className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </div>
          <span className="font-mono text-[9px] text-[#4ade80] tracking-wider uppercase font-semibold">
            STATUS: SYNC OK
          </span>
        </div>
      </div>
    </aside>
  );
}
