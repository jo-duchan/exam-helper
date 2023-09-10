import React from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import styled from "styled-components";

function HomePage() {
  const { sheetName } = useRouteLoaderData("root-loader") as {
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

export default HomePage;

const Container = styled.div`
  & h1 {
    margin-bottom: 20px;
  }

  & .link-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
