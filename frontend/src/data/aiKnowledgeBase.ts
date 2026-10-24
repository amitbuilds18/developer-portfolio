export interface AiMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  actions?: {
    label: string;
    actionType: "resume" | "project" | "contact" | "skills" | "copy";
    payload?: string;
  }[];
}

export const QUICK_PROMPTS = [
  "🚀 What are Amit's top projects?",
  "⚡ What is Amit's tech stack?",
  "🔒 Explain Amit's fintech & ACID experience",
  "🤖 What AI technologies has Amit worked with?",
  "💼 Is Amit available for immediate hire?",
  "📄 How can I contact Amit or see his resume?",
];

interface KnowledgePattern {
  keywords: string[];
  response: () => {
    text: string;
    actions?: AiMessage["actions"];
  };
}

export const KNOWLEDGE_BASE: KnowledgePattern[] = [
  // 1. Availability / Hiring / Notice Period / Role
  {
    keywords: [
      "hire", "available", "availability", "notice", "immediate", "job", "joining",
      "open to work", "relocation", "remote", "salary", "full time", "fulltime", "role", "position"
    ],
    response: () => ({
      text: `**Amit Kumar Ray is actively looking and AVAILABLE IMMEDIATELY for Full-Time Software Engineering roles!**\n\n` +
        `• **Current Status**: Ready to join immediately (0 days notice period)\n` +
        `• **Target Roles**: Full Stack Developer, Frontend Engineer (React/TypeScript), Backend Engineer (Node.js/PostgreSQL)\n` +
        `• **Work Mode**: Open to Remote, Hybrid, or On-site roles across India / Global\n` +
        `• **Location**: India (Open to relocation)\n\n` +
        `Amit brings strong hands-on experience in building ACID-compliant fintech apps, microservices, and AI-driven platforms.`,
      actions: [
        { label: "📄 Preview Resume", actionType: "resume" },
        { label: "✉️ Contact Amit Directly", actionType: "contact" },
      ],
    }),
  },

  // 2. Navapay / Fintech / ACID / Row-level locking
  {
    keywords: [
      "navapay", "fintech", "banking", "acid", "lock", "locking", "row level", "row-level",
      "mpin", "double spend", "race condition", "transfer", "wallet", "p2p"
    ],
    response: () => ({
      text: `**Navapay** is Amit's flagship **Full-Stack Fintech Banking & Payment Platform**.\n\n` +
        `**Key Architectural Highlights:**\n` +
        `• **Zero Race Conditions**: Implemented ACID-compliant transactions using PostgreSQL **Row-Level Locking** (\`SELECT ... FOR UPDATE\`) to guarantee 100% data consistency during simultaneous fund deductions.\n` +
        `• **Security**: Dual-layer auth with JWT tokens and a 4-digit MPIN hashed with \`bcrypt\` (10 rounds).\n` +
        `• **15+ Transaction Types**: Supports P2P wallet transfers, recurring bill payments, and round-up automated savings vaults.\n` +
        `• **AI Spending Insights**: Integrated **Google Gemini AI** to categorize transaction history and recommend personalized budgets.\n` +
        `• **Performance**: <200ms camera QR scan-to-pay decode latency and 40% query acceleration with compound indexes.`,
      actions: [
        { label: "🚀 View Navapay Demo", actionType: "project", payload: "navapay-fintech" },
        { label: "💻 Check GitHub Repo", actionType: "project", payload: "https://github.com/amitbuilds18/banking-dashboard" },
      ],
    }),
  },

  // 3. RSK Quick Commerce / Delivery / WebSockets
  {
    keywords: [
      "rsk", "delivery", "quick commerce", "bakery", "sweets", "tracking", "socket", "websocket",
      "gps", "msg91", "otp", "razorpay", "pwa"
    ],
    response: () => ({
      text: `**RSK** is an on-demand **Quick-Commerce Delivery Platform** for bakery, sweets, and dairy retail.\n\n` +
        `**Key Technical Highlights:**\n` +
        `• **Real-Time GPS Tracking**: Streamed live driver coordinates and status updates directly to customers via **Socket.IO WebSockets** with sub-100ms room broadcasting.\n` +
        `• **Mobile-First Auth**: Mobile OTP authentication pipeline integrated with the **MSG91 SMS Gateway** and automated fallbacks.\n` +
        `• **Payments**: Dual checkout engine supporting **Razorpay payment gateway** with webhook verification alongside Cash-on-Delivery (COD).\n` +
        `• **Tri-Portal Architecture**: Tailored responsive dashboards for Customers, Store Managers, and Delivery Drivers.\n\n` +
        `*(Note: The codebase for RSK is private, but the production demo is accessible.)*`,
      actions: [
        { label: "📦 View RSK Project", actionType: "project", payload: "rsk-quick-commerce" },
      ],
    }),
  },

  // 4. AI Voice Interview Taker / Vapi AI
  {
    keywords: [
      "ai interview", "aiinterview", "voice agent", "vapi", "audio", "webrtc", "speech",
      "interview taker", "evaluation", "score"
    ],
    response: () => ({
      text: `**AI Voice Interview Platform (AiInterviewTaker)** is an intelligent conversational agent conducting automated technical interviews.\n\n` +
        `**Key Highlights:**\n` +
        `• **Sub-250ms Voice Streaming**: Leverages **Vapi AI WebRTC** audio streams for low-latency bidirectional conversations.\n` +
        `• **Automated Evaluation**: Evaluates candidate speech responses, grammar, technical accuracy, and soft skills with structured multi-metric scoring.\n` +
        `• **Dynamic Questioning**: Generates adaptive questions tailored to the candidate's reported experience level.\n` +
        `• **Tech Stack**: React 19, TypeScript, Node.js, Vapi AI Web Client, and Tailwind CSS.`,
      actions: [
        { label: "🎙️ View AI Interview Project", actionType: "project", payload: "ai-interview-taker" },
        { label: "💻 View on GitHub", actionType: "project", payload: "https://github.com/amitbuilds18/AiInterviewTaker" },
      ],
    }),
  },

  // 5. AI Chatbot / Ollama / PDF Analysis
  {
    keywords: [
      "chatbot", "ollama", "pdf", "llm", "pdf-parse", "document chat", "ai chatbot"
    ],
    response: () => ({
      text: `**AI Chatbot & PDF Document Analyzer** is a conversational LLM application built with **Ollama** and document ingestion.\n\n` +
        `**Key Highlights:**\n` +
        `• **Local LLM Streaming**: Real-time markdown streaming responses via Ollama LLM with timeout safety guards.\n` +
        `• **PDF Ingestion & Analysis**: Text extraction using \`pdf-parse\` allowing users to chat with documents and export transcripts via \`jsPDF\`.\n` +
        `• **Hardened Security**: Token-bucket sliding window rate limiting (10 req/min auth, 50 req/min chat) mitigating abuse.\n` +
        `• **Persistence**: Multi-tenant session isolation in MongoDB with JWT Bearer authentication.`,
      actions: [
        { label: "🤖 View AI Chatbot Project", actionType: "project", payload: "ai-chatbot" },
        { label: "💻 View on GitHub", actionType: "project", payload: "https://github.com/amitbuilds18/ai-chatbot" },
      ],
    }),
  },

  // 6. StyleHub / E-Commerce / Stripe / Twilio
  {
    keywords: [
      "stylehub", "ecommerce", "e-commerce", "stripe", "twilio", "sku", "sms", "checkout"
    ],
    response: () => ({
      text: `**StyleHub** is a high-performance **Full-Stack TypeScript E-Commerce Platform**.\n\n` +
        `**Key Highlights:**\n` +
        `• **500+ SKU Catalog**: Fast multi-attribute filtering accelerated by 40% using PostgreSQL compound indexes.\n` +
        `• **Stripe Integration**: Stripe Checkout gateway with cryptographic webhook verification, reducing abandonment by 25%.\n` +
        `• **Twilio SMS Alerts**: Asynchronous worker dispatching order confirmation SMS within 3 seconds of purchase.\n` +
        `• **Architecture**: React 19, TypeScript, Express 5, and Neon PostgreSQL.`,
      actions: [
        { label: "🛍️ View StyleHub Demo", actionType: "project", payload: "stylehub-ecommerce" },
      ],
    }),
  },

  // 7. Travel Ecosystem / Microservices / RBAC / Docker
  {
    keywords: [
      "travel", "ecosystem", "rbac", "multi company", "multi-tenant", "recruiter", "docker",
      "mongo", "polyglot"
    ],
    response: () => ({
      text: `**Unified Travel Multi-Company Career Ecosystem** is an enterprise logistics and recruitment portal.\n\n` +
        `**Key Highlights:**\n` +
        `• **3-Tier RBAC**: Strict Role-Based Access Control securing Admin, Recruiter, and Employee permission boundaries across 4 corporate divisions.\n` +
        `• **Polyglot Database**: PostgreSQL for relational business transactions + MongoDB for flexible employee records (500+ records).\n` +
        `• **Sub-150ms Latency**: 12+ RESTful endpoints optimized with database cursor pagination, reducing latency by 38% (240ms down to 150ms).\n` +
        `• **Docker Orchestration**: Containerized microservices achieving 99.9% environment parity.`,
      actions: [
        { label: "🏢 View Travel Ecosystem", actionType: "project", payload: "travel-ecosystem" },
      ],
    }),
  },

  // 8. General Projects Overview
  {
    keywords: ["projects", "portfolio", "work", "built", "apps", "applications", "showcase"],
    response: () => ({
      text: `Amit has built several high-impact production applications showcasing full-stack and AI expertise:\n\n` +
        `1. **Navapay**: Fintech banking system with ACID row-level locking & Gemini AI.\n` +
        `2. **RSK Quick-Commerce**: Real-time delivery platform with Socket.IO live driver GPS tracking & Razorpay.\n` +
        `3. **AI Voice Interview Platform**: Real-time conversational voice agent powered by Vapi AI.\n` +
        `4. **AI Chatbot & PDF Analyzer**: Local LLM assistant with Ollama & document Q&A.\n` +
        `5. **StyleHub E-Commerce**: 500+ SKU store with Stripe webhooks & <3s Twilio SMS.\n` +
        `6. **Travel Career Ecosystem**: 3-tier RBAC multi-tenant enterprise portal in Docker.`,
      actions: [
        { label: "🚀 View All Projects", actionType: "project" },
        { label: "📄 Preview Resume", actionType: "resume" },
      ],
    }),
  },

  // 9. Tech Stack / Skills / Languages
  {
    keywords: [
      "tech stack", "stack", "skills", "technologies", "tools", "react", "node", "typescript",
      "javascript", "postgres", "sql", "tailwind", "express", "backend", "frontend", "database"
    ],
    response: () => ({
      text: `**Amit Kumar Ray's Core Technical Stack:**\n\n` +
        `• **Frontend**: React 19, TypeScript, Tailwind CSS, Redux Toolkit, React Router, Vite, HTML5/CSS3\n` +
        `• **Backend & APIs**: Node.js, Express 5, RESTful APIs, JWT Auth, bcrypt, Rate Limiting, Socket.IO WebSockets\n` +
        `• **Databases**: PostgreSQL (Neon Cloud), MongoDB, ACID Transactions, Row-Level Locking (\`FOR UPDATE\`), Compound Indexing\n` +
        `• **AI & LLM**: Google Gemini AI, Ollama (Local LLMs), Vapi AI (Voice Agents)\n` +
        `• **DevOps & Cloud**: Docker, GitHub Actions (CI/CD), Git & GitHub, Postman, Vercel\n` +
        `• **Payment & SMS**: Stripe, Razorpay, Twilio, MSG91`,
      actions: [
        { label: "⚡ Explore Skills Section", actionType: "skills" },
        { label: "📄 View Resume", actionType: "resume" },
      ],
    }),
  },

  // 10. Education / College / Degree / CGPA
  {
    keywords: [
      "education", "college", "degree", "btech", "b.tech", "cgpa", "marks", "university",
      "school", "sagar", "qualification", "graduate", "graduation"
    ],
    response: () => ({
      text: `**Amit Kumar Ray's Educational Background:**\n\n` +
        `• **Bachelor of Technology (B.Tech) in Computer Science & Engineering**\n` +
        `  *Sagar Group of Institutions (2020 – 2024)*\n` +
        `  *CGPA*: **7.0 / 10**\n` +
        `  *Core Focus*: Full-stack software engineering, Database Management Systems (PostgreSQL, ACID), Data Structures & Algorithms, Docker containerization.\n\n` +
        `• **Senior Secondary (Class XII)**: 62.8% (Science & Mathematics)\n` +
        `• **Secondary School (Class X)**: 74.6%`,
      actions: [
        { label: "📄 View Full Academic Resume", actionType: "resume" },
      ],
    }),
  },

  // 11. Contact / Email / Phone / LinkedIn / Social
  {
    keywords: [
      "contact", "email", "phone", "mobile", "call", "reach", "linkedin", "github", "connect",
      "address", "location"
    ],
    response: () => ({
      text: `You can reach out to Amit Kumar Ray directly via:\n\n` +
        `• ✉️ **Email**: [amitkumarpatel7562@gmail.com](mailto:amitkumarpatel7562@gmail.com)\n` +
        `• 📞 **Phone / WhatsApp**: [+91 9508121381](tel:+919508121381)\n` +
        `• 💼 **LinkedIn**: [linkedin.com/in/amit-kumar-ray-576b09320](https://www.linkedin.com/in/amit-kumar-ray-576b09320)\n` +
        `• 🐙 **GitHub**: [github.com/amitbuilds18](https://github.com/amitbuilds18)\n` +
        `• 📍 **Location**: India (Open to Remote / Relocation)`,
      actions: [
        { label: "✉️ Send a Message Now", actionType: "contact" },
        { label: "📄 Download Resume", actionType: "resume" },
      ],
    }),
  },

  // 12. Resume / CV / PDF
  {
    keywords: ["resume", "cv", "curriculum vitae", "pdf", "download resume"],
    response: () => ({
      text: `You can view Amit's complete verified resume directly inside your browser or download a copy for your records.\n\n` +
        `The resume details his B.Tech in CSE, production projects (Navapay, RSK, StyleHub, AI Voice Interview), technical skill proficiencies, and contact information.`,
      actions: [
        { label: "📄 Preview Resume (In-Browser)", actionType: "resume" },
        { label: "✉️ Contact Amit", actionType: "contact" },
      ],
    }),
  },

  // 13. Why should we hire Amit?
  {
    keywords: [
      "why hire", "why should we hire", "strengths", "what makes you unique",
      "stand out", "value", "fit", "benefit"
    ],
    response: () => ({
      text: `**Top 4 Reasons to Hire Amit Kumar Ray:**\n\n` +
        `1. **Production-Ready Full-Stack Experience**: Proven ability to take ideas from database architecture (PostgreSQL, row locking) to modern frontend interfaces (React 19, TypeScript).\n` +
        `2. **Concurrency & Reliability**: Hands-on experience solving real-world concurrency bugs with ACID guarantees, row-level locks, and compound indexing (40% query acceleration).\n` +
        `3. **Modern AI & Cloud Integrations**: Not just standard CRUD—Amit has built real-time WebSockets (Socket.IO), WebRTC voice agents (Vapi AI), and local LLMs (Ollama).\n` +
        `4. **Fast Learner & Immediate Joiner**: Ready to contribute from day one with zero notice period.`,
      actions: [
        { label: "📄 Preview Resume", actionType: "resume" },
        { label: "✉️ Contact Amit", actionType: "contact" },
      ],
    }),
  },

  // 14. Greetings & Friendly Small Talk
  {
    keywords: ["hi", "hello", "hey", "greetings", "namaste", "morning", "afternoon", "evening", "who are you"],
    response: () => ({
      text: `Hello! 👋 I'm **Amit's AI Assistant**.\n\n` +
        `I can help you explore Amit Kumar Ray's technical portfolio, project architectures (Navapay, RSK, AiInterview, etc.), tech stack (React 19, TypeScript, PostgreSQL), resume, and immediate job availability.\n\n` +
        `Feel free to ask any question or tap one of the suggested prompts below!`,
      actions: [
        { label: "🚀 Top Projects", actionType: "project" },
        { label: "⚡ Tech Stack", actionType: "skills" },
        { label: "📄 Preview Resume", actionType: "resume" },
      ],
    }),
  },
];

export function getAiResponse(userInput: string): { text: string; actions?: AiMessage["actions"] } {
  const cleanInput = userInput.toLowerCase().trim();

  // Find best pattern match based on keyword occurrences
  let bestScore = 0;
  let bestMatch: KnowledgePattern | null = null;

  for (const pattern of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of pattern.keywords) {
      if (cleanInput.includes(kw)) {
        // Boost longer, more specific keyword matches
        score += kw.length > 5 ? 3 : 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = pattern;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.response();
  }

  // Fallback response with helpful guide
  return {
    text: `I'd love to help with that! Here is a quick snapshot of **Amit Kumar Ray**:\n\n` +
      `• **Role**: Full Stack Developer specializing in React 19, TypeScript, Node.js, Express, and PostgreSQL.\n` +
      `• **Key Projects**: Navapay (Fintech ACID banking), RSK (Real-time Quick-Commerce & WebSockets), and AiInterviewTaker (Sub-250ms Voice AI).\n` +
      `• **Availability**: Available **immediately** for full-time software engineering roles.\n\n` +
      `You can ask me about his **projects**, **tech stack**, **fintech experience**, or **how to contact him**!`,
    actions: [
      { label: "🚀 Explore Projects", actionType: "project" },
      { label: "⚡ View Skills", actionType: "skills" },
      { label: "📄 Preview Resume", actionType: "resume" },
      { label: "✉️ Contact Amit", actionType: "contact" },
    ],
  };
}
