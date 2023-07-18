import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import question from "assets/question";

interface StyledProps {
  state: "GOOD" | "BAD";
}

function Home() {
  const [qNum, SetQNum] = useState(0);
  const [value, setValue] = useState("");
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [stage, setStage] = useState(0);
  const [state, setState] = useState<"GOOD" | "BAD">("GOOD");
  const qLength = question.length;

  useEffect(() => {
    // init
    SetQNum(Math.floor(Math.random() * qLength));
  }, []);

  useEffect(() => {
    if (stage >= 10) {
      setCorrect(0);
      setIncorrect(0);
      setStage(0);
      nextHandler();
    }
  }, [stage]);

  const nextHandler = () => {
    const testNum = Math.floor(Math.random() * qLength);

    if (qNum !== testNum) {
      SetQNum(testNum);
    } else {
      nextHandler();
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const confirmHandler = () => {
    if (question[qNum].Q === value) {
      setState("GOOD");
      setCorrect((prev) => (prev += 1));
    } else {
      console.log("miss");
      setState("BAD");
      setIncorrect((prev) => (prev += 1));
    }
    setStage((prev) => (prev += 1));
    nextHandler();
    setValue("");
  };

  return (
    <Container>
      <Header>
        <Score>
          <Correct>Score: {correct}</Correct>/<Incorrect>{incorrect}</Incorrect>
        </Score>
        <Stage>Stage: {stage}</Stage>
      </Header>
      <InnerWrapper>
        <QuestionWrapper>
          <Label>문제</Label>
          <Question>{question[qNum].A}</Question>
        </QuestionWrapper>
        <Input
          type="text"
          state={state}
          onChange={changeHandler}
          value={value || ""}
        />
        <ButtenWrapper>
          <Done onClick={confirmHandler}>Done</Done>
          <Pass onClick={nextHandler}>Pass</Pass>
        </ButtenWrapper>
      </InnerWrapper>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: 8vw;
  box-sizing: border-box;
`;

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: flex-end;
  padding-inline: 24px;
  box-sizing: border-box;
`;

const Score = styled.div``;

const Correct = styled.span``;

const Incorrect = styled.span``;

const Stage = styled.span``;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Question = styled.div`
  margin-bottom: 40px;
  line-height: 1.25em;
  background: #edf4fc;
  padding: 30px 20px;
  border-radius: 6px;
  font-size: 14px;
  letter-spacing: -0.02em;
`;

const Label = styled.span`
  font-size: 14px;
  color: #323a43;
  font-weight: 700;
`;

const Input = styled.input<StyledProps>`
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
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  width: calc(50% - 5px);
  height: 38px;
  border-radius: 6px;
  border: 1px solid transparent;
  cursor: pointer;
  user-select: none;
  font-weight: 600;
  transition: 200ms ease-in-out;
`;

const Done = styled(Button)`
  background: #2173df;
  color: #fff;

  &:active {
    background: #1c65c4;
  }
`;

const Pass = styled(Button)`
  background: #cbd5e0;
  color: #323a43;

  &:active {
    background: #a9b9cc;
  }
`;
