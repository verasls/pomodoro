import styled from "styled-components";
import SettingsHeader from "./SettingsHeader";
import SettingsTime from "./SettingsTime";

const StyledSettingsModal = styled.div`
  background-color: var(--white);
  width: 28rem;

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
    </StyledSettingsModal>
  );
}
