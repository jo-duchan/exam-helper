import { useRef } from "react";
import { useNavigate, useLoaderData, Params } from "react-router-dom";
import styled from "styled-components";
import html2canvas from "html2canvas";
import Utils from "utils/utils";
import useOverlay from "hook/useOverlay";
import service from "hook/useService";
import { LoaderProps } from "types/loader-props";
import Navigation from "components/common/Navigation";
import CaptureArea from "components/complete/CaptureArea";
import Button from "components/common/Button";

interface LoaderData {
  date: number;
  score: number;
}

interface CompleteLoaderProps extends LoaderProps {
  params: Params<string>;
}

function CompletePage() {
  const data = useLoaderData() as LoaderData;
  const userName = localStorage.getItem("userName");
  const { showProgress, hideProgress, showToast } = useOverlay();
  const navigate = useNavigate();
  const captureRef = useRef<HTMLDivElement>(null);

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

  const handleShare = async () => {
    const fileName = `exam-helper-${Utils.dateFormat(data.date)}-${
      data.score
    }.jpeg`;
    showProgress();
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
      hideProgress();
    } catch {
      hideProgress();
      showToast("취소 했어요.");
    }
  };

  const handleWrongAnswerList = () => {
    console.log("Go to WrongAnswerList");
    // navigate()
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
          <Button
            label="오답 확인하기"
            size="L"
            onClick={handleWrongAnswerList}
          />
        </ButtonWrapper>
      </ContentSection>
    </Container>
  );
}

export default CompletePage;

export async function loader({
  params,
  showProgress,
  hideProgress,
}: CompleteLoaderProps) {
  const userKey = localStorage.getItem("userKey");
  const scoreListId = params.scoreListId;

  showProgress();
  const data = await service().GET(`users/${userKey}/scoreList/${scoreListId}`);
  hideProgress();

  return data;
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
