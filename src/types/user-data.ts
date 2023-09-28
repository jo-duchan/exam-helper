export type WrongList = {
  [key: string]: {
    [key: string]: string;
  };
};

export type ScoreList = {
  [key: string]: {
    date: number;
    score: number;
    sheetName: string;
    wrongList: WrongList;
  };
};

export type User = {
  crated: number;
  email: string;
  name: string;
  scoreList?: ScoreList;
  sheetNameList: string[] | undefined;
  totalStage: number;
  sheetUrl: string;
  userKey: string;
};
