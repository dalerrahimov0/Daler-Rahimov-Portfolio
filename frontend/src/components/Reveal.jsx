import { motion, useReducedMotion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "", y = 24 }) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export const Overline = ({ children }) => (
  <p className="font-mono2 text-xs uppercase tracking-[0.25em] text-zinc-500 mb-6">{children}</p>
);
