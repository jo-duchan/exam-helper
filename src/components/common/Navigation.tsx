import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function Navigation() {
  return (
    <Container>
      <NavLink to={"/"}>home</NavLink>
      <NavLink to={"/setting"}>setting</NavLink>
    </Container>
  );
}

export default Navigation;

const Container = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;
