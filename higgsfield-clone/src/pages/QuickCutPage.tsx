import { useState } from "react";
import { brand } from "../config/brand";
import { quickCutFilters, quickCutPresets } from "../content/tools";
import { Notice } from "../components/Controls";
import { Masonry } from "../components/Masonry";
import { Media } from "../components/Media";
import {
  AssetGrid,
  DropTile,
  GenerateButton,
  ToggleRow,
  useToolRunner,
} from "../components/Studio";
import {
  IconExpand,
  IconHeart,
  IconSparkleFill,
  IconUser,
  IconVideo,
} from "../components/icons";

const columns = [
  [900, 4],
  [600, 3],
  [0, 2],
] as const;
const ratios = [
  0.75, 0.5635, 0.75, 0.5635, 1, 0.75, 0.5635, 0.75, 1, 0.5635, 0.75, 0.75,
];

export function QuickCutPage() {
  const [reference, setReference] = useState<File[]>([]);
  const [characters, setCharacters] = useState<File[]>([]);
  const [instructionsOn, setInstructionsOn] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [filter, setFilter] = useState<(typeof quickCutFilters)[number]>("All");
  const runner = useToolRunner();

  const presets = quickCutPresets
    .map((preset, i) => ({
      ...preset,
      seed: `cut-${i}`,
      ratio: ratios[i] ?? 0.75,
    }))
    .filter((preset) => filter === "All" || preset.category === filter);

  return (
    <main className="video-studio tool-studio">
      <aside className="video-panel">
        <div className="preset-card is-hero">
          <Media seed="quick-cut-hero" tone="dark" className="preset-media" />
          <p className="preset-name display">
            {brand.name} {brand.products.cut}
          </p>
          <p className="preset-model">Recreate edits with your content</p>
        </div>
        <DropTile
          className="is-tall"
          icon={<IconVideo size={16} />}
          title="Add a reference video"
          hint="Upload the edit you want to recreate"
          accept="video/*"
          files={reference}
          onFiles={setReference}
        />
        <DropTile
          className="is-tall"
          icon={<IconUser size={16} />}
          title="Add your characters"
          hint="Also you can add other details"
          accept="image/*"
          multiple
          files={characters}
          onFiles={setCharacters}
        />
        <ToggleRow
          label="Instructions"
          hint="(optional)"
          checked={instructionsOn}
          onChange={setInstructionsOn}
        />
        {instructionsOn ? (
          <label className="prompt-box">
            <textarea
              rows={3}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Anything to change from the reference edit…"
            />
          </label>
        ) : null}
        <GenerateButton
          busy={runner.busy}
          onClick={() =>
            void runner.run({
              tool: "quick_cut",
              prompt: instructionsOn ? instructions : "",
              options: {},
              files: { reference, characters },
            })
          }
        />
      </aside>

      <section className="video-canvas is-flush">
        {runner.history.length ? (
          <div className="cut-results">
            <AssetGrid items={runner.history} />
          </div>
        ) : (
          <Media seed="quick-cut-banner" tone="light" className="cut-banner" />
        )}
        <div className="presets-bar">
          <h2>Community presets</h2>
          <div className="pill-tabs">
            {quickCutFilters.map((f) => (
              <button
                key={f}
                type="button"
                className={filter === f ? "is-active" : undefined}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="cut-presets">
          <Masonry
            items={presets}
            breakpoints={columns}
            gap={16}
            render={(item, i) => (
              <article className="preset-tile">
                <Media
                  seed={item.seed}
                  tone={i % 2 ? "warm" : "cool"}
                  ratio={String(item.ratio)}
                  radius={14}
                />
                <span className="preset-tile-tools" aria-hidden="true">
                  <IconExpand />
                </span>
                <span className="preset-tile-footer">
                  <span className="like-pill">
                    <IconHeart size={14} />0
                  </span>
                  <button type="button" className="recreate-pill">
                    <IconSparkleFill size={13} />
                    Recreate
                  </button>
                </span>
              </article>
            )}
          />
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
