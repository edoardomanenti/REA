import { galleries } from "../content/home";
import { Festival } from "../sections/Festival";
import { HeroCarousel } from "../sections/HeroCarousel";
import { InfluencerBanner } from "../sections/InfluencerBanner";
import { McpSection } from "../sections/McpSection";
import {
  GallerySection,
  SwapSection,
  VisualEffects,
} from "../sections/MediaGalleries";
import { PromoRow } from "../sections/PromoRow";
import {
  AgentBanner,
  CanvasBanner,
  ExploreMore,
  PhotoSeriesBanner,
  Projects,
} from "../sections/Showcase";

// Section order matches the original homepage top to bottom.
export function Home() {
  return (
    <main className="home">
      <HeroCarousel />
      <div className="home-stack">
        <PromoRow />
        <InfluencerBanner />
        <Festival />
        <McpSection />
      </div>
      <div className="home-stack">
        <VisualEffects />
        <SwapSection />
      </div>
      <GallerySection gallery={galleries.seedance25} />
      <div className="home-band">
        <Projects />
      </div>
      <div className="home-band">
        <AgentBanner />
      </div>
      <GallerySection gallery={galleries.gptImage2} />
      <div className="home-band">
        <CanvasBanner />
      </div>
      <GallerySection gallery={galleries.marketing} />
      <GallerySection gallery={galleries.seedance20} />
      <div className="home-band">
        <PhotoSeriesBanner />
      </div>
      <GallerySection gallery={galleries.museCinema} />
      <GallerySection gallery={galleries.muse2} />
      <ExploreMore />
    </main>
  );
}
