import { Reveal, Overline } from "@/components/Reveal";
import { TOOLS, TOOLS_SUBTITLE, TOOLS_STATEMENT } from "@/lib/data";
import { Bot, Database, Code, Cloud } from "lucide-react";

const ICONS = { bot: Bot, database: Database, code: Code, cloud: Cloud };

export default function Tools() {
  return (
    <section id="tools" data-testid="tools-section" className="mx-auto max-w-6xl px-6 py-32 lg:py-44">
      <Reveal>
        <Overline>Technologies &amp; Tools</Overline>
        <h2 className="font-display font-bold text-white tracking-tight text-2xl sm:text-3xl lg:text-4xl max-w-2xl leading-tight">
          {TOOLS_SUBTITLE}
        </h2>
      </Reveal>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        {TOOLS.map((t, i) => {
          const Icon = ICONS[t.icon];
          return (
            <Reveal key={t.title} delay={i * 0.07}>
              <div
                data-testid={`tools-card-${t.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="h-full border border-white/5 bg-[#0f1011] p-9 lg:p-12 hover:-translate-y-1 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono2 text-xs text-[#5e6ad2] tracking-widest">0{i + 1}</span>
                  <Icon size={18} className="text-zinc-600" aria-hidden="true" />
                </div>
                <h3 className="font-display font-medium text-white text-xl sm:text-2xl tracking-tight mt-4 mb-7">
                  {t.title}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {t.items.map((item) => (
                    <span key={item} className="font-mono2 text-xs text-zinc-300 border border-zinc-800 px-3 py-1.5">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={0.1}>
        <p className="mt-14 text-zinc-500 leading-relaxed border-l-2 border-[#5e6ad2]/40 pl-4 max-w-2xl">
          {TOOLS_STATEMENT}
        </p>
      </Reveal>
    </section>
  );
}
