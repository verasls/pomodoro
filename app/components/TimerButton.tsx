import React from "react";

type TimerButtonProps = {
  children: React.ReactNode;
};

export default function TimerButton({ children }: TimerButtonProps) {
  return <button>{children}</button>;
}
