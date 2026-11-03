"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/lib/useReducedMotion";
import { EcosystemDiagram } from "./EcosystemDiagram";
import { Grain } from "./Grain";
import { ExecutiveProtectionIcon, SecureNetworkIcon, InfrastructureIcon, SatelliteIcon } from "./TechIcons";

const PILLARS = [
  {
    zone: "A",
    title: "Principal & Family Protection",
    Icon: ExecutiveProtectionIcon,
    items: [
      "Executive protection strategy and deployment",
      "Family risk mapping - residences, travel, routines",
      "Discreet lifestyle security integration",
      "Exposure reduction across digital and physical domains",
    ],
  },
  {
    zone: "B",
    title: "Corporate & Organizational Security",
    Icon: SecureNetworkIcon,
    items: [
      "Internal threat and access vulnerability audits",
      "Employee, contractor, and vendor risk assessment",
      "Insider risk mitigation and control frameworks",
      "Crisis management and continuity planning",
    ],
  },
  {
    zone: "C",
    title: "Asset & Infrastructure Protection",
    Icon: InfrastructureIcon,
    items: [
      "Residential, community, and institutional security architecture",
      "Facility risk design - synagogues, schools, and community centers",
      "Global travel and movement security planning",
      "Secure logistics and operational movement",
    ],
  },
  {
    zone: "D",
    title: "Intelligence & Risk Oversight",
    Icon: SatelliteIcon,
    items: [
      "Strategic intelligence briefings",
      "Monitoring of antisemitic threats and extremist activity",
      "Threat identification before it materializes",
      "Ongoing risk visibility across all environments",
    ],
  },
];

export function Pillars() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { gsap, ScrollTrigger } = useGsap();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const zones = root.querySelectorAll<HTMLElement>("[data-zone]");

    if (reducedMotion) {
      gsap.set(zones, { clearProps: "all" });
      return;
    }

    gsap.set(zones, { opacity: 0, y: 24 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 65%", once: true },
    });
    tl.to(zones, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === root) st.kill();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <section className="relative bg-paper px-6 py-28 text-black sm:px-10 sm:py-36">
      <Grain />
      <div className="relative mx-auto max-w-[1200px]">
        <h2 className="font-display max-w-3xl text-[2rem] font-medium leading-[1.15] tracking-[-0.01em] sm:text-[2.75rem]">
          We do not provide fragmented services.
          <br />
          We deliver full-spectrum control across your entire environment.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--black-soft)" }}>
          Project 32 (P32) designs and implements integrated security
          ecosystems for individuals, Jewish communities and
          institutions, and complex organizations.
        </p>

        <div
          className="mt-10 overflow-hidden border sm:mt-16"
          style={{ borderColor: "var(--hairline-light)", background: "var(--ink)" }}
        >
          <EcosystemDiagram variant="unified" trigger="scroll" className="aspect-[4/3] w-full sm:aspect-[16/9]" />
        </div>
        <p className="mt-3 font-mono text-xs tracking-[0.1em]" style={{ color: "var(--line-on-paper)" }}>
          THE SAME ECOSYSTEM. ONE ARCHITECTURE.
        </p>

        <div ref={rootRef} className="mt-20 grid gap-px sm:grid-cols-2" style={{ background: "var(--hairline-light-blue)" }}>
          {PILLARS.map((pillar) => (
            <div key={pillar.zone} data-zone className="bg-paper p-8 sm:p-10">
              <div className="flex items-baseline gap-4">
                <span
                  className="font-mono text-sm font-semibold tracking-[0.08em]"
                  style={{ color: "var(--line-on-paper)" }}
                >
                  ZONE {pillar.zone}
                </span>
                <div className="h-px flex-1" style={{ background: "var(--hairline-light)" }} />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <pillar.Icon className="h-6 w-6 shrink-0" style={{ color: "var(--line-on-paper)" }} />
                <h3 className="font-display text-xl font-medium sm:text-2xl">{pillar.title}</h3>
              </div>
              <ul className="mt-6 space-y-3">
                {pillar.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.95rem] leading-relaxed"
                    style={{ color: "var(--black-soft)" }}
                  >
                    <span aria-hidden style={{ color: "var(--line)" }}>
                      -
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
