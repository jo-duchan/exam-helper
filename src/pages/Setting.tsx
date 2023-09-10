import React, { useState, useRef, useEffect } from "react";
import { useNavigate, json, useLoaderData, redirect } from "react-router-dom";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { ref, child, update, get } from "firebase/database";
import { db } from "firebase-config";
import Utils from "utils/utils";

function SettingPage() {
  const navigate = useNavigate();
  const {
    sheetUrl: initSheetUrl,
    sheetName: initSheetName,
    userKey,
  } = useLoaderData() as {
    [key: string]: string | string[];
  };

  const sheetUrlRef = useRef<HTMLInputElement>(null);
  const sheetNameRef = useRef<HTMLInputElement>(null);
  const [sheetNameList, setSheetNameList] = useState<string[]>([]);

  useEffect(() => {
    //init

    if (initSheetUrl && initSheetName.length) {
      console.log("init");
      sheetUrlRef.current!.value = initSheetUrl as string;
      setSheetNameList(() => {
        return [...(initSheetName as string[])];
      });
    }
  }, [initSheetUrl, initSheetName]);

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
    Utils.longPress.cancel();
  };

  const handleSubmit = async () => {
    // const userKey = localStorage.getItem("userKey");
    const sheetUrl = sheetUrlRef.current?.value;
    const sheetName = sheetNameList;

    // 유효성 검사 추가하기.

    // navigate("/");
    // Update 작업 중
    // await set(ref(db, "users/"), {
    //   dawilawdilawd: {
    //     username: "dudu22",
    //     email: "joduchan@naver.com22",
    //   },
    // });
    await update(ref(db, `users/${userKey}`), {
      sheetUrl,
      sheetName,
    })
      .then(() => {
        window.alert("업데이트가 완료되었습니다.");
        navigate("/");
        // return redirect("/");
      })
      .catch((e) => {
        window.alert("업데이트에 실패했습니다.");
        console.log(e);
      });
  };

  return (
    <Container>
      <h1>SettingPage</h1>
      <label>
        Google Sheets URL
        <div className="input-wrapper">
          <input type="text" ref={sheetUrlRef} />
        </div>
      </label>
      <label>
        SheetName
        <div className="input-wrapper">
          <input type="text" ref={sheetNameRef} />
          <button type="button" onClick={handleAddSheetName}>
            Done
          </button>
        </div>
      </label>
      <div className="category-list">
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
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </Container>
  );
}

export default SettingPage;

export async function loader() {
  const userKey = localStorage.getItem("userKey");
  const dbRef = ref(db);
  const data = await get(child(dbRef, `users/${userKey}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        return snapshot.val();
      } else {
        throw json({ message: "No data available" }, { status: 500 });
      }
    })
    .catch((error) => {
      throw json({ message: error }, { status: 500 });
    });
  return data;
}

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
