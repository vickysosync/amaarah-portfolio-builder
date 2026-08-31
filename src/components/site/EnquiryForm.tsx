import { useState } from "react";
import { useSite } from "@/store/site";
import { Toast } from "./SiteLayout";

type FormState = {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  budget: string;
  message: string;
};

const empty: FormState = {
  name: "",
  phone: "",
  email: "",
  projectType: "Residential",
  location: "",
  budget: "",
  message: "",
};

const projectTypes = ["Residential", "Commercial", "Infrastructure", "Corporate", "Other"];
const budgets = ["Under ₹10L", "₹10L – ₹25L", "₹25L – ₹50L", "₹50L – ₹1Cr", "Above ₹1Cr", "Not decided"];

const inputClass =
  "w-full border border-input bg-card px-4 py-3 text-sm text-navy outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold";

export default function EnquiryForm() {
  const { addEnquiry } = useSite();
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((x) => ({ ...x, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Full name is required.";
    else if (form.name.trim().length > 100) next.name = "Name must be under 100 characters.";
    if (!/^[0-9+\-\s]{8,15}$/.test(form.phone.trim())) next.phone = "Enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email address.";
    if (!form.location.trim()) next.location = "Project location is required.";
    if (!form.message.trim()) next.message = "Please describe your requirement.";
    else if (form.message.trim().length > 1000) next.message = "Message must be under 1000 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      addEnquiry({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        projectType: form.projectType,
        location: form.location.trim(),
        budget: form.budget || "Not specified",
        message: form.message.trim(),
      });
      setForm(empty);
      setSubmitting(false);
      setDone(true);
      setToast("Thank you — your enquiry has been received.");
    }, 500);
  };

  return (
    <>
      <form onSubmit={onSubmit} noValidate className="card-elevated p-7 lg:p-9">
        <h2 className="text-2xl text-navy">Request a Consultation</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Share your requirement and our team will get back during office hours.
        </p>

        {done ? (
          <div className="mt-6 border-l-2 border-success bg-secondary/60 px-4 py-3 text-sm text-navy">
            Your enquiry was submitted successfully and is now visible in the admin dashboard.
          </div>
        ) : null}

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <Field label="Full Name" error={errors.name} required>
            <input className={inputClass} value={form.name} onChange={set("name")} placeholder="Your name" />
          </Field>
          <Field label="Phone Number" error={errors.phone} required>
            <input className={inputClass} value={form.phone} onChange={set("phone")} placeholder="10-digit number" />
          </Field>
          <Field label="Email" error={errors.email} required>
            <input className={inputClass} value={form.email} onChange={set("email")} placeholder="you@example.com" />
          </Field>
          <Field label="Project Type">
            <select className={inputClass} value={form.projectType} onChange={set("projectType")}>
              {projectTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Location" error={errors.location} required>
            <input className={inputClass} value={form.location} onChange={set("location")} placeholder="City / area" />
          </Field>
          <Field label="Budget Range">
            <select className={inputClass} value={form.budget} onChange={set("budget")}>
              <option value="">Select a range</option>
              {budgets.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Message" error={errors.message} required>
              <textarea
                rows={5}
                className={inputClass}
                value={form.message}
                onChange={set("message")}
                placeholder="Tell us about your project requirement"
              />
            </Field>
          </div>
        </div>

        <button type="submit" disabled={submitting} className="btn-base btn-navy mt-7 w-full sm:w-auto disabled:opacity-60">
          {submitting ? "Submitting…" : "Submit Enquiry"}
        </button>
      </form>
      <Toast message={toast} onDone={() => setToast(null)} />
    </>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string | undefined;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.14em] text-navy">
        {label} {required ? <span className="text-gold">*</span> : null}
      </span>
      {children}
      {error ? <span className="mt-1.5 block text-xs text-destructive">{error}</span> : null}
    </label>
  );
}
