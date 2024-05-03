import * as Switch from "@radix-ui/react-switch";
import React from "react";
import styled from "styled-components";

const SwitchRoot = styled(Switch.Root)`
  all: unset;
  width: 42px;
  height: 28px;
  background-color: var(--gray);
  border-radius: 9999px;
  position: relative;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  cursor: pointer;

  &[data-permitted="false"] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &[data-switch-state="checked"][data-permitted="true"] {
    background-color: var(--accent-color);

    > span {
      transform: translateX(17px);
    }
  }
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
`;

type NotificationsSwitchProps = {
  isChecked: "checked" | "unchecked";
  onClick: () => void;
  permitted: boolean;
  [key: string]: any;
};

const NotificationSwitch = React.forwardRef<
  HTMLButtonElement,
  NotificationsSwitchProps
>(
  (
    { isChecked, onClick, permitted, ...remainingProps },
    forwardedRef: React.Ref<HTMLButtonElement>
  ) => {
    const ariaChecked = permitted ? isChecked === "checked" : false;

    return (
      <SwitchRoot
        data-switch-state={isChecked}
        aria-checked={ariaChecked}
        onClick={onClick}
        data-permitted={String(permitted)}
        ref={forwardedRef}
        {...remainingProps}
      >
        <SwitchThumb />
      </SwitchRoot>
    );
  }
);

NotificationSwitch.displayName = "NotificationSwitch";

export default NotificationSwitch;
