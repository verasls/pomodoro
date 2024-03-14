import React, { createContext, useContext, useReducer } from "react";
import {
  LONG_BREAK_TIME,
  SHORT_BREAK_TIME,
  WORK_TIME,
} from "../utils/constants";
import useLocalStorage from "../hooks/useLocalStorage";
import useNotification from "../hooks/useNotification";

type Phase = "Work" | "Short break" | "Long break";
const phases: Array<Phase> = ["Work", "Short break", "Long break"];

const phaseTimes: Record<Phase, number> = {
  Work: WORK_TIME,
  "Short break": SHORT_BREAK_TIME,
  "Long break": LONG_BREAK_TIME,
};

type State = {
  phase: Phase;
  isPaused: boolean;
  initialTime: number;
  time: number;
  numCycles: number;
  notificationPermission: NotificationPermission | null;
};

type Action =
  | { type: "playTimer" }
  | { type: "pauseTimer" }
  | { type: "resetTimer" }
  | { type: "controlTimer" }
  | { type: "changePhase"; payload: Phase }
  | { type: "setNotificationPermission"; payload: NotificationPermission };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "playTimer":
      return { ...state, isPaused: false };

    case "pauseTimer":
      return { ...state, isPaused: true };

    case "resetTimer":
      return { ...state, isPaused: true, time: state.initialTime };

    case "controlTimer":
      const currentPhaseIndex = phases.indexOf(state.phase);
      let nextPhaseIndex = currentPhaseIndex < 2 ? currentPhaseIndex + 1 : 0;
      if (currentPhaseIndex === 1 && state.numCycles < 3) nextPhaseIndex = 0;
      const nextPhase = phases.at(nextPhaseIndex)!;
      const newTime = state.time - 1;

      if (newTime < 0)
        return {
          ...state,
          phase: nextPhase,
          isPaused: false,
          initialTime: phaseTimes[nextPhase],
          time: phaseTimes[nextPhase],
          numCycles:
            currentPhaseIndex === 1
              ? (state.numCycles + 1) % 4
              : state.numCycles,
        };
      return { ...state, time: newTime };

    case "changePhase":
      return {
        ...state,
        phase: action.payload,
        isPaused: true,
        initialTime: phaseTimes[action.payload],
        time: phaseTimes[action.payload],
      };

    case "setNotificationPermission":
      return { ...state, notificationPermission: action.payload };

    default:
      throw new Error("Unknown action");
  }
}

type PomodoroContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const PomodoroContext = createContext<PomodoroContextType | undefined>(
  undefined
);

type PomodoroProviderProps = {
  children: React.ReactNode;
};

function PomodoroProvider({ children }: PomodoroProviderProps) {
  const [storedPermission, setStoredPermission] =
    useLocalStorage<NotificationPermission | null>(
      "notificationPermission",
      null
    );

  const initialState: State = {
    phase: "Work",
    isPaused: true,
    initialTime: phaseTimes["Work"],
    time: phaseTimes["Work"],
    numCycles: 0,
    notificationPermission: storedPermission,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  useNotification({ storedPermission, setStoredPermission, state, dispatch });

  return (
    <PomodoroContext.Provider value={{ state, dispatch }}>
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
export type { State, Action, Phase };
