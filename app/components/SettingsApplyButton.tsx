import styled from "styled-components";
import {
  Phase,
  ThemeValues,
  phaseTimes,
  usePomodoroContext,
} from "../context/PomodoroContext";
import { useSettingsContext } from "../context/SettingsContext";
import useLocalStorage from "../hooks/useLocalStorage";

const ButtonContainer = styled.div`
  justify-content: center;
`;

const Button = styled.button`
  background-color: var(--accent-color);
  color: var(--white);
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  padding: 0.4rem 1.8rem;
  border-radius: 40px;
  box-shadow: var(--shadow-small);

  &:hover {
    background-color: #e14a4a;
  }
`;

type SettingsApplyButtonProps = {
  onCloseModal?: () => void;
};

export default function SettingsApplyButton({
  onCloseModal,
}: SettingsApplyButtonProps) {
  const { dispatch } = usePomodoroContext();
  const { settingsState } = useSettingsContext();
  const [_storedTimes, setStoredTimes] = useLocalStorage<Record<Phase, number>>(
    "pomodoroTimes",
    phaseTimes
  );
  const [_storedTheme, setStoredTheme] = useLocalStorage<ThemeValues>(
    "theme",
    "light"
  );
  const [_storedNotificationSettings, setStoredNotificationSettings] =
    useLocalStorage<boolean | null>("allowNotifications", null);

  function applySettings() {
    setStoredTimes(settingsState.phaseTimes);
    setStoredTheme(settingsState.theme);
    setStoredNotificationSettings(settingsState.allowNotifications);

    dispatch({ type: "updateTimes", payload: settingsState.phaseTimes });
    dispatch({ type: "updateTheme", payload: settingsState.theme });
    dispatch({
      type: "allowNotifications",
      payload: settingsState.allowNotifications,
    });

    onCloseModal?.();
  }

  return (
    <ButtonContainer>
      <Button onClick={applySettings}>Apply</Button>
    </ButtonContainer>
  );
}
