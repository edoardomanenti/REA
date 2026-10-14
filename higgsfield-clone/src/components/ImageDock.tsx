import { useRef, useState } from "react";
import type { ImageGenerationRequest } from "../api/generation";
import {
  imageAspectRatios,
  imageModels,
  imageQualities,
  imageResolutions,
} from "../config/models";
import { Select } from "./Controls";
import {
  IconAt,
  IconChevronRight,
  IconDiamond,
  IconFrame,
  IconMinus,
  IconPlus,
  IconSparkleFill,
} from "./icons";

const modelLabel = (id: string) => imageModels.find((m) => m.id === id)?.label;

function CountStepper({
  count,
  onChange,
}: {
  count: number;
  onChange: (count: number) => void;
}) {
  return (
    <div className="dock-stepper">
      <button
        type="button"
        aria-label="Fewer images"
        disabled={count <= 1}
        onClick={() => onChange(count - 1)}
      >
        <IconMinus size={16} />
      </button>
      <span>
        <strong>{count}</strong>/4
      </span>
      <button
        type="button"
        aria-label="More images"
        disabled={count >= 4}
        onClick={() => onChange(count + 1)}
      >
        <IconPlus size={16} />
      </button>
    </div>
  );
}

// Prompt dock pinned to the bottom of the Image studio.
export function ImageDock({
  initialModel,
  busy,
  onGenerate,
}: {
  initialModel: string;
  busy: boolean;
  onGenerate: (request: ImageGenerationRequest) => void;
}) {
  const [model, setModel] = useState(initialModel);
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState<string>("Auto");
  const [quality, setQuality] = useState<string>("High");
  const [resolution, setResolution] = useState<string>("2K");
  const [count, setCount] = useState(1);
  const [references, setReferences] = useState<File[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const credits = imageModels.find((m) => m.id === model)?.credits;
  const submit = () =>
    onGenerate({
      model,
      prompt,
      aspectRatio,
      quality,
      resolution,
      count,
      references,
    });

  return (
    <form
      className="image-dock"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <div className="image-dock-main">
        {references.length ? (
          <div className="reference-list">
            {references.map((file) => (
              <span className="reference-chip" key={file.name}>
                {file.name}
              </span>
            ))}
          </div>
        ) : null}
        <textarea
          className="image-prompt"
          placeholder="Describe the scene you imagine"
          value={prompt}
          rows={2}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
        />
        <div className="dock-controls">
          <div className="dock-group">
            <button
              type="button"
              className="dock-icon"
              aria-label="Add reference"
              onClick={() => fileInput.current?.click()}
            >
              <IconPlus />
            </button>
            <span className="dock-sep" aria-hidden="true" />
            <button
              type="button"
              className="dock-icon"
              aria-label="Mention element"
            >
              <IconAt />
            </button>
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => setReferences(Array.from(e.target.files ?? []))}
            />
          </div>
          <Select
            className="dock-select is-model"
            label="Model"
            value={model}
            options={imageModels.map((m) => m.id)}
            onChange={setModel}
            icon={<span className="model-dot" aria-hidden="true" />}
            render={(id) => (
              <>
                {modelLabel(id)}
                <IconChevronRight size={14} className="select-chevron" />
              </>
            )}
          />
          <Select
            className="dock-select"
            label="Aspect ratio"
            value={aspectRatio}
            options={imageAspectRatios}
            onChange={setAspectRatio}
            icon={<IconFrame />}
          />
          <Select
            className="dock-select"
            label="Quality"
            value={quality}
            options={imageQualities}
            onChange={setQuality}
            icon={<IconDiamond />}
          />
          <Select
            className="dock-select"
            label="Resolution"
            value={resolution}
            options={imageResolutions}
            onChange={setResolution}
            icon={<IconDiamond />}
          />
          <CountStepper count={count} onChange={setCount} />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary dock-generate"
        disabled={busy}
      >
        <span>{busy ? "Generating…" : "Generate"}</span>
        {credits === undefined ? null : (
          <span className="dock-credits">
            <IconSparkleFill size={14} />
            {credits * count}
          </span>
        )}
      </button>
    </form>
  );
}
