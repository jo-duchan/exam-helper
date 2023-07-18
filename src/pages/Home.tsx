import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Data from "assets/network";

function Home() {
  const [random, SetRandom] = useState(0);
  const [value, setValue] = useState("");

  useEffect(() => {
    // SetRandom();
    console.log(Math.floor(Math.random() * Data.network.length));
  }, []);

  const nextHandler = () => {
    const testNum = Math.floor(Math.random() * Data.network.length);

    if (random !== testNum) {
      SetRandom(testNum);
    } else {
      nextHandler();
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const confirmHandler = () => {
    if (Data.network[random].label === value) {
      console.log("정답");
      nextHandler();
    } else {
      console.log("오답");
    }
  };

  return (
    <Container>
      <Question>{Data.network[random].content}</Question>
      <input type="text" onChange={changeHandler} />
      <Button onClick={confirmHandler}>정답</Button>
      <Button onClick={nextHandler}>다음</Button>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Button = styled.button``;

const Question = styled.div``;
