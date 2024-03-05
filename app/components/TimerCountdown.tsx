import styled from "styled-components";

const Countdown = styled.p`
  font-size: 4.8rem;
  font-weight: 700;
`;

export default function TimerCountdown() {
  return <Countdown>25:00</Countdown>;
}
