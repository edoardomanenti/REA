import { brand } from "../config/brand";

// Placeholder mark. Swap this SVG for your own logo.
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label={brand.name}
    >
      <rect width="32" height="32" rx="8" fill="#ffffff" />
      <path
        d="M16 6.5 25.5 24h-19Z"
        fill="none"
        stroke="#0f1113"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path d="M16 6.5V24" stroke="#0f1113" strokeWidth="2.6" />
    </svg>
  );
}

export function LogoBadge({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="16" fill="#d1fe17" />
      <path
        d="M16 8 23.5 22h-15Z"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
