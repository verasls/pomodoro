import { useEffect } from "react";
import { Action, Phase } from "../context/PomodoroContext";

type useNotificationArgs = {
  storedTimes: Record<Phase, number>;
  dispatch: React.Dispatch<Action>;
};

export default function useSettings({
  storedTimes,
  dispatch,
}: useNotificationArgs) {
  useEffect(() => {
    dispatch({ type: "updateTimes", payload: storedTimes });
  }, [storedTimes, dispatch]);
}
