import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { videoAspectRatios, videoResolutions } from "../config/models";
import { effectPresets } from "../content/tools";
import { Notice } from "../components/Controls";
import { Media } from "../components/Media";
import {
  AssetGrid,
  CanvasTabs,
  DropTile,
  GenerateButton,
  SettingField,
  ToggleRow,
  useToolRunner,
  type CanvasTab,
} from "../components/Studio";
import {
  IconBox,
  IconChevronRight,
  IconClose,
  IconImage,
  IconMapPin,
  IconPencil,
  IconUser,
} from "../components/icons";

const walkthrough = [
  { title: "Choose an effect", text: "Pick any preset from the library." },
  { title: "Upload image", text: "Select a PNG or JPG from your device." },
  { title: "Generate", text: "Get your video with the effect applied." },
];

function PresetPicker({
  current,
  onPick,
  onClose,
}: {
  current: string;
  onPick: (p: string) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-label="Choose effect"
      onClick={onClose}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2 className="display">Choose effect</h2>
          <button type="button" aria-label="Close picker" onClick={onClose}>
            <IconClose />
          </button>
        </div>
        <div className="effect-grid">
          {effectPresets.map((preset) => (
            <button
              key={preset}
              type="button"
              className={preset === current ? "is-selected" : undefined}
              onClick={() => onPick(preset)}
            >
              <Media
                seed={`fx-${preset}`}
                tone="cool"
                ratio="9 / 16"
                radius={10}
              >
                <span className="effect-name display">{preset}</span>
              </Media>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EffectsPage() {
  const [params] = useSearchParams();
  const [preset, setPreset] = useState(
    params.get("preset") ?? effectPresets[0] ?? "",
  );
  const [picking, setPicking] = useState(false);
  const [character, setCharacter] = useState<File[]>([]);
  const [location, setLocation] = useState<File[]>([]);
  const [products, setProducts] = useState<File[]>([]);
  const [promptOn, setPromptOn] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [resolution, setResolution] = useState<string>("720p");
  const [aspect, setAspect] = useState<string>("9:16");
  const [step, setStep] = useState(1);
  const [tab, setTab] = useState<CanvasTab>("how");
  const runner = useToolRunner();

  const generate = async () => {
    const ok = await runner.run({
      tool: "effects",
      prompt: promptOn ? prompt : "",
      options: { preset, resolution, aspectRatio: aspect },
      files: { character, location, product: products },
    });
    if (ok) setTab("history");
  };
  const current = walkthrough[step] ?? walkthrough[0];

  return (
    <main className="video-studio tool-studio is-wide-panel">
      <aside className="video-panel">
        <div className="preset-card is-effect">
          <Media seed={`fx-${preset}`} tone="warm" className="preset-media" />
          <button
            type="button"
            className="preset-change"
            onClick={() => setPicking(true)}
          >
            <IconPencil size={12} />
            Change
          </button>
          <p className="preset-name display is-center">{preset}</p>
        </div>
        <div className="tile-pair">
          <DropTile
            icon={<IconUser size={16} />}
            title="Character"
            hint="Select a PNG or JPG from your device"
            accept="image/*"
            files={character}
            onFiles={setCharacter}
          />
          <DropTile
            badge="Optional"
            icon={<IconMapPin />}
            title="Location"
            hint="Select a PNG or JPG from your device"
            accept="image/*"
            files={location}
            onFiles={setLocation}
          />
        </div>
        <DropTile
          className="is-tall"
          badge="Optional"
          icon={<IconBox />}
          title="Products"
          hint="Select a PNG or JPG from your device"
          accept="image/*"
          multiple
          files={products}
          onFiles={setProducts}
        />
        <ToggleRow label="Prompt" checked={promptOn} onChange={setPromptOn} />
        {promptOn ? (
          <label className="prompt-box">
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Add details to the effect…"
            />
          </label>
        ) : null}
        <div className="tile-pair">
          <SettingField
            caption="Resolution"
            value={resolution}
            options={videoResolutions}
            onChange={setResolution}
          />
          <SettingField
            caption="Aspect Ratio"
            value={aspect}
            options={videoAspectRatios}
            onChange={setAspect}
          />
        </div>
        <GenerateButton busy={runner.busy} onClick={() => void generate()} />
      </aside>
      <section className="video-canvas is-dotted">
        <CanvasTabs tab={tab} onChange={setTab} />
        {tab === "how" ? (
          <div className="effects-walkthrough">
            <div className="walkthrough-card">
              <div className="walkthrough-drop">
                <IconImage size={20} />
                <strong>Drop or upload image</strong>
                <span>PNG, SVG, JPEG, WebP</span>
              </div>
              <div className="walkthrough-fields">
                <span>
                  <small>Aspect Ratio</small>
                  {aspect}
                  <IconChevronRight />
                </span>
                <span>
                  <small>Resolution</small>
                  {resolution}
                  <IconChevronRight />
                </span>
              </div>
            </div>
            <h2 className="display">{current.title}</h2>
            <p>{current.text}</p>
            <div className="walkthrough-nav">
              <button
                type="button"
                aria-label="Previous step"
                onClick={() => setStep((step + 2) % 3)}
              >
                <IconChevronRight style={{ transform: "rotate(180deg)" }} />
              </button>
              {walkthrough.map((w, i) => (
                <button
                  key={w.title}
                  type="button"
                  aria-label={`Step ${i + 1}: ${w.title}`}
                  className={`walkthrough-dot${i === step ? " is-active" : ""}`}
                  onClick={() => setStep(i)}
                />
              ))}
              <button
                type="button"
                aria-label="Next step"
                onClick={() => setStep((step + 1) % 3)}
              >
                <IconChevronRight />
              </button>
            </div>
          </div>
        ) : (
          <AssetGrid items={runner.history} />
        )}
      </section>
      {picking ? (
        <PresetPicker
          current={preset}
          onPick={(p) => {
            setPreset(p);
            setPicking(false);
          }}
          onClose={() => setPicking(false)}
        />
      ) : null}
      {runner.notice ? (
        <Notice
          message={runner.notice}
          onClose={() => runner.setNotice(null)}
        />
      ) : null}
    </main>
  );
}
