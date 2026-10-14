import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  generateImage,
  type GeneratedAsset,
  type ImageGenerationRequest,
} from "../api/generation";
import { brand } from "../config/brand";
import { imageModels } from "../config/models";
import { Notice } from "../components/Controls";
import { ImageDock } from "../components/ImageDock";
import { Media } from "../components/Media";
import { PromoStrip } from "../components/PromoStrip";

function EmptyState() {
  return (
    <section className="image-empty">
      <div className="image-fan" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <Media
            key={i}
            seed={`image-fan-${i}`}
            tone={i === 3 ? "light" : "warm"}
            className={`image-fan-card is-${i}`}
          />
        ))}
      </div>
      <h1 className="image-empty-title display">
        Start creating with
        <br />
        <span className="text-lime">{brand.products.photoModel} Cinema</span>
      </h1>
      <p className="image-empty-subtitle">
        Describe a scene, character, mood, or style — and watch it come to life
      </p>
    </section>
  );
}

export function ImagePage() {
  const [params] = useSearchParams();
  const initialModel =
    (imageModels.find((m) => m.id === params.get("model")) ?? imageModels[0])
      ?.id ?? "";
  const [results, setResults] = useState<GeneratedAsset[]>([]);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [zoom, setZoom] = useState(4);

  const generate = async (request: ImageGenerationRequest) => {
    setBusy(true);
    const outcome = await generateImage(request);
    setBusy(false);
    if (outcome.ok) setResults((previous) => [...outcome.assets, ...previous]);
    else setNotice(outcome.error.message);
  };

  return (
    <main className="image-studio">
      <div className="studio-zoom">
        <input
          type="range"
          min={2}
          max={6}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          aria-label="Grid size"
        />
      </div>
      <PromoStrip />
      {results.length === 0 ? (
        <EmptyState />
      ) : (
        <section
          className="image-results"
          style={{ gridTemplateColumns: `repeat(${8 - zoom}, 1fr)` }}
        >
          {results.map((asset) => (
            <figure key={asset.id} className="image-result">
              <img src={asset.url} alt={asset.prompt} loading="lazy" />
            </figure>
          ))}
        </section>
      )}
      <ImageDock
        initialModel={initialModel}
        busy={busy}
        onGenerate={(request) => void generate(request)}
      />
      {notice ? (
        <Notice message={notice} onClose={() => setNotice(null)} />
      ) : null}
    </main>
  );
}
