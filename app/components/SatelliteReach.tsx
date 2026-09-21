"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/lib/useReducedMotion";
import { Grain } from "./Grain";

// Great-circle-ish waypoints across the image (percent of frame), reading
// left to right: New York, Miami, then across the Atlantic to Israel —
// the operational-reach line named in Credibility, made visible.
const WAYPOINTS = [
  { x: 24, y: 46, label: "NEW YORK" },
  { x: 22, y: 62, label: "MIAMI" },
  { x: 78, y: 58, label: "TEL AVIV" },
];

export function SatelliteReach() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { gsap, ScrollTrigger } = useGsap();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const img = root.querySelector<HTMLElement>("[data-img]");
    const points = root.querySelectorAll<HTMLElement>("[data-point]");
    const paths = root.querySelectorAll<SVGPathElement>("[data-path]");
    const labels = root.querySelectorAll<HTMLElement>("[data-label]");

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([points, labels], { opacity: 1, scale: 1 });
        gsap.set(paths, { strokeDashoffset: 0 });
        return;
      }

      gsap.set(img, { scale: 1.08 });
      gsap.set(points, { opacity: 0, scale: 0 });
      gsap.set(labels, { opacity: 0, y: 6 });
      paths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });
      tl.to(img, { scale: 1, duration: 1.6, ease: "power2.out" })
        .to(paths, { strokeDashoffset: 0, duration: 1, stagger: 0.25, ease: "power2.inOut" }, "-=1.2")
        .to(points, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.25, ease: "back.out(2)" }, "-=1.1")
        .to(labels, { opacity: 1, y: 0, duration: 0.4, stagger: 0.25, ease: "power2.out" }, "-=1.0");

      // Slow continuous drift — the frame stays alive without being a gimmick.
      gsap.to(img, {
        yPercent: -3,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <section ref={rootRef} className="relative h-[85svh] min-h-[560px] w-full overflow-hidden bg-ink">
      <div
        data-img
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/imagery/earth-atlantic-corridor.jpg)" }}
        role="img"
        aria-label="Satellite view of the North Atlantic corridor spanning the United States East Coast to the Eastern Mediterranean - NASA Blue Marble imagery, public domain."
      />
      <Grain />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,9,9,0.55) 0%, rgba(9,9,9,0.15) 30%, rgba(9,9,9,0.25) 70%, rgba(9,9,9,0.85) 100%)",
        }}
      />

      {/* Tracking paths between operational points */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <path
          data-path
          d={`M${WAYPOINTS[0].x} ${WAYPOINTS[0].y} L${WAYPOINTS[1].x} ${WAYPOINTS[1].y}`}
          vectorEffect="non-scaling-stroke"
          fill="none"
          stroke="var(--line-bright)"
          strokeWidth="1"
          strokeDasharray="0.6 0.8"
        />
        <path
          data-path
          d={`M${WAYPOINTS[1].x} ${WAYPOINTS[1].y} L${WAYPOINTS[2].x} ${WAYPOINTS[2].y}`}
          vectorEffect="non-scaling-stroke"
          fill="none"
          stroke="var(--line-bright)"
          strokeWidth="1"
          strokeDasharray="0.6 0.8"
        />
      </svg>

      {WAYPOINTS.map((wp) => (
        <div
          key={wp.label}
          data-point
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${wp.x}%`, top: `${wp.y}%` }}
        >
          <span className="block h-2 w-2 rounded-full" style={{ background: "var(--line-bright)" }} />
          <span
            data-label
            className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap font-mono text-[0.65rem] tracking-[0.1em]"
            style={{ color: "var(--line-bright)" }}
          >
            {wp.label}
          </span>
        </div>
      ))}

      <div className="absolute inset-x-6 bottom-10 sm:inset-x-10">
        <p className="font-mono text-xs tracking-[0.14em]" style={{ color: "var(--line-bright)" }}>
          OPERATIONAL REACH
        </p>
        <h2 className="font-display mt-2 max-w-xl text-2xl font-medium leading-snug text-white sm:text-3xl">
          Israel, the United States, and Europe - one architecture, not three
          offices.
        </h2>
      </div>
    </section>
  );
}
