import { createBrowserRouter } from "react-router-dom";
import { LoaderArgs, ProgressLoaderArgs } from "types/loader-props";
import Layout from "Layout";
import ErrorPage from "pages/Error";
import OnboardingPage, { loader as OnboardingLoader } from "pages/Onboarding";
import MainPage, { loader as MainLoader } from "pages/Main";
import QuizPage, { loader as QuizLoader } from "pages/Quiz";
import CompletePage, { loader as CompleteLoader } from "pages/Complete";
import StatsPage, { loader as StatsLoader } from "pages/Stats";
import WrongAnswerPage, { loader as WALoader } from "pages/WrongAnswer";
import SettingPage, { loader as SettingLoader } from "pages/Setting";
import SignInPage from "pages/SignIn";
import SignUpPage, { loader as SignUpLoader } from "pages/SignUp";

interface RouterObject {
  showProgress: () => void;
  hideProgress: () => void;
}

const routerInfo = [
  {
    path: "onboarding",
    element: <OnboardingPage />,
    loader: ({ ...args }: ProgressLoaderArgs) => OnboardingLoader({ ...args }),
    withAuth: false,
  },
  {
    index: true,
    element: <MainPage />,
    loader: ({ ...args }: ProgressLoaderArgs) => MainLoader({ ...args }),
    withAuth: false,
  },
  {
    path: "quiz/:sheetName",
    element: <QuizPage />,
    loader: ({ ...args }: LoaderArgs) => QuizLoader({ ...args }),
    withAuth: false,
  },
  {
    path: "complete/:scoreListId",
    element: <CompletePage />,
    loader: ({ ...args }: LoaderArgs) => CompleteLoader({ ...args }),
    withAuth: false,
  },
  {
    path: "stats",
    element: <StatsPage />,
    loader: ({ ...args }: ProgressLoaderArgs) => StatsLoader({ ...args }),
    withAuth: true,
  },
  {
    path: "wrongAnswerList/:scoreListId",
    element: <WrongAnswerPage />,
    loader: ({ ...args }: LoaderArgs) => WALoader({ ...args }),
    withAuth: true,
  },
  {
    path: "setting",
    element: <SettingPage />,
    loader: ({ ...args }: ProgressLoaderArgs) => SettingLoader({ ...args }),
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
    loader: () => SignUpLoader(),
    withAuth: false,
  },
];

const ReactRouterObject = ({ showProgress, hideProgress }: RouterObject) => {
  return createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      children: routerInfo.map((router) => {
        return {
          index: router.index,
          path: router.path,
          element: <Layout>{router.element}</Layout>,
          loader: ({ request, params }) => {
            if (router.loader) {
              return router.loader({
                request,
                params,
                showProgress,
                hideProgress,
              });
            }

            return null;
          },
        };
      }),
    },
  ]);
};

export default ReactRouterObject;
