import { useEffect, useState } from "react";
import { Reveal, Overline } from "@/components/Reveal";
import { PROJECTS } from "@/lib/data";
import { Diagram } from "@/components/Diagrams";
import { Check, ArrowUpRight, Github, Maximize2, X, ChevronLeft, ChevronRight, Images } from "lucide-react";

const GOLD = "#c9a66b";

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
          ? "absolute inset-0 flex items-center justify-center bg-[#c9a66b]/0 group-hover/img:bg-[#c9a66b]/10 transition-colors duration-300"
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
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
      data-testid="project-image-lightbox"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close expanded image"
        data-testid="lightbox-close-button"
        className="focus-ring absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors duration-200"
      >
        <X size={22} />
      </button>

      {hasMultiple && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNavigate(-1); }}
          aria-label="Previous image"
          data-testid="lightbox-prev-button"
          className="focus-ring absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors duration-200"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      <figure onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-4 cursor-default">
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[80vh] max-w-[85vw] object-contain"
        />
        {hasMultiple && (
          <figcaption className="font-mono2 text-xs text-zinc-500 tracking-widest">
            {index + 1} / {images.length}
          </figcaption>
        )}
      </figure>

      {hasMultiple && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNavigate(1); }}
          aria-label="Next image"
          data-testid="lightbox-next-button"
          className="focus-ring absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors duration-200"
        >
          <ChevronRight size={32} />
        </button>
      )}
    </div>
  );
};

const ProjectLinks = ({ p, images, onExpand, isFlagship }) => {
  const iconClass = "text-[#5e6ad2]";
  return (
    <div className="mt-12 flex flex-wrap items-center gap-6">
      {p.live && (
        <a
          href={p.live}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`project-${p.id}-live-link`}
          className={
            isFlagship
              ? "focus-ring inline-flex items-center gap-2 bg-[#c9a66b] text-black font-medium text-sm px-6 py-3 hover:bg-[#d9b87e] transition-colors duration-200"
              : "focus-ring inline-flex items-center gap-2 bg-white text-black font-medium text-sm px-6 py-3 hover:bg-zinc-200 transition-colors duration-200"
          }
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
          className="focus-ring inline-flex items-center gap-2 text-zinc-300 hover:text-white text-sm transition-colors duration-200"
        >
          <Github size={15} className={iconClass} /> GitHub
        </a>
      )}
      {p.writingHref && (
        <a
          href={p.writingHref}
          data-testid={`project-${p.id}-writing-link`}
          className="focus-ring inline-flex items-center gap-2 text-zinc-300 hover:text-white text-sm transition-colors duration-200"
        >
          <ArrowUpRight size={15} className={iconClass} /> Related writing
        </a>
      )}
      <button
        type="button"
        onClick={() => onExpand(images, 0)}
        data-testid={`project-${p.id}-screenshots-button`}
        className="focus-ring inline-flex items-center gap-2 text-zinc-300 hover:text-white text-sm transition-colors duration-200"
      >
        <Images size={15} className={iconClass} /> View Screenshots
      </button>
    </div>
  );
};

const CaseStudy = ({ p, onExpand }) => {
  const images = [{ src: p.image, alt: `${p.name} project visual` }, ...(p.gallery || [])];
  const isFlagship = p.accent === "gold";
  const accentColor = isFlagship ? GOLD : "#5e6ad2";
  const accentTextClass = isFlagship ? "text-[#c9a66b]" : "text-[#5e6ad2]";
  const sectionBorderClass = isFlagship ? "border-[#c9a66b]/12" : "border-white/5";
  const chipClass = "font-mono2 text-xs text-zinc-300 border border-zinc-800 px-3 py-1.5";

  return (
  <Reveal>
    <article data-testid={`project-${p.id}`} className={`border-t ${sectionBorderClass} pt-16`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <span className="font-display font-bold text-6xl text-zinc-800 select-none">{p.index}</span>
          <p className={`font-mono2 text-xs uppercase tracking-[0.25em] ${accentTextClass} mt-6 mb-3`}>{p.kind}</p>
          <h3 className="font-display font-bold text-white tracking-tight text-2xl sm:text-3xl">{p.name}</h3>
          <p className="text-zinc-500 mt-3 leading-relaxed">{p.tagline}</p>
        </div>
        <div className="lg:col-span-8">
          <div className="overflow-hidden border border-white/5">
            <ExpandableImage
              src={images[0].src}
              alt={images[0].alt}
              className="w-full h-56 sm:h-72 object-cover group-hover/img:scale-[1.03] transition-transform duration-700"
              testId={`project-${p.id}-image`}
              onExpand={() => onExpand(images, 0)}
              isFlagship={isFlagship}
            />
          </div>
          {p.gallery?.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              {p.gallery.map((g, i) => (
                <div key={g.src} className="overflow-hidden border border-white/5">
                  <ExpandableImage
                    src={g.src}
                    alt={g.alt}
                    className="w-full h-20 sm:h-28 object-cover group-hover/img:scale-[1.03] transition-transform duration-700"
                    testId={`project-${p.id}-gallery-${i + 1}`}
                    onExpand={() => onExpand(images, i + 1)}
                    isFlagship={isFlagship}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-14">
        <div>
          <h4 className="font-mono2 text-xs uppercase tracking-[0.25em] text-zinc-500 mb-4">Problem</h4>
          <p className="text-zinc-400 leading-relaxed">{p.problem}</p>
        </div>
        <div>
          <h4 className="font-mono2 text-xs uppercase tracking-[0.25em] text-zinc-500 mb-4">Solution</h4>
          <p className="text-zinc-400 leading-relaxed">{p.solution}</p>
        </div>
      </div>

      {p.diagram && (
        <div className="mt-14 border border-white/5 bg-[#0f1011] p-6 sm:p-10">
          <h4 className="font-mono2 text-xs uppercase tracking-[0.25em] text-zinc-500 mb-6">Architecture</h4>
          <Diagram type={p.diagram} accentColor={accentColor} />
        </div>
      )}

      {p.keyIdeas?.length > 0 && (
        <div className="mt-14">
          <h4 className="font-mono2 text-xs uppercase tracking-[0.25em] text-zinc-500 mb-5">Key Ideas</h4>
          <ul className="space-y-4">
            {p.keyIdeas.map((k) => (
              <li key={k.title} className="flex items-start gap-3 text-zinc-400 leading-relaxed">
                <span className="text-[#5e6ad2] mt-1.5 text-xs" aria-hidden="true">◆</span>
                <span>
                  <span className="text-white font-medium">{k.title}</span> — {k.body}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {p.features?.length > 0 && (
        <div className="mt-14">
          <h4 className="font-mono2 text-xs uppercase tracking-[0.25em] text-zinc-500 mb-5">Key Features</h4>
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
          <h4 className="font-mono2 text-xs uppercase tracking-[0.25em] text-zinc-500 mb-5">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <span key={t} className="font-mono2 text-xs text-zinc-300 border border-zinc-800 px-3 py-1.5">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="lg:col-span-7">
          <h4 className="font-mono2 text-xs uppercase tracking-[0.25em] text-zinc-500 mb-5">Outcome</h4>
          <ul className="space-y-3">
            {p.outcome.map((o) => (
              <li key={o} className="flex items-start gap-3 text-zinc-400 leading-relaxed">
                <Check size={15} className="text-[#5e6ad2] mt-1 shrink-0" aria-hidden="true" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ProjectLinks p={p} images={images} onExpand={onExpand} isFlagship={isFlagship} />

      <div className="mt-12 border-l-2 border-[#5e6ad2]/40 pl-6">
        <h4 className="font-mono2 text-xs uppercase tracking-[0.25em] text-zinc-500 mb-3">Lesson Learned</h4>
        <p className="text-white text-base sm:text-lg leading-relaxed max-w-3xl">{p.lesson}</p>
        {p.positioning && (
          <p className="text-zinc-400 leading-relaxed max-w-3xl mt-4">{p.positioning}</p>
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
        <h2 className="font-display font-bold text-white tracking-tight text-2xl sm:text-3xl lg:text-4xl max-w-2xl leading-tight">
          Case studies, not cards.
        </h2>
        <p className="text-zinc-500 mt-5 max-w-xl leading-relaxed">
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
