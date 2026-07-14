import { lazy, Suspense, useState, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Project, Article } from "./types";
import Header from "./components/Header";
import type { PortfolioView } from "./components/Header";
import Hero from "./components/Hero";
import BioPage from "./components/BioPage";
import ProjectsGrid from "./components/ProjectsGrid";
import JourneyTimeline from "./components/JourneyTimeline";
import WritingList from "./components/WritingList";
import ContactSection from "./components/ContactSection";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import SocialPostsGrid from "./components/SocialPostsGrid";
import ViewDescriptionSidebar from "./components/ViewDescriptionSidebar";
import { usePortfolioContent } from "./content";
import { articlePath, homePath, projectPath, readContentRoute } from "./lib/routes";
import { trackEvent } from "./lib/analytics";
import { useSeoMetadata } from "./lib/seo";

const ProjectDetailModal = lazy(() => import("./components/ProjectDetailModal"));
const ArticleModal = lazy(() => import("./components/ArticleModal"));

const sectionRailAccents: Record<string, { primary: string; secondary: string }> = {
  hero: { primary: "#4285f4", secondary: "#7aa7ff" },
  work: { primary: "#fbbc04", secondary: "#f59e0b" },
  about: { primary: "#f59e0b", secondary: "#ea4335" },
  "chapter-what-i-do": { primary: "#34a853", secondary: "#22c55e" },
  "chapter-tech-stack": { primary: "#4285f4", secondary: "#22d3ee" },
  "chapter-history": { primary: "#ea4335", secondary: "#f59e0b" },
  "chapter-testimonials": { primary: "#a855f7", secondary: "#4285f4" },
  "chapter-awards": { primary: "#fbbc04", secondary: "#fb7185" },
  writings: { primary: "#34a853", secondary: "#22d3ee" },
  contact: { primary: "#4285f4", secondary: "#a855f7" },
};

export default function App() {
  const { projects, articles, personalBio, socialLinks } = usePortfolioContent();
  const [activeSection, setActiveSection] = useState("hero");
  const [activeView, setActiveView] = useState<PortfolioView>("info");
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const programmaticSectionRef = useRef<string | null>(null);
  const scrollSettleTimerRef = useRef<number | undefined>(undefined);
  const railAccent = sectionRailAccents[activeSection] ?? sectionRailAccents.hero;
  const railAccentStyle = {
    "--rail-primary": railAccent.primary,
    "--rail-secondary": railAccent.secondary,
  } as CSSProperties;

  const syncRoute = () => {
    const route = readContentRoute();
    setSelectedProject(route.type === "project" ? projects.find((project) => project.id === route.value) ?? null : null);
    setSelectedArticle(route.type === "article" ? articles.find((article) => article.slug === route.value) ?? null : null);
  };

  const openProject = (project: Project) => {
    window.history.pushState({}, "", projectPath(project.id));
    setSelectedArticle(null);
    setSelectedProject(project);
    trackEvent("project_open", { project_id: project.id, project_title: project.title });
  };

  const openArticle = (article: Article) => {
    window.history.pushState({}, "", articlePath(article.slug));
    setSelectedProject(null);
    setSelectedArticle(article);
    trackEvent("article_open", { article_id: article.id, article_title: article.title });
  };

  const closeDetail = () => {
    window.history.pushState({}, "", homePath());
    setSelectedProject(null);
    setSelectedArticle(null);
  };

  useSeoMetadata({ personalBio, socialLinks, project: selectedProject, article: selectedArticle });

  useEffect(() => {
    syncRoute();
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, [projects, articles]);

  // Smooth scroll handler targeting offsets
  const handleScrollToSection = (sectionId: string) => {
    setActiveView("info");
    requestAnimationFrame(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        programmaticSectionRef.current = sectionId;
        window.clearTimeout(scrollSettleTimerRef.current);
        scrollSettleTimerRef.current = window.setTimeout(() => {
          programmaticSectionRef.current = null;
        }, 1200);

        const headerOffset = 64;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition - 5,
          behavior: "smooth"
        });
        setActiveSection(sectionId);
      }
    });
  };

  const handleViewChange = (view: PortfolioView) => {
    setRightDrawerOpen(false);
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDrawerSectionClick = (sectionId: string) => {
    setRightDrawerOpen(false);
    handleScrollToSection(sectionId);
  };

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
    const previousOverflow = document.body.style.overflow;
    const closeOnDesktop = () => {
      if (desktopSidebar.matches) setRightDrawerOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setRightDrawerOpen(false);
    };

    document.body.style.overflow = "hidden";
    desktopSidebar.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      desktopSidebar.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [rightDrawerOpen]);

  // Keep the right-side index aligned to the section nearest the viewport reading line.
  useEffect(() => {
    if (activeView !== "info") return;

    const sections = [
      "hero", 
      "work", 
      "about", 
      "chapter-what-i-do", 
      "chapter-tech-stack", 
      "chapter-history", 
      "chapter-testimonials", 
      "chapter-awards", 
      "writings", 
      "contact"
    ];

    let frameId = 0;
    const updateActiveSection = () => {
      const readingLine = window.innerHeight * 0.36;
      const sectionPositions = sections.reduce<Array<{
        id: string;
        top: number;
        bottom: number;
        distance: number;
        containsReadingLine: boolean;
      }>>((positions, sectionId) => {
          const element = document.getElementById(sectionId);
          if (!element) return positions;
          const rect = element.getBoundingClientRect();
          positions.push({
            id: sectionId,
            top: rect.top,
            bottom: rect.bottom,
            distance: Math.abs(rect.top - readingLine),
            containsReadingLine: rect.top <= readingLine && rect.bottom >= readingLine,
          });
          return positions;
        }, []);

      const containingSection = sectionPositions
        .filter((section) => section.containsReadingLine)
        .sort((a, b) => Math.abs(a.top - readingLine) - Math.abs(b.top - readingLine))[0];

      const nearestSection = [...sectionPositions]
        .filter((section) => section.bottom > 64 && section.top < window.innerHeight)
        .sort((a, b) => a.distance - b.distance)[0];

      const nextSection = containingSection ?? nearestSection;
      if (nextSection) setActiveSection((current) => current === nextSection.id ? current : nextSection.id);
    };

    const requestUpdate = () => {
      if (programmaticSectionRef.current) {
        window.clearTimeout(scrollSettleTimerRef.current);
        scrollSettleTimerRef.current = window.setTimeout(() => {
          programmaticSectionRef.current = null;
        }, 220);
        return;
      }

      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(scrollSettleTimerRef.current);
      programmaticSectionRef.current = null;
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [activeView]);

  return (
    <div className="relative min-h-screen bg-[#000000] font-sans antialiased text-[#e2e8f0] selection:bg-white selection:text-black overflow-x-clip">
      
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
          <motion.div
            className="fixed inset-0 z-50 2xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close right sidebar"
              className="absolute inset-0 h-full w-full cursor-default bg-black/55 backdrop-blur-[2px]"
              onClick={() => setRightDrawerOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={activeView === "info" ? "Page index" : `${activeView} information`}
              className="absolute bottom-0 right-0 top-0 w-[min(88vw,340px)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 34 }}
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. MIDDLE CHROME / PANES ENVELOPE */}
      <div className="app-shell-1200 xl:pl-[420px] 2xl:pr-[300px] min-h-screen flex flex-col justify-between pt-16 relative z-10">
        
        {/* Main Scrolling Section Panes */}
        <main className="relative flex-grow w-full px-0 lg:pl-16 lg:pr-12">
          <div className="center-pane-gradient pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
          
          {/* Editor-style line numbers */}
          <div
            className="section-accent-number-strip absolute left-0 top-0 bottom-0 w-14 border-r border-white/[0.04] bg-[#000000]/55 select-none hidden lg:flex flex-col items-end pt-12 pr-4 text-[10px] font-mono text-neutral-300/55 leading-[23px] z-0 overflow-hidden"
            style={railAccentStyle}
          >
            <div className="section-height-gradient-rail absolute inset-y-0 left-0 w-[4px]" aria-hidden="true" />
            <div className="section-height-gradient-wash absolute inset-y-0 left-0 right-0" aria-hidden="true" />
            {Array.from({ length: 700 }).map((_, i) => (
              <div key={i} className="relative z-10 h-[23px] tabular-nums font-light">
                {String(i + 1).padStart(3, '0')}
              </div>
            ))}
          </div>

          {activeView === "info" ? <>
          {/* SECTION 1: HERO VIEW */}
          <div className="relative z-10">
            <Hero />
          </div>

          {/* SECTION 2: PROJECT CATALOG */}
          <div className="relative z-10">
            <ProjectsGrid onProjectClick={openProject} />
          </div>

          {/* SECTION 3: PRACTICE CHRONOLOGY / TIMELINE */}
          <div className="relative z-10">
            <JourneyTimeline />
          </div>

          {/* SECTION 4: DESTRUCTION-FREE ESSAYS / WRITINGS */}
          <div className="relative z-10">
            <WritingList onArticleClick={openArticle} />
          </div>

          {/* SECTION 5: CONTACT SUMMARY FOOTERS */}
          <div className="relative z-10">
            <ContactSection />
          </div>
          </> : activeView === "bio" ? (
            <div className="relative z-10 py-8 sm:py-10">
              <BioPage />
            </div>
          ) : activeView === "projects" ? (
            <div className="relative z-10 py-8 sm:py-10">
              <ProjectsGrid onProjectClick={openProject} />
            </div>
          ) : (
            <div className="relative z-10 py-8 sm:py-10">
              <SocialPostsGrid />
            </div>
          )}
          
        </main>
      </div>

      {/* Interactive Detail modal for case studies */}
      <Suspense fallback={null}>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={closeDetail}
          />
        )}

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
