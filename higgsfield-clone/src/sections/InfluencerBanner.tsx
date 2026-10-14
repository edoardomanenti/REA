import { Link } from "react-router-dom";
import { Media } from "../components/Media";
import { IconGift } from "../components/icons";
import { influencerBanner } from "../content/home";

export function InfluencerBanner() {
  return (
    <Link to="/ai-influencer" className="influencer-banner">
      <Media
        seed="influencer-left"
        tone="dark"
        className="influencer-portrait is-left"
      />
      <Media
        seed="influencer-right"
        tone="warm"
        className="influencer-portrait is-right"
      />
      <span className="influencer-content">
        <span className="pill-lime">
          <IconGift size={14} />
          {influencerBanner.pill}
        </span>
        <span className="influencer-eyebrow display">
          {influencerBanner.eyebrow}
        </span>
        <span className="influencer-title display gradient-text">
          {influencerBanner.title}
        </span>
        <span className="influencer-subtitle">{influencerBanner.subtitle}</span>
        <span className="btn btn-primary btn-md">{influencerBanner.cta}</span>
      </span>
    </Link>
  );
}
