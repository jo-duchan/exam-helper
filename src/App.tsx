import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "pages/Error";
import MainLayout, { loader as MainLoader } from "pages/MainLoader";
import MainPage from "pages/Main";
import QuizPage, { loader as QuizLoader } from "pages/Quiz";
import CompletePage from "pages/Complete";
import SettingPage, { loader as SettingLoader } from "pages/Setting";
import SignInPage from "pages/SignIn";
import SignUpPage, { loader as SignUpLoader } from "pages/SignUp";
import StatsPage, { loader as StatsLoader } from "pages/Stats";

const router = createBrowserRouter(
  [
    {
      path: "/",
      id: "root-loader",
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          id: "main-loader",
          loader: MainLoader,
          children: [
            { index: true, element: <MainPage /> },
            {
              path: "quiz/:sheetName",
              element: <QuizPage />,
              loader: QuizLoader,
            },
            {
              path: "complete",
              element: <CompletePage />,
            },
          ],
        },
        { path: "stats", element: <StatsPage />, loader: StatsLoader },
        { path: "setting", element: <SettingPage />, loader: SettingLoader },
        { path: "signin", element: <SignInPage /> },
        { path: "signup", element: <SignUpPage />, loader: SignUpLoader },
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
