import { Reveal, Overline } from "@/components/Reveal";
import { useMediaQuery } from "@/hooks/use-media-query";
import ConceptGraph from "@/components/ConceptGraph";

// The exact complement of Hero's own gate ("(min-width: 1024px)") — between
// the two, the graph renders in exactly one place at any given width, never
// both (which would mount the hover/tap logic twice) and never neither.
const QUERY = "(max-width: 1023px)";

export default function ConceptGraphSection() {
  const show = useMediaQuery(QUERY);
  if (!show) return null;

  return (
    <section data-testid="concept-graph-section" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <Overline>How This Connects</Overline>
      </Reveal>
      {/* No absolute positioning here — this is normal document flow, so the
          graph just needs a sensible width to sit inside: full width of the
          padded content column up to a cap, rather than the hero overlay's
          cramped fit-beside-the-text-and-button math (that formula doesn't
          even apply here — there's no button to center under, no hero text
          column to dodge). */}
      <Reveal delay={0.1} className="mx-auto w-full max-w-[480px]">
        <ConceptGraph />
      </Reveal>
    </section>
  );
}
