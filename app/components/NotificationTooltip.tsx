import * as Tooltip from "@radix-ui/react-tooltip";
import React from "react";
import styled from "styled-components";

const TooltipContent = styled(Tooltip.Content)`
  width: 16rem;
  padding: 10px 15px;
  font-size: 0.8rem;
  line-height: 1.2;
  border-radius: 4px;
  background-color: var(--white);
  box-shadow: var(--shadow-small);
  user-select: none;
`;

const TooltipArrow = styled(Tooltip.Arrow)`
  fill: var(--white);
`;

type NotificationTooltipProps = {
  children: React.ReactNode;
};

export default function NotificationTooltip({
  children,
}: NotificationTooltipProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <TooltipContent sideOffset={5}>
            You first need to allow the browser to send notifications from this
            site
            <TooltipArrow />
          </TooltipContent>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
