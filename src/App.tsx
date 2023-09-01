import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouterProps,
} from "react-router-dom";

import Home from "pages/Home";

const router = createBrowserRouter([{ path: "/", element: <Home /> }], {
  basename: process.env.PUBLIC_URL,
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
