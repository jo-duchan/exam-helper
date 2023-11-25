import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { CSSTransition } from "react-transition-group";
import styled, { keyframes } from "styled-components";
import Loading from "assets/icon/loading.png";
import ZIndex from "styles/z-index";

const speed = 300;

function Progress() {
  const progress = useSelector((state: RootState) => state.progress.visible);

  return (
    <CSSTransition in={progress} timeout={speed} unmountOnExit>
      <Container>
        <img src={Loading} />
      </Container>
    </CSSTransition>
  );
}

export default Progress;

const LoadingKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  ${ZIndex.MAX};
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
    pointer-events: auto;
  }

  & img {
    display: flex;
    width: 46px;
    height: 46px;
    animation: ${LoadingKeyframes} 1400ms ease-in-out infinite;
    ${ZIndex[100]}
  }

  &.enter {
    opacity: 0;
  }

  &.enter-active {
    opacity: 1;
    transition: opacity ${speed}ms ease-in-out;
  }

  &.exit {
    opacity: 1;
  }

  &.exit-active {
    opacity: 0;
    transition: opacity ${speed}ms ease-in-out;
  }
`;
