import { useRef } from "react";
import { Link } from "react-router-dom";
import { Media } from "../components/Media";
import { IconChevronRight } from "../components/icons";
import { heroCards } from "../content/home";

export function HeroCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const scrollBy = (direction: 1 | -1) =>
    track.current?.scrollBy({ left: direction * 532, behavior: "smooth" });

  return (
    <section className="hero-carousel" aria-label="Featured">
      <ul className="hero-track" ref={track}>
        {heroCards.map((card, i) => (
          <li className="hero-card" key={card.title}>
            <Link to={card.href} className="hero-card-link">
              <span className="visually-hidden">Open {card.title}</span>
            </Link>
            <Media
              seed={`hero-${i}`}
              tone={i === 1 || i === 2 ? "light" : "cool"}
              className="hero-media"
              {...card.media}
            />
            <h3 className="hero-title display">{card.title}</h3>
            <p className="hero-description">{card.description}</p>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="carousel-arrow is-prev"
        aria-label="Previous"
        onClick={() => scrollBy(-1)}
      >
        <IconChevronRight style={{ transform: "rotate(180deg)" }} />
      </button>
      <button
        type="button"
        className="carousel-arrow is-next"
        aria-label="Next"
        onClick={() => scrollBy(1)}
      >
        <IconChevronRight />
      </button>
    </section>
  );
}
