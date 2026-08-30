import { Reveal, Overline } from "@/components/Reveal";
import { ARTICLES, FUTURE_TOPICS, WRITING_LINKS } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export default function Writing() {
  return (
    <section id="writing" data-testid="writing-section" className="mx-auto max-w-6xl px-6 py-32 lg:py-44">
      <Reveal>
        <Overline>Writing &amp; Insights</Overline>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <h2 className="font-display font-bold text-white tracking-tight text-2xl sm:text-3xl lg:text-4xl max-w-2xl leading-tight">
            A publication, not a blog.
          </h2>
          <div className="flex flex-wrap gap-3">
            <a
              href={WRITING_LINKS.series}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="read-series-button"
              className="focus-ring inline-flex items-center gap-2 bg-white text-black font-medium text-sm px-6 py-3 hover:bg-zinc-200 transition-colors duration-200"
            >
              Read the Series <ArrowUpRight size={14} />
            </a>
            <a
              href={WRITING_LINKS.archive}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="view-articles-button"
              className="focus-ring inline-flex items-center gap-2 border border-zinc-800 hover:border-zinc-500 text-white text-sm px-6 py-3 transition-colors duration-200"
            >
              View All Articles <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </Reveal>

      <div className="mt-16 border-t border-white/5">
        {ARTICLES.map((a, i) => (
          <Reveal key={a.part} delay={i * 0.05}>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`article-link-${i + 1}`}
              className="focus-ring group grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-b border-white/5 items-baseline hover:bg-white/[0.015] transition-colors duration-300"
            >
              <span className="md:col-span-2 font-mono2 text-xs uppercase tracking-[0.2em] text-[#5e6ad2]">
                {a.part}
                {a.date && <span className="block normal-case tracking-normal text-zinc-600 mt-1">{a.date}</span>}
              </span>
              <span className="md:col-span-6 font-display font-medium text-white text-lg sm:text-xl tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                {a.title}
              </span>
              <span className="md:col-span-4 text-zinc-500 text-sm leading-relaxed">{a.desc}</span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-14">
          <p className="font-mono2 text-xs uppercase tracking-[0.25em] text-zinc-500 mb-5">Coming next</p>
          <div className="flex flex-wrap gap-2">
            {FUTURE_TOPICS.map((t) => (
              <span key={t} className="font-mono2 text-xs text-zinc-400 border border-zinc-800 px-3 py-1.5">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
