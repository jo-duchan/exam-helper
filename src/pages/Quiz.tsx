import React, { useEffect, useState } from "react";
import { useLoaderData, json, redirect, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { ref, set, push } from "firebase/database";
import { db } from "firebase-config";
import Utils from "utils/utils";
import { Items } from "types/google-sheet";
import useScore from "hook/useScore";
import Navigation from "components/common/Navigation";
import Scoreboard from "components/quiz/Scoreboard";
import Question from "components/quiz/Question";

interface StyledProps {
  state: "GOOD" | "BAD";
}

interface LoaderData {
  items: [];
  sheetName: string;
}

type WrongList = string[][];

function QuizPage() {
  const { items: data, sheetName } = useLoaderData() as LoaderData;
  const navigate = useNavigate();
  const setFinalScore = useScore.Action();
  const [qNum, SetQNum] = useState(0);
  const [value, setValue] = useState("");
  const [score, setScore] = useState(0);
  const [miss, setMiss] = useState(0);
  const [overlap, setOverlap] = useState<number[]>([]);
  const [state, setState] = useState<"GOOD" | "BAD">("GOOD");
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [wrongList, setWrongList] = useState<WrongList>([]);
  // 로컬스테이지에서 세팅된 값 가져와서 data.length보다 크면 data.length로
  const totalStage = data.length;
  const randomNumber = () => {
    return Math.floor(Math.random() * data.length);
  };
  useEffect(() => {
    // init
    SetQNum(randomNumber());
    // console.log("데이터", data);
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
    const random = randomNumber();
    const overlapCheck = overlap.filter(
      (num) => num === qNum || num === random
    ).length;
    if (overlapCheck === 0 && qNum !== random) {
      SetQNum(random);
      setValue("");
      setState("GOOD");
    } else {
      nextStage();
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const confirmHandler = () => {
    const grading = () => {
      setCorrectAnswer(data[qNum][1]);
      return data[qNum][1] === value.toLocaleUpperCase();
    };

    if (grading()) {
      console.log("right");
      setScore((prev) => (prev += 1));
      setOverlap((prev) => {
        return [...prev, qNum];
      });
      nextStage();
    } else {
      console.log("miss", data[qNum][1], value.toLocaleUpperCase());
      setState("BAD");
      setMiss((prev) => (prev += 1));
      setWrongList((prev) => {
        return [...prev, [data[qNum][0], data[qNum][1]]];
      });
    }
  };

  return (
    <Container>
      <Navigation label="퀴즈" />
      <Scoreboard score={score} miss={miss} totalStage={data.length} />
      <ContentSection>
        <Question data={data[qNum][0]} />
        {state === "BAD" && <Correctanswer>{correctAnswer}</Correctanswer>}
        <Input
          type="text"
          state={state}
          onChange={changeHandler}
          value={value || ""}
          disabled={state === "BAD"}
        />
        <ButtenWrapper>
          {state === "BAD" && <Next onClick={nextStage}>Next</Next>}
          {state === "GOOD" && (
            <Done type="submit" onClick={confirmHandler}>
              Done
            </Done>
          )}
          {state === "GOOD" && <Pass onClick={nextStage}>Pass</Pass>}
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

//수정 포인트

const Correctanswer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  font-size: 12px;
`;

const Input = styled.input<StyledProps>`
  width: 100%;
  height: 50px;
  padding: 12px;
  border-radius: 6px;
  outline: initial;
  border: 2px solid transparent;
  background: #f1f4f9;
  font-size: 18px;
  box-sizing: border-box;
  transition: 200ms ease-in-out;
  ${({ state }) =>
    state === "GOOD" &&
    css`
      border-color: #2173df;
      color: #2173df;

      &:focus {
        border-color: #2173df;
      }
    `}

  ${({ state }) =>
    state === "BAD" &&
    css`
      border-color: #ff2941;
      color: #ff2941;

      &:focus {
        border-color: #ff2941;
      }
    `}
`;

const ButtenWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  height: 38px;
  border-radius: 6px;
  border: 1px solid transparent;
  cursor: pointer;
  user-select: none;
  font-weight: 600;
  transition: 200ms ease-in-out;
`;

const Done = styled(Button)`
  width: calc(50% - 5px);
  background: #2173df;
  color: #fff;

  &:active {
    background: #1c65c4;
  }
`;

const Pass = styled(Button)`
  width: calc(50% - 5px);
  background: #cbd5e0;
  color: #323a43;

  &:active {
    background: #a9b9cc;
  }
`;

const Next = styled(Button)`
  width: 100%;
  background: #ff2941;
  color: #fff;

  &:active {
    background: #eb001a;
  }
`;
