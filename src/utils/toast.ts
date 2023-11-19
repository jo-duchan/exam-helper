import store from "store/store";
import { add } from "store/toast-slice";
import { IconType } from "types/icon-set";
import { nanoid } from "nanoid";

export const showToast = (message: string, sort?: IconType) =>
  store.dispatch(add({ id: nanoid(), message, sort }));
