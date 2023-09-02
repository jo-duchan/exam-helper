import React from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import ScoreContext from "storage/ScoreContext";
import { GlobalStyle } from "styles/common";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ScoreContext>
    <GlobalStyle />
    <App />
  </ScoreContext>
);
