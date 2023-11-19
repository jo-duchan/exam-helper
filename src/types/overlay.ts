import { IconType } from "types/icon-set";

export interface Toast {
  id: string;
  message: string;
  sort?: IconType;
}

export interface ToastListState {
  list: Toast[];
}

export interface ProgressState {
  visible: boolean;
}
