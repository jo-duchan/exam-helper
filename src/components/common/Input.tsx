import React from "react";
import styled, { css } from "styled-components";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import { ReactComponent as Error } from "assets/icon/error.svg";

interface Props {
  value?: string | number;
  type?: "text" | "number";
  label?: string;
  placeholder?: string;
  width?: string;
  status?: "default" | "disabled" | "error";
  errorMsg?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface StyledProps {
  width?: string;
  error?: boolean;
}

const mode: { [key: string]: "text" | "numeric" } = {
  text: "text",
  number: "numeric",
};

function Input({
  value,
  type = "text",
  status = "default",
  label,
  placeholder,
  width = "100%",
  errorMsg,
  onChange,
}: Props) {
  return (
    <Container width={width}>
      <Label>
        {label}
        <InputField
          value={value || ""}
          type={type}
          inputMode={mode[type]}
          placeholder={placeholder}
          disabled={status === "disabled"}
          error={status === "error"}
          onChange={onChange}
        />
        {status === "error" && (
          <ErrorMsg>
            <Error />
            {errorMsg}
          </ErrorMsg>
        )}
      </Label>
    </Container>
  );
}

export default Input;

const Container = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: ${({ width }) => width};
`;

const Label = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${Color.Gray[800]};
  ${Body.SemiBold.M};
`;

const InputField = styled.input<StyledProps>`
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid;
  outline: initial;
  box-sizing: border-box;
  transition: color, background, border-color 300ms ease-in-out;

  color: ${Color.Gray[800]};
  background: ${Color.Gray[100]};
  border-color: ${Color.Gray[400]};
  ${Body.Medium.L};

  &::placeholder {
    color: ${Color.Gray[500]};
  }

  &:focus {
    border-color: ${Color.Primary[700]};
    caret-color: ${Color.Primary[700]};
  }

  &:disabled {
    border-color: ${Color.Gray[300]};
    color: ${Color.Gray[400]};
    background: ${Color.Gray[200]};
    opacity: initial;
  }

  ${({ error }) =>
    error &&
    css`
      border-color: ${Color.Red};

      &:focus {
        border-color: ${Color.Red};
        caret-color: ${Color.Red};
      }
    `}
`;

const ErrorMsg = styled.span`
  display: flex;
  gap: 5px;
  color: ${Color.Red};
  ${Body.Medium.S};

  & svg {
    width: 16px;
    height: 16px;
  }
`;
