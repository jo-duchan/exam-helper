import { createBrowserRouter } from "react-router-dom";
import Layout, { loader as LayoutLoader } from "Layout";
import ErrorPage from "pages/Error";
import OnboardingPage, { loader as OnboardingLoader } from "pages/Onboarding";
import MainPage, { loader as MainLoader } from "pages/Main";
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
  },
  {
    path: "",
    element: <MainPage />,
    loader: MainLoader,
  },
  {
    path: "quiz",
    element: <QuizPage />,
    loader: QuizLoader,
  },
  {
    path: "complete/:scoreListId",
    element: <CompletePage />,
    loader: CompleteLoader,
  },
  {
    path: "stats",
    element: <StatsPage />,
    loader: StatsLoader,
  },
  {
    path: "wrongAnswerList/:scoreListId",
    element: <WrongAnswerPage />,
    loader: WALoader,
  },
  {
    path: "setting",
    element: <SettingPage />,
    loader: SettingLoader,
  },
  {
    path: "signin",
    element: <SignInPage />,
  },
  {
    path: "signup",
    element: <SignUpPage />,
  },
];

const ReactRouterObject = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    loader: LayoutLoader,
    children: routerInfo.map((router) => {
      return {
        path: router.path,
        element: router.element,
        loader: router.loader && router.loader,
      };
    }),
  },
]);

export default ReactRouterObject;
