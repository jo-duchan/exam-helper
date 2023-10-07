import Record from "assets/img/record.png";
import Play from "assets/img/play.png";

type InfoDataType = {
  [key: string]: {
    img: string;
    title: string;
    description: string;
    link: string;
  };
};

const InfoData: InfoDataType = {
  stats: {
    img: Record,
    title: "성장기록",
    description: "나의 성장을 확인해 보세요!",
    link: "/stats",
  },
  tutorial: {
    img: Play,
    title: "튜토리얼",
    description: "예시 문제를 같이 풀어볼까요?",
    link: "https://docs.google.com/spreadsheets/d/1IkRnwXpRNg4qTAqJFPwIAf4QGq2VHxG_SV3nWxfY4iQ/edit?usp=sharing",
  },
};

export { InfoData };
