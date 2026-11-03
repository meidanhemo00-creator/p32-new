# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router), TypeScript, and Tailwind CSS. GSAP with ScrollTrigger, used only where it materially improves the experience — not as a default animation layer. No generic component library; the visual system is built specifically for P32 Sentinel. Build path is code-first (confirmed with the user): no comp/image stage, build directly from the direction contract established in `shape`.

## Users

Primary visitor: a principal, family-office decision-maker, senior executive, board member, chief of staff, security director, or trusted advisor responsible for protecting a high-profile individual, family, organization, or portfolio of global assets.

They arrive needing to determine:
- Whether P32 can see and manage risk across their entire ecosystem (people, residences, travel, digital exposure, corporate structures, assets, infrastructure, global operations).
- Why an integrated security architecture outperforms multiple fragmented providers.
- Whether P32 has the intelligence, operational experience, discretion, and global capability their level of exposure requires.
- How to begin a confidential engagement.

## Product Purpose

P32 Sentinel is a premium intelligence-and-security marketing landing page for Project 32 Ltd (P32), built to generate qualified, confidential inquiries and consultation requests from individuals, families, family offices, corporations, executives, and organizations with complex global exposure.

Success is measured by qualified confidential contact/consultation requests initiated by the decision-makers described above — not general traffic, newsletter signups, or self-serve conversion.

## Positioning

P32 does not sell disconnected security services. It designs and operates a unified, intelligence-led security architecture across people, residences, travel, digital exposure, corporate structures, assets, infrastructure, and global operations — full-spectrum control rather than fragmented coverage.

Differentiators, as stated in source material:
- **Unified Security Architecture** — not fragmented services.
- **Intelligence-Led Approach** — proactive, not reactive.
- **Discreet Integration** — built into the client's life and operations, not imposed on them.
- **Global Capability** — across jurisdictions, assets, and environments.

Credibility basis: P32 is an Israeli intelligence and security firm, licensed and supervised by the Israeli Ministry of Defense, operating under DECA licensing exported from the Israeli MoD. The team is composed of former senior officers from Israel's elite and trusted units — including the Knesset Guard, Shin Bet, Military Intelligence (Aman), and special operations forces — with operational experience across Israel, the United States, and Europe. P32 operates across the United States, with established bases in Miami and New York enabling national reach and direct, on-the-ground execution in critical markets.

Anchor line for the narrative (use where it earns its place): **"Security is not a service. It is an infrastructure."**

## Operating Context

**Opening screen:** the site opens on a restrained, white/off-white cover screen (`app/components/Cover.tsx`) that translates the source PDF's own title page literally — P32 identity, "Licensed and supervised by the Israeli Ministry of Defense," "Security Architecture" and "For Individuals, Families, Corporations & Global Assets," in minimal black typography with one pale-blue rule as the only color detail. It scroll-transitions into the dark "A Different Category of Risk" section below, which carries the full operating-reality list. This cover is a document coming to life, not a generic marketing hero — keep it distinct from the Hero network-diagram section that follows.

The visitor's operating reality is the premise of the whole narrative: they are not managing one environment but operating across multiple jurisdictions, corporate structures and investments, real estate portfolios, public visibility and private exposure, and a network of family members, advisors, employees, and third parties. Each added layer expands footprint and introduces risk, and these layers are rarely unified under a single security architecture.

Note: real estate portfolios was briefly removed from the visitor-facing surface at the user's request, then restored on further client review — it is essential to the opening section's meaning per the source PDF and stays in permanently. Treat this list as the fixed, complete operating-reality list going forward; do not remove any item from it again without a fresh explicit instruction.

Risk, per source material, rarely enters through obvious channels — it enters through people, access, and information gaps across the visitor's extended network of advisors, vendors, partners, contractors, and extended networks.

Engagement model: P32 works with a limited number of principals and organizations. Each engagement is fully customized, intelligence-driven, and built for long-term control rather than temporary coverage.

## Capabilities and Constraints

**Four core service pillars** (source: the Security Architecture PDF):

**Binding (2026-11-03):** the client asked to remove all "high-net-worth" / "ultra-high-net-worth" / UHNW wording from the site. Never put it back in copy or metadata.

1. **Principal & Family Protection** — executive protection strategy and deployment; family risk mapping (residences, travel, routines); discreet lifestyle security integration; exposure reduction across digital and physical domains.
2. **Corporate & Organizational Security** — internal threat and access vulnerability audits; employee, contractor, and vendor risk assessment; insider risk mitigation and control frameworks; crisis management and continuity planning.
3. **Asset & Infrastructure Protection** — multi-property and estate security architecture; commercial asset and facility risk design; global travel and movement security planning; secure logistics and operational movement.
4. **Intelligence & Risk Oversight** — strategic intelligence briefings; reputation and exposure monitoring; threat identification before it materializes; ongoing risk visibility across all environments.

**Protective Canine Training & Deployment** — specialist training, integration, and operational use of protection dogs as part of layered personal, residential, estate, and site-security programs. Presented as a standalone capability with its own major visual moment (`app/components/Canine.tsx`), positioned directly after the four core pillars. No certifications, breeds, or performance numbers are invented — copy stays at the level of specificity the source material supports.

**Expanded intelligence, cyber, monitoring, and operational capability domains** (source: Materials for Guy Landing Page), presented exclusively as P32 capabilities and grouped, on-site, into three named clusters that mirror how the work actually runs (`app/components/Capabilities.tsx`):

- **Digital Intelligence & Monitoring** — watching what the public, the press, and hostile actors see: Multi-Platform Social Media Monitoring (continuous collection across TikTok, Facebook, X/Twitter, Instagram, YouTube, and Reddit, in every relevant language), Executive Protective Monitoring, Impersonation Detection, Narrative & Sentiment Tracking, Reputation Analysis.
- **Threat & Operational Intelligence** — seeing threats and movement risk before they materialize: Travel & Event Intelligence, Threat Actor Profiling, Dark Web & Leaks, Rapid Escalation Support, Intelligence Reporting.
- **Cyber & Security Testing** — testing the architecture the way an adversary would: Penetration Testing, Red Team Simulation, Extended Infrastructure Testing, Security Posture Assessment, Face Recognition, Team Enablement & Training.

This expanded intelligence section is a major full-width part of the site immediately after the core pillars — not a small add-on — using progressive per-row disclosure and, for the social-media row, real recognizable platform marks rather than a generic SaaS card grid.

**Constraints:**

- Preserve factual and regulatory claims exactly as supported by the two source documents (Israeli MoD licensing/supervision, DECA licensing, unit affiliations, Miami/NY bases) — do not soften, embellish, or generalize them.
- Do not invent clients, case studies, testimonials, metrics, certifications, locations, or capabilities not present in the source material.
- Guy Farache's direct phone number (786-979-1402) and the "This communication is strictly confidential and intended solely for its recipient" footer text stay unpublished unless explicitly approved by the user. Direct contact emails (Guy@p32.Ltd, Meredith@p32.Ltd) were explicitly approved by the user and are published in the CTA section's "Direct Contact" block, alongside the confidential inquiry form rather than instead of it.
- Build for responsive web across desktop, tablet, and mobile.
- Prioritize accessibility and readability, including under the dark, high-contrast visual direction below. Motion must respect `prefers-reduced-motion`.
- The site must stay fast (performance-conscious asset and animation choices), not just visually striking.
- The site must feel custom-designed, not template-based.
- The primary conversion goal is a qualified, confidential inquiry/consultation request — not e-commerce or self-serve signup.
- Content must read as a strategic marketing narrative, not a pasted service catalog. Narrative arc to build toward: (1) the visitor operates across multiple interconnected environments → (2) fragmentation creates gaps → (3) P32 unifies physical security, intelligence, cyber, reputation, travel, people, assets, and infrastructure under one architecture → (4) intelligence-led approach identifies threats before they materialize → (5) team, licensing, global reach, and operational background establish credibility → (6) engagement is selective, customized, discreet, long-term → (7) confidential-contact CTA.
- The brand brief and supplied source material override any generic recommendation from installed design skills where the two conflict.

## Brand Commitments

- Name: **P32. Sentinel** (confirmed by the user as the visitor-facing product name; the parent entity is Project 32 Ltd / P32).
- Tagline: "Intelligence. Security. Peace of mind."
- Logo: real client-supplied assets — the "P32" wordmark and a four-point star/spark mark (matching the source PDF header) — inlined as `app/components/P32Mark.tsx` (`P32Wordmark`, `P32Star`), sourced from `public/brand/*-source.svg`. The star mark also serves as the site favicon (`app/icon.svg`).
- "Licensed and supervised by the Israeli Ministry of Defense" is stated prominently in source material and is a binding factual claim to preserve.
- Founder: Guy Farache, Co-Founder — name may be used; direct contact details are restricted per Capabilities and Constraints.
- **Visual direction (binding, overrides generic skill defaults on conflict):** premium, controlled, discreet, intelligence-led, technologically advanced, operationally credible, slightly more combat-forward than a conventional corporate security site. Predominantly black-and-white visual system with restrained pale-blue accents, brought back slightly stronger on client review — in diagram/network lines, hover and active states, technical annotations, section transitions, image overlays, and icons/data markers — while black-and-white stays dominant. Sophisticated visual references: executive protection (suits, earpieces, discreet communication, arrival/departure movement, vehicle and venue transitions, back/profile/low-angle perspectives — never staged smiling stock-photo poses), combat/soldier and elite-operator imagery for team/credibility narrative (cinematic, black-and-white with selective pale-blue overlay, focus on movement/equipment/silhouettes/readiness rather than faces or a recruitment-page feel), intelligence and technology visuals (secure systems, satellite imagery, global movement, social-media monitoring, command environments — never hooded-hacker clichés, neon cyber imagery, or fake sci-fi dashboards), and protective-canine operational imagery. Explicitly avoid: generic cybersecurity visuals, neon hacker clichés, excessive blue gradients, sci-fi interfaces, military cosplay, aggressive red accents, video-game aesthetic.
- Design should avoid placing everything inside cards; favor strong typography, disciplined spacing, sharp hierarchy, large-scale imagery, subtle data/intelligence overlays, controlled motion, and meaningful interactive moments.
- **Tone:** concise, intelligent, confident, controlled. Avoid inflated marketing language, empty security slogans, fearmongering, and generic AI-style copy.
- Anchor line to use where it earns its place: "Security is not a service. It is an infrastructure."
- **Typography system (confirmed):**
  - **Key Grotesk** — primary display typeface for major headlines, section titles, and high-impact statements. Licensed font files are not yet available; scaffold a local `@font-face` structure under `/public/fonts` with a clearly labeled location for the user to drop in the licensed files, and use a temporary fallback only during development without replacing the intended direction elsewhere in the type scale.
  - **Inter** — body copy, navigation, buttons, forms, and any longer text requiring maximum readability.
  - **JetBrains Mono** — labels, metadata, capability names, coordinates, technical details, and intelligence-style annotations only. A controlled technical accent, not for long paragraphs or overuse.
  - Overall feel: premium, precise, editorial, intelligence-led.
- **Experience direction (confirmed):** cinematic and high-end but restrained and credible. Favor large-scale visual moments over small image cards. Build a coherent visual language around intelligence networks, global exposure, surveillance, executive movement, and layered protection. Avoid excessive cards, pills, floating glass panels, gradients, glowing effects, decorative dashboards, and generic security iconography as the primary visual language. Motion must communicate scanning, connection, tracking, coordination, and control — never decoration for its own sake — and must respect `prefers-reduced-motion`.
- All capabilities are presented exclusively as P32 capabilities — no internal source labels or codenames anywhere in visitor-facing copy, labels, comments, metadata, alt text, or content objects.

## Evidence on Hand

- Two source documents are the sole factual basis for this build:
  - `Security Architecture for Ultra-High-Net-Worth (1) (1).pdf` — positioning, audience, four core service pillars, differentiators, credentials, licensing, team background, engagement model.
  - `Materials for Guy Landing Page.docx` — sixteen expanded intelligence, cyber, monitoring, penetration-testing, and operational capability domains.
- No testimonials, client names, case studies, press mentions, or quantitative metrics were supplied. Future work must not fabricate any of these.
- Guy's direct phone number (786-979-1402) is withheld from publication. Email contact (Guy@p32.Ltd, Meredith@p32.Ltd) is published in the CTA section per explicit user approval; the confidential-inquiry form remains the primary path alongside it.
- No client-supplied photography of the client's own operations (Miami/New York bases, personnel, facilities) has been provided. That gap is filled with a deliberate drawn placeholder (`GlobalReach.tsx`) rather than a stock photo or broken URL, documented in `public/imagery/README.md`.
- Real photographic assets in use: NASA's public-domain "Blue Marble"/"Black Marble" Earth imagery (`public/imagery/`), and a client-approved selection from a Google Drive folder of stock/editorial photography, downloaded locally, renamed semantically, cropped, and lightly treated under `public/images/p32/` — executive-protection movement (arrival/departure, earpiece detail), protective-canine handler and team-operation imagery, and an operator/night-vision editorial plate used in Credibility. Sourcing, processing, and the images held in reserve (not placed) are documented in `public/images/p32/README.md`. Any other imagery must align to the visual direction above without implying capabilities or claims beyond what's documented.
- Key Grotesk font files are not yet available; the project is scaffolded to accept them under `/public/fonts` (see Brand Commitments) rather than substituting a different intended display face long-term.

## Product Principles

1. Lead with the visitor's fragmentation-as-risk reality and resolve it with unified architecture — do not open with a service list.
2. Every factual and capability claim stays traceable to the two source documents; credibility comes from restraint and specificity, not embellishment.
3. Discretion is a design value, not just a copy point — the CTA path itself must feel confidential and selective, not like a generic contact form.
4. Visual authority reads as elite operator, not vendor — precedence over conventional SaaS/security-startup conventions when the two pull in different directions.
5. The brand brief is binding: where it conflicts with generic installed-design-skill defaults, the brief wins.

## Accessibility & Inclusion

Accessibility and readability are explicit product requirements. The combat-forward, predominantly black-and-white visual direction must still meet contrast and readability standards — dark, high-density design choices cannot come at the cost of legibility for the target executive/advisor audience.
