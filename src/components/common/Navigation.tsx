import { useNavigate, To } from "react-router-dom";
import styled from "styled-components";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import { ReactComponent as Arrow } from "assets/icon/arrow.svg";

interface Props {
  label: string;
  mode?: -1 | "..";
  left?: "back" | "disabled";
}

function Navigation({ label, mode = "..", left = "back" }: Props) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(mode as To);
  };
  return (
    <Container>
      {left === "back" && (
        <BackButton onClick={handleBack} type="button">
          <Arrow fill={Color.Gray[800]} />
        </BackButton>
      )}
      <Label>{label}</Label>
    </Container>
  );
}

export default Navigation;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 56px;
`;

const BackButton = styled.button`
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translate3d(0, -50%, 0);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;

  & svg {
    width: 24px;
    height: 24px;
  }
`;

const Label = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  color: ${Color.Gray[800]};
  ${Body.Bold.L};
`;
