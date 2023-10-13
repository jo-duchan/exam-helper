import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { OverlayItem } from "types/overlay";
import ZIndex from "styles/z-index";

interface Props {
  items: OverlayItem[];
}

const dimSpeed = 300;

function RenderOverlay({ items }: Props) {
  const portalElement = document.getElementById("overlays");
  const [dimIsShown, setDimIsShown] = useState<boolean>(false);

  useEffect(() => {
    const isDimElement = items.find(({ type }) => type !== "TOAST");

    if (isDimElement) {
      setDimIsShown(true);
    } else {
      setDimIsShown(false);
    }
  }, [items]);

  useEffect(() => {
    if (dimIsShown) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "initial";
    };
  }, [dimIsShown]);

  return (
    <>
      {ReactDOM.createPortal(
        items.map((item) => (
          <Wrapper key={item.id}>
            {React.cloneElement(item.element, item)}
          </Wrapper>
        )),
        portalElement as HTMLElement
      )}
      {ReactDOM.createPortal(
        <CSSTransition in={dimIsShown} timeout={dimSpeed} unmountOnExit>
          <Dim />
        </CSSTransition>,
        portalElement as HTMLElement
      )}
    </>
  );
}

export default RenderOverlay;

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  ${ZIndex[500]};
`;

const Dim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  pointer-events: auto;

  &.enter {
    opacity: 0;
  }

  &.enter-active {
    opacity: 1;
    transition: opacity ${dimSpeed}ms ease-in-out;
  }

  &.exit {
    opacity: 1;
  }

  &.exit-active {
    opacity: 0;
    transition: opacity ${dimSpeed}ms ease-in-out;
  }
`;
