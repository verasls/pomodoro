import { useEffect, useRef } from "react";
import { usePomodoro } from "../context/PomodoroContext";

export default function useTimer() {
  const { time, setTime, initialTime, isPaused, setIsPaused } = usePomodoro();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setTime((time) => {
          if (time === 0) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, setTime]);

  function play() {
    setIsPaused(false);
  }

  function pause() {
    setIsPaused(true);
    if (timerRef.current) clearInterval(timerRef.current);
  }

  function reset() {
    pause();
    setTime(initialTime);
  }

  return { initialTime, time, setTime, isPaused, play, pause, reset };
}
