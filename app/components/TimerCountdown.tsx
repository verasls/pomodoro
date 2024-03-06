import styled from "styled-components";
import useTimer from "../hooks/useTimer";

const Countdown = styled.p`
  font-size: 4.8rem;
  font-weight: 700;
`;

export default function TimerCountdown() {
  const time = useTimer(10);

  return <Countdown>{time}</Countdown>;
}
