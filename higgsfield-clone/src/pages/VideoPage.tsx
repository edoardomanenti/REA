import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  generateVideo,
  type GeneratedAsset,
  type VideoGenerationRequest,
} from "../api/generation";
import { videoModels } from "../config/models";
import { Notice } from "../components/Controls";
import { VideoCanvas, type CanvasTab } from "../components/VideoCanvas";
import { VideoPanel } from "../components/VideoPanel";

export function VideoPage() {
  const [params] = useSearchParams();
  const initial =
    (videoModels.find((m) => m.id === params.get("model")) ?? videoModels[0])
      ?.id ?? "";
  const [model, setModel] = useState(initial);
  const [tab, setTab] = useState<CanvasTab>("how");
  const [history, setHistory] = useState<GeneratedAsset[]>([]);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const generate = async (request: VideoGenerationRequest) => {
    setBusy(true);
    const outcome = await generateVideo(request);
    setBusy(false);
    if (!outcome.ok) {
      setNotice(outcome.error.message);
      return;
    }
    setHistory((previous) => [...outcome.assets, ...previous]);
    setTab("history");
  };

  return (
    <main className="video-studio">
      <VideoPanel
        model={model}
        onModelChange={setModel}
        busy={busy}
        onGenerate={(request) => void generate(request)}
      />
      <VideoCanvas
        modelLabel={videoModels.find((m) => m.id === model)?.label ?? ""}
        tab={tab}
        onTabChange={setTab}
        history={history}
      />
      {notice ? (
        <Notice message={notice} onClose={() => setNotice(null)} />
      ) : null}
    </main>
  );
}
