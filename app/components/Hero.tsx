"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/lib/useReducedMotion";
import { HeroField } from "./HeroField";
import { Grain } from "./Grain";

export function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { gsap } = useGsap();

  useEffect(() => {
    const root = textRef.current;
    if (!root) return;
    const lines = root.querySelectorAll<HTMLElement>("[data-wipe]");
    const rest = root.querySelectorAll<HTMLElement>("[data-fade]");
    const bg = bgRef.current;
    let safetyTimer: number | undefined;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(lines, { clipPath: "inset(0 0% 0 0)" });
        gsap.set(rest, { opacity: 1, y: 0, filter: "blur(0px)" });
        gsap.set(bg, { scale: 1 });
        return;
      }
      gsap.set(lines, { clipPath: "inset(0 101% 0 0)" });
      gsap.set(rest, { opacity: 0, y: 10, filter: "blur(6px)" });

      const tl = gsap
        .timeline({ delay: 0.5 })
        .to(lines, {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.inOut",
        })
        .to(
          rest,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.08, ease: "power2.out" },
          "-=0.3",
        );

      // Safety net: some mobile browsers can interrupt or silently drop a
      // rAF-driven entrance tween on first paint. If the reveal hasn't
      // finished a few seconds after it should have, force the statement
      // fully visible rather than leaving it clipped or transparent.
      safetyTimer = window.setTimeout(() => {
        if (tl.progress() < 1) {
          gsap.set(lines, { clipPath: "inset(0 0% 0 0)" });
          gsap.set(rest, { opacity: 1, y: 0, filter: "blur(0px)" });
        }
      }, 3000);

      // Very slow, near-imperceptible drift on the satellite image - reads as
      // a live feed holding its position, not a "Ken Burns" slideshow effect.
      gsap.set(bg, { scale: 1.06 });
      gsap.to(bg, { scale: 1.12, duration: 28, ease: "sine.inOut", repeat: -1, yoyo: true });
    }, root);

    return () => {
      ctx.revert();
      if (safetyTimer) window.clearTimeout(safetyTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {/* Satellite imagery as quiet atmosphere, not the subject - a real,
            unmanipulated NASA night-lights plate standing in for "command
            and control" without leaning on a staged security photo. */}
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: "url(/imagery/night-network-europe-mideast.jpg)", backgroundPosition: "50% 45%" }}
          role="img"
          aria-label="Satellite view of city lights across Europe and the Eastern Mediterranean at night - NASA Black Marble imagery, public domain."
        />
        <div className="pointer-events-none absolute inset-0" style={{ background: "rgba(9,9,9,0.72)" }} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(160deg, rgba(127,168,196,0.1) 0%, transparent 45%)" }}
        />
        <div className="opacity-80 mix-blend-screen sm:opacity-90">
          <HeroField />
        </div>
        <Grain />
        {/* Centered headline needs a protected zone regardless of where the
            diagram's nodes or the photo's brighter city-light clusters land -
            dark at the center, clearing toward the edges so the plate reads
            as atmosphere framing the text, not competing with it. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(9,9,9,0.95) 0%, rgba(9,9,9,0.75) 55%, rgba(9,9,9,0.45) 100%)",
          }}
        />
      </div>

      <div
        ref={textRef}
        className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col items-center px-6 py-28 text-center sm:px-10"
      >
        <h1
          className="mx-auto max-w-4xl font-display font-medium leading-[1.15] tracking-[-0.02em] text-white"
          style={{ fontSize: "clamp(1.55rem, 6.6vw, 5.25rem)" }}
        >
          <span data-wipe className="block whitespace-nowrap">
            Security is not a service.
          </span>
          <span data-wipe className="block whitespace-nowrap">
            It is an infrastructure.
          </span>
        </h1>
        <p data-fade className="mx-auto mt-8 max-w-xl text-balance text-lg leading-relaxed" style={{ color: "var(--white-soft)" }}>
          Project 32 Ltd is licensed and supervised by the Israeli Ministry
          of Defense. P32 designs and operates a unified, intelligence-led
          security architecture across people, residences, travel, digital
          exposure, corporate structures, assets, infrastructure, and global
          operations.
        </p>
        <div data-fade className="mt-10 flex flex-wrap items-center justify-center gap-6">
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
