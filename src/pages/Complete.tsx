import React, { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useScore from "hook/useScore";

function CompletePage() {
  const data = useLoaderData() as [];
  const finalScore = useScore.Value();
  const navigate = useNavigate();

  useEffect(() => {
    const newData = [...data, finalScore];
    localStorage.setItem("scoreList", JSON.stringify(newData));
  }, [finalScore]);
  return (
    <>
      <h1>CompletePage{finalScore}</h1>
      <div onClick={() => navigate(-1)}>다시 문제풀기</div>
      <div>기록 자랑하기</div>
    </>
  );
}

export default CompletePage;

export async function loader() {
  const scoreList = localStorage.getItem("scoreList");

  if (!scoreList) {
    localStorage.setItem("scoreList", JSON.stringify([]));
    return;
  }

  return JSON.parse(scoreList);
}
