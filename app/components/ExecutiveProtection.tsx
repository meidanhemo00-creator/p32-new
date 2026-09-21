"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/lib/useReducedMotion";
import { Grain } from "./Grain";

/**
 * Two full-bleed executive-protection photographic plates - real editorial
 * imagery of movement, arrival/departure, and discreet close-protection
 * work. Distinct from Capabilities' text-led rows: these are large
 * atmospheric moments, not small tiles.
 */
export function ExecutiveProtection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { gsap, ScrollTrigger } = useGsap();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const plates = root.querySelectorAll<HTMLElement>("[data-plate]");

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(plates, { clearProps: "all" });
        return;
      }

      plates.forEach((plate) => {
        const image = plate.querySelector<HTMLElement>("[data-image]");
        gsap.set(plate, { opacity: 0, scale: 1.04 });
        gsap.to(plate, {
          opacity: 1,
          scale: 1,
          duration: 1.3,
          ease: "power2.out",
          scrollTrigger: { trigger: plate, start: "top 82%", once: true },
        });
        if (image) {
          gsap.to(image, {
            yPercent: -6,
            ease: "none",
            scrollTrigger: { trigger: plate, start: "top bottom", end: "bottom top", scrub: 0.5 },
          });
        }
      });
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <div ref={rootRef}>
      <section className="relative h-[80svh] min-h-[520px] w-full overflow-hidden bg-ink" data-plate>
        <div
          data-image
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: "url(/images/p32/exec-protection-solo-arrival.jpg)", backgroundPosition: "50% 30%" }}
          role="img"
          aria-label="A close-protection operator in a dark suit, back to camera, during an arrival at a high-end venue entrance."
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(9,9,9,0.92) 0%, rgba(9,9,9,0.1) 45%, rgba(9,9,9,0.55) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(127,168,196,0.16) 0%, transparent 55%)" }}
        />
        <Grain />

        <div className="absolute inset-x-5 bottom-6 sm:inset-x-8 sm:bottom-8">
          <p className="font-mono text-xs tracking-[0.14em]" style={{ color: "var(--line-bright)" }}>
            EXECUTIVE PROTECTION
          </p>
          <h2 className="mt-2 max-w-lg text-2xl font-medium leading-snug text-white sm:text-3xl">
            Movement, arrival, and departure - covered at every transition.
          </h2>
        </div>

        <div
          className="absolute right-5 top-24 hidden w-48 overflow-hidden border sm:block sm:right-8"
          style={{ borderColor: "var(--hairline-dark)" }}
        >
          <div
            className="aspect-[4/5] bg-cover"
            style={{ backgroundImage: "url(/images/p32/exec-protection-earpiece-detail.jpg)", backgroundPosition: "50% 35%" }}
            role="img"
            aria-label="Detail of a discreet earpiece and communication device worn by a protection operator."
          />
          <p
            className="border-t px-3 py-2 font-mono text-[0.6rem] tracking-[0.1em]"
            style={{ borderColor: "var(--hairline-dark)", color: "var(--line)" }}
          >
            DISCREET COMMUNICATION
          </p>
        </div>
      </section>

      <section className="relative h-[70svh] min-h-[440px] w-full overflow-hidden bg-ink" data-plate>
        <div
          data-image
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: "url(/images/p32/exec-protection-team-departure.jpg)", backgroundPosition: "50% 40%" }}
          role="img"
          aria-label="A close-protection team in dark suits moving together during a departure, low-angle, backs to camera."
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(9,9,9,0.85) 0%, rgba(9,9,9,0.05) 50%, rgba(9,9,9,0.4) 100%)",
          }}
        />
        <Grain />
        <div className="absolute inset-x-5 bottom-6 sm:inset-x-8 sm:bottom-8">
          <p className="font-mono text-xs tracking-[0.14em]" style={{ color: "var(--line-bright)" }}>
            DISCREET INTEGRATION
          </p>
          <h2 className="mt-2 max-w-lg text-2xl font-medium leading-snug text-white sm:text-3xl">
            Arrival, departure, and every transition between them, covered.
          </h2>
        </div>
      </section>
    </div>
  );
}
