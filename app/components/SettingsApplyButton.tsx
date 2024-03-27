import styled from "styled-components";

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

export default function SettingsApplyButton() {
  return (
    <ButtonContainer>
      <Button>Apply</Button>
    </ButtonContainer>
  );
}
