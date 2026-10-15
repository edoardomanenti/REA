import { useState } from "react";
import { Link } from "react-router-dom";
import { brand } from "../config/brand";
import { LogoMark } from "./Logo";
import { Media } from "./Media";
import {
  IconClose,
  IconDiamond,
  IconFilter,
  IconHeart,
  IconHome,
  IconPlus,
  IconSidebar,
  IconUsers,
} from "./icons";

const items = [
  { label: "Home", icon: IconHome },
  { label: "My elements", icon: IconFilter },
  { label: "My favorites", icon: IconHeart },
  { label: "Community", icon: IconUsers },
] as const;

// Left app sidebar used by Cinema Studio and Marketing Studio, which replace the
// site header with their own shell. `compact` shows icons only.
export function AppSidebar({
  title,
  compact = false,
}: {
  title: string;
  compact?: boolean;
}) {
  const [learn, setLearn] = useState(true);
  return (
    <aside className={`app-sidebar${compact ? " is-compact" : ""}`}>
      <div className="app-sidebar-top">
        {compact ? null : (
          <Link to="/" className="app-switcher">
            <LogoMark size={24} />
            <span>{title}</span>
          </Link>
        )}
        <button
          type="button"
          className="app-icon-button"
          aria-label="Toggle sidebar"
        >
          <IconSidebar />
        </button>
      </div>
      <nav className="app-nav">
        {items.map((item, i) => (
          <button
            key={item.label}
            type="button"
            className={i === 0 ? "is-active" : undefined}
            aria-label={item.label}
          >
            <span className={`app-nav-icon is-${i}`}>
              <item.icon size={14} />
            </span>
            {compact ? null : item.label}
          </button>
        ))}
      </nav>
      {compact ? null : (
        <div className="app-projects">
          <p>Projects</p>
          <button type="button">
            <IconPlus size={14} /> New project
          </button>
        </div>
      )}
      <div className="app-sidebar-bottom">
        {learn && !compact ? (
          <div className="learn-card">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setLearn(false)}
            >
              <IconClose size={12} />
            </button>
            <p className="text-muted">Learn to make movies</p>
            <p>Practical workflows from working AI filmmakers</p>
            <Media seed="learn" tone="warm" className="learn-media" />
            <a href="#" className="btn btn-white btn-sm">
              Learn more
            </a>
          </div>
        ) : null}
        <Link to="/pricing" className="app-pricing" aria-label="Pricing">
          <IconDiamond />
          {compact ? null : (
            <>
              Pricing{" "}
              <span className="discount-badge is-static">
                {brand.discountLabel}
              </span>
            </>
          )}
        </Link>
        <button type="button" className="app-login">
          {compact ? "→" : "Log in"}
        </button>
      </div>
    </aside>
  );
}
