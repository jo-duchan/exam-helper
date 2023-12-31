import { useQuery } from "@tanstack/react-query";
import { RootState } from "store/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import Utils from "utils/utils";
import service from "utils/service";
import { Score } from "types/user-data";
import Navigation from "components/common/Navigation";

function WrongAnswerPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { scoreListId } = useParams();
  const { data } = useQuery({
    queryKey: ["wrongAnswerList"],
    queryFn: (): Promise<Score> => {
      return service.GET(`users/${user?.uid}/scoreList/${scoreListId}`);
    },
  });

  return (
    <Container>
      <Navigation label="오답 리스트" mode={-1} />
      <ContentSection>
        <span className="date">{Utils.dateFormat(data?.date || 0, "E")}</span>
        <span className="sheetname">{data?.sheetName}</span>
        <ListSection>
          {Object.keys(data?.wrongList || {}).map((key) => (
            <Item key={key}>
              <span className="q">
                Q.{data?.wrongList && data.wrongList[key][0]}
              </span>
              <span className="a">
                A.{data?.wrongList && data.wrongList[key][1]}
              </span>
            </Item>
          ))}
        </ListSection>
      </ContentSection>
    </Container>
  );
}

export default WrongAnswerPage;

const Container = styled.div`
  width: 100%;
  min-height: 100%;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  padding-inline: 25px;
  padding-bottom: 40px;
  box-sizing: border-box;

  & .date {
    color: ${Color.Gray[500]};
    ${Body.SemiBold.M};
    margin-bottom: 8px;
  }

  & .sheetname {
    color: ${Color.Gray[800]};
    ${Body.Bold.XL};
    margin-bottom: 12px;
  }
`;

const ListSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 20px;
  border-radius: 16px;
  box-sizing: border-box;
  background: ${Color.Gray[200]};
  ${Body.SemiBold.L};
  white-space: pre-line;
  word-break: keep-all;

  & .q {
    color: ${Color.Gray[700]};
  }

  & .a {
    color: ${Color.Gray[500]};
  }
`;
