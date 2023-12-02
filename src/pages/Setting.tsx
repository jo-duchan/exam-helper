import { useState, useEffect } from "react";
import { RootState } from "store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Color from "styles/color-system";
import { Heading } from "styles/typography-system";
import service from "utils/service";
import { showToast } from "utils/overlays";
import { Play, UserData } from "types/user-data";
import Navigation from "components/common/Navigation";
import Input from "components/common/Input";
import SheetName from "components/common/SheetName";
import Button from "components/common/Button";

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
    });

    showToast("업데이트가 완료되었어요.", "sucess");
    navigate("/");
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
          <Button label="저장하기" size="L" onClick={handleSubmit} />
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
