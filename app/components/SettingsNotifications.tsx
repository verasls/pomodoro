import styled from "styled-components";
import Heading from "./Heading";
import { usePomodoro } from "../context/PomodoroContext";
import useLocalStorage from "../hooks/useLocalStorage";
import NotificationsSwitch from "./NotificationSwitch";

const StyledSettingsNotifications = styled.div`
  justify-content: space-between;
`;

export default function SettingsNotification() {
  const { state, dispatch } = usePomodoro();

  const [storedPermission] = useLocalStorage<NotificationPermission | null>(
    "notificationPermission",
    null
  );
  const [storedNotificationSettings, setStoredNotificationSettings] =
    useLocalStorage<boolean | null>("allowNotifications", null);

  const disabled = storedPermission !== "granted" ? true : false;

  function handleClick() {
    const allowNotifications =
      storedNotificationSettings !== null ? !storedNotificationSettings : null;

    setStoredNotificationSettings(allowNotifications);
    dispatch({
      type: "allowNotifications",
      payload: allowNotifications,
    });
  }

  return (
    <StyledSettingsNotifications>
      <Heading as="h3">Notifications</Heading>

      <NotificationsSwitch
        isChecked={state.allowNotifications ? "checked" : "unchecked"}
        onClick={handleClick}
        disabled={disabled}
      />
    </StyledSettingsNotifications>
  );
}
