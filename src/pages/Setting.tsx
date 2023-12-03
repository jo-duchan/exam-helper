import { useState, useEffect } from "react";
import { RootState } from "store/store";
import { auth } from "firebase-config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Color from "styles/color-system";
import { Heading, Body } from "styles/typography-system";
import service from "utils/service";
import { showToast } from "utils/overlays";
import { Play, UserData } from "types/user-data";
import Navigation from "components/common/Navigation";
import Input from "components/common/Input";
import SheetName from "components/common/SheetName";
import Button from "components/common/Button";
import ToggleButton from "components/common/ToggleButton";

interface StyledProps {
  paddingTop: number;
  paddingBtm: number;
}

function SettingPage() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [sheetUrl, setSheetUrl] = useState<string>("");
  const [playList, setPlayList] = useState<Play[]>([]);
  const [totalStage, setTotalStage] = useState<number>(0);
  const [vibration, setVibration] = useState<boolean>(true);
  const [sheetUrlValid, setSheetUrlValid] = useState<boolean>(true);
  const [playListValid, setPlayListValid] = useState<boolean>(true);
  const [totalStageValid, setTotalStageValid] = useState<boolean>(true);

  useEffect(() => {
    // init
    const fetchData = async () => {
      const data: UserData = await service.GET(`users/${user?.uid}`);
      setSheetUrl(data.sheetUrl);
      setPlayList(data.playList as Play[]);
      setTotalStage(data.totalStage);
      setVibration(data.vibration);
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    setSheetUrlValid(true);
    setPlayListValid(true);
    setTotalStageValid(true);

    if (sheetUrl.trim() === "") {
      setSheetUrlValid(false);
      return;
    }

    if (!playList.length) {
      setPlayListValid(false);
      return;
    }

    if (totalStage <= 0 || !totalStage) {
      setTotalStageValid(false);
      return;
    }

    await service.UPDATE(`users/${user?.uid}`, {
      sheetUrl,
      playList,
      totalStage,
      vibration,
    });

    showToast("업데이트가 완료되었어요.", "sucess");
    navigate("/");
  };

  const handleSignOut = () => {
    auth.signOut().then(() => navigate("/"));
    showToast("다음에 또 만나요.", "notify");
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
            status={!sheetUrlValid ? "error" : "default"}
            errorMsg="구글 시트 URL을 확인해 주세요."
            value={sheetUrl}
            onChange={(e) => setSheetUrl(e.currentTarget.value)}
          />
          <SheetName
            list={playList}
            setList={setPlayList}
            valid={playListValid}
          />
        </SettingSection>
        <SettingSection paddingTop={30} paddingBtm={40}>
          <Title>퀴즈 시스템 설정</Title>
          <Input
            label="총 문항 수"
            placeholder="총 문항 수를 입력해 주세요. "
            status={!totalStageValid ? "error" : "default"}
            errorMsg="총 문항 수는 1개 이상 설정해 주세요."
            type="number"
            value={totalStage}
            onChange={(e) => setTotalStage(parseInt(e.currentTarget.value))}
          />
          <ToggleWrapper>
            <span>진동 피드백</span>
            <ToggleButton
              checked={vibration}
              onClick={() => setVibration((prev) => !prev)}
            />
          </ToggleWrapper>
          <ButtonWrapper>
            <Button label="저장하기" size="L" onClick={handleSubmit} />
            <SignOutButton onClick={handleSignOut}>로그아웃</SignOutButton>
          </ButtonWrapper>
        </SettingSection>
      </ContentSection>
    </Container>
  );
}

export default SettingPage;

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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 48px;

  & span {
    color: ${Color.Gray[800]};
    ${Body.SemiBold.M};
  }
`;

const SignOutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 56px;
  border-radius: 16px;
  cursor: pointer;
  user-select: none;
  background: ${Color.Gray[300]};
  color: ${Color.Gray[600]};
  ${Body.SemiBold.L};
`;
