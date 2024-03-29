import React, { useEffect } from "react";
import { Action, Phase, State } from "../context/PomodoroContext";

type UseNotificationArgs = {
  storedPermission: NotificationPermission | null;
  setStoredPermission: (permission: NotificationPermission) => void;
  setStoredNotificationSettings: (allow: boolean | null) => void;
  state: State;
  dispatch: React.Dispatch<Action>;
};

export default function useNotification({
  storedPermission,
  setStoredPermission,
  setStoredNotificationSettings,
  state,
  dispatch,
}: UseNotificationArgs) {
  useEffect(() => {
    async function requestNotificationPermission() {
      const permission = await Notification.requestPermission();
      const allowNotifications = permission === "granted" ? true : false;

      if (storedPermission !== "granted") {
        setStoredPermission(permission);
        setStoredNotificationSettings(allowNotifications);

        dispatch({ type: "setNotificationPermission", payload: permission });
        dispatch({
          type: "allowNotifications",
          payload: allowNotifications,
        });
      }

      if (storedPermission === "granted") {
        setStoredNotificationSettings(allowNotifications);
        dispatch({
          type: "allowNotifications",
          payload: allowNotifications,
        });
      }
    }

    requestNotificationPermission();
  }, [
    storedPermission,
    setStoredPermission,
    setStoredNotificationSettings,
    dispatch,
  ]);

  useEffect(() => {
    const notificationText: Record<Phase, string> = {
      Work: "Hey, it's time to take break",
      "Short break": "Your break is over, time to go back to work!",
      "Long break": "Your break is over, time to go back to work!",
    };

    if (
      state.notificationPermission === "granted" &&
      state.sendNotification &&
      state.allowNotifications
    ) {
      new Notification(notificationText[state.phase]);
      dispatch({ type: "turnNotificationOff" });
    }
  }, [state, dispatch]);
}
