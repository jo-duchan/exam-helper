import { RouterProvider } from "react-router-dom";
import useOverlay from "hook/useOverlay";
import useInAppBypassing from "hook/useInAppBypassing";
import ReactRouterObject from "ReactRouter";

function App() {
  const { showProgress, hideProgress } = useOverlay();
  // 라우팅 개선할때 추가 개선.
  useInAppBypassing();

  return (
    <RouterProvider
      router={ReactRouterObject({ showProgress, hideProgress })}
    />
  );
}

export default App;
