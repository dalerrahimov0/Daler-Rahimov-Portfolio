import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, FileDown } from "lucide-react";
import { HERO_INFO, ACTIVE_SYSTEMS, STATUS_LINE, CONTACT } from "@/lib/data";
import { useMediaQuery } from "@/hooks/use-media-query";
import ConceptGraph from "@/components/ConceptGraph";

const LINES = ["Daler Rahimov"];
// Tailwind's `lg` breakpoint — the graph's fluid range (--graph-w below) is
// derived against this exact floor, so the two need to stay in lockstep.
const GRAPH_QUERY = "(min-width: 1024px)";

export default function Hero() {
  const reduce = useReducedMotion();
  // Below lg, the graph doesn't render here at all (rather than rendering
  // hidden via CSS) — it gets its own placement elsewhere for narrow
  // viewports, and mounting the SVG/hover-tracking/ChainDetail machinery
  // just to keep it display:none is wasted work.
  const showGraph = useMediaQuery(GRAPH_QUERY);
  return (
    <section id="top" data-testid="hero-section" className="grain relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
      <div data-testid="hero-text-column" className="mx-auto max-w-6xl px-6 w-full relative z-10 pt-24">
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
        The graph's width is fluid (--graph-w below) rather than a fixed
        896px, so it has to be positioned by a formula that stays valid as
        that width changes continuously across this component's whole
        responsible range — a single hardcoded `right` offset (as this used
        to be) is only ever correct for the one width it was measured
        against. That range is now exactly [1024px, ∞) — `showGraph` above
        stops this from rendering at all below lg, so unlike an earlier
        version of this formula, --graph-w doesn't need any slack for widths
        below 1024px; 1024 is a hard floor, not an edge case to approach
        asymptotically. That's what's generous about it (see below).

        --graph-w is the tightest size that still clears both edges at
        every width, expressed as min() of three ceilings rather than a
        single clamp() coefficient:

        - Two of the three (the vw-scaled terms) are the same
          "how wide can the box be before its content — not the box itself,
          see the `right` formula below — hits the hero text column or the
          viewport edge" constraint, just evaluated on either side of the
          hero container's own `max-w-6xl` kicking in at 1152px (below that,
          the info-cards column's right edge is a flat 696px from the
          viewport's left edge; at/above it, that edge is `50vw + 120px`,
          scaling with the viewport instead of staying put) — hence two
          formulas, picked via min() same as the position formula below
          picks between its own two regimes via max().
        - The third (896px) is ConceptGraph's DESKTOP.w — the graph's native
          resolution, past which it would just be upscaled blur rather than
          more detail.

        Each vw-scaled term reserves 24px clear on both the text-column side
        and the viewport-edge side, divided by ~0.834 — the fraction of
        --graph-w that Enterprise's hover chain (the widest concept, at its
        widest — see `right` below) actually spans, since the box itself is
        wider than its worst-case content. Recompute both if NODE_CLEARANCE,
        PANEL_MAX_W, or the ring geometry in ConceptGraph.jsx's DESKTOP
        config change enough to move that fraction.

        `right` centers the box under the navbar's Resume button, same as
        before, but that centering formula is itself two pieces (the navbar
        container's own side margin is `(100vw-1152px)/2` above 1152px, but a
        flat 0 below it, per its own `max-w-6xl`), so centering has to be
        two formulas too — hence the outer max(): f1 for <1152px (button's
        right edge sits a flat 66px = 24px padding + half its own ~84px
        width, in from the viewport edge, independent of vw), f2 for
        >=1152px (`50vw - 552px`, from that side margin, minus the same
        half-button-width term), each then shifted by half of (this box's
        width minus the button's width) to center rather than flush an edge.

        The third max() term is the one novel piece: centering alone still
        clips at the low end of this range. The graph's content (badges,
        spokes, the active hover state's chain) doesn't fill --graph-w
        edge-to-edge — the widest concept (Enterprise, hovered, its 4th chain
        link) only reaches ~91.7% of the way across the box before the
        button-centered position would push that content past the viewport's
        right edge. This term instead pins the box so that content's real
        edge sits a flat 24px inside the viewport, and only backs off toward
        true centering once there's enough room for both — which the max()
        picks automatically at each width without a breakpoint. Because
        --graph-w above was sized to make this term and the text-column
        constraint tight at the same time, this term is what actually wins
        the outer max() across nearly this whole range — true centering only
        takes over once --graph-w saturates at the 896px cap (roughly
        1800px+), where there's more room than either constraint needs.

        z-20: the text column's wrapper div above is `relative z-10`, and its
        box spans the full container width even though its own text doesn't —
        without a higher z-index here, that transparent div wins hit-testing
        over most of the graph's area (confirmed via elementFromPoint) and
        silently swallows every hover/click before it reaches the SVG.
      */}
      {showGraph && (
        <div
          className="absolute top-1/2 -translate-y-1/2 z-20"
          style={{
            "--graph-w": "min(896px, calc(120vw - 892px), calc(60vw - 202px))",
            width: "var(--graph-w)",
            right: `max(
              calc(66px - var(--graph-w) / 2),
              calc(50vw - 552px - (var(--graph-w) - 84px) / 2),
              calc(24px - 0.083 * var(--graph-w))
            )`,
          }}
        >
          <ConceptGraph />
        </div>
      )}
    </section>
  );
}
