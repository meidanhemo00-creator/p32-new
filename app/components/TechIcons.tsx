import type { CSSProperties, ReactNode } from "react";

/**
 * Custom technical icon set, drawn in the page's own vocabulary — thin
 * line weight, circles, crosshair ticks, corner brackets, dashed vs solid
 * distinctions — rather than a generic icon library. One viewBox, one
 * stroke weight, one corner treatment throughout.
 */

type IconProps = { className?: string; style?: CSSProperties; title: string };

function Icon({ className, style, title, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={title}
    >
      {children}
    </svg>
  );
}

export function ExecutiveProtectionIcon(props: Omit<IconProps, "title">) {
  return (
    <Icon title="Executive protection" {...props}>
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="8" strokeDasharray="1.5 3" />
    </Icon>
  );
}

export function TravelIntelligenceIcon(props: Omit<IconProps, "title">) {
  return (
    <Icon title="Travel intelligence" {...props}>
      <path d="M3.5 18.5 9 10l5.5 4L20.5 5" />
      <circle cx="3.5" cy="18.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="10" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="14" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="20.5" cy="5" r="1.1" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function InfrastructureIcon(props: Omit<IconProps, "title">) {
  return (
    <Icon title="Infrastructure protection" {...props}>
      <rect x="3.5" y="13" width="3.2" height="7.5" />
      <rect x="8.4" y="8.5" width="3.2" height="12" />
      <rect x="13.3" y="11" width="3.2" height="9.5" />
      <rect x="18.2" y="5" width="3.2" height="15.5" />
    </Icon>
  );
}

export function SecureNetworkIcon(props: Omit<IconProps, "title">) {
  return (
    <Icon title="Secure networks" {...props}>
      <path d="M6.5 7 17.5 7 12 17Z" />
      <circle cx="6.5" cy="7" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="7" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="17" r="1.6" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function ThreatMonitoringIcon(props: Omit<IconProps, "title">) {
  return (
    <Icon title="Threat monitoring" {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="M12 12 18 6" />
    </Icon>
  );
}

export function ImpersonationIcon(props: Omit<IconProps, "title">) {
  return (
    <Icon title="Impersonation detection" {...props}>
      <circle cx="9" cy="12" r="6" />
      <circle cx="15" cy="12" r="6" strokeDasharray="1.5 2.6" />
    </Icon>
  );
}

export function DarkWebIcon(props: Omit<IconProps, "title">) {
  return (
    <Icon title="Dark-web exposure" {...props}>
      <rect x="4.5" y="3.5" width="15" height="17" />
      <path d="M4.5 9.5h15" />
      <path d="M4.5 15h15" strokeDasharray="1.2 2.4" />
    </Icon>
  );
}

export function PenetrationTestIcon(props: Omit<IconProps, "title">) {
  return (
    <Icon title="Penetration testing" {...props}>
      <path d="M17 4v16" />
      <path d="M2.5 12h16" />
      <path d="M14.5 8.5 18.5 12l-4 3.5" />
    </Icon>
  );
}

export function FaceRecognitionIcon(props: Omit<IconProps, "title">) {
  return (
    <Icon title="Face recognition" {...props}>
      {/* Sharp corner brackets — the same targeting-frame device as GlobalReach */}
      <path d="M4 8.5V4.5h4" />
      <path d="M20 8.5V4.5h-4" />
      <path d="M4 15.5v4h4" />
      <path d="M20 15.5v4h-4" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function SatelliteIcon(props: Omit<IconProps, "title">) {
  return (
    <Icon title="Satellite and global intelligence" {...props}>
      <circle cx="11" cy="13" r="6" />
      <path d="M5.3 11.3c1.7 1.1 3.6 1.7 5.7 1.7s4-.6 5.7-1.7" />
      <path d="M11 7v12" />
      <circle cx="19.5" cy="6.5" r="1.3" fill="currentColor" stroke="none" />
      <path d="M17.3 8.7 15.5 10.5" />
    </Icon>
  );
}
