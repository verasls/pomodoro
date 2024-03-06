import { useEffect, useRef, useState } from "react";

export default function useTimer(initialTime: number) {
  const [time, setTime] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(true);
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
  }, [isPaused]);

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

  return { time, isPaused, play, pause, reset };
}
