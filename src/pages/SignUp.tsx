import React, { useRef, useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { ref, set } from "firebase/database";
import { db } from "firebase-config";
import Utils from "utils/utils";

function SignUpPage() {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const sheetUrlRef = useRef<HTMLInputElement>(null);
  const sheetNameRef = useRef<HTMLInputElement>(null);
  const [sheetNameList, setSheetNameList] = useState<string[]>([]);

  const handleAddSheetName = () => {
    const value = sheetNameRef.current?.value;

    if (value) {
      setSheetNameList((prev) => {
        return [...prev, value];
      });
      sheetNameRef.current.value = "";
    }
  };

  const HandleRemoveSheetName = (index: number) => {
    console.log("touch start");
    Utils.longPress.setup(() => {
      if (window.confirm("해당 시트 이름을 지우겠습니까?")) {
        setSheetNameList((prev) => {
          const newList = prev.filter((item, idx) => idx !== index);
          return newList;
        });
      }
    });
  };

  const leave = () => {
    console.log("touch leave");
    Utils.longPress.cancel();
  };

  const handleSubmit = async () => {
    const userKey = nanoid();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const sheetUrl = sheetUrlRef.current?.value;
    const sheetName = sheetNameList;
    const created = Date.now();

    // 유효성 검사 추가 예정.
    if (!name || !email || !sheetUrl || !sheetName.length) {
      return window.alert("입력 값을 확인해 주세요.");
    }

    await set(ref(db, `users/${userKey}`), {
      userKey,
      name,
      email,
      created,
      sheetUrl,
      sheetName,
    });

    localStorage.setItem("userKey", userKey);
    navigate("/");
  };
  return (
    <Container>
      <h1>SignUpPage</h1>
      <label>
        Name
        <input ref={nameRef} type="text" />
      </label>
      <label>
        Email
        <input ref={emailRef} type="text" />
      </label>
      <label>
        GoogleSheetUrl
        <input ref={sheetUrlRef} type="text" />
      </label>
      <div className="sheetname-wrapper">
        <label>
          GoogleSheetName
          <input ref={sheetNameRef} type="text" />
          <button onClick={handleAddSheetName}>Add</button>
        </label>
        <div className="sheetname">
          {sheetNameList.map((item, index) => (
            <div
              key={nanoid()}
              onMouseDown={() => HandleRemoveSheetName(index)}
              onMouseUp={leave}
              onMouseLeave={leave}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <button type="button" onClick={handleSubmit}>
        등록 완료
      </button>
    </Container>
  );
}

export default SignUpPage;

export async function loader() {
  const data = localStorage.getItem("userKey");
  if (data) {
    return redirect("/");
  }
  return null;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  & button {
    width: 200px;
  }

  & .sheetname {
    display: flex;
    gap: 20px;
  }
`;
