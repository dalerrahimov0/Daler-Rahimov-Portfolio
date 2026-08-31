import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, FileDown } from "lucide-react";
import { HERO_INFO, ACTIVE_SYSTEMS, STATUS_LINE, CONTACT } from "@/lib/data";
import ConceptGraph from "@/components/ConceptGraph";

const LINES = ["Daler Rahimov"];

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
      {/*
        Horizontally centered under the navbar's Resume button rather than
        pinned to the viewport edge. The navbar and this section both use the
        same `mx-auto max-w-6xl px-6` container, so that button's right edge
        sits at `calc(50vw - 552px)` from the viewport's right edge for any
        width >= 1152px (half the container overhang, minus its own padding).
        Shifting by half this box's width minus half the button's width
        (~42px) centers the box under the button instead of flushing an edge.

        z-20: the text column's wrapper div above is `relative z-10`, and its
        box spans the full container width even though its own text doesn't —
        without a higher z-index here, that transparent div wins hit-testing
        over most of the graph's area (confirmed via elementFromPoint) and
        silently swallows every hover/click before it reaches the SVG.
      */}
      <div className="absolute right-[calc(50vw_-_830px)] top-1/2 -translate-y-1/2 hidden lg:block w-[640px] z-20">
        <ConceptGraph />
      </div>
    </section>
  );
}
