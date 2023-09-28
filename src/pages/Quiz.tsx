import React, { useEffect, useState } from "react";
import {
  useLoaderData,
  json,
  redirect,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import { ref, set, push } from "firebase/database";
import { db } from "firebase-config";
import Utils from "utils/utils";
import { Items } from "types/google-sheet";
import useOverlay from "hook/useOverlay";
import Navigation from "components/common/Navigation";
import Scoreboard from "components/quiz/Scoreboard";
import Question from "components/quiz/Question";
import Button from "components/common/Button";
import Textarea from "components/quiz/Textarea";

interface StyledProps {
  show?: boolean;
  vibration?: boolean;
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
  const { showProgress } = useOverlay();
  const [qNum, SetQNum] = useState(0);
  const [value, setValue] = useState("");
  const [score, setScore] = useState(0);
  const [miss, setMiss] = useState(0);
  const [overlap, setOverlap] = useState<number[]>([]);
  const [state, setState] = useState<"HIT" | "MISS" | "DEFAULT">("DEFAULT");
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [wrongList, setWrongList] = useState<WrongList>([]);
  const [serchParams] = useSearchParams();
  const [vibration, setVibration] = useState(false);

  const setTotalStage = () => {
    const setData = parseInt(serchParams.get("stage")!) || 0;
    if (0 < setData && setData < data.length) {
      return setData;
    }
    return data.length;
  };

  useEffect(() => {
    // init
    SetQNum(Utils.random(setTotalStage()));
    // showProgress();
  }, []);

  useEffect(() => {
    const updateScoreList = async (score: number, date: number) => {
      const userKey = localStorage.getItem("userKey");
      const listRef = ref(db, `users/${userKey}/scoreList`);
      const newListRef = push(listRef);
      await set(newListRef, {
        sheetName,
        score,
        date,
        wrongList,
      });
      return newListRef.key;
    };

    const finishStage = async () => {
      const date = Date.now();
      const finalScore = Math.floor((score / setTotalStage()) * 100);
      const scoreListId = await updateScoreList(finalScore, date);
      navigate(`/complete/${scoreListId}`);
    };

    if (score + miss >= setTotalStage()) {
      finishStage();
    }
  }, [score, miss]);

  const nextStage = () => {
    const random = Utils.random(setTotalStage());
    const overlapCheck = overlap.filter((num) => num === random).length;
    if (overlapCheck === 0 && qNum !== random) {
      SetQNum(random);
      setValue("");
    } else {
      setTimeout(nextStage, 0);
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
      setVibration(true);
      Utils.vibration(450);
      setTimeout(() => {
        nextStage();
        setState("DEFAULT");
        setVibration(false);
      }, TIMEING);
    }
  };

  return (
    <Container vibration={vibration}>
      <Navigation label="퀴즈" />
      <Scoreboard score={score} miss={miss} totalStage={setTotalStage()} />
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
  let sheetId = localStorage.getItem("sheetId");
  const tutorialKey = new URL(request.url).searchParams.get("mode");

  if (tutorialKey) {
    sheetId = tutorialKey;
  }

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

const vibrationKeyframe = keyframes`
  from {
    transform: rotate(0.5deg);
  }
  to {
    transform: rotate(-0.5deg);
  }
`;

const Container = styled.div<StyledProps>`
  width: 100%;
  min-height: 100%;

  ${({ vibration }) =>
    vibration &&
    css`
      animation: ${vibrationKeyframe} 90ms 5;
    `}
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
