import { useRef, useState } from "react";
import type { VideoGenerationRequest } from "../api/generation";
import {
  videoAspectRatios,
  videoBitrates,
  videoDurations,
  videoModels,
  videoResolutions,
} from "../config/models";
import { Select } from "./Controls";
import { Media } from "./Media";
import {
  IconAt,
  IconBars,
  IconChevronRight,
  IconClock,
  IconDiamond,
  IconImage,
  IconMusic,
  IconPencil,
  IconRatio,
  IconSparkleFill,
  IconSpeaker,
  IconVideo,
  IconWave,
} from "./icons";

const modes = ["Create Video", "Edit Video", "Motion Control"] as const;
type Source = "references" | "extend";

function ModeTabs() {
  const [mode, setMode] = useState<(typeof modes)[number]>("Create Video");
  return (
    <div className="mode-tabs" role="tablist">
      {modes.map((m) => (
        <button
          key={m}
          type="button"
          role="tab"
          aria-selected={mode === m}
          className={mode === m ? "is-active" : undefined}
          onClick={() => setMode(m)}
        >
          {m}
        </button>
      ))}
    </div>
  );
}

function ReferencePicker({
  source,
  onSourceChange,
  files,
  onFilesChange,
}: {
  source: Source;
  onSourceChange: (s: Source) => void;
  files: File[];
  onFilesChange: (f: File[]) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const title = files.length
    ? `${files.length} file(s) added`
    : source === "extend"
      ? "Add a video to extend"
      : "Add references";
  return (
    <>
      <div className="segmented">
        <button
          type="button"
          className={source === "references" ? "is-active" : undefined}
          onClick={() => onSourceChange("references")}
        >
          References
        </button>
        <button
          type="button"
          className={source === "extend" ? "is-active" : undefined}
          onClick={() => onSourceChange("extend")}
        >
          Extend Video
        </button>
      </div>
      <button
        type="button"
        className="dropzone"
        onClick={() => input.current?.click()}
      >
        <span className="dropzone-icons" aria-hidden="true">
          <IconImage size={14} />
          <IconVideo size={14} />
          <IconMusic size={14} />
        </span>
        <span className="dropzone-title">{title}</span>
        <span className="dropzone-hint">
          {source === "extend" ? "Video" : "Image, Video or Audio"}
        </span>
      </button>
      <input
        ref={input}
        type="file"
        multiple={source === "references"}
        accept={source === "extend" ? "video/*" : "image/*,video/*,audio/*"}
        hidden
        onChange={(e) => onFilesChange(Array.from(e.target.files ?? []))}
      />
    </>
  );
}

function PromptBox({
  prompt,
  onPromptChange,
  audio,
  onAudioChange,
}: {
  prompt: string;
  onPromptChange: (p: string) => void;
  audio: boolean;
  onAudioChange: (a: boolean) => void;
}) {
  return (
    <label className="prompt-box">
      <span className="prompt-label">Prompt</span>
      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        rows={4}
        placeholder="Describe the visual change you want — e.g., “Make it snow” or “Make it nighttime”. Add reference images or elements using @…"
      />
      <span className="prompt-chips">
        <button type="button" className="prompt-chip">
          <IconAt size={14} />
          Elements
        </button>
        <button
          type="button"
          className={`prompt-chip${audio ? "" : " is-off"}`}
          onClick={() => onAudioChange(!audio)}
          aria-pressed={audio}
        >
          <IconSpeaker />
          {audio ? "On" : "Off"}
        </button>
      </span>
    </label>
  );
}

function ModelRow({
  model,
  onChange,
}: {
  model: string;
  onChange: (id: string) => void;
}) {
  return (
    <Select
      className="model-row"
      label="Model"
      placement="bottom"
      value={model}
      options={videoModels.map((m) => m.id)}
      onChange={onChange}
      render={(id) => (
        <span className="model-row-inner">
          <span className="model-row-caption">Model</span>
          <span className="model-row-name">
            {videoModels.find((m) => m.id === id)?.label}
            <IconBars size={14} className="text-lime" />
          </span>
          <IconChevronRight className="model-row-chevron" />
        </span>
      )}
    />
  );
}

// Left settings column of the Video studio. Owns every form field except the model.
export function VideoPanel({
  model,
  onModelChange,
  busy,
  onGenerate,
}: {
  model: string;
  onModelChange: (id: string) => void;
  busy: boolean;
  onGenerate: (request: VideoGenerationRequest) => void;
}) {
  const [source, setSource] = useState<Source>("references");
  const [references, setReferences] = useState<File[]>([]);
  const [prompt, setPrompt] = useState("");
  const [audio, setAudio] = useState(true);
  const [durationSeconds, setDuration] = useState<number>(5);
  const [aspectRatio, setAspectRatio] = useState<string>("16:9");
  const [resolution, setResolution] = useState<string>("1080p");
  const [bitrate, setBitrate] = useState<string>("High");
  const option = videoModels.find((m) => m.id === model);

  return (
    <aside className="video-panel">
      <ModeTabs />
      <div className="preset-card">
        <Media seed="preset-general" tone="dark" className="preset-media" />
        <button type="button" className="preset-change">
          <IconPencil size={12} />
          Change
        </button>
        <p className="preset-name display">General</p>
        <p className="preset-model">{option?.label}</p>
      </div>
      <ReferencePicker
        source={source}
        onSourceChange={setSource}
        files={references}
        onFilesChange={setReferences}
      />
      <PromptBox
        prompt={prompt}
        onPromptChange={setPrompt}
        audio={audio}
        onAudioChange={setAudio}
      />
      <ModelRow model={model} onChange={onModelChange} />
      <div className="settings-row">
        <Select
          className="setting"
          label="Duration"
          value={durationSeconds}
          options={videoDurations}
          onChange={setDuration}
          icon={<IconClock />}
          render={(d) => `${d}s`}
          placement="bottom"
        />
        <Select
          className="setting"
          label="Aspect ratio"
          value={aspectRatio}
          options={videoAspectRatios}
          onChange={setAspectRatio}
          icon={<IconRatio />}
          placement="bottom"
        />
        <Select
          className="setting"
          label="Resolution"
          value={resolution}
          options={videoResolutions}
          onChange={setResolution}
          icon={<IconDiamond />}
          placement="bottom"
        />
      </div>
      <Select
        className="bitrate-row"
        label="Bitrate"
        value={bitrate}
        options={videoBitrates}
        onChange={setBitrate}
        placement="bottom"
        render={(b) => (
          <span className="bitrate-inner">
            <span className="bitrate-label">
              <IconWave />
              Bitrate
            </span>
            <span className="bitrate-value">
              <IconSparkleFill size={12} />
              {b}
              <IconChevronRight size={14} />
            </span>
          </span>
        )}
      />
      <button
        type="button"
        className="btn btn-primary video-generate"
        disabled={busy}
        onClick={() =>
          onGenerate({
            model,
            prompt,
            durationSeconds,
            aspectRatio,
            resolution,
            bitrate,
            audio,
            references,
          })
        }
      >
        {busy ? "Generating…" : "Generate"}
        {option?.credits === undefined ? null : (
          <span className="dock-credits">
            <IconSparkleFill size={14} />
            {option.credits}
          </span>
        )}
      </button>
    </aside>
  );
}
