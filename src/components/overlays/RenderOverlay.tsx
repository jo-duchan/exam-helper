import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { OverlayItem } from "types/overlay";

interface Props {
  items: OverlayItem[];
}

function RenderOverlay({ items }: Props) {
  const portalElement = document.getElementById("overlays");

  return ReactDOM.createPortal(
    items.map((item) => (
      <div key={item.id}>{React.cloneElement(item.element, item)}</div>
    )),
    portalElement as HTMLElement
  );
}

export default RenderOverlay;
