import React, { useRef } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { ref, set } from "firebase/database";
import { db } from "firebase-config";

function SignUpPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const sheetUrlRef = useRef<HTMLInputElement>(null);
  const sheetNameRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async () => {
    const userId = nanoid();
    console.log(userId);
    const name = nameRef.current?.value;
    const phone = phoneRef.current?.value;
    const sheetUrl = sheetUrlRef.current?.value;
    const sheetName = sheetNameRef.current?.value;

    if (name && phone && sheetUrl && sheetName) {
      const response = set(ref(db, `users/${userId}`), {
        userId,
        name,
        phone,
        sheetUrl,
        sheetName,
      });
      console.log(response);
    }
    //  userId
    // name
    // phone
    // sheetUrl
    // sheetName
  };
  return (
    <Container>
      <h1>SignUpPage</h1>
      <label>
        이름
        <input ref={nameRef} type="text" />
      </label>
      <label>
        휴대폰
        <input ref={phoneRef} type="text" />
      </label>
      <label>
        GoogleSheetUrl
        <input ref={sheetUrlRef} type="text" />
      </label>
      <label>
        GoogleSheetName
        <input ref={sheetNameRef} type="text" />
      </label>
      <button type="button" onClick={handleSubmit}>
        등록 완료
      </button>
    </Container>
  );
}

export default SignUpPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  & button {
    width: 200px;
  }
`;
