// Single place to set your own brand. Every visible brand string reads from here.
export const brand = {
  name: "Prism",
  tagline: "AI-native creative suite",
  legalName: "Prism, Inc.",
  address: "Your street 1, City, Country",
  discountLabel: "30% OFF",
  social: [
    { label: "X / Twitter", href: "#" },
    { label: "Youtube", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Tiktok", href: "#" },
    { label: "Discord", href: "#" },
  ],
  // Names of your own products. The original site uses its own trademarks here.
  products: {
    swap: "Reality Swap",
    cut: "Quick Cut",
    photoModel: "Muse",
    agent: "Super Agent",
    photoSeries: "Photo Series",
    storyboard: "Storyboard",
    scenes3d: "3D Scenes",
    festival: "Film Festival",
  },
} as const;
