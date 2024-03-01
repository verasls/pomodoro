import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: var(--primary-color);
  border-radius: 50px;
  padding: 8px;
  font-size: 0.8rem;
  font-weight: 500;

  &.selected {
    background-color: var(--accent-color);
    color: var(--white);
  }
`;

type MenuButtonProps = {
  children: React.ReactNode;
};

export default function MenuButton({ children }: MenuButtonProps) {
  return <Button>{children}</Button>;
}
