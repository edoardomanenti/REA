import type { CSSProperties, ReactNode } from "react";

// Media slot. With `src` it renders your image or video; without it renders a
// deterministic gradient placeholder so the layout matches the original page.
export interface MediaSource {
  readonly src?: string;
  readonly poster?: string;
  readonly kind?: "image" | "video";
}

interface MediaProps extends MediaSource {
  readonly seed: string;
  readonly alt?: string;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly ratio?: string;
  readonly height?: number | string;
  readonly radius?: number;
  readonly tone?: "dark" | "light" | "warm" | "cool" | "vivid";
  readonly children?: ReactNode;
}

const hash = (value: string): number => {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const toneRanges = {
  dark: { s: [12, 30], l: [10, 26] },
  light: { s: [20, 45], l: [62, 82] },
  warm: { s: [40, 65], l: [28, 52] },
  cool: { s: [30, 55], l: [22, 46] },
  vivid: { s: [55, 85], l: [40, 60] },
} as const;

export function placeholderBackground(
  seed: string,
  tone: MediaProps["tone"] = "cool",
): string {
  const h = hash(seed);
  const range = toneRanges[tone];
  const hue = h % 360;
  const hue2 = (hue + 30 + ((h >> 9) % 90)) % 360;
  const sat = range.s[0] + ((h >> 3) % (range.s[1] - range.s[0]));
  const light = range.l[0] + ((h >> 5) % (range.l[1] - range.l[0]));
  const x = 20 + ((h >> 11) % 60);
  const y = 15 + ((h >> 15) % 50);
  return [
    `radial-gradient(120% 80% at ${x}% ${y}%, hsla(${hue2}, ${sat + 10}%, ${light + 18}%, 0.75) 0%, transparent 55%)`,
    `radial-gradient(90% 70% at ${100 - x}% ${100 - y}%, hsla(${(hue + 180) % 360}, ${sat}%, ${Math.max(light - 8, 6)}%, 0.6) 0%, transparent 60%)`,
    `linear-gradient(${(h >> 7) % 360}deg, hsl(${hue}, ${sat}%, ${light}%) 0%, hsl(${hue2}, ${sat}%, ${Math.max(light - 12, 5)}%) 100%)`,
  ].join(", ");
}

export function Media({
  seed,
  src,
  poster,
  kind = "image",
  alt = "",
  className,
  style,
  ratio,
  height,
  radius,
  tone,
  children,
}: MediaProps) {
  const boxStyle: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    aspectRatio: ratio,
    height,
    borderRadius: radius,
    background: src ? "#1a1c1f" : placeholderBackground(seed, tone),
    ...style,
  };
  return (
    <div className={`media ${className ?? ""}`} style={boxStyle}>
      {src && kind === "video" ? (
        <video
          className="media-fill"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          aria-label={alt}
        />
      ) : null}
      {src && kind === "image" ? (
        <img className="media-fill" src={src} alt={alt} loading="lazy" />
      ) : null}
      {src ? null : <span className="media-grain" aria-hidden="true" />}
      {children}
    </div>
  );
}
