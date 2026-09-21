---
name: P32 Sentinel
description: An architectural blueprint of one unified security system, rendered as a continuous technical drawing rather than a service catalog.
colors:
  ink: "#090909"
  ink-2: "#0f0f0f"
  ink-3: "#181818"
  paper: "#f0f0f0"
  paper-2: "#e5e5e5"
  white: "#f5f5f5"
  black: "#0a0a0a"
  line: "#7fa8c4"
  line-bright: "#a9cbe0"
  line-on-paper: "#3a5c78"
typography:
  display:
    fontFamily: "\"Key Grotesk\", var(--font-archivo), ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.5rem → 4.5rem (text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem])"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  statement:
    fontFamily: "\"Key Grotesk\", var(--font-archivo), ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem → 3.75rem (text-[2.25rem] sm:text-[3.25rem]/[3rem] lg:text-[3.75rem])"
    fontWeight: 500
    lineHeight: "1.08–1.1"
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "\"Key Grotesk\", var(--font-archivo), ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.5vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  body:
    fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "var(--font-jetbrains-mono), ui-monospace, \"SFMono-Regular\", monospace"
    fontSize: "0.6rem → 0.875rem"
    fontWeight: 500
    letterSpacing: "0.06em–0.14em"
rounded:
  none: "0px"
spacing:
  hairline: "1px"
  section-y: "7rem"
  container-max: "1600px"
components:
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
  nav-cta:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    padding: "8px 16px"
---

# Design System: P32 Sentinel

## Overview

**Creative North Star: "The Architectural Blueprint"**

P32 Sentinel presents itself as a continuous technical drawing of one security system, not a catalog of service cards. Every section behaves like a page of the same drawing set: a true-achromatic black-and-white ground, a pale-blue accent that only ever draws lines, grids, and annotations, and content plotted as annotated diagrams, coordinate labels, and registry tables rather than icon tiles or floating glass panels. The visitor's fragmented risk surface is drawn, then redrawn unified, using the same node-and-edge vocabulary throughout — the diagram is the argument, not decoration next to it.

A second, larger creative pass (client-directed) expanded the system without breaking its premise: the hero's diagram now scatters and settles rather than just drawing, two ambient/idle motion devices (the hero's signal pulse, Pivot's slow radar sweep) keep sections alive between scroll triggers, a shared film-grain texture unifies every ground (dark and paper) into one tactile material, two icon systems extend the diagram vocabulary into content markers, and the page gained its first real photographic asset alongside its honestly-labeled drawn placeholder. The system explicitly rejects the SOC-dashboard cliché (no neon, no glow, no gradients-as-decoration, no glass panels) and the generic security-vendor service menu (no icon-tile-card grids as the default container). Where color appears outside the pale-blue accent, it is a deliberate, narrow exception for photographic-moment legibility (scrims and horizon-glow behind full-bleed plates) — never a general license for gradients or glow elsewhere.

**Key Characteristics:**
- True-achromatic black-and-white ground (every ink/paper value has R=G=B); the pale-blue accent is the sole carrier of color.
- Diagrams are drawn, not decorated: node/edge networks, layered-overlap fan stacks, a reconnaissance/targeting frame, a radar motif — never icon tiles or dashboards.
- A shared low-opacity film-grain texture (`Grain.tsx`) is applied across every section, dark and paper alike, as the system's one consistent material ground.
- Zero border-radius everywhere; the whole system is rectilinear.
- No shadows; depth comes from hairline dividers, panel overlap/z-index, and full-bleed scrim gradients for text legibility only.
- Alternating dark (`--ink`) and paper (`--paper`) sections mark the page's narrative beats, with one deliberate ground-inversion (Engagement) placed specifically to break a run of consecutive dark sections before the closing CTA.

## Colors

A true-achromatic black-and-white ground (R=G=B at every step) with one pale-blue accent hue that carries all color in the system. No new hue was introduced in the second pass.

### Primary
- **Blueprint Line** (`#7fa8c4`): the accent's base value. Draws diagram edges, grid lines, hairline dividers on dark ground, and default-state annotation text on dark backgrounds.
- **Blueprint Line — Bright** (`#a9cbe0`): the accent's raised value. Used for active/emphasized diagram elements — hub nodes, scanline sweeps, reticle marks, tracking paths (Hero, SatelliteReach, GlobalReach), the CTA's signature stroke — anywhere the line needs to read as "live" against the dimmer base line.
- **Blueprint Line — On Paper** (`#3a5c78`): the accent darkened to clear 4.5:1 contrast on the paper ground, used for mono labels, annotation text, and icon tint inside paper-background sections (zone labels, pillar icons, registry labels).

### Neutral
- **Ink** (`#090909`): primary dark-section background (hero, capability list, CTA, footer, Pivot, SatelliteReach, GlobalReach).
- **Ink 2** (`#0f0f0f`) / **Ink 3** (`#181818`): tonal steps used inside the dark ground for layered depth (e.g. the GlobalReach skyline's nearest depth band sits at `--ink-3`).
- **Paper** (`#f0f0f0`): primary light-section background (Pillars, Credibility, and — as of this pass — Engagement, inverted from dark specifically to vary the pacing). Paired with true black text, not off-black.
- **Paper 2** (`#e5e5e5`): a secondary paper step, reserved for subtle paper-on-paper separation.
- **White** (`#f5f5f5`): primary text on dark sections, plus its soft (62% opacity) and faint (38% opacity) variants for secondary/tertiary text hierarchy on dark ground.
- **Black** (`#0a0a0a`): primary text on paper sections, plus soft/faint variants mirroring the white scale.

### Named Rules
**The One-Hue Rule.** Every non-neutral color in the system is a shade of the same pale-blue line hue. No second accent hue is introduced anywhere, including in imagery moments — GlobalReach's dusk horizon-glow is a desaturated warm-white radial (`rgba(230,236,240,…)`), and the section's vignette scrim is a pure black radial (`rgba(0,0,0,0.55)`) — neither is a second hue, both are functional legibility devices, not new palette entries.

**The Line-Work-Only Rule.** The accent is used exclusively as stroke, hairline, or small-area fill on diagram nodes, markers, and the system's own technical icon set (`TechIcons.tsx`) — never as a background wash, a glow behind text, or a gradient fill spanning more than a legibility scrim. The one confirmed exception is real third-party brand marks (`PlatformIcons.tsx`): six official platform logos rendered as solid `currentColor` fills because they must reproduce a real, recognizable mark, not invented iconography — this exception is scoped to identifying actual named platforms, not a general license for filled icon glyphs elsewhere.

## Typography

**Display Font:** Key Grotesk, currently falling back to a self-hosted Archivo interim face (licensed Key Grotesk files not yet supplied — see `public/fonts/README.md`; the `@font-face` scaffold in `app/fonts.css` takes over automatically once files land). Unchanged by this pass.
**Body Font:** Inter
**Label/Mono Font:** JetBrains Mono

**Character:** A monumental, slightly condensed grotesque display face over precise, highly-readable Inter body copy, with JetBrains Mono carrying every coordinate-style label, zone marker, and technical annotation — the pairing reads as a drafting document, not a marketing page.

### Hierarchy
- **Display** (500, `2.5rem`→`4.5rem` clamp, line-height 1.05, tracking -0.02em): the hero anchor statement only ("Security is not a service. It is an infrastructure."). Unchanged.
- **Statement** (500, `2.25rem`→`3.75rem`, line-height ~1.08–1.1, tracking -0.01em) — **new step this pass**: a tier between Headline and Display for large closing/pivot statements that need more weight than a section-opener but aren't the hero anchor. Used by Engagement's "We work with a limited number of principals…" heading and the CTA form's closing statement.
- **Headline** (500, `2rem`→`2.75rem`, line-height 1.15, tracking -0.01em): section-opening statements (Fragmentation, Pillars, Capabilities, Credibility). Unchanged.
- **Title** (500, `1.25rem`–`1.875rem`): pillar card titles, capability group titles, CTA form-panel titles, and the imagery-caption headlines introduced this pass (SatelliteReach's "Israel, the United States, and Europe…", GlobalReach's "Miami · New York") — the range's top end extended slightly (to `text-3xl`/`1.875rem`) to give full-bleed photographic/drawn plates a caption weight distinct from a body-adjacent title.
- **Body** (400, `1rem`–`1.125rem`, line-height ~1.6): supporting paragraphs; kept short, max-width constrained (max-w-xl to max-w-2xl).
- **Label** (500, `0.6rem`–`0.875rem`, tracking 0.06em–0.14em, uppercase): every coordinate-style tag — "REF·A1", "ZONE A", "DWG NO. P32-ARCH-001 · SCALE NTS", the Hero reticle's live coordinate readout, nav CTA, form field labels, buttons. The floor of the range dropped this pass (`0.6rem`–`0.7rem`, from the reticle coordinate readout, GlobalReach's lit-window-adjacent labels, and Credibility's registry cells) to cover smaller annotation instances introduced alongside the larger Statement tier — the same device at finer scale, not a new device.
- **Pivot quote** (500, `1.6rem`→`2.25rem`, line-height snug): a quieter, smaller headline register used once, for Pivot's rhetorical-question beat ("Do you know who is working for you…") — intentionally below the Headline floor so this ambient, slow-paced section reads calmer than the surrounding diagram-driven sections. Documented here as a confirmed one-off register, not folded into Headline.

### Named Rules
**The Mono-Annotation Rule.** JetBrains Mono is reserved for labels, coordinates, zone/registry tags, and technical callouts — never for body paragraphs or long-form copy. It is the technical-accent layer, not a second reading typeface.

## Layout

The page runs on a `max-w-[1600px]` outer container (nav, hero) with inner section containers at `max-w-[900px]`–`[1200px]`, generous vertical section rhythm (`py-28` at rest, `py-32`–`py-44` for pivot/quiet/closing moments). The diagram components carry their own internal blueprint grid (a low-opacity line grid at fixed pixel spacing) that stands in for a drafting sheet rather than a page-level CSS grid.

Sections alternate dark (`--ink`) and paper (`--paper`) grounds to mark narrative beats: Hero/Fragmentation/Pivot/Capabilities/SatelliteReach/GlobalReach/CTA/Footer on ink; Pillars/Credibility/**Engagement** on paper. Engagement's ground was deliberately inverted from dark to paper in this pass — a rhythm decision, not a default — specifically to break up what had become a long run of consecutive dark sections (Capabilities → SatelliteReach → GlobalReach) immediately before the closing CTA; it pairs the inversion with a 3-column numbered-trait layout (`01`/`02`/`03`) rather than reusing an existing grid, so the beat reads as a genuine pause, not a re-skinned section. Grids that need visible seams (Pillars' four-pillar grid, Credibility's differentiator grid, Engagement's 3-column trait grid) use a `gap-px` trick with a hairline-colored background so the gap itself renders as a 1px divider rather than a bordered card. Responsive behavior collapses multi-column grids to a single column below `sm`, and reduces display type via the clamp/stepped scale rather than switching typefaces or layouts.

## Elevation & Depth

Flat. No `box-shadow` appears anywhere in the system. Depth is conveyed through hairline borders, panel overlap and `z-index` stacking (the Fragmentation fan stack, where rows are offset and overlap by negative margin), tonal steps within the ink scale (GlobalReach's three-band skyline uses `--ink-3` for the nearest band against `--ink`), and full-bleed linear/radial gradient scrims used strictly for text-over-imagery legibility (the Hero's bottom scrim, SatelliteReach's top/bottom scrim over real photography, GlobalReach's vignette `rgba(0,0,0,0.55)` and horizon-glow) — never as an ambient or decorative glow.

This pass added one shared material layer beneath all of that: a static film-grain texture (`Grain.tsx`, `public/textures/grain.png`, 128×128px tile, `mix-blend-mode: overlay`, fixed `opacity: 0.05`) rendered as the first overlay inside every section, dark and paper alike. It is a flat, non-animated texture — it does not simulate light or lift a surface; it gives the whole page one consistent tactile ground instead of flat vector color, consistent with the No-Shadow Rule's ban on ambient glow.

### Named Rules
**The No-Shadow Rule.** Surfaces never cast a shadow. Where a full-bleed diagram or photograph needs a dark scrim so overlaid text stays legible, that gradient is functional (fixed opacity ramp toward the section's own ground color) and is not treated as, or described as, an elevation cue.

**The Grain Rule.** Every section carries the same static grain overlay at the same fixed opacity (0.05) and blend mode (`overlay`) — it is never brightened, animated, or varied per-section to "add mood"; its job is a single consistent material ground, not a decorative accent.

## Shapes

Fully rectilinear: zero border-radius on every element observed (buttons, form fields, panel borders, pillar cards, registry rows), with one confirmed exception — the small circular waypoint markers in SatelliteReach (`rounded-full`, 8px dots) and the diagram/reticle node circles, which are drawn point-markers in the diagram vocabulary, not container corners. Borders are 1px–1.5px hairlines (`--hairline-dark` on ink, `--hairline-light` on paper) or the accent line at similar weight. Corner geometry appears as a drawn device rather than a radius: the GlobalReach targeting frame uses four L-shaped corner brackets (2px stroke, open corner) around the frame, and the diagram nodes and TechIcons use small crosshair tick marks and open-corner brackets rather than filled icon glyphs.

## Components

### Buttons
- **Shape:** rectangular, 0px radius, 1–1.5px border.
- **Primary:** transparent background, `border: 1px solid white/80`, JetBrains Mono label text (`0.75rem`, tracking 0.12em, uppercase), `padding: 14px 28px`.
- **Hover / Focus:** background inverts to white with ink text on hover; focus uses a 1.5px `--line-bright` outline offset 3px (never a soft glow ring).
- **Nav CTA:** same language at smaller scale, `border-line/50` at rest, brightening to full `--line` with a faint `--line/10` fill on hover.

### Cards / Containers
- **Corner Style:** 0px radius throughout.
- **Background:** paper cards on paper sections (Pillars, Credibility, Engagement) sit on `--paper` with `--hairline-light` gap-seams; the Capabilities/CTA panels sit on `--ink` with `--hairline-dark` borders.
- **Shadow Strategy:** none — see Elevation & Depth.
- **Border:** 1px hairline, ground-appropriate (`--hairline-dark` / `--hairline-light`), except the Credibility registry table and licensing seal, which use full-strength `--black` borders for document-like weight.
- **Internal Padding:** `1.5rem`–`2.5rem` (`p-6` to `p-10`).

### Inputs / Fields
- **Style:** transparent background, 1px `--hairline-dark` border, 0px radius, JetBrains Mono field labels above each input.
- **Focus:** browser-default handled by the global `:focus-visible` rule — 1.5px `--line-bright` outline, 3px offset.
- **Error:** inline text in `--line-bright`, `role="alert"`, no red.

### Navigation
- Fixed header, transparent until scroll (`scrollY > 24`), then `bg-ink/90` with a hairline bottom border and backdrop blur. Wordmark is now the real client-supplied logo (`P32Star` + `P32Wordmark` from `P32Mark.tsx`) plus the confirmed visible name "Sentinel" in Key Grotesk/Archivo; tagline ("INTELLIGENCE. SECURITY. PEACE OF MIND.") and CTA in JetBrains Mono. No dropdown/menu chrome — a single confidential-inquiry entry point.

### Icon Systems (new this pass)
Two distinct, non-interchangeable icon systems, both used as small category-header or inline markers next to text — never as a default icon-tile grid:
- **TechIcons** (`app/components/TechIcons.tsx`): ten custom line icons drawn in the page's own blueprint vocabulary — thin (1.4px) stroke, `fill: none`, circles, crosshair ticks, open corner-brackets, dashed-vs-solid distinctions, one shared viewBox. Used per-zone in Pillars and per-group/per-item in Capabilities.
- **PlatformIcons** (`app/components/PlatformIcons.tsx`): the six official platform marks (TikTok, Facebook, X, Instagram, YouTube, Reddit), sourced from Simple Icons (CC0), inlined as static `currentColor`-filled paths. Used only in the platform-icon row under Multi-Platform Social Media Monitoring in Capabilities — the confirmed, scoped exception to the Line-Work-Only Rule (see Colors).

### EcosystemDiagram (signature component)
The recurring node/edge network (`app/components/EcosystemDiagram.tsx`) drawn over a low-opacity blueprint grid. Two variants — `fragmented` and `unified` — share the same coordinate system and visual language. Signature interaction: a **scan-and-connect reveal** — a horizontal scanline sweeps the frame, nodes fade in, then edges draw themselves in stroke-dashoffset order — triggered on mount (Hero, via `HeroField`) or on scroll-into-view (Pillars), skipped entirely under `prefers-reduced-motion`.

### HeroField (signature component, rebuilt this pass)
Replaces the old inline hero diagram usage with a dedicated, layered field (`app/components/HeroField.tsx`) that composes four motion devices into one entrance, none of which existed in the prior build:
- **Scatter-and-settle entrance:** nodes start offset and rotated at random small angles, then animate to their final drawn position (`power3.out`, staggered from a random order) before the scan pass draws the edges — fragments visibly organizing into one architecture, not lines drawing onto static dots.
- **Ambient signal-pulse loop:** once settled, small `--line-bright` pulses travel continuously along two of the network's edges on an infinite, staggered repeat — the one continuous idle system in the hero.
- **Pointer-driven parallax:** on fine-pointer devices only (`hover: hover` and `pointer: fine`), the background grid, the network SVG, and a cursor-tracking reticle each drift at a different rate via `gsap.quickTo`, and the reticle displays a live `X ____ Y ____` coordinate readout next to the cursor.
- **Scroll-scrubbed exit:** grid and network layers separate at different speeds and fade as the hero scrolls out (`scrub: 0.4`), rather than cutting flatly into Fragmentation.
- **Reduced-motion state:** all four devices collapse to one static, fully-settled, fully-drawn end state — no scatter, no pulse, no parallax, no scan.

### Fragmentation fan stack (signature component)
Layer rows enter stacked flush at the same x-position, then fan out into offset, overlapping positions — the entrance motion performs "each layer expands your footprint" rather than a generic fade-in.

### Pivot radar motif (signature component, new this pass)
An oversized (140vh), near-silent radar/coordinate device (`app/components/Pivot.tsx`): three concentric rings, a crosshair, and a sweeping wedge, at a fixed `opacity: 0.05`. After the section's entrance timeline completes, the wedge rotates continuously (`rotate: 360, duration: 14, ease: "none", repeat: -1`) — a slow, near-imperceptible ambient idle device distinct from the Hero's node network, giving this quiet mid-page beat its own scale and life without competing with the diagram vocabulary.

### SatelliteReach (signature component, new this pass)
The page's first real photographic moment (`app/components/SatelliteReach.tsx`): a full-bleed duotoned crop of NASA's public-domain Blue Marble Earth imagery (`public/imagery/earth-atlantic-corridor.jpg`, sourced and processed per `public/imagery/README.md`), with a tracking-path overlay (`stroke-dasharray` draw-on) connecting New York, Miami, and Tel Aviv waypoints, a slow continuous scroll-scrubbed drift on the image layer, and the shared Grain overlay. This is the honest counterpart to GlobalReach's drawn plate below it: real photography where real photography exists, clearly documented as such.

### GlobalReach reconnaissance frame (signature component)
A full-bleed dark plate combining a three-tonal-band vector skyline (atmospheric perspective standing in for aerial photography of the Miami/New York bases), a dusk horizon-glow radial gradient, sparse lit-window rects, and a vignette scrim (`rgba(0,0,0,0.55)`) — plus a four-corner targeting-bracket frame and a lock-on reticle mark. **Remains a drawn placeholder, not a photograph** — `public/imagery/README.md` documents this explicitly and calls for the silhouette to be swapped for real aerial photography of the two bases when supplied, while the targeting-frame chrome stays. Documenting this distinction is load-bearing: SatelliteReach's real imagery and GlobalReach's drawn stand-in sit one section apart and must not be conflated as the same class of asset.

### Capabilities split-flap reveal (signature behavior)
Each capability row enters with a `rotateX(-70deg)` flip from a top-center transform origin, staggered per row. Rows now also carry an optional inline `TechIcons` marker before the capability name, and the Multi-Platform Social Media Monitoring row carries the `PlatformIcons` row beneath its description.

### CTA signature-stroke (signature component)
A single hand-drawn bezier stroke rendered as SVG, drawn on scroll via `stroke-dashoffset` animation — the blueprint's closing "signature," styled in `--line-bright`, paired with the form and the real `P32Star`/`P32Wordmark` marks as the confidential-inquiry closing block.

## Do's and Don'ts

### Do:
- **Do** keep every non-neutral color a shade of the single pale-blue line hue (`--line` / `--line-bright` / `--line-on-paper`) — see the One-Hue Rule.
- **Do** render diagrams, plans, and frames as drawn line-work (stroke, dash, coordinate labels) rather than icon tiles, glass panels, or dashboard widgets.
- **Do** keep every corner and border at 0px radius; the system is rectilinear throughout, aside from drawn point-markers (node/waypoint dots).
- **Do** reserve JetBrains Mono for labels, coordinates, and annotation — never body paragraphs.
- **Do** apply the shared grain texture at its fixed value (0.05 opacity, overlay blend) to every new section — see the Grain Rule — rather than a bespoke per-section texture.
- **Do** respect `prefers-reduced-motion` on every scroll-triggered, mount-triggered, or continuous/ambient animation (every component in this system, including the new pointer-parallax and idle-loop devices, gates its GSAP work behind `useReducedMotion`).
- **Do** keep real photography and drawn placeholders honestly distinguished in both code comments and `public/imagery/README.md` when they sit near each other, as SatelliteReach and GlobalReach do.

### Don't:
- **Don't** introduce a second accent hue, including in imagery moments — GlobalReach's horizon-glow is desaturated warm-white and its vignette is neutral black, not a new color.
- **Don't** add drop shadows, ambient glows, or backdrop-blur glass panels as a decorative default; the one `backdrop-blur-sm` in the system is functional (scrolled-nav legibility), not aesthetic.
- **Don't** default to icon-tile or card-grid layouts for content that can be drawn as a diagram, table, or annotated list instead; the two icon systems introduced this pass are inline markers next to text, not a switch to icon-tile cards.
- **Don't** fill icon glyphs with solid color outside the one confirmed exception (real third-party platform marks in `PlatformIcons.tsx`) — the system's own `TechIcons` stay stroke-only.
- **Don't** treat the Archivo display fallback as the intended system typeface — it is a documented interim substitution for unlicensed Key Grotesk files (`public/fonts/README.md`), not a design decision to preserve once the licensed files land. Unresolved carryover from the prior build; this pass did not touch font licensing.
