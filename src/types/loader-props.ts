import { Params } from "react-router-dom";

export interface LoaderArgs {
  request: Request;
  params: Params<string>;
}
