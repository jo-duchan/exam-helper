import React from "react";
import styled from "styled-components";
import Color from "styles/color-system";
import { Heading, Body } from "styles/typography-system";
import Utils from "utils/utils";
import High from "assets/img/high-score.png";
import Middle from "assets/img/middle-score.png";
import Low from "assets/img/low-score.png";

const resultAssets = {
  high: {
    img: High,
    text: "축하드려요!",
  },
  middle: {
    img: Middle,
    text: "더 잘할 수 있어요.",
  },
  low: {
    img: Low,
    text: "좀 더 공부가 필요할 것 같아요.",
  },
};

interface Props {
  date: number;
  score: number;
  name: string;
}

function CaptureArea(
  { date, score, name }: Props,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const scoreResult = (score: number) => {
    if (score >= 80) {
      return "high";
    }

    if (score >= 40 && score < 80) {
      return "middle";
    }

    return "low";
  };

  return (
    <Container ref={ref}>
      <Date>{Utils.dateFormat(date)}</Date>
      <Visual>
        <img
          src={resultAssets[scoreResult(score)].img}
          alt="점수 결과 이미지"
        />
      </Visual>
      <TextSection>
        <span className="score">
          <span className="point">{score}점</span>을 기록했어요!
        </span>
        <span className="message">
          {name}님 {resultAssets[scoreResult(score)].text}
        </span>
      </TextSection>
    </Container>
  );
}

export default React.forwardRef(CaptureArea);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Date = styled.span`
  margin-top: 40px;
  margin-bottom: 6px;
  padding: 5px 10px 6px;
  border-radius: 16px;
  background: ${Color.Primary[200]};

  color: ${Color.Primary[700]};
  ${Body.SemiBold.S}
`;

const Visual = styled.div`
  position: relative;
  width: 50%;
  height: 0;
  padding-bottom: 50%;
  margin-left: 7.647%;
  margin-bottom: 33px;

  & img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
  margin-bottom: 50px;

  & .score {
    color: ${Color.Gray[800]};
    ${Heading.H2};
  }

  & .point {
    color: ${Color.Primary[700]};
  }

  & .message {
    color: ${Color.Gray[600]};
    ${Body.SemiBold.L};
  }
`;
