import { useEffect } from "react";
import { State } from "../context/PomodoroContext";

export default function useTitle(state: State) {
  useEffect(() => {
    const minutes = String(Math.floor(state.time / 60)).padStart(2, "0");
    const seconds = String(state.time % 60).padStart(2, "0");
    const time = `${minutes}:${seconds}`;

    const title = "Pomodoro | " + state.phase + ": " + time;
    document.title = title;
  }, [state.phase, state.time]);
}
