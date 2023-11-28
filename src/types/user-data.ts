export type WrongList = {
  [key: string]: {
    [key: string]: string;
  };
};

export type Score = {
  key?: string;
  date: number;
  score: number;
  sheetName?: string;
  wrongList?: WrongList;
};

export type ScoreList = {
  [key: string]: Score;
};

export type Play = {
  sheetName: string;
  sheetId?: string;
};

export type UserData = {
  scoreList?: ScoreList;
  playList: Play[] | undefined;
  totalStage: number;
  sheetUrl: string;
};
