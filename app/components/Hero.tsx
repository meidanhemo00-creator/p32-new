"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/lib/useReducedMotion";
import { HeroField } from "./HeroField";
import { Grain } from "./Grain";

export function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { gsap } = useGsap();

  useEffect(() => {
    const root = textRef.current;
    if (!root) return;
    const lines = root.querySelectorAll<HTMLElement>("[data-wipe]");
    const rest = root.querySelectorAll<HTMLElement>("[data-fade]");

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(lines, { clipPath: "inset(0 0% 0 0)" });
        gsap.set(rest, { opacity: 1, y: 0 });
        return;
      }
      gsap.set(lines, { clipPath: "inset(0 101% 0 0)" });
      gsap.set(rest, { opacity: 0, y: 10 });

      gsap
        .timeline({ delay: 0.5 })
        .to(lines, {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.inOut",
        })
        .to(rest, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }, "-=0.3");
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <HeroField />
        <Grain />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(9,9,9,0.3) 0%, rgba(9,9,9,0.5) 55%, rgba(9,9,9,0.96) 100%)",
          }}
        />
      </div>

      <div ref={textRef} className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-16 pt-40 sm:px-10 sm:pb-24">
        <h1 className="max-w-4xl font-display text-[2.5rem] font-medium leading-[1.05] tracking-[-0.02em] text-white sm:text-[3.5rem] lg:text-[4.5rem]">
          <span data-wipe className="block">
            Security is not a service.
          </span>
          <span data-wipe className="block">
            It is an infrastructure.
          </span>
        </h1>
        <p data-fade className="mt-8 max-w-xl text-balance text-lg leading-relaxed" style={{ color: "var(--white-soft)" }}>
          Project 32 Ltd is licensed and supervised by the Israeli Ministry
          of Defense. P32 designs and operates a unified, intelligence-led
          security architecture across people, residences, travel, digital
          exposure, corporate structures, assets, infrastructure, and global
          operations.
        </p>
        <div data-fade className="mt-10 flex flex-wrap items-center gap-6">
          <a
            href="#inquiry"
            className="border border-white/80 px-7 py-3.5 font-mono text-xs tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-ink"
          >
            BEGIN A CONFIDENTIAL ENGAGEMENT
          </a>
          <a
            href="#architecture"
            className="font-mono text-xs tracking-[0.12em] underline decoration-line/50 underline-offset-4 transition-colors hover:text-white"
            style={{ color: "var(--white-soft)" }}
          >
            SEE THE ARCHITECTURE ↓
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 right-6 hidden text-right font-mono text-[0.65rem] leading-relaxed tracking-[0.08em] sm:right-10 sm:block" style={{ color: "var(--line)" }}>
        <p>DWG NO. P32-ARCH-001 · SCALE NTS</p>
        <p>REV A</p>
      </div>
    </section>
  );
}
