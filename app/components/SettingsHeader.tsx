import { X } from "lucide-react";
import styled from "styled-components";
import Heading from "./Heading";

const StyledHeader = styled.div`
  justify-content: space-between;
  width: 100%;

  & h2 {
    margin: 0.4rem 0;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

type SettingsHeaderProps = {
  onCloseModal?: () => void;
};

export default function SettingsHeader({ onCloseModal }: SettingsHeaderProps) {
  return (
    <StyledHeader>
      <Heading as="h2">Settings</Heading>
      <Button onClick={() => onCloseModal?.()}>
        <X size={20} />
      </Button>
    </StyledHeader>
  );
}
