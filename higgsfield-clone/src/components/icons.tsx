import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number, props: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const IconDiamond = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M6 4h12l3 5-9 11L3 9z" />
    <path d="M3 9h18" />
  </svg>
);

export const IconSparkle = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7z" />
  </svg>
);

export const IconSparkleFill = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, { ...p, fill: "currentColor", stroke: "none" })}>
    <path d="M12 2c.7 4.9 3.1 7.3 8 8-4.9.7-7.3 3.1-8 8-.7-4.9-3.1-7.3-8-8 4.9-.7 7.3-3.1 8-8z" />
    <path d="M19 15c.3 1.9 1.1 2.7 3 3-1.9.3-2.7 1.1-3 3-.3-1.9-1.1-2.7-3-3 1.9-.3 2.7-1.1 3-3z" />
  </svg>
);

export const IconGlobe = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
  </svg>
);

export const IconArrowUpRight = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const IconCheck = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="m5 12 4.5 4.5L19 7" />
  </svg>
);

export const IconClose = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconPlus = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMinus = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M5 12h14" />
  </svg>
);

export const IconAt = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <circle cx="12" cy="12" r="3.5" />
    <path d="M15.5 12v1.5a2.5 2.5 0 0 0 5 0V12a8.5 8.5 0 1 0-3.3 6.7" />
  </svg>
);

export const IconChevronRight = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const IconChevronDown = ({ size = 12, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconFrame = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M4 9V5h4M20 9V5h-4M4 15v4h4M20 15v4h-4" />
  </svg>
);

export const IconVideo = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="3" y="6" width="13" height="12" rx="2" />
    <path d="m16 10 5-3v10l-5-3" />
  </svg>
);

export const IconImage = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="9" cy="10" r="2" />
    <path d="m21 16-5-5-9 9" />
  </svg>
);

export const IconMusic = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M9 18V5l11-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="17" cy="16" r="3" />
  </svg>
);

export const IconBars = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M5 20V10M10 20V4M15 20v-7M20 20V8" />
  </svg>
);

export const IconFilm = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
  </svg>
);

export const IconCpu = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
  </svg>
);

export const IconStar = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />
  </svg>
);

export const IconGift = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="3" y="8" width="18" height="5" rx="1" />
    <path d="M5 13v8h14v-8M12 8v13M12 8S10.5 3 8 4s.5 4 4 4zm0 0s1.5-5 4-4-.5 4-4 4z" />
  </svg>
);

export const IconClock = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const IconRatio = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="6" y="3" width="12" height="18" rx="2" />
  </svg>
);

export const IconFolder = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

export const IconBook = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M3 5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v16a2 2 0 0 0-2-2H3zM21 5a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2v16a2 2 0 0 1 2-2h7z" />
  </svg>
);

export const IconPencil = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M4 20h4L19 9l-4-4L4 16z" />
  </svg>
);

export const IconSpeaker = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M4 10v4h4l5 4V6L8 10zM17 9a4 4 0 0 1 0 6" />
  </svg>
);

export const IconWave = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M3 12h2l2-5 3 10 3-14 3 14 2-5h3" />
  </svg>
);

export const IconHome = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, { ...p, fill: "currentColor", stroke: "none" })}>
    <path d="M12 3 3 10v10a1 1 0 0 0 1 1h5v-6h6v6h5a1 1 0 0 0 1-1V10z" />
  </svg>
);

export const IconUsers = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6" />
  </svg>
);

export const IconUser = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="10" r="3" />
    <path d="M6.5 18.5a6.5 6.5 0 0 1 11 0" />
  </svg>
);

export const IconInstagram = ({ size = 24, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

export const IconLayers = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </svg>
);

export const IconMotion = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <circle cx="12" cy="12" r="8" />
    <path d="M8 12h8M13 9l3 3-3 3" />
  </svg>
);

export const IconGlobeLock = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3.5 9h17M3.5 15h17M12 3c-3 3-3 15 0 18M12 3c3 3 3 15 0 18" />
  </svg>
);

export const IconMapPin = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const IconBox = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z" />
    <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
  </svg>
);

export const IconShuffle = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
  </svg>
);

export const IconInfo = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v6M12 7.5v.5" />
  </svg>
);

export const IconFilter = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M4 6h16M7 12h10M10 18h4" />
  </svg>
);

export const IconHeart = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-4 5 5 0 0 1 9 4c-2 4.6-9 9-9 9z" />
  </svg>
);

export const IconExpand = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

export const IconSidebar = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M9 4v16" />
  </svg>
);

export const IconScan = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconGrid = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="4" y="4" width="7" height="7" rx="1" />
    <rect x="13" y="4" width="7" height="7" rx="1" />
    <rect x="4" y="13" width="7" height="7" rx="1" />
    <rect x="13" y="13" width="7" height="7" rx="1" />
  </svg>
);

export const IconTrend = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="m3 17 6-6 4 4 8-8M15 7h6v6" />
  </svg>
);
