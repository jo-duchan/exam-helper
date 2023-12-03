import styled, { css } from "styled-components";
import Color from "styles/color-system";

interface Props {
  checked: boolean;
  onClick: () => void;
}

interface StyledProps {
  checked: boolean;
}

function ToggleButton({ checked, onClick }: Props) {
  return <Container checked={checked} onClick={onClick} />;
}

export default ToggleButton;

const Container = styled.div<StyledProps>`
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  overflow: hidden;
  user-select: none;
  transition: background 200ms ease-in-out;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    width: 18px;
    height: 18px;
    left: 4px;
    background: ${Color.Gray[100]};
    border-radius: 100%;
    transition: 200ms ease-in-out;
    transition-property: transform;
  }

  ${({ checked }) =>
    checked
      ? css`
          background: ${Color.Primary[700]};
          &::before {
            transform: translate3d(100%, -50%, 0);
          }
        `
      : css`
          background: ${Color.Primary[400]};
          &::before {
            transform: translate3d(0, -50%, 0);
          }
        `}
`;
