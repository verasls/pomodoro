import styled from "styled-components";
import { SettingsProvider } from "../context/SettingsContext";
import SettingsHeader from "./SettingsHeader";
import SettingsTime from "./SettingsTime";
import SettingsNotification from "./SettingsNotifications";
import SettingsTheme from "./SettingsTheme";
import SettingsApplyButton from "./SettingsApplyButton";

const StyledSettingsModal = styled.div`
  background-color: var(--white);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & div {
    display: flex;
    align-items: center;
  }
`;

type SettingsModalProps = {
  onCloseModal?: () => void;
};

export default function SettingsModal({ onCloseModal }: SettingsModalProps) {
  return (
    <StyledSettingsModal>
      <SettingsProvider>
        <SettingsHeader onCloseModal={onCloseModal} />
        <SettingsTime />
        <SettingsTheme />
        <SettingsNotification />
        <SettingsApplyButton onCloseModal={onCloseModal} />
      </SettingsProvider>
    </StyledSettingsModal>
  );
}
