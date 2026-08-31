import { createFileRoute } from "@tanstack/react-router";
import SiteLayout, { PageHeader, SectionHeading } from "@/components/site/SiteLayout";
import EnquiryForm from "@/components/site/EnquiryForm";
import { FaqSection } from "@/components/site/Sections";
import { useSite } from "@/store/site";

const title = "Contact AMAARAH BUILDCON INFRA PVT LTD — Kolhapur Office";
const description =
  "Call 6212521221, email amaarahinfrapvtltd@gmail.com or visit our Shahupuri, Kolhapur office. Request a consultation for your real estate or infrastructure requirement.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { company } = useSite();

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Get In Touch"
        title="Have a Project in Mind?"
        description="Let's discuss how AMAARAH can help turn your infrastructure requirement into a practical solution."
      />

      <section className="section-y">
        <div className="container-x grid gap-14 lg:grid-cols-5 lg:gap-20">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Office" title="Contact Information" />
            <dl className="mt-8 space-y-7 text-sm">
              <div>
                <dt className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gold">Phone</dt>
                <dd className="mt-2">
                  <a href={`tel:${company.phone}`} className="text-navy transition-colors hover:text-gold">
                    {company.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gold">Email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${company.email}`}
                    className="break-all text-navy transition-colors hover:text-gold"
                  >
                    {company.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gold">Address</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">{company.address}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gold">Working Hours</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  {company.workingHours}
                  <br />
                  {company.sunday}
                </dd>
              </div>
            </dl>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href={`tel:${company.phone}`} className="btn-base btn-navy">
                Call Us
              </a>
              <a href={`mailto:${company.email}`} className="btn-base btn-outline-dark">
                Email Us
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <SectionHeading eyebrow="Enquiry" title="Request Consultation" />
            <div className="mt-8">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>

      <FaqSection />
    </SiteLayout>
  );
}
