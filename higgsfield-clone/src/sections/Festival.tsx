import { useEffect, useState } from "react";
import { LogoBadge } from "../components/Logo";
import { Media } from "../components/Media";
import { IconStar } from "../components/icons";
import { festival } from "../content/home";

function useCountdown(deadline: number): string {
  const format = () => {
    const minutes = Math.max(0, Math.floor((deadline - Date.now()) / 60000));
    const d = Math.floor(minutes / 1440);
    const h = Math.floor((minutes % 1440) / 60);
    const m = minutes % 60;
    return `${d}D : ${h}H : ${m}M`;
  };
  const [value, setValue] = useState(format);
  useEffect(() => {
    const timer = window.setInterval(() => setValue(format()), 30000);
    return () => window.clearInterval(timer);
  });
  return value;
}

export function Festival() {
  const countdown = useCountdown(festival.deadline);
  return (
    <section className="festival" aria-label={festival.title.join(" ")}>
      <span className="festival-beam" aria-hidden="true" />
      <div className="festival-head">
        <div>
          <p className="festival-logo display">
            <span className="festival-logo-brand">
              {festival.name.split(" ")[0]}
            </span>
            <span>{festival.name.split(" ").slice(1).join(" ")}</span>
          </p>
          <h2 className="festival-title display gradient-text">
            {festival.title[0]}
            <br />
            {festival.title[1]}
          </h2>
        </div>
        <div className="festival-meta">
          <p className="festival-prize">
            <span aria-hidden="true">❦</span>
            {festival.prize}
            <span aria-hidden="true">❦</span>
          </p>
          <p className="festival-countdown" aria-label="Time left">
            {countdown}
          </p>
        </div>
      </div>

      <div className="festival-grid">
        {festival.films.map((film, i) => (
          <article
            className="film-card"
            key={film.title}
            aria-label={film.title}
          >
            <a href="#" className="film-link">
              <span className="visually-hidden">View {film.title}</span>
            </a>
            <Media
              seed={`film-${i}`}
              tone={i % 4 === 3 ? "warm" : "dark"}
              className="film-media"
            >
              <span className="film-name">{film.title}</span>
            </Media>
            <button
              type="button"
              className={`film-ribbon is-${film.badge}`}
              aria-label={film.badge === "picks" ? "Picks" : "Public shortlist"}
            >
              {film.badge === "picks" ? (
                <LogoBadge size={18} />
              ) : (
                <IconStar size={16} />
              )}
            </button>
          </article>
        ))}
        <div className="fade-more festival-more">
          <a href="#" className="btn btn-primary btn-md">
            {festival.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
