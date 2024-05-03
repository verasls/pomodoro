import React from "react";
import styled from "styled-components";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  DesktopIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import Heading from "./Heading";
import { useSettingsContext } from "../context/SettingsContext";
import { ThemeValues } from "../context/PomodoroContext";

const StyledSettingsTheme = styled.div`
  justify-content: space-between;

  & h3 {
    color: var(--gray);
  }

  @media (max-width: 630px) {
    flex-direction: column;
  }
`;

const SelectTrigger = styled(Select.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1;
  height: 36px;
  width: 150px;
  gap: 0.4rem;
  background-color: var(--secondary-color);
  border: none;
  color: var(--gray);

  & div {
    gap: 0.4rem;
  }
`;

const SelectContent = styled(Select.Content)`
  overflow: hidden;
  background-color: var(--secondary-color);
  box-shadow: var(--shadow-small);
  border-radius: 5px;
`;

const SelectViewport = styled(Select.Viewport)`
  padding: 5px;
`;

const StyledSelectItem = styled(Select.Item)`
  font-size: 13px;
  font-weight: 400;
  color: var(--gray);
  line-height: 1;
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 35px 0 25px;
  position: relative;
  user-select: none;

  & div {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    justify-content: center;
    color: var(--gray);
  }

  &[data-highlighted] {
    background-color: var(--accent-color);
    color: var(--white);
  }
`;

const SelectItemIndicator = styled(Select.ItemIndicator)`
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export default function SettingsTheme() {
  const { settingsState, settingsDispatch } = useSettingsContext();

  function handleInputChange(event: ThemeValues) {
    settingsDispatch({ type: "updateTheme", payload: event });
  }

  return (
    <StyledSettingsTheme>
      <Heading as="h3">Theme</Heading>

      <Select.Root
        value={settingsState.theme}
        onValueChange={handleInputChange}
      >
        <SelectTrigger>
          <Select.Value placeholder="Select theme" />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </SelectTrigger>

        <Select.Portal>
          <SelectContent position="popper" sideOffset={5}>
            <SelectViewport>
              <SelectItem value="default">
                <div>
                  <DesktopIcon /> OS Default
                </div>
              </SelectItem>

              <SelectItem value="light">
                <div>
                  <SunIcon /> Light
                </div>
              </SelectItem>

              <SelectItem value="dark">
                <div>
                  <MoonIcon /> Dark
                </div>
              </SelectItem>
            </SelectViewport>
          </SelectContent>
        </Select.Portal>
      </Select.Root>
    </StyledSettingsTheme>
  );
}

type SelectItemProps = {
  children: React.ReactNode;
  value: string;
  [key: string]: any;
};

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <StyledSelectItem {...props} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
        <SelectItemIndicator>
          <CheckIcon />
        </SelectItemIndicator>
      </StyledSelectItem>
    );
  }
);

SelectItem.displayName = "SelectItem";
