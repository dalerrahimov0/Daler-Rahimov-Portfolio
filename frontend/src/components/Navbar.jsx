import { Moon, Sun } from "lucide-react";
import { CONTACT } from "@/lib/data";
import { useTheme } from "@/hooks/use-theme";

const LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
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

// Shows the icon of the theme it switches TO: a sun while dark, a moon while
// light. Sized to sit beside the Resume button without changing the bar's height.
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const toLight = theme === "dark";
  const label = toLight ? "Switch to light mode" : "Switch to dark mode";
  const Icon = toLight ? Sun : Moon;
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      data-testid="nav-theme-toggle"
      className="focus-ring inline-flex h-[30px] w-[30px] items-center justify-center border border-edge-control hover:border-edge-control-hover text-ink-soft hover:text-ink transition-colors duration-200"
    >
      <Icon size={14} aria-hidden="true" />
    </button>
  );
};

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-edge-subtle bg-nav backdrop-blur-xl">
      {/* From lg up: three columns with equal outer tracks, so the links sit on
          the true center regardless of the logo vs. toggle+Resume widths. Below
          lg there isn't room for equal tracks (the links would crowd the
          toggle), so it keeps the original space-between layout. */}
      <nav className="mx-auto max-w-6xl px-6 h-20 flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]" aria-label="Main">
        <a
          href="#top"
          onClick={(e) => scrollTo(e, "#top")}
          data-testid="nav-logo"
          className="focus-ring inline-flex items-center justify-self-start"
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
              className="focus-ring text-sm text-ink-soft hover:text-ink transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>
        {/* col-start-3 pins the group to the right grid column (no effect in
            the flex layout below lg). */}
        <div className="col-start-3 justify-self-end flex items-center gap-3">
          <ThemeToggle />
          <a
            href={CONTACT.resume}
            data-testid="nav-resume-button"
            className="focus-ring font-mono2 text-xs uppercase tracking-widest border border-edge-control hover:border-edge-control-hover text-ink px-4 py-1.5 transition-colors duration-200"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
