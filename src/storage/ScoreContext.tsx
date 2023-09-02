import {
  ReactNode,
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface Props {
  children: ReactNode;
}

type ActionType = Dispatch<SetStateAction<number>> | undefined;

const defaultValue = 0;

export const ScoreValue = createContext<number | undefined>(undefined);
export const ScoreAction = createContext<ActionType>(undefined);

function ScoreContext({ children }: Props) {
  const [scoreValue, setScoreValue] = useState<number>(defaultValue);

  return (
    <ScoreAction.Provider value={setScoreValue}>
      <ScoreValue.Provider value={scoreValue}>{children}</ScoreValue.Provider>
    </ScoreAction.Provider>
  );
}

export default ScoreContext;
