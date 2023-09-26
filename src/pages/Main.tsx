import { useEffect } from "react";
import { useLoaderData, redirect, json } from "react-router-dom";
import { ref, child, get } from "firebase/database";
import { db } from "firebase-config";
import styled from "styled-components";
import { Heading, Body } from "styles/typography-system";
import { Admin } from "types/admin-data";
import { User } from "types/user-data";
import Utils from "utils/utils";
import MainNavigation from "components/main/MainNavigation";
import Banner from "components/main/Banner";
import Actions from "components/main/Actions";
import Tip from "components/main/Tip";
import Fire from "assets/img/fire.png";

interface LoaderData {
  data: User;
  admin: Admin;
}

function MainPage() {
  const { data, admin } = useLoaderData() as LoaderData;

  useEffect(() => {
    if (Object.keys(data.scoreList).length <= 0) {
      console.log("Tutorial!");
    }
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
        <Actions sheetNames={data.sheetNameList} scoreList={data.scoreList} />
        <Tip />
      </ContentSection>
    </Container>
  );
}

export default MainPage;

export async function loader() {
  const userKey = localStorage.getItem("userKey");
  if (!userKey) {
    return redirect("/signin");
  }

  const dbRef = ref(db);
  const data = await get(child(dbRef, `users/${userKey}/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        throw json({ message: "No data available" }, { status: 500 });
      }
    })
    .catch((error) => {
      throw json({ message: error }, { status: 500 });
    });

  localStorage.setItem("sheetId", Utils.convertSheetUrl(data.sheetUrl));
  localStorage.setItem("userName", data.name);

  const admin = await get(child(dbRef, `admin`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        throw json({ message: "No data available" }, { status: 500 });
      }
    })
    .catch((error) => {
      throw json({ message: error }, { status: 500 });
    });

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
