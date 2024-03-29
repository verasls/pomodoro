import React from "react";
import styled, { css } from "styled-components";
import { Phase, usePomodoroContext } from "../context/PomodoroContext";

type ButtonProps = {
  $active: boolean;
};

const Button = styled.button<ButtonProps>`
  background-color: var(--primary-color);
  border-radius: 50px;
  padding: 8px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.5s ease;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--accent-color);
      color: var(--white);
    `}
`;

const phases: Array<Phase> = ["Work", "Short break", "Long break"];

export default function MenuButton() {
  const { state, dispatch } = usePomodoroContext();

  return phases.map((phase) => (
    <Button
      key={phase}
      $active={phase === state.phase}
      onClick={() => dispatch({ type: "changePhase", payload: phase })}
    >
      {phase}
    </Button>
  ));
}
