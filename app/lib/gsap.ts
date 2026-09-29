"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Registers GSAP plugins once, client-side only. */
export function useGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    // Mobile Safari fires resize when the address bar shows/hides on scroll;
    // without this, ScrollTrigger recalculates every trigger mid-scroll and
    // reveals can misfire or never fire at all.
    ScrollTrigger.config({ ignoreMobileResize: true });
    // Images/webfonts loading after first paint shift section positions;
    // recalculate every trigger once everything has actually loaded so
    // scroll-based reveals fire at the right point rather than early/late.
    window.addEventListener("load", () => ScrollTrigger.refresh());
    registered = true;
  }
  return { gsap, ScrollTrigger };
}
