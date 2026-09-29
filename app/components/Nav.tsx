"use client";

import { useState } from "react";
import { P32Star, P32Wordmark } from "./P32Mark";

const LINKS = [
  { href: "#architecture", label: "ARCHITECTURE" },
  { href: "#capabilities", label: "CAPABILITIES" },
  { href: "#difference", label: "WHY P32" },
  { href: "#reach", label: "GLOBAL REACH" },
  { href: "#inquiry", label: "INQUIRY" },
];

/**
 * Always carries its own dark backdrop rather than starting transparent -
 * the page now opens on a white Cover section, so white nav text needs a
 * scrim from the very first frame, not just after scrolling past it.
 */
export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-ink/90 backdrop-blur-sm"
      style={{ borderBottom: "1px solid var(--hairline-dark-blue)" }}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 sm:px-10">
        <a href="#top" className="group flex items-center gap-4" onClick={() => setOpen(false)}>
          <span className="flex items-center gap-2">
            <P32Star className="h-4 w-4 text-[var(--line)] transition-colors duration-300 group-hover:text-[var(--line-bright)]" />
            <P32Wordmark className="h-3.5 w-auto text-white" />
            <span className="font-display text-sm font-medium tracking-[0.01em] text-white">
              Sentinel
            </span>
          </span>
          <span className="hidden font-mono text-xs font-normal tracking-[0.1em] sm:inline lg:hidden" style={{ color: "var(--white-soft)" }}>
            INTELLIGENCE. SECURITY. PEACE OF MIND.
          </span>
        </a>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-5 lg:flex xl:gap-7">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-xs tracking-[0.1em] text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#inquiry"
            className="hidden font-mono text-xs tracking-[0.12em] text-white/90 border border-line/50 px-4 py-2 transition-colors hover:border-line hover:bg-line/10 lg:inline-block"
          >
            CONFIDENTIAL INQUIRY
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className="h-px w-5 bg-white transition-transform duration-300"
              style={open ? { transform: "translateY(3px) rotate(45deg)" } : undefined}
            />
            <span
              className="h-px w-5 bg-white transition-opacity duration-300"
              style={open ? { opacity: 0 } : undefined}
            />
            <span
              className="h-px w-5 bg-white transition-transform duration-300"
              style={open ? { transform: "translateY(-3px) rotate(-45deg)" } : undefined}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="lg:hidden"
          style={{ borderTop: "1px solid var(--hairline-dark-blue)", background: "var(--ink)" }}
        >
          <ul className="mx-auto flex max-w-[1600px] flex-col px-6 py-4 sm:px-10">
            {LINKS.map((link) => (
              <li key={link.href} className="border-b" style={{ borderColor: "var(--hairline-dark)" }}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-mono text-sm tracking-[0.1em] text-white/80 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
