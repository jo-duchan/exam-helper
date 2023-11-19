import ReactDOM from "react-dom/client";
import App from "App";
import { Provider } from "react-redux";
import store from "store/store";
import { GlobalStyle } from "styles/common";
import RenderOverlays from "components/overlays/RenderOverlays";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <RenderOverlays />
    <App />
  </Provider>
);
