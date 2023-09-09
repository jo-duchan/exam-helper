import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function SignInPage() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <Container>
      <h1>
        반갑습니다. <br />
        시험 도우미입니다.
      </h1>
      <div>
        <label>
          사용자 인증하기
          <input />
        </label>
        <button>done</button>
      </div>
      <button onClick={handleSignUp}>사용자 등록하기</button>
    </Container>
  );
}

export default SignInPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  & div button {
    margin-top: 10px;
  }

  & div label {
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  & button {
    width: 200px;
  }
`;
