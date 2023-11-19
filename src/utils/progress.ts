import store from "store/store";
import { show, hide } from "store/progress-slice";

export const showProgress = () => store.dispatch(show());
export const hideProgress = () => store.dispatch(hide());
