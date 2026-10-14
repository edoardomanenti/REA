// The only integration point between the UI and real generation providers.
//
// The pages call `generateImage` / `generateVideo` and render whatever comes back.
// Plug your providers (Seedance, GPT Image, Kling, ...) into `provider` below.
// Keep API keys on a server you own: call your backend from here, never a model
// vendor directly with a secret embedded in the browser bundle.

export interface ImageGenerationRequest {
  readonly model: string;
  readonly prompt: string;
  readonly aspectRatio: string;
  readonly quality: string;
  readonly resolution: string;
  readonly count: number;
  readonly references: readonly File[];
}

export interface VideoGenerationRequest {
  readonly model: string;
  readonly prompt: string;
  readonly durationSeconds: number;
  readonly aspectRatio: string;
  readonly resolution: string;
  readonly bitrate: string;
  readonly audio: boolean;
  readonly references: readonly File[];
}

export interface GeneratedAsset {
  readonly id: string;
  readonly kind: "image" | "video";
  readonly url: string;
  readonly prompt: string;
  readonly model: string;
  readonly createdAt: number;
}

export type GenerationError =
  | { readonly kind: "not_configured"; readonly message: string }
  | { readonly kind: "invalid_request"; readonly message: string }
  | { readonly kind: "provider_error"; readonly message: string };

export type GenerationResult =
  | { readonly ok: true; readonly assets: readonly GeneratedAsset[] }
  | { readonly ok: false; readonly error: GenerationError };

export interface GenerationProvider {
  generateImage?(request: ImageGenerationRequest): Promise<GenerationResult>;
  generateVideo?(request: VideoGenerationRequest): Promise<GenerationResult>;
}

// Replace with your implementation, for example:
//
// export const provider: GenerationProvider = {
//   async generateVideo(request) {
//     const body = new FormData();
//     body.set("payload", JSON.stringify({ ...request, references: undefined }));
//     request.references.forEach((file) => body.append("references", file));
//     const response = await fetch("/api/generate/video", { method: "POST", body });
//     if (!response.ok) return { ok: false, error: { kind: "provider_error", message: await response.text() } };
//     return { ok: true, assets: (await response.json()).assets };
//   },
// };
export const provider: GenerationProvider = {};

const notConfigured = (what: string): GenerationResult => ({
  ok: false,
  error: {
    kind: "not_configured",
    message: `No ${what} provider is connected yet. Implement it in src/api/generation.ts.`,
  },
});

const emptyPrompt: GenerationResult = {
  ok: false,
  error: {
    kind: "invalid_request",
    message: "Write a prompt or add a reference first.",
  },
};

export async function generateImage(
  request: ImageGenerationRequest,
): Promise<GenerationResult> {
  if (!request.prompt.trim() && request.references.length === 0)
    return emptyPrompt;
  return provider.generateImage
    ? provider.generateImage(request)
    : notConfigured("image");
}

export async function generateVideo(
  request: VideoGenerationRequest,
): Promise<GenerationResult> {
  if (!request.prompt.trim() && request.references.length === 0)
    return emptyPrompt;
  return provider.generateVideo
    ? provider.generateVideo(request)
    : notConfigured("video");
}
