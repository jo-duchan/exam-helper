import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Connect() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const submitHandler = () => {
    const sheetId = inputRef.current?.value;

    if (sheetId) {
      localStorage.setItem("sheetId", sheetId);
      navigate("/");
      return;
    }

    // 팝업이나 토스트로 대체
    window.alert("Google Sheet Key를 입력해 주세요.");
  };

  return (
    <Container>
      <h1>ConnectPage</h1>
      <input type="text" ref={inputRef} />
      <button type="button" onClick={submitHandler}>
        Submit
      </button>
    </Container>
  );
}

export default Connect;

const Container = styled.div`
  & input {
    width: 200px;
    margin-right: 10px;
  }
`;
