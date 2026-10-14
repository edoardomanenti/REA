import { brand } from "../config/brand";
import type { MediaSource } from "../components/Media";

// All homepage copy and media slots. Section order, counts and layout follow the
// original page (REA capture); text is placeholder copy you can rewrite freely.
// Set `media: { src, kind }` on any entry to show your own image or video.

const p = brand.products;

export interface HeroCard {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly media?: MediaSource;
}

export const heroCards: readonly HeroCard[] = [
  {
    title: "WAN 3.0 Unlimited",
    description: "Videos up to 30 seconds from text, image, video or audio",
    href: "/ai/video?model=wan_3_0",
  },
  {
    title: p.swap,
    description: "Upload once and get endless new versions",
    href: "/ai/video?model=reality_swap",
  },
  {
    title: `${p.swap} API`,
    description: "Motion transfer and object swap in a single call",
    href: "/api",
  },
  {
    title: p.cut,
    description: "Turn raw clips into sharp edits with one command",
    href: "/quick-cut",
  },
  {
    title: "Ads Studio: Ad Multiplier",
    description: "Recreate any ad with your products and characters",
    href: "/ads-studio",
  },
  {
    title: "Cinema Studio 4.0",
    description: "Direct cinematic scenes shot by shot",
    href: "/cinema-studio",
  },
  {
    title: "AI Influencer",
    description: "Design a character and give it a life",
    href: "/ai-influencer",
  },
];

export const signupPromo = {
  titleTop: "Sign up and get your",
  titleAccent: "extra discount",
  perks: [
    "Unlimited Nano Banana Pro",
    "Unlock your extra discount",
    "Access to Seedance 2.5",
  ],
  cta: "Sign up and get your discount",
  mobileCta: "Get your discount",
};

export interface FeatureCard {
  readonly title: string;
  readonly description: string;
  readonly icon: "bars" | "sparkle" | "swap" | "mcp" | "film" | "cpu";
  readonly tag?: "TOP" | "NEW";
  readonly chip?: string;
  readonly href: string;
}

export const featureCards: readonly FeatureCard[] = [
  {
    title: "Seedance 2.5",
    description: "The most advanced video model",
    icon: "bars",
    tag: "TOP",
    chip: "Video",
    href: "/ai/video?model=seedance_2_5",
  },
  {
    title: "AI Influencer",
    description: "Build your next hype machine",
    icon: "sparkle",
    tag: "NEW",
    href: "/ai-influencer",
  },
  {
    title: p.swap,
    description: "One video, many versions",
    icon: "swap",
    tag: "NEW",
    href: "/ai/video?model=reality_swap",
  },
  {
    title: `${brand.name} MCP for Claude`,
    description: "Generate images and videos in Claude",
    icon: "mcp",
    href: "/mcp",
  },
  {
    title: "Cinema Studio 4.0",
    description: "Create cinematic scenes effortlessly",
    icon: "film",
    href: "/cinema-studio",
  },
  {
    title: p.agent,
    description: "An agent for your whole creative stack",
    icon: "cpu",
    href: "/agent",
  },
];

export const influencerBanner = {
  pill: "Try Free",
  eyebrow: "AI Influencer",
  title: "Build your next hype machine",
  subtitle: "Pick the look. Add motion. Build hype.",
  cta: "Create your own AI Influencer",
};

export interface FilmCard {
  readonly title: string;
  readonly badge: "picks" | "shortlist";
  readonly media?: MediaSource;
}

export const festival = {
  name: `${brand.name} ${p.festival}`,
  title: ["Festival voting", "is now open"],
  prize: "Audience Choice · $100 000",
  deadline: Date.now() + (36 * 60 + 59) * 60 * 1000,
  cta: "Explore shortlist",
  films: [
    { title: "On Moonlit Night", badge: "picks" },
    { title: "Full-Time", badge: "picks" },
    { title: "Random Access", badge: "picks" },
    { title: "Toqborni", badge: "picks" },
    { title: "Roraima", badge: "picks" },
    { title: "The Playground", badge: "shortlist" },
    { title: "Velmora", badge: "shortlist" },
    { title: "The Seam", badge: "picks" },
    { title: "The Last Transmission", badge: "shortlist" },
    { title: "The Breach", badge: "picks" },
    { title: "Planet 47", badge: "shortlist" },
    { title: "The Tortoise and the Hare", badge: "shortlist" },
    { title: "To Nora", badge: "picks" },
    { title: "Welcome to the Team", badge: "picks" },
    { title: "Don't Poison Ivy", badge: "picks" },
    { title: "Hinderson", badge: "picks" },
  ] satisfies FilmCard[],
};

export const mcpSection = {
  title: ["Use ChatGPT", "agents", `with ${brand.name} MCP`],
  description:
    "Plan and make a creative project step by step with your agents in ChatGPT",
  cta: `Connect ${brand.name}`,
  agents: [
    "Cinematic Director",
    "Character Creator",
    "Motion Designer",
    "Content Lead",
  ],
};

export interface MasonryItem {
  readonly seed: string;
  readonly ratio: number;
  readonly title?: string;
  readonly tag?: string;
  readonly media?: MediaSource;
}

const effectNames = [
  "Incline",
  "Act natural",
  "Lacewalker",
  "Burning man",
  "Melting",
  "World morphing",
  "High flip",
  "Street colossus",
  "Selfception",
  "Cutout",
  "Floating fall",
  "Eyes in",
  "Wild ride",
  "Smash and grab",
  "Studio slide",
];
const effectRatios = [
  0.5635, 1.333, 0.5635, 0.5635, 0.5635, 0.75, 0.75, 0.5635, 1.333, 0.75,
  0.5635, 1.333, 0.75, 0.5635, 0.75,
];

export const visualEffects = {
  title: "Visual Effects",
  description:
    "Big-budget visual effects, from explosions to surreal transformations.",
  cta: "Try for free",
  more: "View all presets",
  items: effectNames.map((title, i) => ({
    seed: `vfx-${i}`,
    ratio: effectRatios[i] ?? 0.75,
    title,
  })) satisfies MasonryItem[],
};

const swapRatios = [
  1.78, 1.78, 0.5635, 0.5635, 1.78, 0.5635, 1.78, 0.5635, 1.78, 0.5635, 1.78,
  0.75, 1.78, 0.75, 1.78, 0.5635, 1.78, 0.75, 1.78, 1.78,
];

export const swapSection = {
  pill: "New model",
  title: p.swap,
  description:
    "Reality manipulation: transfer motion into new scenes, or swap details while everything else stays as filmed.",
  primary: "Start generating",
  secondary: "Learn more",
  more: "View all presets",
  items: swapRatios.map((ratio, i) => ({
    seed: `swap-${i}`,
    ratio,
    tag: i % 3 === 2 ? "Motion transfer" : "Objects swap",
  })) satisfies MasonryItem[],
};

export interface Gallery {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly tone: "dark" | "light" | "warm" | "cool" | "vivid";
  readonly items: readonly MasonryItem[];
}

const galleryPatterns = {
  video: [
    0.5635, 1.333, 1.78, 1.78, 1.78, 1.78, 1.78, 1.78, 1.78, 1.78, 1.333, 1.78,
    1.78, 0.75, 1.78, 1.78,
  ],
  grid: Array.from({ length: 16 }, () => 1.78),
  poster: [
    0.75, 1.78, 0.75, 1.78, 0.75, 1.333, 1.333, 0.75, 1.78, 0.75, 1.78, 1.333,
    0.75, 1.78, 1.333, 0.75,
  ],
  portrait: [
    0.5635, 0.75, 0.5635, 0.5635, 0.75, 0.75, 0.5635, 0.75, 0.75, 0.5635, 0.75,
    0.75, 0.5635, 0.75, 0.75, 0.5635,
  ],
} as const;

const gallery = ({
  pattern,
  ...rest
}: Omit<Gallery, "items"> & {
  pattern: keyof typeof galleryPatterns;
}): Gallery => ({
  ...rest,
  items: galleryPatterns[pattern].map((ratio, i) => ({
    seed: `${rest.id}-${i}`,
    ratio,
  })),
});

export const galleries = {
  seedance25: gallery({
    id: "seedance-2-5",
    title: "Seedance 2.5",
    description: "The most advanced AI video model",
    pattern: "video",
    tone: "warm",
  }),
  gptImage2: gallery({
    id: "gpt-image-2",
    title: "GPT Image 2",
    description: "4K images with near-perfect text rendering.",
    pattern: "poster",
    tone: "vivid",
  }),
  marketing: gallery({
    id: "marketing-studio",
    title: "Marketing Studio",
    description: "See what creators and brands make with Marketing Studio.",
    pattern: "portrait",
    tone: "warm",
  }),
  seedance20: gallery({
    id: "seedance-2-0",
    title: "Seedance 2.0",
    description: "Browse premium AI video generations from the community.",
    pattern: "grid",
    tone: "cool",
  }),
  museCinema: gallery({
    id: "muse-cinema",
    title: `${p.photoModel} Cinema`,
    description: `Explore community creations made with ${p.photoModel} Cinema.`,
    pattern: "grid",
    tone: "dark",
  }),
  muse2: gallery({
    id: "muse-2",
    title: `${p.photoModel} 2.0`,
    description:
      "A culture-native photo model built for fashion, aesthetics, and creative expression.",
    pattern: "portrait",
    tone: "light",
  }),
};

export const projects = {
  title: "Explore the inside of every project",
  description: "See all prompts, assets, and how each project was created",
  cta: "Explore community",
  items: [
    "If you stop loving me",
    "Cully Hill Boys",
    "Red Flag",
    "Kok Boru",
    "Adiliada",
    "Oneiric",
    "Zephyr: Special",
    "Hell Grind",
  ],
};

export const agentBanner = {
  title: p.agent,
  subtitle: "One superagent for your entire creative stack",
  cta: `Try ${p.agent}`,
};

export const canvasBanner = {
  eyebrow: "New feature",
  title: ["One canvas.", "Every workflow."],
  description:
    "Moodboard, chain workflows, and share with your team - all on one canvas",
  cta: "Try Canvas",
};

export const photoSeriesBanner = {
  tag: p.photoSeries,
  title: ["Different scenes", "same star"],
  description: "Build your character. One click does the rest",
  cta: `Try ${p.photoSeries}`,
};

export const exploreMore = {
  title: "Explore more AI features",
  chips: [
    "Cinema Studio",
    "Visual Effects",
    p.photoModel,
    "Camera Controls",
    "Viral",
    "Action movements",
    "Commercial",
    "MiniMax Hailuo 02",
    "Seedance Pro",
    "Community",
    "Wan 2.2 Image",
    "Seedream 4.0",
    "Nano Banana",
    "Flux Kontext",
    "GPT Image",
    "Topaz",
    "Google Veo 3.1",
    "Kling 2.5 Turbo",
    "Kling Avatars 2.0",
    "Claude MCP",
    "Wan 2.5",
    "Sora 2",
    "Sora 2 Presets",
    "Banana Placement",
    "Edit Image",
    "Multi Reference",
    "Upscale",
    "YouTube",
    "TikTok",
    "Instagram Reels",
    "YouTube Shorts",
    "Nano Banana Pro",
    "Kling o1",
    "Mixed Media Community",
    `${p.photoModel} Presets`,
    "Visual Effects Collection",
  ],
};
