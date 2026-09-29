"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/lib/useReducedMotion";
import { Grain } from "./Grain";

/**
 * Full-bleed evidentiary imagery moment — no licensed photography exists yet
 * (see PRODUCT.md: Evidence on Hand), so this is a sophisticated monochrome
 * plate in the blueprint world's own idiom (a reconnaissance/targeting
 * frame) rather than a faked photograph. Swap the silhouette + labels for
 * real aerial photography of the Miami / New York operating bases when
 * available — the frame and lock-on motion can stay.
 */
export function GlobalReach() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { gsap, ScrollTrigger } = useGsap();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const brackets = root.querySelectorAll<HTMLElement>("[data-bracket]");
    const reticle = root.querySelector<HTMLElement>("[data-reticle]");
    const skyline = root.querySelector<SVGPathElement>("[data-skyline]");
    const labels = root.querySelectorAll<HTMLElement>("[data-label]");

    if (reducedMotion) {
      gsap.set([brackets, reticle, labels], { clearProps: "all" });
      return;
    }

    gsap.set(brackets, { opacity: 0, scale: 1.4 });
    gsap.set(reticle, { opacity: 0, scale: 1.8 });
    gsap.set(labels, { opacity: 0, y: 8 });
    if (skyline) {
      const length = skyline.getTotalLength();
      skyline.style.strokeDasharray = `${length}`;
      skyline.style.strokeDashoffset = `${length}`;
    }

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 65%", once: true },
    });
    tl.to(brackets, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: "power2.out" })
      .to(skyline, { strokeDashoffset: 0, duration: 1.1, ease: "power1.inOut" }, "-=0.2")
      .to(reticle, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.4)" }, "-=0.6")
      .to(labels, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.3");

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === root) st.kill();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <section id="reach" ref={rootRef} className="relative h-[70svh] min-h-[480px] w-full overflow-hidden bg-ink">
      <Grain />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <svg viewBox="0 0 1600 700" className="h-full w-full" preserveAspectRatio="xMidYMax slice" aria-hidden>
        <defs>
          <linearGradient id="reach-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--ink)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--ink)" stopOpacity="0.9" />
          </linearGradient>
          {/* Dusk afterglow behind the skyline — the atmospheric device a flat
              line diagram can't carry; this is what makes the plate read as
              a low-key photographic moment rather than another schematic. */}
          <radialGradient id="reach-horizon" cx="50%" cy="100%" r="85%">
            <stop offset="0%" stopColor="rgba(230,236,240,0.16)" />
            <stop offset="45%" stopColor="rgba(230,236,240,0.05)" />
            <stop offset="100%" stopColor="rgba(230,236,240,0)" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width="1600" height="700" fill="url(#reach-horizon)" />

        <g opacity="0.14" stroke="var(--line)" strokeWidth="1">
          {Array.from({ length: 17 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 100} y1={0} x2={i * 100} y2={700} />
          ))}
        </g>

        {/* Skyline, three depth bands — atmospheric perspective standing in
            for real aerial photography of the Miami / New York bases */}
        <path
          d="M0 640 L0 560 L70 560 L70 600 L150 600 L150 540 L220 540 L220 590 L300 590 L300 520 L380 520 L380 570 L460 570 L460 500 L540 500 L540 560 L620 560 L620 480 L700 480 L700 550 L780 550 L780 460 L860 460 L860 540 L940 540 L940 470 L1020 470 L1020 560 L1100 560 L1100 490 L1180 490 L1180 570 L1260 570 L1260 500 L1340 500 L1340 580 L1420 580 L1420 510 L1500 510 L1500 590 L1600 590 L1600 640 Z"
          fill="var(--ink-3)"
          opacity="0.7"
        />
        <path
          d="M0 660 L40 660 L40 580 L110 580 L110 630 L180 630 L180 540 L230 540 L230 500 L280 500 L280 600 L340 600 L340 460 L390 460 L390 420 L440 420 L440 560 L510 560 L510 500 L580 500 L580 620 L650 620 L650 440 L700 440 L700 380 L760 380 L760 540 L830 540 L830 460 L890 460 L890 600 L950 600 L950 500 L1010 500 L1010 420 L1070 420 L1070 580 L1140 580 L1140 460 L1200 460 L1200 380 L1250 380 L1250 540 L1320 540 L1320 620 L1390 620 L1390 480 L1450 480 L1450 400 L1510 400 L1510 600 L1600 600 L1600 660 Z"
          data-skyline
          fill="var(--ink)"
          stroke="var(--line)"
          strokeWidth="1.5"
        />

        {/* Sparse lit windows — the one warm human detail in an otherwise cold plate */}
        <g fill="var(--line)" opacity="0.85">
          {[
            [55, 610], [55, 630], [125, 600], [195, 570], [195, 590],
            [255, 530], [365, 500], [365, 520], [365, 540], [465, 590],
            [535, 550], [535, 570], [625, 620], [725, 460], [725, 480],
            [725, 500], [845, 570], [915, 500], [915, 520], [1035, 460],
            [1035, 480], [1105, 610], [1155, 420], [1155, 440], [1155, 460],
            [1275, 570], [1345, 660], [1415, 520], [1415, 540], [1475, 440],
            [1475, 460], [1535, 630],
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="4" height="6" />
          ))}
        </g>

        <rect x="0" y="0" width="1600" height="700" fill="url(#reach-fade)" />
      </svg>

      {/* Targeting frame */}
      <div className="pointer-events-none absolute inset-6 sm:inset-10">
        <Bracket corner="top-left" />
        <Bracket corner="top-right" />
        <Bracket corner="bottom-left" />
        <Bracket corner="bottom-right" />
      </div>

      <div
        data-reticle
        className="pointer-events-none absolute left-1/2 top-[38%] h-16 w-16 -translate-x-1/2 -translate-y-1/2 sm:h-20 sm:w-20"
      >
        <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden>
          <circle cx="40" cy="40" r="26" fill="none" stroke="var(--line-bright)" strokeWidth="1.5" />
          <circle cx="40" cy="40" r="3" fill="var(--line-bright)" />
          <line x1="40" y1="0" x2="40" y2="14" stroke="var(--line-bright)" strokeWidth="1.5" />
          <line x1="40" y1="66" x2="40" y2="80" stroke="var(--line-bright)" strokeWidth="1.5" />
          <line x1="0" y1="40" x2="14" y2="40" stroke="var(--line-bright)" strokeWidth="1.5" />
          <line x1="66" y1="40" x2="80" y2="40" stroke="var(--line-bright)" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="absolute inset-x-6 bottom-10 flex flex-col gap-1 pl-2 sm:inset-x-10 sm:bottom-10 sm:pl-0">
        <p data-label className="font-mono text-xs tracking-[0.14em] sm:text-sm" style={{ color: "var(--line-bright)" }}>
          OPERATIONAL FOOTPRINT
        </p>
        <p data-label className="font-display text-2xl font-medium text-white sm:text-3xl">
          Miami · New York
        </p>
        <p data-label className="max-w-md text-sm leading-relaxed sm:text-base" style={{ color: "var(--white-soft)" }}>
          National U.S. reach, direct on-the-ground execution in critical
          markets.
        </p>
      </div>
    </section>
  );
}

function Bracket({ corner }: { corner: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const pos: Record<string, string> = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 -scale-x-100",
    "bottom-left": "bottom-0 left-0 -scale-y-100",
    "bottom-right": "bottom-0 right-0 -scale-x-100 -scale-y-100",
  };
  return (
    <svg
      data-bracket
      viewBox="0 0 32 32"
      className={`absolute h-6 w-6 sm:h-8 sm:w-8 ${pos[corner]}`}
      aria-hidden
    >
      <path d="M0 12 L0 0 L12 0" fill="none" stroke="var(--line-bright)" strokeWidth="2" />
    </svg>
  );
}
