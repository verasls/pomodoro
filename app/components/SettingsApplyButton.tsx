import styled from "styled-components";
import {
  Phase,
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

  function applySettings() {
    setStoredTimes(settingsState.phaseTimes);
    dispatch({ type: "updateTimes", payload: settingsState.phaseTimes });

    onCloseModal?.();
  }

  return (
    <ButtonContainer>
      <Button onClick={applySettings}>Apply</Button>
    </ButtonContainer>
  );
}
