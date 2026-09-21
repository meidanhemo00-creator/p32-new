"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/lib/useReducedMotion";
import { Grain } from "./Grain";

/**
 * Protective Canine Training & Deployment - given the same major-visual-
 * moment treatment as any other capability, not a small card or thumbnail.
 */
export function Canine() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { gsap, ScrollTrigger } = useGsap();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const portrait = root.querySelector<HTMLElement>("[data-portrait]");
      const text = root.querySelectorAll<HTMLElement>("[data-text]");
      const inset = root.querySelector<HTMLElement>("[data-inset]");

      if (reducedMotion) {
        gsap.set([portrait, text, inset], { clearProps: "all" });
        return;
      }

      gsap.set(portrait, { opacity: 0, scale: 1.05 });
      gsap.set(text, { opacity: 0, y: 16 });
      gsap.set(inset, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });
      tl.to(text, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out" })
        .to(portrait, { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" }, "-=0.5")
        .to(inset, { opacity: 1, duration: 0.8, ease: "power1.out" }, "-=0.4");
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-ink px-6 py-28 sm:px-10 sm:py-36">
      <Grain />
      <div className="relative mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <div>
          <p data-text className="font-mono text-xs tracking-[0.14em]" style={{ color: "var(--line)" }}>
            LAYERED PHYSICAL PROTECTION
          </p>
          <h2
            data-text
            className="font-display mt-4 text-[2rem] font-medium leading-[1.15] tracking-[-0.01em] text-white sm:text-[2.75rem]"
          >
            Protective Canine Training &amp; Deployment
          </h2>
          <p data-text className="mt-6 max-w-md text-lg leading-relaxed" style={{ color: "var(--white-soft)" }}>
            Specialist training, integration, and operational use of
            protection dogs as part of layered personal, residential,
            estate, and site-security programs.
          </p>

          <div data-inset className="mt-10 max-w-md overflow-hidden border" style={{ borderColor: "var(--hairline-dark)" }}>
            <div
              className="aspect-[16/10] bg-cover"
              style={{ backgroundImage: "url(/images/p32/protective-canine-team-operation.jpg)", backgroundPosition: "50% 45%" }}
              role="img"
              aria-label="A protective canine handler and operational team working together in the field."
            />
            <p
              className="border-t px-4 py-3 font-mono text-[0.65rem] tracking-[0.1em]"
              style={{ borderColor: "var(--hairline-dark)", color: "var(--line)" }}
            >
              INTEGRATED WITH OPERATIONAL TEAMS
            </p>
          </div>
        </div>

        <div data-portrait className="relative aspect-[4/5] w-full overflow-hidden border" style={{ borderColor: "var(--hairline-dark)" }}>
          <div
            className="absolute inset-0 bg-cover"
            style={{ backgroundImage: "url(/images/p32/protective-canine-handler-portrait.jpg)", backgroundPosition: "50% 30%" }}
            role="img"
            aria-label="A trained protection dog with its handler, editorial portrait."
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(0deg, rgba(9,9,9,0.55) 0%, transparent 40%)" }}
          />
        </div>
      </div>
    </section>
  );
}
