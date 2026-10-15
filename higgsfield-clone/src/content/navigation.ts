import { brand } from "../config/brand";

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly badge?: "New" | "Top";
  readonly separatorBefore?: boolean;
}

const p = brand.products;

// Order and grouping observed in the original header (REA accessibility capture).
export const mainNav: readonly NavItem[] = [
  { label: "Explore", href: "/" },
  { label: "Image", href: "/ai/image" },
  { label: "Video", href: "/ai/video" },
  { label: "Audio", href: "/audio" },
  { label: "MCP", href: "/mcp" },
  { label: "API", href: "/api", badge: "New" },
  {
    label: p.swap,
    href: "/reality-swap",
    badge: "Top",
    separatorBefore: true,
  },
  { label: p.cut, href: "/quick-cut", badge: "New" },
  { label: "AI Influencer", href: "/ai-influencer", badge: "New" },
  { label: "ChatGPT Plugin", href: "/mcp?tab=chatgpt" },
  { label: "Ads Studio", href: "/ads-studio", badge: "New" },
  { label: "Effects", href: "/effects" },
  { label: "Cinema Studio", href: "/cinema-studio" },
  { label: "Contests", href: "/contests" },
  { label: "Marketing Studio", href: "/marketing-studio" },
  { label: p.agent, href: "/agent" },
  { label: p.scenes3d, href: "/3d", badge: "New" },
  { label: "Edit", href: "/edit" },
  { label: "Academy", href: "/academy" },
  { label: "Community", href: "/community" },
  { label: "Plugins", href: "/plugins" },
  { label: "Canvas", href: "/canvas" },
  { label: "Originals", href: "/originals" },
];

export interface FooterColumn {
  readonly title: string;
  readonly links: readonly string[];
}

// Footer columns: two stacked groups per grid column, as in the original layout.
export const footerColumns: readonly (readonly FooterColumn[])[] = [
  [
    {
      title: "Create",
      links: [
        "AI Video",
        "AI Image",
        "Edit Image",
        "Inpaint",
        "Upscale",
        "Video Upscale",
        "Mixed Media",
        "AI Face Swap",
        "AI Influencer",
        "Apps",
      ],
    },
  ],
  [
    {
      title: "Video Models",
      links: [
        "Seedance 2.5",
        "Seedance 2.0",
        "Kling 3.0",
        "Sora 2 Introduction",
        "Veo 3.1 Introduction",
        "WAN 2.6",
        "Grok Imagine 1.5",
        "Gemini Omni Flash",
      ],
    },
    {
      title: "Image Models",
      links: [
        "Nano Banana",
        "Flux 2",
        "Seedream 5",
        "GPT Image 2",
        "Ideogram 4.5",
      ],
    },
  ],
  [
    {
      title: "Studios",
      links: [
        "Cinema Studio",
        "Marketing Studio",
        "Lipsync Studio",
        `${p.photoSeries} Studio`,
        "Fashion Factory",
        p.storyboard,
        `${brand.name} Canvas`,
      ],
    },
    {
      title: p.photoModel,
      links: [
        `${p.photoModel} 2.0`,
        `${p.photoModel} ID Character`,
        `${p.photoModel} Cinema`,
      ],
    },
  ],
  [
    {
      title: "Platform",
      links: [
        p.agent,
        "AI Motion Designer",
        "MCP/CLI",
        "API",
        "Collab",
        "Games",
        "Reference Extension",
      ],
    },
    {
      title: "Resources",
      links: ["Blog", "Creator Hub", "Help Center", "Academy", "Prompt Guide"],
    },
  ],
  [
    {
      title: "Company",
      links: [
        "About",
        "Trust",
        "Enterprise",
        "Team",
        "Pricing",
        "Careers",
        "Contact",
      ],
    },
    {
      title: "Community",
      links: ["Community", "Contests", "Creative Partners"],
    },
  ],
];

export const legalLinks = [
  "Help center",
  "Cookie Notice",
  "Cookie Settings",
  "Terms",
  "Privacy",
] as const;
