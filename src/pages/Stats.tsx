import React, { useEffect } from "react";
import { useLoaderData, redirect, json } from "react-router-dom";
import styled from "styled-components";
import { ref, child, get } from "firebase/database";
import { db } from "firebase-config";
import { format } from "date-fns";

type ScoreList = {
  [key: string]: {
    date: number;
    score: number;
  };
};

interface StyledProps {
  active: boolean;
}

function StatsPage() {
  const { scoreList } = useLoaderData() as { scoreList: ScoreList };
  const list = new Date().getDate();

  useEffect(() => {
    console.log(format(new Date(), "MM"), new Date().getMonth());
  }, []);

  const ActiveDate = (date: string) => {
    const validDate = Object.keys(scoreList).filter(
      (key: string) =>
        format(scoreList[key].date, "MM") === format(new Date(), "MM")
    );
    const active = validDate.filter(
      (key: string) => format(scoreList[key].date, "dd") === date
    );

    return active.length > 0;
  };
  return (
    <Container>
      <DateList>
        {[...Array(list)].map((item, index) => (
          <DateItem key={index} active={ActiveDate((index + 1).toString())} />
        ))}
      </DateList>
    </Container>
  );
}

export default StatsPage;

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

  return data;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const DateList = styled.div`
  width: 140px;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  font-size: 5px;
`;

const DateItem = styled.div<StyledProps>`
  position: relative;
  width: calc((100% - 0.5em * 6) / 7);
  height: 0;
  padding-bottom: calc((100% - 0.5em * 6) / 7);
  border-radius: 4px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ active }) => (active ? "skyblue" : "lightgray")};
  }
`;
