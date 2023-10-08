import { useEffect, useState } from "react";
import { useLoaderData, redirect } from "react-router-dom";
import styled from "styled-components";
import Color from "styles/color-system";
import ZIndex from "styles/z-index";
import { Heading } from "styles/typography-system";
import { Admin } from "types/admin-data";
import { User } from "types/user-data";
import { LoaderProps } from "types/loader-props";
import { InfoData } from "assets/data/main-info";
import Utils from "utils/utils";
import service from "hook/useService";
import MainNavigation from "components/main/MainNavigation";
import Banner from "components/main/Banner";
import Actions from "components/main/Actions";
import Information from "components/main/Information";
import Fire from "assets/img/fire.png";

interface LoaderData {
  data: User;
  admin: Admin;
}

function MainPage() {
  const { data, admin } = useLoaderData() as LoaderData;
  const [infoType, setInfoType] = useState<string>("stats");

  useEffect(() => {
    const theme = document.getElementById("theme") as HTMLMetaElement;
    theme.setAttribute("content", Color.Gray[100]);

    if (!data.scoreList) {
      setInfoType("tutorial");
    }
    const root = document.getElementById("root") as HTMLElement;

    root.style.height = "100%";
    root.style.overflow = "hidden";

    return () => {
      root.style.height = "initial";
      root.style.overflow = "initial";
    };
  }, []);

  return (
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
  );
}

export default MainPage;

export async function loader({ showProgress, hideProgress }: LoaderProps) {
  const userKey = localStorage.getItem("userKey");
  if (!userKey) {
    return redirect("/signin");
  }

  setTimeout(() => showProgress(), 0);
  const data: User = await service().GET(`users/${userKey}/`);
  const admin: Admin = await service().GET(`admin`);

  localStorage.setItem("sheetId", Utils.convertSheetUrl(data.sheetUrl));
  localStorage.setItem("userName", data.name);
  hideProgress();
  return { data, admin };
}

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  overflow: hidden auto;
  ${ZIndex[100]};
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
