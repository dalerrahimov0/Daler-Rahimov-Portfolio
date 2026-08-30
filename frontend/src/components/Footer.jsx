import { Reveal } from "@/components/Reveal";
import { CONTACT } from "@/lib/data";
import { Mail, Linkedin, Github, ArrowUpRight, FileDown } from "lucide-react";

const SOCIALS = [
  { label: "Email", href: `mailto:${CONTACT.email}`, icon: Mail, testid: "contact-email-link" },
  { label: "LinkedIn", href: CONTACT.linkedin, icon: Linkedin, testid: "contact-linkedin-link" },
  { label: "GitHub", href: CONTACT.github, icon: Github, testid: "contact-github-link" },
];

export default function Footer() {
  return (
    <footer id="contact" data-testid="contact-section" className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-32 lg:py-40">
        <Reveal>
          <p className="font-mono2 text-xs uppercase tracking-[0.25em] text-zinc-500 mb-8">Contact</p>
          <h2 className="font-display font-bold text-white tracking-tighter leading-[1.05] text-4xl sm:text-5xl lg:text-7xl max-w-4xl">
            Let&apos;s build something{" "}
            <span className="text-[#5e6ad2]">real</span>.
          </h2>
          <p className="text-zinc-400 mt-8 max-w-xl leading-relaxed">
            Based in Kearney, Nebraska — roots in Dushanbe, Tajikistan. Open to AI, data, and
            product-focused roles, and conversations about systems worth building well.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${CONTACT.email}`}
              data-testid="contact-primary-email-button"
              className="focus-ring inline-flex items-center gap-2 bg-white text-black font-medium text-sm px-7 py-3.5 hover:bg-zinc-200 transition-colors duration-200"
            >
              <Mail size={15} /> {CONTACT.email}
            </a>
            <a
              href={CONTACT.resume}
              data-testid="resume-download-button"
              className="focus-ring inline-flex items-center gap-2 border border-zinc-800 hover:border-zinc-500 text-white text-sm px-7 py-3.5 transition-colors duration-200"
            >
              <FileDown size={15} /> Download Resume
            </a>
          </div>
          <p className="mt-5 text-zinc-600 text-sm">
            Or reach me personally at{" "}
            <a href={`mailto:${CONTACT.emailSecondary}`} className="focus-ring text-zinc-400 hover:text-white transition-colors duration-200">
              {CONTACT.emailSecondary}
            </a>
          </p>
          <div className="mt-10 flex flex-wrap gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                data-testid={s.testid}
                className="focus-ring inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition-colors duration-200"
              >
                <s.icon size={16} /> {s.label} <ArrowUpRight size={12} className="text-zinc-600" />
              </a>
            ))}
          </div>
        </Reveal>
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-4">
          <p className="font-mono2 text-xs text-zinc-600 tracking-wider">
            © {new Date().getFullYear()} Daler Rahimov
          </p>
          <p className="font-mono2 text-xs text-zinc-600 tracking-wider">
            Designed &amp; built with intent.
          </p>
        </div>
      </div>
    </footer>
  );
}
