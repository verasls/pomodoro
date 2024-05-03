import styled from "styled-components";
import MenuButton from "./MenuButton";

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  background-color: var(--primary-color);
  border-radius: 50px;
  box-shadow: var(--shadow-small);
  margin: 1.6rem 0;
  padding: 5px;
  z-index: 5;
`;

export default function Menu() {
  return (
    <MenuContainer>
      <MenuButton />
    </MenuContainer>
  );
}
