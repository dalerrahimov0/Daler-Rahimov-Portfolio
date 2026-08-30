import { CONTACT } from "@/lib/data";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Tools", href: "#tools" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

const scrollTo = (e, href) => {
  e.preventDefault();
  const el = document.querySelector(href);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -136 });
  else el.scrollIntoView({ behavior: "smooth" });
};

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <nav className="mx-auto max-w-6xl px-6 h-20 flex items-center justify-between" aria-label="Main">
        <a
          href="#top"
          onClick={(e) => scrollTo(e, "#top")}
          data-testid="nav-logo"
          className="focus-ring inline-flex items-center"
        >
          <img
            src="/branding/logo.svg"
            alt="Daler Rahimov"
            className="h-11 w-auto"
          />
        </a>
        <div className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => scrollTo(e, l.href)}
              data-testid={`nav-${l.label.toLowerCase()}-link`}
              className="focus-ring text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href={CONTACT.resume}
          data-testid="nav-resume-button"
          className="focus-ring font-mono2 text-xs uppercase tracking-widest border border-zinc-800 hover:border-zinc-500 text-white px-4 py-1.5 transition-colors duration-200"
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
