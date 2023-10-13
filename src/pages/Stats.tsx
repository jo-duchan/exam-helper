import { useCallback } from "react";
import { useLoaderData, redirect } from "react-router-dom";
import styled from "styled-components";
import Color from "styles/color-system";
import { Heading } from "styles/typography-system";
import service from "hook/useService";
import Utils from "utils/utils";
import { ScoreList, Score } from "types/user-data";
import { CustomLoaderProps } from "types/loader-props";
import Navigation from "components/common/Navigation";
import Calendar from "components/stats/Calendar";
import WrongAnswerList from "components/stats/WrongAnswerList";
import { ReactComponent as Flag } from "assets/icon/flag.svg";

interface StyledProps {
  paddingTop: number;
  paddingBtm: number;
}

interface ConvertScoreList {
  [key: string]: Score[];
}

function StatsPage() {
  const { scoreList } = useLoaderData() as { scoreList: ScoreList };

  const convertList = useCallback(() => {
    const convertArray = Object.keys(scoreList).map((key) => {
      return {
        key: key,
        date: scoreList[key].date,
        score: scoreList[key].score,
        sheetName: scoreList[key].sheetName,
        wrongList: scoreList[key].wrongList,
      };
    });
    const convertScoreList = convertArray.reduce(
      (list: ConvertScoreList, current) => {
        list[Utils.dateFormat(current.date, "E")] =
          list[Utils.dateFormat(current.date, "E")] || [];
        list[Utils.dateFormat(current.date, "E")].push({
          key: current.key,
          date: current.date,
          score: current.score,
          sheetName: current.sheetName,
          wrongList: current.wrongList,
        });
        return list;
      },
      {}
    );

    return convertScoreList;
  }, [scoreList]);

  return (
    <Container>
      <Navigation label="통계" />
      <ContentSection>
        <InnerSection paddingTop={40} paddingBtm={30}>
          <Title>
            {"이번달 얼마나 자주\n문제를 풀었을까요?"}
            <Flag />
          </Title>
          <Calendar scoreList={scoreList} />
        </InnerSection>
        <InnerSection paddingTop={30} paddingBtm={40}>
          <Title>오답 리스트</Title>
          <DateList>
            {Object.keys(convertList()).map((key) => (
              <WrongAnswerList
                key={key}
                title={key}
                data={convertList()[key]}
              />
            ))}
          </DateList>
        </InnerSection>
      </ContentSection>
    </Container>
  );
}

export default StatsPage;

export async function loader({
  showProgress,
  hideProgress,
}: CustomLoaderProps) {
  const userKey = localStorage.getItem("userKey");
  if (!userKey) {
    return redirect("/");
  }

  showProgress();
  const data = service().GET(`users/${userKey}/`);
  hideProgress();

  return data;
}

const Container = styled.div`
  width: 100%;
  min-height: 100%;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: ${Color.Gray[200]};
`;

const InnerSection = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-inline: 25px;
  padding-top: ${({ paddingTop }) => `${paddingTop}px`};
  padding-bottom: ${({ paddingBtm }) => `${paddingBtm}px`};
  box-sizing: border-box;
  background: ${Color.Gray[100]};
`;

const Title = styled.h2`
  display: flex;
  align-items: end;
  white-space: pre;
  color: ${Color.Gray[800]};
  ${Heading.H2};

  & svg {
    width: 32px;
    height: 32px;
  }
`;

const DateList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
