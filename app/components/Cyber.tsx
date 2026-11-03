/**
 * Cyber Intelligence & Exposure - a short pointer to the dedicated cyber
 * site (cyber.p32.ltd). Kept deliberately small: one band, no imagery.
 */
export function Cyber() {
  return (
    <section id="cyber" className="relative bg-paper px-6 py-20 text-black sm:px-10 sm:py-28">
      <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <p className="font-mono text-xs tracking-[0.14em]" style={{ color: "var(--line-on-paper)" }}>
            CYBER INTELLIGENCE &amp; EXPOSURE
          </p>
          <h2 className="font-display mt-4 text-balance text-[2rem] font-medium leading-[1.15] tracking-[-0.01em] sm:text-[2.75rem]">
            The threat often starts online.
          </h2>
        </div>
        <div className="lg:pt-8">
          <p className="max-w-xl text-lg leading-relaxed" style={{ color: "var(--black-soft)" }}>
            Leaked personal details, hostile campaigns, and impersonation of
            leaders and institutions are often the first sign of a physical
            threat. P32&rsquo;s cyber unit tracks the adversaries that target
            you, tests whether they can actually reach you, and tells you what
            to fix first.
          </p>
          <a
            href="https://cyber.p32.ltd"
            target="_blank"
            rel="noopener"
            className="mt-8 inline-block border-b border-black/40 pb-1 font-mono text-xs tracking-[0.12em] transition-colors hover:border-black"
          >
            CYBER.P32.LTD &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
