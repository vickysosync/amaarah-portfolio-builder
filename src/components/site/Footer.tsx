import { Link } from "@tanstack/react-router";
import { useSite } from "@/store/site";

export default function Footer() {
  const { company, services } = useSite();

  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-semibold tracking-[0.24em]">AMAARAH</p>
          <p className="mt-2 text-[0.6rem] font-semibold tracking-[0.3em] text-gold">{company.legalSuffix}</p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-foreground/65">
            {company.footerDescription}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Quick Links</h3>
          <ul className="mt-5 space-y-2.5 text-sm text-primary-foreground/70">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/services", label: "Services" },
              { to: "/projects", label: "Projects" },
              { to: "/portfolio", label: "Portfolio" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Services</h3>
          <ul className="mt-5 space-y-2.5 text-sm text-primary-foreground/70">
            {services
              .filter((s) => s.active)
              .slice(0, 4)
              .map((s) => (
                <li key={s.id}>
                  <Link to="/services/$id" params={{ id: s.id }} className="transition-colors hover:text-gold">
                    {s.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Contact</h3>
          <address className="mt-5 space-y-3 text-sm not-italic leading-relaxed text-primary-foreground/70">
            <p>{company.address}</p>
            <p>
              <a href={`tel:${company.phone}`} className="transition-colors hover:text-gold">
                {company.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${company.email}`} className="break-all transition-colors hover:text-gold">
                {company.email}
              </a>
            </p>
            <p>
              {company.workingHours}
              <br />
              {company.sunday}
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-primary-foreground/50 sm:flex-row">
          <p>© 2026 {company.businessName}. All Rights Reserved.</p>
          <Link
            to="/admin/login"
            className="text-[0.7rem] uppercase tracking-[0.18em] text-primary-foreground/40 transition-colors hover:text-gold"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
