import { useLoaderData, Params } from "react-router-dom";
import styled from "styled-components";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import Utils from "utils/utils";
import service from "hook/useService";
import { Score } from "types/user-data";
import { LoaderProps } from "types/loader-props";
import Navigation from "components/common/Navigation";

interface WrongAnswerLoaderProps extends LoaderProps {
  params: Params<string>;
}

function WrongAnswerPage() {
  const data = useLoaderData() as Score;
  console.log(data);
  return (
    <Container>
      <Navigation label="오답 리스트" mode={-1} />
      <ContentSection>
        <span className="date">{Utils.dateFormat(data.date, "E")}</span>
        <span className="sheetname">{data.sheetName}</span>
        <ListSection>
          {Object.keys(data.wrongList).map((key) => (
            <Item>
              <span className="q">Q.{data.wrongList[key][0]}</span>
              <span className="a">A.{data.wrongList[key][1]}</span>
            </Item>
          ))}
        </ListSection>
      </ContentSection>
    </Container>
  );
}

export default WrongAnswerPage;

export async function loader({
  params,
  showProgress,
  hideProgress,
}: WrongAnswerLoaderProps) {
  const userKey = localStorage.getItem("userKey");
  const scoreListId = params.scoreListId;

  showProgress();
  const data = await service().GET(`users/${userKey}/scoreList/${scoreListId}`);
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
  word-break: break-word;

  & .q {
    color: ${Color.Gray[700]};
  }

  & .a {
    color: ${Color.Gray[500]};
  }
`;
