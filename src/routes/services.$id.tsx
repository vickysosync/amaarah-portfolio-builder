import { Link, createFileRoute } from "@tanstack/react-router";
import SiteLayout, { EmptyState, SectionHeading } from "@/components/site/SiteLayout";
import { ContactCta } from "@/components/site/Sections";
import { useSite } from "@/store/site";

export const Route = createFileRoute("/services/$id")({
  head: () => ({
    meta: [
      { title: "Service Details — AMAARAH BUILDCON INFRA PVT LTD" },
      {
        name: "description",
        content:
          "Detailed view of a customized real estate or infrastructure service offered by AMAARAH BUILDCON INFRA PVT LTD in Kolhapur.",
      },
      { property: "og:title", content: "Service Details — AMAARAH BUILDCON INFRA PVT LTD" },
      {
        property: "og:description",
        content: "Benefits, process and scope of AMAARAH's real estate and infrastructure services.",
      },
    ],
  }),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { id } = Route.useParams();
  const { services } = useSite();
  const service = services.find((s) => s.id === id && s.active);

  if (!service) {
    return (
      <SiteLayout>
        <div className="container-x section-y">
          <EmptyState
            message="This service is not available."
            action={
              <Link to="/services" className="btn-base btn-navy">
                View all services
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
          src={service.image}
          alt={`${service.name} — architectural reference`}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="container-x relative py-20 lg:py-28">
          <p className="eyebrow">
            <span className="h-px w-8 bg-gold" />
            Service
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl leading-tight sm:text-4xl lg:text-5xl">{service.name}</h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-primary-foreground/75 lg:text-base">
            {service.shortDescription}
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid gap-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Overview" title="What this service covers" />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground lg:text-base">
              {service.longDescription}
            </p>

            <h3 className="mt-12 text-xl text-navy">Key Benefits</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.benefits.map((b) => (
                <li key={b} className="flex gap-3 border border-border bg-card p-4 text-sm text-navy">
                  <span className="text-gold" aria-hidden="true">
                    ◆
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <h3 className="mt-12 text-xl text-navy">How We Work</h3>
            <ol className="mt-5 space-y-4">
              {service.process.map((p, i) => (
                <li key={p} className="flex gap-4">
                  <span className="font-display text-lg text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{p}</span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="h-fit border border-border bg-card p-8">
            <h3 className="text-lg text-navy">Other Services</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {services
                .filter((s) => s.active && s.id !== service.id)
                .map((s) => (
                  <li key={s.id}>
                    <Link
                      to="/services/$id"
                      params={{ id: s.id }}
                      className="text-muted-foreground transition-colors hover:text-gold"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
            </ul>
            <Link to="/contact" className="btn-base btn-gold mt-8 w-full">
              Request Consultation
            </Link>
          </aside>
        </div>
      </section>

      <ContactCta />
    </SiteLayout>
  );
}
