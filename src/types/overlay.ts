import React from "react";
import { IconType } from "types/icon-set";

export interface Toast {
  message: string;
  sort: IconType;
}

export interface ToastListState {
  list: Toast[];
}

export interface ProgressState {
  visible: boolean;
}
