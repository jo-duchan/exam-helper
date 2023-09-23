import styled, { css } from "styled-components";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import { Sort, Size, Status } from "types/button";

interface Props {
  sort?: Sort;
  size?: Size;
  status?: Status;
  label: string;
  width?: string;
  onClick: () => void;
}

interface StyledProps {
  sort: Sort;
  size: Size;
  width: string;
}

function Button({
  sort = "primary",
  size = "M",
  status = "default",
  label,
  width = "100%",
  onClick,
}: Props) {
  return (
    <Container
      sort={sort}
      size={size}
      width={width}
      disabled={status === "disabled"}
      onClick={onClick}
    >
      {label}
    </Container>
  );
}

export default Button;

const Container = styled.button.attrs({ type: "button" })<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width};
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  transition: color, background 300ms ease-in-out;

  ${({ size }) => {
    switch (size) {
      case "S":
        return css`
          height: 38px;
          border-radius: 8px;
          ${Body.Medium.M};
        `;
      case "M":
        return css`
          height: 48px;
          border-radius: 12px;
          ${Body.SemiBold.L};
        `;
      case "L":
        return css`
          height: 56px;
          border-radius: 16px;
          ${Body.SemiBold.L};
        `;
    }
  }}

  ${({ sort }) =>
    sort === "primary"
      ? css`
          color: ${Color.Gray[100]};
          background: ${Color.Primary[700]};
        `
      : css`
          color: ${Color.Gray[700]};
          background: ${Color.Gray[300]};
        `}

  &:disabled {
    color: ${({ sort }) =>
      sort === "primary" ? Color.Gray[200] : Color.Gray[500]};
    background: ${({ sort }) =>
      sort === "primary" ? Color.Primary[400] : Color.Gray[200]};
  }
`;
