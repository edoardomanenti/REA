// Model catalog shown in the generation pages. `id` is what the API adapter receives.
// `credits` is optional: leave it undefined until you connect your own pricing.
export type ModelKind = "image" | "video";

export interface ModelOption {
  readonly id: string;
  readonly label: string;
  readonly kind: ModelKind;
  readonly description: string;
  readonly badge?: "NEW" | "TOP";
  readonly credits?: number;
}

export const imageModels: readonly ModelOption[] = [
  {
    id: "gpt_image_2",
    label: "GPT Image 2",
    kind: "image",
    description: "4K images with near-perfect text rendering",
    badge: "TOP",
  },
  {
    id: "nano_banana_pro",
    label: "Nano Banana Pro",
    kind: "image",
    description: "Fast edits and consistent characters",
  },
  {
    id: "seedream_5",
    label: "Seedream 5",
    kind: "image",
    description: "Photoreal images with fine detail",
    badge: "NEW",
  },
  {
    id: "flux_2",
    label: "Flux 2",
    kind: "image",
    description: "Versatile text-to-image model",
  },
  {
    id: "ideogram_4_5",
    label: "Ideogram 4.5",
    kind: "image",
    description: "Typography and graphic design",
  },
];

export const videoModels: readonly ModelOption[] = [
  {
    id: "seedance_2_5",
    label: "Seedance 2.5",
    kind: "video",
    description: "The most advanced video model",
    badge: "TOP",
  },
  {
    id: "seedance_2_0",
    label: "Seedance 2.0",
    kind: "video",
    description: "Cinematic motion from text or image",
  },
  {
    id: "kling_3_0",
    label: "Kling 3.0",
    kind: "video",
    description: "Realistic motion and physics",
    badge: "NEW",
  },
  {
    id: "veo_3_1",
    label: "Veo 3.1",
    kind: "video",
    description: "Video with native audio",
  },
  {
    id: "sora_2",
    label: "Sora 2",
    kind: "video",
    description: "Long, coherent scenes",
  },
  {
    id: "wan_2_6",
    label: "WAN 2.6",
    kind: "video",
    description: "Open video model",
  },
];

export const imageAspectRatios = [
  "Auto",
  "1:1",
  "3:4",
  "4:3",
  "9:16",
  "16:9",
  "21:9",
] as const;
export const imageQualities = ["Low", "Medium", "High"] as const;
export const imageResolutions = ["1K", "2K", "4K"] as const;
export const videoDurations = [5, 10, 15] as const;
export const videoAspectRatios = [
  "16:9",
  "9:16",
  "1:1",
  "4:3",
  "3:4",
  "21:9",
] as const;
export const videoResolutions = ["480p", "720p", "1080p"] as const;
export const videoBitrates = ["Standard", "High"] as const;

export const audioModels = [
  "Seed Audio 1.0",
  "ElevenLabs v3",
  "MiniMax Speech",
] as const;
export const cinemaModels = [
  "Cinema Studio 4.0",
  "Seedance 2.5",
  "Kling 3.0",
  "Veo 3.1",
] as const;
