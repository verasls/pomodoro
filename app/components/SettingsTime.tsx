import styled from "styled-components";
import { Phase } from "../context/PomodoroContext";
import Heading from "./Heading";
import {
  LONG_BREAK_TIME,
  SHORT_BREAK_TIME,
  WORK_TIME,
} from "../utils/constants";
import useLocalStorage from "../hooks/useLocalStorage";
import React from "react";

const StyledSettingsTime = styled.div`
  flex-wrap: wrap;
  justify-content: space-evenly;

  & h3 {
    width: 100%;
    margin: 0.8rem 0;
  }

  & div {
    display: flex;
    flex-direction: column;
    width: 30%;
  }

  & label {
    width: 100%;
    margin-bottom: 5px;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--gray);
  }

  & input {
    background-color: var(--primary-color);
    color: var(--text-color);
    height: 36px;
    width: -webkit-fill-available;
    padding: 20px;
    border-radius: 5px;
    font-weight: 600;
    border: 1px solid var(--gray);
  }
`;

const phaseTimes: Record<Phase, number> = {
  Work: WORK_TIME,
  "Short break": SHORT_BREAK_TIME,
  "Long break": LONG_BREAK_TIME,
};

export default function SettingsTime() {
  const [times, setTimes] = useLocalStorage<Record<Phase, number>>(
    "time",
    phaseTimes
  );

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setTimes({ ...times, [id]: parseInt(value) });
  }

  return (
    <StyledSettingsTime>
      <Heading as="h3">Time (minutes)</Heading>

      {Object.keys(phaseTimes).map((phase) => (
        <div key={phase}>
          <label htmlFor={phase}>{phase}</label>
          <input
            type="number"
            id={phase}
            min={1}
            max={60}
            value={times[phase as Phase]}
            onChange={handleInputChange}
          />
        </div>
      ))}
    </StyledSettingsTime>
  );
}
