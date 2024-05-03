import React, { createContext, useContext, useReducer } from "react";
import { Phase, ThemeValues, usePomodoroContext } from "./PomodoroContext";

type SettingsState = {
  phaseTimes: Record<Phase, number>;
  theme: "default" | "light" | "dark";
  allowNotifications: boolean | null;
};

type SettingsAction =
  | { type: "updateTimes"; payload: Record<Phase, number> }
  | { type: "updateNotification"; payload: boolean | null }
  | { type: "updateTheme"; payload: ThemeValues }
  | { type: "applySettings" };

function reducer(state: SettingsState, action: SettingsAction) {
  switch (action.type) {
    case "updateTimes":
      return { ...state, phaseTimes: action.payload };

    case "updateNotification": {
      return { ...state, allowNotifications: action.payload };
    }

    case "updateTheme": {
      return { ...state, theme: action.payload };
    }

    default:
      throw new Error("Unknown action");
  }
}

type SettingsContextType = {
  settingsState: SettingsState;
  settingsDispatch: React.Dispatch<SettingsAction>;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

type SettingsProviderProps = {
  children: React.ReactNode;
};

function SettingsProvider({ children }: SettingsProviderProps) {
  const { state } = usePomodoroContext();

  const initialSettingsState: SettingsState = {
    phaseTimes: state.phaseTimes,
    theme: state.theme,
    allowNotifications: state.allowNotifications,
  };

  const [settingsState, settingsDispatch] = useReducer(
    reducer,
    initialSettingsState
  );

  return (
    <SettingsContext.Provider value={{ settingsState, settingsDispatch }}>
      {children}
    </SettingsContext.Provider>
  );
}

function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (context === undefined)
    throw new Error(
      "SettingsContext cannot be used outside the SettingsProvider"
    );
  return context;
}

export { SettingsProvider, useSettingsContext };
