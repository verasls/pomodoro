import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import {
  LONG_BREAK_TIME,
  SHORT_BREAK_TIME,
  WORK_TIME,
} from "../utils/constants";

type Phase = "Work" | "Short break" | "Long break";

type PomodoroContextValue = {
  phaseTimes: {
    Work: number;
    "Short break": number;
    "Long break": number;
  };
  phase: Phase;
  setPhase: Dispatch<SetStateAction<Phase>>;
  numCycles: number;
  setNumCycles: Dispatch<SetStateAction<number>>;
  initialTime: number;
  setInitialTime: Dispatch<SetStateAction<number>>;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  isPaused: boolean;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
};

const PomodoroContext = createContext<PomodoroContextValue | undefined>(
  undefined
);

type PomodoroProviderProps = {
  children: React.ReactNode;
};

function PomodoroProvider({ children }: PomodoroProviderProps) {
  const phaseTimes = {
    Work: WORK_TIME,
    "Short break": SHORT_BREAK_TIME,
    "Long break": LONG_BREAK_TIME,
  };
  const [phase, setPhase] = useState<Phase>("Work");
  const [numCycles, setNumCycles] = useState(0);
  const [initialTime, setInitialTime] = useState(phaseTimes[phase]);
  const [time, setTime] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(true);

  return (
    <PomodoroContext.Provider
      value={{
        phaseTimes,
        phase,
        setPhase,
        numCycles,
        setNumCycles,
        initialTime,
        setInitialTime,
        time,
        setTime,
        isPaused,
        setIsPaused,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}

function usePomodoro() {
  const context = useContext(PomodoroContext);
  if (context === undefined)
    throw new Error(
      "PomodoroContext cannot be used outside the PomodoroProvider"
    );
  return context;
}

export { PomodoroProvider, usePomodoro };
