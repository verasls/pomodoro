import React, { useEffect } from "react";
import { Action, Phase, State } from "../context/PomodoroContext";

type UseNotificationArgs = {
  storedPermission: NotificationPermission | null;
  setStoredPermission: (permission: NotificationPermission) => void;
  state: State;
  dispatch: React.Dispatch<Action>;
};

export default function useNotification({
  storedPermission,
  setStoredPermission,
  state,
  dispatch,
}: UseNotificationArgs) {
  useEffect(() => {
    async function requestNotificationPermission() {
      if (storedPermission !== "granted") {
        const permission = await Notification.requestPermission();
        setStoredPermission(permission);
        dispatch({ type: "setNotificationPermission", payload: permission });
      }
    }

    requestNotificationPermission();
  }, [storedPermission, setStoredPermission, dispatch]);

  useEffect(() => {
    const notificationText: Record<Phase, string> = {
      Work: "Hey, it's time to take break",
      "Short break": "Your break is over, time to go back to work!",
      "Long break": "Your break is over, time to go back to work!",
    };

    if (
      state.notificationPermission === "granted" &&
      !state.isPaused &&
      state.time === 0
    ) {
      new Notification(notificationText[state.phase]);
    }
  }, [state]);
}
