"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/lib/useReducedMotion";
import { Grain } from "./Grain";

const LAYERS = [
  { ref: "A1", label: "Multiple jurisdictions" },
  { ref: "A2", label: "Corporate structures and investments" },
  { ref: "A3", label: "Real estate portfolios" },
  { ref: "A4", label: "Public visibility and private exposure" },
  { ref: "B1", label: "Family members, advisors, employees, and third parties" },
];

export function Fragmentation() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { gsap, ScrollTrigger } = useGsap();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const rows = root.querySelectorAll<HTMLElement>("[data-row]");
    const bars = root.querySelectorAll<HTMLElement>("[data-bar]");

    if (reducedMotion) {
      gsap.set([rows, bars], { clearProps: "all" });
      return;
    }

    gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });
    // Panels start flush (stacked at the same x) and fan out into their
    // offset positions — the entrance literally performs "each layer
    // expands your footprint" rather than just fading in.
    gsap.set(rows, { opacity: 0, x: (i: number) => -(i * 22) });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 70%", once: true },
    });
    tl.to(rows, { opacity: 1, x: 0, duration: 0.65, stagger: 0.14, ease: "power3.out" }).to(
      bars,
      { scaleX: 1, duration: 0.7, stagger: 0.12, ease: "power3.out" },
      "-=0.5",
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === root) st.kill();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <section id="architecture" className="relative bg-ink px-6 py-28 sm:px-10 sm:py-36">
      <Grain />
      <div ref={rootRef} className="relative mx-auto max-w-[1100px]">
        <h2 className="font-display max-w-3xl text-[1.85rem] font-medium leading-[1.15] tracking-[-0.01em] text-white sm:text-[2.75rem]">
          A Different Category
          <br className="sm:hidden" /> of Risk
        </h2>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white">
          At a certain level, security is no longer about protection. It is
          about control.
        </p>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--white-soft)" }}>
          You are not managing a single environment - you are operating
          across:
        </p>

        <div className="mt-12">
          {LAYERS.map((layer, i) => (
            <div
              key={layer.ref}
              data-row
              className="relative grid grid-cols-[3rem_1fr] items-baseline gap-3 border px-4 py-3 sm:grid-cols-[4rem_1fr] sm:px-5 sm:py-4"
              style={{
                marginTop: i === 0 ? 0 : "-15px",
                marginLeft: `${i * 22}px`,
                marginRight: `${(LAYERS.length - 1 - i) * 22}px`,
                background: "var(--ink)",
                borderColor: "var(--hairline-dark)",
                zIndex: i + 1,
              }}
            >
              <span className="font-mono text-xs text-line sm:text-sm">{layer.ref}</span>
              <div>
                <span className="text-lg text-white sm:text-xl">{layer.label}</span>
                <div
                  data-bar
                  className="mt-2 h-px w-full"
                  style={{ background: "var(--line)" }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-2 font-mono text-xs tracking-[0.08em] text-line sm:text-sm">
          <p>EACH LAYER EXPANDS YOUR FOOTPRINT.</p>
          <p>EACH LAYER INTRODUCES RISK.</p>
        </div>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white sm:text-xl">
          Most critically - these layers are rarely unified under a single
          security architecture.
        </p>
      </div>
    </section>
  );
}
