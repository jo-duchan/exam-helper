import { useContext } from "react";
import { ScoreValue, ScoreAction } from "storage/ScoreContext";

function Value() {
  const value = useContext(ScoreValue);

  if (value === undefined) {
    throw new Error("ScoreAuth.Value should be used within ScoreContext");
  }
  return value;
}

function Action() {
  const action = useContext(ScoreAction);

  if (action === undefined) {
    throw new Error("useScore.Action() should be used within ScoreContext");
  }
  return action;
}

const useScore = { Value, Action };

export default useScore;
