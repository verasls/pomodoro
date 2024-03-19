import React, { createContext, useContext, useReducer } from "react";
import {
  LONG_BREAK_TIME,
  SHORT_BREAK_TIME,
  WORK_TIME,
} from "../utils/constants";
import useLocalStorage from "../hooks/useLocalStorage";
import useNotification from "../hooks/useNotification";
import useSettings from "../hooks/useSettings";

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
  phaseTimes: Record<Phase, number>;
  initialTime: number;
  time: number;
  numCycles: number;
  notificationPermission: NotificationPermission | null;
  sendNotification: boolean;
};

type Action =
  | { type: "playTimer" }
  | { type: "pauseTimer" }
  | { type: "resetTimer" }
  | { type: "controlTimer" }
  | { type: "changePhase"; payload: Phase }
  | { type: "updateTimes"; payload: Record<Phase, number> }
  | { type: "setNotificationPermission"; payload: NotificationPermission }
  | { type: "turnNotificationOff" };

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

      if (newTime <= 0)
        return {
          ...state,
          phase: nextPhase,
          isPaused: false,
          initialTime: state.phaseTimes[nextPhase],
          time: state.phaseTimes[nextPhase],
          numCycles:
            currentPhaseIndex === 1
              ? (state.numCycles + 1) % 4
              : state.numCycles,
          sendNotification: true,
        };
      return { ...state, time: newTime };

    case "changePhase":
      return {
        ...state,
        phase: action.payload,
        isPaused: true,
        initialTime: state.phaseTimes[action.payload],
        time: state.phaseTimes[action.payload],
      };

    case "updateTimes":
      return {
        ...state,
        isPaused: true,
        phaseTimes: action.payload,
        initialTime: action.payload[state.phase],
        time: action.payload[state.phase],
      };

    case "setNotificationPermission":
      return { ...state, notificationPermission: action.payload };

    case "turnNotificationOff":
      return { ...state, sendNotification: false };

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
  const [storedTimes] = useLocalStorage<Record<Phase, number>>(
    "pomodoroTimes",
    phaseTimes
  );

  const initialPhase: Phase = "Work";

  const initialPhaseTimes: Record<Phase, number> = {
    Work: 0,
    "Short break": 0,
    "Long break": 0,
  };

  const initialState: State = {
    phase: initialPhase,
    isPaused: true,
    phaseTimes: initialPhaseTimes,
    initialTime: initialPhaseTimes[initialPhase],
    time: initialPhaseTimes[initialPhase],
    numCycles: 0,
    notificationPermission: storedPermission,
    sendNotification: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  useNotification({ storedPermission, setStoredPermission, state, dispatch });
  useSettings({ storedTimes, dispatch });

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
