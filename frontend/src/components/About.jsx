import { Reveal, Overline } from "@/components/Reveal";
import { MANIFESTO } from "@/lib/data";

export default function About() {
  return (
    <section id="about" data-testid="about-section" className="mx-auto max-w-6xl px-6 py-32 lg:py-44">
      <Reveal>
        <Overline>About — a manifesto, not a biography</Overline>
        <h2 className="font-display font-bold text-ink tracking-tight text-2xl sm:text-3xl lg:text-4xl max-w-2xl leading-tight">
          Why I build software.
        </h2>
      </Reveal>
      <div className="mt-20 space-y-0 border-t border-edge-subtle">
        {MANIFESTO.map((c, i) => (
          <Reveal key={c.n} delay={i * 0.08}>
            <article className="grid grid-cols-1 md:grid-cols-12 gap-6 py-14 border-b border-edge-subtle group">
              <div className="md:col-span-3">
                <span className="font-display font-bold text-6xl lg:text-7xl text-ink-numeral group-hover:text-brand/40 transition-colors duration-500 select-none">
                  {c.n}
                </span>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-display font-medium text-ink text-xl sm:text-2xl tracking-tight mb-4">
                  {c.title}
                </h3>
                <p className="text-ink-soft leading-relaxed max-w-2xl">{c.body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
