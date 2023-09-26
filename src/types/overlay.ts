import React from "react";

export type OverlayElement = React.ReactElement<
  any,
  string | React.JSXElementConstructor<any>
>;

export type OverlayContextType = {
  handleShow: (element: OverlayElement, type: OverlayType) => string;
  handleHide: (id: string, type?: OverlayType) => void;
  showProgress: () => void;
  hideProgress: () => void;
  showToast: (message: string) => void;
};

export type OverlayItem = {
  id: string;
  element: OverlayElement;
  type: OverlayType;
  display: string;
  speed: number;
};

export type OverlayType = "POPUP" | "TOAST" | "PROGRESS";
