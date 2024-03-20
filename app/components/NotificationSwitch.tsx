import styled, { css } from "styled-components";
import * as Switch from "@radix-ui/react-switch";

const SwitchRoot = styled(Switch.Root)`
  all: unset;
  width: 42px;
  height: 28px;
  background-color: var(--gray);
  border-radius: 9999px;
  position: relative;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &[data-state="checked"] {
    background-color: var(--accent-color);
  }

  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `}
`;

const SwitchThumb = styled(Switch.Thumb)`
  display: block;
  width: 21px;
  height: 21px;
  background-color: white;
  border-radius: 9999px;
  transition: transform 100ms;
  transform: translateX(4px);
  will-change: transform;

  &[data-state="checked"] {
    transform: translateX(17px);
  }
`;

type NotificationsSwitchProps = {
  isChecked: "checked" | "unchecked";
  onClick: () => void;
  disabled: boolean;
};

export default function NotificationsSwitch({
  isChecked,
  onClick,
  disabled,
}: NotificationsSwitchProps) {
  return (
    <SwitchRoot data-state={isChecked} onClick={onClick} disabled={disabled}>
      <SwitchThumb />
    </SwitchRoot>
  );
}
