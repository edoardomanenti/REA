import { Link } from "react-router-dom";
import { Media } from "../components/Media";
import {
  IconBars,
  IconCheck,
  IconCpu,
  IconFilm,
  IconSparkleFill,
  IconVideo,
} from "../components/icons";
import { featureCards, signupPromo, type FeatureCard } from "../content/home";

const featureIcon = (icon: FeatureCard["icon"]) => {
  switch (icon) {
    case "bars":
      return <IconBars size={18} />;
    case "sparkle":
      return <IconSparkleFill size={18} />;
    case "swap":
      return <span className="swap-glyph">≈</span>;
    case "mcp":
      return <span className="mcp-glyph">✺</span>;
    case "film":
      return <IconFilm size={18} />;
    case "cpu":
      return <IconCpu size={18} />;
  }
};

export function PromoRow() {
  return (
    <div className="promo-row">
      <button type="button" className="signup-card">
        <Media seed="signup-promo" tone="cool" className="signup-media" />
        <span className="signup-shade" aria-hidden="true" />
        <span className="signup-content">
          <span className="signup-title display">
            {signupPromo.titleTop}
            <br />
            <span className="text-lime">{signupPromo.titleAccent}</span>
          </span>
          <span className="signup-perks">
            {signupPromo.perks.map((perk) => (
              <span key={perk}>
                <IconCheck size={12} />
                {perk}
              </span>
            ))}
          </span>
          <span className="btn btn-primary signup-cta">
            <span className="desktop-only">{signupPromo.cta}</span>
            <span className="mobile-only">{signupPromo.mobileCta}</span>
          </span>
        </span>
      </button>

      <div className="feature-grid">
        {featureCards.map((card) => (
          <Link to={card.href} className="feature-card" key={card.title}>
            <span className="feature-inner">
              <span className="feature-top">
                <span className="feature-icon">{featureIcon(card.icon)}</span>
                {card.chip ? (
                  <span className="feature-chip">
                    <IconVideo size={12} />
                    {card.chip}
                  </span>
                ) : null}
                {card.tag ? (
                  <span
                    className={`tag mobile-only ${card.tag === "TOP" ? "tag-top" : "tag-new"}`}
                  >
                    {card.tag}
                  </span>
                ) : null}
              </span>
              <span className="feature-text">
                <span className="feature-title">
                  {card.title}
                  {card.tag ? (
                    <span
                      className={`tag desktop-only ${card.tag === "TOP" ? "tag-top" : "tag-new"}`}
                    >
                      {card.tag}
                    </span>
                  ) : null}
                </span>
                <span className="feature-description">{card.description}</span>
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
