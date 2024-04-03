import styled from "styled-components";
import { useSettingsContext } from "../context/SettingsContext";
import useLocalStorage from "../hooks/useLocalStorage";
import Heading from "./Heading";
import NotificationsSwitch from "./NotificationSwitch";
import NotificationTooltip from "./NotificationTooltip";

const StyledSettingsNotifications = styled.div`
  justify-content: space-between;

  @media (max-width: 630px) {
    flex-direction: column;
  }
`;

export default function SettingsNotification() {
  const { settingsState, settingsDispatch } = useSettingsContext();

  const [storedPermission] = useLocalStorage<NotificationPermission | null>(
    "notificationPermission",
    null
  );

  const permitted = storedPermission === "granted" ? true : false;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const isPermitted = event.currentTarget.getAttribute("data-permitted");

    if (isPermitted === "true") {
      const allowNotifications =
        settingsState.allowNotifications !== null
          ? !settingsState.allowNotifications
          : null;

      settingsDispatch({
        type: "updateNotification",
        payload: allowNotifications,
      });
    }
  }

  return (
    <StyledSettingsNotifications>
      <Heading as="h3">Notifications</Heading>

      {permitted ? (
        <NotificationsSwitch
          isChecked={settingsState.allowNotifications ? "checked" : "unchecked"}
          onClick={handleClick}
          permitted={permitted}
        />
      ) : (
        <NotificationTooltip>
          <NotificationsSwitch
            isChecked={
              settingsState.allowNotifications ? "checked" : "unchecked"
            }
            onClick={handleClick}
            permitted={permitted}
          />
        </NotificationTooltip>
      )}
    </StyledSettingsNotifications>
  );
}
