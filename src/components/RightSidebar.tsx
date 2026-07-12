import { motion, AnimatePresence } from "motion/react";

interface RightSidebarProps {
  activeSection: string;
  onSymbolClick: (sectionId: string) => void;
}

export default function RightSidebar({ activeSection, onSymbolClick }: RightSidebarProps) {
  const symbols = [
    { label: "Intro", id: "hero" },
    { label: "Selected work", id: "work", gapBefore: 14 },
    { label: "About", id: "about", gapBefore: 18 },
    { label: "Capabilities", id: "chapter-what-i-do", level: 1 },
    { label: "Tech stack", id: "chapter-tech-stack", level: 1 },
    { label: "Experience", id: "chapter-history", gapBefore: 18 },
    { label: "Testimonials", id: "chapter-testimonials", level: 1 },
    { label: "Recognition", id: "chapter-awards", level: 1 },
    { label: "Writing", id: "writings", gapBefore: 18 },
    { label: "Contact", id: "contact" }
  ];

  const getActiveIndex = () => {
    return symbols.findIndex((s) => s.id === activeSection);
  };

  const activeIndex = getActiveIndex();
  const getItemHeight = (item: typeof symbols[number]) => item.level ? 30 : 36;
  const activeTop = activeIndex === -1
    ? 0
    : symbols.slice(0, activeIndex).reduce((top, item) => top + getItemHeight(item) + (item.gapBefore ?? 0), 0)
      + (symbols[activeIndex].gapBefore ?? 0)
      + (getItemHeight(symbols[activeIndex]) - 16) / 2;

  return (
    <aside
      id="right-indexes-sidebar"
      className="w-[300px] h-screen fixed right-0 top-0 border-l border-white/10 pt-28 pb-10 px-8 bg-neutral-900/80 hidden 2xl:flex flex-col z-20 select-none"
    >
      <div className="space-y-7 text-left">
        {/* Outline Title */}
        <div className="pl-2 select-none space-y-2">
          <span className="font-mono text-xs uppercase text-[#fbbc04] tracking-widest font-semibold block">
            Index
          </span>
          <span className="block h-px w-16 bg-gradient-to-r from-[#fbbc04]/70 to-transparent" />
        </div>

        {/* Tree List Container */}
        <div className="relative mt-2 pl-1">
          <div className="absolute left-[2px] top-0 bottom-0 w-px bg-white/10" aria-hidden="true" />

          {/* Active indicator bar/dot on the right or left of text */}
          <AnimatePresence>
            {activeIndex !== -1 && (
              <motion.div
                className="absolute left-[2px] w-[2px] bg-[#fbbc04] rounded-full"
                animate={{
                  top: activeTop,
                  height: 16,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 29 }}
              />
            )}
          </AnimatePresence>

          <ul className="text-left">
            {symbols.map((item, index) => {
              const isSelected = activeSection === item.id;
              const itemHeight = getItemHeight(item);
              const isNested = Boolean(item.level);
              return (
                <li
                  key={item.id}
                  className="relative group flex flex-col justify-end"
                  style={{
                    height: itemHeight + (item.gapBefore ?? 0),
                    paddingTop: item.gapBefore ?? 0,
                  }}
                >
                  <button
                    onClick={() => onSymbolClick(item.id)}
                    className={`w-full text-left font-mono rounded-lg cursor-pointer transition-all duration-150 overflow-hidden text-ellipsis whitespace-nowrap block ${
                      isNested ? "py-1.5 pl-9 pr-2 text-[12px]" : "py-2 pl-5 pr-2 text-[13px]"
                    } ${
                      isSelected ? "bg-[#fbbc04]/10" : "hover:bg-white/5"
                    }`}
                  >
                    <span
                      className={`mr-2 text-[10px] tabular-nums ${
                        isSelected ? "text-[#fbbc04]/80" : "text-neutral-600 group-hover:text-neutral-400"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`transition-colors duration-150 ${
                        isSelected 
                          ? "text-[#fbbc04] font-semibold"
                          : "text-neutral-400 group-hover:text-white"
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
    </aside>
  );
}
