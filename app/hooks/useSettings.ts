import { useEffect } from "react";
import { Action, Phase, State } from "../context/PomodoroContext";

type useSettingsArgs = {
  storedTimes: Record<Phase, number>;
  state: State;
  dispatch: React.Dispatch<Action>;
};

export default function useSettings({
  storedTimes,
  state,
  dispatch,
}: useSettingsArgs) {
  useEffect(() => {
    dispatch({ type: "updateTimes", payload: storedTimes });
  }, [storedTimes, dispatch]);

  useEffect(() => {
    if (state.theme === "light") {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }
    if (state.theme === "dark") {
      document.documentElement.classList.remove("light-mode");
      document.documentElement.classList.add("dark-mode");
    }
  }, [state.theme]);
}
