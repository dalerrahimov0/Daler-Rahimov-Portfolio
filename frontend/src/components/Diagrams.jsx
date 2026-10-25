import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

// Framer Motion's whileInView relies on IntersectionObserver to flip elements
// from `initial` to their visible state. On mobile Safari (and mobile Chrome
// on iOS, which also runs WebKit), IntersectionObserver targeting SVG <g>
// elements is unreliable — the callback can simply never fire for a group
// element that has no well-defined content box of its own. That leaves nodes
// stuck at initial={opacity:0}. SVG <line> elements are less affected since
// they carry their own explicit geometry (x1/y1/x2/y2), which is why edges
// "sometimes render" while node groups stay invisible — the exact symptom
// reported. These are architecture diagrams, not decoration: below the mobile
// breakpoint we skip whileInView/IntersectionObserver entirely and render the
// final visible state directly. Desktop keeps the richer scroll-triggered
// animation unchanged.
//
// Colors come from the theme tokens in index.css and are applied via `style`
// (SVG presentation attributes don't resolve var()), so every diagram follows
// the active theme with no theme logic here.
const BRAND = "rgb(var(--brand))";
// `label` may be an array for a multi-line label; `dashed` outlines a node in
// the brand color with a dashed stroke (used for AI-only steps).
const Box = ({ x, y, w = 120, h = 44, label, accent = false, dashed = false, color = BRAND, accentText = "#ffffff", delay = 0, reduce, animated = true }) => {
  const lines = Array.isArray(label) ? label : [label];
  const rect = (
    <rect
      x={x - w / 2} y={y - h / 2} width={w} height={h}
      strokeWidth="1" rx="2"
      strokeDasharray={dashed ? "4 3" : undefined}
      style={{ fill: accent ? color : "rgb(var(--surface))", stroke: accent || dashed ? color : "var(--diagram-stroke)" }}
    />
  );
  const text = (
    <text
      x={x} y={y} textAnchor="middle" dominantBaseline="central"
      fontSize="12"
      fontFamily="JetBrains Mono, monospace"
      style={{ fill: accent ? accentText : "rgb(var(--ink-body))" }}
    >
      {lines.length === 1
        ? lines[0]
        : lines.map((line, i) => (
            <tspan key={line} x={x} dy={i === 0 ? `${-(lines.length - 1) * 0.6}em` : "1.2em"}>{line}</tspan>
          ))}
    </text>
  );

  if (!animated || reduce) {
    return <g>{rect}{text}</g>;
  }

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {rect}
      {text}
    </motion.g>
  );
};

const Edge = ({ x1, y1, x2, y2, color = BRAND, delay = 0, reduce, animated = true }) => {
  if (!animated || reduce) {
    return <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1" strokeOpacity="0.55" style={{ stroke: color }} />;
  }

  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      strokeWidth="1" strokeOpacity="0.55"
      style={{ stroke: color }}
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
    />
  );
};

// Every diagram is a plain SVG with only a viewBox and CSS width:100%/height:auto.
// Several mobile browsers (notably iOS/mobile Safari) fail to derive an SVG's
// intrinsic aspect ratio from viewBox alone once the SVG has no explicit
// width/height attributes, and collapse it to 0 height. That in turn makes every
// child element zero-area, so Framer Motion's IntersectionObserver-based
// whileInView never fires and nodes stay stuck at their initial opacity: 0 —
// the diagram "disappears" while its (real-height, padded) container stays visible.
// Fix: give the root <svg> explicit width/height matching the viewBox, and pin
// the CSS aspect-ratio to match — this makes height:auto resolve deterministically
// on every engine without changing the rendered size on desktop.
const ResponsiveSvg = ({ w, h, className, ...rest }) => (
  <svg
    width={w}
    height={h}
    viewBox={`0 0 ${w} ${h}`}
    preserveAspectRatio="xMidYMid meet"
    className={`w-full h-auto ${className || ""}`}
    style={{ aspectRatio: `${w} / ${h}` }}
    {...rest}
  />
);

const MOBILE_QUERY = "(max-width: 639px)";

export const PAIDiagram = () => {
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery(MOBILE_QUERY);

  if (isMobile) {
    // Narrower, taller viewBox: same six nodes, stacked 2-up under the core
    // instead of ringed around it, so labels stay legible without cropping.
    const core = { x: 190, y: 55 };
    const nodes = [
      { label: "Skills", x: 105, y: 170 }, { label: "Hooks", x: 275, y: 170 },
      { label: "Memory", x: 105, y: 280 }, { label: "Agents", x: 275, y: 280 },
      { label: "Tools", x: 105, y: 390 }, { label: "Pipelines", x: 275, y: 390 },
    ];
    return (
      <ResponsiveSvg w={380} h={470} role="img" aria-label="Personal AI Architecture diagram: core connected to skills, hooks, memory, agents, tools, and pipelines">
        {nodes.map((n, i) => (
          <Edge key={n.label} x1={core.x} y1={core.y} x2={n.x} y2={n.y} reduce={reduce} animated={false} />
        ))}
        <Box x={core.x} y={core.y} w={190} h={56} label="Core Context" accent reduce={reduce} animated={false} />
        {nodes.map((n, i) => (
          <Box key={n.label} x={n.x} y={n.y} w={140} h={44} label={n.label} reduce={reduce} animated={false} />
        ))}
      </ResponsiveSvg>
    );
  }

  const core = { x: 400, y: 200 };
  const nodes = [
    { label: "Skills", x: 130, y: 70 }, { label: "Hooks", x: 400, y: 50 },
    { label: "Memory", x: 670, y: 70 }, { label: "Agents", x: 130, y: 330 },
    { label: "Tools", x: 400, y: 350 }, { label: "Pipelines", x: 670, y: 330 },
  ];
  return (
    <ResponsiveSvg w={800} h={400} role="img" aria-label="Personal AI Architecture diagram: core connected to skills, hooks, memory, agents, tools, and pipelines">
      {nodes.map((n, i) => (
        <Edge key={n.label} x1={core.x} y1={core.y} x2={n.x} y2={n.y} delay={0.3 + i * 0.15} reduce={reduce} />
      ))}
      <Box x={core.x} y={core.y} w={150} h={56} label="Core Context" accent delay={0.1} reduce={reduce} />
      {nodes.map((n, i) => (
        <Box key={n.label} x={n.x} y={n.y} label={n.label} delay={0.5 + i * 0.15} reduce={reduce} />
      ))}
    </ResponsiveSvg>
  );
};

// Text on the flagship's gold fill: --gold-contrast is white in dark (as
// before) and charcoal in light, where white on champagne is unreadable.
const GOLD_CONTRAST = "rgb(var(--gold-contrast))";

export const TajKhonaDiagram = ({ accentColor = BRAND }) => {
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery(MOBILE_QUERY);

  if (isMobile) {
    // Same four leaf services, reflowed into a 2x2 grid under the platform
    // node instead of a single cramped row.
    return (
      <ResponsiveSvg w={380} h={430} role="img" aria-label="TajKhona architecture: Next.js client connected to Supabase services">
        <Edge x1={190} y1={73} x2={190} y2={132} reduce={reduce} animated={false} />
        <Edge x1={190} y1={188} x2={100} y2={255} reduce={reduce} animated={false} />
        <Edge x1={190} y1={188} x2={280} y2={255} reduce={reduce} animated={false} />
        <Edge x1={190} y1={188} x2={100} y2={365} reduce={reduce} animated={false} />
        <Edge x1={190} y1={188} x2={280} y2={365} reduce={reduce} animated={false} />
        <Box x={190} y={50} w={170} h={46} label="Next.js Client" reduce={reduce} animated={false} />
        <Box x={190} y={160} w={190} h={56} label="Supabase Platform" accent color={accentColor} accentText={accentColor === BRAND ? undefined : GOLD_CONTRAST} reduce={reduce} animated={false} />
        <Box x={100} y={280} w={150} h={42} label="Auth + Postgres" reduce={reduce} animated={false} />
        <Box x={280} y={280} w={130} h={42} label="Maps" reduce={reduce} animated={false} />
        <Box x={100} y={390} w={130} h={42} label="AI Layer" reduce={reduce} animated={false} />
        <Box x={280} y={390} w={150} h={42} label="Analytics + Admin" reduce={reduce} animated={false} />
      </ResponsiveSvg>
    );
  }

  return (
    <ResponsiveSvg w={800} h={340} role="img" aria-label="TajKhona architecture: Next.js client connected to Supabase services">
      <Edge x1={400} y1={70} x2={400} y2={150} delay={0.3} reduce={reduce} />
      <Edge x1={400} y1={210} x2={150} y2={290} delay={0.6} reduce={reduce} />
      <Edge x1={400} y1={210} x2={330} y2={290} delay={0.75} reduce={reduce} />
      <Edge x1={400} y1={210} x2={510} y2={290} delay={0.9} reduce={reduce} />
      <Edge x1={400} y1={210} x2={670} y2={290} delay={1.05} reduce={reduce} />
      <Box x={400} y={50} w={170} h={46} label="Next.js Client" delay={0.1} reduce={reduce} />
      <Box x={400} y={180} w={190} h={56} label="Supabase Platform" accent color={accentColor} accentText={accentColor === BRAND ? undefined : GOLD_CONTRAST} delay={0.4} reduce={reduce} />
      <Box x={150} y={300} w={130} h={42} label="Auth + Postgres" delay={0.7} reduce={reduce} />
      <Box x={330} y={300} w={110} h={42} label="Maps" delay={0.85} reduce={reduce} />
      <Box x={510} y={300} w={110} h={42} label="AI Layer" delay={1.0} reduce={reduce} />
      <Box x={670} y={300} w={130} h={42} label="Analytics + Admin" delay={1.15} reduce={reduce} />
    </ResponsiveSvg>
  );
};

export const PipelineDiagram = () => {
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery(MOBILE_QUERY);

  if (isMobile) {
    // Same five pipeline stages, stacked top-to-bottom instead of left-to-right
    // so no stage is cropped and labels stay full-width readable.
    const steps = [
      { label: "Qualtrics", y: 55 }, { label: "Power Query", y: 155 },
      { label: "Fabric Lakehouse", y: 255 }, { label: "Semantic Model", y: 355 },
      { label: "Power BI", y: 455 },
    ];
    return (
      <ResponsiveSvg w={340} h={510} role="img" aria-label="Library analytics pipeline: Qualtrics survey data flows through Power Query and Microsoft Fabric into a semantic model and Power BI">
        {steps.slice(0, -1).map((s, i) => (
          <Edge key={s.label} x1={170} y1={s.y + 23} x2={170} y2={steps[i + 1].y - 23} reduce={reduce} animated={false} />
        ))}
        {steps.map((s, i) => (
          <Box key={s.label} x={170} y={s.y} w={260} h={46} label={s.label} accent={i === 4} reduce={reduce} animated={false} />
        ))}
      </ResponsiveSvg>
    );
  }

  const steps = [
    { label: "Qualtrics", x: 90 }, { label: "Power Query", x: 250 },
    { label: "Fabric Lakehouse", x: 410 }, { label: "Semantic Model", x: 580 },
    { label: "Power BI", x: 730 },
  ];
  return (
    <ResponsiveSvg w={820} h={160} role="img" aria-label="Library analytics pipeline: Qualtrics survey data flows through Power Query and Microsoft Fabric into a semantic model and Power BI">
      {steps.slice(0, -1).map((s, i) => (
        <Edge key={s.label} x1={s.x + 60} y1={80} x2={steps[i + 1].x - 70} y2={80} delay={0.3 + i * 0.2} reduce={reduce} />
      ))}
      {steps.map((s, i) => (
        <Box key={s.label} x={s.x} y={80} w={i === 3 ? 140 : 120} h={46} label={s.label} accent={i === 4} delay={0.1 + i * 0.2} reduce={reduce} />
      ))}
    </ResponsiveSvg>
  );
};

const DiagramLabel = ({ x, y, children, anchor = "start", size = 10 }) => (
  <text
    x={x} y={y} textAnchor={anchor} dominantBaseline="central"
    fontSize={size} letterSpacing="0.12em"
    fontFamily="JetBrains Mono, monospace"
    style={{ fill: "rgb(var(--ink-muted))" }}
  >
    {children}
  </text>
);

// Legend swatches mirror Box: plain stroke = deterministic code, brand fill =
// the calculation engine, dashed brand stroke = AI (language only).
const DataLensLegend = ({ items }) => (
  <g>
    {items.map((it) => (
      <g key={it.label}>
        <rect
          x={it.x} y={it.y - 5} width="16" height="10" rx="1" strokeWidth="1"
          strokeDasharray={it.kind === "ai" ? "3 2" : undefined}
          style={{
            fill: it.kind === "engine" ? BRAND : "rgb(var(--surface))",
            stroke: it.kind === "plain" ? "var(--diagram-stroke)" : BRAND,
          }}
        />
        <DiagramLabel x={it.x + 24} y={it.y} size={11}>{it.label}</DiagramLabel>
      </g>
    ))}
  </g>
);

const DATALENS_PIPELINE = [
  { label: ["CSV / XLSX", "Upload"] },
  { label: ["Profiling &", "Quality Analysis"] },
  { label: ["Deterministic", "Calculation Engine"], accent: true },
  { label: ["Validation &", "Evidence"] },
  { label: ["Dashboard &", "AI Copilot"] },
];

const DATALENS_COPILOT = [
  { label: ["User", "Question"] },
  { label: ["AI Intent", "Interpretation"], dashed: true },
  { label: ["Validated", "Data Query"] },
  { label: ["Deterministic", "Calculation"], accent: true },
  { label: "Evidence" },
  { label: ["Natural-Language", "Explanation"], dashed: true },
];

const DATALENS_ARIA =
  "DataLens architecture. Analytical pipeline: CSV/XLSX upload, data profiling and quality analysis, deterministic calculation engine, validation and evidence, dashboard and AI Copilot. Copilot request: user question, AI intent interpretation, validated data query, deterministic calculation using analytical components shared with the pipeline, evidence, natural-language explanation. AI is used only for interpreting and wording; numbers come from deterministic code.";

export const DataLensDiagram = () => {
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery(MOBILE_QUERY);

  if (isMobile) {
    // Two columns instead of two rows: pipeline on the left, Copilot request
    // on the right, with the legend in the slot under the shorter column.
    const rowY = (i) => 72 + i * 84;
    const H = 54;
    const left = { x: 95, w: 170 };
    const right = { x: 285, w: 170 };
    return (
      <ResponsiveSvg w={380} h={540} role="img" aria-label={DATALENS_ARIA}>
        <DiagramLabel x={left.x} y={22} anchor="middle">PIPELINE</DiagramLabel>
        <DiagramLabel x={right.x} y={22} anchor="middle">COPILOT</DiagramLabel>
        {DATALENS_PIPELINE.slice(0, -1).map((n, i) => (
          <Edge key={`pl-${i}`} x1={left.x} y1={rowY(i) + H / 2} x2={left.x} y2={rowY(i + 1) - H / 2} reduce={reduce} animated={false} />
        ))}
        {DATALENS_COPILOT.slice(0, -1).map((n, i) => (
          <Edge key={`cp-${i}`} x1={right.x} y1={rowY(i) + H / 2} x2={right.x} y2={rowY(i + 1) - H / 2} reduce={reduce} animated={false} />
        ))}
        <Edge x1={left.x + left.w / 2} y1={rowY(2)} x2={right.x - right.w / 2} y2={rowY(3)} reduce={reduce} animated={false} />
        {DATALENS_PIPELINE.map((n, i) => (
          <Box key={`pb-${i}`} x={left.x} y={rowY(i)} w={left.w} h={H} label={n.label} accent={n.accent} reduce={reduce} animated={false} />
        ))}
        {DATALENS_COPILOT.map((n, i) => (
          <Box key={`cb-${i}`} x={right.x} y={rowY(i)} w={right.w} h={H} label={n.label} accent={n.accent} dashed={n.dashed} reduce={reduce} animated={false} />
        ))}
        <DataLensLegend
          items={[
            { x: 12, y: 466, kind: "plain", label: "Deterministic" },
            { x: 12, y: 490, kind: "engine", label: "Calc engine" },
            { x: 12, y: 514, kind: "ai", label: "AI · language" },
          ]}
        />
      </ResponsiveSvg>
    );
  }

  const H = 54;
  const pipe = { y: 78, w: 148, xs: [86, 258, 430, 602, 774] };
  const cop = { y: 228, w: 126, xs: [72, 215, 358, 502, 645, 788] };
  return (
    <ResponsiveSvg w={860} h={330} role="img" aria-label={DATALENS_ARIA}>
      <DiagramLabel x={12} y={28}>ANALYTICAL PIPELINE</DiagramLabel>
      <DiagramLabel x={12} y={178}>COPILOT REQUEST</DiagramLabel>
      {pipe.xs.slice(0, -1).map((x, i) => (
        <Edge key={`pl-${i}`} x1={x + pipe.w / 2} y1={pipe.y} x2={pipe.xs[i + 1] - pipe.w / 2} y2={pipe.y} delay={0.3 + i * 0.15} reduce={reduce} />
      ))}
      {cop.xs.slice(0, -1).map((x, i) => (
        <Edge key={`cp-${i}`} x1={x + cop.w / 2} y1={cop.y} x2={cop.xs[i + 1] - cop.w / 2} y2={cop.y} delay={0.9 + i * 0.12} reduce={reduce} />
      ))}
      {/* The Copilot's calculation reuses the pipeline's analytical components. */}
      <Edge x1={pipe.xs[2]} y1={pipe.y + H / 2} x2={cop.xs[3]} y2={cop.y - H / 2} delay={0.8} reduce={reduce} />
      <DiagramLabel x={480} y={150}>shared analytical components</DiagramLabel>
      {DATALENS_PIPELINE.map((n, i) => (
        <Box key={`pb-${i}`} x={pipe.xs[i]} y={pipe.y} w={pipe.w} h={H} label={n.label} accent={n.accent} delay={0.1 + i * 0.15} reduce={reduce} />
      ))}
      {DATALENS_COPILOT.map((n, i) => (
        <Box key={`cb-${i}`} x={cop.xs[i]} y={cop.y} w={cop.w} h={H} label={n.label} accent={n.accent} dashed={n.dashed} delay={0.7 + i * 0.12} reduce={reduce} />
      ))}
      <DataLensLegend
        items={[
          { x: 12, y: 310, kind: "plain", label: "Deterministic code" },
          { x: 200, y: 310, kind: "engine", label: "Calculation engine" },
          { x: 388, y: 310, kind: "ai", label: "AI — language only, never numbers" },
        ]}
      />
    </ResponsiveSvg>
  );
};

export const Diagram = ({ type, accentColor }) => {
  if (type === "pai") return <PAIDiagram />;
  if (type === "datalens") return <DataLensDiagram />;
  if (type === "tajkhona") return <TajKhonaDiagram accentColor={accentColor} />;
  return null;
};
