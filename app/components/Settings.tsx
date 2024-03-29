import styled from "styled-components";
import { SettingsIcon } from "lucide-react";
import Modal from "./Modal";
import SettingsModal from "./SettingsModal";

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.6rem 0;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    transform: rotate(360deg);
  }
`;

export default function Settings() {
  return (
    <div>
      <Modal>
        <Modal.Open>
          <Button>
            <SettingsIcon size={42} />
          </Button>
        </Modal.Open>
        <Modal.Window>
          <SettingsModal />
        </Modal.Window>
      </Modal>
    </div>
  );
}
