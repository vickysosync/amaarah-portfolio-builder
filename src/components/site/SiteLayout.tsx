import { useEffect, useState, type ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`btn-base btn-navy fixed bottom-6 right-6 z-40 h-11 w-11 rounded-full p-0 shadow-lg transition-opacity ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      ↑
    </button>
  );
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-navy py-16 text-primary-foreground lg:py-24">
      <div className="container-x">
        <p className="eyebrow">
          <span className="h-px w-8 bg-gold" />
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-3xl leading-tight sm:text-4xl lg:text-5xl">{title}</h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-primary-foreground/70 lg:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`eyebrow ${center ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-gold" />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-2xl leading-tight text-navy sm:text-3xl lg:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-sm leading-relaxed text-muted-foreground lg:text-base">{description}</p> : null}
    </div>
  );
}

export function EmptyState({ message, action }: { message: string; action?: ReactNode }) {
  return (
    <div className="border border-dashed border-border bg-card px-6 py-14 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function Modal({
  open,
  onClose,
  children,
  title,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string | undefined;
  wide?: boolean | undefined;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-navy/80 p-4 py-10 backdrop-blur-sm">
      <div
        className={`relative w-full ${wide ? "max-w-4xl" : "max-w-2xl"} bg-card shadow-2xl`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-4">
          <h3 className="text-lg text-navy">{title}</h3>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="text-xl leading-none text-muted-foreground transition-colors hover:text-navy"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
}

export function Toast({ message, onDone }: { message: string | null; onDone: () => void }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [message, onDone]);

  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 border-l-2 border-gold bg-navy px-5 py-3 text-sm text-primary-foreground shadow-xl">
      {message}
    </div>
  );
}
