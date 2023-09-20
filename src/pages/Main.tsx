import { Link, useRouteLoaderData } from "react-router-dom";
import styled from "styled-components";
import { Heading, Body } from "styles/typography-system";

function MainPage() {
  const { sheetName } = useRouteLoaderData("main-loader") as {
    sheetName: string[];
  };

  return (
    <Container>
      <h1>HomePage</h1>
      <div className="link-list">
        {sheetName.map((item) => (
          <Link key={item} to={`/quiz/${item}`}>
            {item}
          </Link>
        ))}
      </div>
    </Container>
  );
}

export default MainPage;

const Container = styled.div`
  & h1 {
    /* ${Heading}; */
    /* ${Body.Bold.XL}; */
    margin-bottom: 20px;
  }

  & .link-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
