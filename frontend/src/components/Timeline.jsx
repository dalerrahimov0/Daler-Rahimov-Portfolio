import { Reveal, Overline } from "@/components/Reveal";
import { TIMELINE } from "@/lib/data";
import { Flag, BookOpen, Users, Shield, Globe, GraduationCap, Bot, Brain, Building2, Zap } from "lucide-react";

const ICONS = {
  flag: Flag,
  book: BookOpen,
  users: Users,
  shield: Shield,
  globe: Globe,
  graduation: GraduationCap,
  bot: Bot,
  brain: Brain,
  building: Building2,
  zap: Zap,
};

const TimelineItem = ({ item, index }) => {
  const isRight = index % 2 === 1;
  const Icon = ICONS[item.icon];
  const accent = item.gold ? "#c9a66b" : "#5e6ad2";

  return (
    <Reveal delay={Math.min(index * 0.05, 0.3)}>
      <div
        className={`relative pb-10 pl-10 md:pl-0 ${
          isRight ? "md:flex md:justify-start md:pl-[calc(50%+1.75rem)]" : "md:flex md:justify-end md:pr-[calc(50%+1.75rem)]"
        }`}
      >
        <span
          className="absolute left-4 md:left-1/2 top-1.5 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 border-[#0a0a0a]"
          style={{ backgroundColor: accent }}
          aria-hidden="true"
        />
        {item.current && (
          <span
            className="absolute left-4 md:left-1/2 top-1.5 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full animate-ping"
            style={{ backgroundColor: accent }}
            aria-hidden="true"
          />
        )}

        <div
          data-testid={`timeline-item-${index}`}
          className="w-full md:max-w-md border border-white/5 bg-[#0f1011] p-5 hover:border-white/10 transition-colors duration-300"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className="font-mono2 text-[10px] uppercase tracking-[0.18em] text-zinc-600">{item.period}</span>
            <span
              className="font-mono2 text-[10px] uppercase tracking-[0.18em] border px-2 py-0.5 shrink-0"
              style={{ color: accent, borderColor: `${accent}4d` }}
            >
              {item.tag}
            </span>
          </div>
          <div className="flex items-start gap-3">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center border"
              style={{ color: accent, borderColor: `${accent}33` }}
            >
              <Icon size={14} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-display font-medium text-white text-sm leading-snug">{item.title}</h3>
              <p className="text-zinc-600 text-xs mt-0.5">{item.org}</p>
            </div>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed mt-3">{item.body}</p>
        </div>
      </div>
    </Reveal>
  );
};

export default function Timeline() {
  return (
    <section id="timeline" data-testid="timeline-section" className="mx-auto max-w-6xl px-6 py-32 lg:py-44">
      <Reveal>
        <Overline>Career &amp; Education Journey</Overline>
        <h2 className="font-display font-bold text-white tracking-tight text-2xl sm:text-3xl lg:text-4xl max-w-2xl leading-tight">
          A progression, not a resume list.
        </h2>
        <p className="text-zinc-500 mt-5 max-w-xl leading-relaxed">
          Leadership, analytics, and AI implementation, building toward the systems on this page.
        </p>
      </Reveal>

      <div className="relative mt-16">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 bg-white/10" aria-hidden="true" />
        {TIMELINE.map((item, i) => (
          <TimelineItem key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
