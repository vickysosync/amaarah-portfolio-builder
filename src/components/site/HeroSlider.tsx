import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSite } from "@/store/site";
import { EmptyState } from "./SiteLayout";

export default function HeroSlider() {
  const { banners } = useSite();
  const active = banners.filter((b) => b.active);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || active.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % active.length), 6000);
    return () => clearInterval(t);
  }, [paused, active.length]);

  useEffect(() => {
    if (index >= active.length) setIndex(0);
  }, [active.length, index]);

  if (active.length === 0) {
    return (
      <section className="bg-navy py-24">
        <div className="container-x">
          <EmptyState message="No active banners." />
        </div>
      </section>
    );
  }

  const current = active[Math.min(index, active.length - 1)]!;

  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden bg-navy">
      {active.map((b, i) => (
        <img
          key={b.id}
          src={b.image}
          alt={b.title}
          width={1920}
          height={1080}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/92 via-navy/75 to-navy/40" />

      <div className="container-x relative flex min-h-[88vh] flex-col justify-center py-24">
        <div className="max-w-3xl">
          <p className="eyebrow">
            <span className="h-px w-10 bg-gold" />
            {current.subtitle}
          </p>
          <h1 className="mt-6 text-4xl leading-[1.08] text-primary-foreground sm:text-5xl lg:text-6xl">
            {current.title}
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-primary-foreground/75 lg:text-base">
            {current.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link to={current.ctaLink as "/"} className="btn-base btn-gold">
              {current.ctaText}
            </Link>
            <Link to="/contact" className="btn-base btn-outline-light">
              Start a Conversation
            </Link>
          </div>
        </div>

        <div className="mt-14 flex items-center gap-4">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => setIndex((i) => (i - 1 + active.length) % active.length)}
            className="btn-base btn-outline-light h-11 w-11 p-0"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => setIndex((i) => (i + 1) % active.length)}
            className="btn-base btn-outline-light h-11 w-11 p-0"
          >
            ›
          </button>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="btn-base btn-outline-light h-11 px-4 text-[0.65rem]"
          >
            {paused ? "Play" : "Pause"}
          </button>
          <div className="ml-2 flex items-center gap-2">
            {active.map((b, i) => (
              <button
                key={b.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-[3px] transition-all duration-300 ${
                  i === index ? "w-10 bg-gold" : "w-5 bg-primary-foreground/35 hover:bg-primary-foreground/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
