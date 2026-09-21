import { P32Star, P32Wordmark } from "./P32Mark";

export function Footer() {
  return (
    <footer className="border-t bg-ink px-6 py-10 sm:px-10" style={{ borderColor: "var(--hairline-dark)" }}>
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <P32Star className="h-3.5 w-3.5" style={{ color: "var(--line)" }} />
          <P32Wordmark className="h-3 w-auto" style={{ color: "var(--white-soft)" }} />
          <p className="font-mono text-xs tracking-[0.1em]" style={{ color: "var(--white-soft)" }}>
            Sentinel · Project 32 Ltd - INTELLIGENCE. SECURITY. PEACE OF MIND.
          </p>
        </div>
        <p className="font-mono text-xs tracking-[0.1em]" style={{ color: "var(--white-faint)" }}>
          LICENSED AND SUPERVISED BY THE ISRAELI MINISTRY OF DEFENSE
        </p>
      </div>
    </footer>
  );
}
