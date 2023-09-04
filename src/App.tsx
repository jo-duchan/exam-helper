import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "pages/RootLayout";
import ErrorPage from "pages/Error";
import HomePage, { loader as HomeLoader } from "pages/Home";
import QuizPage, { loader as QuizLoader } from "pages/Quiz";
import CompletePage from "pages/Complete";
import Connect from "pages/Connect";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage />, loader: HomeLoader },
        { path: "quiz/:sheetName", element: <QuizPage />, loader: QuizLoader },
        { path: "complete", element: <CompletePage /> },
        { path: "connect", element: <Connect /> },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
