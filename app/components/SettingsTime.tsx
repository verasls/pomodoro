import styled from "styled-components";
import { Phase } from "../context/PomodoroContext";
import Heading from "./Heading";
import {
  LONG_BREAK_TIME,
  SHORT_BREAK_TIME,
  WORK_TIME,
} from "../utils/constants";
import React from "react";
import { useSettingsContext } from "../context/SettingsContext";

const StyledSettingsTime = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;

  & h3 {
    color: var(--gray);
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
    background-color: var(--secondary-color);
    color: var(--gray);
    height: 36px;
    width: -webkit-fill-available;
    padding: 20px;
    padding-right: 5px;
    border-radius: 5px;
    font-weight: 600;
    border: none;
  }

  @media (max-width: 630px) {
    flex-direction: column;
    width: 100%;

    & div {
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 4px 0;
    }
  }
`;

const phaseTimes: Record<Phase, number> = {
  Work: WORK_TIME,
  "Short break": SHORT_BREAK_TIME,
  "Long break": LONG_BREAK_TIME,
};

export default function SettingsTime() {
  const { settingsState, settingsDispatch } = useSettingsContext();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    const timeInSeconds = !value ? 0 : parseInt(value) * 60;
    const updatedTimes = { ...settingsState.phaseTimes, [id]: timeInSeconds };

    settingsDispatch({ type: "updateTimes", payload: updatedTimes });
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
            value={settingsState.phaseTimes[phase as Phase] / 60}
            onChange={handleInputChange}
          />
        </div>
      ))}
    </StyledSettingsTime>
  );
}
