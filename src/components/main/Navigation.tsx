import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Home } from "assets/icon/home.svg";
import { ReactComponent as Setting } from "assets/icon/setting.svg";

function Navigation() {
  return (
    <Container>
      <NavSection to={"/"}>
        <Home />
      </NavSection>
      <NavSection to={"/setting"}>
        <Setting />
      </NavSection>
    </Container>
  );
}

export default Navigation;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 20px;
  padding-inline: 25px;
  box-sizing: border-box;
`;

const NavSection = styled(NavLink)`
  width: 28px;
  height: 28px;

  & svg {
    width: 100%;
    height: 100%;
  }
`;
