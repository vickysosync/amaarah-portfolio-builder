import { createFileRoute } from "@tanstack/react-router";
import SiteLayout, { PageHeader } from "@/components/site/SiteLayout";
import {
  AboutPreview,
  ContactCta,
  ProcessTimeline,
  StatsBand,
  TrustStrip,
  WhyChoose,
} from "@/components/site/Sections";

const title = "About AMAARAH — Real Estate & Infrastructure Firm in Kolhapur";
const description =
  "AMAARAH BUILDCON INFRA PVT LTD is a Kolhapur-based real estate and corporate infrastructure firm built on honesty, integrity and operational excellence.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About Us"
        title="Building With Purpose. Delivering With Integrity."
        description="An Indian real estate and corporate infrastructure firm based in Kolhapur, Maharashtra, focused on customized and cost-effective building solutions."
      />
      <TrustStrip />
      <AboutPreview />
      <StatsBand />
      <WhyChoose />
      <ProcessTimeline />
      <ContactCta />
    </SiteLayout>
  );
}
