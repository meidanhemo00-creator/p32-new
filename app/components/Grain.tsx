/**
 * Restrained film-grain overlay — the material system's shared texture,
 * used on every section (dark and paper) so the whole page has one
 * consistent, tactile ground rather than flat vector color.
 */
export function Grain({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: "url(/textures/grain.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
        opacity: 0.05,
        mixBlendMode: "overlay",
      }}
    />
  );
}
