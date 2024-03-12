import { useCallback, useEffect, useMemo, useRef } from "react";
import { usePomodoro } from "../context/PomodoroContext";

export default function useTimer() {
  const {
    phaseTimes,
    phase,
    setPhase,
    numCycles,
    setNumCycles,
    time,
    setTime,
    initialTime,
    setInitialTime,
    isPaused,
    setIsPaused,
  } = usePomodoro();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  type Phase = "Work" | "Short break" | "Long break";
  const phases = useMemo<Array<Phase>>(
    () => ["Work", "Short break", "Long break"],
    []
  );

  const changePhase = useCallback(() => {
    const currentPhaseIndex = phases.indexOf(phase);
    let nextPhaseIndex = currentPhaseIndex < 2 ? currentPhaseIndex + 1 : 0;

    if (currentPhaseIndex === 1 && numCycles < 3) {
      setNumCycles((cycles) => cycles + 1);
      nextPhaseIndex = 0;
    }
    if (currentPhaseIndex === 2) setNumCycles(0);

    const nextPhase = phases.at(nextPhaseIndex)!;

    setPhase(nextPhase);
    setInitialTime(phaseTimes[nextPhase]);
  }, [
    phase,
    phaseTimes,
    phases,
    setInitialTime,
    setPhase,
    numCycles,
    setNumCycles,
  ]);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setTime((time) => {
          if (time === 0) {
            clearInterval(timerRef.current!);
            changePhase();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, setTime, changePhase]);

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
