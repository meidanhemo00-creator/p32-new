"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/lib/useReducedMotion";
import { Grain } from "./Grain";

const TRAITS = [
  { tag: "01", label: "Fully customized" },
  { tag: "02", label: "Intelligence-driven" },
  { tag: "03", label: "Built for long-term resilience - not temporary coverage" },
];

export function Engagement() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { gsap, ScrollTrigger } = useGsap();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const heading = root.querySelector<HTMLElement>("[data-heading]");
    const rows = root.querySelectorAll<HTMLElement>("[data-row]");
    const bars = root.querySelectorAll<HTMLElement>("[data-bar]");
    const plate = root.querySelector<HTMLElement>("[data-plate]");

    if (reducedMotion) {
      gsap.set([heading, rows, bars, plate], { clearProps: "all" });
      return;
    }

    gsap.set(heading, { opacity: 0, y: 20 });
    gsap.set(rows, { opacity: 0 });
    gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(plate, { opacity: 0, scale: 1.05 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 72%", once: true },
    });
    tl.to(heading, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" })
      .to(rows, { opacity: 1, duration: 0.4, stagger: 0.15, ease: "power1.out" }, "-=0.2")
      .to(bars, { scaleX: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }, "<");

    gsap.to(plate, {
      opacity: 1,
      scale: 1,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: { trigger: plate, start: "top 85%", once: true },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === root) st.kill();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <section className="relative bg-paper px-6 py-32 text-black sm:px-10 sm:py-44">
      <Grain />
      <div ref={rootRef} className="relative mx-auto max-w-[1100px]">
        <h2
          data-heading
          className="font-display max-w-2xl text-[2.25rem] font-medium leading-[1.08] tracking-[-0.01em] sm:text-[3.25rem] lg:text-[3.75rem]"
        >
          We work with a limited number of principals, communities, and organizations.
        </h2>

        <div className="mt-16 grid gap-px sm:grid-cols-3" style={{ background: "var(--hairline-light)" }}>
          {TRAITS.map((trait) => (
            <div key={trait.tag} data-row className="bg-paper p-6">
              <span className="font-mono text-xs tracking-[0.08em]" style={{ color: "var(--line-on-paper)" }}>
                {trait.tag}
              </span>
              <p className="mt-3 text-lg leading-snug">{trait.label}</p>
              <div data-bar className="mt-4 h-px w-full" style={{ background: "var(--line-on-paper)" }} />
            </div>
          ))}
        </div>

        <div
          data-plate
          className="relative mt-16 h-[32vh] min-h-[220px] overflow-hidden border"
          style={{ borderColor: "var(--black)" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/imagery/abyssal-texture-atlantic.jpg)" }}
            role="img"
            aria-label="Abstract satellite bathymetry texture of the open North Atlantic seafloor — NASA imagery, public domain."
          />
          <Grain />
          <p
            className="absolute bottom-5 left-5 font-mono text-[0.7rem] tracking-[0.1em] sm:bottom-6 sm:left-6"
            style={{ color: "var(--line-bright)" }}
          >
            CONTROL, AT DEPTH
          </p>
        </div>
      </div>
    </section>
  );
}
