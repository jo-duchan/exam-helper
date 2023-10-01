import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoaderProps } from "types/loader-props";
import useOverlay from "hook/useOverlay";
import ErrorPage from "pages/Error";
import MainPage, { loader as MainLoader } from "pages/Main";
import QuizPage, { loader as QuizLoader } from "pages/Quiz";
import CompletePage, { loader as CompleteLoader } from "pages/Complete";
import SettingPage, { loader as SettingLoader } from "pages/Setting";
import SignInPage from "pages/SignIn";
import SignUpPage, { loader as SignUpLoader } from "pages/SignUp";
import StatsPage, { loader as StatsLoader } from "pages/Stats";

const router = ({ showProgress, hideProgress }: LoaderProps) => {
  return createBrowserRouter(
    [
      {
        path: "/",
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <MainPage />,
            loader: async () => MainLoader({ showProgress, hideProgress }),
          },
          {
            path: "quiz/:sheetName",
            element: <QuizPage />,
            loader: async ({ request, params }) =>
              QuizLoader({ request, params, showProgress, hideProgress }),
          },
          {
            path: "complete/:scoreListId",
            element: <CompletePage />,
            loader: async ({ params }) =>
              CompleteLoader({ params, showProgress, hideProgress }),
          },
          {
            path: "stats",
            element: <StatsPage />,
            loader: async () => StatsLoader({ showProgress, hideProgress }),
          },
          {
            path: "wrongAnswerList/:wrongAnswerId",
            element: <>임시</>,
            loader: async () => StatsLoader({ showProgress, hideProgress }),
          },
          {
            path: "setting",
            element: <SettingPage />,
            loader: async () => SettingLoader({ showProgress, hideProgress }),
          },
          { path: "signin", element: <SignInPage /> },
          { path: "signup", element: <SignUpPage />, loader: SignUpLoader },
        ],
      },
    ],
    {
      basename: process.env.PUBLIC_URL,
    }
  );
};

function App() {
  const { showProgress, hideProgress } = useOverlay();
  return <RouterProvider router={router({ showProgress, hideProgress })} />;
}

export default App;
