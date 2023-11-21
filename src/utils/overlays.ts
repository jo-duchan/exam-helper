import store from "store/store";
import { show, hide } from "store/progress-slice";
import { add } from "store/toast-slice";
import { IconType } from "types/icon-set";
import { nanoid } from "nanoid";

export const showProgress = () => store.dispatch(show());
export const hideProgress = () => store.dispatch(hide());

export const showToast = (message: string, sort?: IconType) =>
  store.dispatch(add({ id: nanoid(), message, sort }));
