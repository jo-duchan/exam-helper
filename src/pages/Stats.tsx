import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "store/store";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Color from "styles/color-system";
import { Heading } from "styles/typography-system";
import { showProgress, hideProgress } from "utils/overlays";
import Utils from "utils/utils";
import { Score } from "types/user-data";
import Navigation from "components/common/Navigation";
import Calendar from "components/stats/Calendar";
import WrongAnswerList from "components/stats/WrongAnswerList";
import { ReactComponent as Flag } from "assets/icon/flag.svg";
import { ref, get, query, orderByChild } from "firebase/database";
import { db } from "firebase-config";
interface StyledProps {
  paddingTop: number;
  paddingBtm: number;
}

interface ConvertScoreList {
  [key: string]: Score[];
}

function StatsPage() {
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: scoreList } = useQuery({
    queryKey: ["scoreList"],
    queryFn: async (): Promise<Score[]> => {
      showProgress();
      return await get(
        query(
          ref(db, `users/${user?.uid}/scoreList`),
          orderByChild("order")
          // startAfter() DB 상태에 따라 추후에 이달의 데이터만 조회
        )
      ).then((snapshot) => {
        const array = [] as Score[];
        snapshot.forEach((item) => {
          array.push({ ...item.val(), key: item.key });
        });
        hideProgress();
        return array;
      });
    },
  });

  const convertList = useCallback(() => {
    if (!scoreList) return {};

    const convertScoreList = scoreList.reduce(
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
          <Calendar scoreList={scoreList || []} />
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
