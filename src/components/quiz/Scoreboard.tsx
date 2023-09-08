import React from "react";
import styled from "styled-components";

interface Props {
  score: number;
  miss: number;
  totalStage: number;
}

function Scoreboard({ score, miss, totalStage }: Props) {
  const progress = ((score + miss) / totalStage) * 100;
  console.log(progress);
  return (
    <Container>
      <p>{score}</p>
      <p>{miss}</p>
      <p>{`${progress}%, ${totalStage}`}</p>
    </Container>
  );
}

export default Scoreboard;

const Container = styled.div`
  display: flex;
  gap: 10px;
`;
