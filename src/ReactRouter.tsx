import { createBrowserRouter } from "react-router-dom";
import { LoaderProps, CustomLoaderProps } from "types/loader-props";
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
    loader: ({ showProgress, hideProgress }: CustomLoaderProps) =>
      OnboardingLoader({ showProgress, hideProgress }),
    withAuth: false,
  },
  {
    index: true,
    element: <MainPage />,
    loader: ({ showProgress, hideProgress }: CustomLoaderProps) =>
      MainLoader({ showProgress, hideProgress }),
    withAuth: false,
  },
  {
    path: "quiz/:sheetName",
    element: <QuizPage />,
    loader: ({ request, params, showProgress, hideProgress }: LoaderProps) =>
      QuizLoader({ request, params, showProgress, hideProgress }),
    withAuth: false,
  },
  {
    path: "complete/:scoreListId",
    element: <CompletePage />,
    loader: ({ request, params, showProgress, hideProgress }: LoaderProps) =>
      CompleteLoader({ request, params, showProgress, hideProgress }),
    withAuth: false,
  },
  {
    path: "stats",
    element: <StatsPage />,
    loader: ({ showProgress, hideProgress }: CustomLoaderProps) =>
      StatsLoader({ showProgress, hideProgress }),
    withAuth: true,
  },
  {
    path: "wrongAnswerList/:scoreListId",
    element: <WrongAnswerPage />,
    loader: ({ request, params, showProgress, hideProgress }: LoaderProps) =>
      WALoader({ request, params, showProgress, hideProgress }),
    withAuth: true,
  },
  {
    path: "setting",
    element: <SettingPage />,
    loader: ({ showProgress, hideProgress }: CustomLoaderProps) =>
      SettingLoader({ showProgress, hideProgress }),
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
        if (router.withAuth) {
          return {
            index: router.index,
            path: router.path,
            element: router.element,
            loader: ({ request, params }) =>
              router.loader
                ? router.loader({ request, params, showProgress, hideProgress })
                : null,
          };
        } else {
          return {
            index: router.index,
            path: router.path,
            element: router.element,
            loader: ({ request, params }) =>
              router.loader
                ? router.loader({ request, params, showProgress, hideProgress })
                : null,
          };
        }
      }),
    },
  ]);
};

export default ReactRouterObject;
