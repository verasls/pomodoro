import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
} from "react";
import styled from "styled-components";
import { Pause, Play, RefreshCcw } from "lucide-react";
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
  stroke-linecap: round;
  transition:
    stroke-dasharray 1s linear,
    stroke 0.5s ease;
`;

const StyledCountdown = styled.p`
  font-size: 4.8rem;
  font-weight: 700;
`;

type TimerContextValue = {
  initialTime: number;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  isPaused: boolean;
  play: () => void;
  pause: () => void;
  reset: () => void;
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
  const { initialTime, time, setTime, isPaused, play, pause, reset } =
    useTimer();

  return (
    <TimerContext.Provider
      value={{ initialTime, time, setTime, isPaused, play, pause, reset }}
    >
      {children}
    </TimerContext.Provider>
  );
}

function Display({ children }: ChildrenProp) {
  return <TimerWrapper>{children}</TimerWrapper>;
}

function ProgressBar() {
  const { time, initialTime } = useTimerContext();

  return (
    <Svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g>
        <Circle
          r="45"
          cx="50"
          cy="50"
          strokeDasharray={`${(time / initialTime) * 283}, 283`}
        ></Circle>
      </g>
    </Svg>
  );
}

function Countdown({ children }: ChildrenProp) {
  const { initialTime, time, setTime } = useTimerContext();

  useEffect(() => {
    setTime(initialTime);
  }, [initialTime, setTime]);

  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return (
    <TimerContainer>
      <StyledCountdown>{`${minutes}:${seconds}`}</StyledCountdown>
      {children}
    </TimerContainer>
  );
}

const StyledButton = styled.button`
  cursor: pointer;
`;

type ButtonProps = {
  type: "play-pause" | "reset";
};

function Button({ type }: ButtonProps) {
  const { isPaused, play, pause, reset } = useTimerContext();

  if (type === "play-pause") {
    return (
      <StyledButton onClick={isPaused ? () => play() : () => pause()}>
        {isPaused ? <Play size={36} /> : <Pause size={36} />}
      </StyledButton>
    );
  }

  if (type === "reset") {
    return (
      <StyledButton onClick={() => reset()}>
        <RefreshCcw size={36} />
      </StyledButton>
    );
  }
}

Timer.Display = Display;
Timer.ProgressBar = ProgressBar;
Timer.Countdown = Countdown;
Timer.Options = Options;
Timer.Button = Button;

export default Timer;
