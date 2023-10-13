import { Params } from "react-router-dom";

export interface LoaderProps extends CustomLoaderProps {
  request: Request;
  params: Params<string>;
}

export interface CustomLoaderProps {
  showProgress: () => void;
  hideProgress: () => void;
}
