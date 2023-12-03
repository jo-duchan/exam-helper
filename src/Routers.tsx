import { createBrowserRouter } from "react-router-dom";
import Layout from "Layout";
import ProtectedRoute from "ProtectedRoute";
import ErrorPage from "pages/Error";
import OnboardingPage, { loader as OnboardingLoader } from "pages/Onboarding";
import MainPage, { loader as MainLoader } from "pages/Main";
import QuizPage, { loader as QuizLoader } from "pages/Quiz";
import CompletePage from "pages/Complete";
import StatsPage from "pages/Stats";
import WrongAnswerPage from "pages/WrongAnswer";
import SettingPage from "pages/Setting";
import SignInPage from "pages/SignIn";
import SignUpPage from "pages/SignUp";
import DownloadPage from "pages/Download";

const routerInfo = [
  {
    path: "onboarding",
    element: <OnboardingPage />,
    loader: OnboardingLoader,
    withAuth: false,
  },
  {
    path: "",
    element: <MainPage />,
    loader: MainLoader,
    withAuth: false,
  },
  {
    path: "quiz",
    element: <QuizPage />,
    loader: QuizLoader,
    withAuth: false,
  },
  {
    path: "complete/:scoreListId",
    element: <CompletePage />,
    withAuth: false,
  },
  {
    path: "stats",
    element: <StatsPage />,
    withAuth: true,
  },
  {
    path: "wrongAnswerList/:scoreListId",
    element: <WrongAnswerPage />,
    withAuth: true,
  },
  {
    path: "setting",
    element: <SettingPage />,
    withAuth: true,
  },
  {
    path: "signin",
    element: <SignInPage />,
    withAuth: false,
  },
  {
    path: "signup",
    element: <SignUpPage />,
    withAuth: false,
  },
  {
    path: "download",
    element: <DownloadPage />,
    withAuth: true,
  },
];

const ReactRouterObject = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: routerInfo.map((router) => {
      return {
        path: router.path,
        element: router.withAuth ? (
          <ProtectedRoute>{router.element}</ProtectedRoute>
        ) : (
          router.element
        ),
        loader: router.loader && router.loader,
      };
    }),
  },
]);

export default ReactRouterObject;
