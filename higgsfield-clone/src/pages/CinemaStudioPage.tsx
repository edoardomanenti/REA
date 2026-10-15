import { useState } from "react";
import {
  cinemaModels,
  videoAspectRatios,
  videoDurations,
  videoResolutions,
} from "../config/models";
import { cinemaControls } from "../content/tools";
import { AppSidebar } from "../components/AppSidebar";
import { Notice, Select } from "../components/Controls";
import { Media } from "../components/Media";
import { AssetGrid, OutputSwitch, useToolRunner } from "../components/Studio";
import {
  IconAt,
  IconChevronRight,
  IconClock,
  IconDiamond,
  IconMinus,
  IconPlus,
  IconRatio,
  IconScan,
  IconSparkleFill,
  IconSpeaker,
} from "../components/icons";

type Controls = Record<string, string>;

export function CinemaStudioPage() {
  const [output, setOutput] = useState<"image" | "video">("video");
  const [references, setReferences] = useState<File[]>([]);
  const [controls, setControls] = useState<Controls>(() =>
    Object.fromEntries(cinemaControls.map((c) => [c.id, "Auto"])),
  );
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState<string>(cinemaModels[0]);
  const [resolution, setResolution] = useState<string>("1080p");
  const [aspect, setAspect] = useState<string>("16:9");
  const [duration, setDuration] = useState<number>(5);
  const [audio, setAudio] = useState(true);
  const [count, setCount] = useState(1);
  const runner = useToolRunner();

  const generate = () =>
    void runner.run({
      tool: "cinema",
      prompt,
      options: {
        output,
        model,
        resolution,
        aspectRatio: aspect,
        duration,
        audio,
        count,
        ...controls,
      },
      files: { references },
    });

  return (
    <div className="app-shell">
      <AppSidebar title="Cinema Studio" />
      <main className="app-main cinema-main">
        <div className="poster-fan" aria-hidden="true">
          <Media seed="poster-a" tone="light" className="poster is-side" />
          <Media seed="poster-b" tone="cool" className="poster is-center" />
          <Media seed="poster-c" tone="warm" className="poster is-side" />
        </div>
        <h1 className="cinema-title display gradient-text">
          Bring your stories to life
        </h1>
        <div className="composer-row">
          <OutputSwitch value={output} onChange={setOutput} />
          <div className="composer">
            <div className="composer-chips">
              <label className="composer-chip is-upload">
                <span className="chip-thumb">
                  <IconPlus size={14} />
                </span>
                <span>
                  <small>References</small>
                  {references.length}/50
                </span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  hidden
                  onChange={(e) =>
                    setReferences(Array.from(e.target.files ?? []).slice(0, 50))
                  }
                />
              </label>
              {cinemaControls.map((control) => (
                <Select
                  key={control.id}
                  className="composer-chip"
                  label={control.label}
                  value={controls[control.id] ?? "Auto"}
                  options={control.options}
                  onChange={(v) =>
                    setControls({ ...controls, [control.id]: v })
                  }
                  render={(v) => (
                    <span className="chip-inner">
                      <Media
                        seed={`chip-${control.id}`}
                        tone="cool"
                        className="chip-thumb"
                      />
                      <span>
                        <small>{control.label}</small>
                        {v}
                      </span>
                    </span>
                  )}
                />
              ))}
            </div>
            <div className="composer-body">
              <textarea
                rows={2}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your scene - use @ to add characters & locations"
              />
              <div className="composer-controls">
                <span className="icon-group">
                  <IconPlus size={15} />
                  <IconAt size={15} />
                  <IconScan size={15} />
                </span>
                <Select
                  className="mini-select"
                  label="Model"
                  value={model}
                  options={cinemaModels}
                  onChange={setModel}
                  render={(m) => (
                    <>
                      {m} <IconChevronRight size={12} />
                    </>
                  )}
                />
                <Select
                  className="mini-select"
                  label="Resolution"
                  value={resolution}
                  options={videoResolutions}
                  onChange={setResolution}
                  icon={<IconDiamond size={14} />}
                />
                <Select
                  className="mini-select"
                  label="Aspect ratio"
                  value={aspect}
                  options={videoAspectRatios}
                  onChange={setAspect}
                  icon={<IconRatio size={14} />}
                />
                {output === "video" ? (
                  <>
                    <Select
                      className="mini-select"
                      label="Duration"
                      value={duration}
                      options={videoDurations}
                      onChange={setDuration}
                      icon={<IconClock size={14} />}
                      render={(d) => `${d}s`}
                    />
                    <button
                      type="button"
                      className="mini-select is-toggle"
                      onClick={() => setAudio(!audio)}
                      aria-pressed={audio}
                    >
                      <IconSpeaker /> {audio ? "On" : "Off"}
                    </button>
                  </>
                ) : null}
                <span className="dock-stepper is-mini">
                  <button
                    type="button"
                    aria-label="Fewer"
                    disabled={count <= 1}
                    onClick={() => setCount(count - 1)}
                  >
                    <IconMinus size={13} />
                  </button>
                  <span>
                    <strong>{count}</strong>/4
                  </span>
                  <button
                    type="button"
                    aria-label="More"
                    disabled={count >= 4}
                    onClick={() => setCount(count + 1)}
                  >
                    <IconPlus size={13} />
                  </button>
                </span>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary composer-generate"
              disabled={runner.busy}
              onClick={generate}
            >
              {runner.busy ? "…" : "Generate"}
              <IconSparkleFill size={13} />
            </button>
          </div>
        </div>
        {runner.history.length ? <AssetGrid items={runner.history} /> : null}
      </main>
      {runner.notice ? (
        <Notice
          message={runner.notice}
          onClose={() => runner.setNotice(null)}
        />
      ) : null}
    </div>
  );
}
