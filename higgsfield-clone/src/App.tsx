import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { brand } from "./config/brand";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { MobileTabBar } from "./components/MobileTabBar";
import { Home } from "./pages/Home";
import { ImagePage } from "./pages/ImagePage";
import { Placeholder } from "./pages/Placeholder";
import { VideoPage } from "./pages/VideoPage";

const titles: Record<string, string> = {
  "/": `${brand.name} — ${brand.tagline}`,
  "/ai/image": `Create AI Images from Text & Photo | ${brand.name}`,
  "/ai/video": `Create AI Videos from Text & Image | ${brand.name}`,
};

export function App() {
  const { pathname } = useLocation();
  const isStudio = pathname.startsWith("/ai/");

  useEffect(() => {
    document.title = titles[pathname] ?? brand.name;
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`page${isStudio ? " is-studio" : ""}`}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai/image" element={<ImagePage />} />
        <Route path="/ai/video" element={<VideoPage />} />
        <Route path="*" element={<Placeholder />} />
      </Routes>
      {isStudio ? null : <Footer />}
      <MobileTabBar />
    </div>
  );
}
