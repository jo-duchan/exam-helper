import { useEffect, useState } from "react";
import { useLoaderData, redirect } from "react-router-dom";
import service from "hook/useService";
import styled from "styled-components";
import { Heading } from "styles/typography-system";
import { Admin } from "types/admin-data";
import { User } from "types/user-data";
import Utils from "utils/utils";
import LoaderProgress from "components/common/LoaderProgress";
import MainNavigation from "components/main/MainNavigation";
import Banner from "components/main/Banner";
import Actions from "components/main/Actions";
import Information from "components/main/Information";
import Fire from "assets/img/fire.png";
import { InfoData } from "assets/data/main-info";

interface LoaderData {
  data: User;
  admin: Admin;
}

function MainPage() {
  const { data, admin } = useLoaderData() as LoaderData;
  const [infoType, setInfoType] = useState<string>("stats");

  useEffect(() => {
    console.log(data, admin);
    if (!data.scoreList) {
      setInfoType("tutorial");
    }
  }, []);

  return (
    <LoaderProgress resolve={data}>
      <Container>
        <MainNavigation />
        <Banner data={admin.banner} />
        <ContentSection>
          <Title>
            <span>{data.name}님! 오늘 퀴즈에</span>
            <span>
              도전해 보세요! <img src={Fire} alt="불 이미지" />
            </span>
          </Title>
          <Actions data={data} />
          <Information data={InfoData[infoType]} />
        </ContentSection>
      </Container>
    </LoaderProgress>
  );
}

export default MainPage;

export async function loader() {
  const userKey = localStorage.getItem("userKey");
  if (!userKey) {
    return redirect("/signin");
  }

  const data: User = await service().GET(`users/${userKey}/`);
  const admin: Admin = await service().GET(`admin`);

  localStorage.setItem("sheetId", Utils.convertSheetUrl(data.sheetUrl));
  localStorage.setItem("userName", data.name);

  return { data, admin };
}

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
