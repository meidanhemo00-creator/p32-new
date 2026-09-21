"use client";

import { useEffect, useState } from "react";
import { P32Star, P32Wordmark } from "./P32Mark";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-ink/90 backdrop-blur-sm" : "bg-transparent"
      }`}
      style={{
        borderBottom: scrolled ? "1px solid var(--hairline-dark-blue)" : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 sm:px-10">
        <a href="#top" className="group flex items-center gap-4">
          <span className="flex items-center gap-2">
            <P32Star className="h-4 w-4 text-[var(--line)] transition-colors duration-300 group-hover:text-[var(--line-bright)]" />
            <P32Wordmark className="h-3.5 w-auto text-white" />
            <span className="font-display text-sm font-medium tracking-[0.01em] text-white">
              Sentinel
            </span>
          </span>
          <span className="hidden font-mono text-xs font-normal tracking-[0.1em] sm:inline" style={{ color: "var(--white-soft)" }}>
            INTELLIGENCE. SECURITY. PEACE OF MIND.
          </span>
        </a>
        <a
          href="#inquiry"
          className="font-mono text-xs tracking-[0.12em] text-white/90 border border-line/50 px-4 py-2 transition-colors hover:border-line hover:bg-line/10"
        >
          CONFIDENTIAL INQUIRY
        </a>
      </nav>
    </header>
  );
}
