import styled from "styled-components";
import { usePomodoro } from "../context/PomodoroContext";
import useLocalStorage from "../hooks/useLocalStorage";
import Heading from "./Heading";
import NotificationsSwitch from "./NotificationSwitch";
import NotificationTooltip from "./NotificationTooltip";

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

  const permitted = storedPermission === "granted" ? true : false;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const isPermitted = event.currentTarget.getAttribute("data-permitted");

    if (isPermitted === "true") {
      const allowNotifications =
        storedNotificationSettings !== null
          ? !storedNotificationSettings
          : null;

      setStoredNotificationSettings(allowNotifications);
      dispatch({
        type: "allowNotifications",
        payload: allowNotifications,
      });
    }
  }

  return (
    <StyledSettingsNotifications>
      <Heading as="h3">Notifications</Heading>

      {permitted ? (
        <NotificationsSwitch
          isChecked={state.allowNotifications ? "checked" : "unchecked"}
          onClick={handleClick}
          permitted={permitted}
        />
      ) : (
        <NotificationTooltip>
          <NotificationsSwitch
            isChecked={state.allowNotifications ? "checked" : "unchecked"}
            onClick={handleClick}
            permitted={permitted}
          />
        </NotificationTooltip>
      )}
    </StyledSettingsNotifications>
  );
}
