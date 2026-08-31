import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import SiteLayout, { EmptyState, Modal, SectionHeading } from "@/components/site/SiteLayout";
import { useSite } from "@/store/site";

export const Route = createFileRoute("/projects/$id")({
  head: () => ({
    meta: [
      { title: "Project Details — AMAARAH BUILDCON INFRA PVT LTD" },
      {
        name: "description",
        content:
          "Overview, highlights, scope and gallery for a demo development project by AMAARAH BUILDCON INFRA PVT LTD, Kolhapur.",
      },
      { property: "og:title", content: "Project Details — AMAARAH BUILDCON INFRA PVT LTD" },
      {
        property: "og:description",
        content: "Demo project overview, highlights, scope and gallery from AMAARAH BUILDCON INFRA PVT LTD.",
      },
    ],
  }),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { id } = Route.useParams();
  const { projects } = useSite();
  const project = projects.find((p) => p.id === id && p.active);
  const [preview, setPreview] = useState<string | null>(null);

  if (!project) {
    return (
      <SiteLayout>
        <div className="container-x section-y">
          <EmptyState
            message="This project is not available."
            action={
              <Link to="/projects" className="btn-base btn-navy">
                View all projects
              </Link>
            }
          />
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="relative bg-navy text-primary-foreground">
        <img
          src={project.image}
          alt={`${project.name} — ${project.category} demo project`}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="container-x relative py-20 lg:py-28">
          <span className="bg-gold px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-navy">
            Demo Project
          </span>
          <h1 className="mt-5 max-w-3xl text-3xl leading-tight sm:text-4xl lg:text-5xl">{project.name}</h1>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-gold">
            <span>{project.category}</span>
            <span>{project.location}</span>
            <span>Status: {project.status}</span>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid gap-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Overview" title="Project Overview" />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground lg:text-base">{project.overview}</p>

            <h3 className="mt-12 text-xl text-navy">Key Highlights</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 border border-border bg-card p-4 text-sm text-navy">
                  <span className="text-gold" aria-hidden="true">
                    ◆
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            <h3 className="mt-12 text-xl text-navy">Scope</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.scope}</p>

            <h3 className="mt-12 text-xl text-navy">Project Gallery</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {project.gallery.map((g, i) => (
                <button
                  key={`${g}-${i}`}
                  type="button"
                  onClick={() => setPreview(g)}
                  className="group overflow-hidden"
                  aria-label={`Open image ${i + 1} of ${project.name}`}
                >
                  <img
                    src={g}
                    alt={`${project.name} gallery image ${i + 1}`}
                    loading="lazy"
                    className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </button>
              ))}
            </div>
          </div>

          <aside className="h-fit border border-border bg-card p-8">
            <h3 className="text-lg text-navy">Interested in something similar?</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Share your requirement and our team will get in touch during office hours.
            </p>
            <Link to="/contact" className="btn-base btn-gold mt-6 w-full">
              Enquire About a Similar Project
            </Link>
            <Link to="/projects" className="btn-base btn-outline-dark mt-3 w-full">
              Back to Projects
            </Link>
          </aside>
        </div>
      </section>

      <Modal open={preview !== null} onClose={() => setPreview(null)} title={project.name} wide>
        {preview ? <img src={preview} alt={`${project.name} enlarged view`} className="w-full object-cover" /> : null}
      </Modal>
    </SiteLayout>
  );
}
