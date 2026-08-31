import { createFileRoute } from "@tanstack/react-router";
import SiteLayout, { PageHeader } from "@/components/site/SiteLayout";
import { ContactCta, ProcessTimeline, ServicesGrid } from "@/components/site/Sections";

const title = "Our Core Services — AMAARAH BUILDCON INFRA PVT LTD";
const description =
  "Real estate development, corporate infrastructure, building solutions, customized project solutions, planning and coordination across Kolhapur district.";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="What We Do"
        title="Services Built Around Your Project"
        description="Customized, cost-effective real estate and infrastructure services shaped around objectives, site conditions and budget."
      />
      <ServicesGrid />
      <ProcessTimeline />
      <ContactCta />
    </SiteLayout>
  );
}
