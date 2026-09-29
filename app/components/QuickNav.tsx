"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/app/lib/navLinks";

/**
 * Permanent quick-access strip directly beneath the Hero - the same
 * sections as the Nav menu, always visible rather than tucked behind a
 * click, for readers who land straight into the page without scrolling.
 */
export function QuickNav() {
  const [active, setActive] = useState<string | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(
      (el): el is Element => el !== null,
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) => (a.boundingClientRect.top <= b.boundingClientRect.top ? a : b));
        setActive(`#${top.target.id}`);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Quick section navigation"
      className="relative border-y bg-ink"
      style={{ borderColor: "var(--hairline-dark)" }}
    >
      <div
        ref={railRef}
        className="mx-auto flex max-w-[1600px] items-center gap-6 overflow-x-auto px-6 py-3 sm:justify-center sm:gap-10 sm:px-10"
      >
        {NAV_LINKS.map((link, i) => {
          const isActive = active === link.href;
          return (
            <div key={link.href} className="flex shrink-0 items-center gap-6 sm:gap-10">
              {i > 0 && <span className="hidden h-3 w-px shrink-0 bg-[var(--hairline-dark)] sm:block" aria-hidden />}
              <a
                href={link.href}
                className="shrink-0 whitespace-nowrap font-mono text-[0.7rem] tracking-[0.1em] transition-colors"
                style={{ color: isActive ? "var(--line-bright)" : "rgba(255,255,255,0.55)" }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                }}
              >
                {link.label}
              </a>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
