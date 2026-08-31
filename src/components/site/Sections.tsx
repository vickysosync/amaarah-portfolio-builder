import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useSite } from "@/store/site";
import { processSteps, trustStrip, whyChoose } from "@/data/mock";
import { EmptyState, SectionHeading } from "./SiteLayout";

export function TrustStrip() {
  return (
    <section className="border-b border-border bg-card">
      <div className="container-x grid grid-cols-1 divide-y divide-border sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-y-0">
        {trustStrip.map((item) => (
          <div key={item} className="flex items-center gap-3 px-2 py-5 lg:justify-center lg:px-4">
            <span className="text-gold" aria-hidden="true">
              ◆
            </span>
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-navy">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AboutPreview() {
  const { about } = useSite();
  return (
    <section className="section-y">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <img
            src={about.image}
            alt="AMAARAH team reviewing architectural drawings"
            loading="lazy"
            width={1200}
            height={1400}
            className="w-full object-cover"
          />
          <div className="absolute -bottom-6 -right-4 hidden bg-navy px-7 py-6 lg:block">
            <p className="font-display text-3xl text-gold">100%</p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-primary-foreground/70">
              Customized Approach
            </p>
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="About AMAARAH" title={about.heading} />
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground lg:text-base">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {about.values.map((v) => (
              <li key={v} className="flex items-center gap-3 text-sm text-navy">
                <span className="text-gold">—</span>
                {v}
              </li>
            ))}
          </ul>
          <Link to="/about" className="btn-base btn-outline-dark mt-9">
            {about.ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function StatsBand() {
  const { about } = useSite();
  return (
    <section className="bg-navy py-14">
      <div className="container-x grid grid-cols-2 gap-8 lg:grid-cols-4">
        {about.stats.map((s) => (
          <div key={s.label} className="border-l border-gold/40 pl-5">
            <p className="font-display text-3xl text-gold lg:text-4xl">{s.value}</p>
            <p className="mt-2 text-[0.68rem] uppercase tracking-[0.16em] text-primary-foreground/65">{s.label}</p>
          </div>
        ))}
      </div>
      <p className="container-x mt-8 text-[0.68rem] uppercase tracking-[0.14em] text-primary-foreground/35">
        Illustrative company highlights — not performance claims.
      </p>
    </section>
  );
}

export function ServicesGrid({ limit }: { limit?: number }) {
  const { services } = useSite();
  const list = services.filter((s) => s.active).slice(0, limit ?? services.length);

  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="What We Do"
          title="Our Core Services"
          description="Customized real estate and infrastructure services built around your project objectives."
        />
        {list.length === 0 ? (
          <div className="mt-12">
            <EmptyState message="No services available." />
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((s) => (
              <article key={s.id} className="card-elevated group flex flex-col p-8">
                <span className="text-2xl text-gold" aria-hidden="true">
                  {s.icon}
                </span>
                <h3 className="mt-5 text-xl text-navy">{s.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.shortDescription}</p>
                <Link
                  to="/services/$id"
                  params={{ id: s.id }}
                  className="mt-6 inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-navy transition-colors group-hover:text-gold"
                >
                  Learn More <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

const statusTone: Record<string, string> = {
  Ongoing: "bg-gold text-navy",
  Planning: "bg-navy text-primary-foreground",
  Completed: "bg-success text-primary-foreground",
  Concept: "bg-secondary text-navy",
};

export function ProjectCard({
  project,
}: {
  project: ReturnType<typeof useSite>["projects"][number];
}) {
  return (
    <article className="card-elevated group flex flex-col overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={`${project.name} — ${project.category} demo project`}
          loading="lazy"
          width={1200}
          height={800}
          className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 bg-card/90 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-navy">
          Demo Project
        </span>
        <span
          className={`absolute right-4 top-4 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] ${statusTone[project.status]}`}
        >
          {project.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gold">
          {project.category} • {project.location}
        </p>
        <h3 className="mt-3 text-xl text-navy">{project.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <Link
          to="/projects/$id"
          params={{ id: project.id }}
          className="mt-6 inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-navy transition-colors group-hover:text-gold"
        >
          View Project <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export function FeaturedProjects() {
  const { projects } = useSite();
  const list = projects.filter((p) => p.active).slice(0, 3);
  return (
    <section className="section-y bg-secondary/40">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Portfolio"
            title="Featured Projects"
            description="Sample and demonstration projects that illustrate our development approach."
          />
          <Link to="/projects" className="btn-base btn-outline-dark">
            All Projects
          </Link>
        </div>
        {list.length === 0 ? (
          <div className="mt-12">
            <EmptyState message="No projects available." />
          </div>
        ) : (
          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function WhyChoose() {
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="Our Difference"
          title="Why Choose AMAARAH"
          description="A practical, integrity-led way of working on real estate and infrastructure projects."
        />
        <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((w, i) => (
            <div key={w.title} className="group bg-card p-8 transition-colors hover:bg-navy">
              <p className="font-display text-2xl text-gold">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-lg text-navy transition-colors group-hover:text-primary-foreground">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-primary-foreground/70">
                {w.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessTimeline() {
  return (
    <section className="section-y bg-navy text-primary-foreground">
      <div className="container-x">
        <SectionHeading eyebrow="How We Work" title="Our Approach" />
        <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((s) => (
            <div key={s.no} className="bg-navy p-8 transition-colors hover:bg-navy-soft">
              <p className="font-display text-3xl text-gold">{s.no}</p>
              <h3 className="mt-3 text-lg text-primary-foreground">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/65">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const { testimonials } = useSite();
  const list = testimonials.filter((t) => t.active);
  const [i, setI] = useState(0);
  if (list.length === 0) {
    return (
      <section className="section-y">
        <div className="container-x">
          <EmptyState message="No testimonials available." />
        </div>
      </section>
    );
  const t = list[Math.min(i, list.length - 1)]!;
  const t = list[Math.min(i, list.length - 1)];
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeading center eyebrow="Demo Feedback" title="What Clients Say" description="Illustrative demo content — not verified customer reviews." />
        <figure className="card-elevated mx-auto mt-12 max-w-3xl p-10 text-center">
          <p className="text-gold" aria-hidden="true">
            {"★".repeat(t.rating)}
          </p>
          <blockquote className="mt-6 font-display text-xl leading-relaxed text-navy lg:text-2xl">
            “{t.quote}”
          </blockquote>
          <figcaption className="mt-6 text-sm text-muted-foreground">
            — {t.name}
            <span className="block text-xs uppercase tracking-[0.14em]">{t.role}</span>
          </figcaption>
        </figure>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => setI((v) => (v - 1 + list.length) % list.length)}
            className="btn-base btn-outline-dark h-10 w-10 p-0"
          >
            ‹
          </button>
          {list.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Testimonial ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-[3px] transition-all ${idx === i ? "w-8 bg-gold" : "w-4 bg-border"}`}
            />
          ))}
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => setI((v) => (v + 1) % list.length)}
            className="btn-base btn-outline-dark h-10 w-10 p-0"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const { faqs } = useSite();
  const list = faqs.filter((f) => f.active);
  const [open, setOpen] = useState<string | null>(list[0]?.id ?? null);

  return (
    <section className="section-y bg-secondary/40">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" description="Answers to common questions about working with AMAARAH." />
        <div>
          {list.length === 0 ? (
            <EmptyState message="No FAQs available." />
          ) : (
            <div className="divide-y divide-border border-y border-border">
              {list.map((f) => (
                <div key={f.id}>
                  <button
                    type="button"
                    onClick={() => setOpen(open === f.id ? null : f.id)}
                    aria-expanded={open === f.id}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-sm font-semibold text-navy lg:text-base">{f.question}</span>
                    <span className={`text-gold transition-transform ${open === f.id ? "rotate-45" : ""}`}>+</span>
                  </button>
                  <div className={`overflow-hidden transition-[max-height] duration-300 ${open === f.id ? "max-h-60" : "max-h-0"}`}>
                    <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function ContactCta() {
  const { company } = useSite();
  return (
    <section className="bg-navy py-16 text-primary-foreground lg:py-20">
      <div className="container-x flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <h2 className="text-2xl text-primary-foreground sm:text-3xl lg:text-4xl">Have a Project in Mind?</h2>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
            Let's discuss how AMAARAH can help turn your infrastructure requirement into a practical solution.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={`tel:${company.phone}`} className="btn-base btn-outline-light">
            Call Us
          </a>
          <a href={`mailto:${company.email}`} className="btn-base btn-outline-light">
            Email Us
          </a>
          <Link to="/contact" className="btn-base btn-gold">
            {company.primaryCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
