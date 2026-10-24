import Marquee from "react-fast-marquee";
import { METRICS } from "@/lib/data";

export default function MetricsStrip() {
  return (
    <section data-testid="metrics-strip" aria-label="Key facts" className="border-y border-edge py-6 overflow-hidden">
      <Marquee speed={28} gradient={false} pauseOnHover aria-hidden="false">
        {METRICS.map((m) => (
          <span key={m} className="flex items-center">
            <span className="font-mono2 text-xs sm:text-sm uppercase tracking-[0.2em] text-ink-muted px-8 whitespace-nowrap">
              {m}
            </span>
            <span className="text-brand text-xs" aria-hidden="true">◆</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
