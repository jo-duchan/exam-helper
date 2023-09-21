import React from "react";
import styled from "styled-components";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import { ReactComponent as QTalk } from "assets/icon/q-talk.svg";

interface Props {
  data: string;
}

function Question({ data }: Props) {
  return (
    <Container>
      <Assets>
        <QTalk />
      </Assets>
      <Content>{data}</Content>
    </Container>
  );
}

export default Question;

const Container = styled.div`
  /* position: relative; */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 187px;
  background: ${Color.Gray[100]};
  border-radius: 24px;
  margin-bottom: 30px;
  overflow: hidden auto;
`;

const Assets = styled.div`
  margin-top: 20px;
  margin-bottom: 34px;
`;

const Content = styled.div`
  width: 100%;
  text-align: center;
  color: ${Color.Gray[800]};
  ${Body.Bold.XL};
  margin-bottom: 20px;
`;
