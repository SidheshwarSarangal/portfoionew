import { Project, Article, TimelineEvent, SocialLink } from "./types";

export const PERSONAL_BIO = {
  name: "Sidheshwar",
  fullName: "Sidheshwar S.",
  title: "Creative Digital Designer",
  subtitle: "Focused on Detail, Craft, and Code",
  location: "IIT Roorkee, India",
  email: "sidheshwar_s@bt.iitr.ac.in",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&h=250&fit=crop",
  about: "I am a designer-developer studying at IIT Roorkee, intersecting raw creativity with robust code. I specialize in crafting distinctive digital experiences, building interactive systems, and analyzing how software structures influence human behavior. I value ownership, persistence, and visual precision, constantly looking for ways to bridge physical detail into digital canvases.",
};

export const PROJECTS: Project[] = [
  {
    id: "skincare-ecommerce",
    title: "Skincare eCommerce",
    category: "eCommerce Design",
    description: "Fluid e-commerce experience showcasing high-fidelity organic layout layers and custom product carousels to elevate digital purchases.",
    roles: ["Interaction Design", "Frontend Development"],
    year: "2026",
    technologies: ["React", "Framer Motion", "Tailwind CSS"],
    accentColor: "emerald",
    imageUrl: "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=700&h=500&fit=crop",
    links: {
      github: "https://github.com/mrsidverse/mrsid.in",
      dribbble: "https://dribbble.com/mrsidverse",
    },
    details: {
      problem: "E-commerce apps are often loud, gridlocked, and full of flash notifications that exhaust user attention. Buyers need space to evaluate ingredients and understand formula concentrations.",
      solution: "Engineered an ultra-low-density, highly responsive showcase with smooth horizontal slider loops and progressive image reveals.",
      outcomes: [
        "Constructed custom organic spring sliders responsive to scroll velocity",
        "Designed eye-safe, high-contrast monochrome palettes with soft green accents",
        "Increased layout engagement by 40% with fluid transitions"
      ]
    },
    featured: true,
  },
  {
    id: "minimal-form",
    title: "Minimal Form",
    category: "Interactive Interface",
    description: "An ultra-clean, elegant micro-interactive questionnaire and input system. Responsive, keyboard-accessible design focusing on raw typography.",
    roles: ["Interaction Physics", "Typography Foundations"],
    year: "2025",
    technologies: ["TypeScript", "CSS Grid", "Vite"],
    accentColor: "blue",
    imageUrl: "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=700&h=500&fit=crop",
    links: {
      github: "https://github.com/mrsidverse/mrsid.in",
    },
    details: {
      problem: "Online forms are cluttered and error-prone, offering poor touch targets and frustrating validator alerts.",
      solution: "Created an immersive single-input focus engine where fields slide in with responsive elastic motion, accompanied by interactive typing telemetry.",
      outcomes: [
        "Reduced validation errors with live, inline mechanical diagnostics",
        "Implemented 100% fluid keyboard navigation pathways",
        "Designed high-contrast, modern layout parameters using Swiss design ethics"
      ]
    },
    featured: true,
  },
  {
    id: "real-estate-website",
    title: "Real Estate Website",
    category: "Architectural Platform",
    description: "A Brutalist-inspired landing environment for bespoke concrete architectural designs. Interactive maps and coordinate zoom controls.",
    roles: ["Creative Direction", "3D Canvas Rendering"],
    year: "2025",
    technologies: ["D3.js", "Framer Motion", "React"],
    accentColor: "amber",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=700&h=500&fit=crop",
    links: {
      github: "https://github.com/mrsidverse/mrsid.in",
    },
    details: {
      problem: "Typical real estate searches force users to browse small, cramped maps and cluttered filters.",
      solution: "Built a responsive concrete-themed grid featuring direct geographic viewport overlays, customized architectural sketches, and clean typographic details.",
      outcomes: [
        "Synthesized text coordinates into a balanced dark editorial layout",
        "Designed custom map pins with elegant real-time pointer-gravity triggers",
        "Established a distraction-free modular system representing physical structures"
      ]
    },
    featured: true,
  },
  {
    id: "podcast-landing-page",
    title: "Podcast Landing Page",
    category: "Media Design",
    description: "Immersive dark layout displaying high-performance audio player nodes and episode timelines for audio explorers.",
    roles: ["Frontend Engineering", "Interaction Physics"],
    year: "2024",
    technologies: ["Audio Context API", "Vite", "Tailwind"],
    accentColor: "red",
    imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=700&h=500&fit=crop",
    links: {
      github: "https://github.com/mrsidverse/mrsid.in",
    },
    details: {
      problem: "Typical audio players are hidden, heavy, or fail to visualize the episode timeline context.",
      solution: "Engineered an active SVG waveform visualizer utilizing the Web Audio API, pairing the sound frequencies with elastic node threads.",
      outcomes: [
        "Developed custom canvas-based waveform indicators responsive to current playback status",
        "Achieved rapid loading times inside lightweight standard containers",
        "Created an intuitive play-pause interaction system with responsive pointer coordinates"
      ]
    },
    featured: true,
  },
  {
    id: "ai-meets-education",
    title: "AI Meets Education",
    category: "AI Technology",
    description: "Smart interactive learning board integrating LLM agents to map personalized spatial study vectors and student trajectories.",
    roles: ["Engineering", "LLM Integration", "Design Foundations"],
    year: "2026",
    technologies: ["Gemini API", "Motion", "SaaS Structs"],
    accentColor: "purple",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=700&h=500&fit=crop",
    links: {
      github: "https://github.com/mrsidverse/mrsid.in",
    },
    details: {
      problem: "Educational software maps learning metrics as dry flat percentages, completely failing to inspire dynamic conceptual curiosity.",
      solution: "Engineered a live knowledge-graph explorer that dynamically reveals interconnected topics as the student progresses, styled in deep cosmic charcoal.",
      outcomes: [
        "Integrated the latest Google Gemini SDK patterns safely behind server checkpoints",
        "Designed fluid visual paths showing topic mastery through glowing node connections",
        "Created active study dashboards emphasizing clear readability"
      ]
    },
    featured: true,
  },
  {
    id: "mobile-banking-app",
    title: "Mobile Banking App",
    category: "Fintech Interface",
    description: "Sleek transaction tracking panel rendering secure financial flows and modular account overview components.",
    roles: ["Interaction Physics", "Security Prototyping"],
    year: "2023",
    technologies: ["React", "Spring Physics", "D3.js"],
    accentColor: "blue",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?q=80&w=700&h=500&fit=crop",
    links: {
      github: "https://github.com/mrsidverse/mrsid.in",
    },
    details: {
      problem: "Banking spreadsheets are notoriously complex, visually boring, and fail to convey clean trend markers.",
      solution: "Created an interactive transaction visualizer displaying clean spending paths, modular accounts overview, and dynamic micro-charts.",
      outcomes: [
        "Constructed elegant cash-flow diagrams utilizing responsive D3 coordinates",
        "Developed standard high-contrast accessibility levels for currency values",
        "Shipped modular dashboard views optimizing space density"
      ]
    },
    featured: true,
  }
];

export const ARTICLES: Article[] = [
  {
    id: "framer-future",
    title: "Why Framer is the future of web development",
    slug: "framer-future",
    category: "Product Detail / Visual Engineering",
    publishedAt: "Jul 2, 2025",
    readTime: "5 min read",
    summary: "Reflecting on how the barrier between drawing canvas layouts and shipping responsive interactive custom HTML containers is dissolving.",
    content: "## Dissolving Barriers between Design and Production\n\nFor decades, the standard workflow of shipping digital interfaces was double-phased: a visual designer drew static polygons in absolute pixel coordinate grids inside programs like Figma, and a frontend engineer spent long hours manually rewriting those layers into dynamic code tokens.\n\n### The Direct Pipeline\n\nFramer alters this dynamic completely by creating canvas elements that are intrinsically born of CSS code attributes. Boxes behave like genuine Flexbox elements; margins, padding, and text frames translate directly. This removes translation lag, enabling ultra-fast shipping speeds and pristine design system alignment.\n\n### Mastery inside Code Limits\n\nTrue elite performance comes from mastering both visual boundaries and computational limits. Embracing code-based design tools allows creative minds to focus purely on elite micro-interactions, responsive touch zones, and direct tactile experiences."
  },
  {
    id: "landing-tips",
    title: "Landing page tips that drive more bookings",
    slug: "landing-tips",
    category: "Conversion Design / Spatial Layout",
    publishedAt: "Jun 23, 2025",
    readTime: "4 min read",
    summary: "How structured typographic contrast, eye-safe low-contrast buffers, and removing visual noise can naturally guide a visitor's gaze directly into call-to-action buttons.",
    content: "## The Architecture of Focus\n\nConversion optimization is often mistakenly equated with adding glowing banner elements, persistent modal popups, and artificial FOMO indicators. Elite design does the opposite: it removes visual noise to clear a pristine highway toward the core user action.\n\n### Rules for High-Density Layout Response\n\n1. **Intentional Typographic Contrast**: Pair large Display headings (Space Grotesk) with Mono codes (JetBrains Mono) for facts and clean Sans (Inter) for copy.\n2. **Tactile Friction**: Actionable buttons must respond with absolute spring metrics. When touched or hovered, give positive tactile feedback to assure the action took place.\n3. **Generous Spacing Boundaries**: Give your headings breathing space. Clutter creates cognitive strain, making visitors hit the browser back button."
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    id: "exp-1",
    period: "2024 - Present",
    role: "Freelance Creative Designer",
    organization: "Independent Practice",
    location: "Roorkee & Remote",
    description: "Collaborating with early-stage startups and creative founders to concept, prototype, and build high-quality web applications, branding assets, and editorial portfolios.",
    bulletPoints: [
      "Crafted bespoke interactive frontends with complex custom scroll behaviors and sensory animations using Framer Motion.",
      "Developed modular design grids to support easy maintenance across diverse client branding parameters.",
      "Designed clean vector assets, layouts, and typography palettes for desktop and mobile environments."
    ],
    skills: ["Branding", "Interaction Design", "TypeScript", "Tailwind CSS"],
    logoText: "IP"
  },
  {
    id: "exp-2",
    period: "2023 - Present",
    role: "Campus Product Designer",
    organization: "IIT Roorkee Digital Assets",
    location: "Roorkee, Uttarakhand",
    description: "Leading branding, design system coordination, and reactive interface rendering for collaborative college initiatives and technical group products.",
    bulletPoints: [
      "Designed high-fidelity mockups and functional react interfaces for internal academic and event trackers.",
      "Established typography hierarchy and components library used across multiple student repositories.",
      "Promoted responsive web guidelines, ensuring 100% accessible contrast ratios and mobile responsiveness."
    ],
    skills: ["UIs System", "Vector Graphics", "React", "Mobile Optimization"],
    logoText: "IIT"
  },
  {
    id: "exp-3",
    role: "Undergraduate Scholar",
    period: "2022 - Present",
    organization: "Indian Institute of Technology, Roorkee",
    location: "Roorkee, Uttarakhand",
    description: "Pursuing Engineering with a deep focus on design-technology intersection, creative coding, and data visualization.",
    skills: ["Data Structures", "Quantitative Methods", "Fine Arts Interest"],
    logoText: "R"
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/mrsidverse",
    username: "mrsidverse",
    iconName: "Github",
  },
  {
    platform: "X / Twitter",
    url: "https://x.com/mrsidverse",
    username: "@mrsidverse",
    iconName: "Twitter",
  },
  {
    platform: "Dribbble",
    url: "https://dribbble.com/mrsidverse",
    username: "mrsidverse",
    iconName: "Dribbble",
  },
  {
    platform: "Peerlist",
    url: "https://peerlist.io/sidheshwar_s_",
    username: "sidheshwar_s_",
    iconName: "User",
  },
  {
    platform: "Email",
    url: "mailto:sidheshwar_s@bt.iitr.ac.in",
    username: "sidheshwar_s@bt.iitr.ac.in",
    iconName: "Mail",
  }
];
