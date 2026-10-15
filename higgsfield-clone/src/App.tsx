import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { brand } from "./config/brand";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { MobileTabBar } from "./components/MobileTabBar";
import { AdsStudioPage, AdsToolPage } from "./pages/AdsStudioPage";
import { AudioPage } from "./pages/AudioPage";
import { CinemaStudioPage } from "./pages/CinemaStudioPage";
import { EditPage } from "./pages/EditPage";
import { EffectsPage } from "./pages/EffectsPage";
import { Home } from "./pages/Home";
import { ImagePage } from "./pages/ImagePage";
import { InfluencerPage } from "./pages/InfluencerPage";
import { MarketingStudioPage } from "./pages/MarketingStudioPage";
import { Placeholder } from "./pages/Placeholder";
import { QuickCutPage } from "./pages/QuickCutPage";
import { RealitySwapPage, RealitySwapStudio } from "./pages/RealitySwapPage";
import { VideoPage } from "./pages/VideoPage";

const p = brand.products;
const titles: Record<string, string> = {
  "/": `${brand.name} — ${brand.tagline}`,
  "/ai/image": `Create AI Images from Text & Photo | ${brand.name}`,
  "/ai/video": `Create AI Videos from Text & Image | ${brand.name}`,
  "/audio": `${brand.name} Audio - AI Voice Over & Voice Translation`,
  "/reality-swap": `${brand.name} ${p.swap} — Reality Manipulation`,
  "/reality-swap/create": `${p.swap} | ${brand.name}`,
  "/quick-cut": `${p.cut} | ${brand.name}`,
  "/ai-influencer": `AI Influencer | ${brand.name}`,
  "/ads-studio": "Ads Studio",
  "/ads-studio/create": "Static ads | Ads Studio",
  "/ads-studio/multiplier": "Ad multiplier | Ads Studio",
  "/effects": `AI Visual Effects Generator | ${brand.name}`,
  "/cinema-studio": `Cinema Studio — Direct Every Detail | ${brand.name}`,
  "/marketing-studio": `Marketing Studio • ${brand.name}`,
  "/edit": `Image Edit — Turn Flat Images Into Editable Layers | ${brand.name}`,
};

// Cinema and Marketing Studio bring their own sidebar instead of the site header.
const appShellRoutes = ["/cinema-studio", "/marketing-studio"];

export function App() {
  const { pathname } = useLocation();
  const appShell = appShellRoutes.includes(pathname);
  const withFooter = pathname === "/" || !(pathname in titles);

  useEffect(() => {
    document.title = titles[pathname] ?? brand.name;
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`page${withFooter ? "" : " is-studio"}`}>
      {appShell ? null : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai/image" element={<ImagePage />} />
        <Route path="/ai/video" element={<VideoPage />} />
        <Route path="/audio" element={<AudioPage />} />
        <Route path="/reality-swap" element={<RealitySwapPage />} />
        <Route path="/reality-swap/create" element={<RealitySwapStudio />} />
        <Route path="/quick-cut" element={<QuickCutPage />} />
        <Route path="/ai-influencer" element={<InfluencerPage />} />
        <Route path="/ads-studio" element={<AdsStudioPage />} />
        <Route
          path="/ads-studio/create"
          element={<AdsToolPage kind="static" />}
        />
        <Route
          path="/ads-studio/multiplier"
          element={<AdsToolPage kind="multiplier" />}
        />
        <Route path="/effects" element={<EffectsPage />} />
        <Route path="/cinema-studio" element={<CinemaStudioPage />} />
        <Route path="/marketing-studio" element={<MarketingStudioPage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="*" element={<Placeholder />} />
      </Routes>
      {withFooter ? <Footer /> : null}
      <MobileTabBar />
    </div>
  );
}
