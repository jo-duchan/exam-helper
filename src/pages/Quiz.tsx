import React, { useEffect, useState } from "react";
import { useLoaderData, json, redirect, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import { ref, set, push } from "firebase/database";
import { db } from "firebase-config";
import Utils from "utils/utils";
import { Items } from "types/google-sheet";
import useScore from "hook/useScore";
import Navigation from "components/common/Navigation";
import Scoreboard from "components/quiz/Scoreboard";
import Question from "components/quiz/Question";
import Button from "components/common/Button";
import Textarea from "components/quiz/Textarea";

interface StyledProps {
  show: boolean;
}

interface LoaderData {
  items: [];
  sheetName: string;
}

type WrongList = string[][];
const TIMEING = 1000;

function QuizPage() {
  const { items: data, sheetName } = useLoaderData() as LoaderData;
  const navigate = useNavigate();
  const setFinalScore = useScore.Action();
  const [qNum, SetQNum] = useState(0);
  const [value, setValue] = useState("");
  const [score, setScore] = useState(0);
  const [miss, setMiss] = useState(0);
  const [overlap, setOverlap] = useState<number[]>([]);
  const [state, setState] = useState<"HIT" | "MISS" | "DEFAULT">("DEFAULT");
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [wrongList, setWrongList] = useState<WrongList>([]);
  // 로컬스테이지에서 세팅된 값 가져와서 data.length보다 크면 data.length로
  const totalStage = data.length;

  useEffect(() => {
    // init
    SetQNum(Utils.random(totalStage));
  }, []);

  useEffect(() => {
    const updateScoreList = async (score: number) => {
      const date = Date.now();
      const userKey = localStorage.getItem("userKey");
      const listRef = ref(db, `users/${userKey}/scoreList`);
      const newListRef = push(listRef);
      await set(newListRef, {
        sheetName,
        score,
        date,
        wrongList,
      });
    };

    const finishStage = async () => {
      const finalScore = (score / totalStage) * 100;
      setFinalScore(finalScore);
      await updateScoreList(finalScore);
      navigate("/complete");
    };

    if (score + miss >= totalStage) {
      finishStage();
    }
  }, [score, miss]);

  const nextStage = () => {
    const random = Utils.random(totalStage);
    const overlapCheck = overlap.filter((num) => num === random).length;
    if (overlapCheck === 0 && qNum !== random) {
      SetQNum(random);
      setValue("");
    } else {
      nextStage();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleConfirm = () => {
    const grading = () => {
      setCorrectAnswer(data[qNum][1]);
      return data[qNum][1] === value.toLocaleUpperCase().trim();
    };

    if (grading()) {
      // HIT
      setState("HIT");
      setScore((prev) => (prev += 1));
      setOverlap((prev) => {
        return [...prev, qNum];
      });
      setTimeout(() => {
        nextStage();
        setState("DEFAULT");
      }, TIMEING);
    } else {
      // MISS
      setState("MISS");
      setMiss((prev) => (prev += 1));
      setWrongList((prev) => {
        return [...prev, [data[qNum][0], data[qNum][1]]];
      });
      setTimeout(() => {
        nextStage();
        setState("DEFAULT");
      }, TIMEING);
    }
  };

  return (
    <Container>
      <Navigation label="퀴즈" />
      <Scoreboard score={score} miss={miss} totalStage={totalStage} />
      <ContentSection>
        <Question data={data[qNum][0]} />
        <CorrectAnswer show={state === "MISS"}>
          정답: {correctAnswer}
        </CorrectAnswer>
        <Textarea
          value={value}
          placeholder="정답을 입력해 주세요."
          state={state}
          onChange={handleChange}
        />
        <ButtenWrapper>
          <Button
            label="문제 패스"
            size="L"
            sort="gray"
            status={state !== "DEFAULT" ? "disabled" : "default"}
            onClick={nextStage}
          />
          <Button
            label="완료"
            size="L"
            status={state !== "DEFAULT" ? "disabled" : "default"}
            onClick={handleConfirm}
          />
        </ButtenWrapper>
      </ContentSection>
    </Container>
  );
}

export default QuizPage;

export async function loader({
  request,
  params,
}: {
  request: Request;
  params: any;
}) {
  const sheetId = localStorage.getItem("sheetId");

  if (!sheetId) {
    window.alert("Google SpreadSheet Url을 다시 확인해 주세요.");
    return redirect("/");
  }

  const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
  const sheetName = params.sheetName;
  const query = encodeURIComponent("Select *");
  const url = `${base}&sheet=${sheetName}&tq=${query}`;
  const response = await fetch(url);
  const data = await response.text();
  const convert = JSON.parse(data.substring(47).slice(0, -2));

  if (!response.ok) {
    throw json({ message: "Could not find Google Sheet." }, { status: 500 });
  }
  if (convert.table.rows.length <= 0) {
    throw json({ message: "No Google Sheet values found." }, { status: 500 });
  }

  const items = convert.table.rows.map(({ c }: { c: Items }) =>
    Utils.cleanRow(c)
  );

  return { items, sheetName };
}

const Container = styled.div`
  width: 100%;
  min-height: 100%;
`;

const ContentSection = styled.div`
  padding-inline: 25px;
  box-sizing: border-box;
`;

const CorrectAnswer = styled.div<StyledProps>`
  width: 100%;
  text-align: center;
  margin-bottom: 12px;
  color: ${Color.Red};
  ${Body.Medium.M}
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 300ms ease-in-out;
`;

const ButtenWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;
