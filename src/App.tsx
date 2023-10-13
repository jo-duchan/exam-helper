import { RouterProvider } from "react-router-dom";
import useOverlay from "hook/useOverlay";
import ReactRouterObject from "ReactRouter";

function App() {
  const { showProgress, hideProgress } = useOverlay();

  return (
    <RouterProvider
      router={ReactRouterObject({ showProgress, hideProgress })}
    />
  );
}

export default App;
