import { useEffect } from "react";
import { useRouteLoaderData } from "react-router-dom";
import styled from "styled-components";
import { Heading, Body } from "styles/typography-system";
import { Admin } from "types/admin-data";
import { User } from "types/user-data";
import Navigation from "components/main/Navigation";
import Banner from "components/main/Banner";
import Actions from "components/main/Actions";
import Tip from "components/main/Tip";
import Fire from "assets/img/fire.png";

interface LoaderData {
  data: User;
  admin: Admin;
}

function MainPage() {
  const { data, admin } = useRouteLoaderData("main-loader") as LoaderData;

  useEffect(() => {
    console.log(admin.banner, data.sheetName, data);
    if (!data.sheetName) {
      console.log("Tutorial!");
    }
  }, []);

  return (
    <Container>
      <Navigation />
      <Banner data={admin.banner} />
      <ContentSection>
        <Title>
          <span>{data.name}님! 오늘 퀴즈에</span>
          <span>
            도전해 보세요! <img src={Fire} alt="불 이미지" />
          </span>
        </Title>
        <Actions sheetNames={data.sheetName} scoreList={data.scoreList} />
        <Tip />
      </ContentSection>
    </Container>
  );
}

export default MainPage;

const Container = styled.div`
  width: 100%;
  min-height: 100%;
`;

const ContentSection = styled.div`
  padding-inline: 25px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  ${Heading.H2};
  margin-bottom: 30px;

  & span {
    display: flex;
  }

  & span img {
    width: 32px;
    height: 32px;
    object-fit: cover;
    margin-bottom: 2px;
  }
`;
