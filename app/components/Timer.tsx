import React from "react";
import styled from "styled-components";
import { Play, RefreshCcw } from "lucide-react";
import { usePomodoro } from "../context/PomodoroContext";

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1/1;
  border-radius: 50%;
  width: 95%;
  max-width: 20rem;
  margin: 1rem 0;
  background-color: var(--primary-color);
  box-shadow: var(--shadow-large);
`;

const CountdownContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;

const Options = styled.div`
  display: flex;
  gap: 1rem;
`;

const Svg = styled.svg`
  transform: rotate(-90deg);
`;

const Circle = styled.circle`
  fill: transparent;
  stroke: var(--accent-color);
  stroke-width: 4px;
  stroke-linecap: round;
  transition:
    stroke-dasharray 1s linear,
    stroke 0.5s ease;
`;

const StyledCountdown = styled.p`
  font-size: 4.8rem;
  font-weight: 700;
`;

type ChildrenProp = {
  children: React.ReactNode;
};

function Timer({ children }: ChildrenProp) {
  return <TimerWrapper>{children}</TimerWrapper>;
}

function ProgressBar() {
  return (
    <Svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g>
        <Circle r="45" cx="50" cy="50" strokeDasharray="283"></Circle>
      </g>
    </Svg>
  );
}

function Countdown({ children }: ChildrenProp) {
  const { state } = usePomodoro();
  const time = state.initialTime;

  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return (
    <CountdownContainer>
      <StyledCountdown>{`${minutes}:${seconds}`}</StyledCountdown>
      {children}
    </CountdownContainer>
  );
}

const StyledButton = styled.button`
  cursor: pointer;
`;

type ButtonProps = {
  type: "play-pause" | "reset";
};

function Button({ type }: ButtonProps) {
  if (type === "play-pause") {
    return (
      <StyledButton>
        <Play size={36} />
      </StyledButton>
    );
  }

  if (type === "reset") {
    return (
      <StyledButton>
        <RefreshCcw size={36} />
      </StyledButton>
    );
  }
}

Timer.ProgressBar = ProgressBar;
Timer.Countdown = Countdown;
Timer.Options = Options;
Timer.Button = Button;

export default Timer;
