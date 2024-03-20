import styled from "styled-components";
import SettingsHeader from "./SettingsHeader";
import SettingsTime from "./SettingsTime";
import SettingsNotification from "./SettingsNotifications";

const StyledSettingsModal = styled.div`
  background-color: var(--white);
  width: 28rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

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
      <SettingsNotification />
    </StyledSettingsModal>
  );
}
