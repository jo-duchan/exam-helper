import styled, { keyframes } from "styled-components";
import Loading from "assets/icon/loading.png";
import ZIndex from "styles/z-index";

function Progress() {
  return (
    <Container>
      <img src={Loading} />
    </Container>
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
  width: 100%;
  height: 100%;
  ${ZIndex.MAX};
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    width: 46px;
    height: 46px;
    animation: ${LoadingKeyframes} 1400ms ease-in-out infinite;
  }
`;
