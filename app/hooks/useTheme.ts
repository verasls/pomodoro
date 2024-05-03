import { useEffect } from "react";
import { State } from "../context/PomodoroContext";

export default function useTheme(state: State) {
  useEffect(() => {
    function handleThemeChange() {
      if (state.theme === "default") {
        if (window.matchMedia("(prefers-color-scheme: light)").matches) {
          document.documentElement.classList.remove("dark-mode");
          document.documentElement.classList.add("light-mode");
        }
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.classList.remove("light-mode");
          document.documentElement.classList.add("dark-mode");
        }
      }
    }

    handleThemeChange();

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleThemeChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleThemeChange);
    };
  }, [state.theme]);
}
