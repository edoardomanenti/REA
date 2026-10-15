import { useState } from "react";
import { Link } from "react-router-dom";
import { brand } from "../config/brand";
import { videoResolutions } from "../config/models";
import { swapSection } from "../content/home";
import { Notice } from "../components/Controls";
import { Masonry } from "../components/Masonry";
import { Media } from "../components/Media";
import {
  AssetGrid,
  CanvasTabs,
  DropTile,
  GenerateButton,
  SettingField,
  useToolRunner,
  type CanvasTab,
} from "../components/Studio";
import {
  IconBox,
  IconLayers,
  IconMapPin,
  IconMotion,
  IconTrend,
  IconUser,
  IconVideo,
} from "../components/icons";

const feeds = ["Brand", "Community trending", "Community new"] as const;
const presetColumns = [
  [1200, 5],
  [900, 4],
  [600, 3],
  [0, 2],
] as const;

// Landing with the preset feed, as on the original /higgsfield-genjutsu-presets.
export function RealitySwapPage() {
  const [feed, setFeed] =
    useState<(typeof feeds)[number]>("Community trending");
  return (
    <main className="swap-landing">
      <section className="swap-hero">
        <h1 className="swap-hero-title display">
          {brand.name} {brand.products.swap}
        </h1>
        <p className="swap-hero-text">
          Reality manipulation - take the motion and recast it with your
          characters, locations, and products, or swap specific elements while
          keeping the rest untouched.
        </p>
        <div className="swap-actions">
          <Link to="/reality-swap/create" className="btn btn-primary btn-lg">
            Start generating
          </Link>
          <a href="#how" className="btn btn-white btn-lg">
            Learn more
          </a>
        </div>
      </section>
      <nav className="feed-tabs" aria-label="Preset feeds">
        {feeds.map((f) => (
          <button
            key={f}
            type="button"
            className={feed === f ? "is-active" : undefined}
            onClick={() => setFeed(f)}
          >
            {f === "Brand" ? <IconLayers size={14} /> : <IconTrend />}
            {f === "Brand" ? brand.name : f}
          </button>
        ))}
      </nav>
      <div className="swap-feed">
        <Masonry
          items={swapSection.items.map((item) => ({
            ...item,
            seed: `${feed}-${item.seed}`,
            ratio: 0.5635,
          }))}
          breakpoints={presetColumns}
          render={(item) => (
            <Link to="/reality-swap/create" className="swap-card">
              <Media
                seed={item.seed}
                tone="cool"
                ratio={String(item.ratio)}
                radius={12}
              >
                <span className="swap-tag">
                  <IconMotion size={11} />
                  {item.tag}
                </span>
              </Media>
            </Link>
          )}
        />
      </div>
    </main>
  );
}

type SwapMode = "motion" | "object";

// Generation studio for both Reality Swap modes.
export function RealitySwapStudio() {
  const [mode, setMode] = useState<SwapMode>("motion");
  const [source, setSource] = useState<File[]>([]);
  const [character, setCharacter] = useState<File[]>([]);
  const [location, setLocation] = useState<File[]>([]);
  const [product, setProduct] = useState<File[]>([]);
  const [prompt, setPrompt] = useState("");
  const [resolution, setResolution] = useState<string>("720p");
  const [tab, setTab] = useState<CanvasTab>("how");
  const runner = useToolRunner();

  const generate = async () => {
    const ok = await runner.run({
      tool: mode === "motion" ? "reality_swap.motion" : "reality_swap.object",
      prompt,
      options: { resolution },
      files: { source, character, location, product },
    });
    if (ok) setTab("history");
  };

  return (
    <main className="video-studio tool-studio">
      <aside className="video-panel">
        <div className="segmented">
          <button
            type="button"
            className={mode === "motion" ? "is-active" : undefined}
            onClick={() => setMode("motion")}
          >
            Motion transfer
          </button>
          <button
            type="button"
            className={mode === "object" ? "is-active" : undefined}
            onClick={() => setMode("object")}
          >
            Object swap
          </button>
        </div>
        <DropTile
          className="is-tall"
          icon={<IconVideo size={16} />}
          title="Source video"
          hint="The motion and camera stay exactly as filmed"
          accept="video/*"
          files={source}
          onFiles={setSource}
        />
        <div className="tile-pair">
          <DropTile
            icon={<IconUser size={16} />}
            title={mode === "motion" ? "Character" : "New element"}
            hint="PNG or JPG"
            accept="image/*"
            files={character}
            onFiles={setCharacter}
          />
          <DropTile
            badge="Optional"
            icon={<IconMapPin />}
            title="Location"
            hint="PNG or JPG"
            accept="image/*"
            files={location}
            onFiles={setLocation}
          />
        </div>
        <DropTile
          badge="Optional"
          icon={<IconBox />}
          title="Products"
          hint="PNG or JPG"
          accept="image/*"
          multiple
          files={product}
          onFiles={setProduct}
        />
        <label className="prompt-box">
          <span className="prompt-label">Prompt</span>
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              mode === "motion"
                ? "Describe the new scene, wardrobe, or grade…"
                : "Describe what to swap — e.g. “Replace the car with a red bicycle”"
            }
          />
        </label>
        <SettingField
          caption="Resolution"
          value={resolution}
          options={videoResolutions}
          onChange={setResolution}
        />
        <GenerateButton busy={runner.busy} onClick={() => void generate()} />
      </aside>
      <section className="video-canvas">
        <CanvasTabs tab={tab} onChange={setTab} />
        {tab === "how" ? (
          <div className="how-it-works" id="how">
            <h1 className="how-title display">One video, any reality</h1>
            <p className="how-subtitle">
              The movement and camera stay exactly as filmed. Everything
              performing it is yours.
            </p>
            <div className="before-after">
              <figure>
                <Media seed="swap-before" tone="cool" className="how-media" />
                <figcaption>Before</figcaption>
              </figure>
              <figure>
                <Media seed="swap-after" tone="vivid" className="how-media" />
                <figcaption>After</figcaption>
              </figure>
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
