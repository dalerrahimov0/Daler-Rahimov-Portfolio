import { useCallback, useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Network, Rocket, Building2, Box, PenLine, BarChart3, Brain } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { GRAPH } from "@/lib/data";

const ACCENT = "#5e6ad2";
// Resting-state values matched to the hero's NetworkGraphic: node stroke/fill
// as its open-circle nodes, spoke stroke as its connecting lines (accent at
// 50% opacity). Dimmed and emphasized states are untouched.
const NODE_REST_STROKE = ACCENT;
const SPOKE_REST_STROKE = "rgba(94,106,210,0.5)";
const DIM_STROKE = "rgba(255,255,255,0.025)";
const BADGE_BG = "#0a0a0a";

const CONCEPT_ICONS = {
  systems: Network,
  products: Rocket,
  enterprise: Building2,
  architecture: Box,
  research: PenLine,
  analytics: BarChart3,
  ai: Brain,
};

const HOVER_QUERY = "(hover: hover)";
const MOBILE_QUERY = "(max-width: 639px)";

// Both layouts are true circles — only the size changes. `badge`/`hit` are the
// HTML icon-badge's visual diameter and its (larger, invisible) hit target,
// both in the same viewBox-unit space as w/h/rx/ry/sx/sy so they scale with
// the rest of the layout. Labels never attach directly to a node's own
// position (see ChainDetail below): with 7 evenly spaced concepts and up to 4
// chain links, several angles land close enough to horizontal that
// consecutive chain nodes sit only ~20-40px apart at any reasonable canvas
// size, which is narrower than the node labels themselves — pinning text
// "above the node" collides with its neighbors regardless of how the ring is
// tuned. A fixed detail panel next to the graph has no such limit.
const DESKTOP = { w: 896, h: 896, rx: 154, ry: 154, sx: 56, sy: 56, badge: 48, hit: 62 };
const MOBILE = { w: 320, h: 420, rx: 54, ry: 60, sx: 20, sy: 24, badge: 22, hit: 32 };

const CHAIN_NODE_R = 5;
const CENTER_R = 10;

const toRad = (deg) => (deg * Math.PI) / 180;

// i = 0 is the concept node itself (sitting on the base rx/ry ring); i = 1..n
// are successive chain links, each stepping outward by sx/sy along the same angle.
const ringPos = (cfg, angleDeg, i) => {
  const rad = toRad(angleDeg);
  const radiusX = cfg.rx + cfg.sx * i;
  const radiusY = cfg.ry + cfg.sy * i;
  return { x: cfg.w / 2 + radiusX * Math.sin(rad), y: cfg.h / 2 - radiusY * Math.cos(rad) };
};

// The panel anchors just outside the active node, offset along a direction
// blended away from the node's own spoke (see TANGENT_DEG below), then its
// box grows FURTHER outward from that anchor — away from the node, never
// back through it — which is what keeps it off the node regardless of panel
// size: growing back toward the anchor's own origin would have to pass
// directly over the node's position. Which edge of the box sits at the
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
const NODE_CLEARANCE = 92;
const PANEL_MAX_W = 200;
// Low enough that only a near-exact 0/90/180/270 angle reads as "center"/
// "middle" (no lateral offset on that axis) — with 7 concepts spaced 51.4deg
// apart, no single TANGENT_DEG below keeps all seven a full 8.6deg (the old
// threshold's dead zone) from an axis, and collapsing to zero offset on an
// axis is exactly what let the panel drift back onto the chain's ray.
const SIDE_THRESHOLD = 0.02;

// The chain for the active concept extends OUTWARD along the concept's own
// angle (ringPos with increasing i) — so anchoring the panel further out on
// that exact same ray, as a pure radial offset once did, plants it directly
// in the chain's own path. Offsetting the anchor's angle away from the
// concept's angle before applying NODE_CLEARANCE moves the panel beside the
// ray instead of along it, while still measuring the offset from the node's
// true position so it stays close.
const TANGENT_DEG = 45;

const H_TRANSFORM = { left: "0%", right: "-100%", center: "-50%" };
const V_TRANSFORM = { top: "0%", bottom: "-100%", middle: "-50%" };

const panelAnchor = (cfg, angleDeg) => {
  const node = ringPos(cfg, angleDeg, 0);
  const blendRad = toRad(angleDeg + TANGENT_DEG);
  const dirX = Math.sin(blendRad);
  const dirY = -Math.cos(blendRad);
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
    const clampToEdges = () => {
      const left = rect.left + dx;
      const right = rect.right + dx;
      const top = rect.top + dy;
      const bottom = rect.bottom + dy;
      if (left < CLAMP_MARGIN) dx += CLAMP_MARGIN - left;
      else if (right > vw - CLAMP_MARGIN) dx += vw - CLAMP_MARGIN - right;
      if (top < clipRect.top + CLAMP_MARGIN) dy += clipRect.top + CLAMP_MARGIN - top;
      else if (bottom > clipRect.bottom - CLAMP_MARGIN) dy += clipRect.bottom - CLAMP_MARGIN - bottom;
    };
    clampToEdges();

    // The anchor offset only guarantees clearance from the ACTIVE node — a
    // neighboring node's badge can still fall inside the panel's footprint
    // once it grows toward it (e.g. Enterprise's panel growing down-right
    // toward Architecture's badge). For each badge the (edge-clamped) panel
    // still overlaps, find the cheapest of the four ways to separate them —
    // push past the badge's right/left/bottom/top edge, whichever needs the
    // smallest shift — and apply the cheapest one that doesn't itself violate
    // the viewport/hero bounds (falling back to the next-cheapest, then to
    // the cheapest outright if none fit cleanly). Re-run the edge clamp after,
    // since even a bounds-respecting nudge can still land exactly on a margin.
    if (clipEl) {
      const badgeEls = clipEl.querySelectorAll('[data-testid^="concept-graph-node-"]');
      badgeEls.forEach((el) => {
        if (el.getAttribute("data-testid") === `concept-graph-node-${concept.id}`) return;
        const b = el.getBoundingClientRect();
        const left = rect.left + dx;
        const right = rect.right + dx;
        const top = rect.top + dy;
        const bottom = rect.bottom + dy;
        const overlapX = Math.min(right, b.right) - Math.max(left, b.left);
        const overlapY = Math.min(bottom, b.bottom) - Math.max(top, b.top);
        if (overlapX <= 0 || overlapY <= 0) return;

        const options = [
          { axis: "x", delta: b.right - left },
          { axis: "x", delta: b.left - right },
          { axis: "y", delta: b.bottom - top },
          { axis: "y", delta: b.top - bottom },
        ].sort((a, c) => Math.abs(a.delta) - Math.abs(c.delta));

        const fitsBounds = (opt) =>
          opt.axis === "x"
            ? left + opt.delta >= CLAMP_MARGIN && right + opt.delta <= vw - CLAMP_MARGIN
            : top + opt.delta >= clipRect.top + CLAMP_MARGIN && bottom + opt.delta <= clipRect.bottom - CLAMP_MARGIN;

        const chosen = options.find(fitsBounds) || options[0];
        if (chosen.axis === "x") dx += chosen.delta;
        else dy += chosen.delta;
      });
      clampToEdges();
    }

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
      className="absolute pointer-events-none z-10 rounded-md"
      style={{
        left: `${(anchor.x / cfg.w) * 100}%`,
        top: `${(anchor.y / cfg.h) * 100}%`,
        width: `${PANEL_MAX_W}px`,
        padding: "8px 10px",
        margin: "-8px -10px",
        // The tangential anchor offset above keeps the panel off the active
        // chain's ray for most angles/widths, but a few combinations still
        // can't fully clear it: a couple of angles land the box close enough
        // that its far edge grazes the chain's line, and at narrower
        // viewports the edge-clamp (below) can pull an already-tight panel
        // back toward the node to stay on-screen, re-crossing the ray it was
        // offset from. This backdrop is the fallback for exactly those
        // unavoidable cases — a line crossing behind the panel reads as
        // passing behind a card, not through the letters.
        background: "rgba(10,10,10,0.6)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        transform: `translate(${H_TRANSFORM[anchor.hSide]}, ${V_TRANSFORM[anchor.vSide]}) translate(${clamp.dx}px, ${clamp.dy}px)`,
      }}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.25 }}
    >
      <p data-testid={`concept-graph-label-${concept.id}`} className="font-display font-semibold text-white text-lg tracking-tight">
        {concept.label}
      </p>
      <div className="mt-2 space-y-1">
        {concept.chain.map((link, i) => (
          <motion.p
            key={link.label}
            data-testid={`concept-graph-chain-label-${i}`}
            className="text-zinc-400 text-sm leading-snug"
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
        <defs>
          {/* A blurred, wider, low-opacity copy of each spoke rendered underneath
              the crisp line is what reads as a soft halo — blurring the crisp
              line itself would just soften its edges, not add a glow around it. */}
          <filter id="spoke-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="4.2" />
          </filter>
        </defs>

        {GRAPH.concepts.map((c) => {
          const isActive = activeId === c.id;
          const dimmed = activeId !== null && !isActive;
          const pos = ringPos(cfg, c.angle, 0);
          const glowOpacity = isActive ? 0.55 : dimmed ? 0 : 0.15;
          return (
            <g key={`spoke-${c.id}`}>
              {glowOpacity > 0 && (
                <line
                  x1={centerPos.x}
                  y1={centerPos.y}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={ACCENT}
                  strokeWidth={isActive ? 5 : 3}
                  opacity={glowOpacity}
                  filter="url(#spoke-glow)"
                  style={{ transition: reduce ? "none" : "opacity 0.4s ease" }}
                />
              )}
              <line
                x1={centerPos.x}
                y1={centerPos.y}
                x2={pos.x}
                y2={pos.y}
                stroke={isActive ? ACCENT : dimmed ? DIM_STROKE : SPOKE_REST_STROKE}
                strokeWidth={isActive ? 1.25 : 1}
                style={{ transition: reduce ? "none" : "stroke 0.4s ease" }}
              />
            </g>
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

        <circle cx={centerPos.x} cy={centerPos.y} r={CENTER_R} fill={ACCENT} stroke={NODE_REST_STROKE} strokeWidth="1.5" aria-hidden="true" />
      </svg>

      {/* Icon badges layered over the SVG canvas, positioned with the same
          percentage-of-cfg.w/h approach as ChainDetail so they line up exactly
          with the spoke endpoints (ringPos with i=0) underneath. A React icon
          can't be rendered inside <svg> without foreignObject gymnastics, so
          the interactive node itself — hit target, focus/hover/keyboard
          handling, and all — lives here instead of in the SVG <g> it used to
          be; the badge's opaque fill sits on top of the spoke/chain-line
          start points, which is what makes those lines read as emerging from
          the badge's edge rather than its center. */}
      <div className="absolute inset-0 pointer-events-none">
        {GRAPH.concepts.map((c) => {
          const isActive = activeId === c.id;
          const dimmed = activeId !== null && !isActive;
          const pos = ringPos(cfg, c.angle, 0);
          const Icon = CONCEPT_ICONS[c.id];
          const borderColor = isActive ? ACCENT : dimmed ? DIM_STROKE : "rgba(94,106,210,0.6)";
          const iconColor = isActive ? "#ffffff" : dimmed ? "rgba(255,255,255,0.15)" : ACCENT;
          const glow = isActive
            ? "0 0 22px 4px rgba(94,106,210,0.55), 0 0 45px 11px rgba(94,106,210,0.25)"
            : dimmed
            ? "none"
            : "0 0 11px 1.4px rgba(94,106,210,0.25)";
          return (
            <div
              key={c.id}
              data-testid={`concept-graph-node-${c.id}`}
              tabIndex={0}
              role="button"
              aria-label={`${c.label} — reveal related concepts`}
              aria-expanded={isActive}
              className="focus-ring absolute pointer-events-auto flex items-center justify-center rounded-full"
              style={{
                left: `${(pos.x / cfg.w) * 100}%`,
                top: `${(pos.y / cfg.h) * 100}%`,
                width: `${cfg.hit}px`,
                height: `${cfg.hit}px`,
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                outline: "none",
              }}
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
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: `${cfg.badge}px`,
                  height: `${cfg.badge}px`,
                  background: BADGE_BG,
                  border: `1.5px solid ${borderColor}`,
                  boxShadow: glow,
                  transition: reduce ? "none" : "border-color 0.4s ease, box-shadow 0.4s ease",
                }}
              >
                <Icon size={Math.round(cfg.badge * 0.47)} color={iconColor} strokeWidth={2} style={{ transition: reduce ? "none" : "color 0.4s ease" }} />
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {activeConcept && <ChainDetail key={activeConcept.id} concept={activeConcept} reduce={reduce} cfg={cfg} />}
      </AnimatePresence>
    </div>
  );
}
