import React, { useRef } from "react";
import { useNavigate, json } from "react-router-dom";
import { ref, child, get } from "firebase/database";
import { db } from "firebase-config";
import styled from "styled-components";

function SignInPage() {
  const navigate = useNavigate();
  const userKeyRef = useRef<HTMLInputElement>(null);

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleSignIn = async () => {
    const userKey = userKeyRef.current?.value;

    const dbRef = ref(db);
    const data = await get(child(dbRef, `users/${userKey}/userKey`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          window.alert("No data available.");
        }
      })
      .catch((error) => {
        throw json({ message: error }, { status: 500 });
      });

    if (userKey === data) {
      localStorage.setItem("userKey", userKey!);
      navigate("/");
    } else {
      window.alert("User Key가 불일치합니다. 다시 한번 확인해 주세요.");
    }
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
          <input ref={userKeyRef} type="text" />
        </label>
        <button onClick={handleSignIn}>Done</button>
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
