import { Play, RotateCcw } from "lucide-react";
import Timer from "./Timer";

export default function PomodoroTimer() {
  return (
    <Timer>
      <Timer.Display>
        <Timer.ProgressBar />
        <Timer.Countdown>
          <Timer.Options>
            <Timer.Button>
              <Play size={36} />
            </Timer.Button>
            <Timer.Button>
              <RotateCcw size={36} />
            </Timer.Button>
          </Timer.Options>
        </Timer.Countdown>
      </Timer.Display>
    </Timer>
  );
}
