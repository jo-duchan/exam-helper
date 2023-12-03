import { RootState } from "store/store";
import { useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Color from "styles/color-system";
import { Heading, Body } from "styles/typography-system";
import service from "utils/service";
import { showToast } from "utils/overlays";
import { Play } from "types/user-data";
import Utils from "utils/utils";
import Navigation from "components/common/Navigation";
import Button from "components/common/Button";
import useModal from "hook/useModal";
import Download from "assets/img/download.png";

function DownloadPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const [serchParams] = useSearchParams();
  const sheetId = serchParams.get("id") || "";
  const sheetName = serchParams.get("name") || "";
  const [modal, setModal] = useModal({
    title: "중복된 시트 이름",
    content: "동일한 시트 이름은 추가할 수 없어요.",
    right_button: { onClick: () => navigate("/") },
  });

  const addPlayList = async () => {
    const playList: Play[] = await service.GET(`users/${user?.uid}/playList`);
    const overlap = playList.find((play) => play.sheetName === sheetName);

    if (overlap) {
      setModal(true);
      return;
    }
    const newPlayList: Play[] = [...playList, { sheetName, sheetId }];

    await service.UPDATE(`users/${user?.uid}`, {
      playList: newPlayList,
    });

    showToast("문제가 추가되었어요.", "sucess");
    navigate("/");
  };

  return (
    <Container>
      {modal}
      <Navigation label="다운로드" left="disabled" />
      <ContentSection>
        <DateTag>{Utils.dateFormat(Date.now())}</DateTag>
        <Visual>
          <img src={Download} alt="다운로드 이미지" />
        </Visual>
        <TextSection>
          <h3>{sheetName}</h3>
          <p>문제를 추가할까요?</p>
        </TextSection>
        <ButtonWrapper>
          <Button label="추가하기" size="L" onClick={addPlayList} />
          <Button
            label="취소하기"
            size="L"
            sort="gray"
            onClick={() => navigate("/")}
          />
        </ButtonWrapper>
      </ContentSection>
    </Container>
  );
}

export default DownloadPage;

const Container = styled.div`
  width: 100%;
  min-height: 100%;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-inline: 25px;
  box-sizing: border-box;
`;

const DateTag = styled.span`
  width: fit-content;
  margin-top: 58px;
  margin-inline: auto;
  margin-bottom: 6px;
  padding: 5px 10px 6px;
  border-radius: 16px;
  background: ${Color.Primary[200]};

  color: ${Color.Primary[700]};
  ${Body.SemiBold.S};
`;

const Visual = styled.div`
  position: relative;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  width: 61.53846%;
  height: 0;
  padding-bottom: 51.282%;
  margin-bottom: 6px;

  & img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const TextSection = styled.div`
  margin-bottom: 50px;
  text-align: center;

  & h3 {
    color: ${Color.Gray[900]};
    ${Heading.H2};
    margin-bottom: 6px;
  }

  & p {
    color: ${Color.Gray[600]};
    ${Body.SemiBold.L};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
