import { motion, useReducedMotion } from "framer-motion";

const Box = ({ x, y, w = 120, h = 44, label, accent = false, color = "#5e6ad2", delay = 0, reduce }) => (
  <motion.g
    initial={reduce ? false : { opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <rect
      x={x - w / 2} y={y - h / 2} width={w} height={h}
      fill={accent ? color : "#0f1011"}
      stroke={accent ? color : "#3f3f46"} strokeWidth="1" rx="2"
    />
    <text
      x={x} y={y} textAnchor="middle" dominantBaseline="central"
      fill={accent ? "#ffffff" : "#d4d4d8"} fontSize="12"
      fontFamily="JetBrains Mono, monospace"
    >
      {label}
    </text>
  </motion.g>
);

const Edge = ({ x1, y1, x2, y2, color = "#5e6ad2", delay = 0, reduce }) => (
  <motion.line
    x1={x1} y1={y1} x2={x2} y2={y2}
    stroke={color} strokeWidth="1" strokeOpacity="0.55"
    initial={reduce ? false : { pathLength: 0 }}
    whileInView={{ pathLength: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.9, delay, ease: "easeOut" }}
  />
);

export const PAIDiagram = () => {
  const reduce = useReducedMotion();
  const core = { x: 400, y: 200 };
  const nodes = [
    { label: "Skills", x: 130, y: 70 }, { label: "Hooks", x: 400, y: 50 },
    { label: "Memory", x: 670, y: 70 }, { label: "Agents", x: 130, y: 330 },
    { label: "Tools", x: 400, y: 350 }, { label: "Pipelines", x: 670, y: 330 },
  ];
  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto" role="img" aria-label="Personal AI Architecture diagram: core connected to skills, hooks, memory, agents, tools, and pipelines">
      {nodes.map((n, i) => (
        <Edge key={n.label} x1={core.x} y1={core.y} x2={n.x} y2={n.y} delay={0.3 + i * 0.15} reduce={reduce} />
      ))}
      <Box x={core.x} y={core.y} w={150} h={56} label="Core Context" accent delay={0.1} reduce={reduce} />
      {nodes.map((n, i) => (
        <Box key={n.label} x={n.x} y={n.y} label={n.label} delay={0.5 + i * 0.15} reduce={reduce} />
      ))}
    </svg>
  );
};

export const TajKhonaDiagram = ({ accentColor = "#5e6ad2" }) => {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 800 340" className="w-full h-auto" role="img" aria-label="TajKhona architecture: Next.js client connected to Supabase services">
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
    </svg>
  );
};

export const PipelineDiagram = () => {
  const reduce = useReducedMotion();
  const steps = [
    { label: "Qualtrics", x: 90 }, { label: "Power Query", x: 250 },
    { label: "Fabric Lakehouse", x: 410 }, { label: "Semantic Model", x: 580 },
    { label: "Power BI", x: 730 },
  ];
  return (
    <svg viewBox="0 0 820 160" className="w-full h-auto" role="img" aria-label="Library analytics pipeline: Qualtrics survey data flows through Power Query and Microsoft Fabric into a semantic model and Power BI">
      {steps.slice(0, -1).map((s, i) => (
        <Edge key={s.label} x1={s.x + 60} y1={80} x2={steps[i + 1].x - 70} y2={80} delay={0.3 + i * 0.2} reduce={reduce} />
      ))}
      {steps.map((s, i) => (
        <Box key={s.label} x={s.x} y={80} w={i === 3 ? 140 : 120} h={46} label={s.label} accent={i === 4} delay={0.1 + i * 0.2} reduce={reduce} />
      ))}
    </svg>
  );
};

export const Diagram = ({ type, accentColor }) => {
  if (type === "pai") return <PAIDiagram />;
  if (type === "tajkhona") return <TajKhonaDiagram accentColor={accentColor} />;
  return null;
};
