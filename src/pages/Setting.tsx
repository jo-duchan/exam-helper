import { useState, useEffect } from "react";
import { useNavigate, json, useLoaderData, redirect } from "react-router-dom";
import { ref, child, update, get } from "firebase/database";
import { db } from "firebase-config";
import styled from "styled-components";
import Color from "styles/color-system";
import { Heading, Body } from "styles/typography-system";
import { nanoid } from "nanoid";
import Navigation from "components/common/Navigation";
import Input from "components/common/Input";
import Button from "components/common/Button";
import Chip from "components/common/Chip";

interface LoaderData {
  sheetUrl: string;
  sheetName: string[];
  totalStage: string;
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
    sheetName: initSheetNameList,
    totalStage: initTotalStage,
    userKey,
  } = useLoaderData() as LoaderData;

  const [sheetUrl, setSheetUrl] = useState<string>("");
  const [sheetName, setSheetName] = useState<string>("");
  const [sheetNameList, setSheetNameList] = useState<string[]>([]);
  const [totalStage, setTotalStage] = useState<number>(0);

  useEffect(() => {
    // init
    setSheetUrl(initSheetUrl);
    setSheetNameList(initSheetNameList);
    setTotalStage(parseInt(initTotalStage));
  }, []);

  const handleAddSheetNameList = () => {
    if (sheetName) {
      setSheetNameList((prev) => {
        return [...prev, sheetName];
      });
      setSheetName("");
    }
  };

  const HandleRemoveSheetNameList = (index: number) => {
    if (window.confirm("해당 시트 이름을 지우겠습니까?")) {
      setSheetNameList((prev) => {
        const newList = prev.filter((item, idx) => idx !== index);
        return newList;
      });
    }
  };

  const handleSubmit = async () => {
    const updateSheetUrl = sheetUrl;
    const updateSheetName = sheetNameList;
    const updateTotalStage = totalStage;

    console.log(updateSheetUrl, updateSheetName, updateTotalStage);

    return;
    // 유효성 검사 추가하기.
    await update(ref(db, `users/${userKey}`), {
      updateSheetUrl,
      updateSheetName,
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
          <Input
            label="구글 시트 URL"
            placeholder="URL을 입력해 주세요."
            value={sheetUrl}
            onChange={(e) => setSheetUrl(e.currentTarget.value)}
          />
          <SheetNameSectioin>
            <div className="input-wrapper">
              <Input
                label="구글 시트 이름"
                width="calc(100% - 136px)"
                placeholder="시트 이름을 입력해 주세요."
                value={sheetName}
                onChange={(e) => setSheetName(e.currentTarget.value)}
              />
              <Button
                label="완료"
                size="M"
                width="128px"
                onClick={handleAddSheetNameList}
              />
            </div>
            <div className="chip-wrapper">
              {sheetNameList.map((name, index) => (
                <Chip
                  key={nanoid(6)}
                  label={name}
                  onRemove={() => HandleRemoveSheetNameList(index)}
                />
              ))}
            </div>
          </SheetNameSectioin>
        </SettingSection>
        <SettingSection paddingTop={30} paddingBtm={40}>
          <Title>퀴즈 시스템 설정</Title>
          <Input
            label="문제 수"
            placeholder="스테이지를 입력해 주세요."
            type="number"
            value={totalStage}
            onChange={(e) => setTotalStage(parseInt(e.currentTarget.value))}
          />
          <Button label="저장하기" onClick={handleSubmit} />
        </SettingSection>
      </ContentSection>
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
  flex-direction: column;

  & .input-wrapper {
    display: flex;
    gap: 8px;
    align-items: end;
  }

  & .chip-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
  }
`;
