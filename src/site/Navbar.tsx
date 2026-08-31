import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSite } from "@/store/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;

export default function Navbar() {
  const { company } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-white/10 bg-navy/95 backdrop-blur transition-all duration-300 ${
        scrolled ? "py-1" : "py-3"
      }`}
    >
      <div className="container-x flex items-center justify-between gap-6">
        <Link to="/" className="group flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span
            className={`font-display font-semibold tracking-[0.28em] text-primary-foreground transition-all duration-300 ${
              scrolled ? "text-lg" : "text-xl"
            }`}
          >
            AMAARAH
          </span>
          <span className="mt-1 text-[0.55rem] font-semibold tracking-[0.32em] text-gold">
            {company.legalSuffix}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground/75 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="btn-base btn-gold hidden md:inline-flex">
            {company.primaryCta}
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-white/20 lg:hidden"
          >
            <span
              className={`block h-px w-5 bg-primary-foreground transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span className={`block h-px w-5 bg-primary-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`block h-px w-5 bg-primary-foreground transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="container-x flex flex-col gap-1 py-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground/80 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-base btn-gold mt-3">
            {company.primaryCta}
          </Link>
        </nav>
      </div>
    </header>
  );
}
