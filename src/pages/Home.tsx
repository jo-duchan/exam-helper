import React from "react";
import { Link, json, useLoaderData } from "react-router-dom";
import styled from "styled-components";

function HomePage() {
  const sheetName = useLoaderData() as string[];

  return (
    <Container>
      <h1>HomePage</h1>
      {/* <p>
        <Link to="/quiz">START</Link>
      </p> */}
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

export async function loader() {
  const data = localStorage.getItem("sheetName");

  if (!data) {
    throw json(
      { message: "Could not find Google Sheet Name." },
      { status: 500 }
    );
  }
  const sheetName = JSON.parse(data);

  return sheetName;
}

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
