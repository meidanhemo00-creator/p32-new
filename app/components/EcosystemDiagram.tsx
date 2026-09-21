"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/lib/useReducedMotion";

type Node = {
  id: string;
  label: string;
  ref?: string;
  x: number;
  y: number;
};

type Edge = {
  from: string;
  to: string;
  style: "solid" | "dashed";
};

const NODES: Node[] = [
  { id: "jurisdictions", label: "JURISDICTIONS", ref: "A1", x: 300, y: 220 },
  { id: "corporate", label: "CORPORATE STRUCTURES", ref: "A2", x: 620, y: 140 },
  { id: "digital", label: "DIGITAL EXPOSURE", ref: "A3", x: 940, y: 280 },
  { id: "family", label: "FAMILY", ref: "B1", x: 300, y: 660 },
  { id: "advisors", label: "ADVISORS", ref: "B2", x: 560, y: 740 },
  { id: "vendors", label: "VENDORS", ref: "B3", x: 820, y: 700 },
  { id: "public", label: "PUBLIC VISIBILITY", ref: "B4", x: 1000, y: 560 },
];

const HUB: Node = { id: "p32", label: "P32", x: 600, y: 450 };

const FRAGMENTED_EDGES: Edge[] = [
  { from: "jurisdictions", to: "corporate", style: "solid" },
  { from: "corporate", to: "digital", style: "dashed" },
  { from: "digital", to: "public", style: "dashed" },
  { from: "family", to: "advisors", style: "solid" },
  { from: "advisors", to: "vendors", style: "dashed" },
];

const VIEWBOX = "0 0 1200 900";

function buildUnifiedEdges(): Edge[] {
  return NODES.map((n) => ({ from: n.id, to: HUB.id, style: "solid" as const }));
}

export function EcosystemDiagram({
  variant,
  trigger = "scroll",
  fit = "meet",
  className,
}: {
  variant: "fragmented" | "unified";
  trigger?: "mount" | "scroll";
  /** "meet" (default) contains the whole diagram, letterboxing on extreme aspects.
   *  "slice" fills the frame edge-to-edge, cropping — use for full-bleed backdrops
   *  (e.g. a portrait mobile hero) where empty letterbox bars would read as a bug. */
  fit?: "meet" | "slice";
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const reducedMotion = useReducedMotion();
  const { gsap, ScrollTrigger } = useGsap();

  const edges = variant === "fragmented" ? FRAGMENTED_EDGES : buildUnifiedEdges();
  const nodes = variant === "unified" ? [...NODES, HUB] : NODES;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const lines = svg.querySelectorAll<SVGLineElement>("[data-edge]");
    const dots = svg.querySelectorAll<SVGGElement>("[data-node]");
    const scanline = svg.querySelector<SVGLineElement>("[data-scanline]");

    if (reducedMotion) {
      lines.forEach((l) => l.style.setProperty("stroke-dashoffset", "0"));
      dots.forEach((d) => d.style.setProperty("opacity", "1"));
      scanline?.style.setProperty("opacity", "0");
      return;
    }

    lines.forEach((line) => {
      const length = line.getTotalLength();
      line.style.strokeDasharray = `${length}`;
      line.style.strokeDashoffset = `${length}`;
    });
    dots.forEach((d) => d.style.setProperty("opacity", "0"));

    const tl = gsap.timeline({ paused: true });

    tl.set(scanline, { opacity: 1, attr: { y1: 0, y2: 0 } })
      .to(scanline, { attr: { y1: 900, y2: 900 }, duration: 1.6, ease: "power2.inOut" }, 0)
      .to(
        dots,
        { opacity: 1, duration: 0.4, stagger: { each: 0.08, from: "start" }, ease: "power1.out" },
        0.1,
      )
      .to(
        lines,
        { strokeDashoffset: 0, duration: 0.9, stagger: 0.06, ease: "power2.out" },
        0.3,
      )
      .to(scanline, { opacity: 0, duration: 0.4, ease: "power1.out" }, "-=0.3");

    if (trigger === "mount") {
      tl.play();
    } else {
      ScrollTrigger.create({
        trigger: svg,
        start: "top 75%",
        once: true,
        onEnter: () => tl.play(),
      });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === svg) st.kill();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, variant]);

  return (
    <svg
      ref={svgRef}
      viewBox={VIEWBOX}
      className={className}
      role="img"
      aria-label={
        variant === "fragmented"
          ? "Diagram of a principal's disconnected risk surface: jurisdictions, corporate structures, digital exposure, family, advisors, vendors, and public visibility, loosely and inconsistently linked."
          : "Diagram of the same risk surface unified under a single P32 security architecture, with every layer connected through one center."
      }
      preserveAspectRatio={`xMidYMid ${fit}`}
    >
      <defs>
        <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--line-bright)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--line-bright)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Base grid — the blueprint field */}
      <g opacity="0.16" stroke="var(--line)" strokeWidth="1">
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 100} y1={0} x2={i * 100} y2={900} />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 100} x2={1200} y2={i * 100} />
        ))}
      </g>

      {/* Edges */}
      <g strokeWidth="1.5" fill="none">
        {edges.map((edge, i) => {
          const from = nodes.find((n) => n.id === edge.from);
          const to = nodes.find((n) => n.id === edge.to);
          if (!from || !to) return null;
          return (
            <line
              key={i}
              data-edge
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="var(--line)"
              strokeDasharray={edge.style === "dashed" ? "4 6" : undefined}
              opacity={edge.style === "dashed" ? 0.55 : 0.85}
            />
          );
        })}
      </g>

      {/* Nodes */}
      {nodes.map((node) => {
        const isHub = node.id === "p32";
        return (
          <g key={node.id} data-node transform={`translate(${node.x}, ${node.y})`}>
            {isHub && <circle r="34" fill="url(#node-glow)" />}
            <circle
              r={isHub ? 10 : 6}
              fill={isHub ? "var(--line-bright)" : "var(--ink)"}
              stroke="var(--line-bright)"
              strokeWidth={isHub ? 0 : 1.5}
            />
            {!isHub && (
              <>
                <line x1={-11} y1={0} x2={-4} y2={0} stroke="var(--line-bright)" strokeWidth="1" />
                <line x1={4} y1={0} x2={11} y2={0} stroke="var(--line-bright)" strokeWidth="1" />
                <line x1={0} y1={-11} x2={0} y2={-4} stroke="var(--line-bright)" strokeWidth="1" />
                <line x1={0} y1={4} x2={0} y2={11} stroke="var(--line-bright)" strokeWidth="1" />
              </>
            )}
            <text
              x={0}
              y={isHub ? 4 : -18}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize={isHub ? 15 : 12}
              letterSpacing="0.04em"
              fill={isHub ? "var(--ink)" : "var(--white)"}
              fontWeight={isHub ? 700 : 500}
            >
              {node.label}
            </text>
            {!isHub && (
              <text
                x={0}
                y={26}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize={10}
                letterSpacing="0.08em"
                fill="var(--line)"
              >
                REF·{node.ref}
              </text>
            )}
          </g>
        );
      })}

      {/* Scanline */}
      <line
        data-scanline
        x1={0}
        y1={0}
        x2={1200}
        y2={0}
        stroke="var(--line-bright)"
        strokeWidth="2"
        opacity="0"
      />
    </svg>
  );
}
