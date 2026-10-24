export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  features: string[];
  image?: string;
  fallbackImage?: string;
  categoryBadge?: string;
  prodBadge?: string;
  metricHighlight?: string;
  architecture?: {
    overview: string;
    flow: string[];
    technicalHighlights: string[];
  };
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level?: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  technologies: string[];
}

export const portfolioData = {
  personal: {
    name: "Amit Kumar Ray",
    role: "Full Stack Developer",
    tagline:
      "Architecting high-concurrency fintech platforms, AI-driven applications, and resilient cloud microservices with React 19, TypeScript, Node.js, and PostgreSQL.",
    about:
      "Full Stack Developer with expertise in React 19, TypeScript, Node.js, Express, and PostgreSQL (Neon). Proven experience architecting high-concurrency fintech banking systems, multi-tenant enterprise platforms, and distributed REST microservices. Adept at database schema optimization (40% query acceleration), ACID-compliant row-level locking, and automated CI/CD pipelines.",
    location: "India",
    email: "amitkumarpatel7562@gmail.com",
    phone: "+91 9508121381",
    github: "https://github.com/amitbuilds18",
    linkedin: "https://www.linkedin.com/in/amit-kumar-ray-576b09320",
    resumeUrl: "/resume.pdf",
    status: "Available for Full-time Software Engineering Roles",
  },

  stats: [
    { label: "Query Speed Boost", value: "40%" },
    { label: "Core Transaction Types", value: "15+" },
    { label: "Deployment Cycle Cut", value: "45%" },
    { label: "Data Consistency", value: "100%" },
  ],

  skillCategories: [
    {
      category: "Languages & Frontend",
      skills: [
        { name: "JavaScript (ES6+)" },
        { name: "TypeScript" },
        { name: "React 19" },
        { name: "Tailwind CSS" },
        { name: "Redux Toolkit" },
        { name: "React Router" },
        { name: "HTML5 / CSS3" },
        { name: "Recharts" },
        { name: "Vite" },
      ],
    },
    {
      category: "Backend & Microservices",
      skills: [
        { name: "Node.js" },
        { name: "Express 5" },
        { name: "RESTful APIs" },
        { name: "JWT Authentication" },
        { name: "bcrypt" },
        { name: "Rate Limiting" },
        { name: "PDFKit" },
        { name: "Twilio API" },
      ],
    },
    {
      category: "Databases & Architecture",
      skills: [
        { name: "PostgreSQL (Neon Cloud)" },
        { name: "MongoDB" },
        { name: "ACID Transactions" },
        { name: "Row-Level Locking (FOR UPDATE)" },
        { name: "Compound Indexing" },
        { name: "Multi-Tenancy" },
      ],
    },
    {
      category: "DevOps, AI & Tools",
      skills: [
        { name: "Google Gemini AI" },
        { name: "Ollama (Local LLMs)" },
        { name: "Vapi AI (Voice Agent)" },
        { name: "Docker" },
        { name: "GitHub Actions (CI/CD)" },
        { name: "Git & GitHub" },
        { name: "Postman" },
        { name: "Vercel" },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "navapay-fintech",
      title: "Navapay — Full-Stack Fintech Banking & Payment Platform",
      tagline: "High-concurrency fintech platform with ACID transactions & Gemini AI insights",
      description:
        "Architected a comprehensive fintech banking platform processing 15+ transaction types including P2P wallet transfers, bill payments, and automated savings vaults with zero race conditions.",
      tags: ["React 19", "Node.js", "Express", "PostgreSQL (Neon)", "Tailwind CSS", "Stripe", "Gemini AI", "Vite"],
      features: [
        "Programmed ACID-compliant transactions with PostgreSQL row-level locks (FOR UPDATE), ensuring 100% data consistency",
        "Hardened security via JWT tokens and a 4-digit MPIN hashed with bcrypt (10 rounds) to stop unauthorized transfers",
        "Integrated camera QR scan-to-pay with <200ms decode latency, automated round-up savings, and Google Gemini AI spending insights",
        "Automated end-to-end CI/CD workflows via GitHub Actions, decreasing build and test deployment cycles by 45%",
      ],
      architecture: {
        overview: "Production-grade fintech banking architecture with ACID transaction guarantees and AI spending insights.",
        flow: [
          "Client Layer: React 19 + Tailwind + Vite (Camera QR Scanner <200ms)",
          "Security Layer: JWT Tokens & bcrypt-hashed 4-Digit MPIN Auth Guard",
          "API Gateway: Express 5 RESTful Microservices with Rate Limiting",
          "Database Layer: Neon PostgreSQL with Row-Level Locks (SELECT ... FOR UPDATE)",
          "Integrations: Stripe Payment Webhooks & Google Gemini AI Financial Engine"
        ],
        technicalHighlights: [
          "PostgreSQL Row-Level Locking (FOR UPDATE) guarantees zero race conditions during simultaneous fund deductions",
          "Automated round-up savings algorithm running asynchronously on successful transfers",
          "Gemini AI analyzes user transaction history across 6 core categories for personalized budgetary insights",
          "GitHub Actions CI/CD with unit testing & automated linting cutting deployment cycles by 45%"
        ]
      },
      liveUrl: "https://banking-dashboard-tau-lime.vercel.app/",
      githubUrl: "https://github.com/amitbuilds18/banking-dashboard",
      image: "/projects/navapay.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
      categoryBadge: "Full Stack",
      prodBadge: "PROD",
      metricHighlight: "ACID Row-Level Locking & 40% Query Acceleration",
      featured: true,
    },
    {
      id: "ai-interview-taker",
      title: "AI Voice Interview Platform (AiInterviewTaker)",
      tagline: "Real-time conversational AI voice agent with automated technical evaluation",
      description:
        "An intelligent interview simulation system powered by voice AI and large language models. Conducts dynamic voice interviews, assesses candidate speech, and provides multi-metric scoring dashboards.",
      tags: ["React 19", "TypeScript", "Node.js", "Vapi AI", "Tailwind CSS", "RESTful APIs"],
      features: [
        "Real-time low-latency voice interview agent utilizing Vapi AI audio stream parsing",
        "Dynamic question generation and automated performance evaluation scoring",
        "Production-ready TypeScript backend with structured API routing and scoring models",
        "Responsive candidate analytics dashboard with instant feedback reports",
      ],
      architecture: {
        overview: "Low-latency bidirectional voice stream processing pipeline with LLM-assisted assessment.",
        flow: [
          "Audio Ingestion: WebRTC / Vapi AI Web Client Microphone Capture",
          "Speech Processing: Real-time Audio Streaming to AI Voice Model",
          "Evaluation Engine: LLM Prompt Pipeline scoring Technical & Soft Skills",
          "Backend API: Node.js + TypeScript Service aggregating evaluation metrics",
          "Dashboard: React 19 UI with Interactive Radar & Score Cards"
        ],
        technicalHighlights: [
          "Sub-250ms conversational response time using Vapi voice streaming architecture",
          "Full type-safety throughout client, server, and scoring payload schemas",
          "Automated dynamic question generation tailored to the candidate's declared experience level"
        ]
      },
      liveUrl: "https://ai-interview-taker.vercel.app",
      githubUrl: "https://github.com/amitbuilds18/AiInterviewTaker",
      image: "/projects/ai-interview.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
      categoryBadge: "AI & Cloud",
      prodBadge: "PROD",
      metricHighlight: "Sub-250ms Voice Streaming & Real-time Evaluation",
      featured: true,
    },
    {
      id: "travel-ecosystem",
      title: "Unified Travel Multi-Company Career Ecosystem",
      tagline: "Multi-tenant enterprise portal supporting 4 corporate divisions & 500+ records",
      description:
        "Engineered an enterprise portal managing corporate travel logistics and recruitment pipelines. Implemented 3-tier Role-Based Access Control (Admin, Recruiter, Employee) with sub-150ms API response times.",
      tags: ["React.js", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "RESTful APIs", "RBAC", "Docker"],
      features: [
        "Established a 3-tier Role-Based Access Control (RBAC) model securing sensitive corporate workflows",
        "Constructed 12+ RESTful API endpoints with database pagination and indexing, reducing response time by 38% (240ms to 150ms)",
        "Containerized frontend and backend microservices using Docker, achieving 99.9% environment parity across environments",
        "Dual-database architecture utilizing PostgreSQL and MongoDB for flexible multi-division records",
      ],
      architecture: {
        overview: "Containerized multi-tenant microservices architecture with role-based permission boundaries.",
        flow: [
          "Corporate Division Portals (Admin, Recruiter, Employee Interfaces)",
          "Authentication & RBAC Middleware enforcing division isolation",
          "Express REST Microservices with pagination and cursor indexing",
          "Polyglot Persistence: PostgreSQL (Relational Logistics) + MongoDB (Flexible Profiles)",
          "Docker Container Cluster ensuring 99.9% environment parity"
        ],
        technicalHighlights: [
          "Query optimization with compound indexing reduced API latency by 38% (from 240ms down to 150ms)",
          "Fine-grained RBAC permissions preventing cross-tenant corporate data leaks",
          "Docker Compose setup enabling unified single-command local orchestration"
        ]
      },
      liveUrl: "https://travel-career-ecosystem.vercel.app",
      githubUrl: "https://github.com/amitbuilds18/Unified-Travel-Multi-Company-Career-Ecosystem",
      image: "/projects/travel.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      categoryBadge: "Full Stack",
      prodBadge: "PROD",
      metricHighlight: "500+ Corporate Records, Sub-150ms Latency",
      featured: true,
    },
    {
      id: "stylehub-ecommerce",
      title: "StyleHub — Full-Stack E-Commerce Web Application",
      tagline: "High-performance full-stack TypeScript commerce platform with 500+ SKU listings",
      description:
        "A full-stack retail platform supporting 500+ SKU product listings with multi-attribute filtering, Stripe payment webhooks, and automated SMS order dispatches.",
      tags: ["React 19", "TypeScript", "Node.js", "Express 5", "PostgreSQL", "Tailwind CSS", "Stripe API", "Twilio"],
      features: [
        "Connected Stripe Payment Gateway with webhook verification, reducing checkout abandonment rates by 25%",
        "Configured Twilio SMS notification webhooks, dispatching order confirmation alerts within 3 seconds of checkout",
        "Optimized relational PostgreSQL schemas with compound indexes, accelerating product query execution speeds by 40%",
        "Type-safe checkout and inventory management pipeline built with TypeScript and Express 5",
      ],
      architecture: {
        overview: "High-throughput e-commerce catalog with webhook-driven checkout and SMS alerting pipelines.",
        flow: [
          "React 19 Product Catalog (500+ SKUs with Multi-Attribute Filters)",
          "Stripe Checkout Gateway with Webhook Signature Verification",
          "Express 5 Order Processing Engine with Transactional Inventory Locks",
          "Twilio Notification Worker dispatching SMS within 3 seconds",
          "PostgreSQL with Compound Indexes for sub-50ms product filtering"
        ],
        technicalHighlights: [
          "Compound PostgreSQL indexes increased product filtering speed by 40%",
          "Stripe Webhook event deduplication eliminating double-charging or duplicate order creation",
          "Asynchronous Twilio worker delivering order dispatch notifications in under 3 seconds"
        ]
      },
      liveUrl: "https://e-commerce1-5u9.vercel.app/",
      githubUrl: "https://github.com/amitbuilds18/e-commerce1",
      image: "/projects/stylehub.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
      categoryBadge: "Full Stack",
      prodBadge: "PROD",
      metricHighlight: "500+ SKUs • Stripe Webhooks & <3s SMS Alerts",
      featured: true,
    },
    {
      id: "ai-chatbot",
      title: "AI Chatbot — Intelligent Assistant & PDF Document Analyzer",
      tagline: "Conversational LLM interface with Ollama integration, session memory & PDF chat",
      description:
        "Engineered an enterprise-grade AI chatbot platform featuring local LLM integration via Ollama, multi-session conversation history, document PDF ingestion & analysis, and strict RFC-compliant input security guards.",
      tags: ["React 19", "Tailwind CSS", "Node.js", "Express 5", "MongoDB", "Ollama LLM", "JWT Auth", "PDF Parse", "Vite"],
      features: [
        "Integrated Ollama LLM endpoint streaming responses with sub-second token latency and automatic fallback timeouts",
        "Constructed document ingestion pipeline with pdf-parse and jsPDF for interactive PDF analysis and conversation exports",
        "Engineered token-bucket rate limiting (10 req/min auth, 50 req/min chat) mitigating DDoS and brute-force vectors",
        "Implemented multi-tenant session isolation in MongoDB with JWT Bearer authentication and RFC-compliant validation",
      ],
      architecture: {
        overview: "End-to-end full-stack conversational AI architecture with LLM inference, PDF parsing pipeline, and hardened security guards.",
        flow: [
          "Client Layer: React 19 + Tailwind CSS 4 + Vite (Live Markdown Streaming & PDF Uploads)",
          "Security & Gatekeeper: In-memory Rate Limiting (10/50 req/min) & RFC-compliant Input Sanitization",
          "Authentication: JWT Bearer Token verification with Bcrypt password hashing (10 rounds)",
          "Inference Engine: Ollama LLM API connector with 60s timeout guards and error recovery",
          "Data & Document Store: MongoDB / Mongoose for chat sessions + pdf-parse for text extraction"
        ],
        technicalHighlights: [
          "Ollama local LLM API integration with connection pooling and resilient timeout fallbacks",
          "Client-side Markdown rendering with syntax highlighting and instant PDF report export via jsPDF",
          "Rate limiter middleware isolating abusive IPs with automatic in-memory sliding window eviction",
          "End-to-end type safety and sanitized payload guards preventing prompt and script injection"
        ]
      },
      liveUrl: "https://github.com/amitbuilds18/ai-chatbot",
      githubUrl: "https://github.com/amitbuilds18/ai-chatbot",
      image: "/projects/ai-chatbot.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=1200&q=80",
      categoryBadge: "AI & Cloud",
      prodBadge: "PROD",
      metricHighlight: "Ollama LLM • PDF Document Chat & Rate-Limited APIs",
      featured: true,
    },
  ] as Project[],

  experience: [
    {
      id: "edu-1",
      role: "Bachelor of Technology in Computer Science & Engineering",
      organization: "Sagar Group of Institutions",
      period: "2020 – 2024",
      description:
        "Graduated with CGPA: 7.0 / 10. Specialized in MERN & PERN stacks (React 19, Node.js, Express 5, PostgreSQL, MongoDB, TypeScript), software architecture, ACID transactions, and Docker containerization.",
      technologies: ["React 19", "Node.js", "PostgreSQL", "MongoDB", "TypeScript", "Docker"],
    },
    {
      id: "edu-2",
      role: "Senior Secondary (Class XII: 62.8%) & Secondary School (Class X: 74.6%)",
      organization: "State Board Education",
      period: "2018 – 2020",
      description:
        "Completed science and mathematics coursework with strong foundational analytical thinking and problem-solving skills.",
      technologies: ["Mathematics", "Physics", "Computer Fundamentals"],
    },
  ] as ExperienceItem[],
};
