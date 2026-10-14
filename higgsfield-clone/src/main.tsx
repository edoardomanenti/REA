import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./styles/global.css";
import "./styles/header.css";
import "./styles/home.css";
import "./styles/banners.css";
import "./styles/create.css";
import "./styles/footer.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root element");

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
