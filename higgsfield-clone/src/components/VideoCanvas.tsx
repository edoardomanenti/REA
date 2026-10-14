import { useState } from "react";
import type { GeneratedAsset } from "../api/generation";
import { Media } from "./Media";
import { PromoStrip } from "./PromoStrip";
import { IconBook, IconClose, IconFolder } from "./icons";

export type CanvasTab = "history" | "how";

const steps = [
  {
    title: "Add image",
    text: "Upload or generate an image to start your animation",
  },
  {
    title: "Choose preset",
    text: "Pick a preset to control your image movement",
  },
  {
    title: "Get video",
    text: "Click generate to create your final animated video!",
  },
] as const;

function HowItWorks() {
  return (
    <div className="how-it-works">
      <h1 className="how-title display">Make videos in one click</h1>
      <p className="how-subtitle">
        250+ presets for camera control, framing, and high-quality VFX - or use
        the general preset for manual control.
      </p>
      <div className="how-steps">
        {steps.map((step, i) => (
          <article className="how-step" key={step.title}>
            <Media
              seed={`how-${i}`}
              tone={i === 1 ? "cool" : "vivid"}
              className="how-media"
            />
            <h2 className="display">{step.title}</h2>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function History({ items }: { items: readonly GeneratedAsset[] }) {
  return (
    <div className="history">
      {items.length === 0 ? (
        <p className="history-empty">Your generations will appear here.</p>
      ) : null}
      {items.map((asset) => (
        <figure key={asset.id} className="history-item">
          <video src={asset.url} controls playsInline />
          <figcaption>{asset.prompt}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function Upsell({ modelLabel }: { modelLabel: string }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="upsell">
      <button
        type="button"
        className="upsell-close"
        aria-label="Close offer"
        onClick={() => setOpen(false)}
      >
        <IconClose size={14} />
      </button>
      <Media seed="upsell" tone="cool" className="upsell-media" />
      <div className="upsell-body">
        <p className="upsell-title display">
          Unlimited {modelLabel}
          <br />
          <span className="text-lime">for 30 days with 30% off</span>
        </p>
        <p className="upsell-text">
          Get unlimited {modelLabel} for 30 days on the Scale plan
        </p>
        <button type="button" className="btn btn-primary btn-sm upsell-cta">
          Get 30-day Unlimited {modelLabel}
        </button>
      </div>
    </div>
  );
}

// Right column of the Video studio: onboarding, history and offers.
export function VideoCanvas({
  modelLabel,
  tab,
  onTabChange,
  history,
}: {
  modelLabel: string;
  tab: CanvasTab;
  onTabChange: (tab: CanvasTab) => void;
  history: readonly GeneratedAsset[];
}) {
  return (
    <section className="video-canvas">
      <div className="canvas-tabs">
        <button
          type="button"
          className={tab === "history" ? "is-active" : undefined}
          onClick={() => onTabChange("history")}
        >
          <IconFolder size={14} />
          History
        </button>
        <button
          type="button"
          className={tab === "how" ? "is-active" : undefined}
          onClick={() => onTabChange("how")}
        >
          <IconBook size={14} />
          How it works
        </button>
      </div>
      <PromoStrip />
      {tab === "how" ? <HowItWorks /> : <History items={history} />}
      <div className="academy-strip">
        <Media seed="academy" tone="warm" className="academy-media" />
        <div>
          <p className="academy-title">Don’t know where to start?</p>
          <p className="academy-text">
            Go to the Academy and start your journey
          </p>
        </div>
      </div>
      <Upsell modelLabel={modelLabel} />
    </section>
  );
}
