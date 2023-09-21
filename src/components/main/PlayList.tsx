import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Heading, Body } from "styles/typography-system";
import Color from "styles/color-system";
import { ScoreList } from "types/user-data";
import { ReactComponent as Arrow } from "assets/icon/arrow.svg";
import AddSheetImg from "assets/img/empty.png";

interface Props {
  sheetName: string[] | undefined;
  //   scoreList: ScoreList;
  scoreList?: ScoreList;
}

function PlayList({ sheetName, scoreList }: Props) {
  return (
    <Container>
      {sheetName?.map((item) => (
        <Item key={item} to={`/quiz/${item}`}>
          <PlayBtn>
            <DateSection>
              <span className="tag">최근 점수</span>
              <span className="date">23.09.12</span>
            </DateSection>
            <ScoreSection>
              <span className="score">80</span>
              <span className="unit">점</span>
            </ScoreSection>
            <LabelSection>
              <span className="label">{item}</span>
              <Arrow fill={Color.Gray[100]} />
            </LabelSection>
          </PlayBtn>
        </Item>
      ))}
      <Item to={""}>
        <AddSheetBtn>
          <img src={AddSheetImg} alt="시트 추가" />
          <span className="label">시트 추가</span>
        </AddSheetBtn>
      </Item>
    </Container>
  );
}

export default PlayList;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
`;

const Item = styled(Link)`
  position: relative;
  width: calc((100% - 16px) / 2);
  height: 0;
  padding-bottom: calc((100% - 16px) / 2);
  cursor: pointer;
  user-select: none;
`;

const PlayBtn = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${Color.Primary[700]};
  padding: 16px;
  box-sizing: border-box;
  color: ${Color.Gray[100]};
  border-radius: 24px;
  overflow: hidden;
`;

const DateSection = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 3.0303%;

  & .tag {
    ${Body.SemiBold.XS};
    padding-inline: 8px;
    padding-block: 4px;
    background: ${Color.Primary[500]};
    border-radius: 16px;
    overflow: hidden;
  }

  & .date {
    color: ${Color.Primary[400]};
    ${Body.SemiBold.S};
  }
`;

const ScoreSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15.909%;

  & .score {
    font-family: "Black Ops One";
    font-size: 56px;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -2px;
  }

  & .unit {
    ${Heading.H1};
    margin-top: 6px;
  }
`;

const LabelSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  margin-top: auto;

  & .label {
    ${Body.Bold.M};
  }

  & svg {
    width: 16px;
    height: 16px;
    transform: rotate(180deg);
  }
`;

const AddSheetBtn = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px dashed #e5e8eb;
  box-sizing: border-box;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & img {
    width: 48px;
    height: 48px;
    object-fit: cover;
  }

  & .label {
    color: ${Color.Gray[600]};
    ${Body.Medium.M};
  }
`;
