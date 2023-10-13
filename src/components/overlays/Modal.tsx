import React from "react";
import styled from "styled-components";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import Button from "components/common/Button";

interface Action {
  label: string;
  onClick: () => void;
}

interface Props {
  title: string;
  content: string;
  actionL: Action;
  actionR: Action;
}

function Modal({ title, content, actionL, actionR }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
      <Content>{content}</Content>
      <ActionSection>
        <Button label={actionL.label} sort="gray" onClick={actionL.onClick} />
        <Button label={actionR.label} onClick={actionR.onClick} />
      </ActionSection>
    </Container>
  );
}

export default Modal;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 82.05128%;
  height: 196px;
  background: ${Color.Gray[100]};
  border-radius: 16px;
  overflow: hidden;
  padding: 33px 20px 20px 20px;
  box-sizing: border-box;
  text-align: center;
  pointer-events: auto;
`;

const Title = styled.h3`
  color: ${Color.Gray[800]};
  font-size: 20px;
  font-weight: 700;
  line-height: 1.25em;
  margin-bottom: 10px;
`;

const Content = styled.p`
  white-space: pre-line;
  color: ${Color.Gray[600]};
  ${Body.Medium.L};
  margin-bottom: 20px;
`;

const ActionSection = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;
