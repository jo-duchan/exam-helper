import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import useScore from "hook/useScore";

function CompletePage() {
  const data = useLoaderData() as [];
  const finalScore = useScore.Value();

  useEffect(() => {
    const newData = [...data, finalScore];
    localStorage.setItem("scoreList", JSON.stringify(newData));
  }, [finalScore]);
  return <h1>CompletePage{finalScore}</h1>;
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
