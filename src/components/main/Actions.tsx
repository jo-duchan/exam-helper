import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Utils from "utils/utils";
import { showProgress, hideProgress, showToast } from "utils/overlays";
import { Heading, Body } from "styles/typography-system";
import Color from "styles/color-system";
import { UserData, ScoreList } from "types/user-data";
import { ReactComponent as Arrow } from "assets/icon/arrow.svg";
import { ReactComponent as Share } from "assets/icon/share.svg";
import AddSheetImg from "assets/img/empty.png";

interface Props {
  data: UserData;
  unsigned: boolean;
}

function Actions({ data, unsigned }: Props) {
  const {
    playList,
    sheetUrl,
    scoreList = {} as ScoreList,
    totalStage = 0,
    vibration,
  } = data;
  const navigate = useNavigate();

  const renderScore = (sheetName: string) => {
    const getName = Object.keys(scoreList)
      .reverse()
      .find((item) => scoreList[item].sheetName === sheetName);

    if (getName) {
      return (
        <>
          <span className="score">{scoreList[getName].score}</span>
          <span className="unit">점</span>
        </>
      );
    }

    return <span className="score">000</span>;
  };

  const goToQuizPage = (sheetId: string | undefined, sheetName: string) => {
    const genSheetId = !sheetId ? Utils.convertSheetUrl(sheetUrl) : sheetId;
    const vibrationOption = vibration ? "on" : "off";

    navigate(
      `/quiz?id=${genSheetId}&name=${sheetName}&stage=${totalStage}&vibration=${vibrationOption}`
    );
  };

  const shareItem = async (sheetId: string | undefined, sheetName: string) => {
    const genSheetId = !sheetId ? Utils.convertSheetUrl(sheetUrl) : sheetId;
    const shareUrl = `${window.location.href}download?id=${genSheetId}&name=${sheetName}`;

    try {
      showProgress();
      if (navigator.share ?? false) {
        await navigator.share({
          title: "이그잼 헬퍼와 함께 성장해요!",
          text: `링크를 클릭하시면 문제(${sheetName})를 공유 받을 수 있어요.`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        showToast("링크가 복사 되었어요.", "notify");
      }
    } catch (error) {
      showToast("취소 했어요.");
    } finally {
      hideProgress();
    }
  };

  return (
    <Container>
      {playList?.map((item) => (
        <Item key={item.sheetName}>
          <PlayBtn>
            <ShareSection>
              <span className="tag">최근 점수</span>
              <ShareButton
                onClick={() => shareItem(item.sheetId, item.sheetName)}
              >
                <Share />
              </ShareButton>
            </ShareSection>
            <ScoreSection>{renderScore(item.sheetName)}</ScoreSection>
            <LabelSection
              onClick={() => goToQuizPage(item.sheetId, item.sheetName)}
            >
              <span className="label">{item.sheetName}</span>
              <Arrow fill={Color.Gray[100]} />
            </LabelSection>
          </PlayBtn>
        </Item>
      ))}
      {unsigned || (
        <Item onClick={() => navigate("/setting")}>
          <AddSheetBtn>
            <img src={AddSheetImg} alt="시트 추가" />
            <span className="label">시트 추가</span>
          </AddSheetBtn>
        </Item>
      )}
    </Container>
  );
}

export default Actions;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  margin-bottom: 165px;
`;

const Item = styled.div`
  position: relative;
  width: calc((100% - 16px) / 2);
  height: 0;
  padding-bottom: calc((100% - 16px) / 2);

  & .info {
    white-space: pre-line;
    color: ${Color.Primary[400]};
    ${Body.Medium.M}
  }
`;

const ItemLayout = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
`;

const PlayBtn = styled.div`
  ${ItemLayout};
  display: flex;
  flex-direction: column;
  background: ${Color.Primary[700]};
  color: ${Color.Gray[100]};
`;

const ShareSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 0 16px;
  margin-bottom: 3.0303%;

  & .tag {
    ${Body.SemiBold.XS};
    padding-inline: 8px;
    padding-block: 4px;
    background: ${Color.Primary[500]};
    border-radius: 16px;
    overflow: hidden;
  }
`;

const ShareButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  cursor: pointer;
  user-select: none;

  & svg {
    width: 16px;
    height: 16px;
  }
`;

const ScoreSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  padding-inline: 16px;

  & .score {
    font-family: "Black Ops One";
    font-size: 48px;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -2px;
  }

  & .unit {
    ${Heading.H1};
    margin-top: 6px;
  }
`;

const LabelSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  height: 28.0487%;
  padding: 14px 16px;
  box-sizing: border-box;
  margin-top: auto;
  background: ${Color.Primary[600]};
  cursor: pointer;
  user-select: none;

  & .label {
    ${Body.Bold.M};
  }

  & svg {
    width: 16px;
    height: 16px;
    transform: rotate(180deg);
  }
`;

const AddSheetBtn = styled.div`
  ${ItemLayout};
  border: 2px dashed ${Color.Gray[400]};
  box-sizing: border-box;
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;

  & img {
    width: 48px;
    height: 48px;
    object-fit: cover;
  }

  & .label {
    color: ${Color.Gray[600]};
    ${Body.Medium.M};
  }
`;
