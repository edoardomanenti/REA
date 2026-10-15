import { useState } from "react";
import { brand } from "../config/brand";
import {
  influencerAttributes,
  influencerMotions,
  type Attribute,
} from "../content/tools";
import { Notice } from "../components/Controls";
import { Media } from "../components/Media";
import { AssetGrid, DropTile, useToolRunner } from "../components/Studio";
import {
  IconChevronDown,
  IconClock,
  IconImage,
  IconShuffle,
  IconSparkleFill,
  IconTrend,
  IconUsers,
} from "../components/icons";

type Selection = Record<string, string>;
const feeds = [
  "AI Influencers",
  `${brand.name} Presets`,
  "Community Trends",
] as const;

function AttributeGroup({
  attribute,
  open,
  value,
  onToggle,
  onPick,
}: {
  attribute: Attribute;
  open: boolean;
  value: string | undefined;
  onToggle: () => void;
  onPick: (option: string) => void;
}) {
  const visual = attribute.id === "type";
  return (
    <div className={`attr-group${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="attr-head"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span>
          {attribute.label} · {attribute.options.length}
          {value ? <span className="attr-value"> — {value}</span> : null}
        </span>
        <IconChevronDown size={14} />
      </button>
      {open ? (
        <div className={visual ? "attr-tiles" : "attr-chips"}>
          {attribute.options.map((option) => (
            <button
              key={option}
              type="button"
              className={option === value ? "is-selected" : undefined}
              onClick={() => onPick(option)}
            >
              {visual ? (
                <Media
                  seed={`attr-${option}`}
                  tone="light"
                  className="attr-tile-media"
                />
              ) : null}
              <span>{option}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function randomSelection(): Selection {
  return Object.fromEntries(
    influencerAttributes.map((a) => [
      a.id,
      a.options[Math.floor(Math.random() * a.options.length)] ?? "",
    ]),
  );
}

export function InfluencerPage() {
  const [mode, setMode] = useState<"create" | "motion">("create");
  const [photo, setPhoto] = useState<File[]>([]);
  const [open, setOpen] = useState<string>("type");
  const [selection, setSelection] = useState<Selection>({ type: "Extreme" });
  const [motion, setMotion] = useState<string>(influencerMotions[0] ?? "");
  const [feed, setFeed] = useState<string>(feeds[0]);
  const [tab, setTab] = useState<"explore" | "history">("explore");
  const runner = useToolRunner();

  const generate = async () => {
    const ok = await runner.run({
      tool: mode === "create" ? "influencer.create" : "influencer.motion",
      prompt: "",
      options: mode === "create" ? selection : { motion },
      files: { character: photo },
    });
    if (ok) setTab("history");
  };

  return (
    <main className="video-studio tool-studio">
      <aside className="video-panel influencer-panel">
        <div className="influencer-head">
          <p>Create your own character with</p>
          <h1 className="display">AI Influencer</h1>
        </div>
        <div className="segmented is-dark">
          <button
            type="button"
            className={mode === "create" ? "is-active" : undefined}
            onClick={() => setMode("create")}
          >
            Create Influencer
          </button>
          <button
            type="button"
            className={mode === "motion" ? "is-active" : undefined}
            onClick={() => setMode("motion")}
          >
            Motion
          </button>
        </div>
        <DropTile
          className="is-row"
          badge={mode === "create" ? "Optional" : undefined}
          icon={<IconImage size={16} />}
          title={
            mode === "create" ? "Upload your photo" : "Upload your influencer"
          }
          accept="image/*"
          files={photo}
          onFiles={setPhoto}
        />
        {mode === "create" ? (
          <div className="attr-list">
            {influencerAttributes.map((attribute) => (
              <AttributeGroup
                key={attribute.id}
                attribute={attribute}
                open={open === attribute.id}
                value={selection[attribute.id]}
                onToggle={() =>
                  setOpen(open === attribute.id ? "" : attribute.id)
                }
                onPick={(option) =>
                  setSelection({ ...selection, [attribute.id]: option })
                }
              />
            ))}
          </div>
        ) : (
          <div className="attr-chips is-motion">
            {influencerMotions.map((m) => (
              <button
                key={m}
                type="button"
                className={m === motion ? "is-selected" : undefined}
                onClick={() => setMotion(m)}
              >
                {m}
              </button>
            ))}
          </div>
        )}
        <div className="influencer-actions">
          <button
            type="button"
            className="shuffle-button"
            aria-label="Randomize"
            onClick={() => setSelection(randomSelection())}
          >
            <IconShuffle />
          </button>
          <button
            type="button"
            className="btn btn-primary video-generate"
            disabled={runner.busy}
            onClick={() => void generate()}
          >
            {runner.busy ? "Generating…" : "Generate"}
            <IconSparkleFill size={16} />
          </button>
        </div>
      </aside>

      <section className="video-canvas">
        <div className="canvas-tabs">
          <button
            type="button"
            className={tab === "explore" ? "is-active" : undefined}
            onClick={() => setTab("explore")}
          >
            <IconTrend />
            Explore
          </button>
          <button
            type="button"
            className={tab === "history" ? "is-active" : undefined}
            onClick={() => setTab("history")}
          >
            <IconClock size={14} />
            History
          </button>
        </div>
        {tab === "history" ? (
          <AssetGrid items={runner.history} />
        ) : (
          <div className="influencer-explore">
            <div className="portrait-fan" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Media
                  key={i}
                  seed={`fan-${i}`}
                  tone={i === 2 ? "warm" : "light"}
                  className={`portrait is-${i}`}
                />
              ))}
            </div>
            <h2 className="influencer-title display">
              Your influencer,
              <br />
              your viral hit
            </h2>
            <p className="influencer-text">
              Build your AI influencer with the face, body, and style you want.
              Choose a motion preset and watch them perform it in a video ready
              to share.
            </p>
            <div className="pill-tabs is-center">
              {feeds.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={feed === f ? "is-active" : undefined}
                  onClick={() => setFeed(f)}
                >
                  {f === feeds[0] ? <IconUsers size={14} /> : null}
                  {f}
                </button>
              ))}
            </div>
            <div className="character-grid">
              {Array.from({ length: 8 }, (_, i) => (
                <article className="character-card" key={`${feed}-${i}`}>
                  <Media
                    seed={`${feed}-char-${i}`}
                    tone="light"
                    ratio="3 / 4"
                    radius={14}
                  />
                  <button type="button" className="recreate-pill">
                    <IconSparkleFill size={13} />
                    Recreate
                  </button>
                </article>
              ))}
            </div>
          </div>
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
