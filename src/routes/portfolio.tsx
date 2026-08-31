import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import SiteLayout, { EmptyState, Modal, PageHeader } from "@/components/site/SiteLayout";
import { ContactCta } from "@/components/site/Sections";
import { useSite } from "@/store/site";
import type { PortfolioItem } from "@/data/mock";

const categories = [
  "All",
  "Residential",
  "Commercial",
  "Infrastructure",
  "Architecture",
  "Interior",
  "Development",
] as const;

const title = "Portfolio — Sample Architecture & Development Gallery | AMAARAH";
const description =
  "A cohesive sample gallery of residential, commercial, infrastructure, architectural and interior imagery representing AMAARAH's design sensibility.";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const { portfolio } = useSite();
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [active, setActive] = useState<PortfolioItem | null>(null);

  const list = portfolio.filter((p) => p.active).filter((p) => cat === "All" || p.category === cat);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Sample Portfolio"
        title="Architecture & Development Gallery"
        description="Sample portfolio imagery used to represent our architectural direction and areas of work."
      />
      <section className="section-y">
        <div className="container-x">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`border px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] transition-colors ${
                  cat === c
                    ? "border-gold bg-gold text-navy"
                    : "border-border bg-card text-muted-foreground hover:border-gold hover:text-navy"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {list.length === 0 ? (
            <div className="mt-12">
              <EmptyState message="No portfolio items available." />
            </div>
          ) : (
            <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
              {list.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item)}
                  className="group block w-full break-inside-avoid overflow-hidden text-left"
                  aria-label={`Preview ${item.title}`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={`${item.title} — ${item.category} sample portfolio image`}
                      loading="lazy"
                      className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                        i % 3 === 1 ? "h-80" : "h-60"
                      }`}
                    />
                    <span className="absolute left-4 top-4 bg-card/90 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-navy">
                      Sample Portfolio
                    </span>
                  </div>
                  <div className="border border-t-0 border-border bg-card p-5">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gold">{item.category}</p>
                    <h2 className="mt-2 text-lg text-navy">{item.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <Modal open={active !== null} onClose={() => setActive(null)} title={active?.title} wide>
        {active ? (
          <>
            <img src={active.image} alt={`${active.title} enlarged view`} className="w-full object-cover" />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{active.description}</p>
          </>
        ) : null}
      </Modal>

      <ContactCta />
    </SiteLayout>
  );
}
