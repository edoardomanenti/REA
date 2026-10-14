import { useState } from "react";
import { Link } from "react-router-dom";
import { Media } from "./Media";
import { IconClose } from "./icons";

// Dismissible banner shown on top of the Image and Video studios.
export function PromoStrip() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="promo-strip">
      <p className="promo-strip-text display">
        <span className="text-lime">Build your next hype machine</span>
        <span>Pick the look. Add motion. Make hype.</span>
      </p>
      <div className="promo-strip-fan" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <Media
            key={i}
            seed={`strip-${i}`}
            tone={i % 2 ? "warm" : "light"}
            className="promo-strip-face"
            style={{
              transform: `rotate(${(i - 3.5) * 5}deg) translateY(${Math.abs(i - 3.5) * 3}px)`,
            }}
          />
        ))}
      </div>
      <Link
        to="/ai-influencer"
        className="btn btn-primary btn-sm promo-strip-cta"
      >
        Create your Influencer
      </Link>
      <button
        type="button"
        className="promo-strip-close"
        aria-label="Close"
        onClick={() => setOpen(false)}
      >
        <IconClose size={12} />
      </button>
    </div>
  );
}
