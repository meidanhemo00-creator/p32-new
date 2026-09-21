"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/lib/useReducedMotion";
import { P32Star, P32Wordmark } from "./P32Mark";

/**
 * The PDF's own title page, brought to a first screen — restrained
 * white/off-white, minimal black type, one pale-blue detail. Distinct from
 * the dark network-diagram Hero that follows: this is a document cover,
 * not a generic website hero.
 */
export function Cover() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { gsap, ScrollTrigger } = useGsap();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const blocks = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const rule = root.querySelector<HTMLElement>("[data-rule]");

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([blocks, rule], { clearProps: "all" });
        return;
      }

      gsap.set(blocks, { opacity: 0, y: 14 });
      gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });

      gsap
        .timeline({ delay: 0.2 })
        .to(blocks, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" })
        .to(rule, { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, "-=0.5");

      // Quiet parallax exit as the reader scrolls into the dark Hero below.
      gsap.to(root, {
        yPercent: -8,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.4 },
      });
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col justify-between bg-paper px-6 py-10 text-black sm:px-10 sm:py-12"
    >
      <div data-reveal className="flex items-start justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <P32Star className="h-5 w-5" style={{ color: "var(--line-on-paper)" }} />
          <P32Wordmark className="h-4 w-auto text-black" />
        </div>
        <p className="max-w-[13rem] text-right font-mono text-[0.65rem] leading-relaxed tracking-[0.08em] sm:max-w-none sm:text-xs">
          LICENSED AND SUPERVISED BY THE ISRAELI MINISTRY OF DEFENSE
        </p>
      </div>

      <div className="mx-auto w-full max-w-[1200px]">
        <div data-reveal className="font-mono text-xs tracking-[0.1em] sm:text-sm">
          <p className="font-medium">PROJECT 32 LTD</p>
          <p className="mt-1" style={{ color: "var(--black-soft)" }}>
            INTELLIGENCE. SECURITY. PEACE OF MIND.
          </p>
        </div>

        <div data-rule className="mt-8 h-px w-full sm:mt-10" style={{ background: "var(--line-on-paper)" }} />

        <h1
          data-reveal
          className="font-display mt-8 text-[2.75rem] font-medium leading-[1.02] tracking-[-0.02em] sm:mt-10 sm:text-[5rem] lg:text-[6.5rem]"
        >
          Security
          <br />
          Architecture
          <br />
          for Ultra-High-Net-Worth
        </h1>

        <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed sm:text-xl" style={{ color: "var(--black-soft)" }}>
          Individuals, Families, Corporations &amp; Global Assets
        </p>
      </div>

      <div data-reveal className="flex items-end justify-between">
        <span className="font-mono text-[0.65rem] tracking-[0.1em]" style={{ color: "var(--line-on-paper)" }}>
          SCROLL ↓
        </span>
        <span className="font-mono text-[0.65rem] tracking-[0.1em]" style={{ color: "var(--black-faint)" }}>
          DOC 01 · COVER
        </span>
      </div>
    </section>
  );
}
