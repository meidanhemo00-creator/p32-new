"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/lib/useReducedMotion";
import { Grain } from "./Grain";

const DIFFERENTIATORS = [
  { term: "Unified Security Architecture", detail: "Not fragmented services." },
  { term: "Intelligence-Led Approach", detail: "Proactive, not reactive." },
  { term: "Discreet Integration", detail: "Built into your life and operations, not imposed on them." },
  { term: "Global Capability", detail: "Across jurisdictions, assets, and environments." },
];

const REGISTRY = [
  { label: "ENTITY", value: "Project 32 Ltd (P32)" },
  { label: "OVERSIGHT", value: "Licensed and supervised by the Israeli Ministry of Defense" },
  { label: "LICENSING", value: "DECA licensing, exported from the Israeli Ministry of Defense" },
  {
    label: "TEAM ORIGIN",
    value: "Former senior officers - Knesset Guard, Shin Bet, Military Intelligence (Aman), special operations forces",
  },
  { label: "OPERATIONAL REACH", value: "Israel, the United States, and Europe" },
  { label: "U.S. BASES", value: "Miami · New York" },
];

export function Credibility() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { gsap, ScrollTrigger } = useGsap();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const rows = root.querySelectorAll<HTMLElement>("[data-registry-row]");
    const seal = root.querySelector<HTMLElement>("[data-seal]");
    const plate = root.querySelector<HTMLElement>("[data-plate]");
    const elite = root.querySelector<HTMLElement>("[data-elite]");
    const team = root.querySelector<HTMLElement>("[data-team]");

    if (reducedMotion) {
      gsap.set([rows, seal, plate, elite, team], { clearProps: "all" });
      return;
    }

    gsap.set(rows, { opacity: 0, x: -8 });
    gsap.set(seal, { opacity: 0, scale: 0.85 });
    gsap.set(plate, { opacity: 0 });
    gsap.set(elite, { opacity: 0, scale: 1.06 });
    gsap.set(team, { opacity: 0, scale: 1.06 });

    gsap.to(team, {
      opacity: 1,
      scale: 1,
      duration: 1.3,
      ease: "power2.out",
      scrollTrigger: { trigger: team, start: "top 85%", once: true },
    });

    gsap.to(elite, {
      opacity: 1,
      scale: 1,
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: { trigger: elite, start: "top 80%", once: true },
    });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 70%", once: true },
    });
    tl.to(rows, { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }).to(
      seal,
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" },
      "-=0.3",
    );

    gsap.to(plate, {
      opacity: 1,
      duration: 1.2,
      ease: "power1.out",
      scrollTrigger: { trigger: plate, start: "top 85%", once: true },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === root) st.kill();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <section id="difference" className="relative bg-paper px-6 py-28 text-black sm:px-10 sm:py-36">
      <Grain />
      <div ref={rootRef} className="relative mx-auto max-w-[1200px]">
        <h2 className="font-display max-w-3xl text-[2rem] font-medium leading-[1.15] tracking-[-0.01em] sm:text-[2.75rem]">
          What makes P32 different
        </h2>

        <div
          data-team
          className="relative mt-10 h-[50vh] min-h-[340px] overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover"
            style={{ backgroundImage: "url(/images/p32/team-approach-movement.jpg)", backgroundPosition: "50% 40%" }}
            role="img"
            aria-label="An operational team moving together toward a structure, tactical gear and equipment, backs to camera."
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, rgba(9,9,9,0.85) 0%, rgba(9,9,9,0.1) 45%, rgba(9,9,9,0.4) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(127,168,196,0.14) 0%, transparent 50%)" }}
          />
          <Grain />
          <p
            className="absolute bottom-5 left-5 font-mono text-[0.7rem] tracking-[0.1em] sm:bottom-6 sm:left-6"
            style={{ color: "var(--line-bright)" }}
          >
            OPERATIONAL TEAM
          </p>
        </div>

        <div className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: "var(--hairline-light-blue)" }}>
          {DIFFERENTIATORS.map((d) => (
            <div key={d.term} className="bg-paper p-6">
              <p className="text-base font-medium">{d.term}</p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--black-soft)" }}>
                {d.detail}
              </p>
            </div>
          ))}
        </div>

        <div
          data-elite
          className="relative mt-16 h-[55vh] min-h-[380px] overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover"
            style={{ backgroundImage: "url(/images/p32/operator-nvg-silhouette.jpg)", backgroundPosition: "50% 25%" }}
            role="img"
            aria-label="A P32 operator in tactical gear and night-vision equipment, low-angle silhouette, standing watch."
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, rgba(9,9,9,0.9) 0%, rgba(9,9,9,0.15) 45%, rgba(9,9,9,0.5) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(120deg, rgba(127,168,196,0.14) 0%, transparent 50%)" }}
          />
          <Grain />
          <div className="absolute inset-x-5 bottom-6 sm:inset-x-8 sm:bottom-8">
            <p className="font-mono text-xs tracking-[0.14em]" style={{ color: "var(--line-bright)" }}>
              FORMER SENIOR OFFICERS
            </p>
            <p className="mt-2 max-w-md text-lg font-medium leading-snug text-white sm:text-xl">
              Knesset Guard, Shin Bet, Military Intelligence (Aman), and
              special operations forces.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-lg leading-relaxed" style={{ color: "var(--black-soft)" }}>
              P32 is an Israeli intelligence and security firm operating under
              the supervision of the Israeli Ministry of Defense. Our team is
              comprised of former senior officers drawn from Israel&rsquo;s
              most elite and trusted units, bringing deep operational
              experience across Israel, the United States, and Europe.
            </p>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--black-soft)" }}>
              This framework provides more than regulatory authorization. It
              enables access to advanced security technologies not broadly
              available commercially, superior intelligence-gathering
              methodologies, and the integration of battle-tested operational
              doctrine into private-sector environments - a level of
              visibility, capability, and control conventional security
              providers cannot replicate.
            </p>

            <div data-seal className="mt-10 inline-flex items-center gap-3 border px-4 py-3" style={{ borderColor: "var(--black)" }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
                <path
                  d="M14 2 L25 7 V14 C25 20 20.5 24.5 14 26 C7.5 24.5 3 20 3 14 V7 Z"
                  stroke="var(--black)"
                  strokeWidth="1.4"
                />
                <path d="M9 14 L12.5 17.5 L19 10.5" stroke="var(--black)" strokeWidth="1.4" fill="none" />
              </svg>
              <span className="font-mono text-[0.7rem] leading-tight tracking-[0.06em]" style={{ color: "var(--black)" }}>
                LICENSED &amp; SUPERVISED
                <br />
                ISRAELI MINISTRY OF DEFENSE
              </span>
            </div>
          </div>

          <div className="border" style={{ borderColor: "var(--black)" }}>
            <div
              className="border-b px-5 py-3 font-mono text-[0.7rem] tracking-[0.1em]"
              style={{ borderColor: "var(--black)", color: "var(--black-soft)" }}
            >
              REGISTRY
            </div>
            {REGISTRY.map((row) => (
              <div
                key={row.label}
                data-registry-row
                className="grid grid-cols-1 gap-1 border-b px-5 py-4 last:border-b-0 sm:grid-cols-[10rem_1fr] sm:gap-4"
                style={{ borderColor: "var(--hairline-light)" }}
              >
                <span className="font-mono text-xs tracking-[0.08em]" style={{ color: "var(--line-on-paper)" }}>
                  {row.label}
                </span>
                <span className="text-[0.95rem] leading-snug">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          data-plate
          className="relative mt-16 h-[40vh] min-h-[280px] overflow-hidden border"
          style={{ borderColor: "var(--black)" }}
        >
          <div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage: "url(/imagery/night-network-europe-mideast.jpg)",
              backgroundPosition: "78% 60%",
            }}
            role="img"
            aria-label="Satellite view of city lights across the Eastern Mediterranean at night - NASA Black Marble imagery, public domain."
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(9,9,9,0.15) 0%, rgba(9,9,9,0.75) 100%)",
            }}
          />
          <Grain />
          <p
            className="absolute bottom-5 left-5 font-mono text-[0.7rem] tracking-[0.1em] sm:bottom-6 sm:left-6"
            style={{ color: "var(--line-bright)" }}
          >
            REGION OF ORIGIN - EASTERN MEDITERRANEAN
          </p>
        </div>
      </div>
    </section>
  );
}
