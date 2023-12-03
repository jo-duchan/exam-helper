import React, { useEffect, useState } from "react";
import {
  useLoaderData,
  json,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { RootState } from "store/store";
import { useSelector } from "react-redux";
import styled, { keyframes, css } from "styled-components";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import store from "store/store";
import { show, hide } from "store/progress-slice";
import service from "utils/service";
import { NOT_FOUND_SHEET, NOT_FOUND_SHEET_VALUE } from "assets/data/error-case";
import Utils from "utils/utils";
import { Items } from "types/google-sheet";
import { LoaderArgs } from "types/loader-props";
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
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
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
  const vibrationOption: boolean = serchParams.get("vibration") === "on";

  const setTotalStage = () => {
    const setData = parseInt(serchParams.get("stage") || "0");
    if (0 < setData && setData < data.length) {
      return setData;
    }
    return data.length;
  };

  useEffect(() => {
    // init
    SetQNum(Utils.random(setTotalStage()));
  }, []);

  useEffect(() => {
    const finishStage = async () => {
      const date = Date.now();
      const finalScore = Math.floor((score / setTotalStage()) * 100);
      if (user) {
        const scoreListId = await service.PUSH(`users/${user.uid}/scoreList`, {
          sheetName,
          score: finalScore,
          date,
          wrongList,
        });
        navigate(`/complete/${scoreListId}`);
      } else {
        navigate(`/complete/guest?score=${finalScore}&date=${date}`);
      }
    };

    if (score + miss >= setTotalStage()) {
      finishStage();
    }
  }, [score, miss]);

  const nextStage = () => {
    const random = Utils.random(setTotalStage());
    const overlapCheck = overlap.find((num) => num === random);
    if (!overlapCheck && qNum !== random) {
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
    const question = data[qNum][0] as string;
    const answer = data[qNum][1] as string;

    const grading = () => {
      setCorrectAnswer(answer);
      const convertAnswer = answer.split(",");
      return convertAnswer.find(
        (a) => Utils.convertValue(a) === Utils.convertValue(value)
      );
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
        return [...prev, [question, answer]];
      });
      vibrationOption && setVibration(true);
      vibrationOption && Utils.vibration(450);
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

export async function loader({ request }: LoaderArgs) {
  const sheetId = new URL(request.url).searchParams.get("id");
  const sheetName = new URL(request.url).searchParams.get("name");

  const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
  const query = encodeURIComponent("SELECT A, B");
  const url = `${base}&sheet=${sheetName}&headers=0&tq=${query}`;

  try {
    store.dispatch(show());
    const response = await fetch(url);
    const data = await response.text();
    const convert = JSON.parse(data.substring(47).slice(0, -2));

    if (!response.ok) {
      throw json({ message: NOT_FOUND_SHEET }, { status: 500 });
    }

    if (convert.table.rows.length <= 0) {
      throw json({ message: NOT_FOUND_SHEET_VALUE }, { status: 500 });
    }

    const items = convert.table.rows.map(({ c }: { c: Items }) =>
      Utils.cleanRow(c)
    );

    return { items, sheetName };
  } catch (error) {
    console.error(error);
    throw json({ message: NOT_FOUND_SHEET }, { status: 500 });
  } finally {
    store.dispatch(hide());
  }
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
