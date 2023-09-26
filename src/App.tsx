import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "pages/Error";
import MainPage, { loader as MainLoader } from "pages/Main";
import QuizPage, { loader as QuizLoader } from "pages/Quiz";
import CompletePage, { loader as CompleteLoader } from "pages/Complete";
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
        { index: true, element: <MainPage />, loader: MainLoader },
        {
          path: "quiz/:sheetName",
          element: <QuizPage />,
          loader: QuizLoader,
        },
        {
          path: "complete/:scoreListId",
          element: <CompletePage />,
          loader: CompleteLoader,
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
