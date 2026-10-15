import { useRef, useState, type ReactNode } from "react";
import {
  runTool,
  type GeneratedAsset,
  type ToolRequest,
} from "../api/generation";
import { Select } from "./Controls";
import {
  IconBook,
  IconChevronRight,
  IconClock,
  IconImage,
  IconMinus,
  IconPlus,
  IconSparkleFill,
  IconVideo,
} from "./icons";

// Shared state for every studio page: one request at a time, a notice for
// errors and a local history of what came back.
export function useToolRunner() {
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [history, setHistory] = useState<GeneratedAsset[]>([]);

  const run = async (request: ToolRequest): Promise<boolean> => {
    setBusy(true);
    const outcome = await runTool(request);
    setBusy(false);
    if (!outcome.ok) {
      setNotice(outcome.error.message);
      return false;
    }
    setHistory((previous) => [...outcome.assets, ...previous]);
    return true;
  };

  return { busy, notice, setNotice, history, run };
}

// Upload tile: dashed card with icon, title and hint; shows file names once chosen.
export function DropTile({
  icon,
  title,
  hint,
  badge,
  accept,
  multiple = false,
  files,
  onFiles,
  className,
}: {
  icon: ReactNode;
  title: string;
  hint?: string;
  badge?: string;
  accept: string;
  multiple?: boolean;
  files: readonly File[];
  onFiles: (files: File[]) => void;
  className?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  return (
    <button
      type="button"
      className={`drop-tile ${className ?? ""}`}
      onClick={() => input.current?.click()}
    >
      {badge ? <span className="drop-badge">{badge}</span> : null}
      <span className="drop-icon">{icon}</span>
      <span className="drop-title">
        {files.length ? files.map((f) => f.name).join(", ") : title}
      </span>
      {hint && !files.length ? <span className="drop-hint">{hint}</span> : null}
      <input
        ref={input}
        type="file"
        accept={accept}
        multiple={multiple}
        hidden
        onChange={(e) => onFiles(Array.from(e.target.files ?? []))}
      />
    </button>
  );
}

export function ToggleRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="toggle-row">
      <span>
        {label}
        {hint ? <span className="text-muted"> {hint}</span> : null}
      </span>
      <input
        type="checkbox"
        className="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}

// "Caption / value >" field used for resolution, ratio, model...
export function SettingField<T extends string | number>({
  caption,
  value,
  options,
  onChange,
  render,
  className,
}: {
  caption: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  render?: (value: T) => ReactNode;
  className?: string;
}) {
  return (
    <Select
      className={`setting-field ${className ?? ""}`}
      label={caption}
      value={value}
      options={options}
      onChange={onChange}
      placement="bottom"
      render={(v) => (
        <span className="setting-field-inner">
          <span className="setting-field-caption">{caption}</span>
          <span className="setting-field-value">{render ? render(v) : v}</span>
          <IconChevronRight className="setting-field-chevron" />
        </span>
      )}
    />
  );
}

export function StepperRow({
  label,
  value,
  max,
  onChange,
}: {
  label: string;
  value: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="stepper-row">
      <span>{label}</span>
      <span className="dock-stepper">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={value <= 1}
          onClick={() => onChange(value - 1)}
        >
          <IconMinus size={14} />
        </button>
        <span>
          <strong>{value}</strong>/{max}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
        >
          <IconPlus size={14} />
        </button>
      </span>
    </div>
  );
}

export function GenerateButton({
  busy,
  onClick,
  label = "Generate",
  className,
}: {
  busy: boolean;
  onClick: () => void;
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`btn btn-primary video-generate ${className ?? ""}`}
      disabled={busy}
      onClick={onClick}
    >
      {busy ? "Generating…" : label}
      <IconSparkleFill size={16} />
    </button>
  );
}

export type CanvasTab = "history" | "how";

export function CanvasTabs({
  tab,
  onChange,
  extra,
}: {
  tab: CanvasTab;
  onChange: (tab: CanvasTab) => void;
  extra?: ReactNode;
}) {
  return (
    <div className="canvas-tabs">
      <button
        type="button"
        className={tab === "history" ? "is-active" : undefined}
        onClick={() => onChange("history")}
      >
        <IconClock size={14} />
        History
      </button>
      <button
        type="button"
        className={tab === "how" ? "is-active" : undefined}
        onClick={() => onChange("how")}
      >
        <IconBook size={14} />
        How it works
      </button>
      {extra ? <span className="canvas-tabs-extra">{extra}</span> : null}
    </div>
  );
}

// Renders generated assets of any kind.
export function AssetGrid({
  items,
  empty = "Your generations will appear here.",
}: {
  items: readonly GeneratedAsset[];
  empty?: string;
}) {
  if (items.length === 0) return <p className="history-empty">{empty}</p>;
  return (
    <div className="asset-grid">
      {items.map((asset) => (
        <figure key={asset.id} className="asset-item">
          {asset.kind === "image" ? (
            <img src={asset.url} alt={asset.prompt} loading="lazy" />
          ) : null}
          {asset.kind === "video" ? (
            <video src={asset.url} controls playsInline />
          ) : null}
          {asset.kind === "audio" ? <audio src={asset.url} controls /> : null}
          <figcaption>{asset.prompt}</figcaption>
        </figure>
      ))}
    </div>
  );
}

// Image/Video switch on the left of the Cinema and Marketing composers.
export function OutputSwitch({
  value,
  onChange,
}: {
  value: "image" | "video";
  onChange: (v: "image" | "video") => void;
}) {
  return (
    <div className="output-switch">
      <button
        type="button"
        className={value === "image" ? "is-active" : undefined}
        onClick={() => onChange("image")}
      >
        <IconImage size={14} />
        Image
      </button>
      <button
        type="button"
        className={value === "video" ? "is-active" : undefined}
        onClick={() => onChange("video")}
      >
        <IconVideo size={14} />
        Video
      </button>
    </div>
  );
}
