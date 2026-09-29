"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/lib/useReducedMotion";
import { P32Star, P32Wordmark } from "./P32Mark";
import { Grain } from "./Grain";

/**
 * The PDF's own title page, brought to a first screen - a centered,
 * paper-white opening statement with restrained grain texture, matching
 * the "document" material used across the rest of the site's paper
 * sections rather than the photographic dark treatment of the Hero below.
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

      // Quiet parallax exit as the reader scrolls into the Hero below.
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
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-paper text-black"
    >
      <Grain />

      <div
        data-reveal
        className="absolute inset-x-6 top-24 z-10 flex items-start justify-between gap-6 sm:inset-x-10"
      >
        <div className="flex items-center gap-2.5">
          <P32Star className="h-5 w-5" style={{ color: "var(--line-on-paper)" }} />
          <P32Wordmark className="h-4 w-auto text-black" />
        </div>
        <p className="max-w-[13rem] text-right font-mono text-[0.65rem] leading-relaxed tracking-[0.08em] text-black/60 sm:max-w-none sm:text-xs">
          LICENSED AND SUPERVISED BY THE ISRAELI MINISTRY OF DEFENSE
        </p>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center px-6 py-28 text-center sm:px-10">
        <div data-reveal className="font-mono text-xs tracking-[0.1em] text-black sm:text-sm">
          <p className="font-medium">PROJECT 32 LTD</p>
          <p className="mt-1 text-black/60">INTELLIGENCE. SECURITY. PEACE OF MIND.</p>
        </div>

        <div data-rule className="mx-auto mt-8 h-px w-24 sm:mt-10" style={{ background: "var(--line-on-paper)" }} />

        <h1
          data-reveal
          className="mx-auto mt-8 font-display font-medium leading-[1.08] tracking-[-0.02em] text-black sm:mt-10 text-[clamp(2.75rem,13vw,3.5rem)] sm:text-[clamp(3rem,8.2vw,5.25rem)]"
        >
          <span className="block text-balance sm:whitespace-nowrap">Security Architecture</span>
          <span className="mt-1 block text-balance sm:mt-0 sm:whitespace-nowrap">
            for Ultra-High-Net-Worth
          </span>
        </h1>

        <p data-reveal className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-black/60 sm:text-base">
          Individuals, Families, Corporations &amp; Global Assets
        </p>
      </div>

      <div
        data-reveal
        className="absolute inset-x-6 bottom-6 z-10 flex items-end justify-between sm:inset-x-10"
      >
        <span className="font-mono text-[0.65rem] tracking-[0.1em]" style={{ color: "var(--line-on-paper)" }}>
          SCROLL ↓
        </span>
        <span className="font-mono text-[0.65rem] tracking-[0.1em] text-black/40">DOC 01 · COVER</span>
      </div>
    </section>
  );
}
