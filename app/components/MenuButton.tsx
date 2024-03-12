import React from "react";
import styled, { css } from "styled-components";
import { usePomodoro } from "../context/PomodoroContext";

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

type Phase = "Work" | "Short break" | "Long break";
const options: Array<Phase> = ["Work", "Short break", "Long break"];

export default function MenuButton() {
  const { phaseTimes, phase, setPhase, setInitialTime } = usePomodoro();

  function handleClick(value: Phase) {
    setPhase(value);
    setInitialTime(phaseTimes[value]);
  }

  return options.map((option) => (
    <Button
      key={option}
      onClick={() => handleClick(option)}
      $active={option === phase}
    >
      {option}
    </Button>
  ));
}
