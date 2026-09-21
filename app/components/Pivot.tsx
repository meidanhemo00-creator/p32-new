"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/lib/useReducedMotion";
import { Grain } from "./Grain";

const NETWORK = ["Advisors", "Vendors", "Partners", "Contractors", "Extended networks"];

export function Pivot() {
  const rootRef = useRef<HTMLDivElement>(null);
  const sweepWedgeRef = useRef<SVGGElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { gsap, ScrollTrigger } = useGsap();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const lines = root.querySelectorAll<HTMLElement>("[data-line]");
    const sweep = root.querySelector<HTMLElement>("[data-sweep]");

    if (reducedMotion) {
      gsap.set(lines, { clearProps: "all" });
      gsap.set(sweep, { opacity: 0 });
      return;
    }

    gsap.set(lines, { opacity: 0, y: 10 });
    gsap.set(sweep, { scaleX: 0, transformOrigin: "left center", opacity: 1 });
    gsap.set(bgRef.current, { scale: 1.1, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 65%", once: true },
    });
    tl.to(bgRef.current, { opacity: 1, duration: 1.4, ease: "power1.out" })
      .to(bgRef.current, { scale: 1, duration: 2.2, ease: "power2.out" }, "<")
      .to(sweep, { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, "-=1.6")
      .to(lines, { opacity: 1, y: 0, duration: 0.6, stagger: 0.18, ease: "power2.out" }, "-=0.3")
      .to(sweep, { opacity: 0, duration: 0.4 }, "-=0.1")
      .call(() => {
        gsap.to(sweepWedgeRef.current, { rotate: 360, duration: 14, repeat: -1, ease: "none" });
      });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === root) st.kill();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <section className="relative overflow-hidden bg-ink px-6 py-28 sm:px-10 sm:py-40">
      {/* Real NASA "Black Marble" night-lights imagery (public domain — see
          public/imagery/README.md) — the network of people and access this
          section is about, made literal at the scale of a continent. */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center opacity-0"
        style={{ backgroundImage: "url(/imagery/night-network-europe-mideast.jpg)" }}
        role="img"
        aria-label="Satellite view of city lights across Europe, the Mediterranean, and the Middle East at night — NASA Black Marble imagery, public domain."
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "rgba(9,9,9,0.72)" }}
      />
      <Grain />

      {/* Oversized, near-silent radar motif — a continuous idle system distinct
          from the hero's network, giving this quiet beat its own scale and life. */}
      <svg
        viewBox="0 0 800 800"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[140vh] w-[140vh] -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
        aria-hidden
      >
        <circle cx="400" cy="400" r="120" fill="none" stroke="var(--line)" strokeWidth="1" />
        <circle cx="400" cy="400" r="240" fill="none" stroke="var(--line)" strokeWidth="1" />
        <circle cx="400" cy="400" r="360" fill="none" stroke="var(--line)" strokeWidth="1" />
        <line x1="400" y1="0" x2="400" y2="800" stroke="var(--line)" strokeWidth="1" />
        <line x1="0" y1="400" x2="800" y2="400" stroke="var(--line)" strokeWidth="1" />
        <g ref={sweepWedgeRef} style={{ transformOrigin: "400px 400px" }}>
          <path d="M400 400 L400 40 A360 360 0 0 1 545 90 Z" fill="var(--line-bright)" opacity="0.5" />
        </g>
      </svg>

      <div ref={rootRef} className="relative mx-auto max-w-[900px] text-center">
        <div data-sweep className="mx-auto mb-10 h-px w-full" style={{ background: "var(--line)" }} />

        <p data-line className="font-display text-[1.6rem] font-medium leading-snug text-white sm:text-[2.25rem]">
          Do you know who is working for you - and who represents your name?
        </p>
        <p data-line className="mt-4 font-mono text-xs tracking-[0.1em] text-line sm:text-sm">
          NOT JUST INTERNALLY.
        </p>

        <p data-line className="mt-10 text-lg" style={{ color: "var(--white-soft)" }}>
          But across your full ecosystem:
        </p>

        <div
          data-line
          className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-sm tracking-[0.04em] text-white sm:text-base"
        >
          {NETWORK.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              {item}
              {i < NETWORK.length - 1 && (
                <span aria-hidden style={{ color: "var(--line)" }}>
                  /
                </span>
              )}
            </span>
          ))}
        </div>

        <p data-line className="mx-auto mt-14 max-w-xl text-xl font-medium leading-snug text-white sm:text-2xl">
          Risk rarely enters through obvious channels. It enters through
          people, access, and information gaps.
        </p>
      </div>
    </section>
  );
}
