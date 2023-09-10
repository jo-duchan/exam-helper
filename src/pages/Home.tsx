import React from "react";
import { Link, json, useLoaderData, redirect } from "react-router-dom";
import { getDatabase, ref, child, get } from "firebase/database";
import { db } from "firebase-config";
import styled from "styled-components";

function HomePage() {
  const sheetName = useLoaderData() as string[];

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

export async function loader() {
  const userkey = localStorage.getItem("userKey");
  if (!userkey) {
    return redirect("/signin");
  }

  const dbRef = ref(db);
  const data = await get(child(dbRef, `users/${userkey}/sheetName`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        return snapshot.val();
      } else {
        throw json({ message: "No data available" }, { status: 500 });
      }
    })
    .catch((error) => {
      throw json({ message: error }, { status: 500 });
    });

  return data;
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
