import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { remove } from "store/toast-slice";
import styled, { css } from "styled-components";
import { CSSTransition } from "react-transition-group";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import ZIndex from "styles/z-index";
import { IconType } from "types/icon-set";
import IconSet from "components/common/IconSet";

interface Props {
  id: string;
  message: string;
  sort?: IconType;
}

const hideSpeed = 3000;
const removeSpeed = 300;

function Toast({ id, message, sort = "none" }: Props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const selfHide = setTimeout(() => setShow(false), hideSpeed);
    const selfRemove = setTimeout(
      () => dispatch(remove(id)),
      hideSpeed + removeSpeed
    );

    return () => {
      clearTimeout(selfHide);
      clearTimeout(selfRemove);
    };
  }, []);

  return (
    <CSSTransition in={show} timeout={removeSpeed}>
      <Container>
        <IconSet type={sort} />
        <Message>{message}</Message>
      </Container>
    </CSSTransition>
  );
}

export default Toast;

const Motion = css`
  transition: ${removeSpeed}ms ease-in-out;
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

const Container = styled.div`
  position: fixed;
  left: 50%;
  bottom: 90px;
  display: flex;
  gap: 16px;
  width: fit-content;
  max-width: calc(var(--global-width) * 0.87179);
  height: fit-content;
  padding: 20px;
  border-radius: 16px;
  box-sizing: border-box;
  background: ${Color.Gray[700]};
  ${ZIndex[900]};
  ${Motion};

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
