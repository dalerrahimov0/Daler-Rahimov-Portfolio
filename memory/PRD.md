# PRD — Daler Rahimov Portfolio

## Original Problem Statement
Build a premium portfolio for Daler Rahimov (Founder, AI Engineer, Data Architect, Product Builder) that communicates "this person builds real systems." Brand feel: Apple/Stripe/Linear/Vercel — calm, premium, purposeful. Story arc: Who → What → How → Why → Value. Sections: Hero (large typography, kinetic masked reveal), About (manifesto chapters), Expertise (4 areas), Featured Projects as case studies (TajKhona, Personal AI Architecture, UNK AI Chatbot, Medical Billing Predictor — each with Problem/Solution/Architecture/Tech/Outcome/Lessons), Experience (GA Enterprise AI, Data Architect UNK Libraries, IFC), Writing & Insights as a publication (PAI Parts 1–4), factual metrics only (250+ ChatGPT Enterprise users, 10+ classrooms, 2,484 library observations, production, three languages), Resume, Contact. Subtle purposeful interactions, no gimmicks.

## Architecture
- Frontend-only static portfolio (React 19 + Tailwind). Backend FastAPI kept as health-check only; no dynamic data needed yet.
- Fonts: Cabinet Grotesk (display), IBM Plex Sans (body), JetBrains Mono (labels/metrics).
- Motion: framer-motion (masked hero reveal, scroll reveals, self-drawing SVG architecture diagrams), lenis (smooth momentum scroll, respects prefers-reduced-motion), react-fast-marquee (metrics strip).
- Content centralized in `/app/frontend/src/lib/data.js` — edit there to update copy, links, images.

## User Personas
- Recruiter/hiring manager (30s → 2min → 5min evaluation journey)
- Founder/collaborator scouting a technical partner
- Peers reading the PAI series

## Implemented (July 2026)
- Dark obsidian theme (#0A0A0A), hairline borders, lavender-blue #5e6ad2 accent, grain texture on hero
- Kinetic hero: masked line-by-line reveal ("AI Engineer. Data Architect. Founder."), parallax network graphic
- Metrics marquee strip (factual only)
- About: 3 numbered manifesto chapters
- Expertise: 4-card asymmetric bento grid with what/why
- Projects: 4 editorial case studies with full arc; self-drawing SVG diagrams (PAI, TajKhona); hover grayscale→color image reveal
- Experience timeline + Library Analytics pipeline diagram
- Writing section: PAI Parts 1–4 list, Read the Series / View All Articles buttons, future topics
- Footer contact: email, LinkedIn, GitHub, resume button
- All interactive elements have data-testid; reduced-motion respected

## Placeholders (user to replace — pending their input)
- CONTACT in data.js: email `daler@dalerrahimov.com`, LinkedIn `/in/daler-rahimov`, GitHub `daler-rahimov` — ALL PLACEHOLDERS
- Resume link `/Daler-Rahimov-Resume.pdf` — no PDF uploaded yet (will 404)
- PAI article URLs — all `#` placeholders
- Project images — abstract Unsplash fallbacks; user plans to upload real screenshots

## Backlog
- P0: Swap in real screenshots + article URLs + real contact links + resume PDF
- P1: Mobile nav menu (links hidden on small screens currently)
- P1: TajKhona live-site link
- P2: Individual case-study detail pages, article hosting on-site

## Next Tasks
1. Collect user's screenshots, URLs, contact details, resume PDF
2. Wire real links into data.js
3. Add mobile menu
