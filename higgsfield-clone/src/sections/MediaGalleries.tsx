import { FadeMore, Masonry, SectionHeader } from "../components/Masonry";
import { Media } from "../components/Media";
import { IconLayers, IconMotion } from "../components/icons";
import { swapSection, visualEffects, type Gallery } from "../content/home";

const fiveColumns = [
  [1200, 5],
  [900, 4],
  [600, 3],
  [0, 2],
] as const;
const fourColumns = [
  [900, 4],
  [600, 3],
  [0, 2],
] as const;

export function VisualEffects() {
  return (
    <section className="gallery-section">
      <SectionHeader
        title={visualEffects.title}
        description={visualEffects.description}
        action={
          <a href="#" className="btn btn-primary btn-lg">
            {visualEffects.cta}
          </a>
        }
      />
      <div className="gallery-clip is-tall">
        <Masonry
          items={visualEffects.items}
          breakpoints={fiveColumns}
          render={(item) => (
            <figure className="effect-card">
              <Media
                seed={item.seed}
                tone="cool"
                ratio={String(item.ratio)}
                radius={12}
                {...item.media}
              />
              <figcaption>
                <h3 className="effect-title display">{item.title}</h3>
                <a href="#" className="effect-recreate">
                  Recreate
                </a>
              </figcaption>
            </figure>
          )}
        />
        <FadeMore label={visualEffects.more} />
      </div>
    </section>
  );
}

export function SwapSection() {
  return (
    <section className="swap-section" aria-label={swapSection.title}>
      <span className="pill-outline">≈ {swapSection.pill}</span>
      <div className="swap-head">
        <div>
          <h2 className="swap-title display">
            <a href="#">{swapSection.title}</a>
          </h2>
          <p className="swap-description">{swapSection.description}</p>
        </div>
        <div className="swap-actions">
          <a href="/ai/video" className="btn btn-primary btn-lg">
            {swapSection.primary}
          </a>
          <a href="#" className="btn btn-white btn-lg">
            {swapSection.secondary}
          </a>
        </div>
      </div>
      <div className="gallery-clip is-swap">
        <Masonry
          items={swapSection.items}
          breakpoints={fiveColumns}
          render={(item) => (
            <article className="swap-card">
              <Media
                seed={item.seed}
                tone="cool"
                ratio={String(item.ratio)}
                radius={12}
                {...item.media}
              >
                <span className="swap-tag">
                  {item.tag === "Motion transfer" ? (
                    <IconMotion size={11} />
                  ) : (
                    <IconLayers size={11} />
                  )}
                  {item.tag}
                </span>
              </Media>
              <button type="button" className="visually-hidden">
                Open preset
              </button>
            </article>
          )}
        />
        <FadeMore label={swapSection.more} />
      </div>
    </section>
  );
}

export function GallerySection({ gallery }: { gallery: Gallery }) {
  return (
    <section className="gallery-section is-model">
      <SectionHeader title={gallery.title} description={gallery.description} />
      <div className="gallery-clip">
        <Masonry
          items={gallery.items}
          breakpoints={fourColumns}
          render={(item) => (
            <Media
              seed={item.seed}
              tone={gallery.tone}
              ratio={String(item.ratio)}
              radius={12}
              {...item.media}
            />
          )}
        />
        <FadeMore label={`View all of ${gallery.title}`} />
      </div>
    </section>
  );
}
