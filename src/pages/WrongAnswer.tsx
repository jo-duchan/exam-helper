import { useLoaderData, redirect } from "react-router-dom";
import styled from "styled-components";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import Utils from "utils/utils";
import service from "utils/service";
import { Score } from "types/user-data";
import { LoaderArgs } from "types/loader-props";
import Navigation from "components/common/Navigation";

function WrongAnswerPage() {
  const data = useLoaderData() as Score;

  return (
    <Container>
      <Navigation label="오답 리스트" mode={-1} />
      <ContentSection>
        <span className="date">{Utils.dateFormat(data.date, "E")}</span>
        <span className="sheetname">{data.sheetName}</span>
        <ListSection>
          {Object.keys(data.wrongList!).map((key) => (
            <Item key={key}>
              <span className="q">Q.{data.wrongList![key][0]}</span>
              <span className="a">A.{data.wrongList![key][1]}</span>
            </Item>
          ))}
        </ListSection>
      </ContentSection>
    </Container>
  );
}

export default WrongAnswerPage;

export async function loader({ params }: LoaderArgs) {
  const userKey = localStorage.getItem("userKey");
  const scoreListId = params.scoreListId;

  if (!userKey) {
    return redirect("/");
  }

  const data = await service.GET(`users/${userKey}/scoreList/${scoreListId}`);

  return data;
}

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
