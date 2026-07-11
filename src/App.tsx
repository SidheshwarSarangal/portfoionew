import React, { useState, useEffect } from "react";
import { Project, Article } from "./types";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProjectsGrid from "./components/ProjectsGrid";
import JourneyTimeline from "./components/JourneyTimeline";
import WritingList from "./components/WritingList";
import ContactSection from "./components/ContactSection";
import ProjectDetailModal from "./components/ProjectDetailModal";
import ArticleModal from "./components/ArticleModal";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import { usePortfolioContent } from "./content";
import { articlePath, homePath, projectPath, readContentRoute } from "./lib/routes";
import { trackEvent } from "./lib/analytics";
import { useSeoMetadata } from "./lib/seo";

export default function App() {
  const { projects, articles, personalBio, socialLinks } = usePortfolioContent();
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

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
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 56; // h-14 height of our new header tabs bar
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition - 5,
        behavior: "smooth"
      });
      setActiveSection(sectionId);
    }
  };

  // Intersection Observer to highlight active navigation header elements during scrolling
  useEffect(() => {
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
    const observers = sections.map((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        },
        { rootMargin: "-30% 0px -45% 0px" } // Medium mid-screen intersection triggering range
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          try {
            obs.observer.disconnect();
          } catch (e) {
            // ignore cleanup details
          }
        }
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#000000] font-sans antialiased text-[#e2e8f0] selection:bg-white selection:text-black overflow-x-clip">
      
      {/* Editorial Decorative Background Grid */}
      <div 
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff008_1px,transparent_1px),linear-gradient(to_bottom,#ffffff008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" 
        style={{ maskImage: "radial-gradient(ellipse at 50% 15%, black, transparent)" }}
      />

      {/* 1. TOP STICKY TAB WRITING HEADER BAR */}
      <Header activeSection={activeSection} onNavClick={handleScrollToSection} />

      {/* 2. THE MAIN SYNCED SIDEBARS */}
      <LeftSidebar onContactClick={() => handleScrollToSection("contact")} />
      <RightSidebar activeSection={activeSection} onSymbolClick={handleScrollToSection} />

      {/* 3. MIDDLE CHROME / PANES ENVELOPE */}
      <div className="lg:pl-[320px] xl:pl-[350px] xl:pr-[270px] min-h-screen flex flex-col justify-between pt-14 relative z-10">
        
        {/* Main Scrolling Section Panes */}
        <main className="relative flex-grow w-full pl-0 lg:pl-12">
          
          {/* EDITOR-STYLE DESTRUCTIVE COLUMN FOR LINE NUMBERS (Saves spacing on small viewports) */}
          <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-white/[0.03] bg-[#000000]/50 select-none hidden lg:flex flex-col items-end pt-12 pr-3 text-[9px] font-mono text-neutral-700/40 leading-[22px] z-0 overflow-hidden">
            {Array.from({ length: 700 }).map((_, i) => (
              <div key={i} className="h-[22px] tabular-nums font-light">
                {String(i + 1).padStart(3, '0')}
              </div>
            ))}
          </div>

          {/* SECTION 1: HERO VIEW */}
          <div className="relative z-10">
            <Hero onExploreClick={() => handleScrollToSection("work")} />
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
          
        </main>
      </div>

      {/* Interactive Detail modal for case studies */}
      <ProjectDetailModal 
        project={selectedProject} 
        onClose={closeDetail}
      />

      {/* Interactive reader overlay for cerebral text notes */}
      <ArticleModal 
        article={selectedArticle} 
        onClose={closeDetail}
      />

    </div>
  );
}
