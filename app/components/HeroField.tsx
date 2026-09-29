"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/lib/useReducedMotion";

type Node = { id: string; label: string; ref: string; x: number; y: number; sx: number; sy: number; rot: number };

// Final positions form the fragmented layout; sx/sy/rot are the scattered
// entrance offsets each node settles FROM — fragments organizing into
// one architecture, not just lines drawing on top of static dots.
const NODES: Node[] = [
  { id: "jurisdictions", label: "JURISDICTIONS", ref: "A1", x: 220, y: 190, sx: -120, sy: -70, rot: -18 },
  { id: "corporate", label: "CORPORATE STRUCTURES", ref: "A2", x: 560, y: 110, sx: 90, sy: -110, rot: 22 },
  { id: "estate", label: "REAL ESTATE", ref: "A3", x: 790, y: 175, sx: -80, sy: 100, rot: -14 },
  { id: "digital", label: "DIGITAL EXPOSURE", ref: "A4", x: 950, y: 220, sx: 130, sy: 60, rot: 26 },
  { id: "social", label: "SOCIAL MEDIA", ref: "A5", x: 880, y: 130, sx: 60, sy: -100, rot: 15 },
  { id: "family", label: "FAMILY", ref: "B1", x: 250, y: 560, sx: -100, sy: 90, rot: 16 },
  { id: "home", label: "HOME", ref: "B2", x: 420, y: 660, sx: -60, sy: 100, rot: -12 },
  { id: "advisors", label: "ADVISORS", ref: "B3", x: 560, y: 640, sx: 70, sy: 110, rot: -20 },
  { id: "office", label: "OFFICE", ref: "B4", x: 750, y: 670, sx: 90, sy: 90, rot: 14 },
  { id: "vendors", label: "VENDORS", ref: "B5", x: 850, y: 590, sx: -90, sy: -80, rot: 18 },
  { id: "public", label: "PUBLIC VISIBILITY", ref: "B6", x: 1140, y: 490, sx: 110, sy: -60, rot: -24 },
];

const EDGES: [string, string][] = [
  ["jurisdictions", "corporate"],
  ["corporate", "estate"],
  ["digital", "social"],
  ["digital", "public"],
  ["family", "home"],
  ["family", "advisors"],
  ["advisors", "office"],
  ["advisors", "vendors"],
];

const VIEWBOX_W = 1360;
const VIEWBOX_H = 760;

export function HeroField() {
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<SVGSVGElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);
  const coordRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();
  const { gsap, ScrollTrigger } = useGsap();

  useEffect(() => {
    const root = rootRef.current;
    const svg = diagramRef.current;
    if (!root || !svg) return;

    const nodeEls = svg.querySelectorAll<SVGGElement>("[data-node]");
    const edgeEls = svg.querySelectorAll<SVGLineElement>("[data-edge]");
    const scanline = svg.querySelector<SVGLineElement>("[data-scanline]");
    const pulses = svg.querySelectorAll<SVGCircleElement>("[data-pulse]");

    let cleanupPointer: (() => void) | null = null;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(nodeEls, { x: 0, y: 0, rotate: 0, opacity: 1 });
        gsap.set(edgeEls, { strokeDashoffset: 0 });
        gsap.set(scanline, { opacity: 0 });
        gsap.set(pulses, { opacity: 0 });
        return;
      }

      edgeEls.forEach((line) => {
        const len = line.getTotalLength();
        line.style.strokeDasharray = `${len}`;
        line.style.strokeDashoffset = `${len}`;
      });
      gsap.set(nodeEls, {
        x: (i: number) => NODES[i].sx,
        y: (i: number) => NODES[i].sy,
        rotate: (i: number) => NODES[i].rot,
        opacity: 0,
      });

      // ENTRANCE: fragments settle into the architecture, then it's confirmed by a scan pass.
      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(gridRef.current, { opacity: 1, duration: 0.8, ease: "power1.out" })
        .to(
          nodeEls,
          {
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 1,
            duration: 1.1,
            stagger: { each: 0.07, from: "random" },
            ease: "power3.out",
          },
          0.2,
        )
        .set(scanline, { opacity: 1, attr: { y1: 0, y2: 0 } }, "-=0.3")
        .to(scanline, { attr: { y1: VIEWBOX_H, y2: VIEWBOX_H }, duration: 1.3, ease: "power2.inOut" }, "-=0.2")
        .to(edgeEls, { strokeDashoffset: 0, duration: 0.9, stagger: 0.05, ease: "power2.out" }, "-=1.0")
        .to(scanline, { opacity: 0, duration: 0.4 }, "-=0.3")
        .call(() => startAmbient());

      // IDLE: signal pulses hop along two edges on loop — the one continuous
      // system that keeps the hero alive without the user touching anything.
      function startAmbient() {
        edgeEls.forEach((line, i) => {
          if (i % 2 !== 0) return;
          const pulse = pulses[Math.floor(i / 2)];
          if (!pulse) return;
          const x1 = parseFloat(line.getAttribute("x1")!);
          const y1 = parseFloat(line.getAttribute("y1")!);
          const x2 = parseFloat(line.getAttribute("x2")!);
          const y2 = parseFloat(line.getAttribute("y2")!);
          const state = { t: 0 };
          gsap.to(state, {
            t: 1,
            duration: 2.2,
            repeat: -1,
            repeatDelay: 1.4 + i * 0.3,
            delay: i * 0.5,
            ease: "power1.inOut",
            onUpdate: () => {
              pulse.setAttribute("cx", String(x1 + (x2 - x1) * state.t));
              pulse.setAttribute("cy", String(y1 + (y2 - y1) * state.t));
              pulse.setAttribute("opacity", String(Math.sin(state.t * Math.PI)));
            },
          });
        });
      }

      // POINTER PARALLAX: depth layers drift at different rates; a reticle tracks
      // the cursor directly — the one moment on the page that answers touch.
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (fine) {
        const setGridX = gsap.quickTo(gridRef.current, "x", { duration: 0.9, ease: "power3.out" });
        const setGridY = gsap.quickTo(gridRef.current, "y", { duration: 0.9, ease: "power3.out" });
        const setDiagramX = gsap.quickTo(svg, "x", { duration: 0.7, ease: "power3.out" });
        const setDiagramY = gsap.quickTo(svg, "y", { duration: 0.7, ease: "power3.out" });
        const setReticleX = gsap.quickTo(reticleRef.current, "x", { duration: 0.35, ease: "power3.out" });
        const setReticleY = gsap.quickTo(reticleRef.current, "y", { duration: 0.35, ease: "power3.out" });

        const onMove = (e: PointerEvent) => {
          const rect = root.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          setGridX(px * 10);
          setGridY(py * 8);
          setDiagramX(px * 24);
          setDiagramY(py * 18);
          setReticleX(e.clientX - rect.left);
          setReticleY(e.clientY - rect.top);
          if (coordRef.current) {
            coordRef.current.textContent = `X ${(e.clientX - rect.left).toFixed(0).padStart(4, "0")}  Y ${(e.clientY - rect.top).toFixed(0).padStart(4, "0")}`;
          }
          gsap.to(reticleRef.current, { opacity: 1, duration: 0.2 });
        };
        const onLeave = () => gsap.to(reticleRef.current, { opacity: 0, duration: 0.3 });

        root.addEventListener("pointermove", onMove);
        root.addEventListener("pointerleave", onLeave);
        cleanupPointer = () => {
          root.removeEventListener("pointermove", onMove);
          root.removeEventListener("pointerleave", onLeave);
        };
      }

      // SCROLL EXIT: the layers separate at different speeds as the hero leaves —
      // the "strong transition" into Fragmentation rather than a flat cut.
      gsap.to(gridRef.current, {
        yPercent: 12,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.4 },
      });
      gsap.to(svg, {
        yPercent: 22,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.4 },
      });
    }, root);

    return () => {
      cleanupPointer?.();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden">
      {/* Layer 0 — far grid, slowest parallax */}
      <div ref={gridRef} className="absolute inset-0" style={{ opacity: reducedMotion ? 0.16 : 0 }}>
        <svg viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`} className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <g opacity="0.16" stroke="var(--line)" strokeWidth="1">
            {Array.from({ length: Math.ceil(VIEWBOX_W / 80) + 1 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 80} y1={0} x2={i * 80} y2={VIEWBOX_H} />
            ))}
            {Array.from({ length: Math.ceil(VIEWBOX_H / 80) + 1 }).map((_, i) => (
              <line key={`h${i}`} x1={0} y1={i * 80} x2={VIEWBOX_W} y2={i * 80} />
            ))}
          </g>
        </svg>
      </div>

      {/* Layer 1 — the network itself, mid parallax */}
      <svg
        ref={diagramRef}
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Diagram of a principal's disconnected risk surface - jurisdictions, corporate structures, real estate, digital exposure, social media, family, home, advisors, office, vendors, and public visibility - settling into a mapped, monitored network."
      >
        <defs>
          <radialGradient id="hero-node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--line-bright)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--line-bright)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g strokeWidth="1.5" fill="none">
          {EDGES.map(([a, b], i) => {
            const from = NODES.find((n) => n.id === a)!;
            const to = NODES.find((n) => n.id === b)!;
            return (
              <line
                key={i}
                data-edge
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="var(--line)"
                opacity="0.8"
              />
            );
          })}
        </g>

        {Array.from({ length: 4 }).map((_, i) => (
          <circle key={i} data-pulse r="4" fill="var(--line-bright)" opacity="0" />
        ))}

        {NODES.map((node) => (
          // Outer <g> holds the static JSX position; GSAP animates x/y/rotate/opacity
          // on the INNER <g> only — animating the same element that also carries a
          // static transform attribute causes GSAP to clobber the base position.
          <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
            <g data-node>
              <circle r="6" fill="var(--ink)" stroke="var(--line-bright)" strokeWidth="1.5" />
              <line x1={-11} y1={0} x2={-4} y2={0} stroke="var(--line-bright)" strokeWidth="1" />
              <line x1={4} y1={0} x2={11} y2={0} stroke="var(--line-bright)" strokeWidth="1" />
              <line x1={0} y1={-11} x2={0} y2={-4} stroke="var(--line-bright)" strokeWidth="1" />
              <line x1={0} y1={4} x2={0} y2={11} stroke="var(--line-bright)" strokeWidth="1" />
              <text x={0} y={-18} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="0.04em" fill="var(--white)" fontWeight={500}>
                {node.label}
              </text>
              <text x={0} y={26} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.08em" fill="var(--line)">
                REF·{node.ref}
              </text>
            </g>
          </g>
        ))}

        <line data-scanline x1={0} y1={0} x2={VIEWBOX_W} y2={0} stroke="var(--line-bright)" strokeWidth="2" opacity="0" />
      </svg>

      {/* Layer 2 — foreground reticle, tracks the cursor directly */}
      <div
        ref={reticleRef}
        className="pointer-events-none absolute left-0 top-0 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 opacity-0 sm:block"
      >
        <svg viewBox="0 0 56 56" className="h-full w-full" aria-hidden>
          <circle cx="28" cy="28" r="18" fill="none" stroke="var(--line-bright)" strokeWidth="1" />
          <line x1="28" y1="0" x2="28" y2="8" stroke="var(--line-bright)" strokeWidth="1" />
          <line x1="28" y1="48" x2="28" y2="56" stroke="var(--line-bright)" strokeWidth="1" />
          <line x1="0" y1="28" x2="8" y2="28" stroke="var(--line-bright)" strokeWidth="1" />
          <line x1="48" y1="28" x2="56" y2="28" stroke="var(--line-bright)" strokeWidth="1" />
        </svg>
        <p
          ref={coordRef}
          className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap font-mono text-[0.6rem] tracking-[0.08em]"
          style={{ color: "var(--line-bright)" }}
        >
          X 0000  Y 0000
        </p>
      </div>
    </div>
  );
}
