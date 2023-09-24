import {
  ReactNode,
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type ValueType = {
  date: number;
  score: number;
};

interface Props {
  children: ReactNode;
}

type ActionType = Dispatch<SetStateAction<ValueType>> | undefined;

const defaultValue = {
  date: 0,
  score: 0,
};

export const ScoreValue = createContext<ValueType | undefined>(undefined);
export const ScoreAction = createContext<ActionType>(undefined);

function ScoreContext({ children }: Props) {
  const [scoreValue, setScoreValue] = useState<ValueType>(defaultValue);

  return (
    <ScoreAction.Provider value={setScoreValue}>
      <ScoreValue.Provider value={scoreValue}>{children}</ScoreValue.Provider>
    </ScoreAction.Provider>
  );
}

export default ScoreContext;
