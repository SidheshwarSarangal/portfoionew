import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, UIEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Project, Article } from "./types";
import Header from "./components/Header";
import type { PortfolioView } from "./components/Header";
import Hero from "./components/Hero";
import BioPage from "./components/BioPage";
import ProjectsGrid from "./components/ProjectsGrid";
import JourneyTimeline from "./components/JourneyTimeline";
import WritingList from "./components/WritingList";
import SocialPostsGrid from "./components/SocialPostsGrid";
import ContactSection from "./components/ContactSection";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import ViewDescriptionSidebar from "./components/ViewDescriptionSidebar";
import ScrollScene from "./components/ScrollScene";
import SectionTransition from "./components/SectionTransition";
import { usePortfolioContent } from "./content";
import { articlePath, homePath, projectPath, readContentRoute } from "./lib/routes";
import { trackEvent } from "./lib/analytics";
import { useSeoMetadata } from "./lib/seo";

const ProjectDetailModal = lazy(() => import("./components/ProjectDetailModal"));
const ArticleModal = lazy(() => import("./components/ArticleModal"));
const INFO_SECTION_IDS = ["hero", "work", "about", "experience", "writings", "contact"] as const;
const sectionRailAccents: Record<string, { primary: string; secondary: string }> = {
  hero: { primary: "#4285f4", secondary: "#7aa7ff" },
  work: { primary: "#fbbc04", secondary: "#f59e0b" },
  about: { primary: "#f59e0b", secondary: "#ea4335" },
  "chapter-what-i-do": { primary: "#34a853", secondary: "#22c55e" },
  "chapter-tech-stack": { primary: "#4285f4", secondary: "#22d3ee" },
  experience: { primary: "#ea4335", secondary: "#f59e0b" },
  "chapter-history": { primary: "#ea4335", secondary: "#f59e0b" },
  "chapter-testimonials": { primary: "#a855f7", secondary: "#4285f4" },
  "chapter-awards": { primary: "#fbbc04", secondary: "#fb7185" },
  writings: { primary: "#34a853", secondary: "#22d3ee" },
  contact: { primary: "#4285f4", secondary: "#a855f7" },
};

export default function App() {
  const { projects, articles, personalBio, socialLinks } = usePortfolioContent();
  const reduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState("hero");
  const [activeView, setActiveView] = useState<PortfolioView>("info");
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [isDirectSectionChange, setIsDirectSectionChange] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const infoSlideScrollerRef = useRef<HTMLDivElement>(null);
  const activeSectionTimerRef = useRef<number | null>(null);
  const keyboardScrollFrameRef = useRef<number | null>(null);
  const keyboardScrollTargetRef = useRef<number | null>(null);
  const keyboardScrollDirectionRef = useRef(0);
  const scrollIdleTimerRef = useRef<number | null>(null);
  const sectionJumpTimerRef = useRef<number | null>(null);
  const sectionRevealTimerRef = useRef<number | null>(null);
  const sectionRevealFrameRef = useRef<number | null>(null);
  const directSectionChangeRef = useRef(false);
  const viewAccentSection = activeView === "projects"
    ? "work"
    : activeView === "social"
      ? "writings"
      : activeView === "bio"
        ? "hero"
        : activeSection;
  const railAccent = sectionRailAccents[viewAccentSection] ?? sectionRailAccents.hero;
  const railAccentStyle = useMemo(() => ({
    "--rail-primary": railAccent.primary,
    "--rail-secondary": railAccent.secondary,
  } as CSSProperties), [railAccent.primary, railAccent.secondary]);

  const syncRoute = useCallback(() => {
    const route = readContentRoute();
    setSelectedProject(route.type === "project" ? projects.find((project) => project.id === route.value) ?? null : null);
    setSelectedArticle(route.type === "article" ? articles.find((article) => article.slug === route.value) ?? null : null);
  }, [articles, projects]);

  const openProject = useCallback((project: Project) => {
    window.history.pushState({}, "", projectPath(project.id));
    setSelectedArticle(null);
    setSelectedProject(project);
    trackEvent("project_open", { project_id: project.id, project_title: project.title });
  }, []);

  const openArticle = useCallback((article: Article) => {
    window.history.pushState({}, "", articlePath(article.slug));
    setSelectedProject(null);
    setSelectedArticle(article);
    trackEvent("article_open", { article_id: article.id, article_title: article.title });
  }, []);

  const closeDetail = useCallback(() => {
    window.history.pushState({}, "", homePath());
    setSelectedProject(null);
    setSelectedArticle(null);
  }, []);

  useSeoMetadata({ personalBio, socialLinks, project: selectedProject, article: selectedArticle });

  useEffect(() => {
    syncRoute();
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, [syncRoute]);

  const handleScrollToSection = useCallback((sectionId: string) => {
    if (sectionJumpTimerRef.current !== null) window.clearTimeout(sectionJumpTimerRef.current);
    if (sectionRevealTimerRef.current !== null) window.clearTimeout(sectionRevealTimerRef.current);
    if (sectionRevealFrameRef.current !== null) window.cancelAnimationFrame(sectionRevealFrameRef.current);

    directSectionChangeRef.current = true;
    setActiveView("info");
    setActiveSection(sectionId);
    setIsDirectSectionChange(true);

    sectionJumpTimerRef.current = window.setTimeout(() => {
      sectionJumpTimerRef.current = null;
      const scroller = infoSlideScrollerRef.current;
      const target = document.getElementById(sectionId);
      if (!scroller || !target) {
        directSectionChangeRef.current = false;
        setIsDirectSectionChange(false);
        return;
      }
      const top = scroller.scrollTop + target.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
      scroller.scrollTo({ top, behavior: "auto" });

      sectionRevealFrameRef.current = window.requestAnimationFrame(() => {
        sectionRevealFrameRef.current = null;
        setIsDirectSectionChange(false);
        sectionRevealTimerRef.current = window.setTimeout(() => {
          directSectionChangeRef.current = false;
          sectionRevealTimerRef.current = null;
        }, 420);
      });
    }, 190);
  }, []);

  const handleViewChange = useCallback((view: PortfolioView) => {
    setRightDrawerOpen(false);
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const handleDrawerSectionClick = useCallback((sectionId: string) => {
    setRightDrawerOpen(false);
    handleScrollToSection(sectionId);
  }, [handleScrollToSection]);

  const handleInfoSlideScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    if (!directSectionChangeRef.current) {
      document.documentElement.classList.add("portfolio-is-scrolling");
      if (scrollIdleTimerRef.current !== null) {
        window.clearTimeout(scrollIdleTimerRef.current);
      }
      scrollIdleTimerRef.current = window.setTimeout(() => {
        document.documentElement.classList.remove("portfolio-is-scrolling");
        scrollIdleTimerRef.current = null;
      }, 320);
    }

    const scroller = event.currentTarget;
    if (directSectionChangeRef.current || activeSectionTimerRef.current !== null) return;
    activeSectionTimerRef.current = window.setTimeout(() => {
      activeSectionTimerRef.current = null;
      if (directSectionChangeRef.current) return;

      const scrollerRect = scroller.getBoundingClientRect();
      const readingLine = scrollerRect.top + scrollerRect.height * 0.36;
      const visibleSection = INFO_SECTION_IDS
        .map((id) => ({ id, element: document.getElementById(id) }))
        .filter((item): item is { id: (typeof INFO_SECTION_IDS)[number]; element: HTMLElement } => Boolean(item.element))
        .find(({ element }) => {
          const rect = element.getBoundingClientRect();
          return rect.top <= readingLine && rect.bottom >= readingLine;
        });

      if (visibleSection) {
        setActiveSection((current) => current === visibleSection.id ? current : visibleSection.id);
      }
    }, 96);
  }, []);

  const showProjectsView = useCallback(() => handleViewChange("projects"), [handleViewChange]);
  const showSocialView = useCallback(() => handleViewChange("social"), [handleViewChange]);

  useEffect(() => () => {
    if (activeSectionTimerRef.current !== null) {
      window.clearTimeout(activeSectionTimerRef.current);
    }
    if (scrollIdleTimerRef.current !== null) {
      window.clearTimeout(scrollIdleTimerRef.current);
    }
    if (sectionJumpTimerRef.current !== null) {
      window.clearTimeout(sectionJumpTimerRef.current);
    }
    if (sectionRevealTimerRef.current !== null) {
      window.clearTimeout(sectionRevealTimerRef.current);
    }
    if (sectionRevealFrameRef.current !== null) {
      window.cancelAnimationFrame(sectionRevealFrameRef.current);
    }
    document.documentElement.classList.remove("portfolio-is-scrolling");
  }, []);

  useEffect(() => {
    if (activeView !== "info" || selectedProject || selectedArticle) return;

    const stopKeyboardScroll = () => {
      if (keyboardScrollFrameRef.current !== null) {
        window.cancelAnimationFrame(keyboardScrollFrameRef.current);
        keyboardScrollFrameRef.current = null;
      }
      keyboardScrollTargetRef.current = null;
      keyboardScrollDirectionRef.current = 0;
    };

    const animateKeyboardScroll = () => {
      const scroller = infoSlideScrollerRef.current;
      const target = keyboardScrollTargetRef.current;
      if (!scroller || target === null) {
        stopKeyboardScroll();
        return;
      }

      const distance = target - scroller.scrollTop;
      if (Math.abs(distance) < 0.75) {
        scroller.scrollTop = target;
        stopKeyboardScroll();
        return;
      }

      const step = Math.sign(distance) * Math.min(Math.abs(distance) * 0.24, 48);
      scroller.scrollTop += step;
      keyboardScrollFrameRef.current = window.requestAnimationFrame(animateKeyboardScroll);
    };

    const handleArrowScroll = (event: KeyboardEvent) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

      const target = event.target;
      if (target instanceof HTMLElement && (
        target.isContentEditable
        || target.tagName === "INPUT"
        || target.tagName === "TEXTAREA"
        || target.tagName === "SELECT"
      )) return;

      const scroller = infoSlideScrollerRef.current;
      if (!scroller) return;

      const direction = event.key === "ArrowDown" ? 1 : -1;
      const canScroll = direction > 0
        ? scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight - 1
        : scroller.scrollTop > 0;
      if (!canScroll) return;

      event.preventDefault();
      if (reduceMotion) {
        scroller.scrollBy({ top: direction * 88, behavior: "auto" });
        return;
      }

      const maxScrollTop = scroller.scrollHeight - scroller.clientHeight;
      const currentTarget = keyboardScrollDirectionRef.current === direction
        ? keyboardScrollTargetRef.current ?? scroller.scrollTop
        : scroller.scrollTop;
      keyboardScrollDirectionRef.current = direction;
      keyboardScrollTargetRef.current = Math.max(0, Math.min(maxScrollTop, currentTarget + direction * 88));

      if (keyboardScrollFrameRef.current === null) {
        keyboardScrollFrameRef.current = window.requestAnimationFrame(animateKeyboardScroll);
      }
    };

    const scroller = infoSlideScrollerRef.current;
    window.addEventListener("keydown", handleArrowScroll);
    scroller?.addEventListener("wheel", stopKeyboardScroll, { passive: true });
    scroller?.addEventListener("touchstart", stopKeyboardScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", handleArrowScroll);
      scroller?.removeEventListener("wheel", stopKeyboardScroll);
      scroller?.removeEventListener("touchstart", stopKeyboardScroll);
      stopKeyboardScroll();
    };
  }, [activeView, reduceMotion, selectedArticle, selectedProject]);

  // Bio is a compact-layout tab. Once that tab is hidden, keep Info in the center pane.
  useEffect(() => {
    const desktopLayout = window.matchMedia("(min-width: 1200px)");
    const defaultToInfo = () => {
      if (desktopLayout.matches) {
        setActiveView((currentView) => currentView === "bio" ? "info" : currentView);
      }
    };

    defaultToInfo();
    desktopLayout.addEventListener("change", defaultToInfo);
    return () => desktopLayout.removeEventListener("change", defaultToInfo);
  }, []);

  useEffect(() => {
    if (!rightDrawerOpen) return;

    const desktopSidebar = window.matchMedia("(min-width: 1536px)");
    const closeOnDesktop = () => {
      if (desktopSidebar.matches) setRightDrawerOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setRightDrawerOpen(false);
    };

    desktopSidebar.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      desktopSidebar.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [rightDrawerOpen]);

  return (
    <div
      className="relative min-h-screen bg-[#000000] font-sans antialiased text-[#e2e8f0] selection:bg-white selection:text-black overflow-x-clip"
      style={railAccentStyle}
    >
      
      {/* Editorial Decorative Background Grid */}
      <div 
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff008_1px,transparent_1px),linear-gradient(to_bottom,#ffffff008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" 
        style={{ maskImage: "radial-gradient(ellipse at 50% 15%, black, transparent)" }}
      />

      {/* 1. TOP STICKY TAB WRITING HEADER BAR */}
      <Header
        activeView={activeView}
        onViewChange={handleViewChange}
        isSidebarOpen={rightDrawerOpen}
        onSidebarToggle={() => setRightDrawerOpen((open) => !open)}
      />

      {/* 2. THE MAIN SYNCED SIDEBARS */}
      <LeftSidebar primaryAccent={railAccent.primary} secondaryAccent={railAccent.secondary} />
      {activeView === "info" ? (
        <RightSidebar activeSection={activeSection} onSymbolClick={handleScrollToSection} />
      ) : activeView === "projects" || activeView === "social" ? (
        <ViewDescriptionSidebar view={activeView} />
      ) : null}

      <AnimatePresence>
        {rightDrawerOpen && activeView !== "bio" && (
          <motion.button
            key="right-drawer-backdrop"
            type="button"
            aria-label="Close right sidebar"
            className="fixed inset-0 z-50 h-full w-full cursor-default bg-black/55 2xl:hidden"
            onClick={() => setRightDrawerOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          />
        )}
        {rightDrawerOpen && activeView !== "bio" && (
          <motion.div
            key="right-drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label={activeView === "info" ? "Page index" : `${activeView} information`}
            className="fixed bottom-0 right-0 top-0 z-[55] w-[min(88vw,340px)] transform-gpu will-change-transform 2xl:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeView === "info" ? (
              <RightSidebar
                activeSection={activeSection}
                onSymbolClick={handleDrawerSectionClick}
                variant="drawer"
              />
            ) : (
              <ViewDescriptionSidebar view={activeView} variant="drawer" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. MIDDLE CHROME / PANES ENVELOPE */}
      <div className={`app-shell-1200 xl:pl-[420px] 2xl:pr-[300px] flex flex-col justify-between pt-16 relative z-10 ${activeView === "info" ? "h-[100dvh] overflow-hidden" : "min-h-[100dvh]"}`}>
        
        {/* Main Scrolling Section Panes */}
        <main className={`relative flex-grow w-full px-0 ${activeView === "info" ? "overflow-hidden" : ""}`}>
          <div className="center-pane-gradient pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

          <AnimatePresence mode="wait">
            {activeView === "info" ? (
              <motion.div
                key="info-view"
                ref={infoSlideScrollerRef}
                className={`section-slide-scroller absolute inset-0 z-10 overflow-y-auto overscroll-y-contain ${isDirectSectionChange ? "pointer-events-none" : ""}`}
                onScroll={handleInfoSlideScroll}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: isDirectSectionChange ? 0 : 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : isDirectSectionChange ? 0.19 : 0.32,
                  ease: isDirectSectionChange ? "easeOut" : [0.22, 1, 0.36, 1],
                }}
              >
                <ScrollScene containerRef={infoSlideScrollerRef}>
                  <Hero />
                </ScrollScene>
                <SectionTransition from="Intro" to="Projects" containerRef={infoSlideScrollerRef} />
                <ScrollScene containerRef={infoSlideScrollerRef}>
                  <ProjectsGrid onProjectClick={openProject} onViewAll={showProjectsView} />
                </ScrollScene>
                <SectionTransition from="Projects" to="About" containerRef={infoSlideScrollerRef} />
                <ScrollScene containerRef={infoSlideScrollerRef}>
                  <JourneyTimeline section="about" containerRef={infoSlideScrollerRef} />
                </ScrollScene>
                <SectionTransition from="About" to="Experience" containerRef={infoSlideScrollerRef} />
                <ScrollScene containerRef={infoSlideScrollerRef}>
                  <JourneyTimeline section="experience" />
                </ScrollScene>
                <SectionTransition from="Experience" to="Writing" containerRef={infoSlideScrollerRef} />
                <ScrollScene containerRef={infoSlideScrollerRef}>
                  <WritingList onArticleClick={openArticle} onViewAll={showSocialView} />
                </ScrollScene>
                <SectionTransition from="Writing" to="Contact" containerRef={infoSlideScrollerRef} />
                <ScrollScene containerRef={infoSlideScrollerRef}>
                  <ContactSection />
                </ScrollScene>
              </motion.div>
            ) : activeView === "bio" ? (
              <motion.div
                key="bio-view"
                className="relative z-10 py-8 sm:py-10"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <BioPage />
              </motion.div>
            ) : activeView === "projects" ? (
              <motion.div
                key="projects-view"
                className="relative z-10"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectsGrid onProjectClick={openProject} />
              </motion.div>
            ) : (
              <motion.div
                key="social-view"
                className="relative z-10"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <SocialPostsGrid />
              </motion.div>
            )}
          </AnimatePresence>
          
        </main>
      </div>

      {/* Interactive Detail modal for case studies */}
      <Suspense fallback={null}>
        <AnimatePresence mode="wait">
          {selectedProject && (
            <ProjectDetailModal
              key={selectedProject.id}
              project={selectedProject}
              onClose={closeDetail}
            />
          )}
        </AnimatePresence>

      {/* Interactive reader overlay for cerebral text notes */}
        {selectedArticle && (
          <ArticleModal
            article={selectedArticle}
            onClose={closeDetail}
          />
        )}
      </Suspense>

    </div>
  );
}
