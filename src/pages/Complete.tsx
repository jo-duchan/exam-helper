import { useRef, useEffect, useState } from "react";
import { RootState } from "store/store";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import html2canvas from "html2canvas";
import Utils from "utils/utils";
import service from "utils/service";
import { showProgress, hideProgress, showToast } from "utils/overlays";
import { Score } from "types/user-data";
import Navigation from "components/common/Navigation";
import CaptureArea from "components/complete/CaptureArea";
import Button from "components/common/Button";
import useModal from "hook/useModal";

function CompletePage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const captureRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { scoreListId } = useParams();
  const [serchParams] = useSearchParams();
  const [data, setData] = useState<Score>({ score: 0, date: 0 });
  const [userName, setUserName] = useState("사용자");
  const [modal, setModal] = useModal({
    title: "문제 풀이가 끝났습니다!",
    content: "회원가입하고 나만의 문제를 \n등록해 풀어보세요!",
    left_button: { onClick: () => setModal(false) },
    right_button: { onClick: () => goToSignUp() },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const data: Score = await service.GET(
          `users/${user.uid}/scoreList/${scoreListId}`
        );
        setData(data);
        setUserName(user.displayName);
        setModal(false);
      } else {
        const score = parseInt(serchParams.get("score") || "0");
        const date = parseInt(serchParams.get("date") || "0");
        setData({ score, date });
        setUserName("사용자");
        setModal(true);
      }
    };

    fetchData();
  }, [user]);

  const goToSignUp = () => {
    setModal(false);
    setTimeout(() => navigate("/signup"), 300);
  };

  const getCanvas = async (fileName: string) => {
    if (!captureRef.current) return;

    try {
      const canvas = await html2canvas(captureRef.current);
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      const file = new File([blob as BlobPart], fileName, {
        type: "image/jpeg",
      });
      const url = canvas.toDataURL("image/jpeg");

      return { file, url };
    } catch {
      showToast("실패 했어요.", "error");
    }
  };

  const shareScore = async () => {
    const fileName = `exam-helper-${Utils.dateFormat(data.date)}-${
      data.score
    }.jpeg`;
    const shareData = (await getCanvas(fileName)) as any;

    try {
      showProgress();
      if (navigator.share ?? false) {
        await navigator.share({
          title: "이그잼 헬퍼와 함께 성장해요!",
          files: [shareData.file],
        });
      } else {
        const link = document.createElement("a");
        document.body.appendChild(link);
        link.href = shareData.url;
        link.download = fileName;
        link.click();
        document.body.removeChild(link);
      }
    } catch {
      showToast("취소 했어요.");
    } finally {
      hideProgress();
    }
  };

  return (
    <Container>
      {modal}
      <Navigation label="완료" />
      <ContentSection>
        <CaptureArea
          ref={captureRef}
          date={data.date}
          score={data.score}
          name={userName}
        />
        <ButtonWrapper>
          <Button label="공유하기" size="L" sort="gray" onClick={shareScore} />
          {user && (
            <Button
              label="오답 확인하기"
              size="L"
              status={data.score === 100 ? "disabled" : "default"}
              onClick={() => navigate(`/wrongAnswerList/${scoreListId}`)}
            />
          )}
        </ButtonWrapper>
      </ContentSection>
    </Container>
  );
}

export default CompletePage;

const Container = styled.div`
  width: 100%;
  min-height: 100%;
`;

const ContentSection = styled.div`
  padding-inline: 25px;
  box-sizing: border-box;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
