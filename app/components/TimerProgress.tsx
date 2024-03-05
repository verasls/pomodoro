import styled from "styled-components";

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

export default function TimerProgress() {
  return (
    <Svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g>
        <Circle r="45" cx="50" cy="50"></Circle>
      </g>
    </Svg>
  );
}
