import { useState } from "react";
import {
  marketingFilters,
  marketingShots,
  marketingTemplates,
} from "../content/tools";
import { AppSidebar } from "../components/AppSidebar";
import { Notice, Select } from "../components/Controls";
import { Media } from "../components/Media";
import { AssetGrid, OutputSwitch, useToolRunner } from "../components/Studio";
import {
  IconBox,
  IconGrid,
  IconImage,
  IconMinus,
  IconPlus,
  IconRatio,
  IconSparkleFill,
  IconVideo,
} from "../components/icons";

const ratios = ["3:4", "1:1", "4:5", "9:16", "16:9"] as const;
const fanLabels = ["TikTok", "UGC", "Product shot", "Motion", "Ads"] as const;
const kinds = ["All", "Images", "Videos"] as const;

function AddTile({
  label,
  files,
  onFiles,
}: {
  label: string;
  files: File[];
  onFiles: (f: File[]) => void;
}) {
  return (
    <label className={`add-tile${files.length ? " has-file" : ""}`}>
      <IconPlus size={14} />
      <span>{files.length ? files[0]?.name : label}</span>
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => onFiles(Array.from(e.target.files ?? []))}
      />
    </label>
  );
}

export function MarketingStudioPage() {
  const [output, setOutput] = useState<"image" | "video">("image");
  const [prompt, setPrompt] = useState("");
  const [shot, setShot] = useState<string>(marketingShots[0] ?? "Closeup");
  const [ratio, setRatio] = useState<string>("3:4");
  const [count, setCount] = useState(1);
  const [avatar, setAvatar] = useState<File[]>([]);
  const [product, setProduct] = useState<File[]>([]);
  const [filter, setFilter] =
    useState<(typeof marketingFilters)[number]>("All");
  const [kind, setKind] = useState<(typeof kinds)[number]>("All");
  const runner = useToolRunner();

  const templates = marketingTemplates.filter(
    (t) =>
      (filter === "All" || t.category === filter) &&
      (kind === "All" ||
        (kind === "Images" ? t.kind === "image" : t.kind === "video")),
  );

  return (
    <div className="app-shell">
      <AppSidebar title="Marketing Studio" compact />
      <main className="app-main marketing-main">
        <span className="pill-grey">Marketing Studio</span>
        <div className="marketing-fan" aria-hidden="true">
          {fanLabels.map((label, i) => (
            <Media
              key={label}
              seed={`mk-fan-${i}`}
              tone={i % 2 ? "vivid" : "light"}
              className={`mk-card is-${i}`}
            >
              <span className="mk-card-label">{label}</span>
            </Media>
          ))}
        </div>
        <h1 className="marketing-title display">
          <span className="gradient-text">Turn any product</span>
          <br />
          <span className="ads-title-dim">into ready to post content</span>
        </h1>
        <div className="composer-row">
          <OutputSwitch value={output} onChange={setOutput} />
          <div className="composer is-marketing">
            <div className="composer-body">
              <textarea
                rows={2}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to create..."
              />
              <div className="composer-controls">
                <span className="icon-group">
                  <IconPlus size={15} />
                </span>
                <Select
                  className="mini-select"
                  label="Shot"
                  value={shot}
                  options={marketingShots}
                  onChange={setShot}
                  icon={<IconBox size={14} />}
                />
                <Select
                  className="mini-select"
                  label="Aspect ratio"
                  value={ratio}
                  options={ratios}
                  onChange={setRatio}
                  icon={<IconRatio size={14} />}
                />
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
            <div className="add-tiles">
              <AddTile label="Avatar" files={avatar} onFiles={setAvatar} />
              <AddTile label="Product" files={product} onFiles={setProduct} />
            </div>
            <button
              type="button"
              className="btn btn-primary composer-generate"
              disabled={runner.busy}
              onClick={() =>
                void runner.run({
                  tool: "marketing",
                  prompt,
                  options: { output, shot, aspectRatio: ratio, count },
                  files: { avatar, product },
                })
              }
            >
              {runner.busy ? "…" : "Generate"}
              <IconSparkleFill size={13} />
            </button>
          </div>
        </div>
        {runner.history.length ? <AssetGrid items={runner.history} /> : null}

        <section className="templates">
          <h2 className="display">Explore templates</h2>
          <div className="templates-bar">
            <div className="pill-tabs">
              {marketingFilters.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={filter === f ? "is-active" : undefined}
                  onClick={() => setFilter(f)}
                >
                  {f === "All" ? <IconGrid /> : null}
                  {f}
                </button>
              ))}
            </div>
            <div className="pill-tabs">
              {kinds.map((k) => (
                <button
                  key={k}
                  type="button"
                  className={kind === k ? "is-active" : undefined}
                  onClick={() => setKind(k)}
                >
                  {k === "Images" ? <IconImage size={14} /> : null}
                  {k === "Videos" ? <IconVideo size={14} /> : null}
                  {k}
                </button>
              ))}
            </div>
          </div>
          <div className="template-grid">
            {templates.map((t, i) => (
              <button
                key={t.title}
                type="button"
                className="template-card"
                onClick={() => setPrompt(`${t.title} — ${t.category}`)}
              >
                <Media
                  seed={`tpl-${t.title}`}
                  tone={i % 3 ? "light" : "vivid"}
                  ratio="4 / 5"
                  radius={10}
                />
                <span className="template-meta">
                  <small>{t.category}</small>
                  <strong className="display">{t.title}</strong>
                </span>
              </button>
            ))}
          </div>
        </section>
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
