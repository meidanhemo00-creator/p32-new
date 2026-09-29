"use client";

import { useEffect, useRef, type ComponentType, type CSSProperties } from "react";
import { useGsap } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/lib/useReducedMotion";
import { Grain } from "./Grain";
import { PLATFORM_ICONS } from "./PlatformIcons";
import { SecureNetworkIcon, ThreatMonitoringIcon, PenetrationTestIcon } from "./TechIcons";

type IconComponent = ComponentType<{ className?: string; style?: CSSProperties }>;

interface CapabilityItem {
  name: string;
  desc: string;
  platforms?: boolean;
}

interface CapabilityGroupData {
  title: string;
  note: string;
  Icon: IconComponent;
  items: CapabilityItem[];
}

const GROUPS: CapabilityGroupData[] = [
  {
    title: "Digital Intelligence & Monitoring",
    note: "Watching what the public, the press, and hostile actors see.",
    Icon: SecureNetworkIcon,
    items: [
      {
        name: "Multi-Platform Social Media Monitoring",
        desc: "Continuous collection across TikTok, Facebook, X/Twitter, Instagram, YouTube, and Reddit, in every relevant language.",
        platforms: true,
      },
      {
        name: "Executive Protective Monitoring",
        desc: "Dedicated monitoring of threats, targeting, and hostile attention directed at protected individuals.",
      },
      {
        name: "Impersonation Detection",
        desc: "Identification of fake profiles, spoofed accounts, and identity misuse across digital platforms and domains.",
      },
      {
        name: "Narrative & Sentiment Tracking",
        desc: "Analysis of harmful narratives surfacing across social platforms and media, tracking sentiment shifts before they escalate.",
      },
      {
        name: "Reputation Analysis",
        desc: "Structured assessment of reputational exposure across digital, media, and community environments.",
      },
    ],
  },
  {
    title: "Threat & Operational Intelligence",
    note: "Seeing threats and movement risk before they materialize.",
    Icon: ThreatMonitoringIcon,
    items: [
      {
        name: "Travel & Event Intelligence",
        desc: "Pre-travel and pre-event intelligence on routes, venues, local narratives, security risks, and on-ground threat signals.",
      },
      {
        name: "Threat Actor Profiling",
        desc: "In-depth profiling of hostile actors - identity, background, affiliations, capability, and intent - from a single starting indicator.",
      },
      {
        name: "Dark Web & Leaks",
        desc: "Monitoring of closed communities, breach data, and leaked credentials tied to protected entities.",
      },
      {
        name: "Rapid Escalation Support",
        desc: "Immediate analyst notification and operational guidance when high-severity findings emerge.",
      },
      {
        name: "Intelligence Reporting",
        desc: "Decision-ready executive briefs and evidence-based analyst reports with sourcing and recommended action.",
      },
    ],
  },
  {
    title: "Cyber & Security Testing",
    note: "Testing the architecture the way an adversary would.",
    Icon: PenetrationTestIcon,
    items: [
      {
        name: "Penetration Testing",
        desc: "In-depth security testing across applications, networks, cloud environments, infrastructure, and systems to validate exploitable vulnerabilities.",
      },
      {
        name: "Red Team Simulation",
        desc: "Realistic adversary simulations that test an organization's ability to detect, contain, and respond to advanced attacks.",
      },
      {
        name: "Extended Infrastructure Testing",
        desc: "Security testing beyond core production environments - corporate networks, external infrastructure, third-party exposure, physical attack surfaces.",
      },
      {
        name: "Security Posture Assessment",
        desc: "Comprehensive assessment of cloud, network, endpoint, identity, and application security, with prioritized, actionable findings.",
      },
      {
        name: "Face Recognition",
        desc: "Advanced face recognition and identification for security and investigative use cases, including analysis of camera footage.",
      },
      {
        name: "Team Enablement & Training",
        desc: "Hands-on training and knowledge transfer to strengthen internal security capabilities and operational readiness.",
      },
    ],
  },
];

function CapabilityGroup({
  title,
  note,
  Icon,
  items,
  isFirst,
}: CapabilityGroupData & { isFirst: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { gsap, ScrollTrigger } = useGsap();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const rows = root.querySelectorAll<HTMLElement>("[data-flap]");

    if (reducedMotion) {
      gsap.set(rows, { clearProps: "all" });
      return;
    }

    gsap.set(rows, { opacity: 0, rotateX: -70, transformOrigin: "top center", transformPerspective: 600 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 78%", once: true },
    });
    tl.to(rows, {
      opacity: 1,
      rotateX: 0,
      duration: 0.55,
      stagger: 0.09,
      ease: "power2.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === root) st.kill();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <div
      ref={rootRef}
      className="py-10 first:pt-0"
      style={isFirst ? undefined : { borderTop: "1px solid var(--hairline-dark)" }}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6 shrink-0" style={{ color: "var(--line)" }} />
          <h3 className="font-display text-xl font-medium text-white sm:text-2xl">{title}</h3>
        </div>
        <p className="font-mono text-xs tracking-[0.06em]" style={{ color: "var(--line)" }}>
          {note}
        </p>
      </div>

      <div className="mt-6 border-t" style={{ borderColor: "var(--hairline-dark)" }}>
        {items.map((item) => (
          <div
            key={item.name}
            data-flap
            className="grid grid-cols-1 gap-1 border-b py-4 sm:grid-cols-[minmax(0,20rem)_1fr] sm:gap-8 sm:py-5"
            style={{ borderColor: "var(--hairline-dark)" }}
          >
            <span className="text-base font-medium text-white sm:text-lg">{item.name}</span>
            <div>
              <span className="text-sm leading-relaxed sm:text-[0.95rem]" style={{ color: "var(--white-soft)" }}>
                {item.desc}
              </span>
              {item.platforms && (
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  {PLATFORM_ICONS.map(({ Icon: PIcon, name }) => (
                    <PIcon key={name} className="h-4 w-4" style={{ color: "var(--line)" }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Capabilities() {
  return (
    <section id="capabilities" className="relative bg-ink px-6 py-28 sm:px-10 sm:py-36">
      <Grain />
      <div className="relative mx-auto max-w-[1200px]">
        <h2 className="font-display max-w-3xl text-[2rem] font-medium leading-[1.15] tracking-[-0.01em] text-white sm:text-[2.75rem]">
          Threat identification before it materializes, across every layer of
          the architecture.
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--white-soft)" }}>
          Intelligence &amp; risk oversight, in practice - grouped by how the
          work actually runs, not as a service list.
        </p>

        <div className="mt-14">
          {GROUPS.map((group, i) => (
            <CapabilityGroup key={group.title} {...group} isFirst={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
