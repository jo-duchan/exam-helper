import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Setting } from "assets/icon/setting.svg";

interface Props {
  unsigned: boolean;
}

function MainNavigation({ unsigned }: Props) {
  return (
    <Container>
      {unsigned || (
        <NavSection to={"/setting"}>
          <Setting />
        </NavSection>
      )}
    </Container>
  );
}

export default MainNavigation;

const Container = styled.div`
  width: 100%;
  height: 28px;
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
