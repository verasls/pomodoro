import styled from "styled-components";
import SettingsHeader from "./SettingsHeader";
import SettingsTime from "./SettingsTime";
import SettingsNotification from "./SettingsNotifications";
import SettingsTheme from "./SettingsTheme";

const StyledSettingsModal = styled.div`
  background-color: var(--white);
  width: 28rem;
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
      <SettingsHeader onCloseModal={onCloseModal} />
      <SettingsTime />
      <SettingsTheme />
      <SettingsNotification />
    </StyledSettingsModal>
  );
}
