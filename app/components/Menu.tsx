import styled from "styled-components";
import MenuButton from "./MenuButton";
import { useState } from "react";

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  background-color: var(--primary-color);
  border-radius: 50px;
  margin: 1.6rem 0;
  padding: 5px;
`;

const menuItems = ["Work", "Short break", "Long break"];

export default function Menu() {
  return (
    <MenuContainer>
      {menuItems.map((item) => (
        <MenuButton key={item}>{item}</MenuButton>
      ))}
    </MenuContainer>
  );
}
