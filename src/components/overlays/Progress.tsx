import React from "react";
import { CSSTransition } from "react-transition-group";
import styled, { css, keyframes } from "styled-components";
import { ReactComponent as Loading } from "assets/icon/Loading.svg";
import ZIndex from "styles/z-index";

function Progress() {
  return (
    <CSSTransition in timeout={300}>
      <Container>d</Container>
    </CSSTransition>
  );
}

export default Progress;

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${ZIndex.MAX};
`;
