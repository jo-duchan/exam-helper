import React, { useState, useRef, useEffect } from "react";
import { useNavigate, json, useLoaderData, redirect } from "react-router-dom";
import { ref, child, update, get } from "firebase/database";
import { db } from "firebase-config";
import styled from "styled-components";
import Color from "styles/color-system";
import { Heading, Body } from "styles/typography-system";
import { nanoid } from "nanoid";
import Utils from "utils/utils";
import { User } from "types/user-data";
import Navigation from "components/common/Navigation";
import Input from "components/common/Input";
import Button from "components/common/Button";

interface LoaderData {
  sheetUrl: string;
  sheetName: string[];
  userKey: string;
}

interface StyledProps {
  paddingTop: number;
  paddingBtm: number;
}

function SettingPage() {
  const navigate = useNavigate();
  const {
    sheetUrl: initSheetUrl,
    sheetName: initSheetName,
    userKey,
  } = useLoaderData() as LoaderData;

  const sheetUrlRef = useRef<HTMLInputElement>(null);
  const sheetNameRef = useRef<HTMLInputElement>(null);
  const [sheetNameList, setSheetNameList] = useState<string[]>([]);

  useEffect(() => {
    if (!sheetUrlRef.current) return; //임시
    //init
    if (initSheetUrl) {
      console.log("init SheetUrl");
      sheetUrlRef.current.value = initSheetUrl as string;
    }

    if (initSheetName.length > 0) {
      console.log("init SheetName");
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
      })
      .catch((e) => {
        window.alert("업데이트에 실패했습니다.");
        console.log(e);
      });
  };

  return (
    <Container>
      <Navigation label="설정" />
      <ContentSection>
        <SettingSection paddingTop={40} paddingBtm={30}>
          <Title>구글 시트 설정</Title>
          <Input label="구글 시트 URL" onChange={() => console.log("")} />
          <SheetNameSectioin>
            <div className="input-wrapper">
              <Input
                label="구글 시트 URL"
                width="calc(100% - 136px)"
                onChange={() => console.log("")}
              />
              <Button
                label="완료"
                size="M"
                width="128px"
                onClick={() => console.log("")}
              />
            </div>
            <div className="chip-wrapper"></div>
          </SheetNameSectioin>
        </SettingSection>
        <SettingSection paddingTop={30} paddingBtm={40}>
          <Title>퀴즈 시스템 설정</Title>
          <Input label="전체 스테이지" onChange={() => console.log("")} />
          <Button label="저장하기" onClick={() => console.log("")} />
        </SettingSection>
      </ContentSection>
      {/* <h1>SettingPage</h1>
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
      </button> */}
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
  width: 100%;
  min-height: 100%;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: ${Color.Gray[200]};
`;

const SettingSection = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-inline: 25px;
  padding-top: ${({ paddingTop }) => `${paddingTop}px`};
  padding-bottom: ${({ paddingBtm }) => `${paddingBtm}px`};
  box-sizing: border-box;
  background: ${Color.Gray[100]};
`;

const Title = styled.h2`
  color: ${Color.Gray[800]};
  ${Heading.H2};
`;

const SheetNameSectioin = styled.div`
  display: flex;

  & .input-wrapper {
    display: flex;
    gap: 8px;
    align-items: end;
  }
`;
