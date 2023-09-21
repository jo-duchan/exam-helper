import React from "react";
import styled from "styled-components";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import { ReactComponent as Check } from "assets/icon/check.svg";
import { ReactComponent as Cancle } from "assets/icon/cancle.svg";

interface Props {
  score: number;
  miss: number;
  totalStage: number;
}

interface StyledProps {
  width: number;
}

function Scoreboard({ score, miss, totalStage }: Props) {
  const progress = ((score + miss) / totalStage) * 100;
  return (
    <Container>
      <Progress width={progress} />
      <ScoreSection>
        <div className="total">{`${score + miss} / ${totalStage}`}</div>
        <div className="score">
          <span className="icon">
            <Check />
          </span>
          {score}
        </div>
        <div className="miss">
          <span className="icon">
            <Cancle />
          </span>
          {miss}
        </div>
      </ScoreSection>
    </Container>
  );
}

export default Scoreboard;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 81px;
`;

const Progress = styled.div<StyledProps>`
  position: relative;
  width: 100%;
  height: 6px;
  background: ${Color.Gray[200]};

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ width }) => `${width}%`};
    height: 100%;
    background: ${Color.Primary[700]};
    border-radius: 0 3px 3px 0;
    overflow: hidden;
    transition: width 400ms ease-in-out;
  }
`;

const ScoreSection = styled.div`
  display: flex;
  padding-inline: 25px;
  box-sizing: border-box;

  & .total {
    color: ${Color.Gray[600]};
    ${Body.SemiBold.L};
  }

  & :is(.score, .miss) {
    display: flex;
    gap: 5px;
    color: ${Color.Gray[600]};
    ${Body.Medium.S};
  }

  & .score {
    margin-left: auto;
  }

  & .miss {
    margin-left: 12px;
  }

  & .score .icon {
    background: ${Color.Primary[700]};
  }

  & .miss .icon {
    background: ${Color.Red};
  }

  & .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 8px;
  }

  & :is(.score, .miss) .icon svg {
    width: 90%;
    height: 90%;
  }

  & .miss .icon svg rect {
    fill: ${Color.Gray[100]};
  }
`;
