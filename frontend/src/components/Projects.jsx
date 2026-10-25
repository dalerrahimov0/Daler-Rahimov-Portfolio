import { useEffect, useState } from "react";
import { Reveal, Overline } from "@/components/Reveal";
import { PROJECTS } from "@/lib/data";
import { Diagram } from "@/components/Diagrams";
import { Check, ArrowUpRight, Github, Maximize2, X, ChevronLeft, ChevronRight, Images } from "lucide-react";

const GOLD = "rgb(var(--gold))";

const ExpandableImage = ({ src, alt, className, testId, onExpand, isFlagship }) => (
  <button
    type="button"
    onClick={onExpand}
    data-testid={testId}
    aria-label={`Expand image: ${alt}`}
    className="focus-ring relative block w-full overflow-hidden group/img"
  >
    <img src={src} alt={alt} loading="lazy" className={className} />
    <span
      className={
        isFlagship
          ? "absolute inset-0 flex items-center justify-center bg-gold/0 group-hover/img:bg-gold/10 transition-colors duration-300"
          : "absolute inset-0 flex items-center justify-center bg-black/0 group-hover/img:bg-black/30 transition-colors duration-300"
      }
    >
      <Maximize2
        size={20}
        className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      />
    </span>
  </button>
);

const Lightbox = ({ lightbox, onClose, onNavigate }) => {
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox, onClose, onNavigate]);

  if (!lightbox) return null;
  const { images, index } = lightbox;
  const image = images[index];
  const hasMultiple = images.length > 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-scrim backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
      data-testid="project-image-lightbox"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close expanded image"
        data-testid="lightbox-close-button"
        className="focus-ring absolute top-6 right-6 text-ink-soft hover:text-ink transition-colors duration-200"
      >
        <X size={22} />
      </button>

      {hasMultiple && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNavigate(-1); }}
          aria-label="Previous image"
          data-testid="lightbox-prev-button"
          className="focus-ring absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 text-ink-soft hover:text-ink transition-colors duration-200"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      <figure onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-4 cursor-default">
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[80vh] max-w-[85vw] object-contain"
          style={{ boxShadow: "var(--lightbox-frame)" }}
        />
        {(hasMultiple || image.label) && (
          <figcaption className="font-mono2 text-xs text-ink-muted tracking-widest">
            {image.label && <span className="text-ink-body">{image.label}</span>}
            {image.label && hasMultiple && " · "}
            {hasMultiple && `${index + 1} / ${images.length}`}
          </figcaption>
        )}
      </figure>

      {hasMultiple && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNavigate(1); }}
          aria-label="Next image"
          data-testid="lightbox-next-button"
          className="focus-ring absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 text-ink-soft hover:text-ink transition-colors duration-200"
        >
          <ChevronRight size={32} />
        </button>
      )}
    </div>
  );
};

const LIVE_BUTTON_CLASS = {
  gold: "bg-gold text-black hover:bg-gold-hover",
  brand: "bg-brand text-white hover:bg-brand/85",
  default: "bg-inverse text-inverse-ink hover:bg-inverse-hover",
};

const SectionHeading = ({ children, className = "mb-5" }) => (
  <h4 className={`font-mono2 text-xs uppercase tracking-[0.25em] text-ink-muted ${className}`}>{children}</h4>
);

const Capabilities = ({ items }) => (
  <div className="mt-14">
    <SectionHeading className="mb-6">Core Capabilities</SectionHeading>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
      {items.map((c) => (
        <div key={c.n} className="border-t border-edge-control pt-5">
          <p className="font-mono2 text-xs text-brand tracking-widest">{c.n}</p>
          <h5 className="font-display font-bold text-ink text-lg mt-2">{c.title}</h5>
          <ul className="mt-4 space-y-2">
            {c.items.map((item) => (
              <li key={item} className="text-ink-soft text-sm leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const ProofStrip = ({ proof, id }) => (
  <div data-testid={`project-${id}-proof`} className="mt-10 border-y border-edge-control">
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {proof.items.map((it) => (
        <li key={it.label} className="py-4 pr-4 border-b border-edge-subtle lg:border-b-0">
          {it.value && <span className="block font-display font-bold text-ink text-xl leading-none mb-1.5">{it.value}</span>}
          <span className="block font-mono2 text-xs text-ink-body leading-relaxed">{it.label}</span>
        </li>
      ))}
    </ul>
    <p className="text-ink-muted text-sm leading-relaxed py-4 lg:border-t lg:border-edge-subtle">{proof.note}</p>
  </div>
);

const Challenges = ({ heading, items }) => (
  <div className="mt-14">
    <SectionHeading>Engineering Challenges</SectionHeading>
    <h5 className="font-display font-bold text-ink tracking-tight text-2xl sm:text-3xl leading-tight max-w-2xl">{heading}</h5>
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
      {items.map((c) => (
        <div key={c.title} className="border-t border-edge-control pt-5">
          <h6 className="text-ink font-medium">{c.title}</h6>
          <p className="text-ink-soft leading-relaxed mt-2">{c.body}</p>
        </div>
      ))}
    </div>
  </div>
);

const EvidenceTrail = ({ evidence, id, onExpandScreenshot }) => (
  <div data-testid={`project-${id}-evidence`} className="mt-14 border border-edge-subtle bg-surface p-6 sm:p-10">
    <SectionHeading className="mb-6">Evidence System</SectionHeading>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-6">
        <h5 className="font-display font-bold text-ink tracking-tight text-2xl sm:text-3xl leading-tight">
          {evidence.heading}
        </h5>
        <p className="text-ink-soft leading-relaxed mt-5">{evidence.body}</p>
        <ol className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-3" aria-label="Evidence trail">
          {evidence.chain.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="font-mono2 text-xs text-ink-body border border-edge-control px-3 py-1.5">{step}</span>
              {i < evidence.chain.length - 1 && <span className="text-brand text-xs" aria-hidden="true">→</span>}
            </li>
          ))}
        </ol>
      </div>
      <figure className="lg:col-span-6">
        <div className="overflow-hidden border border-edge-control">
          <ExpandableImage
            src={evidence.screenshot.src}
            alt={evidence.screenshot.alt}
            className="w-full h-auto max-h-[34rem] object-cover object-top"
            testId={`project-${id}-evidence-image`}
            onExpand={onExpandScreenshot}
          />
        </div>
        <figcaption className="font-mono2 text-[11px] text-ink-muted leading-relaxed mt-3">{evidence.screenshot.caption}</figcaption>
      </figure>
    </div>
  </div>
);

const Decisions = ({ items }) => (
  <div className="mt-14">
    <SectionHeading>Engineering Decisions</SectionHeading>
    <ol className="space-y-4">
      {items.map((d, i) => (
        <li key={d.title} className="flex items-start gap-4 text-ink-soft leading-relaxed">
          <span className="font-mono2 text-xs text-brand mt-1 w-5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
          <span>
            <span className="text-ink font-medium">{d.title}</span> — {d.body}
          </span>
        </li>
      ))}
    </ol>
  </div>
);

const ProjectLinks = ({ p, images, onExpand, isFlagship }) => {
  const iconClass = "text-brand";
  return (
    <div className="mt-12 flex flex-wrap items-center gap-6">
      {p.live && (
        <a
          href={p.live}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`project-${p.id}-live-link`}
          className={`focus-ring inline-flex items-center gap-2 font-medium text-sm px-6 py-3 transition-colors duration-200 ${LIVE_BUTTON_CLASS[isFlagship ? "gold" : p.accent] || LIVE_BUTTON_CLASS.default}`}
        >
          Live site <ArrowUpRight size={15} />
        </a>
      )}
      {p.github && (
        <a
          href={p.github}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`project-${p.id}-github-link`}
          className="focus-ring inline-flex items-center gap-2 text-ink-body hover:text-ink text-sm transition-colors duration-200"
        >
          <Github size={15} className={iconClass} /> GitHub
        </a>
      )}
      {p.writingHref && (
        <a
          href={p.writingHref}
          data-testid={`project-${p.id}-writing-link`}
          className="focus-ring inline-flex items-center gap-2 text-ink-body hover:text-ink text-sm transition-colors duration-200"
        >
          <ArrowUpRight size={15} className={iconClass} /> Related writing
        </a>
      )}
      <button
        type="button"
        onClick={() => onExpand(images, 0)}
        data-testid={`project-${p.id}-screenshots-button`}
        className="focus-ring inline-flex items-center gap-2 text-ink-body hover:text-ink text-sm transition-colors duration-200"
      >
        <Images size={15} className={iconClass} /> View Screenshots
      </button>
    </div>
  );
};

// A project either lists `image` + `gallery`, or numbered `screenshots` slots
// (only slots with a `src` are shown). Either way: first image is the hero.
const projectImages = (p) =>
  p.screenshots
    ? p.screenshots.filter((s) => s.src).map(({ src, alt, label, slot }) => ({ src, alt, label, slot }))
    : [{ src: p.image, alt: `${p.name} project visual` }, ...(p.gallery || [])];

const CaseStudy = ({ p, onExpand }) => {
  const images = projectImages(p);
  const gallery = images.slice(1);
  const isFlagship = p.accent === "gold";
  const accentColor = isFlagship ? GOLD : "rgb(var(--brand))";
  const accentTextClass = isFlagship ? "text-gold-ink" : "text-brand";
  const sectionBorderClass = isFlagship ? "border-gold-edge" : p.accent === "brand" ? "border-brand/30" : "border-edge-subtle";
  const chipClass = "font-mono2 text-xs text-ink-body border border-edge-control px-3 py-1.5";
  const captionClass = "font-mono2 text-[11px] leading-snug text-ink-muted mt-2";

  return (
  <Reveal>
    <article data-testid={`project-${p.id}`} className={`border-t ${sectionBorderClass} pt-16`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <span className="font-display font-bold text-6xl text-ink-numeral select-none">{p.index}</span>
          <p className={`font-mono2 text-xs uppercase tracking-[0.25em] ${accentTextClass} mt-6 mb-3`}>{p.kind}</p>
          <h3 className="font-display font-bold text-ink tracking-tight text-2xl sm:text-3xl">{p.name}</h3>
          {p.headline && (
            <p className="font-display font-bold text-ink-strong text-lg sm:text-xl mt-3 leading-snug">{p.headline}</p>
          )}
          <p className="text-ink-muted mt-3 leading-relaxed">{p.tagline}</p>
        </div>
        <div className="lg:col-span-8">
          <div className="overflow-hidden border border-edge-subtle">
            <ExpandableImage
              src={images[0].src}
              alt={images[0].alt}
              className={`w-full h-56 sm:h-72 object-cover ${p.screenshots ? "object-top" : ""} group-hover/img:scale-[1.03] transition-transform duration-700`}
              testId={`project-${p.id}-image`}
              onExpand={() => onExpand(images, 0)}
              isFlagship={isFlagship}
            />
          </div>
          {images[0].label && <p className={captionClass}>{images[0].label}</p>}
          {gallery.length > 0 && (
            <div className={`mt-3 grid ${gallery.length === 4 ? "grid-cols-4" : "grid-cols-3"} gap-3`}>
              {gallery.map((g, i) => (
                <figure key={g.src}>
                  <div className="overflow-hidden border border-edge-subtle">
                    <ExpandableImage
                      src={g.src}
                      alt={g.alt}
                      className={`w-full h-20 sm:h-28 object-cover ${p.screenshots ? "object-top" : ""} group-hover/img:scale-[1.03] transition-transform duration-700`}
                      testId={`project-${p.id}-gallery-${i + 1}`}
                      onExpand={() => onExpand(images, i + 1)}
                      isFlagship={isFlagship}
                    />
                  </div>
                  {g.label && <figcaption className={captionClass}>{g.label}</figcaption>}
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>

      {p.proof && <ProofStrip proof={p.proof} id={p.id} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-14">
        <div>
          <h4 className="font-mono2 text-xs uppercase tracking-[0.25em] text-ink-muted mb-4">Problem</h4>
          {[].concat(p.problem).map((para, i) => (
            <p key={i} className={`text-ink-soft leading-relaxed ${i > 0 ? "mt-4" : ""}`}>{para}</p>
          ))}
        </div>
        <div>
          <h4 className="font-mono2 text-xs uppercase tracking-[0.25em] text-ink-muted mb-4">Solution</h4>
          <p className="text-ink-soft leading-relaxed">{p.solution}</p>
        </div>
      </div>

      {p.diagram && (
        <div className="mt-14 border border-edge-subtle bg-surface p-6 sm:p-10">
          <h4 className="font-mono2 text-xs uppercase tracking-[0.25em] text-ink-muted mb-6">Architecture</h4>
          {p.diagramCaption && (
            <div className="-mt-2 mb-8 max-w-3xl">
              <p className="font-display font-bold text-ink tracking-tight text-xl sm:text-2xl">{p.diagramCaption}</p>
              {p.diagramLead && <p className="text-ink-soft leading-relaxed mt-3">{p.diagramLead}</p>}
              {p.diagramEmphasis && (
                <div className="mt-3 border-l-2 border-brand pl-4">
                  <p className="text-ink font-medium leading-relaxed">{p.diagramEmphasis}</p>
                  {p.diagramDetail && <p className="text-ink-soft text-sm leading-relaxed mt-2">{p.diagramDetail}</p>}
                </div>
              )}
            </div>
          )}
          <div className="min-h-[200px]">
            <Diagram type={p.diagram} accentColor={accentColor} />
          </div>
        </div>
      )}

      {p.capabilities?.length > 0 && <Capabilities items={p.capabilities} />}

      {p.evidence && (
        <EvidenceTrail
          evidence={p.evidence}
          id={p.id}
          onExpandScreenshot={() => onExpand(images, Math.max(0, images.findIndex((i) => i.slot === p.evidence.screenshot.slot)))}
        />
      )}

      {p.challenges?.length > 0 && <Challenges heading={p.challengesHeading} items={p.challenges} />}

      {p.decisions?.length > 0 && <Decisions items={p.decisions} />}

      {p.keyIdeas?.length > 0 && (
        <div className="mt-14">
          <h4 className="font-mono2 text-xs uppercase tracking-[0.25em] text-ink-muted mb-5">Key Ideas</h4>
          <ul className="space-y-4">
            {p.keyIdeas.map((k) => (
              <li key={k.title} className="flex items-start gap-3 text-ink-soft leading-relaxed">
                <span className="text-brand mt-1.5 text-xs" aria-hidden="true">◆</span>
                <span>
                  <span className="text-ink font-medium">{k.title}</span> — {k.body}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {p.features?.length > 0 && (
        <div className="mt-14">
          <h4 className="font-mono2 text-xs uppercase tracking-[0.25em] text-ink-muted mb-5">Key Features</h4>
          <div className="flex flex-wrap gap-2">
            {p.features.map((f) => (
              <span key={f} className={chipClass}>
                {f}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-14">
        <div className="lg:col-span-5">
          <h4 className="font-mono2 text-xs uppercase tracking-[0.25em] text-ink-muted mb-5">Tech Stack</h4>
          {p.techGroups ? (
            <dl className="space-y-4">
              {p.techGroups.map((g) => (
                <div key={g.domain}>
                  <dt className="font-mono2 text-[11px] uppercase tracking-widest text-ink-muted mb-2">{g.domain}</dt>
                  <dd className="flex flex-wrap gap-2">
                    {g.items.map((t) => (
                      <span key={t} className={chipClass}>{t}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <div className="flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span key={t} className="font-mono2 text-xs text-ink-body border border-edge-control px-3 py-1.5">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="lg:col-span-7">
          <h4 className="font-mono2 text-xs uppercase tracking-[0.25em] text-ink-muted mb-5">Outcome</h4>
          <ul className="space-y-3">
            {p.outcome.map((o) => (
              <li key={o.title || o} className="flex items-start gap-3 text-ink-soft leading-relaxed">
                <Check size={15} className="text-brand mt-1 shrink-0" aria-hidden="true" />
                {o.title ? (
                  <span>
                    <span className="text-ink font-medium">{o.title}</span> — {o.body}
                  </span>
                ) : (
                  <span>{o}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ProjectLinks p={p} images={images} onExpand={onExpand} isFlagship={isFlagship} />

      <div className="mt-12 border-l-2 border-brand/40 pl-6">
        <h4 className="font-mono2 text-xs uppercase tracking-[0.25em] text-ink-muted mb-3">Lesson Learned</h4>
        <p className="text-ink text-base sm:text-lg leading-relaxed max-w-3xl">{p.lesson}</p>
        {p.positioning && (
          <p className="text-ink-soft leading-relaxed max-w-3xl mt-4">{p.positioning}</p>
        )}
      </div>
    </article>
  </Reveal>
  );
};

export default function Projects() {
  const [lightbox, setLightbox] = useState(null); // { images, index }

  const navigate = (delta) => {
    setLightbox((cur) => {
      if (!cur) return cur;
      const index = (cur.index + delta + cur.images.length) % cur.images.length;
      return { ...cur, index };
    });
  };

  return (
    <section id="projects" data-testid="projects-section" className="mx-auto max-w-6xl px-6 py-32 lg:py-44">
      <Reveal>
        <Overline>Featured Projects</Overline>
        <h2 className="font-display font-bold text-ink tracking-tight text-2xl sm:text-3xl lg:text-4xl max-w-2xl leading-tight">
          Case studies, not cards.
        </h2>
        <p className="text-ink-muted mt-5 max-w-xl leading-relaxed">
          Each project follows the same arc: problem, solution, architecture, outcome — and what it taught me.
        </p>
      </Reveal>
      <div className="mt-8 space-y-32">
        {PROJECTS.map((p) => (
          <CaseStudy key={p.id} p={p} onExpand={(images, index) => setLightbox({ images, index })} />
        ))}
      </div>
      <Lightbox lightbox={lightbox} onClose={() => setLightbox(null)} onNavigate={navigate} />
    </section>
  );
}
