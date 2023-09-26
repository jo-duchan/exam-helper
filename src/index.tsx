import React from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import OverlayContext from "contexts/OverlayContext";
import { GlobalStyle } from "styles/common";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <OverlayContext>
    <GlobalStyle />
    <App />
  </OverlayContext>
);
