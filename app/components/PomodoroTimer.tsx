import Timer from "./Timer";

export default function PomodoroTimer() {
  return (
    <Timer>
      <Timer.ProgressBar />
      <Timer.Countdown>
        <Timer.Options>
          <Timer.Button type="play-pause" />
          <Timer.Button type="reset" />
        </Timer.Options>
      </Timer.Countdown>
    </Timer>
  );
}
