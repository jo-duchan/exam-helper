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

export interface Button {
  label?: string;
  onClick: () => void;
}

export interface ModalProps {
  title: string;
  content: string;
  left_button?: Button;
  right_button: Button;
}
