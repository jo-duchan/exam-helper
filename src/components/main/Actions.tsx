import { Link } from "react-router-dom";
import styled from "styled-components";
import Utils from "utils/utils";
import { Heading, Body } from "styles/typography-system";
import Color from "styles/color-system";
import { User, ScoreList } from "types/user-data";
import { ReactComponent as Arrow } from "assets/icon/arrow.svg";
import AddSheetImg from "assets/img/empty.png";

interface Props {
  data: User;
  unsigned: boolean;
}

function Actions({ data, unsigned }: Props) {
  const {
    playList,
    sheetUrl,
    scoreList = {} as ScoreList,
    totalStage = 0,
  } = data;
  const getSheetName = (sheetName: string) => {
    const data = Object.keys(scoreList)
      .reverse()
      .find((item) => scoreList[item].sheetName === sheetName);

    return data!;
  };

  const getSheetId = (sheetId: string | undefined) => {
    if (!sheetId) {
      return Utils.convertSheetUrl(sheetUrl);
    }
    return sheetId;
  };

  const renderDate = (key: string) => {
    const getName = getSheetName(key);
    if (getName) {
      return Utils.dateFormat(scoreList[getName].date);
    }

    return "00.00.00";
  };

  const renderScore = (key: string) => {
    const getName = getSheetName(key);
    if (getName) {
      return (
        <>
          <span className="score">{scoreList[getName].score}</span>
          <span className="unit">점</span>
        </>
      );
    }

    return <span className="score">000</span>;
  };

  return (
    <Container>
      {playList?.map((item) => (
        <Item
          key={item.sheetName}
          to={`/quiz?id=${getSheetId(item.sheetId)}&name=${
            item.sheetName
          }&stage=${totalStage}`}
        >
          <PlayBtn>
            <DateSection>
              <span className="tag">최근 점수</span>
              <span className="date">{renderDate(item.sheetName)}</span>
            </DateSection>
            <ScoreSection>{renderScore(item.sheetName)}</ScoreSection>
            <LabelSection>
              <span className="label">{item.sheetName}</span>
              <Arrow fill={Color.Gray[100]} />
            </LabelSection>
          </PlayBtn>
        </Item>
      ))}
      {unsigned || (
        <Item to={"/setting"}>
          <AddSheetBtn>
            <img src={AddSheetImg} alt="시트 추가" />
            <span className="label">시트 추가</span>
          </AddSheetBtn>
        </Item>
      )}
    </Container>
  );
}

export default Actions;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  margin-bottom: 165px;
`;

const Item = styled(Link)`
  position: relative;
  width: calc((100% - 16px) / 2);
  height: 0;
  padding-bottom: calc((100% - 16px) / 2);
  cursor: pointer;
  user-select: none;

  & .info {
    white-space: pre-line;
    color: ${Color.Primary[400]};
    ${Body.Medium.M}
  }
`;

const PlayBtn = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
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

  & .score {
    font-family: "Black Ops One";
    font-size: 48px;
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
  border: 2px dashed ${Color.Gray[400]};
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
