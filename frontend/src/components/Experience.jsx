import { Reveal, Overline } from "@/components/Reveal";
import { EXPERIENCE_FEATURED, EXPERIENCE_SUPPORTING } from "@/lib/data";
import { PipelineDiagram } from "@/components/Diagrams";

const CurrentBadge = () => (
  <span className="inline-flex items-center gap-1.5 border border-[#5e6ad2]/30 bg-[#5e6ad2]/10 px-3 py-1 text-[10px] font-mono2 uppercase tracking-[0.2em] text-[#5e6ad2]">
    <span className="w-1.5 h-1.5 rounded-full bg-[#5e6ad2] animate-pulse" aria-hidden="true" />
    Current Role
  </span>
);

const OrgBadge = ({ children }) => (
  <span className="border border-zinc-800 px-3 py-1 text-[10px] font-mono2 uppercase tracking-[0.2em] text-zinc-500">
    {children}
  </span>
);

const FeaturedRole = ({ e, delay }) => (
  <Reveal delay={delay}>
    <div
      data-testid={`experience-featured-${e.id}`}
      className="border border-white/5 bg-[#0f1011] p-8 sm:p-10 lg:p-12 hover:border-white/10 transition-colors duration-300"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {e.current && <CurrentBadge />}
            <OrgBadge>{e.orgTag}</OrgBadge>
          </div>
          {e.evidence && (
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
              {e.evidence.map((ev) => (
                <span key={ev} className="font-display font-bold text-white text-lg sm:text-xl tracking-tight">
                  {ev}
                </span>
              ))}
            </div>
          )}
          <h3 className="font-display font-medium text-zinc-400 text-base sm:text-lg tracking-tight">{e.role}</h3>
          <p className="text-zinc-600 mt-0.5 text-sm">{e.org}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-mono2 text-sm text-[#5e6ad2]">{e.period}</p>
          <p className="text-xs text-zinc-600 mt-1">{e.note}</p>
        </div>
      </div>

      <div className="border-l-2 border-[#5e6ad2]/40 bg-[#5e6ad2]/5 px-5 py-4 mb-8">
        <p className="text-sm font-medium text-zinc-200 tracking-wide">Current Focus: {e.focus}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)] gap-10">
        <div>
          <p className="font-mono2 text-xs uppercase tracking-[0.22em] text-[#5e6ad2]/80 mb-3">Overview</p>
          <p className="text-zinc-400 leading-relaxed">{e.overview}</p>

          <p className="font-mono2 text-xs uppercase tracking-[0.22em] text-[#5e6ad2]/80 mt-8 mb-4">
            Responsibilities &amp; Impact
          </p>
          <ul className="space-y-3">
            {e.points.map((pt) => (
              <li key={pt} className="text-zinc-400 leading-relaxed flex gap-3">
                <span className="text-[#5e6ad2] mt-1.5 text-xs" aria-hidden="true">◆</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          <p className="font-mono2 text-xs uppercase tracking-[0.22em] text-[#5e6ad2]/80 mt-8 mb-4">Key Technologies</p>
          <div className="space-y-4">
            {e.techGroups.map((g) => (
              <div key={g.domain}>
                <p className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-2">{g.domain}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <span key={t} className="font-mono2 text-xs text-zinc-300 border border-zinc-800 px-3 py-1.5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono2 text-xs uppercase tracking-[0.22em] text-[#5e6ad2]/80 mb-4">Professional Highlights</p>
          <ul className="space-y-3">
            {e.highlights.map((h) => (
              <li key={h.text} className="border border-white/5 px-4 py-3 flex items-start gap-3">
                <span className="text-[#5e6ad2] text-xs shrink-0 mt-1" aria-hidden="true">◆</span>
                <div>
                  <p className="text-sm font-medium text-zinc-200">{h.text}</p>
                  {h.fact && <p className="text-xs text-zinc-500 mt-0.5">{h.fact}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-white/5">
        <p className="font-mono2 text-xs uppercase tracking-[0.22em] text-[#5e6ad2]/80 mb-2">{e.metricsSubLabel}</p>
        <h4 className="font-display font-medium text-white text-lg mb-6">{e.metricsLabel}</h4>
        {e.diagram && (
          <div className="mb-8 border border-white/5 bg-black/20 p-6 min-h-[180px]">
            <PipelineDiagram />
          </div>
        )}
        <div className={`grid grid-cols-1 gap-4 ${e.metrics.length > 1 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
          {e.metrics.map((m) => (
            <div key={m.label} className="border border-white/5 bg-black/20 px-4 py-4">
              <p className="font-display text-2xl font-bold text-white">{m.value}</p>
              <p className="text-xs text-zinc-500 mt-1">{m.label}</p>
            </div>
          ))}
        </div>
        {e.connector && (
          <p className="mt-6 text-sm text-zinc-500 italic leading-relaxed">{e.connector}</p>
        )}
      </div>
    </div>
  </Reveal>
);

const SupportingRole = ({ e, delay }) => (
  <Reveal delay={delay}>
    <div
      data-testid={`experience-supporting-${e.id}`}
      className="h-full border border-white/5 bg-[#0f1011] p-6 sm:p-7 flex flex-col hover:border-white/10 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="mb-5">
        <span className="inline-flex items-center border border-zinc-800 px-3 py-1 text-[10px] font-mono2 uppercase tracking-[0.2em] text-zinc-500 mb-3">
          {e.tag}
        </span>
        <h3 className="font-display font-semibold text-white text-xl tracking-tight mt-1">{e.role}</h3>
        <p className="text-zinc-400 mt-1 text-sm">{e.org}</p>
        <p className="text-zinc-600 text-xs mt-1.5">{e.period}</p>
      </div>

      <div className="space-y-5 flex-1">
        <div>
          <p className="font-mono2 text-xs uppercase tracking-[0.2em] text-[#5e6ad2]/80 mb-2">Overview</p>
          <p className="text-zinc-400 text-sm leading-relaxed">{e.overview}</p>
        </div>
        <div>
          <p className="font-mono2 text-xs uppercase tracking-[0.2em] text-[#5e6ad2]/80 mb-2">{e.pointsLabel}</p>
          <ul className="space-y-2">
            {e.points.map((pt) => (
              <li key={pt} className="text-sm text-zinc-400 leading-relaxed flex gap-2.5">
                <span className="text-[#5e6ad2] mt-1 text-[10px]" aria-hidden="true">◆</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono2 text-xs uppercase tracking-[0.2em] text-[#5e6ad2]/80 mb-2">{e.skillsLabel}</p>
          <div className="flex flex-wrap gap-1.5">
            {e.tech.map((t) => (
              <span key={t} className="font-mono2 text-[11px] text-zinc-300 border border-zinc-800 px-2.5 py-1">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Reveal>
);

export default function Experience() {
  return (
    <section id="experience" data-testid="experience-section" className="mx-auto max-w-6xl px-6 py-32 lg:py-44">
      <Reveal>
        <Overline>Experience</Overline>
        <h2 className="font-display font-bold text-white tracking-tight text-2xl sm:text-3xl lg:text-4xl max-w-2xl leading-tight">
          Where the systems shipped.
        </h2>
        <p className="text-zinc-500 mt-5 max-w-xl leading-relaxed">
          Five roles across higher education, international finance, and campus leadership — each one feeding
          directly into the systems on this page.
        </p>
      </Reveal>

      <div className="mt-16 space-y-6">
        {EXPERIENCE_FEATURED.map((e, i) => (
          <FeaturedRole key={e.id} e={e} delay={i * 0.08} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {EXPERIENCE_SUPPORTING.map((e, i) => (
          <SupportingRole key={e.id} e={e} delay={i * 0.06} />
        ))}
      </div>
    </section>
  );
}
