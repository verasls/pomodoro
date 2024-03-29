import { useEffect } from "react";

type EventHandler = (event?: KeyboardEvent) => void;

export default function useKeyPress(key: string, handler: EventHandler) {
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === key) handler();
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handler, key]);
}
