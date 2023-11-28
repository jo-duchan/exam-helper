import { createBrowserRouter } from "react-router-dom";
import Layout from "Layout";
import ErrorPage from "pages/Error";
import OnboardingPage, { loader as OnboardingLoader } from "pages/Onboarding";
import MainPage from "pages/Main";
import QuizPage, { loader as QuizLoader } from "pages/Quiz";
import CompletePage, { loader as CompleteLoader } from "pages/Complete";
import StatsPage, { loader as StatsLoader } from "pages/Stats";
import WrongAnswerPage, { loader as WALoader } from "pages/WrongAnswer";
import SettingPage, { loader as SettingLoader } from "pages/Setting";
import SignInPage from "pages/SignIn";
import SignUpPage from "pages/SignUp";

const routerInfo = [
  {
    path: "onboarding",
    element: <OnboardingPage />,
    loader: OnboardingLoader,
    withAuth: false,
  },
  {
    index: true,
    element: <MainPage />,
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
    loader: CompleteLoader,
    withAuth: false,
  },
  {
    path: "stats",
    element: <StatsPage />,
    loader: StatsLoader,
    withAuth: true,
  },
  {
    path: "wrongAnswerList/:scoreListId",
    element: <WrongAnswerPage />,
    loader: WALoader,
    withAuth: true,
  },
  {
    path: "setting",
    element: <SettingPage />,
    loader: SettingLoader,
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
];

const ReactRouterObject = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: routerInfo.map((router) => {
      return {
        index: router.index,
        path: router.path,
        element: <Layout withAuth={router.withAuth}>{router.element}</Layout>,
        loader: router.loader && router.loader,
      };
    }),
  },
]);

export default ReactRouterObject;
