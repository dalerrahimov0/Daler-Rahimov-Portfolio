import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, FileDown } from "lucide-react";
import { HERO_INFO, ACTIVE_SYSTEMS, STATUS_LINE, CONTACT } from "@/lib/data";

const LINES = ["Daler Rahimov"];

const NetworkGraphic = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const nodes = [
    { cx: 200, cy: 60 }, { cx: 90, cy: 150 }, { cx: 310, cy: 150 },
    { cx: 40, cy: 280 }, { cx: 200, cy: 250 }, { cx: 360, cy: 280 },
  ];
  const edges = [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5],[4,3],[4,5]];
  return (
    <div ref={ref} className="absolute right-0 top-1/2 -translate-y-1/2 w-[420px] h-[420px] opacity-40 hidden lg:block pointer-events-none" aria-hidden="true">
      <motion.svg style={{ y }} viewBox="0 0 400 340" className="w-full h-full">
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy}
            stroke="#5e6ad2" strokeWidth="1" strokeOpacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 1 + i * 0.12, ease: "easeOut" }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.cx} cy={n.cy} r={i === 4 ? 7 : 4}
            fill={i === 4 ? "#5e6ad2" : "#0a0a0a"}
            stroke="#5e6ad2" strokeWidth="1.5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
          />
        ))}
      </motion.svg>
    </div>
  );
};

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" data-testid="hero-section" className="grain relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 w-full relative z-10 pt-24">
        <h1 className="font-display font-bold text-white tracking-tighter leading-[1.02] text-5xl sm:text-6xl lg:text-8xl">
          {LINES.map((line, i) => (
            <span key={line} className="mask-line">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mt-6 font-display font-medium text-zinc-300 tracking-tight text-xl sm:text-2xl lg:text-3xl"
          data-testid="hero-identity"
        >
          AI Engineer <span className="text-[#5e6ad2]">•</span> Data Architect <span className="text-[#5e6ad2]">•</span> Founder
        </motion.p>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-8 max-w-xl text-sm sm:text-base text-zinc-500 leading-relaxed"
          data-testid="hero-tagline"
        >
          Building AI systems, data platforms, and production software that connect
          strategy, data, and execution.
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); window.__lenis ? window.__lenis.scrollTo("#projects", { offset: -136 }) : document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
            data-testid="hero-view-work-button"
            className="focus-ring inline-flex items-center gap-2 bg-white text-black font-medium text-sm px-7 py-3.5 hover:bg-zinc-200 transition-colors duration-200"
          >
            View my work <ArrowDown size={15} />
          </a>
          <a
            href={CONTACT.resume}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-resume-button"
            className="focus-ring inline-flex items-center gap-2 border border-zinc-800 hover:border-zinc-500 text-white text-sm px-7 py-3.5 transition-colors duration-200"
          >
            Resume <FileDown size={15} />
          </a>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl"
          data-testid="hero-info-cards"
        >
          {HERO_INFO.map((c) => (
            <div key={c.label} className="border border-white/5 bg-[#0f1011] p-5">
              <p className="font-mono2 text-xs uppercase tracking-[0.2em] text-zinc-500">{c.label}</p>
              <p className="font-display font-medium text-white text-sm sm:text-base mt-2 leading-snug">{c.value}</p>
              {c.org && <p className="text-zinc-500 text-xs mt-1">{c.org}</p>}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.35 }}
          className="mt-10"
          data-testid="hero-active-systems"
        >
          <p className="font-mono2 text-xs uppercase tracking-[0.25em] text-zinc-500 mb-3">Active Systems</p>
          <div className="flex flex-wrap gap-2">
            {ACTIVE_SYSTEMS.map((s) => (
              <span key={s} className="font-mono2 text-xs text-zinc-300 border border-zinc-800 px-3 py-1.5">
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-8 text-xs sm:text-sm text-zinc-600"
          data-testid="hero-status-line"
        >
          {STATUS_LINE.map((s, i) => (
            <span key={s}>
              {s}
              {i < STATUS_LINE.length - 1 && <span className="mx-2.5 text-zinc-700">•</span>}
            </span>
          ))}
        </motion.p>
      </div>
      <NetworkGraphic />
    </section>
  );
}
