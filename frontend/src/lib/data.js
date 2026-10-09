export const CONTACT = {
  email: "rahimovd@lopers.unk.edu",
  emailSecondary: "drahimov04@gmail.com",
  linkedin: "https://www.linkedin.com/in/daler-rahimov/",
  github: "https://github.com/dalerrahimov0",
  resume: "/resume/Daler-Rahimov-Resume.pdf",
};

export const HERO_INFO = [
  { label: "Education", value: "MBA Candidate", org: "University of Nebraska at Kearney" },
  { label: "Current Role", value: "Graduate Assistant, Enterprise AI", org: "Office of Academic Innovation, UNK" },
  { label: "Founder", value: "TajKhona", org: "470+ monthly active users" },
];

export const ACTIVE_SYSTEMS = ["TajKhona", "Enterprise AI", "UNK AI Chatbot", "Personal AI (PAI)"];

export const STATUS_LINE = [
  "Founder @ TajKhona",
  "Enterprise AI @ UNK",
  "MBA Candidate",
  "Former IFC (World Bank Group)",
];

export const METRICS = [
  "470+ monthly active users — TajKhona",
  "Users across 8+ countries",
  "Growth driven primarily through organic search",
  "250+ enterprise AI users",
  "10+ custom GPTs across 10+ classrooms",
  "2,484 library observations analyzed",
  "Production startup — EN / RU / TJ",
  "Microsoft Fabric architecture",
  "Semantic models",
  "ETL pipelines",
  "Power BI dashboards",
  "RAG chatbot live on UNK's website",
  "Personal AI Architecture",
];

export const TOOLS_SUBTITLE =
  "The technologies, platforms, and tools I use to design, build, and deploy production AI systems, data platforms, and modern web applications.";

export const TOOLS_STATEMENT =
  "Every technology listed above has been applied in real projects — from enterprise AI and institutional analytics to production software and Personal AI Architecture.";

export const TOOLS = [
  {
    title: "AI Engineering",
    icon: "bot",
    items: ["ChatGPT Edu", "Custom GPTs", "OpenAI API", "Prompt Engineering", "Pinecone", "LangChain", "RAG Pipelines"],
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
    items: ["Git", "GitHub", "Vercel", "Docker"],
  },
];


export const PROJECTS = [
  {
    id: "tajkhona",
    index: "01",
    name: "TajKhona",
    tagline: "A production multilingual rental marketplace serving 470+ monthly active users across 8+ countries.",
    kind: "Production Startup",
    accent: "gold",
    image: "/images/tajkhona/tajkhona-homepage.png",
    gallery: [
      { src: "/images/tajkhona/tajkhona-map-search.png", alt: "Interactive map-based apartment discovery" },
      { src: "/images/tajkhona/tajkhona-contact-channels.png", alt: "Integrated contact channels — WhatsApp and Telegram" },
    ],
    diagram: "tajkhona",
    live: "https://tajkhona.com",
    problem: "Tajikistan's rental market is fragmented across Telegram, Instagram, brokers, and informal networks. Renters face outdated listings, language barriers, limited transparency, and no centralized trusted platform.",
    solution: "Founded and launched TajKhona, a production rental marketplace in English, Russian, and Tajik: AI-assisted discovery, interactive maps, admin-moderated listings, direct owner contact, and subscription billing. I architected the platform end-to-end — database design, authentication, deployment, and analytics — on Next.js, TypeScript, Supabase, and PostgreSQL, with Supabase Auth and the OpenAI API.",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Supabase", "PostgreSQL", "Supabase Auth", "OpenAI API", "i18n", "SEO"],
    features: [
      "Multilingual (EN/RU/TJ)", "AI-Assisted Discovery", "Interactive Maps", "Verified Listings",
      "Admin Moderation", "Availability Tracking", "Analytics Dashboard", "Direct Owner Contact",
      "Subscription Plans", "SEO Optimized", "Mobile First",
    ],
    outcome: [
      "470+ monthly active users across 8+ countries in the last 30 days — real users, not a portfolio demo",
      "Growth driven primarily through organic search, with referral traffic from AI assistants including ChatGPT",
      "Live in production at tajkhona.com in English, Russian, and Tajik",
      "Admin-moderated listings and subscription billing running the business day to day",
    ],
    lesson: "Shipping TajKhona surfaced how much of a marketplace product is really about trust — verified listings, direct communication, and multilingual clarity mattered more to early users than any single feature.",
    positioning: "Unlike a traditional portfolio project, TajKhona is a production startup with real users across 8+ countries, modernizing Tajikistan's rental ecosystem through AI, multilingual accessibility, trust-focused UX, and marketplace technology.",
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
    tagline: "A full-stack RAG assistant deployed on UNK's website for real-time academic and administrative Q&A.",
    kind: "Deployed AI System",
    image: "/images/chatbot/chatbot-ai-answer.png",
    gallery: [
      { src: "/images/chatbot/chatbot-login.png", alt: "Login screen with role-based access" },
      { src: "/images/chatbot/chatbot-human-chat.png", alt: "Staff-student real-time chat" },
      { src: "/images/chatbot/chatbot-document-viewer.png", alt: "Document viewer showing sources" },
    ],
    diagram: null,
    github: "https://github.com/dalerrahimov0/UNK-AI-Chatbot",
    problem: "Students and staff often need quick access to accurate university information scattered across many different departments and web pages.",
    solution: "Built and deployed a full-stack retrieval-augmented generation (RAG) chatbot on UNK's website: Pinecone vector search retrieves relevant university documents, OpenAI GPT generates grounded answers, MongoDB stores chat state, and Flask + WebSockets power real-time, role-based staff-student chat — routing the conversation to a human when the AI can't help. The frontend is built in React and Tailwind CSS.",
    tech: ["Python", "Flask", "WebSockets", "React.js", "Tailwind CSS", "MongoDB", "Pinecone", "OpenAI GPT"],
    features: [
      "Role-Based Login", "Real-Time Staff-Student Handoff", "Document-Grounded Answers",
      "Source Document Viewer", "Pinecone Vector Search", "RAG Pipeline", "Session-Aware Chat",
    ],
    outcome: [
      "Deployed on UNK's website for real-time academic and administrative Q&A",
      "Real-time handoff from AI to a human staff member when the AI can't help",
      "One document-grounded entry point to campus information spread across many departments",
      "A reusable RAG pattern for other university services",
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
      "Produced visualizations translating the model into audit recommendations",
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
    focus: "Enterprise AI Implementation, Custom GPT Development & Power BI Reporting",
    overview: "I lead enterprise AI implementation in the Office of Academic Innovation — rolling out ChatGPT Edu to 250+ users, deploying custom GPTs into 10+ classrooms, and building the Power BI reporting that informs leadership planning at the University of Nebraska at Kearney.",
    evidence: ["250+ enterprise AI users", "10+ custom GPTs deployed", "10+ classrooms"],
    points: [
      "Led the enterprise ChatGPT Edu rollout to 250+ users — owning licensing, onboarding, and faculty/student enablement campuswide.",
      "Built and deployed 10+ custom GPTs across 10+ classrooms, embedding AI into academic and administrative workflows.",
      "Designed Power BI dashboards for institutional reporting and leadership planning.",
      "Developed AI training workshops for faculty and staff, improving digital literacy and workflow integration across departments.",
    ],
    techGroups: [
      { domain: "AI", items: ["ChatGPT Edu", "OpenAI", "Custom GPTs", "Prompt Engineering"] },
      { domain: "Analytics", items: ["Power BI", "Institutional Reporting"] },
      { domain: "Enablement", items: ["AI Training Workshops"] },
    ],
    highlights: [
      { text: "Enterprise AI rollout", fact: "250+ users supported" },
      { text: "Licensing & onboarding", fact: "Campuswide enablement" },
      { text: "Custom GPT development", fact: "10+ GPTs across 10+ classrooms" },
      { text: "Power BI dashboards", fact: "Leadership planning" },
      { text: "Faculty & staff enablement", fact: "AI training workshops" },
    ],
    metricsLabel: "Enterprise AI Rollout",
    metricsSubLabel: "Adoption Impact",
    metrics: [
      { value: "250+", label: "Enterprise AI users supported" },
      { value: "10+", label: "Classrooms with custom GPTs" },
    ],
    connector: "This enterprise AI rollout shaped the systems-first approach behind the Personal AI Architecture project — treating AI adoption as infrastructure, not a one-off tool.",
  },
  {
    id: "data-architect",
    current: false,
    role: "Data Architect",
    org: "UNK Libraries",
    orgTag: "University of Nebraska Kearney",
    period: "May 2026 — Aug 2026",
    note: "Summer role",
    focus: "Microsoft Fabric Data Architecture, ETL Pipelines & Semantic Models",
    overview: "Designed and implemented UNK Libraries' Microsoft Fabric data architecture — taking raw survey and space-utilization data through ETL pipelines into governed semantic models and Power BI reporting for data-informed facility planning.",
    evidence: ["2,484 observations analyzed", "Microsoft Fabric architecture", "Power BI semantic models"],
    points: [
      "Designed and implemented a Microsoft Fabric data architecture — pipelines, data structures, and semantic models — supporting reliable analytics and reporting.",
      "Built ETL pipelines connecting Qualtrics survey data to Microsoft Fabric, with Power Query transformations for repeatable reporting.",
      "Designed semantic models establishing a single, trusted source of truth for library analytics.",
      "Built Power BI reports, dashboards, and visualizations tracking library space utilization.",
      "Analyzed 2,484 space-utilization observations to support data-informed facility planning.",
      "Architected the roadmap for an AI-powered knowledge infrastructure supporting information discovery.",
    ],
    techGroups: [
      { domain: "Architecture", items: ["Microsoft Fabric", "Data Architecture", "Semantic Models"] },
      { domain: "Development", items: ["Power Query", "ETL Pipelines", "SQL"] },
      { domain: "Analytics", items: ["Power BI", "Qualtrics"] },
    ],
    highlights: [
      { text: "Data architecture & modeling", fact: "Microsoft Fabric semantic models" },
      { text: "ETL pipeline design", fact: "Qualtrics → Microsoft Fabric pipeline" },
      { text: "Power BI reporting", fact: "Space-utilization dashboards" },
      { text: "Library space utilization analytics", fact: "2,484 observations analyzed" },
      { text: "Data-informed decision support", fact: "Facility planning" },
    ],
    metricsLabel: "Library Analytics Pipeline",
    metricsSubLabel: "Systems Shipped",
    diagram: true,
    metrics: [{ value: "2,484", label: "Library observations analyzed" }],
    connector: "The same discipline — governed pipelines feeding semantic models — underpins the analytics and AI systems on this page.",
  },
];

export const EXPERIENCE_SUPPORTING = [
  {
    id: "safety-center",
    tag: "Operations",
    role: "Administrative Officer",
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
    overview: "Founded the university's men's soccer club from scratch and grew it to 20+ members — organizing intercollegiate competitions across 10+ states and managing recruitment, fundraising, scheduling, and logistics.",
    pointsLabel: "Leadership Highlights",
    points: [
      "Founded the club from scratch",
      "Grew membership to 20+ players",
      "Organized intercollegiate competitions across 10+ states",
      "Managed fundraising and travel logistics",
    ],
    skillsLabel: "Skills",
    tech: ["Leadership", "Project Management", "Operations", "Team Building", "Budget Coordination"],
  },
  {
    id: "ifc",
    tag: "World Bank Group",
    role: "Data Analytics Intern",
    org: "International Finance Corporation (IFC)",
    period: "Summer 2024 · Tajikistan",
    overview: "Analyzed large banking datasets within the World Bank Group's IFC team in Tajikistan, delivering executive-facing visualizations and business summaries to senior IFC stakeholders.",
    pointsLabel: "Impact",
    points: [
      "Analyzed large banking datasets",
      "Delivered executive-facing visualizations",
      "Wrote business summaries for senior IFC stakeholders",
      "Cross-functional exposure to financial systems that motivated the MBA",
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
    body: "Founded the university's men's soccer club from scratch, grew it to 20+ members, and organized intercollegiate competitions across 10+ states — managing fundraising and logistics.",
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
    period: "Summer 2024",
    tag: "World Bank Group",
    icon: "globe",
    title: "Data Analytics Intern",
    org: "International Finance Corporation (World Bank Group)",
    body: "Analyzed large banking datasets in Tajikistan and delivered executive-facing visualizations and business summaries to senior IFC stakeholders — the cross-functional exposure that motivated pursuing an MBA.",
  },
  {
    period: "May 2025",
    tag: "Education",
    icon: "graduation",
    title: "B.S. Information Technology",
    org: "University of Nebraska at Kearney",
    body: "Completed a B.S. in Information Technology with a minor in Data Analytics, with coursework in big data visualization, predictive modeling, web app development, database systems, and e-commerce information systems.",
  },
  {
    period: "2025 — Present",
    tag: "AI Project",
    icon: "bot",
    title: "Built UNK AI Chatbot",
    org: "Deployed on UNK's website",
    body: "Built and deployed a full-stack RAG chatbot on UNK's website — Pinecone vector search, OpenAI GPT, MongoDB, Flask, WebSockets, React, and Tailwind CSS — for real-time academic and administrative Q&A with role-based staff-student chat.",
  },
  {
    period: "Aug 2025 — Present",
    tag: "Current Role",
    icon: "brain",
    title: "Graduate Assistant — Enterprise AI",
    org: "Office of Academic Innovation, UNK",
    body: "Leading the enterprise ChatGPT Edu rollout to 250+ users, deploying 10+ custom GPTs across 10+ classrooms, building Power BI dashboards for leadership planning, and running AI training workshops for faculty and staff.",
    current: true,
  },
  {
    period: "2026 — Present",
    tag: "Startup",
    icon: "building",
    title: "Founder of TajKhona",
    org: "Production Startup",
    body: "Founded and launched TajKhona, a production multilingual (EN/RU/TJ) rental marketplace now serving 470+ monthly active users across 8+ countries. Growth driven primarily through organic search, with referral traffic from AI assistants including ChatGPT.",
    gold: true,
  },
  {
    period: "May 2026 — Aug 2026",
    tag: "Data Architecture",
    icon: "database",
    title: "Data Architect",
    org: "UNK Libraries",
    body: "Designed and implemented a Microsoft Fabric data architecture — ETL pipelines, semantic models, and Power BI reporting — analyzing 2,484 space-utilization observations to support data-informed facility planning.",
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
    body: "AI is a leverage tool, not a strategy. Most “AI problems” I've run into — rolling out ChatGPT Edu to 250+ users, grounding a campus chatbot in real documents, building PAI — turn out to be continuity and trust problems: does the system remember, and can people rely on what it tells them. That's the part worth building well.",
  },
  {
    n: "04",
    title: "Why architecture",
    body: "Every intelligent system stands or falls on the data architecture beneath it. A Power BI dashboard is only as trustworthy as the pipeline that feeds it — which is why I spend as much time on semantic models, ETL, and governed pipelines as I do on the reports people actually see.",
  },
  {
    n: "05",
    title: "Why products",
    body: "Shipping is a discipline, not a finish line. TajKhona — now serving 470+ monthly active users across 8+ countries — taught me that trust — verified listings, direct communication, multilingual clarity — matters more to real users than any single feature, and that lesson now shapes how I approach every system I build.",
  },
  {
    n: "06",
    title: "The thread through everything",
    body: "Continuity over novelty. Whether it's a Microsoft Fabric lakehouse, a personal AI system, or a production marketplace, most “hard” problems turn out to be continuity problems — memory, structure, and trust that survive past the first session. Get that right and intelligence stops being the bottleneck.",
  },
];

export const GRAPH = {
  center: { id: "core", label: "Systems Thinking" },
  concepts: [
    {
      id: "systems",
      label: "Systems",
      angle: 0,
      primary: "Personal AI Architecture",
      details: ["Hodor", "Continuity over Memory"],
    },
    {
      id: "products",
      label: "Products",
      angle: 51.4,
      primary: "TajKhona",
      details: ["Founder", "470+ MAU", "8+ Countries"],
    },
    {
      id: "enterprise",
      label: "Enterprise",
      angle: 102.8,
      primary: "Graduate Assistant",
      details: ["ChatGPT Edu", "250+ Users", "10+ Classrooms"],
    },
    {
      id: "architecture",
      label: "Architecture",
      angle: 154.3,
      peers: ["PAI", "Library Analytics", "TajKhona", "Enterprise AI"],
    },
    {
      id: "research",
      label: "Research",
      angle: 205.7,
      primary: "PAI Writing Series",
      details: ["4 Parts Published", "Continuity Problem"],
    },
    {
      id: "analytics",
      label: "Analytics",
      angle: 257.1,
      primary: "Library Observations",
      details: ["2,484", "Microsoft Fabric", "Power BI"],
    },
    {
      id: "ai",
      label: "AI",
      angle: 308.6,
      primary: "UNK Chatbot",
      details: ["Pinecone + GPT", "Document-Grounded Answers"],
    },
  ],
};
