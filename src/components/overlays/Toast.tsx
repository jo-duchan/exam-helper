import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { CSSTransition } from "react-transition-group";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import ZIndex from "styles/z-index";
import { IconType } from "types/icon-set";
import useOverlay from "hook/useOverlay";
import IconSet from "components/common/IconSet";

interface Props {
  id?: string;
  display?: string;
  speed?: number;
  message: string;
  sort?: IconType;
}

interface StyledProps {
  duration: number;
}

function Toast({ id, display, speed, message, sort = "none" }: Props) {
  const { handleHide } = useOverlay();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const selfClose = setTimeout(() => {
      handleHide(id!);
    }, 3000);

    return () => {
      clearTimeout(selfClose);
    };
  }, []);

  useEffect(() => {
    if (display === "ON") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [display]);

  return (
    <CSSTransition in={show} timeout={speed!}>
      <Container duration={speed!}>
        <IconSet type={sort} />
        <Message>{message}</Message>
      </Container>
    </CSSTransition>
  );
}

export default Toast;

const Motion = (duration: number) => css`
  transition: ${duration}ms ease-in-out;
  transform: translate3d(-50%, calc(100%), 0);
  opacity: 0;

  &[class*="enter-"] {
    transform: translate3d(-50%, 0, 0);
    opacity: 1;
  }

  &[class*="exit-"] {
    transform: translate3d(-50%, calc(100%), 0);
    opacity: 0;
  }
`;

const Container = styled.div<StyledProps>`
  position: fixed;
  left: 50%;
  bottom: 90px;
  display: flex;
  gap: 16px;
  width: 87.179%;
  height: fit-content;
  padding: 20px;
  border-radius: 16px;
  box-sizing: border-box;
  background: ${Color.Gray[700]};
  ${ZIndex[900]};
  ${(props) => Motion(props.duration)}

  & svg {
    width: 20px;
    min-width: 20px;
    height: 20px;
  }
`;

const Message = styled.span`
  width: 100%;
  white-space: pre;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${Color.Gray[100]};
  ${Body.SemiBold.L};
`;
