import { Link } from "react-router-dom";
import { brand } from "../config/brand";
import { FadeMore } from "../components/Masonry";
import { LogoBadge, LogoMark } from "../components/Logo";
import { Media } from "../components/Media";
import {
  IconGlobeLock,
  IconImage,
  IconSparkle,
  IconVideo,
} from "../components/icons";
import {
  agentBanner,
  canvasBanner,
  exploreMore,
  photoSeriesBanner,
  projects,
} from "../content/home";

export function Projects() {
  return (
    <section className="projects">
      <h2 className="section-title display">{projects.title}</h2>
      <p className="section-description">{projects.description}</p>
      <div className="projects-clip">
        <div className="projects-grid">
          {projects.items.map((title, i) => (
            <a href="#" className="project-card" key={title}>
              <Media
                seed={`project-${i}`}
                tone={i % 3 === 0 ? "vivid" : "cool"}
                ratio="16 / 9"
                radius={8}
                className="project-media"
              />
              <span className="project-meta">
                <LogoBadge size={20} />
                <span className="project-name">
                  {title}{" "}
                  <span className="text-muted">by {brand.name} Studio</span>
                </span>
                <span className="project-public">
                  <IconGlobeLock size={12} />
                  Public
                </span>
              </span>
            </a>
          ))}
        </div>
        <FadeMore label={projects.cta} />
      </div>
    </section>
  );
}

export function AgentBanner() {
  return (
    <Link to="/agent" className="agent-banner">
      <span className="agent-grid" aria-hidden="true" />
      <span className="agent-panel is-left" aria-hidden="true">
        <span className="agent-panel-head">UGC Creator</span>
        <span className="agent-panel-media">
          <Media seed="agent-ugc-1" tone="warm" />
          <Media seed="agent-ugc-2" tone="vivid" />
          <Media seed="agent-ugc-3" tone="warm" />
        </span>
      </span>
      <span className="agent-panel is-right" aria-hidden="true">
        <span className="agent-panel-head">Marketing</span>
        <span className="agent-panel-media">
          <Media seed="agent-mkt-1" tone="vivid" />
          <Media seed="agent-mkt-2" tone="warm" />
        </span>
        <span className="agent-chip is-lime">Analyzing hooks</span>
      </span>
      <span className="agent-chip is-white" aria-hidden="true">
        Visualizing
      </span>
      <span className="agent-panel is-bottom" aria-hidden="true">
        <span className="agent-panel-head">Production</span>
        <span className="agent-panel-media">
          <Media seed="agent-prod-1" tone="cool" />
          <Media seed="agent-prod-2" tone="warm" />
        </span>
      </span>
      <span className="agent-content">
        <span className="agent-apps" aria-hidden="true">
          <LogoMark size={28} />
        </span>
        <span className="agent-title display">{agentBanner.title}</span>
        <span className="agent-subtitle">{agentBanner.subtitle}</span>
        <span className="btn btn-white btn-md">{agentBanner.cta}</span>
      </span>
    </Link>
  );
}

export function CanvasBanner() {
  return (
    <Link to="/canvas" className="canvas-banner">
      <span className="canvas-content">
        <span className="canvas-eyebrow">{canvasBanner.eyebrow}</span>
        <span className="canvas-title display">
          {canvasBanner.title[0]}
          <br />
          {canvasBanner.title[1]}
        </span>
        <span className="canvas-description">{canvasBanner.description}</span>
        <span className="btn btn-white btn-sm canvas-cta">
          <IconSparkle />
          {canvasBanner.cta}
        </span>
      </span>
      <span className="canvas-board" aria-hidden="true">
        <span className="canvas-node is-image">
          <span className="canvas-node-label">
            <IconImage size={14} /> Image Generation
          </span>
          <Media seed="canvas-image" tone="light" />
        </span>
        <span className="canvas-note">
          Let's create an engaging video for our brand, please upload product
          image
        </span>
        <span className="canvas-bubble">That's cool!</span>
        <span className="canvas-node is-video">
          <span className="canvas-node-label">
            <IconVideo size={14} /> Video Generation
          </span>
          <Media seed="canvas-video" tone="light" />
        </span>
        <span className="canvas-wire" />
      </span>
    </Link>
  );
}

export function PhotoSeriesBanner() {
  return (
    <Link to="/photo-series" className="photo-banner">
      <span className="photo-content">
        <span className="photo-tag">{photoSeriesBanner.tag}</span>
        <span className="photo-title display">
          {photoSeriesBanner.title[0]}
          <br />
          {photoSeriesBanner.title[1]}
        </span>
        <span className="photo-description">
          {photoSeriesBanner.description}
        </span>
        <span className="btn btn-white btn-md">{photoSeriesBanner.cta}</span>
      </span>
      <span className="photo-fan" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Media
            key={i}
            seed={`photo-${i}`}
            tone={i % 2 ? "cool" : "warm"}
            className={`photo-card is-${i}`}
          />
        ))}
      </span>
    </Link>
  );
}

export function ExploreMore() {
  return (
    <section className="explore-more">
      <h2 className="explore-title display">{exploreMore.title}</h2>
      <div className="explore-chips">
        {exploreMore.chips.map((chip) => (
          <a href="#" className="explore-chip" key={chip}>
            {chip}
          </a>
        ))}
      </div>
    </section>
  );
}
