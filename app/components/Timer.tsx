import React, { createContext, useContext } from "react";
import styled from "styled-components";
import useTimer from "../hooks/useTimer";

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1/1;
  border-radius: 50%;
  width: 95%;
  max-width: 20rem;
  background-color: var(--primary-color);
  box-shadow: var(--shadow);
`;

const TimerContainer = styled.div`
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
  stroke-dasharray: 283;
  stroke-linecap: round;
`;

const StyledCountdown = styled.p`
  font-size: 4.8rem;
  font-weight: 700;
`;

type TimerContextValue = {
  time: number;
};

const TimerContext = createContext<TimerContextValue | undefined>(undefined);

function useTimerContext() {
  const context = useContext(TimerContext);
  if (context === undefined)
    throw new Error("TimerContext cannot be used outside the Timer component");
  return context;
}

type ChildrenProp = {
  children: React.ReactNode;
};

function Timer({ children }: ChildrenProp) {
  const time = useTimer(10);

  return (
    <TimerContext.Provider value={{ time }}>{children}</TimerContext.Provider>
  );
}

function Display({ children }: ChildrenProp) {
  return <TimerWrapper>{children}</TimerWrapper>;
}

function ProgressBar() {
  return (
    <Svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g>
        <Circle r="45" cx="50" cy="50"></Circle>
      </g>
    </Svg>
  );
}

function Countdown({ children }: ChildrenProp) {
  const { time } = useTimerContext();

  return (
    <TimerContainer>
      <StyledCountdown>{time}</StyledCountdown>
      {children}
    </TimerContainer>
  );
}

function Button({ children }: ChildrenProp) {
  return <button>{children}</button>;
}

Timer.Display = Display;
Timer.ProgressBar = ProgressBar;
Timer.Countdown = Countdown;
Timer.Options = Options;
Timer.Button = Button;

export default Timer;
