import { Duration } from "date-fns";

interface DurationNumberOrString {
  minutes: number | string;
  seconds: number | string;
}

export const distanceFormatHMS = (current: Duration, total: Duration) => {
  let currentTime: DurationNumberOrString = {
    minutes: current.minutes ?? 0,
    seconds: current.seconds ?? 0,
  };
  let totalTime: DurationNumberOrString = {
    minutes: total.minutes ?? 0,
    seconds: total.seconds ?? 0,
  };
  if (currentTime.seconds < 10) {
    currentTime.seconds = "0" + currentTime.seconds;
  }
  if (
    currentTime.minutes > 0 &&
    currentTime.minutes < 10 &&
    totalTime.minutes > 10
  ) {
    currentTime.minutes = "0" + currentTime.minutes;
  }
  if (totalTime.seconds < 10) {
    totalTime.seconds = "0" + totalTime.seconds;
  }
  if (
    totalTime.minutes > 0 &&
    totalTime.minutes < 10 &&
    totalTime.minutes > 10
  ) {
    totalTime.minutes = "0" + totalTime.minutes;
  }
  return `${currentTime.minutes}:${currentTime.seconds}/${totalTime.minutes}:${totalTime.seconds}`;
};
