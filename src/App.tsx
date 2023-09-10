import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout, { loader as RootLoader } from "pages/RootLayout";
import ErrorPage from "pages/Error";
import SignInPage from "pages/SignIn";
import SignUpPage, { loader as SignUpLoader } from "pages/SignUp";
import HomePage from "pages/Home";
import QuizPage, { loader as QuizLoader } from "pages/Quiz";
import CompletePage, { loader as CompleteLoader } from "pages/Complete";
import SettingPage, { loader as SettingLoader } from "pages/Setting";

const router = createBrowserRouter(
  [
    {
      path: "/",
      id: "root-loader",
      element: <RootLayout />,
      loader: RootLoader,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "quiz/:sheetName", element: <QuizPage />, loader: QuizLoader },
        { path: "complete", element: <CompletePage />, loader: CompleteLoader },
      ],
    },
    { path: "/setting", element: <SettingPage />, loader: SettingLoader },
    { path: "/signin", element: <SignInPage /> },
    { path: "/signup", element: <SignUpPage />, loader: SignUpLoader },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
