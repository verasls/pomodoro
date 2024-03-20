import styled from "styled-components";
import * as Select from "@radix-ui/react-select";
import {
  ChevronDownIcon,
  DesktopIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import Heading from "./Heading";

const StyledSettingsTheme = styled.div`
  justify-content: space-between;
`;

const SelectTrigger = styled(Select.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 20px;
  font-size: 0.8rem;
  line-height: 1;
  height: 35px;
  gap: 5px;
  background-color: var(--primary-color);
  border: 1px solid var(--gray);
`;

const SelectContent = styled(Select.Content)`
  overflow: hidden;
  background-color: white;
  border-radius: 6px;
  box-shadow:
    0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

const SelectViewport = styled(Select.Viewport)`
  padding: 5px;
`;

const SelectItem = styled(Select.Item)`
  font-size: 13px;
  line-height: 1;
  color: var(--violet-11);
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 35px 0 25px;
  position: relative;
  user-select: none;
`;

export default function SettingsTheme() {
  return (
    <StyledSettingsTheme>
      <Heading as="h3">Theme</Heading>

      <Select.Root>
        <SelectTrigger>
          <Select.Value placeholder="Select the theme" />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </SelectTrigger>

        <Select.Portal>
          <SelectContent>
            <SelectViewport>
              <SelectItem value="default">
                <Select.ItemText>
                  <div>
                    <DesktopIcon /> OS Default
                  </div>
                </Select.ItemText>
              </SelectItem>

              <SelectItem value="light">
                <Select.ItemText>
                  <div>
                    <SunIcon /> Light
                  </div>
                </Select.ItemText>
              </SelectItem>

              <SelectItem value="dark">
                <Select.ItemText>
                  <div>
                    <MoonIcon /> Dark
                  </div>
                </Select.ItemText>
              </SelectItem>
            </SelectViewport>
          </SelectContent>
        </Select.Portal>
      </Select.Root>
    </StyledSettingsTheme>
  );
}
