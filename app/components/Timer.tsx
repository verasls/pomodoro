import styled from "styled-components";
import { Play, RotateCcw } from "lucide-react";
import TimerCountdown from "./TimerCountdown";
import TimerButton from "./TimerButton";
import TimerProgress from "./TimerProgress";

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

const StyledTimer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;

const TimerMenu = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function Timer() {
  return (
    <TimerWrapper>
      <TimerProgress />
      <StyledTimer>
        <TimerCountdown />
        <TimerMenu>
          <TimerButton>
            <Play size={32} />
          </TimerButton>
          <TimerButton>
            <RotateCcw size={32} />
          </TimerButton>
        </TimerMenu>
      </StyledTimer>
    </TimerWrapper>
  );
}
