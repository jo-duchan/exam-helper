export interface WrongList {
  [key: string]: {
    [key: string]: string;
  };
}

export interface Score {
  order?: number;
  key?: string;
  date: number;
  score: number;
  sheetName?: string;
  wrongList?: WrongList;
}

export interface ScoreList {
  [key: string]: Score;
}

export interface Play {
  sheetName: string;
  sheetId?: string;
}

export interface UserData {
  scoreList?: ScoreList;
  playList: Play[] | undefined;
  totalStage: number;
  vibration: boolean;
  sheetUrl: string;
}
