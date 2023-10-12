import Record from "assets/img/record.png";
import Twinkle from "assets/img/twinkle.png";

type InfoDataType = {
  [key: string]: {
    img: string;
    title: string;
    description: string;
    link: string;
    label: string;
  };
};

const InfoData: InfoDataType = {
  stats: {
    img: Record,
    title: "성장기록",
    description: "나의 성장을 확인해 보세요!",
    link: "/stats",
    label: "확인하기",
  },
  signin: {
    img: Twinkle,
    title: "로그인/회원가입",
    description: "여러 기능들을 사용할 수 있어요.",
    link: "/signin",
    label: "로그인",
  },
};

export { InfoData };
