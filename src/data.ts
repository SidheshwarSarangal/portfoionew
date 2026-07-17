import { Project, Article, TimelineEvent, SocialLink, SocialPost } from "./types";
import { PDF_PROJECTS } from "./projectData";

export const PERSONAL_BIO = {
  name: "Sidheshwar",
  fullName: "Sidheshwar Sarangal",
  title: "Software Engineer",
  subtitle: "Focused on Full-Stack Systems, APIs, and Product Code",
  location: "IIT Roorkee, India",
  email: "sidheshwar.sarangal22@gmail.com",
  phone: "+919015220662",
  resumeUrl: "/documents/resume/sidheshwar-sarangal-resume-2026.pdf",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&h=250&fit=crop",
  about: "I am an entry-level software engineer from IIT Roorkee with strong foundations in DSA and hands-on experience across Spring Boot, Python, MERN, REST APIs, Docker, and Kubernetes. I build full-stack products, backend workflows, and practical systems that connect clean interfaces with reliable application logic.",
};

export const PROJECTS: Project[] = [
  ...PDF_PROJECTS,
  {
    id: "blog-article-search",
    title: "Search Engine for Blogs and Articles",
    category: "Search / AI Filtering",
    description: "A Python-powered search pipeline that crawls web content, filters relevant links with Gemma 3:1b, stores data in MongoDB, and indexes it for fast retrieval.",
    roles: ["Backend Engineering", "Frontend Development"],
    year: "2026",
    technologies: ["Python", "Scrapy", "FastAPI", "React", "MongoDB", "OpenSearch"],
    accentColor: "emerald",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=700&h=500&fit=crop",
    hoverImageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=700&h=500&fit=crop",
    associatedWith: "Independent engineering project",
    contributors: ["Sidheshwar Sarangal"],
    startedAt: "Jan 2026",
    completedAt: "Ongoing",
    status: "Active development",
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
    imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=700&h=500&fit=crop",
    hoverImageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=700&h=500&fit=crop",
    associatedWith: "IIT Roorkee · BSBE Department",
    contributors: ["Sidheshwar Sarangal", "Department collaborators"],
    startedAt: "Aug 2025",
    completedAt: "Dec 2025",
    status: "Completed",
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
    imageUrl: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=700&h=500&fit=crop",
    hoverImageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=700&h=500&fit=crop",
    associatedWith: "Models and Robotics Section",
    contributors: ["Sidheshwar Sarangal", "Project collaborators"],
    startedAt: "Jan 2025",
    completedAt: "Jul 2025",
    status: "Completed",
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
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=700&h=500&fit=crop",
    hoverImageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=700&h=500&fit=crop",
    associatedWith: "Independent full-stack project",
    contributors: ["Sidheshwar Sarangal"],
    startedAt: "Mar 2024",
    completedAt: "Nov 2024",
    status: "Completed",
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
    hoverImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=700&h=500&fit=crop",
    associatedWith: "Suhane Safar",
    contributors: ["Sidheshwar Sarangal", "Product team"],
    startedAt: "Mar 2025",
    completedAt: "May 2025",
    status: "Prototype delivered",
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
    hoverImageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=700&h=500&fit=crop",
    associatedWith: "JPMorgan Chase & Co · Forage simulation",
    contributors: ["Sidheshwar Sarangal"],
    startedAt: "2023",
    completedAt: "2023",
    status: "Simulation completed",
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
  },
  {
    id: "portfolio-interface-system",
    title: "Interactive Portfolio System",
    category: "Frontend / Interaction Design",
    description: "A responsive portfolio interface combining editorial typography, synchronized navigation, animated scene transitions, and data-driven project case studies.",
    roles: ["Frontend Engineering", "Interaction Design"],
    year: "2026",
    technologies: ["React", "TypeScript", "Motion", "Tailwind CSS", "Vite"],
    accentColor: "amber",
    imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=700&h=500&fit=crop",
    hoverImageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=700&h=500&fit=crop",
    associatedWith: "Independent portfolio project",
    contributors: ["Sidheshwar Sarangal"],
    startedAt: "Jun 2026",
    completedAt: "Ongoing",
    status: "Active development",
    links: { github: "https://github.com/mrsidverse" },
    details: {
      problem: "A conventional portfolio grid could not communicate both engineering range and the visual character of the work without becoming difficult to navigate.",
      solution: "Designed a data-driven React interface with synchronized sidebars, responsive layouts, progressive project reveals, and reusable detail views.",
      outcomes: [
        "Created responsive navigation patterns for desktop and compact displays",
        "Built reusable animated scenes and content-driven project cards",
        "Structured portfolio data so project details can evolve without component rewrites"
      ],
      architecture: ["Content data", "React views", "Motion scenes", "Responsive UI"],
      highlights: ["Native scrolling", "Reduced-motion support", "Deep-linked case studies"]
    },
    featured: true,
  },
  {
    id: "rest-api-engineering-lab",
    title: "REST API Engineering Lab",
    category: "Backend Systems Lab",
    description: "A backend practice environment for designing versioned APIs, authentication flows, validation, consistent errors, and maintainable service boundaries.",
    roles: ["Backend Engineering", "API Design"],
    year: "2025",
    technologies: ["Python", "FastAPI", "PostgreSQL", "JWT", "Pytest"],
    accentColor: "emerald",
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=700&h=500&fit=crop",
    hoverImageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=700&h=500&fit=crop",
    associatedWith: "Independent engineering lab",
    contributors: ["Sidheshwar Sarangal"],
    startedAt: "Sep 2025",
    completedAt: "Dec 2025",
    status: "Lab completed",
    links: { github: "https://github.com/mrsidverse" },
    details: {
      problem: "API prototypes often become inconsistent when authentication, validation, response formats, and persistence are designed independently.",
      solution: "Built a layered API practice project with explicit schemas, centralized errors, token authentication, database repositories, and automated endpoint tests.",
      outcomes: [
        "Standardized validation and error responses across endpoints",
        "Separated routing, service, and persistence responsibilities",
        "Added automated tests for authentication and core API behavior"
      ],
      architecture: ["API client", "FastAPI routes", "Service layer", "PostgreSQL"],
      highlights: ["Versioned endpoints", "Schema validation", "Automated tests"]
    },
    featured: true,
  },
  {
    id: "container-orchestration-lab",
    title: "Container Orchestration Lab",
    category: "DevOps / Systems Lab",
    description: "A local microservices lab exploring container builds, service discovery, configuration, health checks, and repeatable Kubernetes deployments.",
    roles: ["DevOps Engineering", "Deployment Architecture"],
    year: "2025",
    technologies: ["Docker", "Kubernetes", "Kind", "NGINX", "GitHub Actions"],
    accentColor: "blue",
    imageUrl: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=700&h=500&fit=crop",
    hoverImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=700&h=500&fit=crop",
    associatedWith: "Independent infrastructure lab",
    contributors: ["Sidheshwar Sarangal"],
    startedAt: "Apr 2025",
    completedAt: "Aug 2025",
    status: "Lab completed",
    links: { github: "https://github.com/mrsidverse" },
    details: {
      problem: "Moving from a local application to multiple reliable services requires a practical understanding of container networking, configuration, and recovery.",
      solution: "Created repeatable local clusters and deployment manifests to study service communication, ingress routing, health probes, and rolling updates.",
      outcomes: [
        "Packaged services into reproducible container images",
        "Configured health checks, internal services, and ingress routing",
        "Practised safe rollout and local cluster debugging workflows"
      ],
      architecture: ["Ingress", "Application services", "Cluster network", "Persistent data"],
      highlights: ["Health probes", "Service discovery", "Repeatable environments"]
    },
    featured: true,
  },
  {
    id: "dsa-visual-learning-lab",
    title: "DSA Visual Learning Lab",
    category: "Algorithms / Visualization",
    description: "An interactive learning experiment that turns algorithm steps into controllable visual states for sorting, searching, trees, and graph traversal.",
    roles: ["Frontend Development", "Algorithm Design"],
    year: "2024",
    technologies: ["React", "JavaScript", "Canvas", "Data Structures", "Algorithms"],
    accentColor: "purple",
    imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=700&h=500&fit=crop",
    hoverImageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=700&h=500&fit=crop",
    associatedWith: "Independent learning project",
    contributors: ["Sidheshwar Sarangal"],
    startedAt: "Jan 2024",
    completedAt: "Jun 2024",
    status: "Learning prototype",
    links: { github: "https://github.com/mrsidverse" },
    details: {
      problem: "Algorithm traces can be difficult to understand when learners only see source code and a final result.",
      solution: "Mapped algorithm operations to timed visual states with speed, pause, reset, and custom-input controls for focused experimentation.",
      outcomes: [
        "Visualized state changes rather than only final algorithm output",
        "Added playback controls for self-paced exploration",
        "Used reusable state models across several algorithm families"
      ],
      architecture: ["User controls", "Algorithm generator", "State timeline", "Canvas renderer"],
      highlights: ["Step playback", "Custom input", "Reusable visual states"]
    },
    featured: true,
  }
].slice(0, 10);

const LINKEDIN_POST_URLS = {
  ai2025: "https://www.linkedin.com/posts/sidheshwar-sarangal-0b31482b8_ai2025-generativeai-humanoidrobots-activity-7323265524765736960-OCOM",
  pythonPattern: "https://www.linkedin.com/posts/sidheshwar-sarangal-0b31482b8_the-following-pattern-was-created-in-python-activity-7197606514302312448-rLfm",
  cppPattern: "https://www.linkedin.com/posts/sidheshwar-sarangal-0b31482b8_include-include-activity-7198005872638210049-SCEY",
  longestSubsequence: "https://www.linkedin.com/posts/sidheshwar-sarangal-0b31482b8_we-have-to-find-the-longest-subsequence-activity-7236296117418680321-T68t",
  chromeExtension: "https://www.linkedin.com/posts/sidheshwar-sarangal-0b31482b8_trying-to-create-a-chrome-extension-powered-activity-7307105391325122560-VDvf",
  hackHazards: "https://www.linkedin.com/posts/sidheshwar-sarangal-0b31482b8_hackhazards-hackhazards2025-innovationinaction-activity-7320151646720671744-nPH4",
  kadane: "https://www.linkedin.com/posts/sidheshwar-sarangal-0b31482b8_kadanes-algorithm-activity-7338610204768358401-7gdp",
  takeUForward: "https://www.linkedin.com/posts/sidheshwar-sarangal-0b31482b8_takeuforward-activity-7357443683320741888-fGnw",
  algorithmQuestion: "https://www.linkedin.com/posts/sidheshwar-sarangal-0b31482b8_a-very-nice-question-which-is-implemented-activity-7357421667687587841-Fupn",
  differentQuestion: "https://www.linkedin.com/posts/sidheshwar-sarangal-0b31482b8_here-i-have-a-very-different-question-here-activity-7358083642981605376-XKqY",
  publicTwitterFeed: "https://www.linkedin.com/posts/sidheshwar-sarangal-0b31482b8_im-happy-to-share-this-public-tweeter-feed-activity-7378118912917442560-K1fr",
  coinDp: "https://www.linkedin.com/posts/sidheshwar-sarangal-0b31482b8_dynamic-programming-problem-regarding-coins-activity-7368278006877798400-SYnM",
} as const;

export const ARTICLES: Article[] = [
  {
    id: "linkedin-ai-2025",
    title: "AI in 2025: Generative AI & Humanoid Robots",
    slug: "linkedin-ai-2025",
    category: "AI / Emerging Technology",
    publishedAt: "Apr 30, 2025",
    readTime: "1 min read",
    summary: "A short perspective on the momentum behind generative AI and the growing role of humanoid robotics in the next wave of intelligent products.",
    content: "## What the post explores\n\nThis post reflects on two highly visible directions in AI during 2025: the rapid progress of generative systems and the development of increasingly capable humanoid robots.\n\n### Why it matters\n\nTogether, these areas show how intelligence is moving beyond text and images toward systems that can understand, decide, and eventually interact with the physical world. The post captures that shift and the engineering curiosity it creates.",
    externalUrl: LINKEDIN_POST_URLS.ai2025,
  },
  {
    id: "linkedin-python-pattern",
    title: "Creating a Pattern in Python",
    slug: "linkedin-python-pattern",
    category: "Python / Problem Solving",
    publishedAt: "May 18, 2024",
    readTime: "1 min read",
    summary: "A programming exercise that uses Python loops and row-by-row reasoning to construct a structured output pattern.",
    content: "## What the post explores\n\nThis is a code-first Python exercise focused on building a visual pattern through iteration. The key is to translate the expected output into predictable row and column behavior.\n\n### The approach\n\nInstead of treating the full pattern as one large problem, the implementation reasons about one row at a time. Loop boundaries control the structure, while small conditions determine what should be printed at each position.",
    externalUrl: LINKEDIN_POST_URLS.pythonPattern,
  },
  {
    id: "linkedin-cpp-pattern",
    title: "Pattern Logic with C++",
    slug: "linkedin-cpp-pattern",
    category: "C++ / Programming Fundamentals",
    publishedAt: "May 19, 2024",
    readTime: "1 min read",
    summary: "A compact C++ implementation that breaks pattern generation into clear loops, positions, and repeatable conditions.",
    content: "## What the post explores\n\nThis programming post looks at a pattern-building problem implemented in C++. It demonstrates how a visual result can be translated into a small set of repeatable rules.\n\n### The approach\n\nRows establish the outer progression and nested logic decides the output at each position. This kind of exercise develops careful loop control, observation, and the ability to convert a pattern into executable steps.",
    externalUrl: LINKEDIN_POST_URLS.cppPattern,
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    id: "exp-1",
    period: "Jan 2026 - Feb 2026",
    role: "Frontend Developer Intern",
    organization: "Investing Accelerator Summit",
    location: "India · Remote",
    description: "Built frontend architecture with Next.js while supporting payment, refund, and subscription workflows. Managed application data flow and transactional persistence, monitored logs, debugged production issues, and collaborated across teams to improve system stability.",
    bulletPoints: [
      "Built and maintained frontend architecture using Next.js.",
      "Supported payment, refund, and subscription workflows with correct transactional data handling.",
      "Monitored logs and debugged production failures with cross-functional teams."
    ],
    skills: ["Next.js", "Transactional Workflows", "Data Persistence", "Production Debugging"],
    logoText: "IAS"
  },
  {
    id: "exp-2",
    period: "Dec 2025",
    role: "Software Engineering Job Simulation",
    organization: "JPMorganChase · Forage",
    location: "India · Remote",
    description: "Integrated Kafka into a Spring Boot microservice for high-volume transaction messages. Implemented validation, entity persistence, user balance updates, an external incentive REST integration, and a balance-query API, then verified the full workflow with Maven tests and debugger-led inspection.",
    bulletPoints: [
      "Consumed and deserialized transaction messages with Kafka and an embedded Kafka test setup.",
      "Persisted validated transactions and updated balances using Spring Data JPA and H2.",
      "Connected an incentive REST API and exposed user balances through a Spring REST controller."
    ],
    skills: ["Java", "Spring Boot", "Apache Kafka", "Spring Data JPA", "H2", "Maven"],
    logoText: "JPMC"
  },
  {
    id: "exp-3",
    period: "Mar 2025 - Nov 2025",
    role: "Web Developer",
    organization: "Department of Biosciences and Bioengineering, IIT Roorkee",
    location: "IIT Roorkee · On-site",
    description: "Helped build a responsive MERN application for students and librarians to manage departmental book issue and return workflows, working under the guidance of Vikram Gurjar and Prof. Maya S. Nair.",
    bulletPoints: [
      "Developed student and librarian workflows for issuing and returning books.",
      "Contributed to a responsive, user-friendly MERN stack interface."
    ],
    skills: ["MongoDB", "Express", "React", "Node.js"],
    logoText: "BSBE"
  },
  {
    id: "exp-4",
    period: "Mar 2025 - May 2025",
    role: "Web Development Intern",
    organization: "Suhane Safar",
    location: "IIT Roorkee · On-site",
    description: "Proposed a Google Sheets workflow for tracking user feedback and built an internal application to evaluate Cashfree payments, Groq AI text, audio, and image analysis, and Angular frontend workflows. Also worked with React, Cloudinary, and JWT authentication.",
    bulletPoints: [
      "Structured end-user feedback and query tracking through Google Sheets.",
      "Prototyped Cashfree subscription and payment integrations.",
      "Evaluated Groq AI APIs for text, audio, and image analysis."
    ],
    skills: ["Angular", "React", "Cloudinary", "JWT", "Groq AI", "Cashfree APIs"],
    logoText: "SS"
  },
  {
    id: "exp-5",
    period: "Dec 2024",
    role: "Full Stack Developer Intern",
    organization: "Unified Mentor",
    location: "Delhi, India · Remote",
    description: "Completed a one-month full-stack internship and delivered four applications: an interactive web application, a responsive resume, a Gram Panchayat application, and a shopping mall application. Used React and Firebase for dynamic interfaces, realtime data, authentication, deployment, and hosting.",
    bulletPoints: [
      "Built foundational projects with JavaScript, HTML, and CSS.",
      "Developed React applications with Firebase database and authentication.",
      "Deployed completed applications using Firebase Hosting."
    ],
    skills: ["React", "Firebase", "JavaScript", "HTML", "CSS"],
    logoText: "UM"
  },
  {
    id: "exp-6",
    period: "Jun 2024 - Dec 2024",
    role: "Web Developer",
    organization: "Indian Institute of Technology, Roorkee",
    location: "Institute Innovation Council · On-site",
    description: "Contributed as a web developer to IIT Roorkee's Institute Innovation Council, which supports the campus startup and entrepreneurial ecosystem through innovation programs, industry engagement, intellectual-property workshops, and student challenges.",
    skills: ["Web Development", "MERN Stack", "Responsive UI"],
    logoText: "IIC"
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/SidheshwarSarangal",
    username: "SidheshwarSarangal",
    iconName: "Github",
  },
  {
    platform: "X / Twitter",
    url: "https://x.com/Sidheshwar2002",
    username: "@Sidheshwar2002",
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
    url: "https://peerlist.io/sarangal22",
    username: "sarangal22",
    iconName: "User",
  },
  {
    platform: "Discord",
    url: "https://discord.com/invite/qvtfYaZG5",
    username: "qvtfYaZG5",
    iconName: "MessageCircle",
  },
  {
    platform: "Upwork",
    url: "https://www.upwork.com/freelancers/~01c3a7c22865209f3d",
    username: "01c3a7c22865209f3d",
    iconName: "BriefcaseBusiness",
  },
  {
    platform: "LeetCode",
    url: "https://leetcode.com/u/SidheshwarSarangal/",
    username: "SidheshwarSarangal",
    iconName: "Code2",
  },
  {
    platform: "Wellfound",
    url: "https://wellfound.com/u/sidheshwar-sarangal",
    username: "sidheshwar-sarangal",
    iconName: "BriefcaseBusiness",
  },
  {
    platform: "Dev.to",
    url: "https://dev.to/sidheshwar_sarangal_fe09b",
    username: "sidheshwar_sarangal_fe09b",
    iconName: "Newspaper",
  },
  {
    platform: "Codeforces",
    url: "https://codeforces.com/profile/sidheshwar.sarangal",
    username: "sidheshwar.sarangal",
    iconName: "Code2",
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
    id: "linkedin-ai-2025",
    platform: "LinkedIn",
    title: "AI in 2025: Generative AI & Humanoid Robots",
    summary: "A perspective on generative AI, humanoid robotics, and the direction of intelligent systems.",
    publishedAt: "Apr 30, 2025",
    url: LINKEDIN_POST_URLS.ai2025,
  },
  {
    id: "linkedin-python-pattern",
    platform: "LinkedIn",
    title: "Creating a Pattern in Python",
    summary: "A Python exercise using iteration and row-by-row reasoning to generate a structured pattern.",
    publishedAt: "May 18, 2024",
    url: LINKEDIN_POST_URLS.pythonPattern,
  },
  {
    id: "linkedin-cpp-pattern",
    platform: "LinkedIn",
    title: "Pattern Logic with C++",
    summary: "A compact C++ pattern implementation built with nested loops and repeatable conditions.",
    publishedAt: "May 19, 2024",
    url: LINKEDIN_POST_URLS.cppPattern,
  },
  {
    id: "linkedin-longest-subsequence",
    platform: "LinkedIn",
    title: "Finding the Longest Subsequence",
    summary: "A data-structures and algorithms problem focused on reasoning about subsequences and an efficient solution path.",
    publishedAt: "Sep 2, 2024",
    url: LINKEDIN_POST_URLS.longestSubsequence,
  },
  {
    id: "linkedin-chrome-extension",
    platform: "LinkedIn",
    title: "Building a Chrome Extension",
    summary: "An update from experimenting with a Chrome extension and connecting browser capabilities to a practical workflow.",
    publishedAt: "Mar 16, 2025",
    url: LINKEDIN_POST_URLS.chromeExtension,
  },
  {
    id: "linkedin-hackhazards-2025",
    platform: "LinkedIn",
    title: "HackHazards 2025",
    summary: "A hackathon update about building, collaborating, and turning an idea into a working submission under time pressure.",
    publishedAt: "Apr 21, 2025",
    url: LINKEDIN_POST_URLS.hackHazards,
  },
  {
    id: "linkedin-kadane-algorithm",
    platform: "LinkedIn",
    title: "Understanding Kadane's Algorithm",
    summary: "A problem-solving note on maximum subarray reasoning and the compact dynamic decision behind Kadane's algorithm.",
    publishedAt: "Jun 11, 2025",
    url: LINKEDIN_POST_URLS.kadane,
  },
  {
    id: "linkedin-take-u-forward",
    platform: "LinkedIn",
    title: "Learning with Take U Forward",
    summary: "A DSA learning update inspired by structured practice and consistent problem solving with Take U Forward.",
    publishedAt: "Aug 2, 2025",
    url: LINKEDIN_POST_URLS.takeUForward,
  },
  {
    id: "linkedin-algorithm-question",
    platform: "LinkedIn",
    title: "A Nice Algorithmic Question",
    summary: "A concise walkthrough of an interesting programming question and the reasoning used to implement its solution.",
    publishedAt: "Aug 2, 2025",
    url: LINKEDIN_POST_URLS.algorithmQuestion,
  },
  {
    id: "linkedin-different-question",
    platform: "LinkedIn",
    title: "A Different Problem-Solving Approach",
    summary: "An exploration of a less familiar question that calls for careful observation before choosing the implementation strategy.",
    publishedAt: "Aug 4, 2025",
    url: LINKEDIN_POST_URLS.differentQuestion,
  },
  {
    id: "linkedin-public-twitter-feed",
    platform: "LinkedIn",
    title: "Building a Public Twitter Feed",
    summary: "A project update sharing a public social-feed experience and the product work behind making it usable.",
    publishedAt: "Sep 28, 2025",
    url: LINKEDIN_POST_URLS.publicTwitterFeed,
  },
  {
    id: "linkedin-coin-dp",
    platform: "LinkedIn",
    title: "Dynamic Programming with Coins",
    summary: "A coin-based dynamic programming problem that demonstrates state definition, transitions, and reusable subproblem results.",
    publishedAt: "Sep 1, 2025",
    url: LINKEDIN_POST_URLS.coinDp,
  },
];

export const EXPERIENCE_SUMMARY = [
  { period: "Jan 2026 - Feb 2026", role: "Frontend Developer Intern", org: "Investing Accelerator Summit" },
  { period: "Dec 2025", role: "Software Engineering Job Simulation", org: "JPMorganChase · Forage" },
  { period: "Mar 2025 - Nov 2025", role: "Web Developer", org: "Department of Biosciences and Bioengineering, IIT Roorkee" },
  { period: "Mar 2025 - May 2025", role: "Web Development Intern", org: "Suhane Safar" },
  { period: "Dec 2024", role: "Full Stack Developer Intern", org: "Unified Mentor" },
  { period: "Jun 2024 - Dec 2024", role: "Web Developer", org: "Institute Innovation Council, IIT Roorkee" },
];

export const CAPABILITIES = [
  {
    num: "1.",
    title: "Engineering Foundations",
    items: ["Data Structures & Algorithms", "Object-Oriented Programming", "System Design", "API Contracts", "Workflow & DAG Design", "Reliability & Retry Logic", "Debugging", "Automated Testing"],
  },
  {
    num: "2.",
    title: "Languages",
    items: ["Java 17", "Python", "C++", "JavaScript", "TypeScript"],
  },
  {
    num: "3.",
    title: "Frontend & Product UI",
    items: ["React", "Angular", "Next.js", "Redux Toolkit", "Tailwind CSS", "Vite", "Electron", "Canvas", "Responsive UI", "Component Architecture", "Chrome Extensions"],
  },
  {
    num: "4.",
    title: "Backend & APIs",
    items: ["Node.js", "Express", "FastAPI", "Spring Boot", "REST APIs", "JWT", "Passport", "bcrypt", "Email OTP", "Async Handlers"],
  },
  {
    num: "5.",
    title: "Data, Events & Realtime",
    items: ["MongoDB", "Mongoose", "MySQL", "Spring Data JPA", "H2", "OpenSearch", "Apache Kafka", "Socket.IO"],
  },
  {
    num: "6.",
    title: "AI, Search & Integrations",
    items: ["Ollama", "Gemma 3", "Groq AI", "Scrapy", "Gmail API", "Cloudinary", "Cashfree", "MIME Processing", "Browser Storage"],
  },
  {
    num: "7.",
    title: "DevOps & Tooling",
    items: ["Docker", "Kubernetes", "Kind", "Git", "Linux", "Maven", "Zod", "Unit Tests", "Embedded Kafka"],
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
    quote: "I worked with Sidheshwar on the same team and found him to be a dedicated and talented developer. He learns quickly, takes ownership of his work, and consistently delivers quality results. His positive attitude and willingness to help others make him a great teammate. I highly recommend him.",
    author: "Manoj Kumar",
    role: "Generative AI & DevOps · Full Stack Engineer",
    date: "June 6, 2026",
    avatarUrl: "/images/profile/linkedin-recommendations-reference.png",
    avatarCrop: { x: 20, y: 112, size: 51, sourceWidth: 783, sourceHeight: 458 },
  },
  {
    quote: "I had the opportunity to work closely with Sidheshwar during a recent hackathon, and I was genuinely impressed by his skills and potential as a developer. Even as a pre-final year student, Sidheshwar showed a remarkable ability to quickly learn and adapt to new technologies, which was a huge asset to our team. He demonstrated strong problem-solving skills and was always eager to take on challenging tasks.",
    author: "Sayantan Gain",
    role: "SDE at UIDAI · IIT Roorkee '25",
    date: "April 29, 2025",
    avatarUrl: "/images/profile/linkedin-recommendations-reference.png",
    avatarCrop: { x: 20, y: 257, size: 51, sourceWidth: 783, sourceHeight: 458 },
  },
];
