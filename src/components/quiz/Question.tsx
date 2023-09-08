import React from "react";
import styled from "styled-components";

interface Props {
  data: string;
}

function Question({ data }: Props) {
  return (
    <Container>
      <Label>문제</Label>
      <Content>{data}</Content>
    </Container>
  );
}

export default Question;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.span`
  font-size: 14px;
  color: #323a43;
  font-weight: 700;
`;

const Content = styled.div`
  width: 100%;
  margin-bottom: 40px;
  line-height: 1.25em;
  background: #edf4fc;
  padding: 30px 20px;
  border-radius: 6px;
  font-size: 14px;
  letter-spacing: -0.02em;
  box-sizing: border-box;
`;
