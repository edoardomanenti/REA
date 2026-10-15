import { useState } from "react";
import type { ToolId } from "../api/generation";
import { audioModels } from "../config/models";
import { audioLanguages, audioTabs } from "../content/tools";
import { Notice } from "../components/Controls";
import { Media } from "../components/Media";
import {
  AssetGrid,
  CanvasTabs,
  DropTile,
  GenerateButton,
  SettingField,
  StepperRow,
  useToolRunner,
  type CanvasTab,
} from "../components/Studio";
import {
  IconBars,
  IconChevronRight,
  IconFilter,
  IconImage,
  IconInfo,
  IconMusic,
  IconWave,
} from "../components/icons";

type AudioTab = (typeof audioTabs)[number];

const toolFor: Record<AudioTab, ToolId> = {
  "Text to Speech": "audio.tts",
  "Voice Change": "audio.voice_change",
  Translate: "audio.translate",
};

const intro: Record<AudioTab, { title: string; subtitle: string }> = {
  "Text to Speech": {
    title: "Turn text into speech",
    subtitle: "Lifelike speech from any script — ready for your projects",
  },
  "Voice Change": {
    title: "Change any voice",
    subtitle: "Keep the performance, swap the voice in one click",
  },
  Translate: {
    title: "Translate your voice",
    subtitle: "Dub your audio or video into another language",
  },
};

export function AudioPage() {
  const [tab, setTab] = useState<AudioTab>("Text to Speech");
  const [media, setMedia] = useState<File[]>([]);
  const [script, setScript] = useState("");
  const [model, setModel] = useState<string>(audioModels[0]);
  const [batch, setBatch] = useState(1);
  const [voice, setVoice] = useState("");
  const [language, setLanguage] = useState("English");
  const [canvasTab, setCanvasTab] = useState<CanvasTab>("how");
  const runner = useToolRunner();
  const tts = tab === "Text to Speech";

  const generate = async () => {
    const ok = await runner.run({
      tool: toolFor[tab],
      prompt: script,
      options: { model, batch, voice, language },
      files: { media },
    });
    if (ok) setCanvasTab("history");
  };

  return (
    <main className="video-studio tool-studio is-wide-panel">
      <aside className="video-panel">
        <div className="mode-tabs" role="tablist">
          {audioTabs.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              className={tab === t ? "is-active" : undefined}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <DropTile
          className="is-tall"
          badge={tts ? "Optional" : undefined}
          icon={
            <span className="dropzone-icons">
              <IconWave size={14} />
              <IconMusic size={14} />
              <IconImage size={14} />
            </span>
          }
          title="Upload media"
          hint={
            tts ? "Up to 3 Voices/Audios or Image" : "Audio or video to process"
          }
          accept="audio/*,video/*,image/*"
          multiple
          files={media}
          onFiles={(files) => setMedia(files.slice(0, 3))}
        />
        {tts ? (
          <label className="prompt-box is-tall">
            <span className="prompt-label">
              Script
              <IconInfo className="prompt-info" />
            </span>
            <textarea
              rows={5}
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder={
                "Write exactly what the voice will read out loud.\nType @ to reference attachments"
              }
            />
          </label>
        ) : null}
        {tab === "Translate" ? (
          <SettingField
            caption="Target language"
            value={language}
            options={audioLanguages}
            onChange={setLanguage}
          />
        ) : null}
        <SettingField
          caption="Model"
          value={model}
          options={audioModels}
          onChange={setModel}
          render={(m) => (
            <>
              {m} <IconBars size={13} className="text-lime" />
            </>
          )}
        />
        <StepperRow
          label="Batch size"
          value={batch}
          max={4}
          onChange={setBatch}
        />
        <label className="prompt-box">
          <span className="prompt-label">
            Voice details <span className="drop-badge is-inline">Optional</span>
          </span>
          <textarea
            rows={3}
            maxLength={500}
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            placeholder="e.g. Young female voice with british accent, soft and loud. Excited, giggling"
          />
          <span className="prompt-counter">{voice.length}/500</span>
        </label>
        <button type="button" className="advanced-row">
          <IconFilter />
          Advanced settings
          <IconChevronRight />
        </button>
        <GenerateButton busy={runner.busy} onClick={() => void generate()} />
      </aside>

      <section className="video-canvas">
        <CanvasTabs
          tab={canvasTab}
          onChange={setCanvasTab}
          extra={
            <button type="button" className="filters-button">
              <IconFilter />
              Filters
            </button>
          }
        />
        {canvasTab === "how" ? (
          <div className="audio-intro">
            <h1 className="how-title display">{intro[tab].title}</h1>
            <p className="audio-subtitle">{intro[tab].subtitle}</p>
            <div className="audio-cards">
              <article className="audio-card">
                <h2>Pick or clone a voice</h2>
                <p>Choose a preset, clone your own, or pick a model</p>
                <Media
                  seed="audio-voice"
                  tone="warm"
                  className="audio-card-media"
                />
              </article>
              <article className="audio-card">
                <h2>Write, describe and generate</h2>
                <p>Type your script, describe how it sounds, and create</p>
                <Media
                  seed="audio-write"
                  tone="cool"
                  className="audio-card-media"
                />
              </article>
            </div>
          </div>
        ) : (
          <AssetGrid items={runner.history} />
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
