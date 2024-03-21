import { RefObject, useEffect, useRef } from "react";

type EventHandler = (event?: MouseEvent | TouchEvent) => void;

export default function useOutsideClick(
  handler: EventHandler,
  listenCapturing = true
): RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) handler();
    }

    document.addEventListener("click", handleClick, listenCapturing);
    document.addEventListener("touchstart", handleClick, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
      document.removeEventListener("touchstart", handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return ref;
}
