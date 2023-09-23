import React from "react";
import styled, { css } from "styled-components";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";

interface Props {
  value?: string;
  placeholder: string;
  state: "HIT" | "MISS" | "DEFAULT";
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

interface StyledProps {
  state: "HIT" | "MISS" | "DEFAULT";
}

function Textarea({ value = "", placeholder, state, onChange }: Props) {
  return (
    <Container
      value={value}
      placeholder={placeholder}
      state={state}
      onChange={onChange}
    />
  );
}

export default Textarea;

const Container = styled.textarea<StyledProps>`
  width: 100%;
  height: 106px;
  resize: none;
  padding: 20px;
  border-radius: 24px;
  box-sizing: border-box;
  outline: initial;
  border: 1px solid;
  transition: color, border-color 300ms ease-in-out;

  ${Body.Medium.L};

  &::placeholder {
    color: ${Color.Gray[500]};
  }

  ${({ state }) => {
    switch (state) {
      case "HIT":
        return css`
          color: ${Color.Primary[700]};
          border-color: ${Color.Primary[700]};
        `;
      case "MISS":
        return css`
          color: ${Color.Red};
          border-color: ${Color.Red};
        `;
      case "DEFAULT":
        return css`
          color: ${Color.Gray[800]};
          border-color: ${Color.Gray[400]};
        `;
    }
  }}
`;
