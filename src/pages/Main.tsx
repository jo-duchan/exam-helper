import { useEffect, useState } from "react";
import { RootState } from "store/store";
import { useSelector } from "react-redux";
import { useLoaderData, redirect } from "react-router-dom";
import styled from "styled-components";
import ZIndex from "styles/z-index";
import { Heading } from "styles/typography-system";
import { BannerData, GuestData } from "types/admin-data";
import { UserData } from "types/user-data";
import { InfoData } from "assets/data/main-info";
import service from "utils/service";
import MainNavigation from "components/main/MainNavigation";
import Banner from "components/main/Banner";
import Actions from "components/main/Actions";
import Information from "components/main/Information";
import Fire from "assets/img/fire.png";

function MainPage() {
  const bannerData = useLoaderData() as BannerData;
  const user = useSelector((state: RootState) => state.auth.user);
  const [userData, setUserData] = useState<UserData>({} as UserData);
  const [userName, setUserName] = useState("사용자");
  const [infoType, setInfoType] = useState<string>("signin");
  const [unsigned, setUnsigned] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userData: UserData = await service.GET(`users/${user.uid}`);
        setUserData(userData);
        setUserName(user.displayName);
        setInfoType("stats");
        setUnsigned(false);
      } else {
        const { playList, sheetUrl }: GuestData = await service.GET(
          `admin/guest`
        );
        setUserData((prev) => {
          return { ...prev, playList, sheetUrl };
        });
        setUserName("사용자");
        setInfoType("signin");
        setUnsigned(true);
      }
    };

    fetchData();
  }, [user]);

  return (
    <Container>
      <MainNavigation unsigned={unsigned} />
      <Banner data={bannerData} />
      <ContentSection>
        <Title>
          <span>{userName}님! 오늘 퀴즈에</span>
          <span>
            도전해 보세요! <img src={Fire} alt="불 이미지" />
          </span>
        </Title>
        <Actions data={userData} unsigned={unsigned} />
        <Information data={InfoData[infoType]} />
      </ContentSection>
    </Container>
  );
}

export default MainPage;

export async function loader() {
  const onboarding = localStorage.getItem("onboarding");

  if (onboarding !== "hide") {
    return redirect("/onboarding");
  }

  const bannerData: BannerData = await service.GET(`admin/banner`);

  return bannerData;
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
