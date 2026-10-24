import { Reveal, Overline } from "@/components/Reveal";
import { EXPERIENCE_FEATURED, EXPERIENCE_SUPPORTING } from "@/lib/data";
import { PipelineDiagram } from "@/components/Diagrams";

const CurrentBadge = () => (
  <span className="inline-flex items-center gap-1.5 border border-brand/30 bg-brand/10 px-3 py-1 text-[10px] font-mono2 uppercase tracking-[0.2em] text-brand">
    <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" aria-hidden="true" />
    Current Role
  </span>
);

const OrgBadge = ({ children }) => (
  <span className="border border-edge-control px-3 py-1 text-[10px] font-mono2 uppercase tracking-[0.2em] text-ink-muted">
    {children}
  </span>
);

const FeaturedRole = ({ e, delay }) => (
  <Reveal delay={delay}>
    <div
      data-testid={`experience-featured-${e.id}`}
      className="border border-edge-subtle bg-surface p-8 sm:p-10 lg:p-12 hover:border-edge transition-colors duration-300"
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
                <span key={ev} className="font-display font-bold text-ink text-lg sm:text-xl tracking-tight">
                  {ev}
                </span>
              ))}
            </div>
          )}
          <h3 className="font-display font-medium text-ink-soft text-base sm:text-lg tracking-tight">{e.role}</h3>
          <p className="text-ink-faint mt-0.5 text-sm">{e.org}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-mono2 text-sm text-brand">{e.period}</p>
          <p className="text-xs text-ink-faint mt-1">{e.note}</p>
        </div>
      </div>

      <div className="border-l-2 border-brand/40 bg-brand/5 px-5 py-4 mb-8">
        <p className="text-sm font-medium text-ink-strong tracking-wide">{e.current ? "Current Focus" : "Focus"}: {e.focus}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)] gap-10">
        <div>
          <p className="font-mono2 text-xs uppercase tracking-[0.22em] text-brand-soft mb-3">Overview</p>
          <p className="text-ink-soft leading-relaxed">{e.overview}</p>

          <p className="font-mono2 text-xs uppercase tracking-[0.22em] text-brand-soft mt-8 mb-4">
            Responsibilities &amp; Impact
          </p>
          <ul className="space-y-3">
            {e.points.map((pt) => (
              <li key={pt} className="text-ink-soft leading-relaxed flex gap-3">
                <span className="text-brand mt-1.5 text-xs" aria-hidden="true">◆</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          <p className="font-mono2 text-xs uppercase tracking-[0.22em] text-brand-soft mt-8 mb-4">Key Technologies</p>
          <div className="space-y-4">
            {e.techGroups.map((g) => (
              <div key={g.domain}>
                <p className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-ink-faint mb-2">{g.domain}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <span key={t} className="font-mono2 text-xs text-ink-body border border-edge-control px-3 py-1.5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono2 text-xs uppercase tracking-[0.22em] text-brand-soft mb-4">Professional Highlights</p>
          <ul className="space-y-3">
            {e.highlights.map((h) => (
              <li key={h.text} className="border border-edge-subtle px-4 py-3 flex items-start gap-3">
                <span className="text-brand text-xs shrink-0 mt-1" aria-hidden="true">◆</span>
                <div>
                  <p className="text-sm font-medium text-ink-strong">{h.text}</p>
                  {h.fact && <p className="text-xs text-ink-muted mt-0.5">{h.fact}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-edge-subtle">
        <p className="font-mono2 text-xs uppercase tracking-[0.22em] text-brand-soft mb-2">{e.metricsSubLabel}</p>
        <h4 className="font-display font-medium text-ink text-lg mb-6">{e.metricsLabel}</h4>
        {e.diagram && (
          <div className="mb-8 border border-edge-subtle bg-surface-sunken p-6 min-h-[180px]">
            <PipelineDiagram />
          </div>
        )}
        <div className={`grid grid-cols-1 gap-4 ${e.metrics.length > 1 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
          {e.metrics.map((m) => (
            <div key={m.label} className="border border-edge-subtle bg-surface-sunken px-4 py-4">
              <p className="font-display text-2xl font-bold text-ink">{m.value}</p>
              <p className="text-xs text-ink-muted mt-1">{m.label}</p>
            </div>
          ))}
        </div>
        {e.connector && (
          <p className="mt-6 text-sm text-ink-muted italic leading-relaxed">{e.connector}</p>
        )}
      </div>
    </div>
  </Reveal>
);

const SupportingRole = ({ e, delay }) => (
  <Reveal delay={delay}>
    <div
      data-testid={`experience-supporting-${e.id}`}
      className="h-full border border-edge-subtle bg-surface p-6 sm:p-7 flex flex-col hover:border-edge hover:-translate-y-1 transition-all duration-300"
    >
      <div className="mb-5">
        <span className="inline-flex items-center border border-edge-control px-3 py-1 text-[10px] font-mono2 uppercase tracking-[0.2em] text-ink-muted mb-3">
          {e.tag}
        </span>
        <h3 className="font-display font-semibold text-ink text-xl tracking-tight mt-1">{e.role}</h3>
        <p className="text-ink-soft mt-1 text-sm">{e.org}</p>
        <p className="text-ink-faint text-xs mt-1.5">{e.period}</p>
      </div>

      <div className="space-y-5 flex-1">
        <div>
          <p className="font-mono2 text-xs uppercase tracking-[0.2em] text-brand-soft mb-2">Overview</p>
          <p className="text-ink-soft text-sm leading-relaxed">{e.overview}</p>
        </div>
        <div>
          <p className="font-mono2 text-xs uppercase tracking-[0.2em] text-brand-soft mb-2">{e.pointsLabel}</p>
          <ul className="space-y-2">
            {e.points.map((pt) => (
              <li key={pt} className="text-sm text-ink-soft leading-relaxed flex gap-2.5">
                <span className="text-brand mt-1 text-[10px]" aria-hidden="true">◆</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono2 text-xs uppercase tracking-[0.2em] text-brand-soft mb-2">{e.skillsLabel}</p>
          <div className="flex flex-wrap gap-1.5">
            {e.tech.map((t) => (
              <span key={t} className="font-mono2 text-[11px] text-ink-body border border-edge-control px-2.5 py-1">
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
        <h2 className="font-display font-bold text-ink tracking-tight text-2xl sm:text-3xl lg:text-4xl max-w-2xl leading-tight">
          Where the systems shipped.
        </h2>
        <p className="text-ink-muted mt-5 max-w-xl leading-relaxed">
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
