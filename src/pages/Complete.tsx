import { useRef, useEffect } from "react";
import { useNavigate, useLoaderData, Params } from "react-router-dom";
import styled from "styled-components";
import html2canvas from "html2canvas";
import Utils from "utils/utils";
import service from "utils/service";
import { LoaderArgs } from "types/loader-props";
import { Score } from "types/user-data";
import Navigation from "components/common/Navigation";
import CaptureArea from "components/complete/CaptureArea";
import Button from "components/common/Button";
import Modal from "components/overlays/Modal";

interface LoaderData {
  data: Score;
  scoreListId?: string;
  userKey?: string;
}

function CompletePage() {
  const { data, scoreListId, userKey } = useLoaderData() as LoaderData;
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();
  const captureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userKey) {
      // const id = handleShow(
      //   <Modal
      //     title={"문제 풀이가 끝났습니다!"}
      //     content={"회원가입하고 나만의 문제를 \n등록해 풀어보세요!"}
      //     actionL={{ label: "닫기", onClick: () => handleHide(id) }}
      //     actionR={{ label: "확인", onClick: () => handleGotoSignUp() }}
      //   />,
      //   "POPUP"
      // );
      // const handleGotoSignUp = () => {
      //   handleHide(id);
      //   setTimeout(() => navigate("/signup"), 300);
      // };
    }
  }, []);

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
      // showToast("실패 했어요.", "error");
    }
  };

  const handleShare = async () => {
    const fileName = `exam-helper-${Utils.dateFormat(data.date)}-${
      data.score
    }.jpeg`;
    // showProgress();
    const shareData = (await getCanvas(fileName)) as any;

    try {
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
      // hideProgress();
    } catch {
      // hideProgress();
      // showToast("취소 했어요.");
    }
  };

  return (
    <Container>
      <Navigation label="완료" />
      <ContentSection>
        <CaptureArea
          ref={captureRef}
          date={data.date}
          score={data.score}
          name={userName!}
        />
        <ButtonWrapper>
          <Button label="공유하기" size="L" sort="gray" onClick={handleShare} />
          {userKey && (
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

export async function loader({ request, params }: LoaderArgs) {
  const userKey = localStorage.getItem("userKey");
  const scoreListId = params.scoreListId;

  if (!userKey) {
    const score = parseInt(
      new URL(request.url).searchParams.get("score") || ""
    );
    const date = parseInt(new URL(request.url).searchParams.get("date") || "");
    const data = { score, date };

    return { data, userKey };
  }

  const data = await service.GET(`users/${userKey}/scoreList/${scoreListId}`);

  return { data, scoreListId, userKey };
}

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
