import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Setting() {
  const sheetUrlInputRef = useRef<HTMLInputElement>(null);
  const sheetNameInputRef = useRef<HTMLInputElement>(null);
  const [sheetId, setSheetId] = useState<string>("");
  const [sheetName, setSheetName] = useState<string[]>([]);

  const navigate = useNavigate();

  const sheetUrlHandler = () => {
    const sheetUrl = sheetUrlInputRef.current?.value;

    if (sheetUrl) {
      const sheetKey = sheetUrl.slice(39, 83);
      setSheetId(sheetKey);
      return;
    }

    // 팝업이나 토스트로 대체
    window.alert("Google Sheets Key를 입력해 주세요.");
  };

  const addSheetNameHandler = () => {
    const value = sheetNameInputRef.current?.value;

    if (value) {
      setSheetName((prev) => {
        return [...prev, value];
      });
      sheetNameInputRef.current.value = "";
    }
  };

  const removeItemHandler = (index: number) => {
    setSheetName((prev) => {
      const newList = prev.filter((item, idx) => idx !== index);
      return newList;
    });
  };

  const submitHandler = () => {
    if (sheetId.length !== 44) {
      window.alert("Google Sheets URL을 확인하세요.");
      sheetUrlInputRef.current?.focus();
      return;
    }

    if (sheetName.length <= 0) {
      window.alert("SheetName를 추가해 주세요.");
      sheetNameInputRef.current?.focus();
      return;
    }
    localStorage.setItem("sheetId", sheetId);
    localStorage.setItem("sheetName", JSON.stringify(sheetName));
    navigate("/");
  };

  return (
    <Container>
      <h1>ConnectPage</h1>
      <label>
        Google Sheets URL
        <div className="input-wrapper">
          <input type="text" ref={sheetUrlInputRef} />
          <button type="button" onClick={sheetUrlHandler}>
            Done
          </button>
        </div>
      </label>
      <label>
        SheetName
        <div className="input-wrapper">
          <input type="text" ref={sheetNameInputRef} />
          <button type="button" onClick={addSheetNameHandler}>
            Done
          </button>
        </div>
      </label>
      <div className="category-list">
        {sheetName.map((item, index) => (
          <div
            key={Math.random().toString()}
            onClick={() => removeItemHandler(index)}
          >
            {item}
          </div>
        ))}
      </div>
      <button type="button" onClick={submitHandler}>
        Submit
      </button>
    </Container>
  );
}

export default Setting;

const Container = styled.div`
  & h1 {
    margin-bottom: 20px;
  }
  & label {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 20px;
  }
  & input {
    width: 200px;
    margin-right: 10px;
  }

  & .input-wrapper {
    display: flex;
  }

  & .category-list {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
  }
`;