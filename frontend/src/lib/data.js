export const CONTACT = {
  email: "rahimovd@lopers.unk.edu",
  emailSecondary: "drahimov04@gmail.com",
  linkedin: "https://www.linkedin.com/in/daler-rahimov-002970264/",
  github: "https://github.com/dalerrahimov0",
  resume: "/resume/Daler-Rahimov-Resume.pdf",
};

export const HERO_INFO = [
  { label: "Education", value: "MBA Candidate", org: "University of Nebraska at Kearney" },
  { label: "Current Role", value: "Enterprise AI Graduate Assistant", org: "University of Nebraska at Kearney" },
  { label: "Current Focus", value: "AI Systems & Products" },
];

export const ACTIVE_SYSTEMS = ["TajKhona", "Personal AI (PAI)", "Library Analytics", "Enterprise AI"];

export const STATUS_LINE = [
  "Enterprise AI @ UNK",
  "Founder @ TajKhona",
  "Former IFC (World Bank Group)",
  "Building Personal AI Architecture",
];

export const METRICS = [
  "250+ ChatGPT Enterprise users",
  "10+ classrooms trained",
  "2,484 library observations modeled",
  "Production deployment",
  "Microsoft Fabric architecture",
  "Full-stack AI products",
  "Enterprise AI rollouts",
  "Power BI dashboards",
  "Semantic models",
  "Personal AI Architecture",
  "Data pipelines & ETL",
];

export const TOOLS_SUBTITLE =
  "The technologies, platforms, and tools I use to design, build, and deploy production AI systems, data platforms, and modern web applications.";

export const TOOLS_STATEMENT =
  "Every technology listed above has been applied in real projects — from enterprise AI and institutional analytics to production software and Personal AI Architecture.";

export const TOOLS = [
  {
    title: "AI Engineering",
    icon: "bot",
    items: ["ChatGPT Enterprise", "Custom GPTs", "OpenAI API", "Prompt Engineering", "Pinecone", "LangChain", "RAG Pipelines"],
  },
  {
    title: "Data Engineering & Analytics",
    icon: "database",
    items: ["Microsoft Fabric", "Power BI", "Power Query", "DAX", "SQL", "ETL", "Data Modeling", "Python (pandas, NumPy)", "Excel", "Predictive Modeling", "Data Visualization"],
  },
  {
    title: "Software Engineering",
    icon: "code",
    items: ["Next.js", "React", "TypeScript", "JavaScript", "Supabase", "PostgreSQL", "MongoDB", "Flask", "Tailwind CSS"],
  },
  {
    title: "Cloud & DevOps",
    icon: "cloud",
    items: ["Git", "GitHub", "Vercel", "Docker", "Azure", "AWS", "Kubernetes"],
  },
];


export const PROJECTS = [
  {
    id: "tajkhona",
    index: "01",
    name: "TajKhona",
    tagline: "AI-powered PropTech startup for Tajikistan's rental market.",
    kind: "Live Product",
    accent: "gold",
    image: "/images/tajkhona/tajkhona-homepage.png",
    gallery: [
      { src: "/images/tajkhona/tajkhona-map-search.png", alt: "Interactive map-based apartment discovery" },
      { src: "/images/tajkhona/tajkhona-contact-channels.png", alt: "Integrated contact channels — WhatsApp and Telegram" },
    ],
    diagram: "tajkhona",
    live: "https://tajkhona.com",
    problem: "Tajikistan's rental market is fragmented across Telegram, Instagram, brokers, and informal networks. Renters face outdated listings, language barriers, limited transparency, and no centralized trusted platform.",
    solution: "Built TajKhona, a premium multilingual rental marketplace for Dushanbe: verified apartment listings, interactive maps, AI-assisted discovery, direct owner contact, admin moderation, and subscription billing — architected on Next.js, Supabase, and PostgreSQL, with Supabase Auth and the OpenAI API.",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Supabase", "PostgreSQL", "Supabase Auth", "OpenAI API", "SEO", "Internationalization", "PropTech"],
    features: [
      "Multilingual (EN/RU/TJ)", "AI-Assisted Workflows", "Interactive Maps", "Verified Listings",
      "Admin Moderation", "Availability Tracking", "Analytics Dashboard", "Direct Owner Contact",
      "Subscription Plans", "SEO Optimized", "Mobile First",
    ],
    outcome: [
      "Live in production at tajkhona.com — an actively developed startup, not a portfolio demo",
      "Serving Tajikistan's growing international and professional housing market in English, Russian, and Tajik",
      "Verified listings, admin moderation, and subscription billing running the business day to day",
    ],
    lesson: "Shipping TajKhona surfaced how much of a marketplace product is really about trust — verified listings, direct communication, and multilingual clarity mattered more to early users than any single feature.",
    positioning: "Unlike a traditional portfolio project, TajKhona is an actively developed startup focused on modernizing Tajikistan's rental ecosystem through AI, multilingual accessibility, trust-focused UX, and marketplace technology.",
  },
  {
    id: "pai",
    index: "02",
    name: "Personal AI Architecture",
    tagline: "A persistent AI operating environment for research, engineering, and long-term project memory.",
    kind: "Flagship — AI Systems Architecture",
    image: "/images/pai/pai-workspace.png",
    gallery: [
      { src: "/images/pai/pai-terminal-hodor.jpg", alt: "Hodor and Codex terminal interface for PAI" },
    ],
    diagram: "pai",
    writingHref: "https://dalerrahimov.substack.com/p/ai-is-powerful-now-the-problem-is",
    problem: "AI tools are individually powerful but collectively fragmented. Every new session starts from zero — context lives in scattered chat threads, and re-explaining a project becomes part of the job.",
    solution: "PAI is a structured architecture, not just a tool: persistent memory, reusable skills, and coordinated agents so work continues instead of restarting. My reference implementation, Hodor, runs as an Ubuntu-based agent with its own skills, notebooks, and persistent notes.",
    keyIdeas: [
      { title: "Continuity over memory", body: "the goal isn't remembering everything, it's picking up work exactly where it left off." },
      { title: "Skills as reusable units of work", body: "structured, repeatable capabilities instead of one-off prompts." },
      { title: "Agents and pipelines coordinate execution", body: "routing tasks to the right workflow instead of relying on one monolithic assistant." },
    ],
    tech: ["Skills", "Hooks", "Memory", "Agents", "Tools", "Pipelines", "Model-agnostic"],
    features: [
      "Persistent Project Memory", "AI Development Workflows", "Prompt & Skill Library", "Session Recording",
      "Knowledge Retrieval", "Multi-Agent Support", "Project Context Management", "Research Assistant",
    ],
    outcome: [
      "A published four-part series documenting the architecture as it's built",
      "A working reference implementation (Hodor) used daily for engineering, research, and decision support",
      "A framework that survives model changes because it's defined in concepts, not code",
    ],
    lesson: "Building PAI in public reinforced a simple idea: most “AI problems” are actually continuity problems. Once memory, skills, and agents are structured correctly, the model's raw intelligence stops being the bottleneck.",
  },
  {
    id: "unk-chatbot",
    index: "03",
    name: "UNK AI Chatbot",
    tagline: "Intelligent campus assistant for students and staff.",
    kind: "Featured AI Project",
    image: "/images/chatbot/chatbot-ai-answer.png",
    gallery: [
      { src: "/images/chatbot/chatbot-login.png", alt: "Login screen with role-based access" },
      { src: "/images/chatbot/chatbot-human-chat.png", alt: "Staff-student real-time chat" },
      { src: "/images/chatbot/chatbot-document-viewer.png", alt: "Document viewer showing sources" },
    ],
    diagram: null,
    github: "https://github.com/dalerrahimov0/UNK-AI-Chatbot",
    problem: "Students and staff often need quick access to accurate university information scattered across many different departments and web pages.",
    solution: "Built a full-stack AI chatbot grounding GPT answers in UNK documentation via Pinecone vector search: GPT handles generation, Pinecone retrieves relevant documents, MongoDB stores chat state, and Flask + WebSockets route the conversation to a human when the AI can't help — with role-based staff-student chat built in React and Tailwind CSS.",
    tech: ["Python", "Flask", "WebSockets", "React.js", "Tailwind CSS", "MongoDB", "Pinecone", "OpenAI GPT"],
    features: [
      "Role-Based Login", "Real-Time Staff-Student Handoff", "Document-Grounded Answers",
      "Source Document Viewer", "Pinecone Vector Search", "Session-Aware Chat",
    ],
    outcome: [
      "Improves access to campus resources and reduces support load",
      "Creates a scalable AI assistant model reusable across university services",
      "Real-time handoff from AI to a human staff member when the AI can't help",
    ],
    lesson: "The hardest part wasn't generating answers — it was knowing when to hand off to a human, which shaped the real-time chat handoff design.",
  },
  {
    id: "medical-billing",
    index: "04",
    name: "Medical Billing Predictor",
    tagline: "Predictive analytics model for healthcare billing risk.",
    kind: "Analytics Project",
    image: "/images/medical-billing/medbilling-binomial.png",
    gallery: [
      { src: "/images/medical-billing/medbilling-irt.png", alt: "IRT model of billing error risk" },
      { src: "/images/medical-billing/medbilling-us-trend.png", alt: "U.S. billing error reports by year and provider type" },
      { src: "/images/medical-billing/medbilling-bc-incidence.png", alt: "Breast cancer incidence and mortality context" },
    ],
    diagram: null,
    problem: "Medical billing errors can compound across repeated procedures, creating risk for patients, providers, and administrative workflows.",
    solution: "Built a probability-based analytics project using binomial modeling and Item Response Theory concepts in Python and Excel to estimate how billing error risk increases across procedure counts — layered from single-procedure risk up to cumulative, patient-level exposure.",
    tech: ["Python", "Excel", "Data Visualization", "Probability Modeling", "Item Response Theory", "Healthcare Analytics"],
    features: [
      "Binomial Risk Modeling", "IRT-Based Error Modeling", "Cumulative Risk Visualization", "U.S. Billing Error Trend Analysis",
    ],
    outcome: [
      "Shows how modest per-procedure error rates compound into high cumulative risk",
      "Supports better audit triggers and workflow checks",
    ],
    lesson: "A small per-procedure error rate compounds into a large cumulative risk — a reminder that risk models need to be evaluated at the sequence level, not just the single event level.",
  },
];

export const EXPERIENCE_FEATURED = [
  {
    id: "grad-assistant",
    current: true,
    role: "Graduate Assistant",
    org: "Office of Academic Innovation",
    orgTag: "University of Nebraska Kearney",
    period: "Aug 2025 — Present",
    note: "Full-time graduate role",
    focus: "AI Implementation, Power BI, Data Architecture & Educational Innovation",
    overview: "As a Graduate Assistant within the Office of Academic Innovation, I help drive AI adoption, analytics initiatives, and data-informed decision making across the University of Nebraska at Kearney.",
    points: [
      "Support enterprise ChatGPT implementation and user onboarding.",
      "Develop CustomGPT solutions for academic and administrative workflows.",
      "Design Power BI dashboards that transform institutional data into actionable insights.",
      "Build reporting frameworks that improve visibility into student success and organizational performance.",
      "Create training materials, workshops, and prompt frameworks for faculty and staff.",
    ],
    tech: ["Power BI", "ChatGPT Enterprise", "OpenAI", "CustomGPT", "Prompt Engineering", "Reporting", "Analytics", "Training & Workshops"],
    highlights: [
      "AI adoption and enablement",
      "Dashboard development",
      "CustomGPT development",
      "Faculty & staff training",
      "Institutional analytics",
    ],
    metricsLabel: "Enterprise AI Rollout",
    metricsSubLabel: "Adoption Impact",
    metrics: [
      { value: "250+", label: "ChatGPT Enterprise users onboarded" },
      { value: "10+", label: "Classrooms supported" },
    ],
  },
  {
    id: "data-architect",
    current: true,
    role: "Data Architect",
    org: "UNK Libraries",
    orgTag: "University of Nebraska Kearney",
    period: "Aug 2025 — Present",
    note: "Concurrent with Graduate Assistantship",
    focus: "Data Architecture, ETL Pipelines & Library Analytics",
    overview: "Designing the UNK Library's data ecosystem — from raw survey and space-usage data to a governed semantic model that powers institutional decision-making.",
    points: [
      "Architect data pipelines connecting Qualtrics survey data to Microsoft Fabric.",
      "Build ETL workflows and Power Query transformations for reliable, repeatable reporting.",
      "Design semantic models that give the library a single, trusted source of truth.",
      "Develop Power BI dashboards for library leadership and space-planning decisions.",
      "Analyze library space utilization to support data-informed operational decisions.",
      "Plan the library's AI-powered knowledge infrastructure for information discovery.",
    ],
    tech: ["Microsoft Fabric", "Power Query", "Power BI", "Semantic Modeling", "ETL Pipelines", "Qualtrics", "Data Architecture", "SQL"],
    highlights: [
      "Data architecture & modeling",
      "ETL pipeline design",
      "Power BI dashboard development",
      "Library space utilization analytics",
      "Data-informed decision support",
    ],
    metricsLabel: "Library Analytics Pipeline",
    metricsSubLabel: "Systems Shipped",
    diagram: true,
    metrics: [{ value: "2,484", label: "Library observations analyzed" }],
  },
];

export const EXPERIENCE_SUPPORTING = [
  {
    id: "safety-center",
    tag: "Operations",
    role: "Administrative Assistant",
    org: "Nebraska Safety Center",
    period: "2023 – 2024",
    overview: "Supported statewide driver safety initiatives and program logistics, including mapping every test route across Nebraska towns to ensure statewide consistency and accessibility.",
    pointsLabel: "Impact",
    points: [
      "Statewide route mapping & documentation",
      "Process improvement and operational coordination",
      "Compliance-ready records and data accuracy",
      "Documentation systems and workflow optimization",
    ],
    skillsLabel: "Skills Used",
    tech: ["Microsoft Office", "Data Entry & QA", "Documentation", "Logistics", "Operations"],
  },
  {
    id: "soccer-club",
    tag: "Leadership",
    role: "President",
    org: "UNK Men's Soccer Club",
    period: "2022 – Present",
    overview: "Founded and continue to lead the university's men's soccer club, overseeing operations, recruitment, fundraising, scheduling, and competitive events across 10+ states.",
    pointsLabel: "Leadership Highlights",
    points: [
      "Built organization from the ground up",
      "Managed 20+ members and team operations",
      "Coordinated interstate competitions & travel",
      "Led fundraising and campus outreach initiatives",
    ],
    skillsLabel: "Skills",
    tech: ["Leadership", "Project Management", "Operations", "Team Building", "Budget Coordination"],
  },
  {
    id: "ifc",
    tag: "World Bank Group",
    role: "Data Analytics Intern",
    org: "International Finance Corporation (IFC)",
    period: "Tajikistan",
    overview: "Supported analytical and business-oriented initiatives related to banking and financial-sector operations in Tajikistan, working within the World Bank Group's IFC team.",
    pointsLabel: "Impact",
    points: [
      "Analyzed large financial datasets",
      "Created executive-friendly visualizations",
      "Supported decision-making through data insights",
      "Developed understanding of financial systems",
    ],
    skillsLabel: "Skills",
    tech: ["Data Analytics", "Excel", "Visualization", "Business Analysis", "Banking Systems"],
  },
];

export const TIMELINE = [
  {
    period: "Jan 2022 — Dec 2022",
    tag: "Leadership",
    icon: "flag",
    title: "Intramural Sports Referee",
    org: "University of Nebraska at Kearney",
    body: "Managed intramural sporting events by enforcing rules, maintaining fair play, and making real-time decisions in fast-paced environments. Developed leadership, communication, and conflict-resolution skills.",
  },
  {
    period: "Aug 2022 — Dec 2022",
    tag: "Analytics",
    icon: "book",
    title: "Statistics Learning Tutor",
    org: "University of Nebraska at Kearney",
    body: "Provided one-on-one academic support in statistics and quantitative reasoning, helping students strengthen analytical thinking and problem-solving skills.",
  },
  {
    period: "2022 — Present",
    tag: "Leadership",
    icon: "users",
    title: "Founded UNK Men's Soccer Club",
    org: "University of Nebraska at Kearney",
    body: "Founded and continue to lead the university's men's soccer club, managing 20+ members, organizing matches, coordinating tournaments, and leading fundraising efforts.",
  },
  {
    period: "Sep 2023 — May 2024",
    tag: "Operations",
    icon: "shield",
    title: "Administrative Officer",
    org: "Nebraska Safety Center",
    body: "Supported statewide transportation safety and driver education initiatives across Nebraska, including route mapping, documentation, workflow coordination, and operational process improvement.",
  },
  {
    period: "2024",
    tag: "World Bank Group",
    icon: "globe",
    title: "Data Analytics Intern",
    org: "International Finance Corporation (World Bank Group)",
    body: "Worked with banking and financial-sector datasets in Tajikistan, creating visualizations and analytical summaries to support business understanding and decision-making.",
  },
  {
    period: "May 2025",
    tag: "Education",
    icon: "graduation",
    title: "B.S. Information Technology",
    org: "University of Nebraska at Kearney",
    body: "Completed a B.S. in Information Technology with a minor in Data Analytics, building a foundation in databases, web development, predictive modeling, analytics, and systems design.",
  },
  {
    period: "2025",
    tag: "AI Project",
    icon: "bot",
    title: "Built UNK AI Chatbot",
    org: "Capstone / AI Project",
    body: "Designed and developed a full-stack AI-powered campus assistant using GPT, Pinecone, MongoDB, Flask, React, Tailwind CSS, and WebSockets to support student and staff information access.",
  },
  {
    period: "Aug 2025 — Present",
    tag: "Current Role",
    icon: "brain",
    title: "Enterprise AI & Data Analytics Graduate Assistant",
    org: "Office of Academic Innovation, UNK",
    body: "Support enterprise AI adoption, ChatGPT implementation, Power BI reporting, data architecture, CustomGPT development, and AI-enabled workflows for academic and administrative use.",
    current: true,
  },
  {
    period: "2025 — Present",
    tag: "Startup",
    icon: "building",
    title: "Founder of TajKhona",
    org: "AI-Powered PropTech Startup",
    body: "Founded and continue building TajKhona, a premium multilingual rental marketplace modernizing apartment discovery in Tajikistan through verified listings, AI-assisted workflows, and marketplace technology.",
    gold: true,
  },
  {
    period: "Aug 2025 — May 2027",
    tag: "Education",
    icon: "graduation",
    title: "MBA Candidate",
    org: "University of Nebraska at Kearney",
    body: "Pursuing an MBA focused on business analytics, strategy, innovation, leadership, and technology-driven organizational decision-making.",
  },
  {
    period: "Today",
    tag: "Current Focus",
    icon: "zap",
    title: "Building AI, Analytics & Digital Infrastructure",
    org: "Current Professional Focus",
    body: "Focused on building intelligent systems, analytics platforms, AI infrastructure, and digital products that improve how organizations and people interact with information.",
    current: true,
  },
];

export const ARTICLES = [
  {
    part: "Part 1",
    date: "Jul 2, 2026",
    title: "AI Is Powerful Now. The Problem Is That It's Fragmented.",
    desc: "AI tools are everywhere, but the workflow is scattered. PAI is a way to bring continuity, memory, and structure back into the work.",
    url: "https://dalerrahimov.substack.com/p/ai-is-powerful-now-the-problem-is",
  },
  {
    part: "Part 2",
    date: "Aug 11, 2026",
    title: "AI Is Smart. The Real Problem Is That It Still Forgets the Work.",
    desc: "Why continuity matters more than memory when AI becomes part of real work.",
    url: "https://dalerrahimov.substack.com/p/ai-is-smart-the-real-problem-is-that-it-forgets-the-work",
  },
  {
    part: "Part 3",
    date: "Aug 20, 2026",
    title: "From AI Conversations to an AI Working Environment",
    desc: "How memory, skills, workflows, and project context turn isolated sessions into continuous work.",
    url: "https://dalerrahimov.substack.com/p/from-ai-conversations-to-an-ai-working",
  },
  {
    part: "Part 4",
    date: "Aug 26, 2026",
    title: "One Session, Start to Finish",
    desc: "A look at what makes continuity possible while the work is actually happening.",
    url: "https://dalerrahimov.substack.com/p/one-session-start-to-finish",
  },
];

export const WRITING_LINKS = {
  series: "https://dalerrahimov.substack.com/p/ai-is-powerful-now-the-problem-is",
  archive: "https://dalerrahimov.substack.com/archive",
};

export const FUTURE_TOPICS = ["Enterprise AI", "Data Engineering", "Microsoft Fabric", "TajKhona", "AI Engineering"];

export const MANIFESTO = [
  {
    n: "01",
    title: "Why I build systems",
    body: "My goal is to build intelligent systems that help organizations make better decisions, improve efficiency, and unlock the full value of their data. Software is the highest-leverage way to turn an idea into something that keeps working after you stop thinking about it.",
  },
  {
    n: "02",
    title: "What interests me",
    body: "I work at the intersection of artificial intelligence, analytics, and real products — from university-wide AI adoption and institutional data architecture to TajKhona and Personal AI. Messy, institutional, human problems interest me more than demos.",
  },
  {
    n: "03",
    title: "Why AI",
    body: "AI is a leverage tool, not a strategy. Most “AI problems” I've run into — rolling out ChatGPT Enterprise to 250+ users, grounding a campus chatbot in real documents, building PAI — turn out to be continuity and trust problems: does the system remember, and can people rely on what it tells them. That's the part worth building well.",
  },
  {
    n: "04",
    title: "Why architecture",
    body: "Every intelligent system stands or falls on the data architecture beneath it. A Power BI dashboard is only as trustworthy as the pipeline that feeds it — which is why I spend as much time on semantic models, ETL, and governed pipelines as I do on the reports people actually see.",
  },
  {
    n: "05",
    title: "Why products",
    body: "Shipping is a discipline, not a finish line. TajKhona taught me that trust — verified listings, direct communication, multilingual clarity — matters more to real users than any single feature, and that lesson now shapes how I approach every system I build.",
  },
  {
    n: "06",
    title: "The thread through everything",
    body: "Continuity over novelty. Whether it's a Fabric lakehouse, a personal AI system, or a production marketplace, most “hard” problems turn out to be continuity problems — memory, structure, and trust that survive past the first session. Get that right and intelligence stops being the bottleneck.",
  },
];
