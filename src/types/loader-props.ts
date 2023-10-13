import { Params } from "react-router-dom";

export interface LoaderArgs extends ProgressLoaderArgs {
  request: Request;
  params: Params<string>;
}

export interface ProgressLoaderArgs {
  showProgress: () => void;
  hideProgress: () => void;
}
