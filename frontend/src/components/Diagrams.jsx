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
const Box = ({ x, y, w = 120, h = 44, label, accent = false, color = "#5e6ad2", delay = 0, reduce, animated = true }) => {
  const rect = (
    <rect
      x={x - w / 2} y={y - h / 2} width={w} height={h}
      fill={accent ? color : "#0f1011"}
      stroke={accent ? color : "#3f3f46"} strokeWidth="1" rx="2"
    />
  );
  const text = (
    <text
      x={x} y={y} textAnchor="middle" dominantBaseline="central"
      fill={accent ? "#ffffff" : "#d4d4d8"} fontSize="12"
      fontFamily="JetBrains Mono, monospace"
    >
      {label}
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

const Edge = ({ x1, y1, x2, y2, color = "#5e6ad2", delay = 0, reduce, animated = true }) => {
  if (!animated || reduce) {
    return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1" strokeOpacity="0.55" />;
  }

  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color} strokeWidth="1" strokeOpacity="0.55"
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

export const TajKhonaDiagram = ({ accentColor = "#5e6ad2" }) => {
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
        <Box x={190} y={160} w={190} h={56} label="Supabase Platform" accent color={accentColor} reduce={reduce} animated={false} />
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
      <Box x={400} y={180} w={190} h={56} label="Supabase Platform" accent color={accentColor} delay={0.4} reduce={reduce} />
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

export const Diagram = ({ type, accentColor }) => {
  if (type === "pai") return <PAIDiagram />;
  if (type === "tajkhona") return <TajKhonaDiagram accentColor={accentColor} />;
  return null;
};
