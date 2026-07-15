import { motion, AnimatePresence } from "motion/react";

interface RightSidebarProps {
  activeSection: string;
  onSymbolClick: (sectionId: string) => void;
  variant?: "desktop" | "drawer";
}

interface SidebarSymbol {
  label: string;
  id: string;
  gapBefore?: number;
  level?: number;
  disabled?: boolean;
}

const SIDEBAR_SYMBOLS: SidebarSymbol[] = [
  { label: "Intro", id: "hero" },
  { label: "Selected work", id: "work", gapBefore: 14 },
  { label: "About", id: "about", gapBefore: 18 },
  { label: "Capabilities", id: "chapter-what-i-do", level: 1, disabled: true },
  { label: "Tech stack", id: "chapter-tech-stack", level: 1, disabled: true },
  { label: "Experience", id: "experience", gapBefore: 18 },
  { label: "Achievements", id: "chapter-awards", level: 1, disabled: true },
  { label: "Words matter", id: "chapter-testimonials", level: 1, disabled: true },
  { label: "Writing", id: "writings", gapBefore: 18 },
  { label: "Contact", id: "contact" },
];

const getItemHeight = (item: SidebarSymbol) => item.level ? 36 : 42;

export default function RightSidebar({ activeSection, onSymbolClick, variant = "desktop" }: RightSidebarProps) {

  const resolvedActiveSection = ["chapter-what-i-do", "chapter-tech-stack"].includes(activeSection)
    ? "about"
    : ["chapter-testimonials", "chapter-awards"].includes(activeSection)
      ? "experience"
      : activeSection;

  const activeIndex = SIDEBAR_SYMBOLS.findIndex((symbol) => symbol.id === resolvedActiveSection && !symbol.disabled);
  const activeTop = activeIndex === -1
    ? 0
    : SIDEBAR_SYMBOLS.slice(0, activeIndex).reduce((top, item) => top + getItemHeight(item) + (item.gapBefore ?? 0), 0)
      + (SIDEBAR_SYMBOLS[activeIndex].gapBefore ?? 0)
      + (getItemHeight(SIDEBAR_SYMBOLS[activeIndex]) - 16) / 2;

  return (
    <aside
      id={variant === "desktop" ? "right-indexes-sidebar" : "right-indexes-drawer"}
      className={`sidebar-readable-text border-l border-white/10 pt-28 pb-10 px-7 bg-[#08090c]/70 backdrop-blur-2xl backdrop-saturate-150 shadow-[-24px_0_70px_rgba(0,0,0,0.22)] flex-col select-none ${
        variant === "desktop"
          ? "w-[300px] h-screen fixed right-0 top-0 hidden 2xl:flex z-20"
          : "relative flex h-full w-full overflow-y-auto"
      }`}
    >
      <div className="space-y-7 text-left">
        {/* Outline Title */}
        <div className="pl-2 select-none space-y-2">
          <span className="font-sidebar text-lg uppercase text-[#fbbc04] tracking-[0.16em] font-semibold block">
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
            {SIDEBAR_SYMBOLS.map((item, index) => {
              const isSelected = !item.disabled && resolvedActiveSection === item.id;
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
                    type="button"
                    disabled={item.disabled}
                    onClick={() => onSymbolClick(item.id)}
                    className={`w-full text-left font-sidebar rounded-lg transition-all duration-150 overflow-hidden text-ellipsis whitespace-nowrap block ${
                      isNested ? "py-2 pl-9 pr-2 text-[15px]" : "py-2.5 pl-5 pr-2 text-base"
                    } ${
                      item.disabled
                        ? "cursor-default"
                        : "cursor-pointer hover:bg-white/5"
                    } ${
                      isSelected ? "bg-[#fbbc04]/10" : ""
                    }`}
                  >
                    <span
                      className={`mr-2 font-mono text-[11px] font-medium tabular-nums tracking-normal ${
                        isSelected ? "text-[#fbbc04]/90" : "text-neutral-500 group-hover:text-neutral-300"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`transition-colors duration-150 ${
                        isSelected 
                          ? "text-[#fbbc04] font-bold"
                          : "text-neutral-300 font-medium group-hover:text-white"
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
