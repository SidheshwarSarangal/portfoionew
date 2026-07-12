import { Project, Article, TimelineEvent, SocialLink, SocialPost } from "./types";

export const PERSONAL_BIO = {
  name: "Sidheshwar",
  fullName: "Sidheshwar Sarangal",
  title: "Software Engineer",
  subtitle: "Focused on Full-Stack Systems, APIs, and Product Code",
  location: "IIT Roorkee, India",
  email: "sidheshwar.sarangal22@gmail.com",
  phone: "",
  resumeUrl: "",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&h=250&fit=crop",
  about: "I am an entry-level software engineer from IIT Roorkee with strong foundations in DSA and hands-on experience across Spring Boot, Python, MERN, REST APIs, Docker, and Kubernetes. I build full-stack products, backend workflows, and practical systems that connect clean interfaces with reliable application logic.",
};

export const PROJECTS: Project[] = [
  {
    id: "blog-article-search",
    title: "Search Engine for Blogs and Articles",
    category: "Search / AI Filtering",
    description: "A Python-powered search pipeline that crawls web content, filters relevant links with Gemma 3:1b, stores data in MongoDB, and indexes it for fast retrieval.",
    roles: ["Backend Engineering", "Frontend Development"],
    year: "2026",
    technologies: ["Python", "Scrapy", "FastAPI", "React", "MongoDB", "OpenSearch"],
    accentColor: "emerald",
    imageUrl: "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=700&h=500&fit=crop",
    links: {
      github: "https://github.com/mrsidverse/mrsid.in",
      dribbble: "https://dribbble.com/mrsidverse",
    },
    details: {
      problem: "Students and readers need quick access to relevant technical blogs and articles without manually filtering large volumes of noisy web results.",
      solution: "Built a crawler and indexing flow using Scrapy, AI filtering, MongoDB, BonsaiSearch, and a React/FastAPI interface for real-time search queries.",
      outcomes: [
        "Executed web crawling with Scrapy and filtered links using Gemma 3:1b",
        "Indexed MongoDB data to BonsaiSearch with the OpenSearch Python client",
        "Developed a React frontend with FastAPI backend for live search results"
      ]
    },
    featured: true,
  },
  {
    id: "department-library-app",
    title: "Department Library App",
    category: "MERN Web App",
    description: "A responsive library management app for the Biosciences and Bioengineering Department at IIT Roorkee, supporting student and librarian workflows.",
    roles: ["Full-Stack Development", "Product Engineering"],
    year: "2025",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    accentColor: "blue",
    imageUrl: "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=700&h=500&fit=crop",
    links: {
      github: "https://github.com/mrsidverse/mrsid.in",
    },
    details: {
      problem: "Department library workflows need an easier way for students and librarians to manage book issue and return activity.",
      solution: "Developed a responsive MERN stack application focused on clear book management flows and user-friendly interactions.",
      outcomes: [
        "Built student-facing and librarian-facing flows for book issue and return",
        "Created a responsive interface suitable for daily departmental use",
        "Used MERN stack patterns to connect interface, API, and data persistence"
      ]
    },
    featured: true,
  },
  {
    id: "whiteboard",
    title: "Whiteboard",
    category: "Collaborative MERN Tool",
    description: "A collaborative whiteboard where users can draw, edit, export boards, and join controlled rooms with keys and optional passwords.",
    roles: ["Full-Stack Development", "Deployment Architecture"],
    year: "2025",
    technologies: ["MERN", "Kubernetes", "Kind Cluster"],
    accentColor: "amber",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=700&h=500&fit=crop",
    links: {
      github: "https://github.com/mrsidverse/mrsid.in",
    },
    details: {
      problem: "Collaborative drawing tools need simple room access, export flows, and a deployment architecture that can be explored beyond a monolith.",
      solution: "Built a MERN whiteboard with room-based collaboration and implemented both monolithic deployment and a local Kubernetes microservices setup.",
      outcomes: [
        "Enabled drawing, editing, exporting, and room access control",
        "Added optional room passwords and key-based collaboration access",
        "Experimented with Kind cluster deployment for scalability understanding"
      ]
    },
    featured: true,
  },
  {
    id: "social-media-website",
    title: "Social Media Website",
    category: "Full-Stack Social Platform",
    description: "A MERN social media app with authentication, posts, follows, likes, comments, media storage, and real-time chat behavior.",
    roles: ["Full-Stack Development", "Authentication"],
    year: "2024",
    technologies: ["MERN", "JWT", "Cloudinary", "Polling"],
    accentColor: "red",
    imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=700&h=500&fit=crop",
    links: {
      github: "https://github.com/mrsidverse/mrsid.in",
    },
    details: {
      problem: "Social applications require reliable identity, media handling, relationship actions, and responsive update flows.",
      solution: "Developed a full-stack app with authentication, post interactions, follow systems, Cloudinary media storage, and periodic polling.",
      outcomes: [
        "Implemented JWT authentication and core social actions",
        "Integrated Cloudinary for media storage",
        "Supported real-time chat behavior through periodic polling"
      ]
    },
    featured: true,
  },
  {
    id: "payment-ai-testing-app",
    title: "Payment and AI Testing App",
    category: "Internal Product Prototype",
    description: "An internal testing web app exploring Cashfree payments, Groq AI APIs, Angular frontend workflows, and structured feedback tracking.",
    roles: ["Software Development", "API Integration", "Frontend Engineering"],
    year: "2026",
    technologies: ["Angular", "React", "Cloudinary", "JWT", "Groq AI", "Cashfree APIs"],
    accentColor: "purple",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=700&h=500&fit=crop",
    links: {
      github: "https://github.com/mrsidverse/mrsid.in",
    },
    details: {
      problem: "Suhane Safar needed a way to explore future product capabilities around feedback, payments, subscriptions, and AI-powered media analysis.",
      solution: "Proposed a Google Sheets workflow and built an internal test application to evaluate payment, AI, and frontend integration paths.",
      outcomes: [
        "Managed feedback and query tracking through a Google Sheets workflow",
        "Explored Cashfree subscriptions and payments inside a test app",
        "Worked with Groq APIs for text, audio, and image analysis"
      ]
    },
    featured: true,
  },
  {
    id: "transaction-microservice",
    title: "Transaction Microservice Simulation",
    category: "Spring Boot / Kafka",
    description: "A JPMorgan Chase & Co software engineering job simulation integrating Kafka, Spring Boot workflows, transaction validation, and REST APIs.",
    roles: ["Backend Engineering", "Microservice Simulation"],
    year: "2023",
    technologies: ["Spring Boot", "Kafka", "Spring Data JPA", "H2", "REST APIs", "Maven"],
    accentColor: "blue",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?q=80&w=700&h=500&fit=crop",
    links: {
      github: "https://github.com/mrsidverse/mrsid.in",
    },
    details: {
      problem: "High-volume transaction systems need reliable message consumption, validation, persistence, and external incentive API integration.",
      solution: "Integrated Kafka into a Spring Boot microservice, modeled transaction entities, persisted updates, and exposed REST endpoints for balance queries.",
      outcomes: [
        "Consumed and deserialized transaction messages with embedded Kafka tests",
        "Implemented transaction validation, persistence, and user balance updates",
        "Verified end-to-end behavior with Maven tests and debugger inspection"
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
    period: "Jan 2026 - Feb 2026",
    role: "Software Engineer Intern",
    organization: "Investing Accelerator Summit",
    location: "Remote",
    description: "Supported payment, refund, and subscription backend workflows while building frontend architecture using Next.js and improving transactional data handling.",
    bulletPoints: [
      "Crafted bespoke interactive frontends with complex custom scroll behaviors and sensory animations using Framer Motion.",
      "Developed modular design grids to support easy maintenance across diverse client branding parameters.",
      "Designed clean vector assets, layouts, and typography palettes for desktop and mobile environments."
    ],
    skills: ["Next.js", "Backend Workflows", "Databases", "Debugging"],
    logoText: "IAS"
  },
  {
    id: "exp-2",
    period: "Mar 2025 - May 2025",
    role: "Software Developer",
    organization: "Suhane Safar",
    location: "Remote",
    description: "Built internal testing workflows around Cashfree payments, Groq AI APIs, Cloudinary, JWT authentication, and Angular/React frontend experiments.",
    bulletPoints: [
      "Designed high-fidelity mockups and functional react interfaces for internal academic and event trackers.",
      "Established typography hierarchy and components library used across multiple student repositories.",
      "Promoted responsive web guidelines, ensuring 100% accessible contrast ratios and mobile responsiveness."
    ],
    skills: ["Angular", "React", "Groq AI", "Cashfree APIs"],
    logoText: "SS"
  },
  {
    id: "exp-3",
    role: "Undergraduate Scholar",
    period: "2022 - 2026",
    organization: "Indian Institute of Technology, Roorkee",
    location: "Roorkee, Uttarakhand",
    description: "Pursuing B.Tech in Biosciences and Bioengineering with strong foundations in DSA, OOP, REST APIs, and full-stack software development.",
    skills: ["Data Structures", "OOP", "REST APIs", "Full-Stack Development"],
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
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/sidheshwar-sarangal-0b31482b8/",
    username: "sidheshwar-sarangal",
    iconName: "Linkedin",
  },
  {
    platform: "Peerlist",
    url: "https://peerlist.io/sidheshwar_s_",
    username: "sidheshwar_s_",
    iconName: "User",
  },
  {
    platform: "Email",
    url: "mailto:sidheshwar.sarangal22@gmail.com",
    username: "sidheshwar.sarangal22@gmail.com",
    iconName: "Mail",
  }
];

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: "post-placeholder-1",
    platform: "LinkedIn",
    title: "Your first social post",
    summary: "Replace this placeholder with a post, update, article, or project announcement.",
    publishedAt: "Coming soon",
  },
  {
    id: "post-placeholder-2",
    platform: "Dev.to",
    title: "A technical article goes here",
    summary: "Social tiles are controlled by the socialPosts array in your content source.",
    publishedAt: "Coming soon",
  },
  {
    id: "post-placeholder-3",
    platform: "X / Twitter",
    title: "Share a short update",
    summary: "Add an optional URL and imageUrl when the final post content is ready.",
    publishedAt: "Coming soon",
  },
];

export const EXPERIENCE_SUMMARY = [
  { period: "Jan 2026 - Feb 2026", role: "Software Engineer Intern", org: "Investing Accelerator Summit" },
  { period: "Mar 2025 - May 2025", role: "Software Developer", org: "Suhane Safar" },
  { period: "2024 - present", role: "Web Developer", org: "Institute Innovation Council, IIT Roorkee" },
  { period: "2022 - 2026", role: "B.Tech Undergraduate", org: "Indian Institute of Technology, Roorkee" },
];

export const CAPABILITIES = [
  {
    num: "1.",
    title: "Software Engineering",
    items: ["Data Structures & Algorithms", "Object-oriented programming", "REST API design", "Transaction workflows", "Debugging and testing", "System stability"],
  },
  {
    num: "2.",
    title: "Full-Stack Development",
    items: ["React", "Angular", "Next.js", "Node.js", "FastAPI", "Spring Boot"],
  },
  {
    num: "3.",
    title: "DevOps and Data",
    items: ["MongoDB", "MySQL", "Docker", "Kubernetes basics", "Kind cluster", "Linux"],
  },
];

export const TECH_SKILLS = [
  { name: "Java", level: 88, color: "text-[#f24e1e]" },
  { name: "Python", level: 86, color: "text-[#ff61f6]" },
  { name: "C++", level: 84, color: "text-[#31a8ff]" },
  { name: "Spring Boot", level: 82, color: "text-[#00c6ff]" },
  { name: "React", level: 88, color: "text-[#53c1de]" },
  { name: "Docker", level: 74, color: "text-[#ffc93c]" },
];

export const INDUSTRY_AWARDS = [
  { award: "Software Engineering Job Simulation, JPMorgan Chase & Co", year: "2026" },
  { award: "Certificate of Excellence in DSA in C++ by Coding Ninjas", year: "2026" },
  { award: "Web Developer, Institute Innovation Council IIT Roorkee", year: "2024" },
  { award: "Google Developer Student Club Project Contributor", year: "2026" },
];

export const TEAM_AWARDS = [
  { award: "Investing Accelerator Summit Internship", year: "2026" },
  { award: "Suhane Safar Software Developer Certificate", year: "2025" },
  { award: "Models and Robotics Section Whiteboard Project", year: "2025" },
];

export const TESTIMONIALS = [
  {
    quote: "The designs were modern, intuitive, and perfectly aligned with our brand. One of the best UI/UX experts we've hired!",
    author: "James P.",
    role: "Founder",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&fit=crop",
  },
  {
    quote: "Not only is the work visually stunning, but it's also grounded in real usability. A true professional.",
    author: "Ananya Rames",
    role: "Tech Lead at CoreUX Labs",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&fit=crop",
  },
  {
    quote: "From Figma to functional code – everything was delivered on time.",
    author: "David K.",
    role: "CEO of LaunchFoundry",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&fit=crop",
  },
];
