import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "pages/RootLayout";
import ErrorPage from "pages/Error";
import HomePage, { loader as HomeLoader } from "pages/Home";
import QuizPage, { loader as QuizLoader } from "pages/Quiz";
import CompletePage, { loader as CompleteLoader } from "pages/Complete";
import Setting from "pages/Setting";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage />, loader: HomeLoader },
        { path: "quiz/:sheetName", element: <QuizPage />, loader: QuizLoader },
        { path: "complete", element: <CompletePage />, loader: CompleteLoader },
        { path: "setting", element: <Setting /> },
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
