import { X } from "lucide-react";
import styled from "styled-components";
import Heading from "./Heading";

const StyledHeader = styled.div`
  justify-content: space-between;
  width: 100%;

  & h2 {
    color: var(--gray);
    margin: 0.4rem 0;
  }
`;

const Button = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border-radius: 50%;
  color: var(--gray);

  &:hover {
    background-color: var(--secondary-color);
  }
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
