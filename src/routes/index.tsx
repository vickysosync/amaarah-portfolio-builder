import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/site/SiteLayout";
import HeroSlider from "@/components/site/HeroSlider";
import {
  AboutPreview,
  ContactCta,
  FaqSection,
  FeaturedProjects,
  ProcessTimeline,
  ServicesGrid,
  StatsBand,
  Testimonials,
  TrustStrip,
  WhyChoose,
} from "@/components/site/Sections";

const title = "AMAARAH BUILDCON INFRA PVT LTD — Real Estate & Infrastructure, Kolhapur";
const description =
  "Customized, cost-effective real estate and corporate infrastructure solutions in Kolhapur, Maharashtra — delivered with honesty, integrity and operational excellence.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <HeroSlider />
      <TrustStrip />
      <AboutPreview />
      <StatsBand />
      <ServicesGrid limit={6} />
      <FeaturedProjects />
      <WhyChoose />
      <ProcessTimeline />
      <Testimonials />
      <FaqSection />
      <ContactCta />
    </SiteLayout>
  );
}
