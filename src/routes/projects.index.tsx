import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import SiteLayout, { EmptyState, PageHeader } from "@/components/site/SiteLayout";
import { ContactCta, ProjectCard } from "@/components/site/Sections";
import { useSite } from "@/store/site";

const filters = [
  "All",
  "Residential",
  "Commercial",
  "Infrastructure",
  "Mixed Use",
  "Ongoing",
  "Planning",
  "Completed",
] as const;

const title = "Projects — Demo Real Estate & Infrastructure Portfolio | AMAARAH";
const description =
  "Browse sample residential, commercial, infrastructure and mixed-use development projects illustrating AMAARAH's approach in Kolhapur.";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { projects } = useSite();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const list = projects
    .filter((p) => p.active)
    .filter((p) => filter === "All" || p.category === filter || p.status === filter);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Our Work"
        title="Projects"
        description="All entries below are demo / sample projects created to illustrate our development approach."
      />
      <section className="section-y">
        <div className="container-x">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`border px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] transition-colors ${
                  filter === f
                    ? "border-gold bg-gold text-navy"
                    : "border-border bg-card text-muted-foreground hover:border-gold hover:text-navy"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {list.length === 0 ? (
            <div className="mt-12">
              <EmptyState message="No projects available for this filter." />
            </div>
          ) : (
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </div>
      </section>
      <ContactCta />
    </SiteLayout>
  );
}
