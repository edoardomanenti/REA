import { useRef, useState, type CSSProperties } from "react";
import { brand } from "../config/brand";
import { editTools } from "../content/tools";
import { Notice } from "../components/Controls";
import { Media } from "../components/Media";
import { AssetGrid, useToolRunner } from "../components/Studio";
import { IconChevronRight, IconLayers, IconPlus } from "../components/icons";

const cardWidth = (offset: number) => 316 - Math.abs(offset) * 50;

// Horizontal centre of a fan card: side cards sit edge to edge with their neighbour.
function cardCenter(offset: number): number {
  let x = 0;
  for (let k = 1; k <= Math.abs(offset); k++)
    x += cardWidth(k - 1) / 2 + cardWidth(k) / 2;
  return Math.sign(offset) * x;
}

export function EditPage() {
  const [active, setActive] = useState(2);
  const [tool, setTool] = useState<(typeof editTools)[number]>(
    "Layer decomposition",
  );
  const input = useRef<HTMLInputElement>(null);
  const runner = useToolRunner();

  const upload = (files: File[]) => {
    if (!files.length) return;
    void runner.run({
      tool: "layers",
      prompt: "",
      options: { operation: tool },
      files: { image: files },
    });
  };
  const shift = (step: number) =>
    setActive((active + step + editTools.length) % editTools.length);

  return (
    <main className="edit-page">
      <div className="edit-fan">
        {editTools.map((name, i) => {
          const offset = i - active;
          return (
            <button
              key={name}
              type="button"
              className={`edit-card${offset === 0 ? " is-active" : ""}`}
              style={
                {
                  "--offset": offset,
                  "--x": `${cardCenter(offset)}px`,
                } as CSSProperties
              }
              onClick={() => {
                setActive(i);
                setTool(name);
              }}
            >
              <Media
                seed={`edit-${name}`}
                tone={i % 2 ? "cool" : "warm"}
                className="edit-card-media"
              >
                <span className="edit-card-label">{name}</span>
              </Media>
            </button>
          );
        })}
      </div>
      <div className="edit-arrows">
        <button type="button" aria-label="Previous" onClick={() => shift(-1)}>
          <IconChevronRight style={{ transform: "rotate(180deg)" }} />
        </button>
        <button type="button" aria-label="Next" onClick={() => shift(1)}>
          <IconChevronRight />
        </button>
      </div>
      <span className="pill-grey">
        <IconLayers size={12} /> {brand.name} Layers
      </span>
      <h1 className="edit-title display">
        <span className="gradient-text">Turn flat images</span>
        <br />
        <span className="ads-title-dim">into editable layers.</span>
      </h1>
      <p className="edit-text">
        Turn flat images into editable layers. Separate, edit, and rebuild any
        image. Every element, now yours to edit.
      </p>
      <button
        type="button"
        className="btn btn-primary btn-lg edit-upload"
        disabled={runner.busy}
        onClick={() => input.current?.click()}
      >
        <IconPlus />
        {runner.busy ? "Processing…" : "Upload Media"}
      </button>
      <input
        ref={input}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => upload(Array.from(e.target.files ?? []))}
      />
      <section className="edit-projects">
        <h2>
          My projects <IconChevronRight />
        </h2>
        <div className="edit-empty">
          {runner.history.length ? (
            <AssetGrid items={runner.history} />
          ) : (
            <>
              <strong>Your edit projects will appear here</strong>
              <span>
                Upload an image to separate it into editable layers — every
                project you start is saved here.
              </span>
            </>
          )}
        </div>
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
