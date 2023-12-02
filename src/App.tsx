import { Provider } from "react-redux";
import store from "store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import RouterObject from "Routers";
import { GlobalStyle } from "styles/common";
import RenderOverlays from "components/overlays/RenderOverlays";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <RenderOverlays />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={RouterObject} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
