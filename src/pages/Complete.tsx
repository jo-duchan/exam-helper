import React, { useEffect } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import useScore from "hook/useScore";

function CompletePage() {
  const { name } = useRouteLoaderData("main-loader") as {
    name: string;
  };
  const finalScore = useScore.Value();
  const navigate = useNavigate();

  return (
    <>
      <h1>CompletePage</h1>
      <p>
        {name}님 점수: {finalScore}
      </p>
      <div onClick={() => navigate(-1)}>다시 문제풀기</div>
      <div>기록 자랑하기</div>
    </>
  );
}

export default CompletePage;
