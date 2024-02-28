"use client";

import styled from "styled-components";
import Heading from "./components/Heading";

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
    </Main>
  );
}
