import React, { useEffect, useRef } from "react";
import { useNavigate, useLoaderData, json } from "react-router-dom";
import { ref, child, get } from "firebase/database";
import { db } from "firebase-config";
import styled from "styled-components";
import html2canvas from "html2canvas";
import Color from "styles/color-system";
import { Heading, Body } from "styles/typography-system";
import Utils from "utils/utils";
import Navigation from "components/common/Navigation";
import Button from "components/common/Button";
import High from "assets/img/high-score.png";
import Middle from "assets/img/middle-score.png";
import Low from "assets/img/low-score.png";

const resultAssets = {
  high: {
    img: High,
    text: "축하드려요!",
  },
  middle: {
    img: Middle,
    text: "더 잘할 수 있어요.",
  },
  low: {
    img: Low,
    text: "좀 더 공부가 필요할 것 같아요.",
  },
};

interface LoaderData {
  date: number;
  score: number;
}

function CompletePage() {
  const data = useLoaderData() as LoaderData;
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();
  const captureRef = useRef<HTMLDivElement>(null);

  const scoreResult = (score: number) => {
    if (score >= 80) {
      return "high";
    }

    if (score >= 40 && score < 80) {
      return "middle";
    }

    return "low";
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
      window.alert("캔버스 변환에 실패했습니다.");
    }
  };

  const handleShare = async () => {
    const fileName = `exam-helper-${Utils.dateFormat(data.date)}-${
      data.score
    }.jpeg`;
    const shareData = (await getCanvas(fileName)) as any;

    try {
      if (navigator.share ?? false) {
        await navigator.share({
          title: "함께 성장해요 이그잼 헬퍼!",
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
      window.alert("취소 했습니다.");
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
        <CaptureArea ref={captureRef}>
          <Date>{Utils.dateFormat(data.date)}</Date>
          <Visual>
            <img
              src={resultAssets[scoreResult(data.score)].img}
              alt="점수 결과 이미지"
            />
          </Visual>
          <TextSection>
            <span className="score">
              <span className="point">{data.score}점</span>을 기록했어요!
            </span>
            <span className="message">
              {userName}님 {resultAssets[scoreResult(data.score)].text}
            </span>
          </TextSection>
        </CaptureArea>
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

export async function loader({ params }: { params: any }) {
  const userKey = localStorage.getItem("userKey");
  const scoreListId = params.scoreListId;
  const dbRef = ref(db);
  const data = await get(
    child(dbRef, `users/${userKey}/scoreList/${scoreListId}`)
  )
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
  padding-inline: 25px;
  box-sizing: border-box;
`;

const CaptureArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Date = styled.span`
  margin-top: 40px;
  margin-bottom: 6px;
  padding: 5px 10px 6px;
  border-radius: 16px;
  background: ${Color.Primary[200]};

  color: ${Color.Primary[700]};
  ${Body.SemiBold.S}
`;

const Visual = styled.div`
  position: relative;
  width: 50%;
  height: 0;
  padding-bottom: 50%;
  margin-left: 7.647%;
  margin-bottom: 33px;

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
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
  margin-bottom: 50px;

  & .score {
    color: ${Color.Gray[800]};
    ${Heading.H2};
  }

  & .point {
    color: ${Color.Primary[700]};
  }

  & .message {
    color: ${Color.Gray[600]};
    ${Body.SemiBold.L};
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
