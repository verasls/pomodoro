import React, { createContext, useContext, useReducer } from "react";
import {
  LONG_BREAK_TIME,
  SHORT_BREAK_TIME,
  WORK_TIME,
} from "../utils/constants";

type Phase = "Work" | "Short break" | "Long break";

const phaseTimes: Record<Phase, number> = {
  Work: WORK_TIME,
  "Short break": SHORT_BREAK_TIME,
  "Long break": LONG_BREAK_TIME,
};

type State = {};

function createInitialState(): State {}

type Action = {};

function reducer(state: State, action: Action) {}

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
  const [state, dispatch] = useReducer(reducer, null, createInitialState);

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
