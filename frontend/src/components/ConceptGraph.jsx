import { useCallback, useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { GRAPH } from "@/lib/data";

const ACCENT = "#5e6ad2";
// Resting-state values matched to the hero's NetworkGraphic: node stroke/fill
// as its open-circle nodes, spoke stroke as its connecting lines (accent at
// 50% opacity). Dimmed and emphasized states are untouched.
const NODE_REST_STROKE = ACCENT;
const SPOKE_REST_STROKE = "rgba(94,106,210,0.5)";
const DIM_STROKE = "rgba(255,255,255,0.025)";

const HOVER_QUERY = "(hover: hover)";
const MOBILE_QUERY = "(max-width: 639px)";

// Both layouts are true circles — only the size changes. Labels never attach
// directly to a node's own position (see ChainDetail below): with 7 evenly
// spaced concepts and up to 4 chain links, several angles land close enough to
// horizontal that consecutive chain nodes sit only ~20-40px apart at any
// reasonable canvas size, which is narrower than the node labels themselves —
// pinning text "above the node" collides with its neighbors regardless of how
// the ring is tuned. A fixed detail panel next to the graph has no such limit.
const DESKTOP = { w: 640, h: 640, rx: 110, ry: 110, sx: 40, sy: 40 };
const MOBILE = { w: 320, h: 420, rx: 54, ry: 60, sx: 20, sy: 24 };

const NODE_R = 4;
const CHAIN_NODE_R = 3.5;
const CENTER_R = 7;

const toRad = (deg) => (deg * Math.PI) / 180;

// i = 0 is the concept node itself (sitting on the base rx/ry ring); i = 1..n
// are successive chain links, each stepping outward by sx/sy along the same angle.
const ringPos = (cfg, angleDeg, i) => {
  const rad = toRad(angleDeg);
  const radiusX = cfg.rx + cfg.sx * i;
  const radiusY = cfg.ry + cfg.sy * i;
  return { x: cfg.w / 2 + radiusX * Math.sin(rad), y: cfg.h / 2 - radiusY * Math.cos(rad) };
};

// The panel anchors just outside the active node, offset further along the
// same spoke direction the node already sits on (dir = (sin, -cos) of its
// angle, matching ringPos), then its box grows FURTHER outward from that
// anchor — away from the node, never back through it — which is what keeps it
// off the node regardless of panel size: growing back toward center would
// have to pass directly over the node's own position, since the node sits
// exactly on the anchor-to-center line. Which edge of the box sits at the
// anchor (and so which direction it grows) depends on which side of the
// circle the node is on, so the box always extends toward the nearest open
// canvas space instead of off an edge.
//
// Clearance is applied per-axis (not as one distance split proportionally
// along the diagonal) — decomposing a single offset by dirX/dirY starves
// whichever axis has the shallower component (e.g. Enterprise at 102.8deg is
// 97% horizontal, leaving only ~1px of vertical gap at any offset small
// enough not to blow past the viewport once the edge-clamp below shifts it
// back). Guaranteeing NODE_CLEARANCE independently on each active axis means
// there's always real separation on the axis that matters, however shallow
// the angle, even after that shift.
const NODE_CLEARANCE = 25;
const PANEL_MAX_W = 190;
const SIDE_THRESHOLD = 0.15;

const H_TRANSFORM = { left: "0%", right: "-100%", center: "-50%" };
const V_TRANSFORM = { top: "0%", bottom: "-100%", middle: "-50%" };

const panelAnchor = (cfg, angleDeg) => {
  const rad = toRad(angleDeg);
  const dirX = Math.sin(rad);
  const dirY = -Math.cos(rad);
  const node = ringPos(cfg, angleDeg, 0);
  const hSide = dirX > SIDE_THRESHOLD ? "left" : dirX < -SIDE_THRESHOLD ? "right" : "center";
  const vSide = dirY > SIDE_THRESHOLD ? "top" : dirY < -SIDE_THRESHOLD ? "bottom" : "middle";
  return {
    x: node.x + (hSide === "center" ? 0 : Math.sign(dirX) * NODE_CLEARANCE),
    y: node.y + (vSide === "middle" ? 0 : Math.sign(dirY) * NODE_CLEARANCE),
    hSide,
    vSide,
  };
};

// Hand-computed offsets get the panel close, but exact rendered height/width
// depend on real font metrics and how each label's text wraps — both vary per
// concept in ways that are hard to predict precisely by hand (confirmed by
// measuring against the actual DOM: a few concepts came out a handful of
// pixels taller than estimated). So after the anchor/side placement below,
// this measures the panel's real rendered box and nudges it back inside the
// nearest clipping ancestor (the hero section, which clips its own overflow)
// and the viewport, if it would otherwise poke out on any edge.
const CLAMP_MARGIN = 12;

const ChainDetail = ({ concept, reduce, cfg }) => {
  const panelRef = useRef(null);
  const [clamp, setClamp] = useState({ dx: 0, dy: 0 });

  useLayoutEffect(() => {
    if (!concept || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const clipEl = panelRef.current.closest('[data-testid="hero-section"]');
    const clipRect = clipEl ? clipEl.getBoundingClientRect() : { top: 0, bottom: window.innerHeight };
    const vw = document.documentElement.clientWidth;

    let dx = 0;
    let dy = 0;
    if (rect.left < CLAMP_MARGIN) dx = CLAMP_MARGIN - rect.left;
    else if (rect.right > vw - CLAMP_MARGIN) dx = vw - CLAMP_MARGIN - rect.right;
    if (rect.top < clipRect.top + CLAMP_MARGIN) dy = clipRect.top + CLAMP_MARGIN - rect.top;
    else if (rect.bottom > clipRect.bottom - CLAMP_MARGIN) dy = clipRect.bottom - CLAMP_MARGIN - rect.bottom;

    setClamp((prev) => (prev.dx === dx && prev.dy === dy ? prev : { dx, dy }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [concept]);

  if (!concept) return null;
  const anchor = panelAnchor(cfg, concept.angle);
  return (
    <motion.div
      ref={panelRef}
      key={concept.id}
      data-testid="concept-graph-chain-detail"
      className="absolute pointer-events-none"
      style={{
        left: `${(anchor.x / cfg.w) * 100}%`,
        top: `${(anchor.y / cfg.h) * 100}%`,
        width: `${PANEL_MAX_W}px`,
        transform: `translate(${H_TRANSFORM[anchor.hSide]}, ${V_TRANSFORM[anchor.vSide]}) translate(${clamp.dx}px, ${clamp.dy}px)`,
      }}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.25 }}
    >
      <p data-testid={`concept-graph-label-${concept.id}`} className="font-mono2 text-base uppercase tracking-[0.25em] text-white">
        {concept.label}
      </p>
      <div className="mt-6 space-y-4 border-l border-white/10 pl-6">
        {concept.chain.map((link, i) => (
          <motion.p
            key={link.label}
            data-testid={`concept-graph-chain-label-${i}`}
            className="font-mono2 text-sm sm:text-base uppercase tracking-[0.18em] text-zinc-300"
            initial={reduce ? false : { opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : 0.08 * (i + 1), ease: [0.22, 1, 0.36, 1] }}
          >
            {link.label}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
};

// Standalone graph — canvas + hover/chain logic + chain detail panel — with no
// section wrapper, overline, or page-section padding, so it can be embedded
// anywhere (currently: absolutely positioned inside the hero). `className` is
// applied to the root so the caller controls placement/size; nothing here
// changes based on it.
export default function ConceptGraph({ className = "" }) {
  const reduce = useReducedMotion();
  const canHover = useMediaQuery(HOVER_QUERY);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const [activeId, setActiveId] = useState(null);

  const cfg = isMobile ? MOBILE : DESKTOP;
  const centerPos = { x: cfg.w / 2, y: cfg.h / 2 };

  const open = useCallback((id) => setActiveId(id), []);
  const close = useCallback(() => setActiveId(null), []);
  const toggle = useCallback((id) => setActiveId((cur) => (cur === id ? null : id)), []);

  const handleKeyDown = (id, e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(id);
    } else if (e.key === "Escape") {
      close();
    }
  };

  const activeConcept = GRAPH.concepts.find((c) => c.id === activeId) || null;

  return (
    <div
      className={`relative w-full select-none ${className}`}
      style={{ aspectRatio: `${cfg.w} / ${cfg.h}` }}
      onClick={() => {
        if (!canHover) close();
      }}
    >
      <svg
        width={cfg.w}
        height={cfg.h}
        viewBox={`0 0 ${cfg.w} ${cfg.h}`}
        data-testid="concept-graph-canvas"
        role="group"
        aria-label="Systems thinking concept graph"
        className="w-full h-full"
        style={{ aspectRatio: `${cfg.w} / ${cfg.h}` }}
      >
        {GRAPH.concepts.map((c) => {
          const isActive = activeId === c.id;
          const dimmed = activeId !== null && !isActive;
          const pos = ringPos(cfg, c.angle, 0);
          return (
            <line
              key={`spoke-${c.id}`}
              x1={centerPos.x}
              y1={centerPos.y}
              x2={pos.x}
              y2={pos.y}
              stroke={isActive ? ACCENT : dimmed ? DIM_STROKE : SPOKE_REST_STROKE}
              strokeWidth={isActive ? 1.25 : 1}
              style={{ transition: reduce ? "none" : "stroke 0.4s ease" }}
            />
          );
        })}

        <AnimatePresence>
          {activeConcept && (
            <g key={`chain-${activeConcept.id}`} data-testid="concept-graph-chain-nodes">
              {activeConcept.chain.map((link, i) => {
                const from = ringPos(cfg, activeConcept.angle, i);
                const to = ringPos(cfg, activeConcept.angle, i + 1);
                return (
                  <g key={`${activeConcept.id}-chain-${i}`}>
                    <motion.line
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke={ACCENT}
                      strokeWidth="1"
                      initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.5 }}
                      exit={reduce ? undefined : { opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.circle
                      cx={to.x}
                      cy={to.y}
                      r={CHAIN_NODE_R}
                      fill="#0a0a0a"
                      stroke={ACCENT}
                      strokeWidth="1"
                      initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduce ? undefined : { opacity: 0, scale: 0.6 }}
                      transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </g>
                );
              })}
            </g>
          )}
        </AnimatePresence>

        {GRAPH.concepts.map((c) => {
          const isActive = activeId === c.id;
          const dimmed = activeId !== null && !isActive;
          const pos = ringPos(cfg, c.angle, 0);
          const stroke = isActive ? ACCENT : dimmed ? DIM_STROKE : NODE_REST_STROKE;
          return (
            <g
              key={c.id}
              data-testid={`concept-graph-node-${c.id}`}
              tabIndex={0}
              role="button"
              aria-label={`${c.label} — reveal related concepts`}
              aria-expanded={isActive}
              className="focus-ring"
              style={{ cursor: "pointer", outline: "none" }}
              onMouseEnter={() => canHover && open(c.id)}
              onMouseLeave={() => canHover && close()}
              onFocus={() => open(c.id)}
              onBlur={() => close()}
              onClick={(e) => {
                e.stopPropagation();
                if (!canHover) toggle(c.id);
              }}
              onKeyDown={(e) => handleKeyDown(c.id, e)}
            >
              <circle cx={pos.x} cy={pos.y} r={NODE_R + 10} fill="transparent" />
              <circle
                cx={pos.x}
                cy={pos.y}
                r={NODE_R}
                fill={isActive ? ACCENT : "#0a0a0a"}
                stroke={stroke}
                strokeWidth={isActive ? 1.5 : dimmed ? 1 : 1.5}
                style={{ transition: reduce ? "none" : "fill 0.4s ease, stroke 0.4s ease" }}
              />
            </g>
          );
        })}

        <circle cx={centerPos.x} cy={centerPos.y} r={CENTER_R} fill={ACCENT} stroke={NODE_REST_STROKE} strokeWidth="1.5" aria-hidden="true" />
      </svg>

      <AnimatePresence>
        {activeConcept && <ChainDetail key={activeConcept.id} concept={activeConcept} reduce={reduce} cfg={cfg} />}
      </AnimatePresence>
    </div>
  );
}
