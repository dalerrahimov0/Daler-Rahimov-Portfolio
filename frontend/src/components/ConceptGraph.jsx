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
// Matches the lg breakpoint that now actually decides where this component
// renders: Hero's overlay only ever mounts it at >=1024px (DESKTOP applies
// there), ConceptGraphSection only ever mounts it below that (MOBILE should
// apply for that whole range). A narrower phone-only threshold here left a
// gap — a 640-1023px viewport (a tablet, or a narrow desktop window) landed
// in ConceptGraphSection but still got DESKTOP's geometry, whose hit targets
// are sized for a mouse pointer, not a touchscreen.
const MOBILE_QUERY = "(max-width: 1023px)";

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
// Square, like DESKTOP — this was previously portrait (320x420), but that
// shape was never actually exercised: this cfg branch only renders inside
// ConceptGraphSection now, and that section's container is capped at 480px
// regardless of aspect. hit/w is deliberately much higher than DESKTOP's
// (62/896 = 7%): DESKTOP only ever needs to clear a mouse pointer, but this
// renders into a ~270-480px container on real touch devices, where a 7%
// hit target would be a ~20-34px tap zone — well under the ~44px touch
// target guidelines. rx grew to match (88/340 vs DESKTOP's 154/896 = 17%)
// so the 7 nodes' now-larger hit circles still clear their neighbors — a
// wider hit fraction without more ring radius just makes adjacent nodes'
// tap zones overlap. sx shrank proportionally so the widest hover chain
// (4 links) still lands inside the viewBox with margin to spare, the same
// way DESKTOP's rx/sx ratio does.
const MOBILE = { w: 340, h: 340, rx: 88, ry: 88, sx: 14, sy: 14, badge: 46, hit: 61 };

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

// --- ChainDetail positioning ---------------------------------------------
//
// Everything below is measured, not estimated: the panel's anchor comes from
// the ACTIVE NODE'S real getBoundingClientRect() (queried off the graph's own
// container by its existing data-testid) and the graph CONTAINER's real
// getBoundingClientRect(), read fresh every time a node activates or the
// viewport resizes. Nothing here assumes a container size, a viewBox-to-pixel
// ratio, or which layout context (hero overlay vs. normal-flow mobile
// section) it's running in — the same code measures correctly either way
// because it never projects viewBox units onto an assumed box; it reads the
// box that's actually there.
const NODE_GAP = 16; // clearance from the active node's own rendered edge
const PANEL_MAX_W = 200;

// The chain for the active concept extends OUTWARD along the container-center
// -> node vector (ringPos with increasing i) — so anchoring the panel further
// out on that exact same ray would plant it directly in the chain's own path.
// Rotating that real (measured) vector by TANGENT_DEG before picking a side
// moves the panel beside the ray instead of along it, while the anchor point
// itself still comes from the node's true rendered edge, so it stays close.
const TANGENT_DEG = 45;
const CLAMP_MARGIN = 12;

const H_TRANSFORM = { left: "0%", right: "-100%", center: "-50%" };
const V_TRANSFORM = { top: "0%", bottom: "-100%", middle: "-50%" };
// A little breathing room past an avoid-rect's edge, not just exact tangency
// — two boxes nudged to touch at 0px can flip into a fractional-pixel overlap
// from ordinary sub-pixel layout rounding.
const AVOID_MARGIN = 4;

// Anchors the panel to one side of the node's real rendered box, offset by a
// small constant on-screen gap — a fixed pixel distance instead of a value
// scaled by viewBox units, which is what previously let the offset balloon
// into hundreds of pixels at some container sizes. hSide/vSide can each also
// be "center"/"middle", which anchors that axis to the node's own center
// instead of past one of its edges — the pure-horizontal/pure-vertical
// placements this produces (directly beside or above/below the node, not
// diagonally offset) are what let the panel dodge a squeeze that blocks both
// diagonals: a node with content close above AND below it, but open room to
// either side, has no diagonal placement that clears both at once. Returns
// viewport px.
const sideAnchor = (nodeRect, hSide, vSide) => ({
  x: hSide === "center" ? nodeRect.left + nodeRect.width / 2 : hSide === "left" ? nodeRect.right + NODE_GAP : nodeRect.left - NODE_GAP,
  y: vSide === "middle" ? nodeRect.top + nodeRect.height / 2 : vSide === "top" ? nodeRect.bottom + NODE_GAP : nodeRect.top - NODE_GAP,
});

// The viewport-space box the panel would occupy for a given anchor/side/nudge
// — shared by the bounds clamp and the avoid-rect separation below so both
// reason about the exact same box.
const panelBox = (ax, ay, w, h, hSide, vSide, dx, dy) => {
  const left = (hSide === "center" ? ax - w / 2 : hSide === "left" ? ax : ax - w) + dx;
  const top = (vSide === "middle" ? ay - h / 2 : vSide === "top" ? ay : ay - h) + dy;
  return { left, right: left + w, top, bottom: top + h };
};

// The real, measured container-center -> node-center vector, rotated away
// from the chain's own outward ray (see TANGENT_DEG above) — this is only
// used to RANK which candidate placement (see PLACEMENTS below) to try first;
// the chain for the active concept extends outward along the un-rotated
// version of this same vector, so the diagonal on the far side of that
// rotation is the one that naturally reads as "beside the ray" rather than
// on top of it, when more than one candidate is otherwise equally clean.
const preferredDiagonal = (containerRect, nodeRect) => {
  const nodeCenter = { x: nodeRect.left + nodeRect.width / 2, y: nodeRect.top + nodeRect.height / 2 };
  const containerCenter = { x: containerRect.left + containerRect.width / 2, y: containerRect.top + containerRect.height / 2 };
  const radial = { x: nodeCenter.x - containerCenter.x, y: nodeCenter.y - containerCenter.y };
  const rad = toRad(TANGENT_DEG);
  const blendX = radial.x * Math.cos(rad) - radial.y * Math.sin(rad);
  const blendY = radial.x * Math.sin(rad) + radial.y * Math.cos(rad);
  return { hSide: blendX >= 0 ? "left" : "right", vSide: blendY >= 0 ? "top" : "bottom" };
};

// Every placement around the node worth trying: the four diagonals (NE/NW/
// SE/SW) plus the four compass points (N/S/E/W, pure horizontal or vertical —
// "center"/"middle" on the axis that isn't offset). Which one actually avoids
// overlapping real content depends on what's around the node on screen, not
// on the concept's angle alone, so every placement is measured and scored
// (see resolveQuadrant below) and the cleanest one wins; the diagonal above
// just orders the search so the "natural" placement is tried first when more
// than one is otherwise equally clean.
const PLACEMENTS = [
  { hSide: "left", vSide: "top" },
  { hSide: "right", vSide: "top" },
  { hSide: "left", vSide: "bottom" },
  { hSide: "right", vSide: "bottom" },
  { hSide: "left", vSide: "middle" },
  { hSide: "right", vSide: "middle" },
  { hSide: "center", vSide: "top" },
  { hSide: "center", vSide: "bottom" },
];

const placementSearchOrder = (preferred) => {
  const rank = (p) => (p.hSide === preferred.hSide ? 1 : 0) + (p.vSide === preferred.vSide ? 1 : 0);
  return [...PLACEMENTS].sort((a, b) => rank(b) - rank(a));
};

const DEFAULT_POS = { left: 0, top: 0, hSide: "left", vSide: "top", dx: 0, dy: 0 };

const ChainDetail = ({ concept, reduce, containerRef }) => {
  const panelRef = useRef(null);
  const [pos, setPos] = useState(DEFAULT_POS);

  useLayoutEffect(() => {
    if (!concept) return;

    const recompute = () => {
      const containerEl = containerRef.current;
      const panelEl = panelRef.current;
      if (!containerEl || !panelEl) return;
      const nodeEl = containerEl.querySelector(`[data-testid="concept-graph-node-${concept.id}"]`);
      if (!nodeEl) return;

      const containerRect = containerEl.getBoundingClientRect();
      const nodeRect = nodeEl.getBoundingClientRect();
      const panelRect = panelEl.getBoundingClientRect();
      const w = panelRect.width;
      const h = panelRect.height;

      // Only the Hero overlay usage has a "hero-section" ancestor (it clips
      // its own overflow); the standalone mobile section (ConceptGraphSection)
      // doesn't, so there the panel is bounded by its own container's rect on
      // BOTH axes, not the viewport — it has the section to itself, with no
      // sibling content to dodge, and the container is far smaller than the
      // page around it (capped by ConceptGraphSection's max-w wrapper). A
      // viewport-height vertical bound there let the search treat "300px
      // below the node, still technically on the very tall page" as a clean,
      // zero-overlap placement — legal by that bound, but nowhere near the
      // node or the graph's own visual footprint. Clamping to the container's
      // real height keeps every candidate's search space roughly the size of
      // the graph itself, so "closest to the node" and "fits the bounds" stay
      // in agreement instead of pulling in different directions.
      const heroEl = containerEl.closest('[data-testid="hero-section"]');
      const vw = document.documentElement.clientWidth;
      const bounds = heroEl
        ? { left: 0, right: vw, top: heroEl.getBoundingClientRect().top, bottom: heroEl.getBoundingClientRect().bottom }
        : { left: containerRect.left, right: containerRect.right, top: containerRect.top, bottom: containerRect.bottom };

      // Every sibling content block the panel must never overlap, gathered by
      // its own stable data-testid rather than one hardcoded boundary box —
      // in the hero: the heading/tagline block, the button row, the info-cards
      // row, and the Active Systems tag row. Plus, in both contexts, the
      // graph's own other node badges and the active concept's own chain —
      // the anchor only guarantees clearance from the ACTIVE node itself; a
      // neighboring badge, or the chain growing out from this same node, can
      // still fall inside the panel's footprint once it's sized.
      const avoidRects = [];
      if (heroEl) {
        ['[data-testid="hero-heading-block"]', '[data-testid="hero-button-row"]', '[data-testid="hero-info-cards"]', '[data-testid="hero-active-systems"]'].forEach((sel) => {
          const el = heroEl.querySelector(sel);
          if (el) avoidRects.push(el.getBoundingClientRect());
        });
      }
      containerEl.querySelectorAll('[data-testid^="concept-graph-node-"]').forEach((el) => {
        if (el.getAttribute("data-testid") === `concept-graph-node-${concept.id}`) return;
        avoidRects.push(el.getBoundingClientRect());
      });
      const chainGroup = containerEl.querySelector('[data-testid="concept-graph-chain-nodes"]');
      if (chainGroup) avoidRects.push(chainGroup.getBoundingClientRect());

      // The two "hard" rects — the ACTIVE node's own badge, and the graph's
      // CENTER node — each inflated by NODE_GAP on every side. Every other
      // node badge above is already covered by the generic querySelectorAll
      // loop; these two aren't (the active node is deliberately excluded from
      // it, and the center dot is a raw SVG <circle> with no
      // "concept-graph-node-" testid, so the loop's selector never matched
      // it — confirmed via screenshot: a panel landing toward the middle of
      // the ring could cut straight into it). Both get the exact same
      // treatment as each other: pushed into avoidRects for the general pass
      // below, AND kept as their own references so resolveQuadrant can run
      // the dedicated fallback pass on each and score them as a hard
      // constraint — sideAnchor only guarantees NODE_GAP clearance from the
      // active node along the one axis a placement naturally offsets from
      // (nothing at all from the center, which sideAnchor doesn't know
      // about), and any later nudge made to clear a sibling badge/the chain
      // has no reason not to drift across either one.
      const centerEl = containerEl.querySelector('[data-testid="concept-graph-center-node"]');
      const inflate = (r) => ({ left: r.left - NODE_GAP, right: r.right + NODE_GAP, top: r.top - NODE_GAP, bottom: r.bottom + NODE_GAP });
      const hardRects = [inflate(nodeRect)];
      if (centerEl) hardRects.push(inflate(centerEl.getBoundingClientRect()));
      avoidRects.push(...hardRects);

      // Resolves ONE candidate quadrant: clamp it inside bounds, then — for
      // each avoid-rect it still overlaps — find the cheapest of the four
      // ways to separate them (push past its right/left/bottom/top edge,
      // whichever needs the smallest shift), preferring whichever cheapest
      // option doesn't itself violate bounds. Repeated over several passes
      // since separating from one rect can reintroduce overlap with another
      // already-cleared one; stops early once nothing moves. Scored by how
      // many rects it still overlaps after that (ideally zero) and, as a
      // tiebreaker, how far it had to shift from its natural anchor.
      const resolveQuadrant = (hSide, vSide) => {
        const a = sideAnchor(nodeRect, hSide, vSide);
        let dx = 0;
        let dy = 0;
        const clampToBounds = () => {
          let b = panelBox(a.x, a.y, w, h, hSide, vSide, dx, dy);
          if (b.left < bounds.left + CLAMP_MARGIN) dx += bounds.left + CLAMP_MARGIN - b.left;
          else if (b.right > bounds.right - CLAMP_MARGIN) dx += bounds.right - CLAMP_MARGIN - b.right;
          b = panelBox(a.x, a.y, w, h, hSide, vSide, dx, dy);
          if (b.top < bounds.top + CLAMP_MARGIN) dy += bounds.top + CLAMP_MARGIN - b.top;
          else if (b.bottom > bounds.bottom - CLAMP_MARGIN) dy += bounds.bottom - CLAMP_MARGIN - b.bottom;
        };
        clampToBounds();

        // Every overlapping rect is resolved TOGETHER, in one weighted
        // objective, rather than in two separate stages (siblings first,
        // hard rects after) — two stages meant whichever ran second could
        // silently re-break what the first one just fixed, since neither
        // stage could see the other's constraints while it worked. Overlap
        // with a hard rect (the active node's own badge, the center node)
        // counts HARD_WEIGHT times more than the same area of overlap with a
        // soft one (a sibling badge, the chain, a hero content block) — so
        // the search always prefers clearing a hard rect over a soft one,
        // but among moves that are equal on that front it still prefers
        // clearing more soft-rect area, and — critically — never takes a
        // move that clears a soft rect at the cost of RE-overlapping a hard
        // one, since that would raise the weighted total it's minimizing.
        // Each round finds the single cheapest-to-reach, most-improving push
        // (from any edge of any rect the panel currently overlaps, clamped
        // to bounds) and takes it if it actually reduces the weighted total;
        // repeated since one improving move can open up another.
        const HARD_WEIGHT = 1000;
        const weightedOverlap = (bx) =>
          avoidRects.reduce((total, r) => {
            const ox = Math.min(bx.right, r.right) - Math.max(bx.left, r.left);
            const oy = Math.min(bx.bottom, r.bottom) - Math.max(bx.top, r.top);
            if (ox <= 0 || oy <= 0) return total;
            const area = ox * oy;
            return total + (hardRects.includes(r) ? area * HARD_WEIGHT : area);
          }, 0);
        const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
        // A pure area-minimizing search has no notion of "too far" — clearing
        // the last sliver of a hard rect's overlap is worth so much (HARD_
        // WEIGHT) that the search will happily take a 150px+ detour for it,
        // one small improving step at a time, ending up exactly as
        // disconnected from the node as the original viewport-bounds bug
        // this whole positioning system was built to fix. TRAVEL_BUDGET caps
        // total displacement from the natural NODE_GAP anchor — once a move
        // would exceed it, that option is off the table (even if it's the
        // only one still reducing overlap), so the search settles for the
        // closest state it already reached rather than wandering for a
        // marginally cleaner one.
        const TRAVEL_BUDGET = 120;

        for (let round = 0; round < 10; round++) {
          const b = panelBox(a.x, a.y, w, h, hSide, vSide, dx, dy);
          const current = weightedOverlap(b);
          if (current === 0) break;

          let bestOpt = null;
          let bestScore = current;
          for (const r of avoidRects) {
            const overlapX = Math.min(b.right, r.right) - Math.max(b.left, r.left);
            const overlapY = Math.min(b.bottom, r.bottom) - Math.max(b.top, r.top);
            if (overlapX <= 0 || overlapY <= 0) continue;

            const options = [
              { axis: "x", delta: clamp(r.right + AVOID_MARGIN - b.left, -Infinity, bounds.right - CLAMP_MARGIN - b.right) },
              { axis: "x", delta: clamp(r.left - AVOID_MARGIN - b.right, bounds.left + CLAMP_MARGIN - b.left, Infinity) },
              { axis: "y", delta: clamp(r.bottom + AVOID_MARGIN - b.top, -Infinity, bounds.bottom - CLAMP_MARGIN - b.bottom) },
              { axis: "y", delta: clamp(r.top - AVOID_MARGIN - b.bottom, bounds.top + CLAMP_MARGIN - b.top, Infinity) },
            ];
            for (const opt of options) {
              if (opt.delta === 0) continue;
              const nDx = opt.axis === "x" ? dx + opt.delta : dx;
              const nDy = opt.axis === "y" ? dy + opt.delta : dy;
              if (Math.abs(nDx) + Math.abs(nDy) > TRAVEL_BUDGET) continue;
              const nb = opt.axis === "x" ? panelBox(a.x, a.y, w, h, hSide, vSide, nDx, dy) : panelBox(a.x, a.y, w, h, hSide, vSide, dx, nDy);
              const score = weightedOverlap(nb);
              if (score < bestScore) {
                bestScore = score;
                bestOpt = opt;
              }
            }
          }
          if (!bestOpt) break;
          if (bestOpt.axis === "x") dx += bestOpt.delta;
          else dy += bestOpt.delta;
          clampToBounds();
        }

        const finalBox = panelBox(a.x, a.y, w, h, hSide, vSide, dx, dy);
        const overlapArea = (r) => {
          const ox = Math.min(finalBox.right, r.right) - Math.max(finalBox.left, r.left);
          const oy = Math.min(finalBox.bottom, r.bottom) - Math.max(finalBox.top, r.top);
          return ox > 0 && oy > 0 ? ox * oy : 0;
        };
        const overlaps = (r) => overlapArea(r) > 0;
        const overlapCount = avoidRects.reduce((n, r) => (overlaps(r) ? n + 1 : n), 0);
        // Whether THIS specific candidate still overlaps either hard rect
        // (the active node's own badge, or the center node) after nudging —
        // tracked separately from the general overlapCount below because
        // it's weighted very differently: a candidate that dodges both but
        // grazes a sibling badge instead is preferred over one that's
        // technically "cleaner" overall but lands back on the node or center.
        // hardOverlapArea is the finer-grained version of the same idea, used
        // to break ties BETWEEN candidates that all still overlap a hard rect
        // (a genuinely too-small container) — smallest remaining intrusion
        // wins, rather than falling through to cost, which has no idea how
        // deep the overlap actually is.
        const hardOverlap = hardRects.some(overlaps);
        const hardOverlapArea = hardRects.reduce((n, r) => n + overlapArea(r), 0);

        return { hSide, vSide, dx, dy, overlapCount, hardOverlap, hardOverlapArea, cost: Math.abs(dx) + Math.abs(dy) };
      };

      // Every placement (four diagonals + four compass points) is a
      // geometrically valid place to anchor the panel — which one actually
      // avoids overlapping real content depends on what's around the node on
      // screen, not on the concept's angle alone. So every placement is
      // resolved and scored, and the cleanest one wins; the tangent-blended
      // diagonal only orders the search so the "natural" placement is tried
      // first when more than one is clean. Not overlapping the active node's
      // own badge OR the center node is a harder requirement than not
      // overlapping a sibling's — sorted first, ahead of overlapCount, so a
      // candidate that keeps clear of both but grazes a neighbor always beats
      // one that's overall "cleaner" but sits back on top of either. When
      // EVERY candidate still overlaps a hard rect (a container too small to
      // fully clear both at once, at any angle), hardOverlapArea breaks the
      // tie by how deep the remaining intrusion is — cost alone doesn't know
      // that, and would just as happily pick a candidate that shifted a
      // little and still buried the badge as one that shifted a little more
      // and left only a sliver overlapping.
      const preferred = preferredDiagonal(containerRect, nodeRect);
      const results = placementSearchOrder(preferred).map(({ hSide, vSide }) => resolveQuadrant(hSide, vSide));
      results.sort(
        (p, q) =>
          (p.hardOverlap === q.hardOverlap ? 0 : p.hardOverlap ? 1 : -1) ||
          p.hardOverlapArea - q.hardOverlapArea ||
          p.overlapCount - q.overlapCount ||
          p.cost - q.cost
      );
      const best = results[0];
      const anchor = sideAnchor(nodeRect, best.hSide, best.vSide);

      setPos((prev) => {
        const next = {
          left: anchor.x - containerRect.left,
          top: anchor.y - containerRect.top,
          hSide: best.hSide,
          vSide: best.vSide,
          dx: best.dx,
          dy: best.dy,
        };
        return prev.left === next.left && prev.top === next.top && prev.hSide === next.hSide && prev.vSide === next.vSide && prev.dx === next.dx && prev.dy === next.dy
          ? prev
          : next;
      });
    };

    recompute();
    window.addEventListener("resize", recompute);
    window.addEventListener("orientationchange", recompute);
    return () => {
      window.removeEventListener("resize", recompute);
      window.removeEventListener("orientationchange", recompute);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [concept]);

  if (!concept) return null;
  return (
    <motion.div
      ref={panelRef}
      key={concept.id}
      data-testid="concept-graph-chain-detail"
      className="absolute pointer-events-none z-10 rounded-md"
      style={{
        left: `${pos.left}px`,
        top: `${pos.top}px`,
        width: `${PANEL_MAX_W}px`,
        padding: "8px 10px",
        // No compensating negative margin here (an earlier version had one,
        // to expand the backdrop without moving the percentage-based anchor
        // it used to be positioned by) — every position/overlap computation
        // above is measured off this element's real getBoundingClientRect(),
        // so left/top now have to be exactly where that measurement expects
        // them, with nothing shifting the rendered box away from them.
        // A subtle backdrop card, always present — the fallback for the rare
        // angle/width combinations where the repositioning above still can't
        // fully clear the active chain's own line: a line crossing behind the
        // panel reads as passing behind a card, not through the letters.
        background: "rgba(10,10,10,0.6)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        transform: `translate(${H_TRANSFORM[pos.hSide]}, ${V_TRANSFORM[pos.vSide]}) translate(${pos.dx}px, ${pos.dy}px)`,
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
  const containerRef = useRef(null);

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
      ref={containerRef}
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

        <circle
          data-testid="concept-graph-center-node"
          cx={centerPos.x}
          cy={centerPos.y}
          r={CENTER_R}
          fill={ACCENT}
          stroke={NODE_REST_STROKE}
          strokeWidth="1.5"
          aria-hidden="true"
        />
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
                // Percentage of the graph container, not a fixed px size — the
                // container's own width is now fluid (see Hero.jsx), and a
                // fixed-px hit target would stay full-size while everything
                // else shrank around it, ending up oversized/overlapping
                // neighbors at small container widths.
                width: `${(cfg.hit / cfg.w) * 100}%`,
                height: `${(cfg.hit / cfg.h) * 100}%`,
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                outline: "none",
              }}
              onMouseEnter={() => canHover && open(c.id)}
              onMouseLeave={() => canHover && close()}
              // Tapping a focusable element focuses it before the click
              // fires — on a hover-capable device that's harmless (this just
              // mirrors the hover-preview above, and toggle() is skipped
              // entirely there, see onClick), but on a touch device with no
              // hover it was a real bug: unconditional open() here ran on
              // every tap, immediately before onClick's toggle() saw the node
              // already active and flipped it straight back closed — so taps
              // silently did nothing. Gating both by canHover leaves keyboard
              // activation (handleKeyDown, unconditional below) as the one
              // path that opens a node on non-hover devices, with taps
              // handled by onClick's toggle() alone.
              onFocus={() => canHover && open(c.id)}
              onBlur={() => canHover && close()}
              onClick={(e) => {
                e.stopPropagation();
                if (!canHover) toggle(c.id);
              }}
              onKeyDown={(e) => handleKeyDown(c.id, e)}
            >
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  // Percentage of THIS div's own parent (the hit target above,
                  // sized cfg.hit) rather than of cfg.w — that keeps the
                  // badge:hit ratio correct regardless of the hit target's
                  // own (already-percentage) size, instead of compounding two
                  // container-relative percentages into a value scaled by
                  // cfg.w twice over.
                  width: `${(cfg.badge / cfg.hit) * 100}%`,
                  height: `${(cfg.badge / cfg.hit) * 100}%`,
                  background: BADGE_BG,
                  border: `1.5px solid ${borderColor}`,
                  boxShadow: glow,
                  transition: reduce ? "none" : "border-color 0.4s ease, box-shadow 0.4s ease",
                }}
              >
                <Icon
                  color={iconColor}
                  strokeWidth={2}
                  style={{ width: "47%", height: "47%", transition: reduce ? "none" : "color 0.4s ease" }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {activeConcept && <ChainDetail key={activeConcept.id} concept={activeConcept} reduce={reduce} containerRef={containerRef} />}
      </AnimatePresence>
    </div>
  );
}
