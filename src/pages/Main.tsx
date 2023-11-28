import { useEffect, useState } from "react";
import { auth } from "firebase-config";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ZIndex from "styles/z-index";
import { Heading } from "styles/typography-system";
import { BannerData } from "types/admin-data";
import { UserData, Play } from "types/user-data";
import { InfoData } from "assets/data/main-info";
import service from "utils/service";
import MainNavigation from "components/main/MainNavigation";
import Banner from "components/main/Banner";
import Actions from "components/main/Actions";
import Information from "components/main/Information";
import Fire from "assets/img/fire.png";

function MainPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({} as UserData);
  const [bannerData, setBannerData] = useState({} as BannerData);
  const [userName, setUserName] = useState<string>("사용자");
  const [infoType, setInfoType] = useState<string>("signin");
  const [unsigned, setUnsigned] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const onboarding = localStorage.getItem("onboarding");

      if (onboarding !== "hide") {
        navigate("/onboarding");
      }

      const bannerData: BannerData = await service.GET(`admin/banner`);
      setBannerData(bannerData);

      auth.onAuthStateChanged(async (result) => {
        if (result) {
          const userData: UserData = await service.GET(`users/${result.uid}/`);
          setUserData(userData);
          setUserName(result.displayName as string);
          setInfoType("stats");
          setUnsigned(false);
        } else {
          const playList: Play[] = await service.GET(`admin/playList`);
          const sheetUrl: string = await service.GET(`admin/sheetUrl`);
          setUserData((prev) => {
            return { ...prev, playList, sheetUrl };
          });
        }
      });
    };

    fetchData();
  }, []);

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
