import styled from "styled-components";
import * as Switch from "@radix-ui/react-switch";
import Heading from "./Heading";
import { usePomodoro } from "../context/PomodoroContext";
import useLocalStorage from "../hooks/useLocalStorage";

const StyledSettingsNotifications = styled.div`
  justify-content: space-between;
`;

const SwitchRoot = styled(Switch.Root)`
  all: unset;
  width: 42px;
  height: 28px;
  background-color: var(--gray);
  border-radius: 9999px;
  position: relative;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &[data-state="checked"] {
    background-color: var(--accent-color);
  }
`;

const SwitchThumb = styled(Switch.Thumb)`
  display: block;
  width: 21px;
  height: 21px;
  background-color: white;
  border-radius: 9999px;
  transition: transform 100ms;
  transform: translateX(4px);
  will-change: transform;

  &[data-state="checked"] {
    transform: translateX(17px);
  }
`;

export default function SettingsNotification() {
  const { state, dispatch } = usePomodoro();
  const [storedNotificationSettings, setStoredNotificationSettings] =
    useLocalStorage<boolean | null>("allowNotifications", null);

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

      <SwitchRoot
        data-state={state.allowNotifications ? "checked" : "unchecked"}
        onClick={handleClick}
      >
        <SwitchThumb />
      </SwitchRoot>
    </StyledSettingsNotifications>
  );
}
