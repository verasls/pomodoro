"use client";

import styled from "styled-components";
import Heading from "./components/Heading";
import Menu from "./components/Menu";
import PomodoroTimer from "./components/PomodoroTimer";
import { PomodoroProvider } from "./context/PomodoroContext";
import Settings from "./components/Settings";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Page() {
  return (
    <Main>
      <Heading as="h1">Pomodoro</Heading>
      <PomodoroProvider>
        <Menu />
        <PomodoroTimer />
        <Settings />
      </PomodoroProvider>
    </Main>
  );
}
