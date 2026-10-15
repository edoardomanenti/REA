import { useState } from "react";
import { Link } from "react-router-dom";
import { videoResolutions } from "../config/models";
import { Notice } from "../components/Controls";
import { LogoMark } from "../components/Logo";
import { Media } from "../components/Media";
import {
  AssetGrid,
  CanvasTabs,
  DropTile,
  GenerateButton,
  SettingField,
  StepperRow,
  useToolRunner,
  type CanvasTab,
} from "../components/Studio";
import { IconBox, IconGlobe, IconUser, IconVideo } from "../components/icons";

const steps = [
  {
    title: "Your brand kit is created from your website",
    text: "Enter your website. Your logo, colors, brand voice, and selling points load automatically. Edit anything.",
  },
  {
    title: "Add your products",
    text: "Upload product photos once and reuse them in every campaign.",
  },
  {
    title: "Generate ads at scale",
    text: "Pick formats and angles, then generate a full set of on-brand ads.",
  },
];

export function AdsStudioPage() {
  return (
    <main className="ads-landing">
      <section className="ads-hero">
        <span className="pill-outline is-small">
          <LogoMark size={14} /> Ads Studio
        </span>
        <h1 className="ads-title display">
          <span className="gradient-text">Everything you need</span>
          <br />
          <span className="ads-title-dim">to create ads that convert</span>
        </h1>
        <div className="ads-marquee" aria-hidden="true">
          <div className="ads-marquee-track">
            {Array.from({ length: 32 }, (_, i) => (
              <Media
                key={i}
                seed={`ad-thumb-${i % 16}`}
                tone={i % 3 ? "vivid" : "warm"}
                className="ads-thumb"
              />
            ))}
          </div>
        </div>
      </section>
      <p className="ads-divider">Start with tools</p>
      <div className="ads-tools">
        <Link to="/ads-studio/create" className="ads-tool-card">
          <Media seed="ads-static" tone="cool" className="ads-tool-media" />
          <span className="ads-tool-text">
            <strong>Create performing static ads</strong>
            <span>On-brand ads for every product at scale</span>
            <span className="lime-pill">Create ads</span>
          </span>
        </Link>
        <Link to="/ads-studio/multiplier" className="ads-tool-card">
          <Media seed="ads-multiplier" tone="warm" className="ads-tool-media" />
          <span className="ads-tool-text">
            <strong>Ad multiplier</strong>
            <span>Recreate ad with your products, characters</span>
            <span className="lime-pill">Try ad multiplier</span>
          </span>
        </Link>
      </div>
      <section className="ads-how">
        <p className="ads-divider">How it works</p>
        <div className="ads-steps">
          {steps.map((step, i) => (
            <article key={step.title} className="ads-step">
              <Media
                seed={`ads-step-${i}`}
                tone="dark"
                className="ads-step-media"
              />
              <h2 className="display">{step.title}</h2>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

const formats = [
  "Story 9:16",
  "Feed 1:1",
  "Portrait 4:5",
  "Landscape 16:9",
] as const;

// Static ads and Ad multiplier share one studio layout.
export function AdsToolPage({ kind }: { kind: "static" | "multiplier" }) {
  const [website, setWebsite] = useState("");
  const [reference, setReference] = useState<File[]>([]);
  const [products, setProducts] = useState<File[]>([]);
  const [characters, setCharacters] = useState<File[]>([]);
  const [prompt, setPrompt] = useState("");
  const [format, setFormat] = useState<string>(formats[0]);
  const [resolution, setResolution] = useState<string>("720p");
  const [count, setCount] = useState(4);
  const [tab, setTab] = useState<CanvasTab>("how");
  const runner = useToolRunner();
  const isStatic = kind === "static";

  const generate = async () => {
    const ok = await runner.run({
      tool: isStatic ? "ads.static" : "ads.multiplier",
      prompt,
      options: isStatic ? { website, format, count } : { resolution },
      files: { reference, product: products, characters },
    });
    if (ok) setTab("history");
  };

  return (
    <main className="video-studio tool-studio">
      <aside className="video-panel">
        <div className="panel-title">
          <Link to="/ads-studio" className="text-muted">
            Ads Studio
          </Link>
          <h1 className="display">
            {isStatic ? "Static ads" : "Ad multiplier"}
          </h1>
        </div>
        {isStatic ? (
          <label className="url-field">
            <IconGlobe />
            <input
              type="url"
              placeholder="yourbrand.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        ) : (
          <DropTile
            className="is-tall"
            icon={<IconVideo size={16} />}
            title="Reference ad"
            hint="Upload the ad you want to recreate"
            accept="video/*"
            files={reference}
            onFiles={setReference}
          />
        )}
        <div className="tile-pair">
          <DropTile
            icon={<IconBox />}
            title="Products"
            hint="PNG or JPG"
            accept="image/*"
            multiple
            files={products}
            onFiles={setProducts}
          />
          <DropTile
            badge="Optional"
            icon={<IconUser size={16} />}
            title="Characters"
            hint="PNG or JPG"
            accept="image/*"
            multiple
            files={characters}
            onFiles={setCharacters}
          />
        </div>
        <label className="prompt-box">
          <span className="prompt-label">
            {isStatic ? "Angle or offer" : "What to change"}
          </span>
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              isStatic
                ? "e.g. 20% off launch, summer vibe, focus on freshness"
                : "e.g. Keep the edit, use my product and a younger cast"
            }
          />
        </label>
        {isStatic ? (
          <>
            <SettingField
              caption="Format"
              value={format}
              options={formats}
              onChange={setFormat}
            />
            <StepperRow
              label="Ads per run"
              value={count}
              max={8}
              onChange={setCount}
            />
          </>
        ) : (
          <SettingField
            caption="Resolution"
            value={resolution}
            options={videoResolutions}
            onChange={setResolution}
          />
        )}
        <GenerateButton busy={runner.busy} onClick={() => void generate()} />
      </aside>
      <section className="video-canvas">
        <CanvasTabs tab={tab} onChange={setTab} />
        {tab === "how" ? (
          <div className="how-it-works">
            <h1 className="how-title display">
              {isStatic
                ? "Ads that convert, at scale"
                : "One ad, endless versions"}
            </h1>
            <p className="how-subtitle">
              {isStatic
                ? "Brand kit from your website, your products, and a full set of on-brand ads."
                : "Keep the structure of a winning ad and recast it with your products and characters."}
            </p>
            <div className="how-steps">
              {steps.map((step, i) => (
                <article className="how-step" key={step.title}>
                  <Media
                    seed={`ads-how-${kind}-${i}`}
                    tone="vivid"
                    className="how-media"
                  />
                  <h2 className="display">{step.title}</h2>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <AssetGrid items={runner.history} />
        )}
      </section>
      {runner.notice ? (
        <Notice
          message={runner.notice}
          onClose={() => runner.setNotice(null)}
        />
      ) : null}
    </main>
  );
}
