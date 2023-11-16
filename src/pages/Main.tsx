import { useEffect, useState } from "react";
import { useLoaderData, redirect } from "react-router-dom";
import styled from "styled-components";
import ZIndex from "styles/z-index";
import { Heading } from "styles/typography-system";
import { Banner as BannerType } from "types/admin-data";
import { User } from "types/user-data";
import { InfoData } from "assets/data/main-info";
import Utils from "utils/utils";
import service from "hook/useService";
import MainNavigation from "components/main/MainNavigation";
import Banner from "components/main/Banner";
import Actions from "components/main/Actions";
import Information from "components/main/Information";
import Fire from "assets/img/fire.png";

// https://beta.reactrouter.com/en/main/components/await

interface LoaderData {
  data: User;
  banner: BannerType;
}

function MainPage() {
  const { data, banner } = useLoaderData() as LoaderData;
  const [infoType, setInfoType] = useState<string>("stats");
  const [unsigned, setUnsigned] = useState<boolean>(false);

  useEffect(() => {
    const userKey = localStorage.getItem("userKey");

    if (!userKey) {
      setInfoType("signin");
      setUnsigned(true);
    }
  }, []);

  return (
    <Container>
      <MainNavigation unsigned={unsigned} />
      <Banner data={banner} />
      <ContentSection>
        <Title>
          <span>{data.name}님! 오늘 퀴즈에</span>
          <span>
            도전해 보세요! <img src={Fire} alt="불 이미지" />
          </span>
        </Title>
        <Actions data={data} unsigned={unsigned} />
        <Information data={InfoData[infoType]} />
      </ContentSection>
    </Container>
  );
}

export default MainPage;

export async function loader() {
  const onboarding = localStorage.getItem("onboarding");
  const userKey = localStorage.getItem("userKey");
  let data: User;
  if (onboarding !== "hide") {
    return redirect("/onboarding");
  }

  // setTimeout(() => showProgress(), 0);

  if (userKey) {
    data = await service().GET(`users/${userKey}/`);
  } else {
    const name = "사용자";
    const playList = await service().GET(`admin/playList`);
    const sheetUrl = await service().GET(`admin/sheetUrl`);
    data = { name, playList, sheetUrl } as User;
  }

  const banner: BannerType = await service().GET(`admin/banner`);

  localStorage.setItem("sheetId", Utils.convertSheetUrl(data.sheetUrl));
  localStorage.setItem("userName", data.name);
  // hideProgress();

  return { data, banner };
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
