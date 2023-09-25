import styled from "styled-components";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import { ReactComponent as Cancle } from "assets/icon/cancle.svg";

interface Props {
  label: string;
  onRemove: () => void;
}

function Chip({ label, onRemove }: Props) {
  return (
    <Container onClick={onRemove}>
      {label}
      <Remove>
        <Cancle />
      </Remove>
    </Container>
  );
}

export default Chip;

const Container = styled.div`
  width: fit-content;
  display: flex;
  gap: 5px;
  padding: 10px 16px;
  box-sizing: border-box;
  border-radius: 24px;
  background: ${Color.Gray[200]};
  color: ${Color.Gray[500]};
  ${Body.SemiBold.M};
`;

const Remove = styled.button.attrs({ type: "button" })`
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 150%;
    height: 150%;
  }
`;
