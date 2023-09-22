import React from "react";
import styled from "styled-components";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";

interface Props {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function Textarea({ value = "", onChange }: Props) {
  return <Container value={value} onChange={onChange} />;
}

export default Textarea;

const Container = styled.textarea`
  width: 100%;
  height: 106px;
  resize: none;
  padding: 20px;
  border-radius: 24px;
  box-sizing: border-box;
  outline: initial;
  border: 1px solid ${Color.Gray[400]};

  ${Body.Medium.L};
`;
