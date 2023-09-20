import { useEffect } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import styled from "styled-components";
import { Heading, Body } from "styles/typography-system";
import { Admin } from "types/admin";
import Navigation from "components/main/Navigation";
import Banner from "components/main/Banner";

interface LoaderData {
  sheetName: string[] | undefined;
  admin: Admin;
}

function MainPage() {
  const { sheetName, admin } = useRouteLoaderData("main-loader") as LoaderData;

  useEffect(() => {
    console.log(admin.banner);
    if (!sheetName) {
      console.log("Tutorial!");
    }
  }, []);

  return (
    <Container>
      <Navigation />
      <Banner data={admin.banner} />
      <ContentSection>
        <h1>HomePage</h1>
        <div className="link-list">
          {sheetName?.map((item) => (
            <Link key={item} to={`/quiz/${item}`}>
              {item}
            </Link>
          ))}
        </div>
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
