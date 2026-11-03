"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useGsap } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/lib/useReducedMotion";
import { P32Star, P32Wordmark } from "./P32Mark";
import { Grain } from "./Grain";

const INQUIRY_TYPES = [
  "Principal & Family Protection",
  "Corporate & Organizational Security",
  "Asset & Infrastructure Protection",
  "Intelligence & Risk Oversight",
  "Threat Briefing for Your Organization",
  "Community & Institutional Security",
  "Cyber Intelligence & Exposure",
  "Other / Not yet sure",
];

const INQUIRY_ENDPOINT = "https://formsubmit.co/ajax/Guy@p32.Ltd";

type Status = "idle" | "submitting" | "submitted" | "mailto";

export function CTA() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { gsap, ScrollTrigger } = useGsap();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const path = root.querySelector<SVGPathElement>("[data-signature]");
    if (reducedMotion || !path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 70%", once: true },
    });
    tl.to(path, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === root) st.kill();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!data.get("name") || !data.get("email") || !data.get("message")) {
      setError("Name, email, and a brief message are required.");
      return;
    }

    setError(null);
    setStatus("submitting");
    // Inquiries go straight to Guy's inbox via FormSubmit (no backend to run).
    // The first submission sends Guy a one-time activation email.
    data.append("_subject", `Confidential inquiry - ${data.get("name")}`);
    data.append("_template", "table");
    data.append("_replyto", String(data.get("email")));
    // If the service is slow or down, fall back to a pre-filled email so no
    // inquiry is lost.
    const body = ["name", "organization", "role", "email", "phone", "inquiryType", "message"]
      .map((key) => `${key}: ${data.get(key) ?? ""}`)
      .join("\n");
    try {
      const res = await fetch(INQUIRY_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("submitted");
    } catch {
      window.location.href = `mailto:Guy@p32.Ltd?subject=${encodeURIComponent(
        `Confidential inquiry - ${data.get("name")}`,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
    }
  }

  return (
    <section id="inquiry" className="relative overflow-hidden bg-ink px-6 py-28 sm:px-10 sm:py-36">
      <Grain />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
        aria-hidden
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="cta-grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="var(--line)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-grid)" />
      </svg>

      <div ref={rootRef} className="relative mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="font-display max-w-lg text-[2.25rem] font-medium leading-[1.1] tracking-[-0.01em] text-white sm:text-[3rem]">
            If it is not designed intentionally, it is already fragmented.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed" style={{ color: "var(--white-soft)" }}>
            Engagements are limited, confidential, and can begin with a threat
            briefing for your organization. Submit the form below, or reach
            the team directly.
          </p>

          <div className="mt-8 flex flex-col gap-1.5">
            <span className="font-mono text-xs tracking-[0.08em]" style={{ color: "var(--line)" }}>
              DIRECT CONTACT
            </span>
            <a
              href="mailto:Guy@p32.Ltd"
              className="text-base text-white transition-colors hover:text-[var(--line-bright)]"
            >
              Guy@p32.Ltd
            </a>
            <a
              href="mailto:Meredith@p32.Ltd"
              className="text-base text-white transition-colors hover:text-[var(--line-bright)]"
            >
              Meredith@p32.Ltd
            </a>
          </div>

          <svg width="220" height="64" viewBox="0 0 220 64" className="mt-14" aria-hidden>
            <path
              data-signature
              d="M6 44 C 30 10, 46 10, 58 34 C 68 54, 82 54, 92 30 C 100 12, 112 12, 118 30 C 124 46, 140 46, 150 26 C 158 10, 176 8, 186 24 C 192 34, 200 30, 214 18"
              fill="none"
              stroke="var(--line-bright)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div className="flex items-center gap-2.5">
            <P32Star className="h-3.5 w-3.5" style={{ color: "var(--line)" }} />
            <P32Wordmark className="h-3 w-auto" style={{ color: "var(--line)" }} />
            <span className="font-mono text-xs tracking-[0.1em]" style={{ color: "var(--line)" }}>
              Sentinel · Project 32 Ltd
            </span>
          </div>
        </div>

        <div className="border p-6 sm:p-8" style={{ borderColor: "var(--hairline-dark)" }}>
          {status === "mailto" ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
              <p className="font-display text-xl font-medium text-white">One more step.</p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed" style={{ color: "var(--white-soft)" }}>
                Your email app has opened with the inquiry ready to send. If it
                did not, please write to Guy@p32.Ltd directly.
              </p>
            </div>
          ) : status === "submitted" ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
              <p className="font-display text-xl font-medium text-white">Inquiry received.</p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed" style={{ color: "var(--white-soft)" }}>
                Your message has reached the P32 team directly and
                confidentially. We will be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="name" required autoComplete="name" />
                <Field label="Organization / community" name="organization" autoComplete="organization" />
                <Field label="Role" name="role" autoComplete="organization-title" />
                <Field label="Email" name="email" type="email" required autoComplete="email" />
                <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
                <div>
                  <label
                    htmlFor="inquiry-type"
                    className="font-mono text-xs tracking-[0.08em]"
                    style={{ color: "var(--line)" }}
                  >
                    AREA OF INQUIRY
                  </label>
                  <select
                    id="inquiry-type"
                    name="inquiryType"
                    className="mt-2 w-full border bg-transparent px-3 py-2.5 text-sm text-white"
                    style={{ borderColor: "var(--hairline-dark)" }}
                    defaultValue={INQUIRY_TYPES[INQUIRY_TYPES.length - 1]}
                  >
                    {INQUIRY_TYPES.map((option) => (
                      <option key={option} value={option} className="bg-ink">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="font-mono text-xs tracking-[0.08em]"
                  style={{ color: "var(--line)" }}
                >
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="mt-2 w-full border bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/30"
                  style={{ borderColor: "var(--hairline-dark)" }}
                  placeholder="A brief, confidential description of your situation."
                />
              </div>

              {error && (
                <p role="alert" className="mt-4 text-sm" style={{ color: "var(--line-bright)" }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-8 w-full border border-white/80 py-3.5 font-mono text-xs tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-ink disabled:opacity-50"
              >
                {status === "submitting" ? "SENDING…" : "SUBMIT CONFIDENTIAL INQUIRY"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="font-mono text-xs tracking-[0.08em]" style={{ color: "var(--line)" }}>
        {label.toUpperCase()}
        {required && " *"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 w-full border bg-transparent px-3 py-2.5 text-sm text-white"
        style={{ borderColor: "var(--hairline-dark)" }}
      />
    </div>
  );
}
