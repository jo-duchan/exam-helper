import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import QuizPage, { loader as QuizLoader } from "pages/Quiz";
import Connect, { loader as ConnectLoader } from "pages/Connect";

const router = createBrowserRouter(
  [
    { path: "/", element: <QuizPage />, loader: QuizLoader },
    { path: "/connect", element: <Connect />, loader: ConnectLoader },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
