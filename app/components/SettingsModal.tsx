import styled from "styled-components";
import { X } from "lucide-react";
import Heading from "./Heading";

const StyledSettingsModal = styled.div`
  background-color: var(--white);
  width: 90%;
  max-width: 28rem;
`;

const SettingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

type SettingsModalProps = {
  onCloseModal?: () => void;
};

export default function SettingsModal({ onCloseModal }: SettingsModalProps) {
  return (
    <StyledSettingsModal>
      <SettingsHeader>
        <Heading as="h2">Settings</Heading>
        <Button onClick={() => onCloseModal?.()}>
          <X size={20} />
        </Button>
      </SettingsHeader>
    </StyledSettingsModal>
  );
}
